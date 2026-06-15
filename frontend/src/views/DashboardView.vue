<template>
  <div class="d-md-flex">

    <Sidebar />

    <div class="flex-grow-1 p-3 p-md-4">

        <div class="container">
            <!-- Welcome Section -->
            <div class="glass-card p-4 mb-4 text-white">
                <h2 class="fw-bold">Welcome 
                    {{ userStore.userName }} 💜</h2>
                <p class="mb-0">
                Track your spending, grow your savings, and plan your future.
                </p>
            </div>

            <!-- Total Balance -->
        <div class="glass-card p-4 mb-4 text-white">
            <div class="d-flex justify-content-between align-items-center">

                <div>
                <small class="text-light">Total Balance</small>

                <h1 class="fw-bold mt-2 mb-1">
                    ₹ {{ totalBalance }}
                </h1>

                <small class="text-light">
                    Last Updated Today
                </small>
                </div>

                <div style="font-size: 3rem;">
                💰
                </div>

            </div>
        </div>

            <SummaryCards
                :totalSpent="totalSpent"
                :totalReceived="totalReceived"
                :totalSavings="totalSavings"
                :totalFutureSpend="totalFutureSpend"
            />

            <TransactionChart
                :totalSpent="totalSpent"
                :totalReceived="totalReceived"
                :totalSavings="totalSavings"
                :totalFutureSpend="totalFutureSpend"
            />

            <div v-if="transactions.length">
                <div
                    v-for="transaction in transactions.slice(0, 3)"
                    :key="transaction._id"
                    class="glass-card p-3 mb-3"
                >
                    <h6>{{ transaction.title }}</h6>

                    <small>{{ transaction.type }}</small>

                    <div class="fw-bold mt-2">
                    ₹{{ transaction.amount }}
                    </div>
                </div>

            </div>

            <div
                v-else
                class="text-center py-4"
                >
                <h5>No Transactions Yet 💜</h5>

                <p class="mb-0">
                    Start adding your first transaction.
                </p>
            </div>
        </div>
    </div>

  </div>
</template>


<script setup>
import { ref, computed, onMounted } from 'vue'
import api from '@/services/api'
import Sidebar from '@/components/Sidebar.vue';
import SummaryCards from '@/components/SummaryCards.vue';
import { useUserStore } from '@/stores/userStore'
import { useFinanceStore } from '@/stores/financeStore'
import TransactionChart from '@/components/TransactionChart.vue';

const userStore = useUserStore()

const transactions = ref([])

onMounted(() => {
  fetchTransactions()
})

const totalBalance = computed(() => {
  let total = 0

  transactions.value.forEach(transaction => {
    if (
      transaction.type === 'Receive' ||
      transaction.type === 'Savings'
    ) {
      total += transaction.amount
    }

    if (
      transaction.type === 'Spend' ||
      transaction.type === 'Future Spend'
    ) {
      total -= transaction.amount
    }
  })

  return total
})

const fetchTransactions = async () => {
  try {
    const token = localStorage.getItem('token')

    const response = await api.get(
      '/transactions',
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )

    transactions.value = response.data
  } catch (error) {
    console.error(error)
  }
}


const totalSpent = computed(() => {
  return transactions.value
    .filter(t => t.type === 'Spend')
    .reduce((sum, t) => sum + t.amount, 0)
})

const totalReceived = computed(() => {
  return transactions.value
    .filter(t => t.type === 'Receive')
    .reduce((sum, t) => sum + t.amount, 0)
})

const totalSavings = computed(() => {
  return transactions.value
    .filter(t => t.type === 'Savings')
    .reduce((sum, t) => sum + t.amount, 0)
})

const totalFutureSpend = computed(() => {
  return transactions.value
    .filter(t => t.type === 'Future Spend')
    .reduce((sum, t) => sum + t.amount, 0)
})
</script>