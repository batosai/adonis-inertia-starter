<script setup lang="ts">
  import { computed } from 'vue'

  defineOptions({
    inheritAttrs: false,
  })

  const props = defineProps<{
    to?: string
    href?: string
    external?: boolean
  }>()

  const isExternal = computed(() =>
    props.external || props.href?.startsWith('http')
  )

  const url = computed(() =>
    props.to || props.href || '#'
  )
</script>

<template>
  <ULink
    v-bind="$attrs"
    :to="url"
    :external="isExternal"
    active-class="text-primary font-semibold"
    inactive-class="text-gray-600 hover:text-gray-900"
  >
    <slot />
  </ULink>
</template>
