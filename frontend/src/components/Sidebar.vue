<template>
  <div>
    <!-- Mobile Navbar -->
    <nav class="navbar navbar-dark d-md-none">
      <div class="container-fluid">
        <button
          class="btn btn-light"
          type="button"
          data-bs-toggle="offcanvas"
          data-bs-target="#mobileSidebar"
        >
          ☰
        </button>

        <span class="navbar-brand mb-0 h1">
          💙🖤Shulli-Malli Tracker
        </span>
      </div>
    </nav>

    <!-- Desktop Sidebar -->
    <div class="sidebar d-none d-md-flex flex-column p-3">
      <h4 class="text-white fw-bold mb-4">
        💙🖤Shulli-Malli Tracker
      </h4>

      <RouterLink
        to="/profile"
        class="menu-link mb-2"
      >
        👤 Profile
      </RouterLink>

      <RouterLink
        to="/dashboard"
        class="menu-link mb-2"

      >
        📊 Dashboard
      </RouterLink>

      <RouterLink
        to="/add-transaction"
        class="menu-link mb-2"

      >
        ➕ Add Transaction
      </RouterLink>

      <RouterLink
        to="/transactions"
        class="menu-link"

      >
        📄 Transactions
      </RouterLink>

      <div class="mt-auto">
        <button
          class="menu-button"
          @click="logout"
        >
          🚪 Logout
        </button>
      </div>
    </div>

    <!-- Mobile Offcanvas -->
    <div
      class="offcanvas offcanvas-start"
      tabindex="-1"
      id="mobileSidebar"
    >
      <div class="offcanvas-header">
        <h5>💙🖤Shulli-Malli Tracker</h5>

        <button
          type="button"
          class="btn-close"
          data-bs-dismiss="offcanvas"
        ></button>
      </div>

      <div class="offcanvas-body d-flex flex-column">

        <RouterLink
          to="/profile"
          class="menu-link-mobile mb-3"
        >
          👤 Profile
        </RouterLink>

        <RouterLink
          to="/dashboard"
          class="menu-link-mobile mb-3"
        >
          📊 Dashboard
        </RouterLink>

        <RouterLink
          to="/add-transaction"
          class="menu-link-mobile mb-3"
        >
          ➕ Add Transaction
        </RouterLink>

        <RouterLink
          to="/transactions"
          class="menu-link-mobile"
        >
          📄 Transactions
        </RouterLink>

        <div class="mt-auto">
          <button
            class="menu-button"
            @click="logout"
          >
            🚪 Logout
          </button>
        </div>

      </div>
    </div>
</div>
</template>

<script setup>
import { useRouter } from 'vue-router'

const router = useRouter()

router.afterEach(() => {
  document.body.style.overflow = 'auto'
  document.body.style.paddingRight = '0px'
})

const logout = () => {
  localStorage.removeItem('token')
  localStorage.removeItem('user')

  router.push('/')
}
</script>

<style scoped>
.sidebar {
  width: 260px;
  min-height: 100vh;
  display: flex;
  flex-direction: column;

  background: rgba(255,255,255,0.1);
  backdrop-filter: blur(15px);
}

.menu-link {
  color: white;
  text-decoration: none;
  padding: 12px 16px;
  border-radius: 12px;
  display: block;
  transition: all 0.3s ease;
}

.menu-link:hover {
  background: rgba(255, 255, 255, 0.15);
  transform: translateX(5px);
}

.router-link-active {
  background: rgba(255, 255, 255, 0.25);
  font-weight: 600;
}

/* Mobile Offcanvas */
.offcanvas {
  background: rgba(106, 17, 203, 0.9);
  backdrop-filter: blur(20px);
  border-right: 1px solid rgba(255, 255, 255, 0.2);
  box-shadow: 0 0 30px rgba(0, 0, 0, 0.2);
}

.offcanvas-header {
  border-bottom: 1px solid rgba(255, 255, 255, 0.15);
}

.offcanvas h5 {
  color: white;
  font-weight: 600;
}

.menu-link-mobile {
  display: block;
  color: white;
  text-decoration: none;
  padding: 12px 16px;
  border-radius: 12px;
  transition: all 0.3s ease;
}

.menu-link-mobile:hover {
  background: rgba(255, 255, 255, 0.15);
  transform: translateX(8px);
}

.menu-link-mobile.router-link-active {
  background: rgba(255, 255, 255, 0.25);
  font-weight: 600;
}

.navbar {
  background: transparent;
  padding: 10px;
}

.btn-close {
  filter: invert(1);
}

.menu-button {
  width: 100%;
  border: none;
  background: transparent;
  color: white;
  text-align: left;
  padding: 12px 16px;
  border-radius: 12px;
  transition: all 0.3s ease;
}

.menu-button:hover {
  background: rgba(0, 0, 0, 0.763);
  transform: translateX(5px);
}

.menu-button:focus {
  outline: none;
}
</style>