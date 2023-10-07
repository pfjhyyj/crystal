import { type Ref, ref } from 'vue'

interface VisibleHook {
  visible: Ref<boolean>
  setVisible: (value: boolean) => void
  toggle: () => void
}

export default function useVisible (initValue = false): VisibleHook {
  const visible = ref(initValue)
  const setVisible = (value: boolean): void => {
    visible.value = value
  }
  const toggle = (): void => {
    visible.value = !visible.value
  }
  return {
    visible,
    setVisible,
    toggle
  }
}
