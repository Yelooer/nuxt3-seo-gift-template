import type { ApiQueryParams, BlogDetailResponse, BlogListResponse } from '~/types'

// 获取博客列表页数据。
export function getBlogList(query: ApiQueryParams = {}): Promise<BlogListResponse> {
  return useHttpGet<BlogListResponse>('/blogs', query)
}

// 获取博客详情页数据。
export function getBlogDetail(articleSlug: string): Promise<BlogDetailResponse> {
  return useHttpGet<BlogDetailResponse>(`/blogs/${articleSlug}`)
}
