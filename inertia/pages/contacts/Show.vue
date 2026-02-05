<script setup lang="ts">
  import DashboardLayout from '~/layouts/DashboardLayout.vue'
  import ContactCard from '~/components/contacts/ContactCard.vue'
  import type { Contact } from '~/types/contact'

  defineOptions({
    layout: DashboardLayout,
  })

  defineProps<{
    contact: Contact
  }>()
</script>

<template>
  <div class="max-w-md">
    <ContactCard :contact="contact" />
  </div>
</template>
