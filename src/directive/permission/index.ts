import { type DirectiveBinding } from 'vue'
import { useUserStore } from '@/store'

function checkPermission (el: HTMLElement, binding: DirectiveBinding) {
  const { value } = binding
  const userStore = useUserStore()
  const { role } = userStore

  if (Array.isArray(value)) {
    if (value.length > 0) {
      const hasPermission = value.includes(role)
      if (!hasPermission && (el.parentNode != null)) {
        el.parentNode.removeChild(el)
      }
    }
  } else {
    throw new Error('need roles! Like v-permission="[\'admin\',\'user\']"')
  }
}

export default {
  mounted (el: HTMLElement, binding: DirectiveBinding) {
    checkPermission(el, binding)
  },
  updated (el: HTMLElement, binding: DirectiveBinding) {
    checkPermission(el, binding)
  }
}