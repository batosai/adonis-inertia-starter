<script setup lang="ts">
  import { Head, usePage } from '@inertiajs/vue3'
  import Sidebar from '~/components/layout/Sidebar.vue'
  import Topbar from '~/components/layout/Topbar.vue'
  import AuthPage from '~/components/AuthPage.vue'
  import type { Data } from '@generated/data'

  const page = usePage<Data.SharedProps>()
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

  <AuthPage v-else active-tab="login" />
</template>
