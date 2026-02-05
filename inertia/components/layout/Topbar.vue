<script setup lang="ts">
  import { usePage } from '@inertiajs/vue3'
  import { Form } from '@adonisjs/inertia/vue'
  import type { Data } from '@generated/data'

  const page = usePage<Data.SharedProps>()

  defineProps<{
    title?: string
  }>()
</script>

<template>
  <UDashboardNavbar :title="title ?? 'Dashboard'">
    <template #left>
      <UDashboardSidebarCollapse variant="subtle" />
      <UDashboardNavbarTitle>{{ title ?? 'Dashboard' }}</UDashboardNavbarTitle>
    </template>
    <template #right>
      <div v-if="page.props.user" class="flex items-center gap-2">
        <span>{{ page.props.user.fullName }}</span>
        <Form route="session.destroy">
          <button type="submit">Logout</button>
        </Form>
      </div>
    </template>
  </UDashboardNavbar>
</template>
