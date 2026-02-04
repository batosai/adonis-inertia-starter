<script setup lang="ts">
import type { NavigationMenuItem, DropdownMenuItem } from '@nuxt/ui'

const items: NavigationMenuItem[][] = [
  [
    {
      label: 'Home',
      icon: 'i-lucide-house',
      active: true,
    },
    {
      label: 'Inbox',
      icon: 'i-lucide-inbox',
      badge: '4',
    },
    {
      label: 'Contacts',
      icon: 'i-lucide-users',
    },
    {
      label: 'Settings',
      icon: 'i-lucide-settings',
      defaultOpen: true,
      children: [
        {
          label: 'General',
        },
        {
          label: 'Members',
        },
        {
          label: 'Notifications',
        },
      ],
    },
  ],
  [
    {
      label: 'Feedback',
      icon: 'i-lucide-message-circle',
      to: 'https://github.com/nuxt-ui-templates/dashboard',
      target: '_blank',
    },
    {
      label: 'Help & Support',
      icon: 'i-lucide-info',
      to: 'https://github.com/nuxt/ui',
      target: '_blank',
    },
  ],
]

const headerMenuItems: DropdownMenuItem[][] = [
  [
    { label: 'View', icon: 'i-lucide-eye' },
    { label: 'Copy', icon: 'i-lucide-copy' },
    { label: 'Edit', icon: 'i-lucide-pencil' },
  ],
  [
    { label: 'Delete', color: 'error', icon: 'i-lucide-trash' },
  ],
]

const userMenuItems: DropdownMenuItem[][] = [
  [
    {
      label: 'Benjamin',
      avatar: { src: 'https://github.com/benjamincanac.png' },
      type: 'label',
    },
  ],
  [
    { label: 'Profile', icon: 'i-lucide-user' },
    { label: 'Billing', icon: 'i-lucide-credit-card' },
    { label: 'Settings', icon: 'i-lucide-cog' },
  ],
  [
    { label: 'Logout', icon: 'i-lucide-log-out', color: 'error' },
  ],
]
</script>

<template>
  <UDashboardSidebar collapsible resizable class="bg-elevated/25">
    <template #header="{ collapsed }">
      <UDropdownMenu
        :items="headerMenuItems"
        :content="{ side: 'bottom', align: 'start' }"
        :ui="{ content: collapsed ? 'w-48' : 'w-(--reka-dropdown-menu-trigger-width)' }"
      >
        <UButton
          :label="collapsed ? undefined : 'Open'"
          icon="i-lucide-codesandbox"
          :trailing-icon="collapsed ? undefined : 'i-lucide-chevron-down'"
          color="neutral"
          variant="ghost"
          :block="!collapsed"
          :square="collapsed"
        />
      </UDropdownMenu>
    </template>

    <template #default="{ collapsed }">
      <UButton
        :label="collapsed ? undefined : 'Search...'"
        icon="i-lucide-search"
        color="neutral"
        variant="ghost"
        block
        :square="collapsed"
      >
        <template v-if="!collapsed" #trailing>
          <div class="flex items-center gap-0.5 ms-auto">
            <UKbd value="meta" variant="subtle" />
            <UKbd value="K" variant="subtle" />
          </div>
        </template>
      </UButton>

      <UNavigationMenu :collapsed="collapsed" :items="items[0]" orientation="vertical" />

      <UNavigationMenu
        :collapsed="collapsed"
        :items="items[1]"
        orientation="vertical"
        class="mt-auto"
      />
    </template>

    <template #footer="{ collapsed }">
      <UDropdownMenu :items="userMenuItems" :content="{ side: 'top' }" :ui="{ content: 'w-56' }">
        <UButton
          :avatar="{ src: 'https://github.com/benjamincanac.png' }"
          :label="collapsed ? undefined : 'Benjamin'"
          color="neutral"
          variant="ghost"
          class="w-full"
          :block="collapsed"
        />
      </UDropdownMenu>
    </template>
  </UDashboardSidebar>
</template>
