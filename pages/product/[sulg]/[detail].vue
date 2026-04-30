<template>
  <div class="min-h-screen bg-[#fcf9f4]">
    <HeadNavbar />
    <!-- 加载状态 -->
    <div v-show="pending" class="flex items-center justify-center min-h-screen">
      <div class="text-center">
        <div class="animate-spin rounded-full h-32 w-32 border-b-2 border-orange-500"></div>
        <p class="mt-4 text-gray-600">Loading product details...</p>
      </div>
    </div>
    <!-- 产品详情内容 -->
    <div v-show="!pending">
    <section class="max-w-7xl mx-auto px-2  sm:px-4 py-16 flex flex-col lg:flex-row gap-8">
      <!-- 左侧 sticky 图片区 -->
      <div class="lg:w-[48%] w-full flex flex-col items-center lg:items-start">
        <div class="sticky top-24 w-full flex flex-col lg:flex-row items-center lg:items-start gap-3">
          <!-- 缩略图区 -->
          <div class="flex flex-col items-center order-2 w-full lg:order-1 lg:w-20 lg:justify-start lg:items-center lg:overflow-x-visible lg:py-0 relative">
            <!-- 上箭头 -->
            <button
              class="hidden lg:flex mb-2 bg-white border rounded-full p-1 shadow hover:bg-gray-50 transition-colors"
              @click="scrollThumbs(-1)"
            >
              <svg class="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M19 15l-7-7-7 7"/></svg>
            </button>
            <transition-group name="thumb-fade" tag="div" class="flex gap-3 select-none w-full justify-center overflow-x-auto py-2 lg:flex-col lg:w-20 lg:justify-start lg:items-center lg:overflow-x-visible lg:py-0">
              <img v-for="(img, idx) in visibleThumbs" :key="'thumb'+(thumbStart+idx)"
                :src="img.image_url"
                class="w-16 h-16 object-cover rounded-lg border cursor-pointer hover:border-orange-400 transition-all duration-150"
                :class="{ 'border-orange-500 ring-2 ring-orange-200': (thumbStart+idx) === currentImg }"
                @click="currentImg = thumbStart+idx"
              />
            </transition-group>
            <!-- 下箭头 -->
            <button
              class="hidden lg:flex mt-2 bg-white border rounded-full p-1 shadow hover:bg-gray-50 transition-colors"
              @click="scrollThumbs(1)"
            >
              <svg class="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M5 9l7 7 7-7"/></svg>
            </button>
          </div>
          <!-- 主图区 -->
          <div 
            class="relative w-full max-w-xl flex flex-col items-center order-1 lg:order-2"
            @touchstart="handleImageTouchStart"
            @touchmove="handleImageTouchMove"
            @touchend="handleImageTouchEnd"
          >
            <img v-show="images.length > 0" :src="images[currentImg].image_url" :alt="images[currentImg].alt_text" class="rounded-2xl shadow-lg w-full object-cover border border-gray-200" style="min-height:340px;max-height:480px;" />
            <div v-show="images.length === 0" class="rounded-2xl shadow-lg w-full border border-gray-200 bg-gray-100 flex items-center justify-center" style="min-height:340px;max-height:480px;">
              <p class="text-gray-500">No image available</p>
            </div>
            <!-- 视频角标按钮（仅当有视频时显示） -->
            <button 
              v-if="hasVideo" 
              class="absolute bottom-4 right-4 bg-white/90 rounded-full p-3 shadow hover:bg-white border border-gray-200" 
              title="播放视频" 
              aria-label="播放产品视频"
              @click="showVideo = true"
            >
              <svg class="w-8 h-8 text-gray-700" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true"><path d="M6 4l10 6-10 6V4z"/></svg>
            </button>
            <!-- 放大镜按钮（已禁用） -->
            <button 
              class="absolute bottom-4 left-4 bg-white/90 rounded-full p-2 shadow hover:bg-white border border-gray-200 cursor-not-allowed" 
              title="Zoom" 
              aria-label="放大图片（功能暂未开放）"
              @click.prevent
            >
              <svg class="w-6 h-6 text-gray-300" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24" aria-hidden="true"><circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35"/></svg>
            </button>
            <!-- 视频弹窗Dialog -->
            <div v-if="showVideo" class="fixed inset-0 z-50 flex items-center justify-center bg-black/60" @click.self="closeVideo">
              <div class="relative bg-white rounded-2xl shadow-lg p-4 max-w-4xl max-h-[90vh] w-full mx-4" @click.stop>
                <button 
                  class="absolute top-2 right-2 bg-gray-100 rounded-full p-1 z-10" 
                  aria-label="关闭视频"
                  title="关闭视频"
                  @click="closeVideo"
                >
                  <svg class="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12"/></svg>
                </button>
                <video ref="videoPlayer" :src="video" class="w-full max-h-[80vh] rounded-lg object-contain" controls autoplay></video>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- 右侧 商品信息区 -->
      <div class="lg:w-[52%] w-full flex flex-col gap-10">
        <div class="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 p-8">
          <!-- 标题 -->
          <h1 class="text-2xl sm:text-3xl font-bold mb-6 leading-tight">{{ title }}</h1>
          <!-- 详细SKU信息表 -->
          <div class="divide-y divide-gray-100 mb-6">
            <div v-for="(attribute, index) in attributes" :key="index" class="flex justify-between items-center py-3 text-gray-600 text-sm">
              <span class="font-medium w-32 sm:w-36 text-left">{{ attribute.attribute_label }}</span>
              <span class="flex-1 text-right">{{ attribute.attribute_value }}</span>
            </div>
          </div>
          <!-- 产品特色描述 -->
          <div class="bg-gradient-to-r from-orange-50 to-yellow-50 border-l-4 border-orange-400 p-6 mt-6 rounded-r-lg shadow-sm">
            <h3 class="font-semibold text-gray-800 mb-4 text-lg">🌟 Product Features</h3>
            <div class="text-gray-700 text-sm space-y-2" v-html="customDescription">
            </div>
          </div>
          <div class="text-gray-700 text-sm mt-4">For custom parameters or special requirements, please contact customer service.</div>
        </div>
        <!-- 配件推荐 -->
        <div class="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 p-8">
          <div class="font-bold mb-6 text-lg">🎯 Product Combinations</div>
          <div class="space-y-4">
            <div v-for="(item, idx) in bundles" :key="idx" class="flex items-center gap-3">
              <img :src="item.img" class="w-14 h-14 object-cover rounded-lg border" />
              <div class="flex-1">
                <div class="text-sm font-semibold">{{ item.title }}</div>
              </div>
              
            </div>
          </div>
        </div>
        <!-- FAQ -->
        <div class="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 p-8">
          <div class="font-bold mb-6 text-lg">❓ FAQ</div>
          <div v-for="(faq, idx) in faqs" :key="idx" class="border-b last:border-b-0 border-gray-200 py-4">
            <button class="w-full text-left flex justify-between items-center font-semibold text-gray-800" @click="toggleFaq(idx)">
              <span>{{ faq.question }}</span>
              <svg :class="{'rotate-180': faq.is_open_default}" class="w-4 h-4 ml-2 transition-transform" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M19 9l-7 7-7-7"/></svg>
            </button>
            <div v-show="faq.is_open_default" class="text-gray-600 text-sm mt-2">{{ faq.answer }}</div>
          </div>
        </div>
        <!-- 评价区 -->
        <div class="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 p-8">
          <div class="font-bold mb-6 text-lg">⭐ Customer Reviews</div>
          <div class="flex items-center gap-2 mb-2">
            <span class="text-orange-500 font-bold text-2xl">4.9</span>
            <div class="flex space-x-0.5">
              <svg v-for="i in 5" :key="i" class="w-5 h-5" :fill="i <= 5 ? '#ffb400' : '#e5e7eb'" viewBox="0 0 20 20"><polygon points="10,1 12.59,7.36 19.51,7.36 13.97,11.64 16.56,18 10,13.72 3.44,18 6.03,11.64 0.49,7.36 7.41,7.36"/></svg>
            </div>
            <span class="text-xs text-gray-500">Based on 12 reviews</span>
          </div>
          <div class="mb-4">
            <button class="bg-orange-500 text-white px-4 py-2 rounded mr-2">Write a review</button>
            <button class="bg-white border border-orange-500 text-orange-500 px-4 py-2 rounded">Ask a question</button>
          </div>
          <div class="space-y-6">
            <div v-for="(review, idx) in reviews" :key="idx" class="border-b last:border-b-0 border-gray-100 pb-4">
              <div class="flex items-center gap-2 mb-1">
                <span class="font-bold text-orange-500">{{ review.nickname }}</span>
                <span class="text-xs text-gray-400">{{ review.review_date}}</span>
              </div>
              <div class="flex space-x-0.5 mb-1">
                <svg v-for="i in 5" :key="i" class="w-4 h-4" :fill="i <= review.rating ? '#ffb400' : '#e5e7eb'" viewBox="0 0 20 20"><polygon points="10,1 12.59,7.36 19.51,7.36 13.97,11.64 16.56,18 10,13.72 3.44,18 6.03,11.64 0.49,7.36 7.41,7.36"/></svg>
              </div>
              <div class="text-gray-700 text-sm mb-1">{{ review.content }}</div>
              <div v-show="review.reply" class="bg-gray-50 border-l-4 border-orange-300 p-2 text-xs text-gray-600 mt-2">{{ review.reply }}</div>
            </div>
          </div>
          
        </div>
        <!-- 底部卖点 -->
        <div class="grid grid-cols-2 sm:grid-cols-4 gap-6 mt-12 bg-white rounded-2xl shadow-lg p-8">
          <div v-for="(point, idx) in sellingPoints" :key="idx" class="flex flex-col items-center text-center">
            <span class="text-3xl mb-3">{{ point.icon }}</span>
            <div class="font-semibold text-sm mb-2">{{ point.title }}</div>
            <div class="text-xs text-gray-500 leading-relaxed">{{ point.desc }}</div>
          </div>
        </div>
      </div>
    </section>
    <AppFooter />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch, nextTick } from 'vue'
import { getProductDetail } from '@/apis/product'
import type { ProductDetail, ProductBundle, ProductFAQ } from '@/types'

// 应用产品路由守卫中间件
definePageMeta({
  // middleware: ['product-guard']
})

const config = useRuntimeConfig()
const route = useRoute()

// 从路由参数获取分类和详情
const categorySlug = route.params.sulg as string
const productSlug = route.params.detail as string

// 使用 useAsyncData 获取产品详情数据
const { data: productDetailData, pending, error } = await useAsyncData(
  `product-${categorySlug}-${productSlug}`,
  () => getProductDetail(categorySlug, productSlug)
)

// 如果获取失败，显示错误或重定向
if (error.value || !productDetailData.value) {
  throw createError({
    statusCode: 404,
    statusMessage: 'Product not found'
  })
}

// 从API响应中提取产品详情

const productDetail = computed(() => productDetailData.value as ProductDetail)

// 响应式数据
const images = computed(() => productDetail.value?.images || [])
const reviews = computed(() => productDetail.value?.reviews || [])
const video = computed(() => productDetail.value?.video || '')
const hasVideo = computed(() => productDetail.value?.hasVideo || false)
const title = computed(() => productDetail.value?.title || '')
const description = computed(() => productDetail.value?.description || '')
const badge = computed(() => productDetail.value?.badge || '')
const attributes = computed(() => productDetail.value?.attributes || [])
const customDescription = computed(() => productDetail.value?.customDescription || '')
const productSkuId = computed(() => productDetail.value?.skuid || '')
const bundles = ref<ProductBundle[]>([])
const faqs = ref<ProductFAQ[]>([])

const seoTitle = computed(() => productDetail.value?.seo_title)
const seoDescription = computed(() => productDetail.value?.seo_description)

// 图片轮播相关变量 - 需要在watch之前声明
const currentImg = ref(0)
const maxThumbs = 5
const thumbStart = ref(0)

// 图片触摸滑动相关变量
const imageTouchStartX = ref(0)
const imageTouchEndX = ref(0)
const imageMinSwipeDistance = 50 // 最小滑动距离

// 视频播放控制变量 - 需要在watch之前声明
const isPlaying = ref(false)
const mainVideo = ref<HTMLVideoElement | null>(null)
const showVideo = ref(false)
const videoPlayer = ref<HTMLVideoElement | null>(null)

// 当产品数据加载完成后，更新 bundles 和 faqs
watch(productDetail, (newProduct) => {
  if (newProduct) {
    bundles.value = newProduct.bundles || []
    faqs.value = newProduct.faqs || []
  }
}, { immediate: true })

// 确保 currentImg 索引始终在有效范围内
watch(images, (newImages) => {
  if (newImages && newImages.length > 0) {
    if (currentImg.value >= newImages.length) {
      currentImg.value = 0
    }
  }
}, { immediate: true })
const visibleThumbs = computed(() => {
  if (currentImg.value < thumbStart.value) {
    thumbStart.value = currentImg.value
  } else if (currentImg.value >= thumbStart.value + maxThumbs) {
    thumbStart.value = currentImg.value - maxThumbs + 1
  }
  return images.value.slice(thumbStart.value, thumbStart.value + Math.min(maxThumbs, images.value.length))
})

function scrollThumbs(dir: number) {
  // console.log('Scroll direction:', dir);
  
  const totalImages = images.value.length
  
  // 如果没有图片，直接返回
  if (totalImages === 0) {
    return
  }
  
  // 单张图片循环滚动逻辑
  if (dir > 0) {
    // 向下滚动：下一张图片
    currentImg.value = (currentImg.value + 1) % totalImages
  } else {
    // 向上滚动：上一张图片
    currentImg.value = (currentImg.value - 1 + totalImages) % totalImages
  }
  
  // 确保当前图片在可见范围内
  if (currentImg.value < thumbStart.value) {
    // 当前图片在可见范围之前，需要向上调整显示范围
    thumbStart.value = currentImg.value
  } else if (currentImg.value >= thumbStart.value + maxThumbs) {
    // 当前图片在可见范围之后，需要向下调整显示范围
    thumbStart.value = currentImg.value - maxThumbs + 1
  }

}

function toggleFaq(idx: number) {
  faqs.value[idx].is_open_default = !faqs.value[idx].is_open_default
}

// 图片触摸事件处理函数
function handleImageTouchStart(event: TouchEvent) {
  imageTouchStartX.value = event.touches[0].clientX
}

function handleImageTouchMove(event: TouchEvent) {
  imageTouchEndX.value = event.touches[0].clientX
}

function handleImageTouchEnd() {
  if (!imageTouchStartX.value || !imageTouchEndX.value) return
  
  const distance = imageTouchStartX.value - imageTouchEndX.value
  const isLeftSwipe = distance > imageMinSwipeDistance
  const isRightSwipe = distance < -imageMinSwipeDistance
  
  if (isLeftSwipe) {
    // 向左滑动，显示下一张图片
    scrollThumbs(1)
  } else if (isRightSwipe) {
    // 向右滑动，显示上一张图片
    scrollThumbs(-1)
  }
  
  // 重置触摸坐标
  imageTouchStartX.value = 0
  imageTouchEndX.value = 0
}



const sellingPoints = [
  { icon: '🎨', title: 'Custom Design', desc: 'Professional customization services with your logo, text, or unique designs to match your brand perfectly.' },
  { icon: '⚡', title: 'Fast Delivery', desc: 'Quick turnaround times to meet your deadlines, with express shipping options available worldwide.' },
  { icon: '💎', title: 'Premium Quality', desc: 'High-quality materials and craftsmanship ensure durable, professional-looking custom gifts.' },
  { icon: '🤝', title: 'Bulk Pricing', desc: 'Competitive wholesale pricing for bulk orders with dedicated account management support.' }
]




// 视频播放控制函数
function playVideo() {
  isPlaying.value = true
  nextTick(() => {
    if (mainVideo.value) {
      mainVideo.value.play()
    }
  })
}

// 当切换图片/视频时，自动暂停视频
watch(currentImg, () => {
  isPlaying.value = false
  if (mainVideo.value) {
    mainVideo.value.pause()
    mainVideo.value.currentTime = 0
  }
})

// 关闭视频弹窗的函数
function closeVideo() {
  if (videoPlayer.value) {
    videoPlayer.value.pause()
    videoPlayer.value.currentTime = 0
  }
  showVideo.value = false
}
const { generateBreadcrumb } = useSEO()

const jsonLd = computed(() => {
  const currentUrl = `https://virtual-company.example${route.path}`
  
  // 创建结构化数据数组
  const schemaData: any[] = []

  // 获取原始数据，避免循环引用
  const currentProductDetail = productDetailData.value
  const productReviews = reviews.value
  const productTitle = title.value
  const productDescription = description.value
  const currentProductSkuId = productSkuId.value
  const productImages = images.value
  const productCategory = productDetail.value?.category

  const reviewsData: any[] = []
  if (productReviews && Array.isArray(productReviews)) {
    productReviews.forEach((review: any) => {
      reviewsData.push({
        '@type': 'Review',
        reviewBody: review.content,
        reviewRating: {
          '@type': 'Rating',
          ratingValue: review.rating,
          bestRating: '5'
        },
        author: {
          '@type': 'Person',
          name: review.nickname
        },
        datePublished: review.review_date,
      })
    })
  }

  // 产品数据
  schemaData.push({
    '@type': 'Product',
    name: productTitle,
    image: productImages && productImages.length > 0 ? `https://virtual-company.example${productImages[0].image_url}` : '',
    description: productDescription,
    sku: currentProductSkuId,
    brand: {
      '@type': 'Brand',
      name: 'Virtual Company'
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.8',
      reviewCount: '156',
      bestRating: '5',
      worstRating: '1'
    },
    review: reviewsData,
    offers: {
      '@type': 'Offer',
      price: '1.00',
      priceCurrency: 'USD',
      priceValidUntil: '2029-12-31',
      availability: 'https://schema.org/PreOrder',
      url: currentUrl,
      seller: {
        '@type': 'Organization',
        name: 'Virtual Company'
      }
    },
    category: productCategory || 'Custom Gifts',
    mpn: currentProductSkuId
  })

  // 基础页面信息
  schemaData.push({
    '@type': 'WebPage',
    '@id': currentUrl,
    url: currentUrl,
    name: currentProductDetail?.title || 'Product Detail',
    inLanguage: 'en-US',
    description: currentProductDetail?.description || 'Product detail page',
  })

  // 面包屑数据
  schemaData.push({
    '@type': 'BreadcrumbList',
    itemListElement: generateBreadcrumb(useRoute()).itemListElement
  })

  return {
    '@context': 'https://schema.org',
    '@graph': schemaData
  }
})





useHead({
  title: seoTitle,
  meta: [
    {
      name: 'description',
      content: seoDescription
    }
    
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

useSeoMeta({
  title: seoTitle,
  description: seoDescription,
  ogTitle: seoTitle,
  ogDescription: seoDescription,
  ogImage: '/og-image.jpg',
  ogUrl: config.public.baseUrl || 'https://virtual-company.example',
  ogType: 'website',
  twitterCard: 'summary_large_image',
  twitterTitle: seoTitle,
  twitterDescription: seoDescription,
  twitterSite: config.public.baseUrl || 'https://virtual-company.example',
  twitterImage: '/twitter-image.jpg'
});

</script>

<style scoped>
.thumb-fade-move {
  transition: transform 0.3s;
}
.thumb-fade-enter-active, .thumb-fade-leave-active {
  transition: opacity 0.3s;
}
.thumb-fade-enter-from, .thumb-fade-leave-to {
  opacity: 0;
}
</style>
