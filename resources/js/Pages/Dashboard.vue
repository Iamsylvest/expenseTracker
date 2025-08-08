<script setup>
import { ref } from 'vue';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout.vue';
import { Head } from '@inertiajs/vue3';
import TransactionButton from '@/Components/TransactionButton.vue';
import TransactionForm from '@/Components/TransactionForm.vue';

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
        <h2 class="text-xl font-semibold leading-tight text-gray-800">
          Dashboard
        </h2>
        <TransactionButton @toggle-form="toggleFormVisibility" />
        <TransactionForm v-if="showForm" @close="toggleFormVisibility" />
      </div>
    </template>

    <div class="py-12">
      <div class="mx-auto max-w-7xl sm:px-6 lg:px-8">
        <div class="overflow-hidden bg-white shadow-sm sm:rounded-lg"></div>
      </div>
    </div>
  </AuthenticatedLayout>
</template>
