// 用户基础信息。
export interface UserProfile {
  name: string
  email: string
  image: string
}

/**
 * 登录令牌 store。
 * 仅存储接口访问令牌，不承载其他业务字段。
 */
export const useAuthTokenStore = defineStore('auth-token', () => {
  const token = ref('')

  // 设置登录令牌。
  const setToken = (nextToken: string) => {
    token.value = nextToken
  }

  // 清空登录令牌。
  const clearToken = () => {
    token.value = ''
  }

  return {
    token,
    setToken,
    clearToken
  }
}, {
  persist: true
})

/**
 * 用户会话 store。
 * 用于存放当前登录用户的基础展示信息。
 */
export const useAuthSessionStore = defineStore('auth-session', () => {
  const userProfile = ref<UserProfile | null>(null)

  // 设置当前用户信息。
  const setUserProfile = (profile: UserProfile | null) => {
    userProfile.value = profile
  }

  // 清理当前会话，并移除持久化缓存。
  const clearSession = () => {
    userProfile.value = null

    if (process.client)
      localStorage.removeItem('auth-session')
  }

  return {
    userProfile,
    setUserProfile,
    clearSession
  }
}, {
  persist: true
})
