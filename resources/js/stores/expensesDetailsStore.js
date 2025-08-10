import { defineStore } from 'pinia';
import axios from 'axios';
import Swal from 'sweetalert2';
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
                                          'rgba(255, 99, 132, 0.5)',
                                          'rgba(54, 162, 235, 0.5)',
                                          'rgba(255, 206, 86, 0.5)',
                                          'rgba(75, 192, 192, 0.5)',
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
                                          'rgba(255, 99, 132, 0.5)',
                                          'rgba(54, 162, 235, 0.5)',
                                          'rgba(255, 206, 86, 0.5)',
                                          'rgba(75, 192, 192, 0.5)',
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

            async fetchAllExpensesDetails() {
                  if (this.fetchedAllExpenses) return;

                  this.loadingAllExpenses = true; // Show loading indicator
                  this.errorAllExpenses = null; // Clear previous errors

                  try {
                        // Make GET request to fetch all expenses details from the server
                        const response = await axios.get(
                              '/allExpensesDetailsJson',
                              { params: { page: this.currentPage } }
                        );
                        this.allExpenses = response.data.data || [];
                        this.currentPage = response.data.current_page;
                        this.lastPage = response.data.last_page;

                        this.fetchedAllExpenses = true; // Mark that data has been fetched
                  } catch (error) {
                        this.errorAllExpenses = error; // Store error if request fails
                  } finally {
                        this.loadingAllExpenses = false; // Hide loading indicator whether success or failure
                  }
            },

            async deleteTransaction(transactionId) {
                  try {
                    // Send DELETE request to your API with the transaction ID
                    const response = await axios.delete(`/api/transactions/${transactionId}`);
                    console.log('Transaction deleted:', response.data);
                    this.fetchedAllExpenses = false; // allow data to refresh
                    await this.fetchAllExpensesDetails(); // refresh data
                    
                    // Show success alert
                    Swal.fire({
                      icon: 'success',
                      title: 'Deleted!',
                      text: 'Transaction deleted successfully.',
                      timer: 2000,
                      showConfirmButton: false,
                    });
                  } catch (error) {
                    console.error('Failed to delete transaction', error);
                    
                    // Show error alert
                    Swal.fire({
                      icon: 'error',
                      title: 'Oops...',
                      text: 'Failed to delete transaction. Please try again.',
                    });
                  }
                }
      },
});
