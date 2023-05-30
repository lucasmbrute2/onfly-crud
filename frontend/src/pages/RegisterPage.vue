<template>
  <q-page padding="">
    <div class="q-pa-md shadow-1" style="max-width: 500px; margin: 0 auto;">
      <h1 class="text-h4 q-pb-md text-center">Registrar</h1>
      <q-form @submit.prevent="onSubmit" class="q-gutter-md">
        <q-input outlined="" v-model="registerForm.name" label="Seu nome *" lazy-rules :rules="[
          val => val !== null && val !== '' || 'Por favor digite seu nome',
        ]" />
        <q-input outlined="" v-model="registerForm.username" label="Seu email *" lazy-rules :rules="[
          val => val !== null && val !== '' || 'Por favor digite seu email',
        ]" />
        <q-input outlined="" v-model="registerForm.password" type="password" label="Sua senha *" lazy-rules :rules="[
          val => val !== null && val !== '' || 'Por favor digite sua senha',
        ]" />
        <q-input outlined="" v-model="registerForm.confirmPassword" type="password" label="Confirme sua senha *"
          lazy-rules :rules="[
            val => val !== null && val !== '' || 'Por favor confirme sua senha',
            val => val !== password || 'As senhas precisam ser iguais',
          ]" />

        <div class="flex flex-center">
          <q-btn label="Enviar" size="md" type="submit" color="primary" />
        </div>
      </q-form>
    </div>
  </q-page>
</template>

<script setup>
import { reactive } from 'vue'
import { useUserApi } from '../services/user'
import { useRouter } from 'vue-router';
import { useQuasar } from 'quasar'

const { addUser, authUser } = useUserApi()
const $q = useQuasar()
const router = useRouter()
const registerForm = reactive({
  name: '',
  username: '',
  password: '',
  confirmPassword: ''
})

async function onSubmit() {
  try {
    const { confirmPassword, name, password, username } = registerForm
    await addUser({
      name,
      username,
      password,
      confirmPassword
    })
    await authUser({
      username,
      password
    })
    $q.notify({
      message: 'Bem-vindo',
      color: 'positive',
      icon: 'check'
    })
    router.push('/')
  } catch (error) {
    console.error(error)
    $q.notify({
      message: 'Credenciais inválidas, verifique se sua senha senha é maior que 6 caracteres e seu e-mail é válido',
      color: 'red',
    })
  }
}

</script>
