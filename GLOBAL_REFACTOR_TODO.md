# Global Refactor Todo

## 1. Version Baseline

当前项目的基线版本如下：

- Nuxt: `3.14.1592` ([package.json](D:/nuxt/youhangweb/package.json:33))
- Vue: `latest` ([package.json](D:/nuxt/youhangweb/package.json:44))
- Vue Router: `latest` ([package.json](D:/nuxt/youhangweb/package.json:46))

结论：

- 后续修改应以 `Nuxt 3.14.x` 兼容为前提。
- 不应引入 `Nuxt 4` 才有的写法。
- `vue` 和 `vue-router` 目前写成 `latest`，这对 Nuxt 项目不安全，后续应改为让 Nuxt 锁定，或改成与 `Nuxt 3.14.x` 明确兼容的版本范围。

## 2. Must Fix First

### 2.1 Dependency and Project Metadata

问题：

- 项目名仍是 `nuxtpro`，和当前项目实际用途不一致 ([package.json](D:/nuxt/youhangweb/package.json:2))
- `vue`、`vue-router` 使用 `latest`，未来安装依赖时可能拉到与 Nuxt 3.14 不兼容的版本 ([package.json](D:/nuxt/youhangweb/package.json:44), [package.json](D:/nuxt/youhangweb/package.json:46))

建议修改：

- 将项目名改成与你的开源仓库一致的名称。
- 去掉 `vue`、`vue-router` 的 `latest`，优先交给 Nuxt 管理。
- 重新整理依赖版本策略，避免线上和本地安装结果漂移。

### 2.2 Global Head and Analytics Injection

问题：

- 全局 `gtag` 在 [app.vue](D:/nuxt/youhangweb/app.vue:21) 里直接硬编码注入。
- GA ID 写死在模板里，无法按环境切换 ([app.vue](D:/nuxt/youhangweb/app.vue:25), [app.vue](D:/nuxt/youhangweb/app.vue:33))
- `handleChatSubmit` / `handleChatToggle` 基本属于空逻辑，占用全局入口 ([app.vue](D:/nuxt/youhangweb/app.vue:40), [app.vue](D:/nuxt/youhangweb/app.vue:45))

建议修改：

- 把分析脚本迁移到 `runtimeConfig.public` + `plugins/gtag.client.ts`。
- 在 `app.vue` 只保留布局和页面容器。
- 删除无效事件处理，或者把聊天埋点做成真实逻辑。

### 2.3 HTTP Layer Is Repeated and Unsafe

问题：

- `GET/POST/PUT/DELETE/PATCH` 五套逻辑几乎完全重复 ([composables/useHttp.ts](D:/nuxt/youhangweb/composables/useHttp.ts:1))
- 请求头里写了 `Access-Control-Allow-Origin`，这是响应头，不该由前端发送 ([composables/useHttp.ts](D:/nuxt/youhangweb/composables/useHttp.ts:46), [composables/useHttp.ts](D:/nuxt/youhangweb/composables/useHttp.ts:124), [composables/useHttp.ts](D:/nuxt/youhangweb/composables/useHttp.ts:174), [composables/useHttp.ts](D:/nuxt/youhangweb/composables/useHttp.ts:224), [composables/useHttp.ts](D:/nuxt/youhangweb/composables/useHttp.ts:273))
- 生产 SSR fallback 里有硬编码 IP `170.106.193.51`，这属于高风险配置泄漏 ([composables/useHttp.ts](D:/nuxt/youhangweb/composables/useHttp.ts:31), [composables/useHttp.ts](D:/nuxt/youhangweb/composables/useHttp.ts:111), [composables/useHttp.ts](D:/nuxt/youhangweb/composables/useHttp.ts:161), [composables/useHttp.ts](D:/nuxt/youhangweb/composables/useHttp.ts:211), [composables/useHttp.ts](D:/nuxt/youhangweb/composables/useHttp.ts:260))
- 使用 `process.env.NODE_ENV` 做运行时判断，不够 Nuxt 化 ([composables/useHttp.ts](D:/nuxt/youhangweb/composables/useHttp.ts:24), [composables/useHttp.ts](D:/nuxt/youhangweb/composables/useHttp.ts:104), [composables/useHttp.ts](D:/nuxt/youhangweb/composables/useHttp.ts:154), [composables/useHttp.ts](D:/nuxt/youhangweb/composables/useHttp.ts:204), [composables/useHttp.ts](D:/nuxt/youhangweb/composables/useHttp.ts:253))
- 错误处理里大量 `any` 和重复 `throw new Error(...)`，类型不清晰 ([composables/useHttp.ts](D:/nuxt/youhangweb/composables/useHttp.ts:54), [composables/useHttp.ts](D:/nuxt/youhangweb/composables/useHttp.ts:65), [composables/useHttp.ts](D:/nuxt/youhangweb/composables/useHttp.ts:88))

建议修改：

- 提炼单一 `request()` 方法，其他方法只做 method 包装。
- 移除错误的 CORS 请求头。
- 完全移除硬编码 IP，统一使用 `runtimeConfig.public.apiBase` / `serverBase`。
- 统一错误模型和返回类型。

### 2.4 ChatWidget Has Global Behavior Problems

问题：

- 组件直接用原生 `fetch('/analytics/customer')`，绕过了全局请求层 ([components/ChatWidget.vue](D:/nuxt/youhangweb/components/ChatWidget.vue:209))
- 使用 `alert()` 处理错误和成功，不适合正式站点 ([components/ChatWidget.vue](D:/nuxt/youhangweb/components/ChatWidget.vue:191), [components/ChatWidget.vue](D:/nuxt/youhangweb/components/ChatWidget.vue:235))
- 注册了 `orientationchange` / `resize` 监听，但卸载时用匿名函数移除，实际上移不掉 ([components/ChatWidget.vue](D:/nuxt/youhangweb/components/ChatWidget.vue:300), [components/ChatWidget.vue](D:/nuxt/youhangweb/components/ChatWidget.vue:301), [components/ChatWidget.vue](D:/nuxt/youhangweb/components/ChatWidget.vue:308), [components/ChatWidget.vue](D:/nuxt/youhangweb/components/ChatWidget.vue:309))
- 定义了 `preventScroll` 但没有真正注册，属于无效代码 ([components/ChatWidget.vue](D:/nuxt/youhangweb/components/ChatWidget.vue:284))
- 组件声明了 `submit` 事件，但实际没有 `emit('submit', ...)` ([app.vue](D:/nuxt/youhangweb/app.vue:10), [components/ChatWidget.vue](D:/nuxt/youhangweb/components/ChatWidget.vue:136))

建议修改：

- 统一走 `useHttpPost` 或重构后的请求层。
- 用 toast 或组件态消息替代 `alert()`。
- 修正事件监听注册/移除方式。
- 明确这个组件到底是“自处理提交”还是“向外 emit，由父组件处理”，二选一。

### 2.5 Store Layer Needs Cleanup

问题：

- Store 名称和导出文件名都偏临时化，`useNuxtToken` / `useLoginState` 命名不统一 ([composables/plugins.ts](D:/nuxt/youhangweb/composables/plugins.ts:8), [composables/plugins.ts](D:/nuxt/youhangweb/composables/plugins.ts:26))
- `setToken` 参数名拼写错误 `tkoen` ([composables/plugins.ts](D:/nuxt/youhangweb/composables/plugins.ts:10))
- `logout()` 直接操作 `localStorage`，没有显式客户端保护 ([composables/plugins.ts](D:/nuxt/youhangweb/composables/plugins.ts:32), [composables/plugins.ts](D:/nuxt/youhangweb/composables/plugins.ts:36))

建议修改：

- 把状态存储拆分成明确的 `auth.store.ts`。
- 统一命名、类型和导出方式。
- 清理持久化逻辑，避免在非浏览器环境误用。

## 3. Structural Refactor Needed

### 3.1 Middleware Is Duplicated and Carries Removed i18n Logic

问题：

- `product-guard.ts` 和 `blog-guard.ts` 逻辑高度重复 ([middleware/product-guard.ts](D:/nuxt/youhangweb/middleware/product-guard.ts:1), [middleware/blog-guard.ts](D:/nuxt/youhangweb/middleware/blog-guard.ts:1))
- 仍然保留 `zh-CN` / `JP` / `en-US` 路由前缀判断，但项目当前已没有完整多语言实现 ([middleware/product-guard.ts](D:/nuxt/youhangweb/middleware/product-guard.ts:23), [middleware/blog-guard.ts](D:/nuxt/youhangweb/middleware/blog-guard.ts:21))
- 中间件里直接做 `301` 导航，过重，且不易维护 ([middleware/product-guard.ts](D:/nuxt/youhangweb/middleware/product-guard.ts:31), [middleware/product-guard.ts](D:/nuxt/youhangweb/middleware/product-guard.ts:40), [middleware/blog-guard.ts](D:/nuxt/youhangweb/middleware/blog-guard.ts:29), [middleware/blog-guard.ts](D:/nuxt/youhangweb/middleware/blog-guard.ts:38))

建议修改：

- 抽象成可复用的 route validator。
- 如果不再做多语言，移除旧前缀判断。
- 把 SEO 重定向策略前移到 route rules 或服务端，而不是页面中间件。

### 3.2 SEO Logic Is Repeated Across Pages

问题：

- 已经有 [composables/useSEO.ts](D:/nuxt/youhangweb/composables/useSEO.ts:1)，但首页仍自定义了一套 `generateBreadcrumb()` ([pages/index.vue](D:/nuxt/youhangweb/pages/index.vue:884))
- 多个页面自己拼 `jsonLd`、`canonical`、`meta`，结构相似但未统一 ([pages/blogs/index.vue](D:/nuxt/youhangweb/pages/blogs/index.vue:164), [pages/blogs/[sulg].vue](D:/nuxt/youhangweb/pages/blogs/[sulg].vue:266), [pages/product/[sulg]/index.vue](D:/nuxt/youhangweb/pages/product/[sulg]/index.vue:219), [pages/product/[sulg]/[detail].vue](D:/nuxt/youhangweb/pages/product/[sulg]/[detail].vue:470), [pages/about-us/index.vue](D:/nuxt/youhangweb/pages/about-us/index.vue:470))

建议修改：

- 抽成统一的 SEO builder。
- 首页不要再自建面包屑函数，统一走 composable。
- 结构化数据模板按页面类型拆分：`organization`、`product-list`、`product-detail`、`article-list`、`article-detail`。

### 3.3 API Typing Quality Is Low

问题：

- `apis/*` 大量使用 `params: any = {}` ([apis/index.ts](D:/nuxt/youhangweb/apis/index.ts:3), [apis/product.ts](D:/nuxt/youhangweb/apis/product.ts:3), [apis/blog.ts](D:/nuxt/youhangweb/apis/blog.ts:3))
- `types/index.ts` 的响应结构存在大小写不统一、嵌套过深、接口命名风格混杂等问题 ([types/index.ts](D:/nuxt/youhangweb/types/index.ts:1))

建议修改：

- 先定义统一 API 响应基础类型。
- 再给每个 endpoint 明确 request/response 类型。
- 逐步去掉 `any`，至少公共层全部去掉。

## 4. Medium Priority Optimization

### 4.1 App Config and Title Strategy

问题：

- `app.config.ts` 只有一个 `name` 字段，且与页面 SEO 标题策略分离 ([app.config.ts](D:/nuxt/youhangweb/app.config.ts:1))
- `app.vue` 设置全局 title，但很多页面又单独覆盖，策略不统一 ([app.vue](D:/nuxt/youhangweb/app.vue:21))

建议修改：

- 统一站点标题格式，比如 `Page Title | Brand`。
- 在 `app.config.ts` 中收敛站点基础信息：brand、siteName、defaultTitle、defaultDescription。

### 4.2 Pinia Plugin Registration

问题：

- [plugins/pinia.client.ts](D:/nuxt/youhangweb/plugins/pinia.client.ts:1) 只做了最小注册，没问题，但缺少对 persisted state key、存储介质和安全边界的统一说明。

建议修改：

- 给持久化策略加统一配置。
- 敏感 token 不建议默认长期持久化。

### 4.3 Open Source Readiness

问题：

- 依赖、全局配置、埋点、API 地址、SEO 文案仍然混有模板项目痕迹与历史业务痕迹。

建议修改：

- 输出一份公开版环境变量模板 `.env.example`
- 输出一份接口说明文档
- 输出一份 `OPEN_SOURCE_NOTICE.md`，说明哪些数据是示例占位

## 5. Recommended Refactor Order

建议按这个顺序改，风险最低：

1. 锁定依赖版本和项目元信息
2. 重构 `useHttp.ts`
3. 清理 `ChatWidget.vue`
4. 整理 auth/store
5. 合并 middleware
6. 统一 SEO composable 和结构化数据
7. 收敛 API types
8. 最后再做页面级样式和文案优化

## 6. Scope for Next Step

如果按我建议继续，我下一步会优先做这 3 件事：

1. 修正 `package.json` 的版本策略，保证 Nuxt 3.14.x 兼容
2. 重构 `composables/useHttp.ts` 为单一请求入口
3. 清理 `app.vue` 和 `components/ChatWidget.vue` 的全局副作用
