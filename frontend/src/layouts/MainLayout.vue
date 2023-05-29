<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-toolbar-title @click="router.push('/')">
          Onfly Expenses
        </q-toolbar-title>

        <div>Quasar v{{ $q.version }}</div>
      </q-toolbar>
    </q-header>
    <q-page-container class="page-view">
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router';

const router = useRouter()

</script>

<style scoped>

.page-view {
  min-height: 100vh;
  background-color: #ffffffcc;
  color: #000;
}
</style>
