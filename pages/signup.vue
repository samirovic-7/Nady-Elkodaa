<script lang="ts" setup>
const router = useRouter();

const form = reactive({
  data: {
    email: null,
    password: null,
    name: null,
    rememberMe: false,
  },
  error: "",
  pending: false,
});


</script>

<template>
  <div class="min-h-screen flex flex-col">
    <header>
      <h1 class="my-24 font-bold text-2xl text-center">Signup your account</h1>
    </header>
    <main class="mx-auto max-w-sm w-full">
      <form class="mb-6 p-12 bg-slate-900 rounded shadow" @submit.prevent="onsignup">
        <p
          v-if="form.error"
          class="mb-3 px-3 py-1.5 w-full border rounded border-red-400 text-sm text-center text-red-400"
        >
          {{ form.error }}
        </p>
        <div class="mb-3">
          <label for="email" class="mb-1 inline-block font-semibold text-sm text-slate-200">User Name</label>
          <input
            id="name"
            v-model="form.data.name"
            type="text"
            class="px-3 py-1.5 w-full border rounded border-slate-700 bg-slate-800 text-sm focus:outline-none focus:ring-2 focus:ring-slate-700 focus:border-transparent"
            
          />
        </div>
        <div class="mb-3">
          <label for="email" class="mb-1 inline-block font-semibold text-sm text-slate-200">Email address</label>
          <input
            id="email"
            v-model="form.data.email"
            type="email"
            class="px-3 py-1.5 w-full border rounded border-slate-700 bg-slate-800 text-sm focus:outline-none focus:ring-2 focus:ring-slate-700 focus:border-transparent"
           
          />
        </div>
        <div class="mb-3">
          <label for="password" class="mb-1 inline-block font-semibold text-sm text-slate-200">Password</label>
          <input
            id="password"
            v-model="form.data.password"
            type="password"
            class="px-3 py-1.5 w-full border rounded border-slate-700 bg-slate-800 text-sm focus:outline-none focus:ring-2 focus:ring-slate-700 focus:border-transparent"
            required
          />
        </div>
        <div class="mb-3 flex justify-end items-center">
          <label for="remember-me" class="mr-1 text-sm text-light-100">Remember me</label>
          <input
            id="remember-me"
            v-model="form.data.rememberMe"
            type="checkbox"
            class="w-4 h-4 accent-slate-700 focus:outline-none focus:ring-2 focus:ring-slate-700 focus:border-transparent"
          />
        </div>
        <div>
          <button
            type="submit"
            :disabled="form.pending"
            class="px-3 py-1.5 w-full rounded bg-light-100 font-semibold text-sm text-slate-950 hover:bg-light-700 focus:outline-none focus:bg-light-700 transition-colors"
          >
            Sign up
          </button>
        </div>
      </form>
      <div class="mb-6 text-center">
        <NuxtLink to="/" class="text-xs text-slate-400 transition-colors hover:text-light-100">Go back home</NuxtLink>
      </div>
      <div>
        <h3 class="mb-1 font-bold">Help</h3>
        <p class="text-sm text-slate-400">
          For demo purpose, this application comes with predefined credentials you can use to signup:
        </p>
 
      </div>
    </main>
    <BaseFooter class="mt-auto" />
  </div>
</template>

<!--<script>-->
<!--// Import the `axios` library for making HTTP requests-->
<!--import axios from "axios";-->

<!--export default {-->
<!--  // Define data properties for storing the name, email, and password-->
<!--  data() {-->
<!--    return {-->
<!--      name: null,-->
<!--      email: null,-->
<!--      password: null,-->
<!--    };-->
<!--  },-->
<!--  methods: {-->
<!--    // Define a method for handling the signup button click event-->
<!--    onsignup() {-->
<!--      const data = {-->
<!--        // Set the `data` object to an object containing the name, email, and password-->
<!--        name: this.name,-->
<!--        email: this.email,-->
<!--        password: this.password,-->
<!--      };-->

<!--      // Make a POST request to the signup endpoint with the `data` object-->
<!--      axios.post(`{{base_url}}/api/mgr/auth/signup`, data)-->
<!--        .then(-->
<!--          // Handle the response-->
<!--          res => {-->
<!--            if (res.status === 200) {-->
<!--              console.log('user Saved Done');-->
<!--            }-->
<!--          }-->
<!--        ).catch(-->
<!--        // Handle the error-->
<!--        err => {-->
<!--          console.log(err);-->
<!--        }-->
<!--      );-->
<!--    },-->
<!--  },-->
<!--};-->
<!--</script>-->
