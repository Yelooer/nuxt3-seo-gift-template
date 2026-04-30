  // https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  app:{
    head:{
      title:'nuxt3GiftTemplate',
      meta:[
        { 
          name: 'google-site-verification', 
          content: process.env.GOOGLE_SEARCH_CONSOLE_VERIFICATION_CODE  // Google Search Console verification code  
        },
        // 允许搜索引擎索引和跟踪
        { name: 'robots', content: 'index, follow' }
      ]
    }
  },


  ssr: true,
  compatibilityDate: '2025-05-15',
  devtools: { enabled: false },
  //指定全局css
  css:['~/assets/css/tailwind.css','~/assets/css/fonts.css'],
  //引入tailwindcss
  modules:[
    '@pinia/nuxt',
    '@nuxtjs/tailwindcss',
    'shadcn-nuxt',
    '@unlok-co/nuxt-stripe',
    '@vite-pwa/nuxt',
    '@nuxtjs/plausible',
    '@nuxtjs/sitemap',
    'nuxt-llms',
    '@nuxtjs/seo',
    'nuxt-icon',
    'nuxt-icons'
  ],
  // 临时代理配置 - 解决跨域问题
  nitro: {
    devProxy: {
      '/api/v1': {
        target: 'http://localhost:5000',
        changeOrigin: true,
        prependPath: true,
      }
    },
    // 性能优化配置
    experimental: {
      wasm: true
    }
  },
    //配置公共seo数据
  site: {
    url: 'https://virtual-company.example/',
    name: 'Virtual Company',
    description: 'Virtual Company offers professional custom gift solutions for brands seeking reliable design, sourcing, and production support.',
    defaultLocale: 'en',//设置网站的默认语言区域。
    enabled: true,//启用或禁用 nuxt-site-config 模块
    debug: false,//开启或关闭调试模式
    indexable: true,//控制你的网站是否希望被搜索引擎索引。这是一个非常关键的 SEO 开关
    trailingSlash: false //控制网站 URL 的末尾是否应该带有斜杠 (/)。
  },
    //配置结构化数据
  schemaOrg: {
    enabled: false,//完全禁用自动生成的结构化数据 
    // identity: {
    //   type: 'Organization',
    //   name: 'Virtual Company',
    //   url: 'https://virtual-company.example',
    //   logo: 'https://virtual-company.example/logo.png'
    // },
    // defaults: true,//启用或禁用自动添加默认的结构化数据。
    // minify: true,//是否压缩生成的 JSON-LD 脚本。
    // reactive: false,//是否让结构化数据具有响应性。
    // enabled: true,
    // debug: false//开启或关闭调试模式。
  },

  //配置robots爬虫抓取协议 - 允许所有搜索引擎抓取
  robots: {
    UserAgent: '*',
    Allow: '/',
    // Sitemap: 'https://virtual-company.example/sitemap.xml'
  },







  shadcn: {
    /**
     * Prefix for all the imported component
     */
    prefix: '',
    /**
     * Directory that the component lives in.
     * @default "./components/ui"
     */
    componentDir: './components/ui'
  },

  //运行时全局变量
  runtimeConfig: {
    //此处定义的属性只能在服务端获取到
    // Server
    appName: 'nuxt3GiftTemplate',
    environment: process.env.NODE_ENV || 'development',
    // API 配置
    betterAuthUrl: process.env.BETTER_AUTH_URL || 'http://virtual-company.example/api/v1',
    // sitemap 配置已移除，避免与 @nuxtjs/sitemap 模块冲突
    //  stripe.key这个应该从 Nuxt 的 runtimeConfig 移走，放到你的 Go 后端的配置中！
    stripe: {
      key: process.env.NUXT_STRIPE_SECRET_KEY,
      options: {},
    },

    //  creem.key这个应该从 Nuxt 的 runtimeConfig 移走，放到你的 Go 后端的配置中！
    creem:{
      apiKey: process.env.NUXT_CREEM_API_KEY,
      webhookSecret: process.env.NUXT_CREEM_WEBHOOK_SECRET
    },
    // ipinfo 获取Ip信息
    ipinfoToken: process.env.IPINFO_TOKEN,

    //public中定义的属性既可以在服务端，也可以在客户端获取到
    public: {
      env: process.env.NUXT_PUBLIC_ENV || 'development',
      baseUrl: process.env.NUXT_PUBLIC_BASE_URL,
      gtagMeasurementId: process.env.NUXT_PUBLIC_GTAG_MEASUREMENT_ID || '',
      isServer: true,
      // API 配置 - 客户端可访问
      betterAuthUrl: process.env.BETTER_AUTH_URL || 'http://virtual-company.example/api/v1',
      // nginx 主机地址 - 用于SSR环境下的API请求
      nginxHost: process.env.NGINX_HOST || 'http://virtual-company.example',
      plausible: {
        domain: process.env.NUXT_PUBLIC_PLAUSIBLE_DOMAIN,
        apiHost: process.env.NUXT_PUBLIC_PLAUSIBLE_API_HOST,
        ignoredHostnames: ['localhost', '127.0.0.1'],
        autoOutboundTracking: true,
        enabled: false,  // 👈 禁用 Plausible
      },
      //支付方式选择：1、stripe;2、paddle;3、creem
      paymentMethod: process.env.PAYMENT_METHOD,
      // Client
      stripe: {
        key: process.env.NUXT_PUBLIC_STRIPE_PUBLISHABLE_KEY,
        options: {},
        manualClientLoad: true
      },
      creem:{
        url: process.env.NUXT_PUBLIC_CREEM_URL
      },

    },
  },
  devServer: {
    host: '0.0.0.0' // 允许所有 IP 访问
  },
  vite: {
    server: {
      allowedHosts: ['localhost'] // 允许指定域名
    },
    // 构建优化配置
    build: {
      chunkSizeWarningLimit: 1000
    }
  }
  
})
