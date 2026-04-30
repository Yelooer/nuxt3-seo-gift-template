import type {
  ApiQueryParams,
  BlogProductCard,
  ProductDetail,
  ProductDetailResponse,
  ProductShowcasesData,
  ProductShowcasesResponse
} from '@/types'

// 获取产品分类列表页数据。
export async function getProductShowcases(categorySlug: string, query: ApiQueryParams = {}): Promise<ProductShowcasesData> {
  const response = await useHttpGet<ProductShowcasesResponse>(`/product/${categorySlug}`, query)
  return response.data.ShowcasesData
}

// 获取产品详情页数据。
export async function getProductDetail(categorySlug: string, productSlug: string, query: ApiQueryParams = {}): Promise<ProductDetail> {
  const response = await useHttpGet<ProductDetailResponse>(`/product/${categorySlug}/${productSlug}`, query)
  return response.data.ProductDetail
}

// 获取博客中嵌入的商品卡片数据。
export async function getBlogProductCards(productIds: string[]): Promise<BlogProductCard[]> {
  try {
    const response = await $fetch<{ data: BlogProductCard[] }>('/api/blog/products', {
      method: 'POST',
      body: { productIds }
    })

    return response.data
  } catch (error) {
    console.error('获取博客商品卡片失败：', error)
    throw error
  }
}

// 获取单个博客商品卡片数据。
export async function getSingleProductCard(productId: string): Promise<BlogProductCard | null> {
  try {
    const products = await getBlogProductCards([productId])
    return products[0] || null
  } catch (error) {
    console.error('获取单个博客商品卡片失败：', error)
    return null
  }
}
