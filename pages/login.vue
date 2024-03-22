<script lang="ts" setup>
// Import the `login` function from the `useAuth` module
const { login } = useAuth();

// Import the `useRouter` function from Vue Router
import { useRouter } from "vue-router";

// Initialize the router
const router = useRouter();

// Initialize the form data
const form = reactive({
  data: {
    email: null, // The email address entered by the user
    password: null, // The password entered by the user
    rememberMe: false, // Whether the user wants to stay logged in
  },
  error: "", // The error message to display if the login fails
  pending: false, // Whether the login request is currently being processed
});

/*
  The `onLoginClick` function is called when the user clicks the "Sign in" button.
  It sends a request to the server to log the user in with the provided email and password.
*/
async function onLoginClick() {
  try {
    form.error = "";
    form.pending = true;

    // Call the `login` function with the email, password, and rememberMe values from the form data
    await login(form.data.email, form.data.password, form.data.rememberMe);

    // If the login is successful, redirect the user to the home page
    router.push("/");
  } catch (error: any) {
    console.error(error);

    // If the login fails, display the error message
    if (error.data.message) form.error = error.data.message;
  } finally {
    form.pending = false;
  }
}
</script>

<template>
  <div class="min-h-screen flex flex-col">
    <header>
      <h1 class="my-24 font-bold text-2xl text-center">Login to your account</h1>
    </header>
    <main class="mx-auto max-w-sm w-full">
      <form class="mb-6 p-12 bg-slate-900 rounded shadow" @submit.prevent="onLoginClick">
        <p
          v-if="form.error"
          class="mb-3 px-3 py-1.5 w-full border rounded border-red-400 text-sm text-center text-red-400"
        >
          {{ form.error }}
        </p>
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
            Sign in
          </button>
        </div>
      </form>
      <div class="mb-6 text-center">
        <NuxtLink to="/" class="text-xs text-slate-400 transition-colors hover:text-light-100">Go back home</NuxtLink>
      </div>
      <div>
        <h3 class="mb-1 font-bold"> you can use to login:</h3>
        <br>
        <ul class="text-sm text-slate-400">
          <li><code class="text-slate-400"><b>Email is </b> reymon@chd.com</code> <br> <code class="text-slate-200">password is </code> <b>password</b></li>
        </ul>
      </div>
    </main>
    <BaseFooter class="mt-auto" />
  </div>
</template>
<!--<script>-->
<!--// Import the `axios` library for making HTTP requests-->
<!--import axios from "axios";-->

<!--export default {-->
<!--  // Define the component state-->
<!--  state: {-->
<!--    accessToken: null,-->
<!--    status: null,-->
<!--  },-->
<!--  // Use the Options API style for defining data and methods-->
<!--  data() {-->
<!--    return {-->
<!--      // Define data properties for storing the email, password, and type-->
<!--      email: "",-->
<!--      password: "",-->
<!--      type: "text",-->
<!--      data: "",-->
<!--    };-->
<!--  },-->
<!--  methods: {-->
<!--    // Define a method for handling the login button click event-->
<!--    onLoginClick() {-->
<!--      let URL = "";-->

<!--      // Set the `data` property to an object containing the email and password-->
<!--      this.data = {-->
<!--        email: this.email,-->
<!--        password: this.password,-->
<!--      };-->

<!--      // Set the URL for the login request-->
<!--      URL = `${this.base_url}/api/mgr/auth/login?email=${this.email}&password=${this.password}`;-->

<!--      // Make a POST request to the login endpoint with the `data` object-->
<!--      const result = axios.post(`${this.base_url}/api/mgr/auth/login`, this.data).then(-->
<!--        // Handle the response-->
<!--        (result) => {-->
<!--          if (result.status === 200) {-->
<!--            // Store the access token in local storage-->
<!--            localStorage.setItem("accessToken", result.data.token);-->

<!--            // Redirect the user to the home page-->
<!--            let reloadFlag = false;-->

<!--            this.$router.push("/").then(() => {-->
<!--              if (!reloadFlag) {-->
<!--                reloadFlag = true;-->
<!--                window.location.reload();-->
<!--              }-->
<!--            });-->
<!--          }-->
<!--        },-->
<!--      );-->
<!--    },-->
<!--  },-->
<!--};-->
<!--</script>-->
