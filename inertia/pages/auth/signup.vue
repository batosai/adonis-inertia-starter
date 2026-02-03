<script setup lang="ts">
import { Form } from '@adonisjs/inertia/vue'
</script>

<template>
  <div class="flex flex-col items-center justify-center h-screen">
    <div class="mb-6 text-center">
      <h1 class="text-2xl font-bold">Signup</h1>
      <p class="text-gray-500">Enter your details below to create your account</p>
    </div>

    <Form route="new_account.store" #default="{ processing, errors }">
      <div class="grid grid-cols-1 gap-4">
        <UFormField 
          label="First name" 
          for="firstName" 
          name="firstName"
          :error="errors.firstName ? errors.firstName : undefined"
        >
          <UInput
            type="text"
            name="firstName"
            id="firstName"
            :data-invalid="errors.firstName ? 'true' : undefined"
          />
        </UFormField>
  
        <UFormField 
          label="Last name" 
          for="lastName" 
          name="lastName" 
          :error="errors.lastName ? errors.lastName : undefined"
        >
          <UInput
            type="text"
            name="lastName"
            id="lastName"
            :data-invalid="errors.lastName ? 'true' : undefined"
          />
        </UFormField>
  
        <UFormField 
          label="Email" 
          for="email" 
          name="email" 
          :error="errors.email ? errors.email : undefined"
        >
          <UInput
            type="email"
            name="email"
            id="email"
            autocomplete="email"
            :data-invalid="errors.email ? 'true' : undefined"
          />
        </UFormField>
  
        <UFormField 
          label="Password" 
          for="password" 
          name="password" 
          :error="errors.password ? errors.password : undefined"
        >
          <UInput
            type="password"
            name="password"
            id="password"
            autocomplete="new-password"
            :data-invalid="errors.password ? 'true' : undefined"
          />
        </UFormField>
  
        <UFormField 
          label="Confirm password" 
          for="passwordConfirmation" 
          name="passwordConfirmation" 
          :error="errors.passwordConfirmation ? errors.passwordConfirmation : undefined"
        >
          <UInput
            type="password"
            name="passwordConfirmation"
            id="passwordConfirmation"
            autocomplete="new-password"
            :data-invalid="errors.passwordConfirmation ? 'true' : undefined"
          />
        </UFormField>
  
        <UButton 
          type="submit"
          :disabled="processing"
          color="primary"
          label="Sign up"
        />
      </div>
    </Form>
  </div>
</template>
