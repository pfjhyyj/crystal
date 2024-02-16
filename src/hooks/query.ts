import { useRoute, type LocationQuery } from 'vue-router'
import { computed } from 'vue'

export function useQuery<P extends LocationQuery> () {
  const route = useRoute()
  return computed(
    () => route.query as P
  )
}
