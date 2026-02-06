<script setup lang="ts">
  import { ref, computed } from 'vue'
  import { Form } from '@adonisjs/inertia/vue'

  const showPassword = ref(false)
  const showConfirmPassword = ref(false)
  const password = ref('')
  const confirmPassword = ref('')

  function checkStrength(pwd: string) {
    return [
      { regex: /.{8,}/, text: 'At least 8 characters' },
      { regex: /\d/, text: 'At least 1 number' },
      { regex: /[a-z]/, text: 'At least 1 lowercase letter' },
      { regex: /[A-Z]/, text: 'At least 1 uppercase letter' },
    ].map(rule => ({
      met: rule.regex.test(pwd),
      text: rule.text,
    }))
  }

  const passwordStrength = computed(() => checkStrength(password.value))
  const passwordScore = computed(() => passwordStrength.value.filter(r => r.met).length)

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
</script>

<template>
  <Form route="new_account.store" #default="{ processing, errors }">
    <div class="grid grid-cols-12 gap-4">
      <UFormField label="First name" name="firstName" class="col-span-6">
        <UInput id="first-name" name="firstName" class="w-full" />
      </UFormField>

      <UFormField label="Last name" name="lastName" class="col-span-6">
        <UInput id="last-name" name="lastName" class="w-full" />
      </UFormField>

      <UFormField label="Email" name="email" :error="errors.email" required class="col-span-12">
        <UInput
          id="signup-email"
          type="email"
          name="email"
          class="w-full"
          :data-invalid="errors.email ? 'true' : undefined"
        />
      </UFormField>

      <div class="col-span-12 space-y-2">
        <UFormField
          label="Password"
          name="password"
          :error="errors.password"
          required
        >
          <UInput
            v-model="password"
            :type="showPassword ? 'text' : 'password'"
            id="signup-password"
            autocomplete="new-password"
            :color="password.length ? passwordColor : 'neutral'"
            :aria-invalid="passwordScore < 4"
            aria-describedby="password-strength"
            class="w-full"
            :ui="{ trailing: 'pe-1' }"
          >
            <template #trailing>
              <UButton
                color="neutral"
                variant="link"
                size="sm"
                :icon="showPassword ? 'i-lucide-eye-off' : 'i-lucide-eye'"
                :aria-label="showPassword ? 'Hide password' : 'Show password'"
                :aria-pressed="showPassword"
                aria-controls="signup-password"
                type="button"
                @click="showPassword = !showPassword"
              />
            </template>
          </UInput>
        </UFormField>

        <template v-if="password.length">
          <UProgress
            :color="passwordColor"
            :indicator="passwordStrengthText"
            :model-value="passwordScore"
            :max="4"
            size="sm"
          />

          <p id="password-strength" class="text-sm font-medium">
            {{ passwordStrengthText }}. Must contain:
          </p>

          <ul class="space-y-1" aria-label="Password requirements">
            <li
              v-for="(req, index) in passwordStrength"
              :key="index"
              class="flex items-center gap-0.5"
              :class="req.met ? 'text-success' : 'text-muted'"
            >
              <UIcon
                :name="req.met ? 'i-lucide-circle-check' : 'i-lucide-circle-x'"
                class="size-4 shrink-0"
              />
              <span class="text-xs font-light">
                {{ req.text }}
                <span class="sr-only">
                  {{ req.met ? ' - Requirement met' : ' - Requirement not met' }}
                </span>
              </span>
            </li>
          </ul>
        </template>
      </div>

      <UFormField
        label="Confirm password"
        name="passwordConfirmation"
        :error="errors.passwordConfirmation"
        required
        class="col-span-12"
      >
        <UInput
          v-model="confirmPassword"
          :type="showConfirmPassword ? 'text' : 'password'"
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
              :icon="showConfirmPassword ? 'i-lucide-eye-off' : 'i-lucide-eye'"
              type="button"
              @click="showConfirmPassword = !showConfirmPassword"
            />
          </template>
        </UInput>
      </UFormField>

      <div class="col-span-12 text-center">
        <UButton
          type="submit"
          :disabled="processing"
          color="neutral"
          label="Sign up"
        />
      </div>
    </div>
  </Form>
</template>
