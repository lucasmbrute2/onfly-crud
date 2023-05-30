<template>
  <q-page padding="">
    <h1 class="text-h4 flex flex-center">{{ title }}</h1>

    <q-form @submit.prevent="onSubmit" class="row q-col-gutter-sm">
      <q-input outlined v-model="form.description" class="col-lg-6 col-xs-8" label="Descrição *" lazy-rules :rules="[
        val => val && val.length > 0 || 'Campo obrigatório',
        val => val.length < 191 || 'O campo deve possuir menos que 191 caracteres']" />

      <q-input outlined v-model="form.cost" type="number" label="Valor *" lazy-rules :rules="[
        val => val && val.length > 0 || 'Campo obrigatório']" />

      <div class="col-12 q-gutter-sm">
        <q-btn label="Salvar" type="submit" color="primary" class="float-right" icon="save" />
        <q-btn label="Cancelar" :to="{ name: 'home' }" color="white" class="float-right" text-color="primary" />
      </div>
    </q-form>
  </q-page>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import { addExpense } from '../services/add-expense-service'
import { useQuasar } from 'quasar';
import { useRoute, useRouter } from 'vue-router';
import { findExpense, updateExpense } from '../services'

const route = useRoute()
const router = useRouter()
const $q = useQuasar()
const title = ref('Cadastrar despesa')


const form = ref({
  description: '',
  cost: 0
})

onMounted(async () => {
  if (route.params.expenseId) {
    const { expenses } = await findExpense(route.params.expenseId)
    form.value = expenses
    title.value = 'Editar despesa'
  }
})


async function onSubmit() {
  try {
    if (form.value.id) {
      console.log(form.value.id)
      await updateExpense(form.value.id, form.value)
    } else {
      await addExpense(form.value)
      $q.notify({
        message: 'Despesa cadastrada com sucesso',
        icon: 'check',
        color: 'positive'
      })
    }

    router.push({
      name: 'home'
    })
  } catch (error) {
    console.error()
  }
}
</script>
