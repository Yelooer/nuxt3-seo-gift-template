import type {
  ApiQueryParams,
  IndexBannerResponse,
  IndexBrandResponse,
  IndexContactResponse,
  IndexFeaturesResponse,
  IndexNewArrivalsResponse,
  IndexProductCategoriesResponse,
  IndexWholesaleResponse
} from '~/types/index'

// 获取首页 Banner 数据。
export function getIndexBanner(query: ApiQueryParams = {}): Promise<IndexBannerResponse> {
  return useHttpGet<IndexBannerResponse>('/index/banner', query)
}

// 获取首页产品分类数据。
export function getIndexProductCategories(query: ApiQueryParams = {}): Promise<IndexProductCategoriesResponse> {
  return useHttpGet<IndexProductCategoriesResponse>('/index/product', query)
}

// 获取首页新品列表。
export function getIndexNewArrivals(query: ApiQueryParams = {}): Promise<IndexNewArrivalsResponse> {
  return useHttpGet<IndexNewArrivalsResponse>('/index/new-arrivals', query)
}

// 获取首页服务能力标签。
export function getIndexFeatures(query: ApiQueryParams = {}): Promise<IndexFeaturesResponse> {
  return useHttpGet<IndexFeaturesResponse>('/index/features', query)
}

// 获取首页品牌展示区域。
export function getIndexBrand(query: ApiQueryParams = {}): Promise<IndexBrandResponse> {
  return useHttpGet<IndexBrandResponse>('/index/brand', query)
}

// 获取首页联系信息区域。
export function getIndexContact(query: ApiQueryParams = {}): Promise<IndexContactResponse> {
  return useHttpGet<IndexContactResponse>('/index/contact', query)
}

// 获取首页批发产品区域。
export function getIndexWholesale(query: ApiQueryParams = {}): Promise<IndexWholesaleResponse> {
  return useHttpGet<IndexWholesaleResponse>('/index/wholesale', query)
}
