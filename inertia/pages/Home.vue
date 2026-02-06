<script setup lang="ts">
  import { Head, usePage, router } from '@inertiajs/vue3'
  import { watchEffect } from 'vue'
  import Sidebar from '~/components/layout/Sidebar.vue'
  import Topbar from '~/components/layout/Topbar.vue'
  import type { Data } from '@generated/data'

  const page = usePage<Data.SharedProps>()

  watchEffect(() => {
    if (!page.props.user) {
      router.visit('/login', { replace: true })
    }
  })
</script>

<template>
  <Head title="Homepage" />

  <UDashboardGroup v-if="page.props.user">
    <Sidebar />

    <UDashboardPanel>
      <template #header>
        <Topbar title="Dashboard" />
      </template>
      <template #body>
        <slot />
      </template>
    </UDashboardPanel>
  </UDashboardGroup>
</template>
