<script setup>
import Sidebar from '@/components/Sidebar.vue'
import TransactionForm from '@/components/TransactionForm.vue'
</script>

<template>
  <div class="d-md-flex">

    <Sidebar />

    <div class="flex-grow-1 p-4">

      <div class="mx-auto" style="max-width: 700px;">

        <h2 class="text-white fw-bold mb-4">
          Add Transaction 💜
        </h2>

        <TransactionForm />

      </div>

    </div>

  </div>
</template>