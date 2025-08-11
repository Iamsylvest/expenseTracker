<script setup>
      import { Head, Link } from '@inertiajs/vue3';

      defineProps({
            canLogin: Boolean,
            canRegister: Boolean,
            laravelVersion: Boolean,
            phpVersion: Boolean,
      });
</script>

<template>
      <Head title="Welcome" />

      <div class="w-full p-3 bg-white shadow-sm ">
            <p class="ml-0 text-sm font-semibold text-center sm:text-left lg:text-xl text-nowrap sm:ml-12 text-custom-lightblue">💰 ExpenseTracker</p>
      </div>
      <div
            class="flex items-center justify-center min-h-screen bg-gray-100 selection:bg-custom-lightblue selection:text-white"
      >
            <!-- Grid Layout: Responsive 1-column on mobile, 2-column on sm+ -->
            <div class="w-full max-w-3xl bg-white rounded-lg shadow-md">
                  <!-- 🧾 Right Side: Welcome Message & Buttons -->
                  <div>
                        <div
                              class="grid gap-4 p-4 space-y-6 text-center sm:grid-cols-2"
                        >
                              <div>
                                    <img
                                          src="/build/assets/img/landingPageBg.jpg"
                                          alt="landingPage" class="rounded-lg"
                                    />
                              </div>

                              <!-- 🔐 Conditional Links Based on Auth -->
                              <div v-if="canLogin" class="mt-8 ">
                                    <!-- ✅ If user is already logged in -->
                                    <Link
                                          v-if="$page.props.auth.user"
                                          :href="route('dashboard')"
                                          class="inline-block text-lg font-semibold text-blue-700 hover:underline focus:outline focus:outline-2 focus:outline-blue-400"
                                    >
                                          Go to Dashboard
                                    </Link>

                                    <!-- ❌ If NOT logged in -->
                                    <template v-else>
                                                      <div
                                                            class="flex flex-col items-center space-y-4"
                                                      >
                                                      <div class="mb-4 space-y-2">
                                                      <!-- 🧠 Headline -->
                                                      <h1 class="text-3xl">
                                                            Track Your Money. Grow Your
                                                            Savings.
                                                      </h1>
                                                      <h2 class="px-12 text-center ">
                                                            See where your money goes,
                                                            control your spending, and reach
                                                            your financial goals — all in
                                                            one place.
                                                      </h2>
                                                </div>
                                                <!-- 🔵 Log in Button -->
                                                <Link
                                                      :href="route('login')"
                                                      class="w-full px-8 py-2 text-lg font-semibold text-white bg-blue-600 rounded-lg shadow hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                                                >
                                                      Log in
                                                </Link>

                                                <!-- 🟢 Register Button (if allowed) -->
                                                <Link
                                                      v-if="canRegister"
                                                      :href="route('register')"
                                                      class="w-full px-8 py-2 text-lg font-semibold text-blue-600 bg-white border border-blue-600 rounded-lg shadow hover:bg-blue-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                                                >
                                                      Register
                                                </Link>
                                          </div>
                                    </template>
                              </div>
                        </div>
                  </div>
            </div>
      </div>
</template>

<style>
      .bg-dots-darker {
            background-image: url("data:image/svg+xml,%3Csvg width='30' height='30' viewBox='0 0 30 30' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M1.22676 0C1.91374 0 2.45351 0.539773 2.45351 1.22676C2.45351 1.91374 1.91374 2.45351 1.22676 2.45351C0.539773 2.45351 0 1.91374 0 1.22676C0 0.539773 0.539773 0 1.22676 0Z' fill='rgba(0,0,0,0.07)'/%3E%3C/svg%3E");
      }
      @media (prefers-color-scheme: dark) {
            .dark\:bg-dots-lighter {
                  background-image: url("data:image/svg+xml,%3Csvg width='30' height='30' viewBox='0 0 30 30' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M1.22676 0C1.91374 0 2.45351 0.539773 2.45351 1.22676C2.45351 1.91374 1.91374 2.45351 1.22676 2.45351C0.539773 2.45351 0 1.91374 0 1.22676C0 0.539773 0.539773 0 1.22676 0Z' fill='rgba(255,255,255,0.07)'/%3E%3C/svg%3E");
            }
      }
</style>
