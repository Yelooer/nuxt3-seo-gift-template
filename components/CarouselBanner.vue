<template>
  <section 
    role="region" 
    class="pt-8 pb-4 md:pt-12 md:pb-6 lg:pt-16 lg:pb-8"
    aria-label="轮播图"
  >
    <!-- 轮播图容器 -->
    <div 
      class="relative w-full"
      @mouseenter="pauseAutoplay"
      @mouseleave="resumeAutoplay"
      @touchstart="handleTouchStart"
      @touchmove="handleTouchMove"
      @touchend="handleTouchEnd"
    >
      <!-- 轮播图内容 -->
      <div v-show="slides && slides.length > 0" class="relative w-full h-[300px] md:h-[400px] lg:h-[550px] 3xl:h-[790px] overflow-hidden">
        <!-- 轮播图项目 -->
        <div 
          v-for="(slide, index) in slides" 
          :key="index"
          :class="[
            'absolute inset-0 w-full h-full transition-opacity duration-500 ease-in-out',
            currentSlide === index ? 'opacity-100 z-10' : 'opacity-0 z-0'
          ]"
          :aria-hidden="currentSlide !== index"
          role="tabpanel"
          :id="`slide-${index}`"
          :aria-labelledby="`slide-control-${index}`"
        >
          <!-- 图片链接 -->
          <NuxtLink 
            :to="slide.link || '#'"
            class="block w-full h-full group"
            :tabindex="currentSlide === index ? 0 : -1"
          >
            <!-- 图片 -->
            <img 
              :src="slide.src"
              :alt="slide.alt"
              class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 hidden md:block"
              loading="lazy"
            />
            <!-- 移动端图片 -->
            <img 
              v-if="slide.mobile_src"
              :src="slide.mobile_src"
              :alt="slide.alt"
              class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 md:hidden"
              loading="lazy"
            />
            
            <!-- 遮罩层 -->
            <div class="absolute inset-0 bg-black/10 group-hover:bg-black/20 transition-colors duration-300"></div>
          </NuxtLink>
        </div>
      </div>
    
      <!-- 指示器点 -->
      <div 
        v-show="slides && slides.length > 1"
        class="absolute bottom-4 left-1/2 transform -translate-x-1/2 z-30"
        role="tablist"
        aria-label="选择轮播图"
      >
        <div class="flex items-center space-x-2">
          <button
            v-for="(slide, index) in slides"
            :key="index"
            @click="goToSlide(index)"
            :class="[
              'w-2 h-2 md:w-3 md:h-3 rounded-full transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-white/50',
              currentSlide === index 
                ? 'bg-white scale-125 shadow-lg' 
                : 'bg-white/50 hover:bg-white/70'
            ]"
            :aria-label="`转到第 ${index + 1} 张`"
            :aria-selected="currentSlide === index"
            :id="`slide-control-${index}`"
            role="tab"
            :tabindex="currentSlide === index ? 0 : -1"
          />
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
interface CarouselSlide {
  src: string;
  alt: string;
  mobile_src: string;
  link: string;
}

interface Props {
  slides: CarouselSlide[]
  autoplayDelay?: number
  autoplayEnabled?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  autoplayDelay: 5000,
  autoplayEnabled: true
})

// 响应式数据
const currentSlide = ref(0)
const isAutoplayActive = ref(props.autoplayEnabled)
const autoplayTimer = ref<NodeJS.Timeout | null>(null)

// 触摸滑动相关变量
const touchStartX = ref(0)
const touchEndX = ref(0)
const minSwipeDistance = 50 // 最小滑动距离

// 切换到上一张
const prevSlide = () => {
  if (props.slides.length <= 1) return
  currentSlide.value = currentSlide.value === 0 ? props.slides.length - 1 : currentSlide.value - 1
}

// 切换到下一张
const nextSlide = () => {
  if (props.slides.length <= 1) return
  currentSlide.value = currentSlide.value === props.slides.length - 1 ? 0 : currentSlide.value + 1
}

// 跳转到指定幻灯片
const goToSlide = (index: number) => {
  if (index >= 0 && index < props.slides.length) {
    currentSlide.value = index
  }
}

// 开始自动播放
const startAutoplay = () => {
  if (props.slides.length <= 1 || !isAutoplayActive.value) return
  
  autoplayTimer.value = setInterval(() => {
    nextSlide()
  }, props.autoplayDelay)
}

// 停止自动播放
const stopAutoplay = () => {
  if (autoplayTimer.value) {
    clearInterval(autoplayTimer.value)
    autoplayTimer.value = null
  }
}

// 暂停自动播放
const pauseAutoplay = () => {
  stopAutoplay()
}

// 恢复自动播放
const resumeAutoplay = () => {
  if (isAutoplayActive.value) {
    startAutoplay()
  }
}

// 切换自动播放状态
const toggleAutoplay = () => {
  isAutoplayActive.value = !isAutoplayActive.value
  if (isAutoplayActive.value) {
    startAutoplay()
  } else {
    stopAutoplay()
  }
}

// 触摸事件处理函数
const handleTouchStart = (event: TouchEvent) => {
  touchStartX.value = event.touches[0].clientX
}

const handleTouchMove = (event: TouchEvent) => {
  touchEndX.value = event.touches[0].clientX
}

const handleTouchEnd = () => {
  if (!touchStartX.value || !touchEndX.value) return
  
  const distance = touchStartX.value - touchEndX.value
  const isLeftSwipe = distance > minSwipeDistance
  const isRightSwipe = distance < -minSwipeDistance
  
  if (isLeftSwipe) {
    // 向左滑动，显示下一张
    nextSlide()
  } else if (isRightSwipe) {
    // 向右滑动，显示上一张
    prevSlide()
  }
  
  // 重置触摸坐标
  touchStartX.value = 0
  touchEndX.value = 0
}

// 键盘导航
const handleKeydown = (event: KeyboardEvent) => {
  if (props.slides.length <= 1) return
  
  switch (event.key) {
    case 'ArrowLeft':
      event.preventDefault()
      prevSlide()
      break
    case 'ArrowRight':
      event.preventDefault()
      nextSlide()
      break
    case ' ':
      event.preventDefault()
      toggleAutoplay()
      break
  }
}

// 生命周期
onMounted(() => {
  // 添加键盘事件监听
  document.addEventListener('keydown', handleKeydown)
  
  // 开始自动播放
  if (props.autoplayEnabled) {
    startAutoplay()
  }
})

onUnmounted(() => {
  // 清理定时器和事件监听
  stopAutoplay()
  document.removeEventListener('keydown', handleKeydown)
})

// 监听 slides 变化
watch(() => props.slides, (newSlides) => {
  if (newSlides.length === 0) {
    currentSlide.value = 0
    stopAutoplay()
  } else if (currentSlide.value >= newSlides.length) {
    currentSlide.value = newSlides.length - 1
  }
}, { deep: true })

// 监听自动播放状态变化
watch(isAutoplayActive, (newValue) => {
  if (newValue) {
    startAutoplay()
  } else {
    stopAutoplay()
  }
})
</script> 