import { type Ref, ref } from 'vue'

interface LoadingHook {
  loading: Ref<boolean>
  setLoading: (value: boolean) => void
  toggle: () => void
}

export default function useLoading (initValue = false): LoadingHook {
  const loading = ref(initValue)
  const setLoading = (value: boolean): void => {
    loading.value = value
  }
  const toggle = (): void => {
    loading.value = !loading.value
  }
  return {
    loading,
    setLoading,
    toggle
  }
}
