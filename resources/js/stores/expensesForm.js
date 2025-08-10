import { defineStore } from 'pinia';

export const useFormStore = defineStore('expenseForm', {
      state: () => ({
            title: '',
            income: null,
            date: new Date().toISOString().split('T')[0], // default today
            category: '',
            products: [
                  {
                        product_name: '',
                        unit: '',
                        quantity: 0,
                        price: 0,
                        category: '',
                  },
            ],
      }),
      actions: {
            addProduct() {
                  this.products.push({
                        product_name: '',
                        unit: '',
                        quantity: 0,
                        price: 0,
                        category: '',
                  });
            },
            removeProduct(index) {
                  this.products.splice(index, 1);
            },

            resetAll() {
                  this.title = '';
                  this.income = null;
                  this.date = new Date().toISOString().split('T')[0]; // default today
                  this.category = '';
                  this.products = [
                        {
                              product_name: '',
                              unit: '',
                              quantity: 0,
                              price: 0,
                              category: '',
                        },
                  ];
            },
      },
});
