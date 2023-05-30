<template>
  <q-btn @click="router.push('/login')">
    Login
  </q-btn>
  <q-btn @click="router.push('/register')">
    Register
  </q-btn>

  <div class="q-pa-md">
    <q-table title="Gastos" :rows="rows" :columns="columns" row-key="name">
      <template v-slot:body-cell-actions="props">
        <q-td :props="props">
          <q-btn icon="delete" color="negative" dense size="sm" @click="handleDeleteExpense(props.row.id)" />
        </q-td>
      </template>
    </q-table>
  </div>
</template>

<script setup lang="ts">
import { fetchExpenses } from 'src/services/fetch-all-expenses-service';
import { onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';
import { deleteExpense } from '../services/delete-expense'
import { Expense } from '../services/fetch-all-expenses-service'
import { useQuasar } from 'quasar'

const router = useRouter()
const columns = [
  { name: 'custo', align: 'left', label: 'Custo', field: 'cost', sortable: true },
  { name: 'description', align: 'left', label: 'Descrição', field: 'description', sortable: true },
  { name: 'description', align: 'left', label: 'Descrição', field: 'description', sortable: true },
  { name: 'createdAt', align: 'center', label: 'Data de criação', field: 'createdAt', sortable: true },
  { name: 'actions', align: 'right', label: 'Ações', field: 'actions' },
]
const rows = ref<Expense[]>([])


const $q = useQuasar()

async function getExpenses() {
  const response = await fetchExpenses()
  rows.value = response as Expense[]
}

onMounted(async () => {
  await getExpenses()
})

async function handleDeleteExpense(expenseId: string) {
  $q.dialog({
    title: 'Confirmação',
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
    await getExpenses()
  })
}

</script>

<style lang="sass" scoped>
.my-card
  width: 100%
  max-width: 350px
  margin: 1rem auto
</style>
