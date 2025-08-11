<script setup>
      import { onMounted } from 'vue';
      import { useDetailsStore } from '@/stores/expensesDetailsStore.js';
      import { Bar, Pie, Line } from 'vue-chartjs';
      import {
            Chart as ChartJS,
            Title,
            Tooltip,
            Legend,
            BarElement,
            LineElement,
            PointElement,
            ArcElement,
            CategoryScale,
            LinearScale,
      } from 'chart.js';
      // Register all Chart.js modules you'll use
      ChartJS.register(
            Title,
            Tooltip,
            Legend,
            BarElement,
            LineElement,
            PointElement,
            ArcElement,
            CategoryScale,
            LinearScale
      );

      const expensesDetails = useDetailsStore();

      onMounted(() => {
            expensesDetails.fetchExpensesDetails();
      });

      const chartOptions = {
            responsive: true,
            maintainAspectRatio: false, // Allows Tailwind height/width to apply
            plugins: {
                  legend: { position: 'top' },
                  title: { display: true, text: 'Expenses Overview' },
            },
      };
</script>

<template>
      <div>
            <div class="flex items-center justify-center">
                  <h1 class="p-4 text-2xl font-semibold">Final Summary</h1>
            </div>
            <ul
                  class="grid p-4 px-12 font-medium text-center border-b-2 border-gray-200 lg:grid-cols-6"
            >
                  <li>
                        Title of Expenses:
                        {{ expensesDetails.expenses.title || 0 }}
                  </li>
                  <li>
                        Date:
                        {{
                              expensesDetails.expenses
                                    .date_of_transaction_calculation
                                    ? new Date(
                                            expensesDetails.expenses.date_of_transaction_calculation
                                      ).toLocaleDateString('en-US', {
                                            year: 'numeric',
                                            month: 'long',
                                            day: 'numeric',
                                      })
                                    : 'No date'
                        }}
                  </li>

                  <li>
                        Total Income:
                        {{
                              (
                                    expensesDetails.expenses.income || 0
                              ).toLocaleString()
                        }}
                  </li>
                  <li>
                        Total Expenses:
                        {{ expensesDetails.totalExpenses.toLocaleString() }}
                  </li>
                  <li>
                        Current Balance:
                        {{ expensesDetails.currentBalance.toLocaleString() }}
                  </li>
                  <li>
                        Top Spending Category:
                        {{ expensesDetails.topSpendingCategory }}
                  </li>
            </ul>
      </div>

      <div
            v-if="expensesDetails.expenses.products.length > 0"
            class="grid gap-6 p-4 overflow-x-auto lg:grid-cols-2 place-items-center"
      >
            <div class="lg:h-[400px] lg:w-[600px] h-[300px] w-[300px]">
                  <Bar
                        :data="expensesDetails.chartDataforQuantity"
                        :options="chartOptions"
                  />
            </div>
            <div class="lg:h-[400px] lg:w-[600px] h-[300px] w-[300px]">
                  <Pie
                        :data="expensesDetails.chartData"
                        :options="chartOptions"
                  />
            </div>
      </div>

      <div v-else class="py-10 text-lg font-medium text-center text-gray-500">
            Loading chart data...
      </div>
</template>
