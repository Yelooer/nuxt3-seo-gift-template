export default defineNuxtRouteMiddleware((to, from) => {
  // 添加调试信息
  // console.log('Blog guard middleware triggered:', { to: to.path, from: from?.path })
  
  // 只对 /blogs 路径应用博客中间件
  
  // 检查是否包含 /blogs 路径（支持语言前缀）
  if (to.path.includes('/blogs')) {
    // 允许的博客分类
    const allowedCategories = [
      'fresh-finds',
      'customization-solutions',
      'company-culture',
      'corporate-social-responsibility'
    ]

    // 解析路径，处理语言后缀
    const pathParts = to.path.split('/').filter(Boolean)
    
    // 检查是否有语言前缀
    const hasLanguagePrefix = pathParts[0] === 'zh-CN' || pathParts[0] === 'JP' || pathParts[0] === 'en-US'
    
    // SEO友好的重定向：将 /blogs 重定向到 /blogs/fresh-finds
    if (hasLanguagePrefix) {
      // 有语言前缀的情况：/zh-CN/blogs -> /zh-CN/blogs/fresh-finds
      if (pathParts.length === 2 && pathParts[1] === 'blogs') {
        // console.log('Redirecting with language prefix:', `/${pathParts[0]}/blogs/fresh-finds`)
        return navigateTo(`/${pathParts[0]}/blogs/fresh-finds`, { 
          redirectCode: 301, // 永久重定向，有利于SEO
          external: false 
        })
      }
    } else {
      // 没有语言前缀的情况：/blogs -> /blogs/fresh-finds
      if (pathParts.length === 1 && pathParts[0] === 'blogs') {
        // console.log('Redirecting without language prefix:', '/blogs/fresh-finds')
        return navigateTo('/blogs/fresh-finds', { 
          redirectCode: 301, // 永久重定向，有利于SEO
          external: false 
        })
      }
    }
    
    let category: string | null = null
    
    if (hasLanguagePrefix) {
      // 有语言前缀的情况：/zh-CN/blogs/category 或 /zh-CN/blogs/category/id
      if (pathParts.length >= 3 && pathParts[1] === 'blogs') {
        category = pathParts[2]
      }
    } else {
      // 没有语言前缀的情况：/blogs/category 或 /blogs/category/id
      if (pathParts.length >= 2 && pathParts[0] === 'blogs') {
        category = pathParts[1]
      }
    }

    // 如果找到了分类，验证是否在允许列表中
    if (category && !allowedCategories.includes(category)) {
      // 根据当前语言重定向到对应的404页面
      if (hasLanguagePrefix) {
        return navigateTo(`/${pathParts[0]}/404`)
      } else {
        return navigateTo('/404')
      }
    }

    // 额外验证：确保路径格式正确
    if (hasLanguagePrefix) {
      // 有语言前缀的路径验证
      if (pathParts.length < 3 || pathParts[1] !== 'blogs') {
        return navigateTo(`/${pathParts[0]}/404`)
      }
      
      // 如果有第四个部分（博客ID），确保路径不会过长
      if (pathParts.length > 4) {
        return navigateTo(`/${pathParts[0]}/404`)
      }
    } else {
      // 没有语言前缀的路径验证
      if (pathParts.length < 2 || pathParts[0] !== 'blogs') {
        return navigateTo('/404')
      }
      
      // 如果有第三个部分（博客ID），确保路径不会过长
      if (pathParts.length > 3) {
        return navigateTo('/404')
      }
    }
  }
}) 