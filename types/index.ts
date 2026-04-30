// API 响应基础类型
export interface ApiResponse<T = any> {
  code: number;
  data: T;
  msg: string;
}

// 通用查询参数类型。
export type ApiQueryParams = Record<string, string | number | boolean | null | undefined>;



// 首页 Banner 图片项类型
export interface BannerImage {
  src: string;
  alt: string;
  mobile_src: string;
  link: string;
}

// 首页 Banner 数据类型
export interface IndexBannerData {
  images: BannerImage[];
}

// 轮播图幻灯片接口
export interface CarouselSlide {
  image: string;
  alt: string;
  link?: string;
}





// 新品上市项目类型
export interface NewArrivalsItem {
  image: string;
  badge: string;
  title: string;
  link: string;
  category: string;
  skuid: string;
  create_time: string;
  alt: string;
}

// 新品上市数据类型
export interface NewArrivalsData {
  title: string;
  newArrivals: NewArrivalsItem[];
}

// Features 标签页类型
export interface FeaturesTab {
  tab: string;
  title: string;
  desc: string;
  points: string[];
  image: string;
}

// Features 数据类型
export interface FeaturesTabsData {
  featuresTabs: FeaturesTab[];
}

// 品牌区域项目类型
export interface BrandZoneItem {
  id: number;
  isLarge: boolean;
  image: string;
  title: string;
  description: string;
  hasPlayButton: boolean;
}

// 品牌数据类型
export interface BrandData {
  brandZoneItems: BrandZoneItem[];
}

// 联系区域数据类型
export interface ContactData {
  custom: string;
  title: string;
  content: string[];
  image: string;
}

// 首页 Banner API 响应类型
export interface IndexBannerResponse extends ApiResponse {
  data: {
    indexBanData: IndexBannerData;
  };
}

export interface ProductsData {
  name: string;
  image: string;
  link: string;
  category_key: string;
}

// 产品分类 API 响应类型
export interface IndexProductCategoriesResponse extends ApiResponse {
  data: {
    products: ProductsData[];
  };
}

// 新品上市 API 响应类型
export interface IndexNewArrivalsResponse extends ApiResponse {
  data: {
    NewArrivalsData: NewArrivalsData;
  };
}

// Features API 响应类型
export interface IndexFeaturesResponse extends ApiResponse {
  data: {
    FeaturesTabsData: FeaturesTabsData;
  };
}

// 品牌区域 API 响应类型
export interface IndexBrandResponse extends ApiResponse {
  data: {
    BrandData: BrandData;
  };
}

// 产品展示项目类型
export interface ProductShowcaseItem {
  image: string;
  alt: string;
  badge: string;
  title: string;
  applicableScenes: string[];
}

// 产品展示数据类型
export interface ProductShowcasesData {
  title: string;
  description: string;
  showcases: ProductShowcaseItem[];
}

// 产品展示 API 响应类型
export interface ProductShowcasesResponse extends ApiResponse {
  data: {
    ShowcasesData: ProductShowcasesData;
  };
}

// 联系区域 API 响应类型
export interface IndexContactResponse extends ApiResponse {
  data: {
    ContactData: ContactData;
  };
}

// 批发产品项目类型
export interface WholesaleProduct {
  id: number;
  src: string;
  alt: string;
  link?: string;
}

// 批发产品数据类型
export interface IndexWholesaleData {
  title: string;
  description: string;
  Wholesale: WholesaleProduct[];
}

// 批发产品 API 响应类型
export interface IndexWholesaleResponse extends ApiResponse {
  data: {
    indexWholesaleData: IndexWholesaleData;
  };
}

// 产品捆绑包类型
export interface ProductBundle {
  img: string;
  title: string;
  link: string;
}

// 产品FAQ类型
export interface ProductFAQ {
  question: string;
  answer: string;
  is_open_default: boolean;
}

// 产品属性类型
export interface ProductAttribute {
  attribute_label: string;
  attribute_value: string;
}

// 产品图片类型
export interface ProductImage {
  id: number;
  product_id: number;
  image_url: string;
  alt_text: string;
  is_main?: boolean;
}


// 产品图片类型
export interface ProductReviews {
  nickname: string;
  content: string;
  reply: string;
  rating: number;
  review_date?: string;
}

// 产品详情类型
export interface ProductDetail {
  title: string;
  images: ProductImage[];
  video: string;
  hasVideo: boolean;
  bundles: ProductBundle[];
  faqs: ProductFAQ[];
  description: string;
  badge: string;
  attributes: ProductAttribute[];
  customDescription: string;
  reviews: ProductReviews[];
  seo_title: string;
  seo_description: string;
  skuid: string;
  link: string;
  category: string;

}

// 产品详情 API 响应类型
export interface ProductDetailResponse extends ApiResponse {
  data: {
    ProductDetail: ProductDetail;
  };
}

// 博客项目类型
export interface BlogItem {
  article_key: string;
  title: string;
  description: string;
  publish_date: string;
  featured_image: string;
  featured_image_alt: string;
  tags: string;


}

// 博客数据类型
export interface BlogsData {
  blogs: BlogItem[];
  title: string;
  description: string;
}

// 博客列表 API 响应类型
export interface BlogListResponse extends ApiResponse {
  data: {
    BlogsData: BlogsData;
  };
}

// 博客商品卡片相关类型
export interface BlogProductCard {
  id: string
  title: string
  description: string
  image: string
  link: string
  badge?: string
  price?: number
  originalPrice?: number
  discount?: number
  applicableScenes?: string[]
}

// 博客内容中的商品卡片标记
export interface BlogProductCardMark {
  productId: string
  position: number // 在内容中的位置
}

// 包含商品卡片的博客内容
export interface BlogContentWithProducts {
  content: string
  productCards: BlogProductCardMark[]
}

// 博客详情页商品数据库类型
export interface BlogProductDatabase {
  [productId: string]: BlogProductCard
}

// 博客详情数据类型
// SEO 数据类型
export interface SEOData {
  title: string
  description: string
  keywords: string[]
}

export interface BlogDetailData {
  articleTitle: string
  author: string
  publishDate: string
  tags: string[]
  seo: SEOData
  productDatabase: BlogProductDatabase
  content: string
}

// 博客详情 API 响应类型
export interface BlogDetailResponse extends ApiResponse {
  data: {
    data: {
      product_database: {
        product_key: string
        title: string
        description: string
        badge: string
        link: string
        applicableScenes: string
        image: string
        alt: string
      }
      blog_articles: {
        author:string
        article_key: string
        title: string
        description: string
        content: string
        publish_date: string
        seo_title: string
        seo_description: string
        tags: string
        featured_image: string
        featured_image_alt: string
        create_time: string
        update_time: string
      }
    }
  }
}

// 分类数据类型
export interface Category {
  id: number
  create_time: string
  name: string
  image: string
  sort_order: number
  display_row: number
  link: string
  banner_image_alt: string
  home_image_alt: string
  category_key: string
}

export interface CategoryResponse {
  code: number
  data: {
    products: Category[]
  }
  msg: string
}
