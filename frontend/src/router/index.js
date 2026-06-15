import { createRouter, createWebHistory } from 'vue-router'

import LoginView from '@/views/LoginView.vue'
import DashboardView from '@/views/DashboardView.vue'
import AddTransactionView from '@/views/AddTransactionView.vue'
import TransactionsView from '@/views/TransactionsView.vue'
import ProfileView from '@/views/ProfileView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),

  routes: [
    {
      path: '/',
      name: 'login',
      component: LoginView,
    },
    {
      path: '/dashboard',
      name: 'dashboard',
      component: DashboardView,
    },
    {
      path: '/add-transaction',
      name: 'addTransaction',
      component: AddTransactionView,
    },
    {
      path: '/transactions',
      name: 'transactions',
      component: TransactionsView,
    },
    {
      path: '/profile',
      name: 'profile',
      component: ProfileView,
    },
  ],
})

router.beforeEach((to, from, next) => {
  const token = localStorage.getItem('token')

  const publicPages = ['/']

  if (!publicPages.includes(to.path) && !token) {
    return next('/')
  }

  next()
})


router.beforeEach((to, from, next) => {
  const token = localStorage.getItem('token')

  if (
    to.path !== '/' &&
    !token
  ) {
    return next('/')
  }

  next()
})

export default router