<template>
  <div class="q-pa-md">
    <q-table title="Gastos" :rows="rows" :columns="columns" row-key="name">
      <template v-slot:top>
        <h1 class="text-h5">
          Despesas
        </h1>
        <q-space />
        <q-btn color="primary" label="Novo" :to="{ name: 'expenseForm' }" />
      </template>

      <template v-slot:body-cell-actions="props">
        <q-td :props="props" class="q-gutter-sm">
          <q-btn icon="edit" color="info" dense size="sm" @click="handleEditExpense(props.row.id)" />
          <q-btn icon="delete" color="negative" dense size="sm" @click="handleDeleteExpense(props.row.id)" />
        </q-td>
      </template>
    </q-table>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';
import { useQuasar } from 'quasar'
import { Expense, useExpenseApi } from 'src/services/expenses';

const { getExpenses, deleteExpense } = useExpenseApi()
const $q = useQuasar()
const router = useRouter()
const columns = [
  { name: 'custo', align: 'left', label: 'Custo', field: 'cost', sortable: true },
  { name: 'description', align: 'left', label: 'Descrição', field: 'description', sortable: true },
  { name: 'createdAt', align: 'center', label: 'Data de criação', field: 'createdAt', sortable: true },
  { name: 'actions', align: 'right', label: 'Ações', field: 'actions' },
]
const rows = ref<Expense[]>([])


async function handleGetExpenses() {
  const response = await getExpenses()
  rows.value = response as Expense[]
}

onMounted(async () => {
  await handleGetExpenses()
})

async function handleDeleteExpense(expenseId: string) {
  $q.dialog({
    title: 'Remover',
    message: 'Tem certeza que deseja apagar a despesa ?',
    cancel: true,
    persistent: true
  }).onOk(async () => {
    await deleteExpense(expenseId)
    $q.notify({
      message: 'Deletado com sucesso',
      icon: 'check',
      color: 'positive'
    })
    await handleGetExpenses()
  })
}

async function handleEditExpense(expenseId: string) {
  router.push({
    name: 'expenseForm',
    params: { expenseId }
  })
}
</script>

<style lang="sass" scoped>
.my-card
  width: 100%
  max-width: 350px
  margin: 1rem auto
</style>
