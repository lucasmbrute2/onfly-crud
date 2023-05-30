<template>
  <q-page padding>
    <div class="q-pa-md shadow-1" style="max-width: 400px">
      <h2 class="text-h4 text-center">Entrar</h2>
      <q-form @submit.prevent="onSubmit" class="q-gutter-md">
        <q-input outlined v-model="username" label="Your username *" type="email" lazy-rules :rules="[
          val => val !== null && val !== '' || 'Please type your username',
        ]" />
        <q-input outlined v-model="password" type="password" label="Your password *" lazy-rules :rules="[
          val => val !== null && val !== '' || 'Please type your username',
        ]" />

        <div class="q-gutter-md flex flex-center">
          <q-btn label="Entrar" type="submit" color="primary" />
          <q-btn :to="{ name: 'register' }" label="Registrar-se" />
        </div>
      </q-form>
    </div>
  </q-page>
</template>

<script setup>
import { ref } from 'vue';
import { authUserService } from '../services/auth-user-service'
import { useRouter } from 'vue-router';
const router = useRouter()


const username = ref(null)
const password = ref(null)

async function onSubmit() {
  await authUserService({
    username: username.value,
    password: password.value,
  })
  router.push('/')
}
</script>
