<script setup lang="ts">
import { computed } from 'vue'

type IconSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl'

interface Props {
  size?: IconSize
}

const props = withDefaults(defineProps<Props>(), {
  size: 'md',
})

const sizeClasses: Record<IconSize, string> = {
  xs: 'size-4',
  sm: 'size-6',
  md: 'size-10',
  lg: 'size-16',
  xl: 'size-20',
}

const classes = computed(() => [sizeClasses[props.size], 'shrink-0', '[image-rendering:pixelated]'])
</script>

<template>
  <svg viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg" :class="classes" aria-hidden="true">
    <rect x="3" y="1" width="10" height="2" fill="#5c3317" />
    <rect x="2" y="2" width="12" height="3" fill="#7a4522" />
    <rect x="3" y="4" width="10" height="7" fill="#c68642" />
    <rect x="5" y="6" width="2" height="2" fill="#1a0e05" />
    <rect x="9" y="6" width="2" height="2" fill="#1a0e05" />
    <rect x="6" y="9" width="4" height="1" fill="#8b5e3c" />
    <rect x="2" y="5" width="1" height="3" fill="#c68642" />
    <rect x="13" y="5" width="1" height="3" fill="#c68642" />
    <rect x="3" y="11" width="10" height="5" fill="#1a8a4a" />
    <rect x="2" y="12" width="12" height="4" fill="#1a8a4a" />
  </svg>
</template>
