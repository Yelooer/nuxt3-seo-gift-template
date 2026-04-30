<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-50">
    <div class="text-center">
      <div class="mb-8">
        <h1 class="text-9xl font-bold text-gray-300">404</h1>
        <h2 class="text-2xl font-semibold text-gray-700 mb-4">页面未找到</h2>
        <p class="text-gray-500 mb-8">抱歉，您访问的页面不存在或已被移除。</p>
      </div>
      
      <div class="space-x-4">
        <NuxtLink 
          to="/" 
          class="inline-block bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded-lg transition"
        >
          返回首页
        </NuxtLink>
        <button 
          @click="goBack" 
          class="inline-block bg-gray-600 hover:bg-gray-700 text-white font-semibold px-6 py-3 rounded-lg transition"
        >
          返回上页
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
const router = useRouter()
const localePath = useLocalePath()

function goBack() {
  if (window.history.length > 1) {
    router.back()
  } else {
    router.push(localePath('/'))
  }
}
</script> 