<template>
  <div class="glass-card p-4 text-white">
    <h4 class="mb-4">Add Transaction</h4>

    <form @submit.prevent="addTransaction">

      <div class="mb-3">
        <label class="form-label">Type</label>

        <select
          v-model="type"
          class="form-select"
        >
          <option>Spend</option>
          <option>Receive</option>
          <option>Savings</option>
          <option>Future Spend</option>
        </select>
      </div>

      <div class="mb-3">
        <label class="form-label">Title</label>

        <input
          v-model="title"
          type="text"
          class="form-control"
          placeholder="Enter title"
        />
      </div>

      <div class="mb-3">
        <label class="form-label">Notes</label>

        <textarea
          v-model="notes"
          rows="3"
          class="form-control"
          placeholder="Add notes..."
        ></textarea>
      </div>

      <div class="mb-4">
        <label class="form-label">Amount</label>

        <input
          v-model.number="amount"
          type="number"
          class="form-control"
          placeholder="Enter amount"
        />
      </div>

      <button
        type="submit"
        class="btn btn-light w-100 fw-bold"
      >
        Add Transaction
      </button>

    </form>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useFinanceStore } from '@/stores/financeStore'
import { useToast } from 'vue-toastification'

import api from '@/services/api'

const financeStore = useFinanceStore()

const type = ref('Spend')
const title = ref('')
const notes = ref('')
const amount = ref(null)

const toast = useToast()

const addTransaction = async() => {
  if (!title.value || !amount.value) {
    alert('Please fill all required fields')
    return
  }

  try {
    const token = localStorage.getItem('token')

    await api.post(
      '/transactions',
      {
        type: type.value,
        title: title.value,
        notes: notes.value,
        amount: amount.value,
        date: new Date().toLocaleDateString('en-IN'),
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )

    title.value = ''
    notes.value = ''
    amount.value = null
    type.value = 'Spend'

    toast.success('Transaction Added Successfully 🎉')
  } catch (error) {
    toast.error(
      error.response?.data?.message ||
      'Failed to add transaction'
    )
  }
}
</script>

<style scoped>
.form-control,
.form-select {
  border-radius: 12px;
}

.btn {
  border-radius: 12px;
}
</style>