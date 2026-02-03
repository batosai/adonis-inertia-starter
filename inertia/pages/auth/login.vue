<script setup lang="ts">
import { Form } from '@adonisjs/inertia/vue'
</script>

<template>
  <div class="flex flex-col items-center justify-center h-screen">
    <div class="mb-6 text-center">
      <h1 class="text-2xl font-bold">Login</h1>
      <p class="text-gray-500">Enter your details below to login to your account</p>
    </div>

    <Form route="session.store" #default="{ processing, errors }">
      <div class="grid grid-cols-1 gap-4">
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
            autocomplete="username"
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
            autocomplete="current-password"
            :data-invalid="errors.password ? 'true' : undefined"
          />
        </UFormField>
  
        <UButton 
          type="submit" 
          :disabled="processing" 
          color="primary"
          label="Login"
        />
      </div>
    </Form>
  </div>
</template>
