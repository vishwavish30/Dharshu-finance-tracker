<template>
  <div class="d-md-flex">

    <Sidebar />

    <div class="flex-grow-1 p-4">

      <div
        class="glass-card p-4 text-white"
        style="max-width:600px"
      >
        <h2 class="fw-bold mb-4">
          👤 Profile
        </h2>

        <p>
          <strong>Name:</strong>
          {{ user.name }}
        </p>

        <p>
          <strong>Email:</strong>
          {{ user.email }}
        </p>
        

        <!-- <p>
            <strong>Hobby:</strong>
            Loving vishwa😍😋
        </p>
        <p>
            <strong>Strength:</strong>
            vishwa🖤
        </p>
        <p>
            <strong>Weakeness:</strong>
            Food😋
        </p> -->
      </div>

    </div>

  </div>
</template>

<script setup>
import Sidebar from '@/components/Sidebar.vue'

const user = JSON.parse(
  localStorage.getItem('user')
)
</script>