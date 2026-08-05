<script setup lang="ts">
import { computed } from 'vue'

type IconSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl'
type IconVariant = 'primary' | 'secondary' | 'muted'

interface Props {
  size?: IconSize
  variant?: IconVariant
}

const props = withDefaults(defineProps<Props>(), {
  size: 'md',
  variant: 'primary',
})

const sizeClasses: Record<IconSize, string> = {
  xs: 'size-4',
  sm: 'size-6',
  md: 'size-10',
  lg: 'size-16',
  xl: 'size-20',
}

const variantClasses: Record<IconVariant, string> = {
  primary: 'opacity-100',
  secondary: 'opacity-80',
  muted: 'opacity-50',
}

const iconClasses = computed(() => [sizeClasses[props.size], variantClasses[props.variant]])
</script>

<template>
  <svg
    viewBox="0 0 16 16"
    xmlns="http://www.w3.org/2000/svg"
    :class="[iconClasses, 'shrink-0 [image-rendering:pixelated]']"
    aria-hidden="true"
  >
    <rect x="2" y="1" width="12" height="4" fill="#7a1fcf" />
    <rect x="1" y="3" width="2" height="5" fill="#7a1fcf" />
    <rect x="13" y="3" width="2" height="5" fill="#7a1fcf" />
    <rect x="2" y="11" width="2" height="5" fill="#7a1fcf" />
    <rect x="12" y="11" width="2" height="5" fill="#7a1fcf" />
    <rect x="3" y="4" width="10" height="7" fill="#c68642" />
    <rect x="5" y="6" width="2" height="2" fill="#1a0e05" />
    <rect x="9" y="6" width="2" height="2" fill="#1a0e05" />
    <rect x="4" y="8" width="2" height="1" fill="#e08080" />
    <rect x="10" y="8" width="2" height="1" fill="#e08080" />
    <rect x="6" y="9" width="4" height="1" fill="#cc3344" />
    <rect x="3" y="11" width="10" height="5" fill="#a030ee" />
    <rect x="2" y="12" width="12" height="4" fill="#a030ee" />
  </svg>
</template>
