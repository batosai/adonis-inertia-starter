<script setup lang="ts">
  import { Head, usePage } from '@inertiajs/vue3'
  import DashBoardSideBar from '~/components/DashBoardSideBar.vue'
  import AuthPage from '~/components/AuthPage.vue'
  import type { Data } from '@generated/data'
  import { Form } from '@adonisjs/inertia/vue'

  const page = usePage<Data.SharedProps>()
</script>

<template>
  <Head title="Homepage" />

  <UDashboardGroup v-if="page.props.user">
    <DashBoardSideBar />

    <UDashboardPanel>
      <template #header>
        <UDashboardNavbar title="Dashboard">
          <template #left>
            <UDashboardSidebarCollapse variant="subtle" />

            <UDashboardNavbarTitle>Dashboard</UDashboardNavbarTitle>
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
      <template #body>
        <slot />
      </template>
    </UDashboardPanel>
  </UDashboardGroup>

  <AuthPage v-else active-tab="login" />
</template>
