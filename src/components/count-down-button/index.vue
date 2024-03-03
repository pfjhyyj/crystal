<script lang="ts" setup>
import { ref } from 'vue'

const props = defineProps<{
  onClick: () => Promise<void>
  btnText: string
  timeout: number
}>()

const loading = ref(false)

const now = ref(Date.now())

const handleClick = (): void => {
  props.onClick().then(() => {
    now.value = Date.now()
    loading.value = true
  }).catch(() => {
    loading.value = false
  })
}

const onFinish = (): void => {
  loading.value = false
}

</script>

<template>
  <div class="btn-count-down">
    <a-button
      v-if="!loading"
      size="mini"
      type="primary"
      @click="() => handleClick()"
    >
      {{ btnText }}
    </a-button>
    <a-countdown
      v-else
      format="s 秒"
      :value="now + props.timeout * 1000"
      :now="now"
      @finish="onFinish"
      :value-style="{
        fontSize: '12px',
      }"
    />
  </div>
</template>

<style lang="scss" scoped>
.btn-count-down {
  width: 90px;
  height: 32px;
  display: flex;
  justify-content: center;
  align-items: center;
  button {
    width: 100px;
  }
}
</style>
