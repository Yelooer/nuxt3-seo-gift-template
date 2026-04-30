import type { SEOData } from '~/types'

/**
 * SEO 处理 composable
 * 提供通用的 SEO 元信息设置功能
 */
export const useSEO = () => {
  
  /**
   * 设置页面 SEO 信息
   * @param seoData SEO 数据对象
   * @param options 额外选项
   */
  const setSEO = (seoData: SEOData, options?: {
    canonicalUrl?: string
    ogImage?: string
    twitterCard?: string
  }) => {
    const route = useRoute()
    const canonicalUrl = options?.canonicalUrl || `https://virtual-company.example${route.path}`
    
    useHead({
      title: seoData.title,
      meta: [
        {
          name: 'description',
          content: seoData.description
        },
        {
          name: 'keywords',
          content: seoData.keywords.join(', ')
        },
        // Open Graph 标签
        {
          property: 'og:title',
          content: seoData.title
        },
        {
          property: 'og:description', 
          content: seoData.description
        },
        {
          property: 'og:type',
          content: 'article'
        },
        {
          property: 'og:url',
          content: canonicalUrl
        },
        {
          property: 'og:site_name',
          content: 'Virtual Company'
        },
        // Twitter 标签
        {
          name: 'twitter:card',
          content: options?.twitterCard || 'summary_large_image'
        },
        {
          name: 'twitter:title',
          content: seoData.title
        },
        {
          name: 'twitter:description',
          content: seoData.description
        }
      ],
      link: [
        {
          rel: 'canonical',
          href: canonicalUrl
        }
      ]
    })
  }

  /**
   * 设置默认 SEO 信息（当没有特定 SEO 数据时使用）
   */
  const setDefaultSEO = (title: string, description: string, keywords: string[] = []) => {
    setSEO({
      title,
      description,
      keywords
    })
  }

  /**
   * 面包屑生成函数
   * @param route 当前路由对象
   * @returns 面包屑结构化数据
   */
  const generateBreadcrumb = (route: any) => {
    // 英语面包屑文本映射
    const breadcrumbTextMap: Record<string, string> = {
      home: 'Home',
      products: 'Products',
      bags: 'Bags & Totes',
      homeDecor: 'Home Decor',
      accessories: 'Apparel & Accessories',
      officeSupplies: 'Office Supplies',
      drinkware: 'Drinkware',
      handcrafts: 'Handicrafts',
      blogs: 'Blog',
      about: 'About Us',
      contact: 'Contact'
    }
    
    // 解析当前路径
    const pathSegments = route.path.split('/').filter((segment: string) => segment)
    const breadcrumbItems = []
    
    // 添加首页
    breadcrumbItems.push({
      '@type': 'ListItem',
      position: 1,
      name: breadcrumbTextMap.home,
      item: 'https://virtual-company.example'
    })
    
    // 根据路径生成面包屑
    if (pathSegments.length > 0) {
      let currentPath = 'https://virtual-company.example'
      
      pathSegments.forEach((segment: string, index: number) => {
        const position = index + 2
        currentPath += `/${segment}`
        
        // 根据路径段生成标题
        let name = segment
        if (segment === 'product') {
          name = breadcrumbTextMap.products
        } else if (segment === 'bags-totes') {
          name = breadcrumbTextMap.bags
        } else if (segment === 'home-decor') {
          name = breadcrumbTextMap.homeDecor
        } else if (segment === 'apparel-accessories') {
          name = breadcrumbTextMap.accessories
        } else if (segment === 'office-supplies') {
          name = breadcrumbTextMap.officeSupplies
        } else if (segment === 'drink-ware') {
          name = breadcrumbTextMap.drinkware
        } else if (segment === 'handi-crafts') {
          name = breadcrumbTextMap.handcrafts
        } else if (segment === 'blogs') {
          name = breadcrumbTextMap.blogs
        } else if (segment === 'about-us') {
          name = breadcrumbTextMap.about
        } else if (segment === 'contact') {
          name = breadcrumbTextMap.contact
        }
        
        breadcrumbItems.push({
          '@type': 'ListItem',
          position,
          name,
          item: currentPath
        })
      })
    }
    
    return {
      '@type': 'BreadcrumbList',
      itemListElement: breadcrumbItems
    }
  }

  return {
    setSEO,
    setDefaultSEO,
    generateBreadcrumb
  }
} 
