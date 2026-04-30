<template>
  <NuxtLayout>
    <div class="bg-[#e1e1e1]">
      <NuxtPage />
    </div>
  </NuxtLayout>

  <!-- 全局在线咨询组件 -->
  <ChatWidget />
</template>

<script setup lang="ts">
const { siteName, siteTagline } = useAppConfig()

// 统一设置全局标题模板，页面标题由具体页面自行覆盖。
useHead({
  titleTemplate: (pageTitle?: string) => {
    if (!pageTitle || pageTitle === siteTagline)
      return `${siteName} | ${siteTagline}`

    return `${pageTitle} | ${siteName}`
  }
})
</script>
