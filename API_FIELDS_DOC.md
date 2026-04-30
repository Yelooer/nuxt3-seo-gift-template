# 前端接口字段文档

## 说明

这份文档是给后端对接使用的，描述当前前端代码实际依赖的接口、路径和字段。

约束说明：

- 字段名建议保持与当前文档一致。
- 如果字段名变动，前端对应页面也需要同步修改。
- 文档只列出当前前端真正依赖的字段，不展开后端内部实现。

## 1. 首页接口

### 1.1 Banner 数据

- 路径：`GET /index/banner`
- 前端调用位置：[apis/index.ts](D:/nuxt/youhangweb/apis/index.ts:11)

返回结构：

```json
{
  "code": 200,
  "msg": "success",
  "data": {
    "indexBanData": {
      "images": [
        {
          "src": "string",
          "alt": "string",
          "mobile_src": "string",
          "link": "string"
        }
      ]
    }
  }
}
```

必需字段：

- `data.indexBanData.images`
- `images[].src`
- `images[].alt`
- `images[].mobile_src`
- `images[].link`

### 1.2 首页产品分类

- 路径：`GET /index/product`
- 前端调用位置：[apis/index.ts](D:/nuxt/youhangweb/apis/index.ts:16)

返回结构：

```json
{
  "code": 200,
  "msg": "success",
  "data": {
    "products": [
      {
        "name": "string",
        "image": "string",
        "link": "string",
        "category_key": "string"
      }
    ]
  }
}
```

必需字段：

- `data.products`
- `products[].name`
- `products[].image`
- `products[].link`
- `products[].category_key`

### 1.3 首页新品

- 路径：`GET /index/new-arrivals`
- 前端调用位置：[apis/index.ts](D:/nuxt/youhangweb/apis/index.ts:21)

返回结构：

```json
{
  "code": 200,
  "msg": "success",
  "data": {
    "NewArrivalsData": {
      "title": "string",
      "newArrivals": [
        {
          "image": "string",
          "badge": "string",
          "title": "string",
          "link": "string",
          "category": "string",
          "skuid": "string",
          "create_time": "string",
          "alt": "string"
        }
      ]
    }
  }
}
```

必需字段：

- `data.NewArrivalsData.title`
- `data.NewArrivalsData.newArrivals`
- `newArrivals[].image`
- `newArrivals[].title`
- `newArrivals[].link`
- `newArrivals[].alt`

建议字段：

- `newArrivals[].badge`
- `newArrivals[].category`
- `newArrivals[].skuid`
- `newArrivals[].create_time`

### 1.4 首页服务能力

- 路径：`GET /index/features`
- 前端调用位置：[apis/index.ts](D:/nuxt/youhangweb/apis/index.ts:26)

返回结构：

```json
{
  "code": 200,
  "msg": "success",
  "data": {
    "FeaturesTabsData": {
      "featuresTabs": [
        {
          "tab": "string",
          "title": "string",
          "desc": "string",
          "points": ["string"],
          "image": "string"
        }
      ]
    }
  }
}
```

必需字段：

- `data.FeaturesTabsData.featuresTabs`
- `featuresTabs[].tab`
- `featuresTabs[].title`
- `featuresTabs[].desc`
- `featuresTabs[].points`
- `featuresTabs[].image`

### 1.5 首页品牌展示区

- 路径：`GET /index/brand`
- 前端调用位置：[apis/index.ts](D:/nuxt/youhangweb/apis/index.ts:31)

返回结构：

```json
{
  "code": 200,
  "msg": "success",
  "data": {
    "BrandData": {
      "brandZoneItems": [
        {
          "id": 1,
          "isLarge": true,
          "image": "string",
          "title": "string",
          "description": "string",
          "hasPlayButton": true
        }
      ]
    }
  }
}
```

必需字段：

- `data.BrandData.brandZoneItems`
- `brandZoneItems[].id`
- `brandZoneItems[].isLarge`
- `brandZoneItems[].image`
- `brandZoneItems[].title`
- `brandZoneItems[].description`
- `brandZoneItems[].hasPlayButton`

### 1.6 首页联系信息

- 路径：`GET /index/contact`
- 前端调用位置：[apis/index.ts](D:/nuxt/youhangweb/apis/index.ts:36)

返回结构：

```json
{
  "code": 200,
  "msg": "success",
  "data": {
    "ContactData": {
      "custom": "string",
      "title": "string",
      "content": ["string"],
      "image": "string"
    }
  }
}
```

必需字段：

- `data.ContactData.custom`
- `data.ContactData.title`
- `data.ContactData.content`
- `data.ContactData.image`

### 1.7 首页批发产品区

- 路径：`GET /index/wholesale`
- 前端调用位置：[apis/index.ts](D:/nuxt/youhangweb/apis/index.ts:41)

返回结构：

```json
{
  "code": 200,
  "msg": "success",
  "data": {
    "indexWholesaleData": {
      "title": "string",
      "description": "string",
      "Wholesale": [
        {
          "id": 1,
          "src": "string",
          "alt": "string",
          "link": "string"
        }
      ]
    }
  }
}
```

必需字段：

- `data.indexWholesaleData.title`
- `data.indexWholesaleData.description`
- `data.indexWholesaleData.Wholesale`
- `Wholesale[].id`
- `Wholesale[].src`
- `Wholesale[].alt`

建议字段：

- `Wholesale[].link`

## 2. 产品接口

### 2.1 产品分类列表页

- 路径：`GET /product/:categorySlug`
- 前端调用位置：[apis/product.ts](D:/nuxt/youhangweb/apis/product.ts:10)
- 页面使用位置：[pages/product/[sulg]/index.vue](D:/nuxt/youhangweb/pages/product/[sulg]/index.vue:104)

返回结构：

```json
{
  "code": 200,
  "msg": "success",
  "data": {
    "ShowcasesData": {
      "title": "string",
      "description": "string",
      "showcases": [
        {
          "image": "string",
          "alt": "string",
          "badge": "string",
          "title": "string",
          "applicableScenes": ["string"]
        }
      ]
    }
  }
}
```

前端当前实际还额外依赖这些字段：

- `showcases[].link`
- `showcases[].description` 或 `showcases[].desc`
- `showcases[].name`
- `showcases[].skuid`
- `showcases[].category`
- `showcases[].reviews`（用于结构化数据，可选）

建议后端完整返回：

```json
{
  "image": "string",
  "alt": "string",
  "badge": "string",
  "title": "string",
  "link": "string",
  "applicableScenes": ["string"],
  "description": "string",
  "skuid": "string",
  "category": "string",
  "reviews": [
    {
      "nickname": "string",
      "content": "string",
      "rating": 5,
      "review_date": "string"
    }
  ]
}
```

### 2.2 产品详情页

- 路径：`GET /product/:categorySlug/:productSlug`
- 前端调用位置：[apis/product.ts](D:/nuxt/youhangweb/apis/product.ts:16)
- 页面使用位置：[pages/product/[sulg]/[detail].vue](D:/nuxt/youhangweb/pages/product/[sulg]/[detail].vue:195)

返回结构：

```json
{
  "code": 200,
  "msg": "success",
  "data": {
    "ProductDetail": {
      "title": "string",
      "images": [
        {
          "id": 1,
          "product_id": 1,
          "image_url": "string",
          "alt_text": "string",
          "is_main": true
        }
      ],
      "video": "string",
      "hasVideo": true,
      "bundles": [
        {
          "img": "string",
          "title": "string",
          "link": "string"
        }
      ],
      "faqs": [
        {
          "question": "string",
          "answer": "string",
          "is_open_default": false
        }
      ],
      "description": "string",
      "badge": "string",
      "attributes": [
        {
          "attribute_label": "string",
          "attribute_value": "string"
        }
      ],
      "customDescription": "string",
      "reviews": [
        {
          "nickname": "string",
          "content": "string",
          "reply": "string",
          "rating": 5,
          "review_date": "string"
        }
      ],
      "seo_title": "string",
      "seo_description": "string",
      "skuid": "string",
      "link": "string",
      "category": "string"
    }
  }
}
```

必需字段：

- `title`
- `images`
- `images[].image_url`
- `images[].alt_text`
- `description`
- `attributes`
- `customDescription`
- `reviews`
- `seo_title`
- `seo_description`
- `skuid`
- `category`

建议字段：

- `video`
- `hasVideo`
- `bundles`
- `faqs`
- `badge`
- `link`

## 3. 博客接口

### 3.1 博客列表页

- 路径：`GET /blogs`
- 前端调用位置：[apis/blog.ts](D:/nuxt/youhangweb/apis/blog.ts:4)
- 页面使用位置：[pages/blogs/index.vue](D:/nuxt/youhangweb/pages/blogs/index.vue:94)

返回结构：

```json
{
  "code": 200,
  "msg": "success",
  "data": {
    "BlogsData": {
      "title": "string",
      "description": "string",
      "blogs": [
        {
          "article_key": "string",
          "title": "string",
          "description": "string",
          "publish_date": "string",
          "featured_image": "string",
          "featured_image_alt": "string",
          "tags": "string"
        }
      ]
    }
  }
}
```

必需字段：

- `data.BlogsData.title`
- `data.BlogsData.description`
- `data.BlogsData.blogs`
- `blogs[].article_key`
- `blogs[].title`
- `blogs[].description`
- `blogs[].publish_date`
- `blogs[].featured_image`
- `blogs[].featured_image_alt`
- `blogs[].tags`

### 3.2 博客详情页

- 路径：`GET /blogs/:articleSlug`
- 前端调用位置：[apis/blog.ts](D:/nuxt/youhangweb/apis/blog.ts:9)
- 页面使用位置：[pages/blogs/[sulg].vue](D:/nuxt/youhangweb/pages/blogs/[sulg].vue:109)

返回结构：

```json
{
  "code": 200,
  "msg": "success",
  "data": {
    "data": {
      "product_database": {
        "product_key": "string",
        "title": "string",
        "description": "string",
        "badge": "string",
        "link": "string",
        "applicableScenes": "string",
        "image": "string",
        "alt": "string"
      },
      "blog_articles": {
        "author": "string",
        "article_key": "string",
        "title": "string",
        "description": "string",
        "content": "string",
        "publish_date": "string",
        "seo_title": "string",
        "seo_description": "string",
        "tags": "string",
        "featured_image": "string",
        "featured_image_alt": "string",
        "create_time": "string",
        "update_time": "string"
      }
    }
  }
}
```

必需字段：

- `data.data.blog_articles.author`
- `data.data.blog_articles.article_key`
- `data.data.blog_articles.title`
- `data.data.blog_articles.description`
- `data.data.blog_articles.content`
- `data.data.blog_articles.publish_date`
- `data.data.blog_articles.seo_title`
- `data.data.blog_articles.seo_description`
- `data.data.blog_articles.tags`
- `data.data.blog_articles.featured_image`
- `data.data.blog_articles.featured_image_alt`
- `data.data.blog_articles.create_time`
- `data.data.blog_articles.update_time`

如果文章正文里会插入商品卡片，还需要：

- `data.data.product_database.product_key`
- `data.data.product_database.title`
- `data.data.product_database.description`
- `data.data.product_database.badge`
- `data.data.product_database.link`
- `data.data.product_database.image`
- `data.data.product_database.alt`

## 4. 博客商品卡片接口

### 4.1 博客商品卡片批量查询

- 路径：`POST /api/blog/products`
- 前端调用位置：[apis/product.ts](D:/nuxt/youhangweb/apis/product.ts:23)

请求体：

```json
{
  "productIds": ["string"]
}
```

返回结构：

```json
{
  "data": [
    {
      "id": "string",
      "title": "string",
      "description": "string",
      "image": "string",
      "link": "string",
      "badge": "string",
      "price": 0,
      "originalPrice": 0,
      "discount": 0,
      "applicableScenes": ["string"]
    }
  ]
}
```

## 5. 在线咨询接口

### 5.1 聊天表单提交

- 路径：`POST /analytics/customer`
- 前端调用位置：[components/ChatWidget.vue](D:/nuxt/youhangweb/components/ChatWidget.vue:209)

请求体：

```json
{
  "name": "string",
  "email": "string",
  "phone": "string",
  "message": "string"
}
```

必需字段：

- `name`
- `email`
- `message`

建议字段：

- `phone`

建议返回：

```json
{
  "code": 200,
  "msg": "success",
  "data": {
    "received": true
  }
}
```

## 6. 后端对接注意事项

### 6.1 字段命名不要临时变更

当前前端对这些字段名是强依赖的：

- `seo_title`
- `seo_description`
- `featured_image`
- `featured_image_alt`
- `article_key`
- `category_key`
- `customDescription`
- `is_open_default`

### 6.2 时间字段格式建议

前端当前兼容以下格式：

- `2025-07-23 06:31:31`
- `2025-07-23T06:31:31Z`

建议统一输出 ISO 8601，后续前端更容易处理。

### 6.3 图片地址建议

建议后端返回：

- 完整可访问 URL，或者
- 与当前站点兼容的相对路径

当前前端里部分结构化数据会自动拼接域名，所以相对路径也能工作，但统一返回完整 URL 更稳。
