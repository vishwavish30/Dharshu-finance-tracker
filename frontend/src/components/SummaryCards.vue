<template>
  <div class="row g-3 mb-4">

    <div class="col-12 col-md-6">
      <div class="card border-0 shadow-sm">
        <div class="card-body">
          <h5>Spent</h5>
          <h3 class="text-danger">₹{{ totalSpent }}</h3>
        </div>
      </div>
    </div>

    <div class="col-12 col-md-6">
      <div class="card border-0 shadow-sm">
        <div class="card-body">
          <h5>Received</h5>
          <h3 class="text-success">
            ₹{{ totalReceived }}</h3>
        </div>
      </div>
    </div>

    <div class="col-12 col-md-6">
      <div class="card border-0 shadow-sm">
        <div class="card-body">
          <h5>Savings</h5>
          <h3 style="color: #6f42c1">
            ₹{{ totalSavings }}</h3>
        </div>
      </div>
    </div>

    <div class="col-12 col-md-6">
      <div class="card border-0 shadow-sm">
        <div class="card-body">
          <h5>Future Spend</h5>
          <h3 class="text-info">
            ₹{{ totalFutureSpend }}</h3>
        </div>
      </div>
    </div>

  </div>
</template>

<script setup>
defineProps({
  totalSpent: Number,
  totalReceived: Number,
  totalSavings: Number,
  totalFutureSpend: Number,
})
</script>