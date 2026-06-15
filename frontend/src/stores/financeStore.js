import { defineStore } from 'pinia'

export const useFinanceStore = defineStore('finance', {
  state: () => ({
  transactions: JSON.parse(
    localStorage.getItem('transactions')
    ) || [],
  }),

  actions: {
    addTransaction(transaction) {
    this.transactions.push(transaction)

    localStorage.setItem(
      'transactions',
      JSON.stringify(this.transactions)
    )
  },

    deleteTransaction(id) {
      this.transactions = this.transactions.filter(
        transaction => transaction.id !== id
      )

      localStorage.setItem(
        'transactions',
        JSON.stringify(this.transactions)
      )
    },
  },

  getters: {
    totalSpent: state =>
      state.transactions
        .filter(transaction => transaction.type === 'Spend')
        .reduce((total, transaction) => total + transaction.amount, 0),

    totalReceived: state =>
      state.transactions
        .filter(transaction => transaction.type === 'Receive')
        .reduce((total, transaction) => total + transaction.amount, 0),

    totalSavings: state =>
      state.transactions
        .filter(transaction => transaction.type === 'Savings')
        .reduce((total, transaction) => total + transaction.amount, 0),

    totalFutureSpend: state =>
      state.transactions
        .filter(transaction => transaction.type === 'Future Spend')
        .reduce((total, transaction) => total + transaction.amount, 0),

    totalBalance() {
      return (
        this.totalReceived -
        this.totalSpent -
        this.totalFutureSpend +
        this.totalSavings
      )
    },
  },
})