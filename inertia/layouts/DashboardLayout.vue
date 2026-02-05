<script setup lang="ts">
  import Sidebar from '~/components/layout/Sidebar.vue'
  import Topbar from '~/components/layout/Topbar.vue'

  defineProps<{
    title?: string
  }>()
</script>

<template>
  <UApp>
    <UDashboardGroup>
      <Sidebar />
      <UDashboardPanel>
        <template #header>
          <Topbar :title="title ?? 'Dashboard'" />
        </template>
        <template #body>
          <slot />
        </template>
      </UDashboardPanel>
    </UDashboardGroup>
  </UApp>
</template>