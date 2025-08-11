import { defineStore } from 'pinia';
import axios from 'axios';
import Swal from 'sweetalert2';
import debounce from 'lodash/debounce';

export const useDetailsStore = defineStore('expensesDetails', {
      state: () => ({
            expenses: { products: [] },
            allExpenses: [],
            loading: false,
            error: null,
            fetched: false,
            loadingAllExpenses: false,
            errorAllExpenses: null,
            fetchedAllExpenses: false,

            currentPage: 1,
            lastPage: 1,
            search: '',
      }),

      getters: {
            totalExpenses: (state) => {
                  if (
                        !state.expenses.products ||
                        !Array.isArray(state.expenses.products)
                  ) {
                        return 0;
                  }
                  return state.expenses.products.reduce(
                        (sum, product) => sum + product.price,
                        0
                  );
            },

            currentBalance: (state) => {
                  return (state.expenses.income || 0) - state.totalExpenses;
            },

            topSpendingCategory: (state) => {
                  if (
                        !state.expenses.products ||
                        !Array.isArray(state.expenses.products)
                  ) {
                        return null;
                  }

                  const categoryTotals = state.expenses.products.reduce(
                        (totals, product) => {
                              const amount = product.price * product.quantity;
                              totals[product.category] =
                                    (totals[product.category] || 0) + amount;
                              return totals;
                        },
                        {}
                  );

                  let topCategory = null;
                  let maxSpent = 0;

                  for (const [category, total] of Object.entries(
                        categoryTotals
                  )) {
                        if (total > maxSpent) {
                              maxSpent = total;
                              topCategory = category;
                        }
                  }

                  return topCategory;
            },

            // 'state' refers to the data you defined in state: () => ({ ... }) above
            chartData: (state) => {
                  // Check if there are no products or if the products array is empty.
                  if (
                        !state.expenses.products ||
                        state.expenses.products.length === 0
                  ) {
                        // If there’s no data, return an empty Chart.js structure.
                        return { labels: {}, datasets: [] };
                  }

                  // Return a Chart.js dataset object built from the products array.
                  return {
                        // Create an array of product names using .map() to transform each product into its name.
                        labels: state.expenses.products.map(
                              (p) => p.product_name
                        ),

                        // Datasets is an array containing one dataset configuration for the chart.
                        datasets: [
                              {
                                    // The label for the dataset shown in the chart legend.
                                    label: 'Expenses',

                                    // Create an array of product prices using .map() to transform each product into its price.
                                    data: state.expenses.products.map(
                                          (p) => p.price
                                    ),

                                    // Set a semi-transparent teal color for the chart bars.
                                    backgroundColor: [
                                          '#fa0000',
                                          '#147bfa',
                                          '#38a100',
                                          '#c9c600',
                                          
                                    ],
                              },
                        ],
                  };
            },

            chartDataforQuantity: (state) => {
                  if (
                        !state.expenses.products ||
                        state.expenses.products.length === 0
                  ) {
                        return { labels: {}, datasets: [] };
                  }

                  return {
                        labels: state.expenses.products.map(
                              (p) => p.product_name
                        ),

                        datasets: [
                              {
                                    label: 'Products Quantity',
                                    data: state.expenses.products.map(
                                          (q) => q.quantity
                                    ),

                                    backgroundColor: [
                                          '#147bfa',
                                          '#147bfa',
                                          '#1ea7ff',
                                          '#1ea7ff',
                                    ],
                              },
                        ],
                  };
            },
      },

      actions: {
            async fetchExpensesDetails() {
                  if (this.fetched) return;
                  this.loading = true;
                  this.error = null;

                  try {
                        const response = await axios.get(
                              '/expensesDetailsLatestJson'
                        );
                        this.expenses = response.data.expenses || {
                              products: [],
                        };
                        this.fetched = true;
                  } catch (error) {
                        this.error = error;
                  } finally {
                        this.loading = false;
                  }
            },

            // Method to update the search term and trigger a fetch
            setSearch(value) {
                  this.search = value; // Save the new search value into the store state
                  this.currentPage = 1; // Reset to first page when searching (avoid being stuck on page 3 for a new search)
                  this.fetchedAllExpenses = false; // Mark data as "not fetched yet" so fetchAllExpensesDetails() will run
                  this.debounceFetch(); // Trigger a debounced fetch (waits 500ms before actually calling the API)
            },

            // Debounced function: waits 500ms before running fetchAllExpensesDetails()
            // This prevents calling the API too often when typing in search box
            debounceFetch: _.debounce(function () {
                  this.fetchAllExpensesDetails(); // After debounce delay, call API
            }, 500), // Delay time: 500 milliseconds (0.5 seconds)

            // Main function to get expenses data from the backend
            async fetchAllExpensesDetails() {
                  if (this.fetchedAllExpenses) return; // If data is already fetched for this page/search, skip request

                  this.loadingAllExpenses = true; // Show loading indicator in UI
                  this.errorAllExpenses = null; // Clear any previous error messages

                  try {
                        // Call backend GET endpoint with pagination + search params
                        const response = await axios.get(
                              '/allExpensesDetailsJson',
                              {
                                    params: {
                                          page: this.currentPage, // Page number to fetch
                                          search: this.search || '', // Search term (empty string if null/undefined)
                                    },
                              }
                        );

                        // Save returned data into store state
                        this.allExpenses = response.data.data || []; // Array of expense records
                        this.currentPage = response.data.current_page; // Update current page number from API response
                        this.lastPage = response.data.last_page; // Save last page number from API (for pagination UI)

                        this.fetchedAllExpenses = true; // Mark as fetched so we don't fetch again unless needed
                  } catch (error) {
                        this.errorAllExpenses = error; // Store error so UI can display a message
                  } finally {
                        this.loadingAllExpenses = false; // Always hide loading indicator (success or fail)
                  }
            },

            async deleteTransaction(transactionId) {
                  try {
                        // Show success alert
                        const result = await Swal.fire({
                              title: 'Are you sure?',
                              text: 'You wont be able to revert thiss!.',
                              icon: 'warning',
                              showCancelButton: 'true',
                              showConfirmButton: 'd33',
                              cancelButtonColor: '#3085d6',
                              confirmButtonText: 'Yes, delete it!',
                              cancelButtonText: 'Cancel',
                        });
                        if (result.isConfirmed) {
                              // Send DELETE request to your API with the transaction ID
                              const response = await axios.delete(
                                    `/api/transactions/${transactionId}`
                              );
                              console.log(
                                    'Transaction deleted:',
                                    response.data
                              );
                              this.fetchedAllExpenses = false; // allow data to refresh
                              await this.fetchAllExpensesDetails(); // refresh data

                              Swal.fire({
                                    title: 'Deleted!',
                                    text: `${transactionId} Transaction deleted Successfully`,
                                    icon: 'success',
                                    timer: 2000,
                                    showConfirmButton: false,
                              });
                        }
                  } catch (error) {
                        console.error('Failed to delete transaction', error);

                        // Show error alert
                        Swal.fire({
                              icon: 'error',
                              title: 'Oops...',
                              text: 'Failed to delete transaction. Please try again.',
                        });
                  }
            },
      },
});
