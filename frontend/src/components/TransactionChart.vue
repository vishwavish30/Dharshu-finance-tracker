<template>
  <div class="glass-card p-3 mt-4 mb-4">
    <apexchart
      type="pie"
      height="400"
      :options="chartOptions"
      :series="series"
    />
  </div>
</template>

<script setup>
import { computed } from 'vue';


const props = defineProps({
    totalSpent: Number,
    totalReceived: Number,
    totalSavings: Number,
    totalFutureSpend: Number,
})

const series = computed(() =>  [
  props.totalSpent,
  props.totalReceived,
  props.totalSavings,
  props.totalFutureSpend,
])

const chartOptions = {
  labels: [
    'Spend',
    'Receive',
    'Savings',
    'Future Spend',
  ],

  legend: {
    position: 'bottom',
  },
}
</script>