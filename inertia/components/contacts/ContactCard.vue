<script setup lang="ts">
  import UiLink from '~/components/ui/UiLink.vue'
  import type { Contact } from '~/types/contact'

  defineProps<{
    contact: Contact
  }>()
</script>

<template>
  <UCard>
    <template #header>
      <div class="flex items-center gap-3">
        <div
          class="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary"
        >
          <UIcon name="i-lucide-user" class="size-6" />
        </div>
        <div>
          <h2 class="text-lg font-semibold">{{ contact.name }}</h2>
          <p class="text-sm text-muted">{{ contact.email }}</p>
        </div>
      </div>
    </template>

    <div class="space-y-2 text-sm">
      <div class="flex justify-between">
        <span class="text-muted">ID</span>
        <span class="font-mono">#{{ contact.id }}</span>
      </div>
    </div>

    <template #footer>
      <UiLink to="/contacts" class="text-sm font-medium">
        ← Retour à la liste
      </UiLink>
    </template>
  </UCard>
</template>
