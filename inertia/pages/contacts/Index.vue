<script setup lang="ts">
  import DashboardLayout from '~/layouts/DashboardLayout.vue'
  import ContactTable from '~/components/contacts/ContactTable.vue'
  import type { Contact } from '~/types/contact'

  defineOptions({
    layout: DashboardLayout,
  })

  defineProps<{
    contacts: Contact[]
  }>()
</script>

<template>
  <div class="flex flex-col flex-1 w-full">
    <div class="flex items-center justify-between mb-6">
      <h1 class="text-2xl font-bold">Contacts</h1>
    </div>
    <ContactTable :contacts="contacts" />
  </div>
</template>
