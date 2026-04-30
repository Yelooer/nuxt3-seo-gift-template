<template>
  <div class="min-h-screen">
    <HeadNavbar />

    <!-- 产品页顶部横幅 -->
    <div class="relative mb-6 mt-10 hidden min-h-[320px] w-full items-center justify-between overflow-hidden rounded-xl bg-white py-10 lg:flex">
      <img src="/imgs/product/d8bf119afdfcb1250d3e3e7599335512.webp" alt="New Products Banner" class="h-[320px] w-full object-cover object-center">
    </div>

    <NavigationSection />

    <section class="mx-auto mt-10 max-w-7xl px-2 sm:mt-0 sm:px-4">
      <div v-show="pending" class="grid grid-cols-2 gap-2 md:grid-cols-3 sm:gap-6">
        <div v-for="i in 6" :key="i" class="group relative flex flex-col rounded-2xl border border-gray-100 bg-white/90 p-2 shadow-sm sm:p-3">
          <div class="mb-2 aspect-[1/1] w-full rounded-xl bg-gray-200 animate-pulse" />
          <div class="mb-1 h-4 rounded bg-gray-200 animate-pulse" />
          <div class="mb-1 h-4 w-3/4 rounded bg-gray-200 animate-pulse" />
          <div class="mb-3 flex gap-1">
            <div class="h-6 w-16 rounded-full bg-gray-200 animate-pulse" />
            <div class="h-6 w-20 rounded-full bg-gray-200 animate-pulse" />
          </div>
          <div class="mt-auto h-10 rounded-lg bg-gray-200 animate-pulse" />
        </div>
      </div>

      <div v-show="!pending && error" class="py-12 text-center">
        <div class="text-lg text-red-600">{{ error?.message || 'Loading Failed' }}</div>
        <button class="mt-4 rounded-lg bg-orange-600 px-4 py-2 text-white hover:bg-orange-700" @click="() => refresh()">
          Retry
        </button>
      </div>

      <div v-show="!pending && !error" class="grid grid-cols-2 gap-2 md:grid-cols-3 sm:gap-6">
        <div
          v-for="product in productShowcasePageData?.showcases"
          :key="product.title"
          class="group relative flex flex-col rounded-2xl border border-gray-100 bg-white/90 p-2 shadow-sm transition hover:shadow-lg sm:p-3"
        >
          <span v-show="product.badge" class="absolute left-3 top-3 z-10 rounded bg-orange-500 px-2 py-0.5 text-xs font-bold text-white">
            {{ product.badge }}
          </span>

          <button
            class="absolute right-3 top-3 z-10 rounded-full border border-gray-200 bg-white/80 p-1 shadow hover:bg-white"
            :aria-label="`Add ${product.title} to favorites`"
            title="Add to favorites"
          >
            <svg class="h-5 w-5 text-gray-400 transition group-hover:text-orange-500" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" d="M4.318 6.318a4.5 4.5 0 0 1 6.364 0L12 7.636l1.318-1.318a4.5 4.5 0 1 1 6.364 6.364L12 21.364l-7.682-7.682a4.5 4.5 0 0 1 0-6.364z" /></svg>
          </button>

          <NuxtLink :to="product.link">
            <img :src="product.image" :alt="product.alt" class="mb-2 aspect-[1/1] w-full rounded-xl object-cover transition group-hover:scale-105">
          </NuxtLink>

          <NuxtLink :to="product.link">
            <div class="mb-1 min-h-[2.5em] line-clamp-2 text-base font-semibold text-gray-900">{{ product.title }}</div>
          </NuxtLink>

          <div class="mb-3">
            <div class="flex flex-wrap gap-1">
              <span
                v-for="scene in product.applicableScenes"
                :key="scene"
                class="rounded-full bg-blue-100 px-2 py-1 text-xs font-medium text-blue-800"
              >
                {{ scene }}
              </span>
            </div>
          </div>

          <button class="mt-auto w-full rounded-lg bg-gray-900 py-2 text-base font-semibold text-white transition hover:bg-gray-700">
            Inquire Price
          </button>
        </div>
      </div>

      <div v-show="!pending && !error && (!productShowcasePageData?.showcases || productShowcasePageData.showcases.length === 0)" class="py-12 text-center">
        <div class="text-lg text-gray-500">No product data available</div>
      </div>

      <div v-show="!pending && !error && (productShowcasePageData?.showcases?.length || 0) > 0" class="mt-10 flex justify-center gap-2">
        <button v-for="i in 3" :key="i" class="rounded border bg-white px-3 py-1 text-gray-700 hover:bg-gray-100">{{ i }}</button>
      </div>
    </section>

    <AppFooter />
  </div>
</template>

<script setup lang="ts">
import { getProductShowcases } from '~/apis/product'

definePageMeta({
  // middleware: ['product-guard']
})

const route = useRoute()
const { generateBreadcrumb } = useSEO()

// 当前分类路由参数。
const categorySlug = route.params.sulg as string

// 获取产品分类展示数据。
const { data: productShowcasePageData, pending, error, refresh } = await useLazyAsyncData(
  `product-showcases-${categorySlug}`,
  () => getProductShowcases(categorySlug),
  {
    server: true,
    default: () => null
  }
)

// 构建当前页面的结构化数据。
const productListSchema = computed(() => {
  const currentPageUrl = `https://virtual-company.example${route.path}`
  const schemaItems: any[] = []

  schemaItems.push({
    '@type': 'WebPage',
    '@id': currentPageUrl,
    url: currentPageUrl,
    name: productShowcasePageData.value?.title || 'Product List',
    inLanguage: 'en-US',
    description: productShowcasePageData.value?.description || 'Browse our products'
  })

  schemaItems.push({
    '@type': 'BreadcrumbList',
    itemListElement: generateBreadcrumb(useRoute()).itemListElement
  })

  const showcaseProducts = productShowcasePageData.value?.showcases
  if (showcaseProducts && Array.isArray(showcaseProducts)) {
    showcaseProducts.forEach((product: any, index: number) => {
      const reviewItems: any[] = []

      if (product.reviews && Array.isArray(product.reviews)) {
        product.reviews.forEach((review: any) => {
          reviewItems.push({
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
            datePublished: review.review_date
          })
        })
      }

      schemaItems.push({
        '@type': 'Product',
        name: product.title || product.name,
        image: `https://virtual-company.example${product.image}`,
        description: product.description || product.desc || `High-quality ${product.title || product.name} from Virtual Company`,
        sku: product.skuid || `product-${index + 1}`,
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
        review: reviewItems,
        offers: {
          '@type': 'Offer',
          price: '1.00',
          priceCurrency: 'USD',
          priceValidUntil: '2029-12-31',
          availability: 'https://schema.org/PreOrder',
          url: `https://virtual-company.example${product.link}`,
          seller: {
            '@type': 'Organization',
            name: 'Virtual Company'
          }
        },
        category: product.category || 'Custom Gifts',
        mpn: product.skuid || `YH-${String(index + 1).padStart(3, '0')}`
      })
    })
  }

  return {
    '@context': 'https://schema.org',
    '@graph': schemaItems
  }
})

useHead({
  title: productShowcasePageData.value?.title || 'Product List',
  meta: [
    {
      name: 'description',
      content: productShowcasePageData.value?.description || 'Browse our products and find the perfect choice for you'
    }
  ],
  script: [
    {
      type: 'application/ld+json',
      innerHTML: JSON.stringify(toRaw(productListSchema.value))
    }
  ]
})
</script>
