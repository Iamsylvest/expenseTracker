<script setup>
      import { useDetailsStore } from '@/stores/expensesDetailsStore';
      import { ref, onMounted } from 'vue';

      const showModal = ref(false);

      const showProductsModal = () => {
            showModal.value = !showModal.value;
      };

      defineProps({
            expenses: {
                  type: Object,
                  required: true,
            },
      });

      const categoryOptionsIcons = [
            { name: 'Food', icon: 'fa-solid fa-utensils' },
            { name: 'Beverages', icon: 'fa-solid fa-coffee' },
            { name: 'Electronics', icon: 'fa-solid fa-tv' },
            { name: 'Office Supplies', icon: 'fa-solid fa-briefcase' },
            { name: 'Cleaning Supplies', icon: 'fa-solid fa-broom' },
            { name: 'Furniture', icon: 'fa-solid fa-couch' },
            { name: 'Tools', icon: 'fa-solid fa-tools' },
            { name: 'Clothing', icon: 'fa-solid fa-tshirt' },
            { name: 'Accessories', icon: 'fa-solid fa-ring' },
            { name: 'Hardware', icon: 'fa-solid fa-hammer' },
            { name: 'Software', icon: 'fa-solid fa-code' },
            { name: 'Raw Materials', icon: 'fa-solid fa-cubes' },
            { name: 'Packaging', icon: 'fa-solid fa-box-open' },
            { name: 'Maintenance', icon: 'fa-solid fa-wrench' },
            { name: 'Miscellaneous', icon: 'fa-solid fa-ellipsis-h' },
      ];

      function getIconByCategory(category) {
            const found = categoryOptionsIcons.find(
                  (c) =>
                        c.name.trim().toLowerCase() ===
                        category.trim().toLowerCase()
            );
            return found ? found.icon : 'fa-solid fa-question'; // fallback icon
      }
</script>

<template>
      <button @click="showProductsModal" class="hover:underline">
            See details..
      </button>

      <!-- Use showModal to toggle visibility -->
      <!-- Overlay with opacity -->
      <div
            v-if="showModal"
            class="fixed inset-0 z-40 bg-gray-300 opacity-50"
            @click="showProductsModal"
      ></div>

      <!-- Modal content above overlay -->
      <div
            v-if="showModal"
            class="fixed inset-0 z-50 flex items-center justify-center"
      >
            <div
                  class="relative w-full p-8 overflow-x-auto bg-white rounded-lg shadow-md max-w-7xl"
            >
                  <!-- Close button -->
              <div class="flex items-end justify-end ">
                  <button
                        class="px-4 py-2 text-2xl rounded-full top-2 right-2 hover:bg-gray-300"
                        @click="showProductsModal"
                  >
                        x
                  </button>
              </div>
      
             <div class="flex items-center justify-center mb-5">
         
                  <h1 class="text-2xl font-semibold">
                        {{ expenses.title }}
                  </h1>
            
             </div>
               

                  <table class="w-full border-collapse border-none">
                        <thead class="text-white bg-gray-500">
                              <th class="px-4 py-2 border-0 ">
                                    Product
                              </th>
                              <th class="px-4 py-2 border-0 ">
                                    Unit
                              </th>
                              <th class="px-4 py-2 border-0 ">
                                    Price
                              </th>
                              <th class="px-4 py-2 border-0">
                                    Category
                              </th>
                        </thead>
                        <tbody>
                              <tr
                                    v-for="(
                                          products, index
                                    ) in expenses.products"
                                    :key="index"

                                    :class="{
                                
                                'bg-white hover:bg-gradient-to-r from-blue-300 to-blue-100  ': index % 2 === 0,
                                'bg-gray-100 hover:bg-gradient-to-r from-blue-100 to-blue-300  ' : index % 2 === 1,
                           }"
                              >
                                    <td class="px-4 py-2 border-0 ">
                                          {{ products.product_name }}
                                    </td>
                                    <td class="px-4 py-2 border-0 ">
                                          {{ products.unit }}
                                    </td>
                                    <td class="px-4 py-2 border-0">
                                          {{ products.price.toLocaleString() }}
                                    </td>
                                    <td class="px-4 py-2 border-0">
                                          {{ products.category }}
                                          <i
                                                :class="
                                                      getIconByCategory(
                                                            products.category
                                                      )
                                                "
                                          ></i>
                                    </td>
                              </tr>
                        </tbody>
                  </table>
            </div>
      </div>
</template>
