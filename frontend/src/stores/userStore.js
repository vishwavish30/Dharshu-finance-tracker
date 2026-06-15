import { defineStore } from 'pinia'

export const useUserStore = defineStore('user', {
  state: () => ({
    userName: 'Dharshu',
    email: '',
    isLoggedIn: false,
  }),

  actions: {
    login(email) {
      this.email = email
      this.isLoggedIn = true
    },

    logout() {
      this.email = ''
      this.isLoggedIn = false
    },
  },
})