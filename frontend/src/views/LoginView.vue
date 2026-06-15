<template>
  <div class="page-container d-flex align-items-center justify-content-center p-3">
    <div class="glass-card login-card p-4 p-md-5">

      <div class="text-center mb-4">
        <h1 class="fw-bold text-white">💜 Finance Tracker</h1>

        <p class="text-white mt-3">
          Track your spending,<br>
          grow your savings,<br>
          plan your future.
        </p>
      </div>

      <form>
        <div class="mb-3">
          <label class="form-label text-white">Email</label>
          <input
            v-model="email"
            type="email"
            class="form-control"
            placeholder="Enter email"
          />
        </div>

      <div class="mb-4">
        <label class="form-label text-white">Password</label>

        <div class="input-group">

          <input
            v-model="password"
            :type="showPassword ? 'text' : 'password'"
            class="form-control"
            placeholder="Enter password"
          />

          <button
            type="button"
            class="btn btn-light"
            @click="showPassword = !showPassword"
          >
            <i
              :class="
                showPassword
                  ? 'bi bi-eye-slash-fill'
                  : 'bi bi-eye-fill'
              "
            ></i>
          </button>

        </div>
      </div>

        <button
          type="button"
          class="btn btn-light w-100 fw-bold"
          @click="login"
        >
          Login
        </button>
      </form>

    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useUserStore } from '@/stores/userStore'
import api from '@/services/api'
import { useToast } from 'vue-toastification'

const toast = useToast()

const router = useRouter()
const userStore = useUserStore()

const email = ref('')
const password = ref('')
const showPassword = ref(false)

const login = async () => {
  try {
    const response = await api.post('/auth/login', {
      email: email.value,
      password: password.value,
    })

    localStorage.setItem(
      'token',
      response.data.token
    )

    localStorage.setItem(
      'user',
      JSON.stringify(response.data.user)
    )

    router.push('/dashboard')
    toast.success("Welcome Dharshu💙")
  } catch (error) {
    toast.error(
      error.response?.data?.message ||
      'Login failed'
    )
  }
}
</script>

<style scoped>
.login-card {
  width: 100%;
  max-width: 450px;
  transition: transform 0.3s ease;
  animation: fadeInUp 0.6s ease;
}

.login-card:hover {
  transform: translateY(-5px);
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }

  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.form-control {
  border-radius: 12px;
  padding: 12px;
}

.btn {
  border-radius: 12px;
  padding: 12px;
  transition: all 0.3s ease;
}

.btn:hover {
  transform: translateY(-2px);
}

.input-group .btn {
  border-top-right-radius: 12px;
  border-bottom-right-radius: 12px;
}

@media (max-width: 576px) {
  .login-card {
    padding: 1.5rem !important;
  }
}
</style>