<template>
  <component :is="icon" width="16" height="16" v-bind="$attrs" />
</template>

<script lang="ts" setup>
import { computed, defineAsyncComponent, defineProps } from 'vue';

const props = defineProps<{
  icon: string;
}>();

const icon = computed(() => {
  return defineAsyncComponent(() => import(`@/assets/icons/${props.icon}.svg`));
});
</script>
