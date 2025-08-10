<script setup>
      defineProps({
            type: {
                  type: String,
                  default: 'submit',
            },
      });
</script>

<template>
      <button
            :type="type"
            class="inline-flex items-center px-4 py-2 text-xs font-semibold tracking-widest text-white uppercase transition duration-150 ease-in-out border border-transparent rounded-md bg-custom-darkblue hover:bg-gray-700 focus:bg-gray-700 active:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
      >
            <slot />
      </button>
</template>
