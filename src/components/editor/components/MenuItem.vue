<template>
  <button
    class="menu-item"
    :class="{ 'is-active': props.isActive ? props.isActive() : false }"
    @click="props.action"
    :title="title"
    :disabled="props.disabled ? !props.disabled() : false"
  >
    <svg class="remix">
      <use :xlink:href="`${iconUrl}#ri-${icon}`" />
    </svg>
  </button>
</template>

<script lang="ts" setup>
import remixiconUrl from 'remixicon/fonts/remixicon.symbol.svg?url';
import { ref } from 'vue';

const props = defineProps<{
  icon: string;
  title?: string;
  action: () => void;
  isActive?: () => boolean;
  disabled?: () => boolean;
}>();

const iconUrl = ref(remixiconUrl);

</script>

<style lang="scss" scoped>
.menu-item {
  width: 30px;
  height: 30px;
  color: #0d0d0d;
  border: none;
  background-color: transparent;
  border-radius: 4px;
  padding: 4px;
  svg {
    width: 100%;
    height: 100%;
    fill: currentColor;
  }

  &.is-active {
    color: #fff;
    background-color: #0d0d0d;
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  &:not(:disabled):hover {
    color: #fff;
    background-color: #0d0d0d;
  }

  &:not(.is-active):disabled:hover {
    background-color: transparent;
  }
}
</style>