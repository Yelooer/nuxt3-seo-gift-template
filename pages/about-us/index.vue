<template>
  <div class="min-h-screen bg-[#e1e1e1]">
    <HeadNavbar />
    
      
    <!-- Hero Section -->
    <section class="relative pt-16 pb-12 px-4 md:pt-20 md:pb-16">
      <!-- Left solid color block -->
      <div class="absolute left-0 top-0 w-1/4 h-full bg-[#7d9f8f]"></div>
      
      <!-- Right background image -->
      <div class="absolute left-1/4 top-0 w-3/4 h-full bg-cover bg-center bg-no-repeat" 
           style="background-image: url('/imgs/about/header-values-commitments.jpg');">
        <div class="absolute inset-0 bg-black/20"></div>
      </div>
      
      <!-- Central white text box -->
      <div class="relative max-w-6xl mx-auto h-full flex items-center">
        <div class="bg-white rounded-lg shadow-2xl p-6 md:p-8 lg:p-12 max-w-md ml-4 md:ml-8">
          <!-- Text content -->
          <div class="space-y-3 md:space-y-4">
            <h2 class="text-xl md:text-2xl font-serif text-gray-900 italic">Our CSR</h2>
            <h1 class="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 leading-tight">
              Values & commitments
            </h1>
          </div>
        </div>
      </div>
    </section>



    <!-- Breadcrumb Section -->
    <section class="py-3 md:py-4 bg-[#e1e1e1]">
      <div class="max-w-6xl mx-auto px-4">
        <div class="text-sm text-gray-600">
          Home • Our expertise
        </div>
      </div>
    </section>

    

    <!-- Main Content Section -->
    <section class="py-12 md:py-16 bg-[#e1e1e1]">
      <div class="max-w-6xl mx-auto px-4">
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12">
          <!-- Left column - Main heading -->
          <div>
            <h2 class="text-xl md:text-2xl lg:text-3xl font-bold text-gray-900 leading-tight">
              Established in 1996, Virtual Company brings more than 25 years of design and manufacturing expertise to the custom gift industry.
            </h2>
          </div>
          
          <!-- Right column - Body text -->
          <div class="space-y-3 md:space-y-4 text-gray-700 leading-relaxed">
            <p class="text-base md:text-lg">
              Over the years, we have boasted a vast and prestigious portfolio of brands and have become a valuable partner for world's leaders in promotional products and corporate gifts sectors.
            </p>
            
          </div>
        </div>
      </div>
    </section>


    
        <!-- Awards Section -->
        <section class="py-12 md:py-16 bg-[#e1e1e1]">
      <div class="max-w-6xl mx-auto px-4">
        <div class="bg-white rounded-lg shadow-lg p-6 md:p-8 lg:p-12">
          <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 items-center">
            <!-- Left: Quote and text -->
            <div class="relative">
              <!-- Quote icon -->
              <div class="text-4xl md:text-6xl text-gray-400 font-serif mb-4 md:mb-6">"</div>
              
              <!-- Quote text -->
              <p class="text-base md:text-lg text-gray-700 leading-relaxed mb-6 md:mb-8">
                Virtual Company's sustainable development principles are integrated into our culture and values as a core part of our identity. Since 2013, we have launched responsible initiatives across our internal CSR programs and supply chain solutions. We remain committed to creating positive environmental impact while keeping people at the center of our strategy.
              </p>
              
              <!-- Attribution -->
              <p class="text-lg md:text-xl font-bold text-gray-900">Alex Morgan</p>
              <p class="text-gray-600">CEO, Virtual Company</p>
            </div>
            
            <!-- Right: Portrait image -->
            <div class="relative">
              <div class="w-full h-64 md:h-96 bg-gray-200 rounded-lg flex items-center justify-center">
                <!-- Placeholder for CEO portrait -->
                <div class="text-center">
                  <svg class="w-16 h-16 md:w-24 md:h-24 text-gray-400 mx-auto mb-4" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"></path>
                  </svg>
                  <p class="text-gray-500">CEO Portrait</p>
                  <p class="text-sm text-gray-400">Add CEO photo here</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Key Statistics Grid -->
    <section class="py-12 md:py-16 lg:py-20 bg-[#e1e1e1]">
      <div class="max-w-4xl mx-auto px-4">
        <!-- Background image container -->
        <div class="relative">
  
           
            
            <!-- Central white box with four quadrants -->
            <div style="background-image: url('/imgs/about/chiffres_cles.jpg');" class="relative inset-0 bg-cover bg-center bg-no-repeat bg-white/95 backdrop-blur-sm rounded-lg shadow-lg p-6 md:p-8 lg:p-12 xl:p-16 min-h-[300px] md:min-h-[400px] flex items-center justify-center">
              
              <!-- Four cards container -->
              <div class="grid grid-cols-2 gap-0 w-full max-w-2xl">
                <!-- Top-Left Card -->
                <div class="bg-white/95 backdrop-blur-sm border-r border-b border-gray-200 p-4 md:p-6 lg:p-8 rounded-tl-lg">
                  <div class="text-center">
                    <h3 class="text-lg md:text-xl font-bold text-gray-900 mb-1 md:mb-2">Global Presence</h3>
                    <p class="text-xs md:text-sm text-gray-600">86 dedicated employees worldwide</p>
                  </div>
                </div>
                
                <!-- Top-Right Card -->
                <div class="bg-white/95 backdrop-blur-sm border-b border-gray-200 p-4 md:p-6 lg:p-8 rounded-tr-lg">
                  <div class="text-center">
                    <h3 class="text-lg md:text-xl font-bold text-gray-900 mb-1 md:mb-2">360° Offer</h3>
                    <p class="text-xs md:text-sm text-gray-600">Bags, Primary and secondary packaging, Accessories, Textile...</p>
                  </div>
                </div>
                
                <!-- Bottom-Left Card -->
                <div class="bg-white/95 backdrop-blur-sm border-r border-gray-200 p-4 md:p-6 lg:p-8 rounded-bl-lg">
                  <div class="text-center">
                    <h3 class="text-lg md:text-xl font-bold text-gray-900 mb-1 md:mb-2">Reliable Manufacturing</h3>
                    <p class="text-xs md:text-sm text-gray-600">50 historical partner factories</p>
                  </div>
                </div>
                
                <!-- Bottom-Right Card -->
                <div class="bg-white/95 backdrop-blur-sm p-4 md:p-6 lg:p-8 rounded-br-lg">
                  <div class="text-center">
                    <h3 class="text-lg md:text-xl font-bold text-gray-900 mb-1 md:mb-2">Expertise</h3>
                    <p class="text-xs md:text-sm text-gray-600">100% dedicated to Custom Gifts Industry</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
      </div>
    </section>

          <!-- Awards/Certifications Section -->
          <section class="text-white bg-[#e1e1e1]">
      <div class="px-4 max-w-6xl mx-auto py-8 md:py-10 lg:py-12 lg:px-8 xl:px-20">
        <div class="flex bg-[#7D9F8F] py-6 md:py-8 lg:py-10 px-6 md:px-8 lg:px-10 flex-col md:flex-row md:items-center md:justify-evenly md:text-left">
          <img src="https://virtual-company.example/assets/csr-placeholder.png" alt="Sustainability award" class="flex-shrink-0 w-16 md:w-20 h-auto p-0 m-0 md:mr-8 lg:mr-12" />
          <div class="p-0 m-0 text-white">
            <p class="p-0 m-0 text-white text-sm md:text-base leading-relaxed">
              <strong>Virtual Company has received top-tier sustainability recognition</strong> for long-term performance in responsible sourcing, environmental impact reduction, and supply chain governance.
            </p>
            <p class="p-0 m-0 text-white text-sm md:text-base leading-relaxed mt-2">
              EcoVadis provides global CSR ratings for suppliers in global supply chains and helps companies manage risks and improve sustainability.
            </p>
          </div>
        </div>
        <div class="flex bg-[#7D9F8F] py-6 md:py-8 lg:py-10 px-6 md:px-8 lg:px-10 flex-col md:flex-row md:items-center md:justify-evenly md:text-left">
          <img src="https://virtual-company.example/assets/initiative-placeholder.svg" alt="Global responsibility initiative" class="flex-shrink-0 w-16 md:w-20 h-auto p-0 m-0 md:mr-8 lg:mr-12" />
          <div class="p-0 m-0 text-white">
            <p class="p-0 m-0 text-white text-sm md:text-base leading-relaxed">
              <strong>Since 2018, Virtual Company has aligned its operations with internationally recognized principles covering human rights, labor, environmental stewardship, and anti-corruption.</strong>
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- Our Expertise Section -->
    <section class="py-12 md:py-16 lg:py-20 bg-[#e1e1e1]">
      <div class="max-w-7xl mx-auto px-4">
        <div class="text-center mb-12 md:mb-16">
          <h2 class="text-3xl md:text-4xl font-bold text-gray-900 mb-4">What we do</h2>
        
        </div>
        
        <!-- Service Items -->
        <div class="space-y-12 md:space-y-16 lg:space-y-20">
          <!-- 01. Design & Innovation -->
          <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 items-center">
            <div class="space-y-4 md:space-y-6">
              <div class="flex items-center space-x-3 md:space-x-4">
                <div class="w-10 h-10 md:w-12 md:h-12 bg-red-600 text-white rounded-full flex items-center justify-center font-bold text-base md:text-lg">01</div>
                <h3 class="text-xl md:text-2xl font-bold text-gray-900">Design & Innovation</h3>
              </div>
              <div class="space-y-3 md:space-y-4 text-gray-700 leading-relaxed">
                <p class="text-sm md:text-base">
                  From trend analysis to the selection of the best materials, our dynamic in-house design studio is endlessly analyzing market trends in order to understand and anticipate client expectations. We thrive on creativity and innovation with an eco-design approach to reduce the environmental impacts throughout the product lifecycle.
                </p>
                <p class="text-sm md:text-base">
                  Product design is a strategic feature and key competitive edge of Virtual Company. We pride ourselves on our ability to create desirable, innovative, and sustainable products that help our clients remain at the forefront of the industry.
                </p>
              </div>
            </div>
            <div class="relative">
              <img src="/imgs/test/Embroidery-workshop.webp" 
                   alt="Design & Innovation" 
                   class="w-full h-64 md:h-80 object-cover rounded-lg" />
              <div class="absolute top-3 right-3 md:top-4 md:right-4 w-10 h-10 md:w-12 md:h-12 bg-red-600 text-white rounded-full flex items-center justify-center font-bold text-sm md:text-base">01</div>
            </div>
          </div>
          
          <!-- 02. Product development & project management -->
          <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 items-center">
            <div class="relative order-2 lg:order-1">
              <img src="/imgs/index/Packaging-workshop.webp" 
                   alt="Product Development" 
                   class="w-full h-64 md:h-80 object-cover rounded-lg" 
                   loading="lazy" 
                   decoding="async" />
              <div class="absolute top-3 left-3 md:top-4 md:left-4 w-10 h-10 md:w-12 md:h-12 bg-pink-400 text-white rounded-full flex items-center justify-center font-bold text-sm md:text-base">02</div>
            </div>
            <div class="space-y-4 md:space-y-6 order-1 lg:order-2">
              <div class="flex items-center space-x-3 md:space-x-4">
                <div class="w-10 h-10 md:w-12 md:h-12 bg-pink-400 text-white rounded-full flex items-center justify-center font-bold text-base md:text-lg">02</div>
                <h3 class="text-xl md:text-2xl font-bold text-gray-900">Product development & project management</h3>
              </div>
              <div class="space-y-3 md:space-y-4 text-gray-700 leading-relaxed">
                <p class="text-sm md:text-base">
                  Virtual Company takes a consultative and collaborative approach to manage each project from start to finish. Our project managers focus on practical design solutions and a clear understanding of client expectations.
                </p>
                <p class="text-sm md:text-base">
                  Our experienced and cross-functional teams operate to deliver integrated concept-to-launch solutions for our clients to achieve their marketing goals and the delivery of products on time and within budget.
                </p>
              </div>
            </div>
          </div>
          
          <!-- 03. Manufacturing excellence -->
          <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 items-center">
            <div class="space-y-4 md:space-y-6">
              <div class="flex items-center space-x-3 md:space-x-4">
                <div class="w-10 h-10 md:w-12 md:h-12 bg-pink-400 text-white rounded-full flex items-center justify-center font-bold text-base md:text-lg">03</div>
                <h3 class="text-xl md:text-2xl font-bold text-gray-900">Manufacturing excellence</h3>
              </div>
              <div class="space-y-3 md:space-y-4 text-gray-700 leading-relaxed">
                <p class="text-sm md:text-base">
                  Virtual Company offers a wide range of sourcing capabilities and partnerships that support brand growth. We are committed to sustainable business practices and global compliance standards across our factories and suppliers.
                </p>
                <p class="text-sm md:text-base">
                  All of our manufacturing partners bring specific know-how and technical expertise to ensure all products are produced to the highest quality requirements.
                </p>
              </div>
            </div>
            <div class="relative">
              <img src="/imgs/index/Sewing-workshop.webp" 
                   alt="Manufacturing Excellence" 
                   class="w-full h-64 md:h-80 object-cover rounded-lg" 
                   loading="lazy" 
                   decoding="async" />
              <div class="absolute top-3 right-3 md:top-4 md:right-4 w-10 h-10 md:w-12 md:h-12 bg-pink-400 text-white rounded-full flex items-center justify-center font-bold text-sm md:text-base">03</div>
            </div>
          </div>
          
          <!-- 04. Quality control -->
          <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 items-center">
            <div class="relative order-2 lg:order-1">
              <img src="/imgs/index/laser-printing.webp" 
                   alt="Quality Control" 
                   class="w-full h-64 md:h-80 object-cover rounded-lg" 
                   loading="lazy" 
                   decoding="async" />
              <div class="absolute top-3 left-3 md:top-4 md:left-4 w-10 h-10 md:w-12 md:h-12 bg-pink-400 text-white rounded-full flex items-center justify-center font-bold text-sm md:text-base">04</div>
            </div>
            <div class="space-y-4 md:space-y-6 order-1 lg:order-2">
              <div class="flex items-center space-x-3 md:space-x-4">
                <div class="w-10 h-10 md:w-12 md:h-12 bg-pink-400 text-white rounded-full flex items-center justify-center font-bold text-base md:text-lg">04</div>
                <h3 class="text-xl md:text-2xl font-bold text-gray-900">Quality control</h3>
              </div>
              <div class="space-y-3 md:space-y-4 text-gray-700 leading-relaxed">
                <p class="text-sm md:text-base">
                  Our advanced testing and inspection procedures guarantee the highest quality of products to our clients. Through reputable factories and suppliers, our in-house quality control department monitors production at all stages of manufacturing to safeguard and optimize while ensuring social compliance and exceptional quality assurance.
                </p>
              </div>
            </div>
          </div>
          
          <!-- 05. Logistics expertise -->
          <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 items-center">
            <div class="space-y-4 md:space-y-6">
              <div class="flex items-center space-x-3 md:space-x-4">
                <div class="w-10 h-10 md:w-12 md:h-12 bg-black text-white rounded-full flex items-center justify-center font-bold text-base md:text-lg">05</div>
                <h3 class="text-xl md:text-2xl font-bold text-gray-900">Logistics expertise</h3>
              </div>
              <div class="space-y-3 md:space-y-4 text-gray-700 leading-relaxed">
                <p class="text-sm md:text-base">
                  Our highly efficient and effective delivery methods across the entire supply chain ensure high-quality execution and speed to market optimization. Adaptable to market constraints and business demands, our internal logistics department can accommodate your choice of incoterms.
                </p>
                <p class="text-sm md:text-base">
                  The core of our logistics process is to reduce the distance traveled by your merchandise and implement innovative shipment plans that allow us to minimize the carbon footprint of transportation and ensure the security of your product deliveries.
                </p>
              </div>
            </div>
            <div class="relative">
              <img src="/imgs/index/Finished-warehouse.webp" 
                   alt="Logistics Expertise" 
                   class="w-full h-64 md:h-80 object-cover rounded-lg" 
                   loading="lazy" 
                   decoding="async" />
              <div class="absolute top-3 right-3 md:top-4 md:right-4 w-10 h-10 md:w-12 md:h-12 bg-black text-white rounded-full flex items-center justify-center font-bold text-sm md:text-base">05</div>
            </div>
          </div>
          
          <!-- 06. Product conditioning -->
          <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 items-center">
            <div class="relative order-2 lg:order-1">
              <img src="/imgs/index/office-supplies.jpg" 
                   alt="Product Conditioning" 
                   class="w-full h-64 md:h-80 object-cover rounded-lg" />
              <div class="absolute top-3 left-3 md:top-4 md:left-4 w-10 h-10 md:w-12 md:h-12 bg-red-600 text-white rounded-full flex items-center justify-center font-bold text-sm md:text-base">06</div>
            </div>
            <div class="space-y-4 md:space-y-6 order-1 lg:order-2">
              <div class="flex items-center space-x-3 md:space-x-4">
                <div class="w-10 h-10 md:w-12 md:h-12 bg-red-600 text-white rounded-full flex items-center justify-center font-bold text-base md:text-lg">06</div>
                <h3 class="text-xl md:text-2xl font-bold text-gray-900">Product conditioning</h3>
              </div>
              <div class="space-y-3 md:space-y-4 text-gray-700 leading-relaxed">
                <p class="text-sm md:text-base">
                  Whether it's assembling and filling of pouches, accessories or assembling cosmetic coffrets, our partner teams, specialized in luxury, will provide you high-quality work and the best solution for your operations as quickly as possible.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>



    <AppFooter />
  </div>
</template>

<script setup lang="ts">
// 结构化数据
const schemaData = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "Virtual Company",
  "description": "Professional custom gift solutions with 25+ years of design and manufacturing expertise in promotional products and corporate gifts industry.",
  "foundingDate": "1996",
  "url": "https://virtual-company.example",
  "logo": "https://virtual-company.example/logo.png",
  "image": "/imgs/about/header-values-commitments.jpg",
  "sameAs": [
    "https://virtual-company.example/about"
  ],
  "address": {
    "@type": "PostalAddress",
    "addressCountry": "Global"
  },
  "contactPoint": {
    "@type": "ContactPoint",
    "contactType": "customer service"
  },
  "employee": {
    "@type": "Person",
    "name": "Alex Morgan",
    "jobTitle": "CEO",
    "worksFor": {
      "@type": "Organization",
      "name": "Virtual Company"
    }
  },
  "award": [
    {
      "@type": "Award",
      "name": "EcoVadis Platinum Medal",
      "description": "Highest level of recognition for EcoVadis Sustainability Rating, awarded to companies in various industries and of all sizes that rank in the top 1% globally.",
      "awardedBy": "EcoVadis",
      "awardedFor": "Sustainability Rating"
    },
    {
      "@type": "Award",
      "name": "UN Global Compact Member",
      "description": "Committed to the United Nations Global Compact corporate initiative and its principles in the areas of human rights, labor, environment, and anti-corruption.",
      "awardedBy": "United Nations",
      "awardedFor": "Corporate Social Responsibility"
    }
  ],
  "hasOfferCatalog": {
    "@type": "OfferCatalog",
    "name": "Custom Gift Services",
    "itemListElement": [
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "Design & Innovation",
          "description": "From trend analysis to material selection, our dynamic in-house design studio analyzes market trends to understand and anticipate client expectations with eco-design approach."
        }
      },
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "Product Development & Project Management",
          "description": "Consultative and collaborative approach to manage each project from start to finish with dedicated project managers for quality design solutions."
        }
      },
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "Manufacturing Excellence",
          "description": "Wide range of sourcing capabilities and partnerships supporting sustainable business practices and global regulatory compliance standards."
        }
      },
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "Quality Control",
          "description": "Advanced testing and inspection procedures guaranteeing the highest quality products through in-house quality control department."
        }
      },
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "Logistics Expertise",
          "description": "Highly efficient delivery methods across the entire supply chain ensuring high-quality execution and speed to market optimization."
        }
      },
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "Product Conditioning",
          "description": "Specialized luxury packaging services including assembling and filling of pouches, accessories, and cosmetic coffrets."
        }
      }
    ]
  },
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": "5.0",
    "reviewCount": "1000+",
    "bestRating": "5",
    "worstRating": "1"
  },
  "numberOfEmployees": "86",
  "knowsAbout": [
    "Custom Gifts",
    "Promotional Products", 
    "Corporate Gifts",
    "Sustainable Manufacturing",
    "Quality Control",
    "Logistics",
    "Product Design",
    "Project Management"
  ],
  "slogan": "100% dedicated to Custom Gifts Industry",
  "areaServed": "Worldwide",
  "serviceType": "Custom Gift Manufacturing and Design"
}

useHead({
  title: 'About Virtual Company - Professional Custom Gift Solutions',
  meta: [
    {
      name: 'description',
      content: 'Learn about Virtual Company, an experienced partner for promotional products and custom gift development.'
    },
    {
      name: 'keywords',
      content: 'Virtual Company, custom gifts, promotional products, corporate gifts, manufacturing, about us'
    }
  ],
  script: [
    {
      type: 'application/ld+json',
      innerHTML: JSON.stringify(schemaData)
    }
  ]
})
</script>

<style scoped>
/* Custom styles for the new design */
</style> 
