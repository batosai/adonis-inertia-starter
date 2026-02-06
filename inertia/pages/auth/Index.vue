<script setup lang="ts">
  import { computed } from 'vue'
  import type { TabsItem } from '@nuxt/ui'
  import { Head, Link, router } from '@inertiajs/vue3'
  import LoginForm from '~/components/auth/LoginForm.vue'
  import RegisterForm from '~/components/auth/RegisterForm.vue'

  type Tab = 'login' | 'signup'

  const props = defineProps<{
    tab?: Tab
  }>()

  const activeTab = computed<Tab>({
    get: () => props.tab ?? 'login',
    set: (tab) => {
      router.visit(tab === 'login' ? '/login' : '/signup', {
        preserveState: true,
        replace: true,
      })
    },
  })

  const items: TabsItem[] = [
    { label: 'Login', value: 'login', slot: 'login' },
    { label: 'Signup', value: 'signup', slot: 'signup' },
  ]
</script>

<template>
  <Head :title="tab === 'signup' ? 'Signup' : 'Login'" />

  <div class="flex flex-col items-center justify-center max-w-sm min-h-screen gap-12 mx-auto px-8 py-12">
    <Link route="home">
      <svg
        width="66"
        height="24"
        viewBox="0 0 105 38"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        class="text-foreground"
      >
        <path
          d="M0 0h7.5v15H0ZM7.5 15h7.5v15H7.5ZM15 30h7.5v7.5H15ZM22.5 15h7.5v15H22.5ZM30 0h7.5v15H30ZM45 0h7.5v30h15v-30h7.5v37.5h-30v-37.5ZM82.5 37.5V0H105v7.5H90V15h15v7.5H90V30h15v7.5H82.5Z"
          fill="currentColor"
        />
      </svg>
    </Link>

    <UTabs
      v-model="activeTab"
      :items="items"
      color="neutral"
      variant="pill"
      class="w-full max-w-2xl gap-8"
      :ui="{ root: 'gap-8', content: 'min-h-[480px] w-full' }"
    >
      <template #login>
        <LoginForm />
      </template>

      <template #signup>
        <RegisterForm />
      </template>
    </UTabs>
  </div>
</template>
