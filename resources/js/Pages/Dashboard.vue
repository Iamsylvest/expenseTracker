<script setup>
      import { ref } from 'vue';
      import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout.vue';
      import { Head } from '@inertiajs/vue3';
      import TransactionButton from '@/Components/TransactionButton.vue';
      import TransactionForm from '@/Components/TransactionForm.vue';
      import ExpensesSummary from '@/Components/ExpensesSummary.vue';
      import ExpensesTransactionTable from '@/Components/ExpensesTransactionTable.vue';
      const showForm = ref(false);

      const toggleFormVisibility = () => {
            showForm.value = !showForm.value;
      };
</script>

<template>
      <Head title="Dashboard" />

      <AuthenticatedLayout>
            <template #header>
                  <div class="flex justify-between">
                        <h2
                              class="text-xl font-semibold leading-tight text-gray-800"
                        >
                              Dashboard
                        </h2>
                        <TransactionButton
                              @toggle-form="toggleFormVisibility"
                        />
                        <TransactionForm
                              v-if="showForm"
                              @close="toggleFormVisibility"
                        />
                  </div>
            </template>

            <div class="py-12">
                  <div
                        class="block mx-auto space-y-12 max-w-9xl sm:px-6 lg:px-8"
                  >
                        <div
                              class="overflow-hidden bg-white shadow-sm sm:rounded-lg"
                        >
                              <ExpensesSummary />
                        </div>
                        <div
                              class="p-12 overflow-hidden bg-white shadow-sm sm:rounded-lg"
                        >
                              <ExpensesTransactionTable />
                        </div>
                  </div>
            </div>
      </AuthenticatedLayout>
</template>
