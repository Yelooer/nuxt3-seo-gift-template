<template>
  <section class="mx-auto mt-12 max-w-7xl px-4 py-8 sm:px-6 md:py-12 lg:px-8">
    <div class="grid grid-cols-3 gap-x-4 gap-y-6 md:grid-cols-6">
      <NuxtLink
        v-for="category in productCategories"
        :key="category.name"
        :to="category.link"
        :class="[
          'group flex cursor-pointer flex-col items-center rounded-xl p-3 text-center transition-all duration-300',
          activeCategoryName === category.name
            ? 'bg-blue-500 hover:bg-[#418cc4]'
            : 'bg-gray-400 hover:bg-[#418cc4]'
        ]"
        @click="handleCategoryClick(category.category_key)"
      >
        <div class="flex flex-col items-center">
          <nuxt-icon class="text-[6rem]" :name="category.image" filled />
        </div>
        <span class="mt-2 text-xs font-semibold text-white transition-colors sm:text-base">
          {{ category.name }}
        </span>
      </NuxtLink>
    </div>
  </section>
</template>

<script setup lang="ts">
import { getIndexProductCategories } from '~/apis'
import type { ProductsData } from '~/types'

const route = useRoute()

// 获取产品分类导航数据。
const { data: productCategoriesData } = await useAsyncData('productCategories', () => getIndexProductCategories())

const productCategories = computed<ProductsData[]>(() => {
  if (productCategoriesData.value && productCategoriesData.value.code === 200)
    return productCategoriesData.value.data.products

  return []
})

// 当前选中的分类名称，用于高亮导航。
const activeCategoryName = computed(() => {
  const currentCategorySlug = route.path.split('/').pop()
  const activeCategory = productCategories.value.find(category => category.category_key === currentCategorySlug)
  return activeCategory ? activeCategory.name : ''
})

// 预留分类点击扩展点，后续可接入埋点或筛选逻辑。
const handleCategoryClick = (categoryKey: string) => {
  void categoryKey
}
</script>
