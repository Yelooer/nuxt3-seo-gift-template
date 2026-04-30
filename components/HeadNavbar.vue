<template>
  <nav class="fixed left-0 right-0 top-0 z-50 bg-white shadow">
    <div class="mx-auto max-w-7xl px-4">
      <div class="flex h-16 justify-between">
        <div class="flex">
          <div class="flex flex-shrink-0 items-center">
            <NuxtLink to="/" class="flex items-center">
              <div class="flex h-12 w-12 items-center justify-center rounded-lg bg-[#0091b7] text-sm font-bold text-white">VC</div>
              <h1 class="ml-2 text-xl font-bold text-[#0091b7]">Virtual Company</h1>
            </NuxtLink>
          </div>

          <div
            class="relative hidden sm:ml-6 sm:flex sm:space-x-8"
            @mouseenter="isMenuHovering = true"
            @mouseleave="isMenuHovering = false"
          >
            <NuxtLink
              v-for="(menuItem, index) in visibleMenuItems"
              :key="`${menuItem.path}-${index}`"
              :to="menuItem.path"
              :class="[
                'relative inline-flex items-center border-b-2 px-1 pt-1 text-sm font-medium transition-all duration-300',
                activeMenuPath === normalizeMenuPath(menuItem.path)
                  ? 'border-black text-gray-900'
                  : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
              ]"
              @click="navigateToMenu(menuItem.path)"
              @mouseenter="menuItem.children ? openDesktopSubmenu(index) : activeSubmenuIndex = null"
              @mouseleave="scheduleSubmenuClose"
            >
              {{ menuItem.name }}
            </NuxtLink>
          </div>
        </div>

        <div
          v-show="isMenuHovering && activeSubmenuIndex !== null && visibleMenuItems[activeSubmenuIndex]?.children"
          class="fixed left-0 top-[4rem] z-50 w-screen"
          @mouseenter="cancelSubmenuClose"
          @mouseleave="scheduleSubmenuClose"
        >
          <div class="h-50 w-full border-t border-gray-100 bg-white/70 shadow-lg backdrop-blur-md">
            <div class="mx-auto flex max-w-7xl py-5">
              <NuxtLink
                v-for="childMenu in visibleMenuItems[activeSubmenuIndex]?.children || []"
                :key="`${childMenu.path}-${childMenu.name}`"
                :to="childMenu.path"
                class="whitespace-nowrap px-16 py-2 text-base font-medium text-gray-700 transition hover:text-blue-600"
                @click="handleSubmenuNavigation(childMenu.path)"
              >
                {{ childMenu.name }}
              </NuxtLink>
            </div>
          </div>
        </div>

        <div class="flex items-center space-x-4">
          <button
            class="inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-black sm:hidden"
            @click="isMobileMenuOpen = !isMobileMenuOpen"
          >
            <span class="sr-only">Open main menu</span>
            <svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path v-show="!isMobileMenuOpen" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
              <path v-show="isMobileMenuOpen" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      </div>

      <div v-show="isMobileMenuOpen" class="sm:hidden">
        <div class="space-y-1 pb-3 pt-2">
          <NuxtLink
            v-for="(menuItem, index) in visibleMenuItems"
            :key="`${menuItem.path}-${index}`"
            :to="menuItem.path"
            :class="[
              'block border-l-4 py-2 pl-3 pr-4 text-base font-medium transition-all duration-300',
              activeMenuPath === normalizeMenuPath(menuItem.path)
                ? 'border-black bg-gray-50 text-black'
                : 'border-transparent text-gray-500 hover:border-gray-300 hover:bg-gray-50 hover:text-gray-700'
            ]"
            @click="navigateToMenu(menuItem.path)"
          >
            {{ menuItem.name }}
          </NuxtLink>
        </div>
      </div>
    </div>
  </nav>
</template>

<script lang="ts" setup>
interface NavigationMenuItem {
  name: string
  path: string
  children?: NavigationMenuItem[]
}

const router = useRouter()

// 导航菜单定义。
const navigationMenus: NavigationMenuItem[] = [
  { name: 'Home', path: '/' },
  {
    name: 'Gifts & Accessories',
    path: '/product/eco',
    children: [
      { name: 'Eco', path: '/product/eco' },
      { name: 'Bags & Totes', path: '/product/bags-totes' },
      { name: 'Drinkware', path: '/product/drink-ware' },
      { name: 'Handicrafts', path: '/product/handi-crafts' },
      { name: 'Home Decor', path: '/product/home-decor' },
      { name: 'Office Supplies', path: '/product/office-supplies' }
    ]
  },
  { name: 'Blog', path: '/blogs' },
  { name: 'About Us', path: '/about-us' }
]

// 导航菜单数据。
const visibleMenuItems = computed(() => navigationMenus)

// 移动端菜单开关状态。
const isMobileMenuOpen = ref(false)

// 当前激活的导航路径。
const activeMenuPath = ref('')

// 当前悬浮的子菜单索引。
const activeSubmenuIndex = ref<number | null>(null)

// 是否正处于桌面端菜单悬浮状态。
const isMenuHovering = ref(false)

let submenuCloseTimer: ReturnType<typeof setTimeout> | null = null

// 统一归一化菜单路径，便于高亮判断。
function normalizeMenuPath(menuPath: string) {
  return menuPath.startsWith('/#') ? menuPath.substring(1) : menuPath
}

// 处理主菜单跳转。
async function navigateToMenu(menuPath: string) {
  const normalizedPath = normalizeMenuPath(menuPath)
  activeMenuPath.value = normalizedPath

  if (menuPath.startsWith('/#')) {
    await router.push({ path: '/', hash: menuPath })
  } else {
    await router.push(menuPath)
  }

  isMobileMenuOpen.value = false
}

// 打开桌面端子菜单。
function openDesktopSubmenu(index: number) {
  if (submenuCloseTimer)
    clearTimeout(submenuCloseTimer)

  activeSubmenuIndex.value = index
  isMenuHovering.value = true
}

// 安排关闭子菜单，避免鼠标轻微移动时闪烁。
function scheduleSubmenuClose() {
  submenuCloseTimer = setTimeout(() => {
    isMenuHovering.value = false
    activeSubmenuIndex.value = null
  }, 120)
}

// 取消关闭子菜单。
function cancelSubmenuClose() {
  if (submenuCloseTimer)
    clearTimeout(submenuCloseTimer)

  isMenuHovering.value = true
}

// 处理子菜单跳转并关闭悬浮层。
function handleSubmenuNavigation(menuPath: string) {
  navigateToMenu(menuPath)
  activeSubmenuIndex.value = null
  isMenuHovering.value = false
}
</script>

<style scoped>
@media (min-width: 640px) {
  .sm\:space-x-8 > :not([hidden]) ~ :not([hidden]) {
    --tw-space-x-reverse: 0;
    margin-right: calc(2rem * var(--tw-space-x-reverse));
    margin-left: calc(2rem * calc(1 - var(--tw-space-x-reverse)));
  }
}
</style>
