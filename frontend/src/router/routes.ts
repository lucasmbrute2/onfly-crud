import { RouteRecordRaw  } from 'vue-router';


const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', name: 'home', component: () => import('pages/IndexPage.vue') },
      { path: '/login', name: 'login', component: () => import('src/pages/LoginPage.vue')},
      { path: '/register', name: 'register', component: () => import('pages/RegisterPage.vue')},
      { path: '/form-expense/:expenseId?', name: 'expenseForm', component: () => import('src/pages/ExpenseForm.vue')},
      { path: '/logout', name: 'logout', component: () => import('pages/ExitPage.vue')}
    ]
  },
  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue'),
  },
];


export default routes;
