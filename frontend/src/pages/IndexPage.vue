<template>
  <button @click="router.push('/login')">
    Login
  </button>
  <button @click="router.push('/register')">
    Register
  </button>

  <div class="flex">
  <q-card class="my-card" flat bordered v-for="item in expenses" v-bind="item" :key="item.id">
      <q-card-section horizontal>
        <q-card-section class="q-pt-xs">
          <div class="text-h5 q-mt-sm q-mb-xs">Title</div>
          <div class="text-caption text-grey">
           {{ item.description  }}
          </div>
        </q-card-section>
      </q-card-section>
      <q-separator />

      <q-card-actions>
        <q-btn flat round icon="event" />
        <q-btn flat>
          {{ item.createdAt }}
        </q-btn>
        <q-btn flat color="primary">
          Editar
        </q-btn>
      </q-card-actions>
    </q-card>
  </div>
</template>

<script setup lang="ts">
import { dateToAmerican } from 'src/helpers/formatt-date';
import { fetchExpenses } from 'src/services/fetch-all-expenses-service';
import { onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter()
const expenses = ref()

onMounted(async()=> {
  const response = await fetchExpenses()
  expenses.value  = response?.map(expense => {
    if (expense) {
      expense.createdAt = dateToAmerican(new Date(expense.createdAt))
      return expense
    }
  })

})
</script>

<style lang="sass" scoped>
.my-card
  width: 100%
  max-width: 350px
  margin: 1rem auto
</style>
