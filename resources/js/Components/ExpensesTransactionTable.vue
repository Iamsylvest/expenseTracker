<script setup>
      import { useDetailsStore } from '@/stores/expensesDetailsStore';
      import { onMounted } from 'vue';
      import ProductDetailsModal from './ProductDetailsModal.vue';
      import { watch } from 'vue';
      import { storeToRefs } from 'pinia';

      const allExpensesDetails = useDetailsStore();

      function goToPreviousPage() {
            // Check if current page is greater than 1 (meaning there's a previous page)
            if (allExpensesDetails.currentPage > 1) {
                  // Decrement the current page number by 1 to go to the previous page
                  allExpensesDetails.currentPage--;

                  // Reset the fetched flag to false so the fetch method knows it needs to get fresh data
                  allExpensesDetails.fetchedAllExpenses = false;

                  // Call the function to fetch expenses details for the new current page
                  allExpensesDetails.fetchAllExpensesDetails();
            }
      }

      function goToNextPage() {
            // Check if current page is less than the last page (meaning there's a next page)
            if (allExpensesDetails.currentPage < allExpensesDetails.lastPage) {
                  // Increment the current page number by 1 to go to the next page
                  allExpensesDetails.currentPage++;

                  // Reset the fetched flag to false so the fetch method knows it needs to get fresh data
                  allExpensesDetails.fetchedAllExpenses = false;

                  // Call the function to fetch expenses details for the new current page
                  allExpensesDetails.fetchAllExpensesDetails();
            }
      }

      onMounted(() => {
            allExpensesDetails.fetchAllExpensesDetails();
      });

      // Get a reactive reference to search in the store
      const { search } = storeToRefs(allExpensesDetails);

      // Watch for changes and call store’s setSearch (with debounce inside store)
      watch(search, (value) => {
            allExpensesDetails.setSearch(value);
      });
</script>

<template>
      <div class="p-4 overflow-x-auto">
            <div class="flex items-center justify-center">
                  <h1 class="p-4 text-2xl font-semibold">All Transaction</h1>
            </div>
            <div class="relative flex items-center justify-center rounded-md sm:items-end sm:justify-end bottom-4 bg ">
                  <!--Seach and fillters-->
                  <div class="flex justify-center">
                        <div class="flex overflow-hidden border border-gray-300 rounded-full shadow-md">
                        <input
                              type="search border"
                              placeholder="Search"
                              v-model="search"
                              class="px-4 py-2 w-96 focus:outline-none"
                        />
                        <button
                              type="submit"
                              class="flex items-center justify-center px-4 transition bg-gray-100 hover:bg-gray-200"
                              aria-label="Search"
                        >
                              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-5 h-5 text-gray-600">
                              <path stroke-linecap="round" stroke-linejoin="round" d="M21 21l-4.35-4.35M10.5 17a6.5 6.5 0 1 0 0-13 6.5 6.5 0 0 0 0 13z" />
                              </svg>
                        </button>
                        </div>
                        </div>
            

            </div>
            <table 
          
            
            class="w-full border-collapse shadow-md ">
                  <thead>
                        <tr class="text-white bg-gray-500 ">
                              <th
                                    class="px-4 py-2 text-center border-0 border-black"
                              >
                                    Title
                              </th>
                              <th
                                    class="px-4 py-2 text-center border-0 border-black"
                              >
                                    Income
                              </th>
                              <th
                                    class="px-4 py-2 text-center border-0 border-black"
                              >
                                    Date of transaction
                              </th>
                              <th
                                    class="px-4 py-2 text-center border-0 border-black"
                              >
                                    Product Details
                              </th>
                              <th
                                    class="px-4 py-2 text-center border-0 border-black"
                              >
                                    Action
                              </th>
                        </tr>
                  </thead>
                  <tbody>
                        <tr
                              v-for="(
                                    expenses, index
                              ) in allExpensesDetails.allExpenses"
                              :key="index"
                              :class="{
                                
                                   'bg-white hover:bg-gradient-to-r from-blue-300 to-blue-100  ': index % 2 === 0,
                                   'bg-gray-100 hover:bg-gradient-to-r from-blue-100 to-blue-300  ' : index % 2 === 1,
                              }"
                        >
                              <td
                                    class="px-4 py-2 text-center border-0 border-black"
                              >
                                    {{ expenses.title }}
                              </td>
                              <td
                                    class="px-4 py-2 text-center border-0 border-black"
                              >
                                    {{ expenses.income.toLocaleString() }}
                              </td>
                              <td
                                    class="px-4 py-2 text-center border-0 border-black"
                              >
                                    {{
                                          expenses.date_of_transaction_calculation
                                                ? new Date(
                                                        expenses.date_of_transaction_calculation
                                                  ).toLocaleDateString(
                                                        'en-US',
                                                        {
                                                              year: 'numeric',
                                                              month: 'long',
                                                              day: 'numeric',
                                                        }
                                                  )
                                                : 'No date'
                                    }}
                              </td>
                              <td
                                    class="px-4 py-2 text-center border-0 border-black"
                              >
                                    <ProductDetailsModal :expenses="expenses" />
                              </td>
                              <td
                                    class="px-4 py-2 text-center border-0 border-black"
                              >
                                    <button
                                          @click="
                                                allExpensesDetails.deleteTransaction(
                                                      expenses.id
                                                )
                                          "
                                          class="p-1 px-4 text-white bg-red-500 rounded-lg"
                                    >
                                          Delete
                                    </button>
                              </td>
                        </tr>
                  </tbody>
            </table>

            <!-- Pagination controls -->
            <div class="flex justify-center mt-4 space-x-4">
                  <!-- Disable Previous button if on the first page -->
                  <button
                        :disabled="allExpensesDetails.currentPage === 1"
                        @click="goToPreviousPage"
                        class="px-4 py-2 bg-gray-300 rounded disabled:opacity-50"
                  >
                        Previous
                  </button>

                  <!-- Display the current page and total number of pages -->
                  <span>
                        Page {{ allExpensesDetails.currentPage }} of
                        {{ allExpensesDetails.lastPage }}
                  </span>

                  <!-- Disable Next button if on the last page -->
                  <button
                        :disabled="
                              allExpensesDetails.currentPage ===
                              allExpensesDetails.lastPage
                        "
                        @click="goToNextPage"
                        class="px-4 py-2 bg-gray-300 rounded disabled:opacity-50"
                  >
                        Next
                  </button>
            </div>
      </div>
</template>
