<template>
  <q-page padding>
    <h1 class="text-h4 flex flex-center">{{ title }}</h1>

    <q-form @submit.prevent="onSubmit" class="row q-col-gutter-sm">
      <q-input outlined v-model="form.description" class="col-lg-6 col-xs-8" label="Descrição *" lazy-rules :rules="[
        val => val && val.length > 0 || 'Campo obrigatório',
        val => val.length < 191 || 'O campo deve possuir menos que 191 caracteres']" />

      <q-input outlined v-model="form.cost" type="number" label="Valor *" lazy-rules :rules="[
        val => val && val.length > 0 || 'Campo obrigatório']" />

      <div class="col-12 q-gutter-sm flex flex-center">
        <q-btn label="Cancelar" :to="{ name: 'home' }" color="white" text-color="primary" />
        <q-btn label="Salvar" type="submit" color="primary" icon="save" />
      </div>
    </q-form>
  </q-page>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import { useQuasar } from 'quasar';
import { useRoute, useRouter } from 'vue-router';
import { useExpenseApi } from '../services/expenses'

const { findExpense, updateExpense, addExpense } = useExpenseApi()
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
      await updateExpense(form.value.id, form.value)
      $q.notify({
        message: 'Despesa alterada com sucesso',
        icon: 'check',
        color: 'positive'
      })
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
    $q.notify({
      message: 'Erro ao cadastrar despesa',
      color: 'red'
    })
  }
}
</script>
