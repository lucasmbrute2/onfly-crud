<template>
  <q-page padding="">
    <div class="q-pa-md shadow-1">
      <h1 class="text-h4 text-center">Registrar</h1>
      <q-form @submit.prevent="onSubmit" class="q-gutter-md">
        <q-input outlined="" v-model="name" label="Seu nome*" lazy-rules :rules="[
          val => val !== null && val !== '' || 'Por favor digite seu nome',
        ]" />
        <q-input outlined="" v-model="username" label="Seu email *" lazy-rules :rules="[
          val => val !== null && val !== '' || 'Por favor digite seu email',
        ]" />
        <q-input outlined="" v-model="password" type="password" label="Sua senha *" lazy-rules :rules="[
          val => val !== null && val !== '' || 'Por favor digite sua senha',
        ]" />
        <q-input outlined="" v-model="confirmPassword" type="password" label="Confirme sua senha*" lazy-rules :rules="[
          val => val !== null && val !== '' || 'Por favor confirme sua senha',
          val => val === password || 'Passwords doest not match',
        ]" />

        <div class="flex flex-center">
          <q-btn label="Enviar" type="submit" color="primary" />
        </div>
      </q-form>
    </div>
  </q-page>
</template>

<script setup>
import { ref } from 'vue'
import { addUserService } from '../services/add-user-service'
import { useRouter } from 'vue-router';
const router = useRouter()

const name = ref(null)
const username = ref(null)
const password = ref(null)
const confirmPassword = ref(null)


async function onSubmit() {
  await addUserService({
    name: name.value,
    username: username.value,
    password: password.value,
    confirmPassword: confirmPassword.value
  })
  router.push('/')
}

</script>
