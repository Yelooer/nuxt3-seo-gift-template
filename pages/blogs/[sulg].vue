<template>
    <div class="min-h-screen bg-[#fcf9f4] flex flex-col">
      <HeadNavbar />
      <!-- 顶部大图和标题区 -->
      <div class="w-full bg-white border-b border-gray-100 pt-20 pb-4">
        <div class="max-w-5xl mx-auto px-4 flex flex-col lg:flex-row gap-8 items-start">
          <div class="flex-1 flex flex-col justify-start">
            <!-- <div class="text-xs text-gray-400 mb-2">{{ categoryName }}</div> -->
            <h2 class="text-3xl sm:text-4xl font-bold text-gray-900 mb-2 leading-tight">{{ title || 'Loading...' }}</h2>
          </div>
          <img :src="featuredImage" :alt="featuredImageAlt || 'Article Image'" class="w-full lg:w-[420px] h-48 lg:h-[320px] object-cover object-center rounded-2xl shadow" />
        </div>
      </div>
      <!-- 正文内容区 -->
      <main class="flex-1 w-full max-w-5xl mx-auto px-4 py-8 flex flex-col lg:flex-row gap-8">
        <!-- 左侧作者信息 -->
        <aside class="hidden lg:block w-56 flex-shrink-0 text-sm text-gray-600">
          <div class="mb-4">
            <div class="mb-1">Author: <span class="font-medium">{{ author }}</span></div>
            <div class="mb-1">{{ publishDate }}</div>
          </div>
          <div v-if="tags.length > 0" class="mb-4">
            <div class="font-semibold mb-1">Tags</div>
            <div class="flex flex-wrap gap-2">
              <span 
                
                class="bg-gray-100 text-gray-500 rounded px-2 py-0.5 text-xs"
              >
                {{ tags }}
              </span>
            </div>
          </div>
          <div>
            <div class="font-semibold mb-1">Share</div>
            <div class="flex gap-2">
              <button class="hover:text-orange-500"><svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M18 2.01 6 2c-2.21 0-4 1.79-4 4v12c0 2.21 1.79 4 4 4h12c2.21 0 4-1.79 4-4V6c0-2.21-1.79-3.99-4-3.99zM12 17.5c-3.04 0-5.5-2.46-5.5-5.5s2.46-5.5 5.5-5.5 5.5 2.46 5.5 5.5-2.46 5.5-5.5 5.5z"/></svg></button>
              <button class="hover:text-orange-500"><svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M22.46 6c-.77.35-1.6.58-2.47.69a4.3 4.3 0 0 0 1.88-2.37 8.59 8.59 0 0 1-2.72 1.04A4.28 4.28 0 0 0 16.11 4c-2.37 0-4.29 1.92-4.29 4.29 0 .34.04.67.11.99C7.69 9.13 4.07 7.38 1.64 4.7c-.37.64-.58 1.39-.58 2.19 0 1.51.77 2.84 1.94 3.62-.72-.02-1.39-.22-1.98-.55v.06c0 2.11 1.5 3.87 3.5 4.27-.36.1-.74.16-1.13.16-.28 0-.54-.03-.8-.08.54 1.68 2.12 2.91 3.99 2.94A8.6 8.6 0 0 1 2 19.54c-.65 0-1.28-.04-1.9-.11A12.13 12.13 0 0 0 6.29 21c7.55 0 11.68-6.26 11.68-11.68 0-.18-.01-.36-.02-.54A8.18 8.18 0 0 0 22.46 6z"/></svg></button>
              <button class="hover:text-orange-500"><svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M19.615 3.184c-1.72-.153-5.6-.153-7.32 0-1.72.153-2.89.87-3.6 1.58-.71.71-1.43 1.88-1.58 3.6-.153 1.72-.153 5.6 0 7.32.153 1.72.87 2.89 1.58 3.6.71.71 1.88 1.43 3.6 1.58 1.72.153 5.6.153 7.32 0 1.72-.153 2.89-.87 3.6-1.58.71-.71 1.43-1.88 1.58-3.6.153-1.72.153-5.6 0-7.32-.153-1.72-.87-2.89-1.58-3.6-.71-.71-1.88-1.43-3.6-1.58zm-7.615 8.816v-2.5l6 3.5-6 3.5v-2.5h-6v-2h6z"/></svg></button>
            </div>
          </div>
        </aside>
        <!-- 正文内容 -->
        <div class="flex-1 min-w-0 overflow-hidden">
          
          <!-- 博客内容 - 使用v-html渲染后端返回的标准HTML -->
          <div class="prose prose-lg max-w-none">
            <div v-html="processedContent" class="blog-content w-full overflow-hidden"></div>
          </div>
          <!-- 继续阅读 -->
          <div class="mt-16">
            <h3 class="text-2xl font-bold mb-6 text-center">Continue Reading</h3>
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-8">
              <div class="flex flex-col items-center">
                <img src="/imgs/product/baby-stroller-bag-front.webp" alt="Related Article 1" class="rounded-xl w-full max-w-xs mb-3" />
                <div class="font-semibold text-base text-center">Summer Sun Protection Accessories Guide: Choosing the Right Hat for You</div>
              </div>
              <div class="flex flex-col items-center">
                <img src="/imgs/product/baby-stroller-bag-front.webp" alt="Related Article 2" class="rounded-xl w-full max-w-xs mb-3" />
                <div class="font-semibold text-base text-center">Fashion Styling Tips: How to Elevate Your Vacation Look with Accessories</div>
              </div>
            </div>
          </div>
          <!-- 评论表单 -->
          <div class="bg-white rounded-xl shadow p-6 mt-12">
            <h3 class="font-bold text-lg mb-4">Leave a Comment</h3>
                          <form class="space-y-4">
                <div>
                  <label class="block text-sm text-gray-600 mb-1">Name</label>
                  <input type="text" class="w-full border rounded px-3 py-2" placeholder="Please enter your name" />
                </div>
                <div>
                  <label class="block text-sm text-gray-600 mb-1">Email</label>
                  <input type="email" class="w-full border rounded px-3 py-2" placeholder="Please enter your email" />
                </div>
                <div>
                  <label class="block text-sm text-gray-600 mb-1">Content</label>
                  <textarea class="w-full border rounded px-3 py-2" rows="4" placeholder="Please enter your comment"></textarea>
                </div>
                <button type="submit" class="bg-gray-900 hover:bg-gray-700 text-white font-semibold py-2 px-8 rounded transition">Submit</button>
              </form>
          </div>
        </div>
      </main>
      <AppFooter />
    </div>
</template>

<script setup lang="ts">
// 导入API函数和类型
import { getBlogDetail } from '~/apis/blog'

// 应用博客路由守卫中间件
// definePageMeta({
//   middleware: ['blog-guard']
// })

const route = useRoute()

// 从路由参数获取分类和文章ID
const articleSlug = route.params.sulg as string







// 🎯 从后端获取博客详情数据
const { data: articleDetailData, pending, error } = await useAsyncData(
  `${articleSlug}`,
  () => getBlogDetail(articleSlug),
  {
    transform: (data: any) => data.data
  }
)


// 如果获取数据失败，显示404页面
if (error.value) {
  throw createError({
    statusCode: 404,
    statusMessage: 'Blog not found'
  })
}
const articleDetail = computed(() => articleDetailData.value?.data?.blog_articles)


// 从后端数据中提取内容和商品数据库
const articleContent = computed(() => articleDetail.value?.content)

const title = computed(() => articleDetail.value?.title || '')


const author = computed(() => articleDetail.value?.author || 'Virtual Company')
const publishDate = computed(() => articleDetail.value?.publish_date || '')
const tags = computed(() => articleDetail.value?.tags || "")
const seoTitle = computed(() => articleDetail.value?.seo_title)
const seoDescription = computed(() => articleDetail.value?.seo_description)
const featuredImage = computed(() => articleDetail.value?.featured_image)
const featuredImageAlt = computed(() => articleDetail.value?.featured_image_alt)
const updatedAt = computed(() => articleDetail.value?.update_time)
const createdAt = computed(() => articleDetail.value?.create_time)

// 转换日期格式为ISO 8601格式
const formatDateToISO = (dateString: string | undefined) => {
  if (!dateString) return ''
  // 将 "2025-07-23 06:31:31" 转换为 "2025-07-23T06:31:31+00:00"
  return dateString.replace(' ', 'T') + '+00:00'
}

const relatedProductData = computed(() => articleDetailData.value?.data?.product_database || {})
const relatedProductTitle = computed(() => relatedProductData.value?.title)
const relatedProductDescription = computed(() => relatedProductData.value?.description)
const relatedProductBadge = computed(() => relatedProductData.value?.badge)
const relatedProductLink = computed(() => relatedProductData.value?.link)
const relatedProductImage = computed(() => relatedProductData.value?.image)
const relatedProductAlt = computed(() => relatedProductData.value?.alt)
// 处理包含商品卡片的内容
const processedContent = computed(() => {
  if (!articleContent.value) return ''
  
  let processedHtml = articleContent.value
  
  // 更宽松的正则表达式，支持各种空格和换行
  const productCardRegex = /<div\s+data-product-card=["']([^"']+)["'][^>]*>\s*<\/div>/gi
  
  // 使用 replaceAll 或者循环替换确保所有匹配都被处理
  processedHtml = processedHtml.replace(productCardRegex, (match: string, productId: string) => {
    


    // 生成商品卡片HTML
    const productCardHtml = `
      <div class="product-card-wrapper my-6 w-full">
        <div class="bg-gradient-to-r from-orange-50 to-blue-50 rounded-lg p-4 border border-orange-200">
          <div class="text-sm text-orange-600 font-semibold mb-3 flex items-center">
            <svg class="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
              <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
            </svg>
            Recommended Product
          </div>
          <div class="product-card bg-white rounded-lg shadow-sm hover:shadow-md transition-all duration-300 p-4 border border-gray-100">
            <div class="flex flex-col sm:flex-row gap-4">
              <!-- 商品图片 -->
              <div class="relative flex-shrink-0">
                <img 
                  src="${relatedProductImage.value}" 
                  alt="${relatedProductAlt.value}" 
                  class="w-full sm:w-28 h-28 object-cover rounded-md"
                  loading="lazy"
                />
                ${relatedProductBadge.value ? `<span class="absolute top-2 left-2 bg-orange-500 text-white text-xs font-bold px-2 py-1 rounded">${relatedProductBadge.value}</span>` : ''}
              </div>
              
              <!-- 商品信息 -->
              <div class="flex-1 space-y-2">
                <h3 class="font-semibold text-base text-gray-900 leading-tight">${relatedProductTitle.value}</h3>
                <p class="text-gray-600 text-sm leading-relaxed">${relatedProductDescription.value}</p>
                
                               
                <!-- 按钮区域 -->
                <div class="flex justify-end pt-2">
                  <a href="${relatedProductLink.value}" class="bg-orange-500 hover:bg-orange-600 text-white font-semibold py-2 px-4 rounded-md transition text-sm whitespace-nowrap">
                    View Details
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    `
    
    return productCardHtml
  })
  
  return processedHtml
})

const jsonLd = computed(() => {
const currentUrl = `https://virtual-company.example${route.path}`
const { generateBreadcrumb } = useSEO()
  // 创建结构化数据数组
const schemaData: any[] = []

  // 面包屑数据
  schemaData.push({
    '@type': 'BreadcrumbList',
    itemListElement: generateBreadcrumb(useRoute()).itemListElement
  })



schemaData.push({
      "@context": "https://schema.org",
      "@type": "NewsArticle",
      "headline": title.value,
      "image":featuredImage.value,
      "datePublished": formatDateToISO(createdAt.value),
      "dateModified": formatDateToISO(updatedAt.value),
      "author": [{
          "@type": "Person",
          "name": author.value,
          "url": currentUrl
        },{
          "@type": "Person",
          "name": author.value,
          "url": currentUrl
      }]
    }

)
return {
  "@context": "https://schema.org",
  "@graph": schemaData
}

})



// 使用 SEO composable
const { setSEO, setDefaultSEO } = useSEO()
useHead({
  title: seoTitle,
  meta: [
    {
      name: 'description',
      content: seoDescription
    },

  ],
  script: [
    {
      type: 'application/ld+json',
      'data-nuxt-schema-org': 'true',
      'data-hid': 'schema-org-graph',
      innerHTML: JSON.stringify(toRaw(jsonLd.value))
    }
  ],
})

</script>

<style scoped>
/* 🎯 博客内容样式 - 适用于真实后台编辑器生成的HTML */
.blog-content {
  line-height: 1.8;
  color: #374151; /* text-gray-700 */
}

/* 使用:deep()确保v-html渲染的内容中的样式生效 */
.blog-content :deep(h1) {
  font-size: 1.875rem; /* text-3xl */
  font-weight: 700; /* font-bold */
  color: #111827; /* text-gray-900 */
  margin-bottom: 1.5rem; /* mb-6 */
  margin-top: 2rem; /* mt-8 */
  line-height: 1.2;
}

.blog-content :deep(h2) {
  font-size: 1.5rem; /* text-2xl */
  font-weight: 700; /* font-bold */
  color: #111827; /* text-gray-900 */
  margin-bottom: 1rem; /* mb-4 */
  margin-top: 2rem; /* mt-8 */
  line-height: 1.3;
}

.blog-content :deep(h3) {
  font-size: 1.25rem; /* text-xl */
  font-weight: 600; /* font-semibold */
  color: #1f2937; /* text-gray-800 */
  margin-bottom: 0.75rem; /* mb-3 */
  margin-top: 1.5rem; /* mt-6 */
  line-height: 1.4;
}

.blog-content :deep(p) {
  color: #374151; /* text-gray-700 */
  margin-bottom: 1rem; /* mb-4 */
  line-height: 1.75; /* leading-relaxed */
}

.blog-content :deep(ul) {
  list-style-type: disc;
  list-style-position: inside;
  color: #374151; /* text-gray-700 */
  margin-bottom: 1rem; /* mb-4 */
}

.blog-content :deep(ol) {
  list-style-type: decimal;
  list-style-position: inside;
  color: #374151; /* text-gray-700 */
  margin-bottom: 1rem; /* mb-4 */
}

.blog-content :deep(li) {
  color: #374151; /* text-gray-700 */
  margin-bottom: 0.5rem;
  line-height: 1.6;
}

.blog-content :deep(img) {
  border-radius: 0.75rem; /* rounded-xl */
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06); /* shadow-sm */
  width: 100%;
  height: auto;
  margin: 1.5rem 0; /* my-6 */
  display: block;
}

.blog-content :deep(blockquote) {
  border-left: 4px solid #f97316; /* border-orange-500 */
  padding-left: 1rem; /* pl-4 */
  font-style: italic;
  color: #4b5563; /* text-gray-600 */
  background-color: #fef3e2; /* bg-orange-50 */
  padding-top: 0.5rem; /* py-2 */
  padding-bottom: 0.5rem;
  margin: 1rem 0; /* my-4 */
  border-radius: 0.25rem;
}

.blog-content :deep(blockquote p) {
  margin: 0;
}

.blog-content :deep(code) {
  background-color: #f3f4f6; /* bg-gray-100 */
  padding: 0.25rem 0.5rem; /* px-2 py-1 */
  border-radius: 0.25rem; /* rounded */
  font-size: 0.875rem; /* text-sm */
  font-family: ui-monospace, SFMono-Regular, "SF Mono", Consolas, "Liberation Mono", Menlo, monospace; /* font-mono */
  color: #1f2937; /* text-gray-800 */
}

.blog-content :deep(pre) {
  background-color: #f3f4f6; /* bg-gray-100 */
  padding: 1rem; /* p-4 */
  border-radius: 0.5rem; /* rounded-lg */
  overflow-x: auto;
  margin: 1rem 0; /* my-4 */
  font-family: ui-monospace, SFMono-Regular, "SF Mono", Consolas, "Liberation Mono", Menlo, monospace;
}

.blog-content :deep(strong) {
  font-weight: 700;
  color: #111827;
}

.blog-content :deep(em) {
  font-style: italic;
  color: #4b5563;
}

.blog-content :deep(a) {
  color: #f97316; /* text-orange-600 */
  text-decoration: underline;
}

.blog-content :deep(a:hover) {
  color: #ea580c; /* hover:text-orange-700 */
}

/* 🎯 商品卡片专用样式 - 确保文字显示且不溢出 */
.blog-content :deep(.product-card-wrapper) {
  max-width: 100%;
  box-sizing: border-box;
  width: 100%;
  word-wrap: break-word;
}

.blog-content :deep(.product-card) {
  max-width: 100%;
  box-sizing: border-box;
  word-wrap: break-word;
}

/* 确保商品卡片内的文字能正常显示 */
.blog-content :deep(.product-card h3) {
  color: #111827 !important;
  font-weight: 600 !important;
  font-size: 1rem !important;
  line-height: 1.4 !important;
  margin: 0 !important;
  display: block !important;
  visibility: visible !important;
}

.blog-content :deep(.product-card p) {
  color: #6b7280 !important;
  font-size: 0.875rem !important;
  line-height: 1.5 !important;
  margin: 0 !important;
  display: block !important;
  visibility: visible !important;
}

.blog-content :deep(.product-card span) {
  display: inline !important;
  visibility: visible !important;
}

/* 价格文字样式 */
.blog-content :deep(.product-card .text-orange-600) {
  color: #ea580c !important;
}

.blog-content :deep(.product-card .text-gray-400) {
  color: #9ca3af !important;
}

.blog-content :deep(.product-card .text-red-700) {
  color: #b91c1c !important;
}

/* 标签文字样式 */
.blog-content :deep(.product-card .text-blue-800) {
  color: #1e40af !important;
}

.blog-content :deep(.product-card .text-gray-600) {
  color: #4b5563 !important;
}

/* 按钮文字样式 */
.blog-content :deep(.product-card a) {
  color: white !important;
  text-decoration: none !important;
  display: inline-block !important;
}

/* 商品卡片悬浮效果 */
.blog-content :deep(.product-card:hover) {
  transform: translateY(-2px);
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
}

/* 确保flex容器在小屏幕下正确换行 */
.blog-content :deep(.product-card .flex) {
  flex-wrap: wrap;
}

/* 响应式处理 - 防止PC端内容过宽 */
@media (min-width: 768px) {
  .blog-content :deep(.product-card-wrapper) {
    max-width: calc(100% - 2rem);
  }
}

/* 响应式调整 */
@media (max-width: 640px) {
  .blog-content :deep(h1) {
    font-size: 1.5rem; /* 移动端较小 */
  }
  
  .blog-content :deep(h2) {
    font-size: 1.25rem;
  }
  
  .blog-content :deep(h3) {
    font-size: 1.125rem;
  }
  
  /* 移动端商品卡片优化 */
  .blog-content :deep(.product-card-wrapper) {
    margin: 1rem 0;
  }
  
  .blog-content :deep(.product-card) {
    padding: 0.75rem;
  }
}
</style>
