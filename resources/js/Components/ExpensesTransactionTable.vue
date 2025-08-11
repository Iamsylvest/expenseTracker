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
            <div class="relative flex items-end justify-end bottom-4">
                  <!--Seach and fillters-->
                  <input
                        type="search"
                        alt="search"
                        class="rounded-lg"
                        placeholder="Search.."
                        v-model="search"
                  />
            </div>
            <table class="w-full border-2 border-collapse border-black">
                  <thead>
                        <tr class="bg-gray-200">
                              <th
                                    class="px-4 py-2 text-center border border-black"
                              >
                                    Title
                              </th>
                              <th
                                    class="px-4 py-2 text-center border border-black"
                              >
                                    Income
                              </th>
                              <th
                                    class="px-4 py-2 text-center border border-black"
                              >
                                    Date of transaction
                              </th>
                              <th
                                    class="px-4 py-2 text-center border border-black"
                              >
                                    Product Details
                              </th>
                              <th
                                    class="px-4 py-2 text-center border border-black"
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
                        >
                              <td
                                    class="px-4 py-2 text-center border border-black"
                              >
                                    {{ expenses.title }}
                              </td>
                              <td
                                    class="px-4 py-2 text-center border border-black"
                              >
                                    {{ expenses.income.toLocaleString() }}
                              </td>
                              <td
                                    class="px-4 py-2 text-center border border-black"
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
                                    class="px-4 py-2 text-center border border-black"
                              >
                                    <ProductDetailsModal :expenses="expenses" />
                              </td>
                              <td
                                    class="px-4 py-2 text-center border border-black"
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
