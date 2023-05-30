<template>
  <q-page padding>
    <div class="q-pa-md shadow-1 rounded-borders" style="max-width: 400px; margin: 0 auto;">
      <h2 class="text-h4 text-center">Entrar</h2>
      <q-form @submit.prevent="onSubmit" class="q-gutter-md">
        <q-input outlined v-model="username" label="Digite seu e-mail *" type="email" lazy-rules :rules="[
          val => val !== null && val !== '' || 'Por favor digite seu e-mail',
        ]" />
        <q-input outlined v-model="password" type="password" label="Digite sua senha *" lazy-rules :rules="[
          val => val !== null && val !== '' || 'Por favor digite sua senha',
        ]" />

        <div class="q-gutter-md flex flex-center">
          <q-btn :to="{ name: 'register' }" label="Registrar-se" />
          <q-btn label="Entrar" type="submit" color="primary" />
        </div>
      </q-form>
    </div>
  </q-page>
</template>

<script setup>
import { ref } from 'vue';
import { useUserApi } from '../services/user'
import { useRouter } from 'vue-router';
import { useQuasar } from 'quasar';

const { authUser } = useUserApi()
const $q = useQuasar()
const router = useRouter()
const username = ref(null)
const password = ref(null)

async function onSubmit() {
  try {
    await authUser({
      username: username.value,
      password: password.value,
    })
    $q.notify({
      message: 'Bem-vindo',
      color: 'positive',
      icon: 'check'
    })
    router.push('/')
  } catch (error) {
    $q.notify({
      message: 'Credenciais inválidas',
      color: 'red',
    })
  }
}
</script>
