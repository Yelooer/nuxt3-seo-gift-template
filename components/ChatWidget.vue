<template>
  <div class="chat-widget">
    <Transition name="fade">
      <button
        v-if="!isChatOpen"
        class="fixed bottom-4 right-4 z-50 flex min-h-[48px] min-w-[48px] items-center gap-1 rounded-full px-3 py-2 text-white shadow-lg transition-all duration-300 hover:scale-105 sm:bottom-6 sm:right-6 sm:gap-2 sm:px-4 sm:py-3 custom-blue-bg"
        @click="toggleChatWindow"
      >
        <svg class="h-4 w-4 sm:h-5 sm:w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
        </svg>
        <span class="hidden text-sm font-medium sm:inline sm:text-base">Chat Online</span>
        <span class="text-sm font-medium sm:hidden sm:text-base">Chat</span>
      </button>
    </Transition>

    <Transition name="slide-up">
      <div
        v-if="isChatOpen"
        class="fixed bottom-4 left-4 right-4 z-50 w-full max-w-sm overflow-hidden rounded-lg border border-gray-200 bg-white shadow-xl sm:bottom-6 sm:left-auto sm:right-6 sm:w-80 sm:max-w-none"
      >
        <div class="custom-blue-bg flex items-center justify-between p-3 text-white sm:p-4">
          <h3 class="text-base font-semibold sm:text-lg">Chat with us online</h3>
          <button
            class="flex min-h-[44px] min-w-[44px] items-center justify-center p-1 text-white transition-colors hover:text-gray-200"
            @click="toggleChatWindow"
          >
            <svg class="h-4 w-4 sm:h-5 sm:w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
            </svg>
          </button>
        </div>

        <div class="max-h-[70vh] space-y-3 overflow-y-auto p-3 sm:space-y-4 sm:p-4">
          <p class="text-sm text-gray-600 sm:text-base">
            Hi there, is there anything we can help you with today?
          </p>

          <form class="space-y-3 sm:space-y-4" @submit.prevent="submitChatForm">
            <div>
              <label class="mb-1 block text-sm font-medium text-gray-700 sm:mb-2">
                Name
              </label>
              <input
                v-model="chatForm.name"
                type="text"
                required
                class="custom-input"
              >
            </div>

            <div>
              <label class="mb-1 block text-sm font-medium text-gray-700 sm:mb-2">
                Email
              </label>
              <input
                v-model="chatForm.email"
                type="email"
                required
                :class="['custom-input', emailErrorMessage ? 'border-red-500' : 'border-gray-300']"
                @blur="validateEmailAddress"
                @input="clearEmailValidationError"
              >
              <p v-if="emailErrorMessage" class="mt-1 text-xs text-red-500">{{ emailErrorMessage }}</p>
            </div>

            <div>
              <label class="mb-1 block text-sm font-medium text-gray-700 sm:mb-2">
                Phone Number
              </label>
              <input
                v-model="chatForm.phone"
                type="tel"
                class="custom-input"
              >
            </div>

            <div>
              <label class="mb-1 block text-sm font-medium text-gray-700 sm:mb-2">
                Message
              </label>
              <textarea
                v-model="chatForm.message"
                rows="3"
                required
                class="custom-textarea"
                placeholder="Please enter your message..."
              />
            </div>

            <p
              v-if="submissionFeedback.message"
              :class="[
                'rounded-md px-3 py-2 text-sm',
                submissionFeedback.type === 'success'
                  ? 'bg-green-50 text-green-700'
                  : 'bg-red-50 text-red-700'
              ]"
            >
              {{ submissionFeedback.message }}
            </p>

            <button
              type="submit"
              :disabled="isSubmitting || !!emailErrorMessage"
              class="mt-4 min-h-[48px] w-full rounded-md bg-gray-800 px-4 py-3 text-base font-medium text-white transition-colors duration-200 hover:bg-gray-900 disabled:bg-gray-400 sm:mt-6 sm:py-2 sm:text-sm"
            >
              <span v-if="isSubmitting">Submitting...</span>
              <span v-else>Start Online Chat</span>
            </button>
          </form>
        </div>
      </div>
    </Transition>
  </div>
</template>

<script setup lang="ts">
interface ChatFormData {
  name: string
  email: string
  phone: string
  message: string
}

interface SubmissionFeedbackState {
  type: 'success' | 'error'
  message: string
}

interface ChatWidgetProps {
  autoOpen?: boolean
}

const props = withDefaults(defineProps<ChatWidgetProps>(), {
  autoOpen: false
})

// 聊天窗口是否展开。
const isChatOpen = ref(false)

// 当前是否正在提交表单。
const isSubmitting = ref(false)

// 邮箱校验错误信息。
const emailErrorMessage = ref('')

// 提交结果提示。
const submissionFeedback = ref<SubmissionFeedbackState>({
  type: 'success',
  message: ''
})

// 聊天表单数据。
const chatForm = ref<ChatFormData>({
  name: '',
  email: '',
  phone: '',
  message: ''
})

// 表单容器点击关闭逻辑。
const handleDocumentClick = (event: MouseEvent | TouchEvent) => {
  const targetElement = event.target as HTMLElement

  if (isChatOpen.value && !targetElement.closest('.chat-widget'))
    isChatOpen.value = false
}

// 键盘快捷关闭逻辑。
const handleDocumentKeydown = (event: KeyboardEvent) => {
  if (event.key === 'Escape' && isChatOpen.value)
    isChatOpen.value = false
}

// 屏幕方向变化后的布局调整入口。
const handleViewportChange = () => {
  if (!isChatOpen.value)
    return
}

// 切换聊天窗口显隐。
const toggleChatWindow = () => {
  isChatOpen.value = !isChatOpen.value
  submissionFeedback.value.message = ''
}

// 校验邮箱格式。
const validateEmailAddress = () => {
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

  if (chatForm.value.email && !emailPattern.test(chatForm.value.email)) {
    emailErrorMessage.value = 'Please enter a valid email address'
    return false
  }

  emailErrorMessage.value = ''
  return true
}

// 清理邮箱错误提示。
const clearEmailValidationError = () => {
  if (emailErrorMessage.value)
    emailErrorMessage.value = ''
}

// 重置表单内容。
const resetChatForm = () => {
  chatForm.value = {
    name: '',
    email: '',
    phone: '',
    message: ''
  }
  emailErrorMessage.value = ''
}

// 提交在线咨询表单。
const submitChatForm = async () => {
  if (isSubmitting.value)
    return

  submissionFeedback.value.message = ''

  if (!validateEmailAddress())
    return

  isSubmitting.value = true

  try {
    await $fetch('/analytics/customer', {
      method: 'POST',
      body: {
        name: chatForm.value.name,
        email: chatForm.value.email,
        phone: chatForm.value.phone,
        message: chatForm.value.message
      }
    })

    resetChatForm()
    submissionFeedback.value = {
      type: 'success',
      message: 'Thank you for your message! We will get back to you soon.'
    }
  } catch (error) {
    console.error('在线咨询表单提交失败：', error)
    submissionFeedback.value = {
      type: 'error',
      message: '提交失败，请稍后重试。'
    }
  } finally {
    isSubmitting.value = false
  }
}

onMounted(() => {
  if (props.autoOpen)
    isChatOpen.value = true

  document.addEventListener('click', handleDocumentClick)
  document.addEventListener('touchstart', handleDocumentClick)
  document.addEventListener('keydown', handleDocumentKeydown)
  window.addEventListener('orientationchange', handleViewportChange)
  window.addEventListener('resize', handleViewportChange)
})

onUnmounted(() => {
  document.removeEventListener('click', handleDocumentClick)
  document.removeEventListener('touchstart', handleDocumentClick)
  document.removeEventListener('keydown', handleDocumentKeydown)
  window.removeEventListener('orientationchange', handleViewportChange)
  window.removeEventListener('resize', handleViewportChange)
})
</script>

<style scoped>
.custom-blue-bg {
  background-color: rgb(0, 145, 183);
}

.custom-blue-bg:hover {
  background-color: rgb(0, 125, 163);
}

.custom-input {
  width: 100%;
  min-height: 44px;
  border-radius: 0.375rem;
  border: 1px solid rgb(209 213 219);
  padding: 0.75rem 1rem;
  font-size: 1rem;
  outline: none;
}

.custom-input:focus {
  border-color: transparent;
  box-shadow: 0 0 0 2px rgb(0, 145, 183);
}

.custom-textarea {
  width: 100%;
  min-height: 88px;
  resize: none;
  border-radius: 0.375rem;
  border: 1px solid rgb(209 213 219);
  padding: 0.75rem 1rem;
  font-size: 1rem;
  outline: none;
}

.custom-textarea:focus {
  border-color: transparent;
  box-shadow: 0 0 0 2px rgb(0, 145, 183);
}

@media (hover: none) and (pointer: coarse) {
  .custom-blue-bg:hover {
    background-color: rgb(0, 145, 183);
  }

  .custom-blue-bg:active {
    background-color: rgb(0, 125, 163);
    transform: scale(0.98);
  }
}

@media (max-width: 640px) {
  input,
  textarea {
    font-size: 16px !important;
  }

  button {
    -webkit-tap-highlight-color: transparent;
  }

  .chat-widget > div:last-child {
    bottom: 20px !important;
    left: 20px !important;
    right: 20px !important;
    max-height: calc(100vh - 100px);
  }
}

@media screen and (max-height: 500px) and (max-width: 640px) {
  .chat-widget > div:last-child {
    position: fixed;
    top: 10px;
    bottom: 10px;
    height: auto;
    max-height: none;
  }

  .chat-widget > div:last-child > div:last-child {
    max-height: calc(100vh - 120px);
    overflow-y: auto;
  }
}

.fade-enter-active,
.fade-leave-active {
  transition: all 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: scale(0.8);
}

.slide-up-enter-active,
.slide-up-leave-active {
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.slide-up-enter-from,
.slide-up-leave-to {
  opacity: 0;
  transform: translateY(20px);
}

@media (max-width: 640px) {
  .slide-up-enter-from,
  .slide-up-leave-to {
    transform: translateY(100%);
  }
}

@media (prefers-color-scheme: dark) {
  .custom-blue-bg {
    background-color: rgb(0, 165, 203);
  }

  .custom-blue-bg:hover {
    background-color: rgb(0, 145, 183);
  }
}

@media (prefers-reduced-motion: reduce) {
  .fade-enter-active,
  .fade-leave-active,
  .slide-up-enter-active,
  .slide-up-leave-active {
    transition: none;
  }
}
</style>
