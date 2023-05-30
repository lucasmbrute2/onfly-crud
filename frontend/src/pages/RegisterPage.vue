<template>
  <div class="q-pa-md" style="max-width: 400px">
    <button @click="router.push('/')">
      Voltar
    </button>
    <q-form @submit.prevent="onSubmit" class="q-gutter-md">
      <q-input filled v-model="username" label="Your username *" lazy-rules :rules="[
        val => val !== null && val !== '' || 'Please type your username',
      ]" />
      <q-input filled v-model="name" label="Your name *" lazy-rules :rules="[
        val => val !== null && val !== '' || 'Please type your name',
      ]" />
      <q-input filled v-model="password" type="password" label="Your password *" lazy-rules :rules="[
        val => val !== null && val !== '' || 'Please type your password',
      ]" />
      <q-input filled v-model="confirmPassword" type="password" label="Your password *" lazy-rules :rules="[
        val => val !== null && val !== '' || 'Please type your confirm password',
        val => val === password || 'Passwords doest not match',
      ]" />

      <div>
        <q-btn label="Submit" type="submit" color="primary" />
      </div>
    </q-form>
  </div>
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
