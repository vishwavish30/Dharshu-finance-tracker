<template>
  <div class="d-md-flex">

    <Sidebar />

    <div class="flex-grow-1 p-4">

      <div class="mx-auto" style="max-width: 900px;">

        <h2 class="text-white fw-bold mb-4">
          Transactions 💜
        </h2>

      <div class="mb-4">
        <input
          v-model="search"
          type="text"
          class="form-control"
          placeholder="🔍 Search transactions..."
        />
      </div>

      <div class="mb-4">
        <select
          v-model="filterType"
          class="form-select"
        >
          <option>All</option>
          <option>Spend</option>
          <option>Receive</option>
          <option>Savings</option>
          <option>Future Spend</option>
        </select>
      </div>

        <div
          v-if="filteredTransactions.length"
        >

        <div
            v-for="transaction in filteredTransactions.slice().reverse()"
            :key="transaction._id"
            class="glass-card p-4 text-white mb-3"
          >
            <div class="d-flex justify-content-between align-items-start">

              <div>

                <template v-if="editingId === transaction._id">

                  <input
                    v-model="editTitle"
                    class="form-control mb-2"
                    placeholder="Title"
                  />

                  <input
                    v-model.number="editAmount"
                    type="number"
                    class="form-control mb-2"
                    placeholder="Amount"
                  />

                  <textarea
                    v-model="editNotes"
                    class="form-control mb-2"
                    rows="2"
                    placeholder="Notes"
                  ></textarea>

                  <select
                    v-model="editType"
                    class="form-select"
                  >
                    <option>Spend</option>
                    <option>Receive</option>
                    <option>Savings</option>
                    <option>Future Spend</option>
                  </select>

                </template>

                <template v-else>

                  <h5>{{ transaction.title }}</h5>

                  <p
                    class="mb-1 fw-bold"
                    :class="{
                      'text-danger': transaction.type === 'Spend',
                      'text-success': transaction.type === 'Receive',
                      'text-info': transaction.type === 'Future Spend'
                    }"
                    :style="transaction.type === 'Savings'
                      ? 'color:#c084fc'
                      : ''"
                  >
                    {{ transaction.type }}
                  </p>

                  <small>
                    {{ transaction.notes }}
                  </small>

                  <small class="d-block mt-2 text-light">
                    📅 {{ transaction.date }}
                  </small>

                </template>

              </div>

              <div class="text-end">

                <template v-if="editingId !== transaction._id">
                  <h5>
                    ₹{{ transaction.amount }}
                  </h5>
                </template>

                <template v-if="editingId === transaction._id">

                  <button
                    class="btn btn-success btn-sm mt-2 me-2"
                    @click="saveEdit(transaction)"
                  >
                    Save
                  </button>

                  <button
                    class="btn btn-secondary btn-sm mt-2"
                    @click="editingId = null"
                  >
                    Cancel
                  </button>

                </template>

                <template v-else>

                  <button
                    class="btn btn-warning btn-sm mt-2 me-2"
                    @click="startEdit(transaction)"
                  >
                    Edit
                  </button>

                  <button
                    class="btn btn-danger btn-sm mt-2"
                    @click="openDeleteModal(transaction._id)"
                  >
                    Delete
                  </button>

                </template>
              </div>

            </div>
          </div>
        </div>
        
        <div
          v-else
          class="glass-card p-5 text-center text-white"
        >
          <h4>No Transactions Found 💜</h4>

          <p class="mb-0">
            Add your first transaction.
          </p>
        </div>

      </div>

    </div>

  </div>


    <div
      v-if="showDeleteModal"
      class="modal-overlay"
    >
      <div class="glass-card p-4 text-center text-white">

        <h4>Delete Transaction?</h4>

        <p>
          This action cannot be undone.
        </p>

        <button
          class="btn btn-secondary me-2"
          @click="showDeleteModal = false"
        >
          Cancel
        </button>

        <button
          class="btn btn-danger"
          @click="confirmDelete"
        >
          Delete
        </button>

      </div>
    </div>
</template>


<script setup>
import { ref, computed, onMounted } from 'vue'
import Sidebar from '@/components/Sidebar.vue'
import api from '@/services/api'
import { useToast } from 'vue-toastification'

const toast = useToast()

const search = ref('')

const filterType = ref('All')

const transactions = ref([])

const editingId = ref(null)
const editTitle = ref('')
const editAmount = ref(0)
const editNotes = ref('')
const editType = ref('')

const startEdit = (transaction) => {
  editingId.value = transaction._id

  editTitle.value = transaction.title
  editAmount.value = transaction.amount
  editNotes.value = transaction.notes
  editType.value = transaction.type
}

const showDeleteModal = ref(false)
const transactionToDelete = ref(null)

const openDeleteModal = (id) => {
  transactionToDelete.value = id
  showDeleteModal.value = true
}

const confirmDelete = async () => {
  await deleteTransaction(
    transactionToDelete.value
  )

  showDeleteModal.value = false

  toast.success(
    'Transaction Deleted Successfully 🗑️'
  )
}

const filteredTransactions = computed(() => {
  return transactions.value.filter(transaction => {
    const matchesSearch =
      transaction.title
        .toLowerCase()
        .includes(search.value.toLowerCase())

    const matchesFilter =
      filterType.value === 'All' ||
      transaction.type === filterType.value

    return matchesSearch && matchesFilter
  })
})

onMounted(() => {
  fetchTransactions()
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

const deleteTransaction = async (id) => {
  const confirmed = confirm(
    'Are you sure you want to delete this transaction?'
  )

  if (!confirmed) return

  try {
    const token = localStorage.getItem('token')

    await api.delete(`/transactions/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })

    await  fetchTransactions()
  } catch (error) {
    console.error(error)
  }
}

const saveEdit = async (transaction) => {
  try {
    const token = localStorage.getItem('token')

    await api.put(
      `/transactions/${transaction._id}`,
      {
        title: editTitle.value,
        amount: editAmount.value,
        notes: editNotes.value,
        type: editType.value,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )

    editingId.value = null

    await fetchTransactions()

    toast.success('Transaction Updated Successfully ✨')

  } catch (error) {
    toast.error('Failed to Update Transaction ❌')
    console.error(error)
  }
}
</script>

<style>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;

  width: 100%;
  height: 100%;

  background: rgba(0, 0, 0, 0.5);

  display: flex;
  justify-content: center;
  align-items: center;

  z-index: 9999;
}
</style>