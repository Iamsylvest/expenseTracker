<script setup>
      import ApplicationLogo from '@/Components/ApplicationLogo.vue';
      import { Link } from '@inertiajs/vue3';
</script>

<template>
      <div
            class="flex flex-col items-center justify-center min-h-screen pt-6 bg-gray-100 sm:justify-center sm:pt-0"
      >
            <div>
                  <Link href="/">
                        <ApplicationLogo
                              class="text-6xl fill-current text-custom-lightblue"
                        />
                  </Link>
            </div>

            <div
                  class="w-full px-6 py-4 mt-6 overflow-hidden bg-white shadow-md sm:max-w-md sm:rounded-lg "
            >
                  <slot />
            </div>
      </div>
</template>
