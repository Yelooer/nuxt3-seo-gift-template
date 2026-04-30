export default defineNuxtRouteMiddleware((to, from) => {
  // 添加调试信息
  // console.log('Product guard middleware triggered:', { to: to.path, from: from?.path })
  
  // 只对 /product 路径应用产品中间件
  
  // 检查是否包含 /product 路径（支持语言前缀）
  if (to.path.includes('/product')) {
    // 允许的产品分类
    const allowedCategories = [
      'apparel-accessories',
      'bags-totes', 
      'drink-ware',
      'handi-crafts',
      'home-decor',
      'office-supplies'
    ]

    // 解析路径，处理语言后缀
    const pathParts = to.path.split('/').filter(Boolean)
    
    // 检查是否有语言前缀
    const hasLanguagePrefix = pathParts[0] === 'zh-CN' || pathParts[0] === 'JP' || pathParts[0] === 'en-US'
    
    // SEO友好的重定向：将 /product 重定向到 /product/bags-totes
    if (hasLanguagePrefix) {
      // 有语言前缀的情况：/zh-CN/product -> /zh-CN/product/bags-totes
      if (pathParts.length === 2 && pathParts[1] === 'product') {
        // console.log('Redirecting with language prefix:', `/${pathParts[0]}/product/bags-totes`)
        return navigateTo(`/${pathParts[0]}/product/bags-totes`, { 
          redirectCode: 301, // 永久重定向，有利于SEO
          external: false 
        })
      }
    } else {
      // 没有语言前缀的情况：/product -> /product/bags-totes
      if (pathParts.length === 1 && pathParts[0] === 'product') {
        // console.log('Redirecting without language prefix:', '/product/bags-totes')
        return navigateTo('/product/bags-totes', { 
          redirectCode: 301, // 永久重定向，有利于SEO
          external: false 
        })
      }
    }
    
    let category: string | null = null
    
    if (hasLanguagePrefix) {
      // 有语言前缀的情况：/zh-CN/product/category 或 /zh-CN/product/category/id
      if (pathParts.length >= 3 && pathParts[1] === 'product') {
        category = pathParts[2]
      }
    } else {
      // 没有语言前缀的情况：/product/category 或 /product/category/id
      if (pathParts.length >= 2 && pathParts[0] === 'product') {
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
      if (pathParts.length < 3 || pathParts[1] !== 'product') {
        return navigateTo(`/${pathParts[0]}/404`)
      }
      
      // 如果有第四个部分（产品ID），确保它是数字或有效的ID格式
      if (pathParts.length > 4) {
        return navigateTo(`/${pathParts[0]}/404`)
      }
    } else {
      // 没有语言前缀的路径验证
      if (pathParts.length < 2 || pathParts[0] !== 'product') {
        return navigateTo('/404')
      }
      
      // 如果有第三个部分（产品ID），确保它是数字或有效的ID格式
      if (pathParts.length > 3) {
        return navigateTo('/404')
      }
    }
  }
}) 