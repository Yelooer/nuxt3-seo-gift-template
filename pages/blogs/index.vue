<template>
  <div class="flex min-h-screen flex-col bg-[#fcf9f4]">
    <HeadNavbar />

    <div class="w-full border-b border-gray-100 bg-white pb-4 pt-20">
      <div class="mx-auto max-w-7xl px-4">
        <div class="mb-2 text-sm text-gray-400">Home / Blog</div>
      </div>
    </div>

    <main class="mx-auto flex-1 w-full max-w-7xl px-2 py-8 sm:px-4">
      <div v-show="pending" class="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
        <div v-for="i in 6" :key="i" class="flex flex-col overflow-hidden rounded-2xl border border-gray-100 bg-white p-0 shadow group">
          <div class="h-56 w-full rounded-t-2xl bg-gray-200 animate-pulse" />
          <div class="flex flex-1 flex-col p-5">
            <div class="mb-2 flex items-center gap-2">
              <div class="h-4 w-16 rounded bg-gray-200 animate-pulse" />
              <div class="h-4 w-20 rounded bg-gray-200 animate-pulse" />
            </div>
            <div class="mb-2 h-6 rounded bg-gray-200 animate-pulse" />
            <div class="mb-2 h-6 w-3/4 rounded bg-gray-200 animate-pulse" />
            <div class="mb-1 h-4 rounded bg-gray-200 animate-pulse" />
            <div class="mb-1 h-4 w-5/6 rounded bg-gray-200 animate-pulse" />
            <div class="h-4 w-2/3 rounded bg-gray-200 animate-pulse" />
          </div>
        </div>
      </div>

      <div v-show="!pending && error" class="py-12 text-center">
        <div class="text-lg text-red-600">{{ error?.message || 'Loading Failed' }}</div>
        <button class="mt-4 rounded-lg bg-orange-600 px-4 py-2 text-white hover:bg-orange-700" @click="() => refresh()">
          Retry
        </button>
      </div>

      <div v-show="!pending && !error" class="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
        <div v-for="article in blogListPageData?.data?.BlogsData?.blogs" :key="article.article_key" class="group flex flex-col overflow-hidden rounded-2xl border border-gray-100 bg-white p-0 shadow">
          <NuxtLink :to="`/blogs/${article.article_key}`">
            <img :src="article.featured_image" :alt="article.featured_image_alt" class="h-56 w-full rounded-t-2xl object-cover object-center transition group-hover:scale-105">
          </NuxtLink>

          <div class="flex flex-1 flex-col p-5">
            <div class="mb-2 flex items-center gap-2">
              <span v-show="article.tags" class="rounded bg-orange-50 px-2 py-0.5 text-xs font-semibold text-orange-600">{{ article.tags }}</span>
              <span class="text-xs text-gray-400">{{ article.publish_date }}</span>
            </div>

            <NuxtLink :to="`/blogs/${article.article_key}`">
              <div class="mb-2 line-clamp-2 text-lg font-bold text-gray-900">{{ article.title }}</div>
            </NuxtLink>

            <NuxtLink :to="`/blogs/${article.article_key}`">
              <div class="mb-4 line-clamp-3 flex-1 text-sm text-gray-600">{{ article.description }}</div>
            </NuxtLink>

            <div class="mt-auto flex items-center gap-2 text-xs text-gray-400">
              <NuxtLink :to="`/blogs/${article.article_key}`">
                <span>Read More</span>
              </NuxtLink>
              <svg class="h-4 w-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7" /></svg>
            </div>
          </div>
        </div>
      </div>

      <div v-show="!pending && !error && (!blogListPageData?.data?.BlogsData?.blogs || blogListPageData.data.BlogsData.blogs.length === 0)" class="py-12 text-center">
        <div class="text-lg text-gray-500">No blog data available</div>
      </div>

      <div v-show="!pending && !error && (blogListPageData?.data?.BlogsData?.blogs?.length || 0) > 0" class="mt-10 flex justify-center gap-2">
        <button v-for="i in 3" :key="i" class="rounded border bg-white px-3 py-1 text-gray-700 hover:bg-gray-100">{{ i }}</button>
        <button class="rounded border bg-white px-3 py-1 text-gray-700 hover:bg-gray-100">27</button>
        <button class="rounded border bg-white px-3 py-1 text-gray-700 hover:bg-gray-100">
          <svg class="h-4 w-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7" /></svg>
        </button>
      </div>
    </main>

    <AppFooter />
  </div>
</template>

<script setup lang="ts">
import { getBlogList } from '~/apis/blog'

const route = useRoute()
const { generateBreadcrumb } = useSEO()

// 获取博客列表页数据。
const { data: blogListPageData, pending, error, refresh } = await useAsyncData(
  'blog-list-page',
  () => getBlogList(),
  {
    server: true,
    default: () => null
  }
)

// 页面标题和描述。
const pageTitle = blogListPageData.value?.data?.BlogsData?.title
const pageDescription = blogListPageData.value?.data?.BlogsData?.description

// 构建博客列表页的结构化数据。
const blogListSchema = computed(() => {
  const currentPageUrl = `https://virtual-company.example${route.path}`
  const schemaItems: any[] = []

  schemaItems.push({
    '@type': 'BreadcrumbList',
    itemListElement: generateBreadcrumb(useRoute()).itemListElement
  })

  schemaItems.push({
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': currentPageUrl
    },
    headline: pageDescription,
    description: pageDescription,
    image: 'https://virtual-company.example/brand-preview.png',
    author: {
      '@type': 'Organization',
      name: 'Virtual Company',
      url: 'https://virtual-company.example'
    },
    publisher: {
      '@type': 'Organization',
      name: 'Virtual Company',
      logo: {
        '@type': 'ImageObject',
        url: 'https://virtual-company.example/brand-preview.png'
      }
    },
    datePublished: ''
  })

  return {
    '@context': 'https://schema.org',
    '@graph': schemaItems
  }
})

useHead({
  title: pageTitle,
  meta: [
    {
      name: 'description',
      content: pageDescription
    }
  ],
  script: [
    {
      type: 'application/ld+json',
      'data-nuxt-schema-org': 'true',
      'data-hid': 'schema-org-graph',
      innerHTML: JSON.stringify(toRaw(blogListSchema.value))
    }
  ]
})
</script>
