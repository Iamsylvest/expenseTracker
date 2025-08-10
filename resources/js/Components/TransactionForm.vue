<script setup>
      import { ref, watch } from 'vue';
      import { useFormStore } from '@/stores/expensesForm';
      import { createInertiaApp, usePage } from '@inertiajs/vue3';
      import { Inertia } from '@inertiajs/inertia';
      import Swal from 'sweetalert2';
      import { useDetailsStore } from '@/stores/expensesDetailsStore';

      const expensesDetails = useDetailsStore();
      const form = useFormStore();
      const unitOptions = [
            'Piece',
            'Box',
            'Kilogram',
            'Liter',
            'Pack',
            'Dozen',
            'Set',
            'Meter',
            'Gram',
            'Can',
            'Bag',
      ];
      const categoryOptions = [
            'Food',
            'Beverages',
            'Electronics',
            'Office Supplies',
            ' Cleaning Supplies',
            'Furniturre',
            'Tools',
            'Clothing',
            'Accessories',
            'Hardware',
            'Software',
            'Raw Materials',
            'Packaging',
            'Maintenance',
            'Miscellaneous',
      ];

      // Emit the close event
      const emit = defineEmits(['close']);

      // Function to close the modal
      const closeModal = () => {
            emit('close');
      };

      const submitForm = () => {
            // Prepare payload
            const payload = {
                  title: form.title,
                  income: form.income,
                  date: form.date,
                  category: form.category,
                  products: form.products,
            };

            // Send POST request to backend
            Inertia.post('/expenses', payload, {
                  onSuccess: () => {
                        // Refresh expenses details after success
                        expensesDetails.fetchExpensesDetails();
                        emit('close');
                  },
                  onError: (errors) => {
                        // Handle validation errors here if needed
                        console.log(errors);
                  },
            });
      };
</script>

<template>
      <!-- Modal overlay -->
      <div
            class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
      >
            <!-- Modal content -->
            <div class="w-full p-6 bg-white rounded-lg shadow-md max-w-7xl">
                  <div class="flex items-center justify-between mb-4">
                        <h3 class="text-lg font-semibold">Your Expenses</h3>
                        <button
                              @click="closeModal"
                              class="text-xl text-gray-500 hover:text-red-500"
                        >
                              &times;
                        </button>
                  </div>
                  <form @submit.prevent="submitForm">
                        <div class="grid grid-cols-1 gap-2 sm:grid-cols-3">
                              <div class="mb-4">
                                    <label
                                          class="block mb-1 font-medium text-gray-700"
                                          >Title</label
                                    >
                                    <input
                                          v-model="form.title"
                                          type="text"
                                          placeholder="Enter name"
                                          class="w-full px-3 py-2 border rounded"
                                          required
                                    />
                              </div>

                              <div class="mb-4">
                                    <label
                                          class="block mb-1 font-medium text-gray-700"
                                          >Income</label
                                    >
                                    <input
                                          v-model="form.income"
                                          type="text"
                                          placeholder="Enter income"
                                          class="w-full px-3 py-2 border rounded"
                                          required
                                    />
                              </div>

                              <div class="mb-4">
                                    <label
                                          class="block mb-1 font-medium text-gray-700"
                                          >Date</label
                                    >
                                    <input
                                          v-model="form.date"
                                          type="date"
                                          placeholder="Enter date"
                                          class="w-full px-3 py-2 border rounded"
                                          required
                                    />
                              </div>
                        </div>

                        <!-- Products -->
                        <div
                              v-for="(product, index) in form.products"
                              :key="index"
                              class="grid grid-cols-2 gap-2 sm:grid-cols-6"
                        >
                              <div class="mb-4">
                                    <label
                                          class="block mb-1 font-medium text-gray-700"
                                          >Product name</label
                                    >
                                    <input
                                          v-model="product.product_name"
                                          type="text"
                                          placeholder="Enter product name"
                                          class="w-full px-3 py-2 border rounded"
                                          required
                                    />
                              </div>

                              <div class="mb-4">
                                    <label
                                          class="block mb-1 font-medium text-gray-700"
                                          >Unit</label
                                    >
                                    <select
                                          id="unit"
                                          v-model="product.unit"
                                          class="w-full p-2 border rounded"
                                    >
                                          <option disabled value="">
                                                Select unit
                                          </option>
                                          <option
                                                v-for="option in unitOptions"
                                                :key="option"
                                                :value="option"
                                          >
                                                {{ option }}
                                          </option>
                                    </select>
                              </div>

                              <div class="mb-4">
                                    <label
                                          class="block mb-1 font-medium text-gray-700"
                                          >Quantity</label
                                    >
                                    <input
                                          v-model="product.quantity"
                                          type="number"
                                          placeholder="Enter quantity"
                                          class="w-full px-3 py-2 border rounded"
                                          required
                                    />
                              </div>

                              <div class="mb-4">
                                    <label
                                          class="block mb-1 font-medium text-gray-700"
                                          >Price</label
                                    >
                                    <input
                                          v-model="product.price"
                                          type="number"
                                          placeholder="Enter price"
                                          class="w-full px-3 py-2 border rounded"
                                          required
                                    />
                              </div>

                              <div class="mb-4">
                                    <label
                                          class="block mb-1 font-medium text-gray-700"
                                          >Category</label
                                    >
                                    <select
                                          id="category"
                                          v-model="product.category"
                                          class="w-full p-2 border rounded"
                                    >
                                          <option disabled value="">
                                                Select category
                                          </option>
                                          <option
                                                v-for="category in categoryOptions"
                                                :key="category"
                                                :value="category"
                                          >
                                                {{ category }}
                                          </option>
                                    </select>
                              </div>

                              <div class="mt-7">
                                    <button
                                          @click="form.removeProduct(index)"
                                          type="button"
                                          class="px-4 py-2 text-white bg-red-600 border rounded text-red hover:bg-red-700"
                                    >
                                          delete
                                    </button>
                              </div>
                        </div>

                        <button
                              @click="form.addProduct"
                              type="button"
                              class="px-4 py-2 text-white bg-green-600 border rounded hover:bg-green-700"
                        >
                              add
                        </button>

                        <div class="flex justify-end gap-2 mt-6 sm:mt-0">
                              <button
                                    type="button"
                                    @click="closeModal"
                                    class="px-4 py-2 text-gray-700 border rounded hover:bg-gray-100"
                              >
                                    Cancel
                              </button>
                              <button
                                    type="submit"
                                    class="px-4 py-2 text-white bg-blue-600 rounded hover:bg-blue-700"
                              >
                                    Submit
                              </button>
                        </div>
                  </form>
            </div>
      </div>
</template>
