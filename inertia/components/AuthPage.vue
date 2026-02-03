<script setup lang="ts">
  import { ref, computed } from 'vue'
  import type { TabsItem } from '@nuxt/ui'
  import { Form, Link } from '@adonisjs/inertia/vue'
  import { router } from '@inertiajs/vue3'

  type Tab = 'login' | 'signup'

  const props = defineProps<{
    activeTab?: Tab
  }>()

  const activeTab = computed<Tab>({
    get: () => props.activeTab ?? 'login',
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

  const showLoginPassword = ref(false)
  const showSignupPassword = ref(false)
  const showSignupConfirmPassword = ref(false)

  const loginPassword = ref('')
  const signupPassword = ref('')
  const signupConfirmPassword = ref('')

  function checkStrength(password: string) {
    return [
      { regex: /.{8,}/, text: 'At least 8 characters' },
      { regex: /\d/, text: 'At least 1 number' },
      { regex: /[a-z]/, text: 'At least 1 lowercase letter' },
      { regex: /[A-Z]/, text: 'At least 1 uppercase letter' },
    ].map(rule => ({
      met: rule.regex.test(password),
      text: rule.text,
    }))
  }

  const passwordStrength = computed(() =>
    checkStrength(signupPassword.value)
  )

  const passwordScore = computed(
    () => passwordStrength.value.filter(r => r.met).length
  )

  const passwordColor = computed(() => {
    if (passwordScore.value === 0) return 'neutral'
    if (passwordScore.value <= 1) return 'error'
    if (passwordScore.value <= 3) return 'warning'
    return 'success'
  })

  const passwordStrengthText = computed(() => {
    if (passwordScore.value === 0) return 'Enter a password'
    if (passwordScore.value <= 2) return 'Weak password'
    if (passwordScore.value === 3) return 'Medium password'
    return 'Strong password'
  })

  const passwordsMatch = computed(
    () =>
      signupPassword.value.length > 0 &&
      signupPassword.value === signupConfirmPassword.value
  )

  const canSubmitSignup = computed(
    () => passwordScore.value === 4 && passwordsMatch.value
  )
</script>

<template>
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
      <!-- LOGIN -->
      <template #login>
        <Form route="session.store" #default="{ processing, errors }">
          <div class="grid grid-cols-12 gap-4">
            <UFormField
              label="Email"
              for="login-email"
              name="email"
              :error="errors.email"
              class="col-span-12"
            >
              <UInput
                id="login-email"
                type="email"
                name="email"
                autocomplete="username"
                class="w-full"
                :data-invalid="errors.email ? 'true' : undefined"
              />
            </UFormField>

            <UFormField
              label="Password"
              for="login-password"
              name="password"
              :error="errors.password"
              class="col-span-12"
            >
              <UInput
                v-model="loginPassword"
                :type="showLoginPassword ? 'text' : 'password'"
                id="login-password"
                name="password"
                autocomplete="current-password"
                class="w-full"
                :ui="{ trailing: 'pe-1' }"
              >
                <template #trailing>
                  <UButton
                    color="neutral"
                    variant="link"
                    size="sm"
                    :icon="showLoginPassword ? 'i-lucide-eye-off' : 'i-lucide-eye'"
                    type="button"
                    @click="showLoginPassword = !showLoginPassword"
                  />
                </template>
              </UInput>
            </UFormField>

            <div class="col-span-12 text-center">
              <UButton type="submit" :disabled="processing" color="neutral" label="Login" />
            </div>
          </div>
        </Form>
      </template>

      <!-- SIGNUP -->
      <template #signup>
        <Form route="new_account.store" #default="{ processing, errors }">
          <div class="grid grid-cols-12 gap-4">
            <UFormField label="First name" name="firstName" class="col-span-6">
              <UInput id="first-name" name="firstName" class="w-full" />
            </UFormField>

            <UFormField label="Last name" name="lastName" class="col-span-6">
              <UInput id="last-name" name="lastName" class="w-full" />
            </UFormField>

            <UFormField label="Email" name="email" class="col-span-12">
              <UInput id="signup-email" type="email" name="email" class="w-full" />
            </UFormField>

            <div class="col-span-12 space-y-2">
              <UFormField label="Password" name="password">
                <UInput
                  v-model="signupPassword"
                  :type="showSignupPassword ? 'text' : 'password'"
                  id="signup-password"
                  autocomplete="new-password"
                  :color="signupPassword.length ? passwordColor : 'neutral'"
                  class="w-full"
                  :ui="{ trailing: 'pe-1' }"
                >
                  <template #trailing>
                    <UButton
                      color="neutral"
                      variant="link"
                      size="sm"
                      :icon="showSignupPassword ? 'i-lucide-eye-off' : 'i-lucide-eye'"
                      type="button"
                      @click="showSignupPassword = !showSignupPassword"
                    />
                  </template>
                </UInput>
              </UFormField>

              <template v-if="signupPassword.length">
                <UProgress
                  :model-value="passwordScore"
                  :max="4"
                  :color="passwordColor"
                  :indicator="passwordStrengthText"
                  size="sm"
                />

                <p id="password-strength" class="text-sm font-medium">
                  {{ passwordStrengthText }}. Must contain:
                </p>

                <ul class="space-y-1" aria-label="Password requirements">
                  <li
                    v-for="(req, index) in passwordStrength"
                    :key="index"
                    class="flex items-center gap-1"
                    :class="req.met ? 'text-success' : 'text-muted'"
                  >
                    <UIcon
                      :name="req.met ? 'i-lucide-circle-check' : 'i-lucide-circle-x'"
                      class="size-4 shrink-0"
                    />
                    <span class="text-xs font-light">
                      {{ req.text }}
                      <span class="sr-only">
                        {{ req.met ? 'Requirement met' : 'Requirement not met' }}
                      </span>
                    </span>
                  </li>
                </ul>
              </template>

            </div>

            <UFormField label="Confirm password" name="passwordConfirmation" class="col-span-12">
              <UInput
                v-model="signupConfirmPassword"
                :type="showSignupConfirmPassword ? 'text' : 'password'"
                id="signup-password-confirmation"
                autocomplete="new-password"
                class="w-full"
                :ui="{ trailing: 'pe-1' }"
              >
                <template #trailing>
                  <UButton
                    color="neutral"
                    variant="link"
                    size="sm"
                    :icon="showSignupConfirmPassword ? 'i-lucide-eye-off' : 'i-lucide-eye'"
                    type="button"
                    @click="showSignupConfirmPassword = !showSignupConfirmPassword"
                  />
                </template>
              </UInput>
            </UFormField>

            <div class="col-span-12 text-center">
              <UButton
                type="submit"
                :disabled="processing || !canSubmitSignup"
                color="neutral"
                label="Sign up"
              />
            </div>
          </div>
        </Form>
      </template>
    </UTabs>
  </div>
</template>
