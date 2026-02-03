<script setup lang="ts">
  import { Head } from '@inertiajs/vue3'
  import AuthPage from '~/components/AuthPage.vue'

  defineProps<{
    tab?: 'login' | 'signup'
  }>()
</script>

<template>
  <Head :title="tab === 'signup' ? 'Signup' : 'Login'" />
  <AuthPage :active-tab="tab ?? 'login'" />
</template>
