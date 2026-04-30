type HttpQuery = Record<string, string | number | boolean | null | undefined>
type HttpBody = Record<string, unknown> | FormData
type HttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH'

interface RequestOptions {
  method?: HttpMethod
  query?: HttpQuery
  body?: HttpBody
  requiresAuth?: boolean
}

/**
 * 构建接口地址。
 * 约定：
 * 1. 开发环境直接走配置中的接口基础地址。
 * 2. 生产环境客户端走相对路径，交给反向代理处理。
 * 3. 生产环境服务端使用 nginxHost，避免 SSR 请求相对路径失败。
 */
function resolveRequestUrl(apiPath: string) {
  const runtimeConfig = useRuntimeConfig()
  const { public: publicConfig } = runtimeConfig
  const normalizedPath = apiPath.startsWith('/') ? apiPath : `/${apiPath}`

  if (process.server && process.env.NODE_ENV === 'production') {
    if (!publicConfig.nginxHost)
      throw new Error('未配置 nginxHost，服务端无法请求接口。')

    return `${publicConfig.nginxHost}${normalizedPath}`
  }

  if (process.client && process.env.NODE_ENV === 'production')
    return normalizedPath

  if (!publicConfig.betterAuthUrl)
    throw new Error('未配置 betterAuthUrl，无法请求接口。')

  return `${publicConfig.betterAuthUrl}${normalizedPath}`
}

/**
 * 统一的请求入口。
 * 所有 GET/POST/PUT/DELETE/PATCH 最终都通过这里发起，避免重复维护。
 */
async function requestApi<T>(apiPath: string, options: RequestOptions = {}): Promise<T> {
  const authTokenStore = useAuthTokenStore()
  const requestUrl = resolveRequestUrl(apiPath)
  const {
    method = 'GET',
    query,
    body,
    requiresAuth = false
  } = options

  const requestHeaders: Record<string, string> = {}
  const isFormData = typeof FormData !== 'undefined' && body instanceof FormData

  if (!isFormData)
    requestHeaders['Content-Type'] = 'application/json'

  if (authTokenStore.token)
    requestHeaders.Authorization = `Bearer ${authTokenStore.token}`
  else if (requiresAuth)
    throw new Error('当前请求需要登录令牌。')

  try {
    return await $fetch<T>(requestUrl, {
      method,
      headers: requestHeaders,
      params: query,
      body
    })
  } catch (error: unknown) {
    const fetchError = error as {
      data?: { msg?: string }
      message?: string
      status?: number
      statusText?: string
    }

    console.error('接口请求失败：', {
      apiPath,
      method,
      status: fetchError?.status,
      statusText: fetchError?.statusText,
      message: fetchError?.message,
      data: fetchError?.data
    })

    throw new Error(fetchError?.data?.msg || fetchError?.message || '接口请求失败')
  }
}

/**
 * 发送 GET 请求。
 */
export function useHttpGet<T>(apiPath: string, query: HttpQuery = {}, requiresAuth = false) {
  return requestApi<T>(apiPath, {
    method: 'GET',
    query,
    requiresAuth
  })
}

/**
 * 发送 POST 请求。
 */
export function useHttpPost<T>(apiPath: string, body: HttpBody = {}, requiresAuth = false) {
  return requestApi<T>(apiPath, {
    method: 'POST',
    body,
    requiresAuth
  })
}

/**
 * 发送 PUT 请求。
 */
export function useHttpPut<T>(apiPath: string, body: HttpBody = {}, requiresAuth = false) {
  return requestApi<T>(apiPath, {
    method: 'PUT',
    body,
    requiresAuth
  })
}

/**
 * 发送 DELETE 请求。
 */
export function useHttpDelete<T>(apiPath: string, query: HttpQuery = {}, requiresAuth = false) {
  return requestApi<T>(apiPath, {
    method: 'DELETE',
    query,
    requiresAuth
  })
}

/**
 * 发送 PATCH 请求。
 */
export function useHttpPatch<T>(apiPath: string, body: HttpBody = {}, requiresAuth = false) {
  return requestApi<T>(apiPath, {
    method: 'PATCH',
    body,
    requiresAuth
  })
}
