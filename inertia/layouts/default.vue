<script setup lang="ts">
  import { watch } from 'vue'
  import { usePage } from '@inertiajs/vue3'
  import { toast } from 'vue-sonner'
  import type { Data } from '@generated/data'
  const page = usePage<Data.SharedProps>()

  watch(
    () => page.url,
    () => toast.dismiss()
  )

  watch(
    () => page.props.flash.error,
    (error) => {
      if (error) toast.error(error)
    },
    { immediate: true }
  )
</script>

<template>
  <UApp>
    <UContainer>
      <main>
        <slot />
      </main>
    </UContainer>
  </UApp>
</template>
