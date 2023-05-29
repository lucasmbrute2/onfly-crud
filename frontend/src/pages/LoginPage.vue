<template>
  <div class="q-pa-md" style="max-width: 400px">
    <button @click="router.push('/')">
      Voltar
    </button>

    <q-form
      @submit.prevent="onSubmit"
      class="q-gutter-md"
    >
      <q-input
        filled
        v-model="username"
        label="Your username *"
        type="email"
        lazy-rules
        :rules="[
          val => val !== null && val !== '' || 'Please type your username',
        ]"
      />
      <q-input
        filled
        v-model="password"
        type="password"
        label="Your password *"
        lazy-rules
        :rules="[
          val => val !== null && val !== '' || 'Please type your username',
        ]"
      />

      <div>
        <q-btn label="Submit" type="submit" color="primary"/>
      </div>
    </q-form>

  </div>
</template>

<script setup>
import { ref } from 'vue';
import { authUserService } from '../services/auth-user-service'
import { useRouter } from 'vue-router';
const router = useRouter()


  const username = ref(null)
  const password = ref(null)

  async function onSubmit () {
    await authUserService({
      username: username.value,
      password: password.value,
    })
    router.push('/')
  }
</script>
