<script setup>
      import { ref } from 'vue';

      // Declare that this component emits 'toggle-form'
      const emit = defineEmits(['toggle-form']);

      // Emit the event when button is clicked
      const showTransactionModal = () => {
            emit('toggle-form');
      };
</script>

<template>
      <div
            class="p-2 font-semibold border rounded-lg shadow-md bg-custom-lightblue hover:bg-custom-darkblue"
      >
            <button @click="showTransactionModal()" class="flex text-white">
                  Add transaction
                  <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke-width="1.5"
                        stroke="currentColor"
                        class="font-semibold size-5"
                  >
                        <path
                              stroke-linecap="round"
                              stroke-linejoin="round"
                              d="M12 4.5v15m7.5-7.5h-15"
                        />
                  </svg>
            </button>
      </div>
</template>
