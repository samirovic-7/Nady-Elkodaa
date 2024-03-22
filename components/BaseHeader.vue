<script lang="ts" setup>
const currentUser = useAuthUser();
 
const { logout } = useAuth();

const form = reactive({
  pending: false,
});

async function onLogoutClick() {
  try {
    form.pending = true;

    await logout();

    await navigateTo("/");
  } catch (error) {
    console.error(error);
  } finally {
    form.pending = false;
  }
}
</script>
<template>
  <header class="bg-slate-900">
    <div class="p-3 mx-auto w-full max-w-4xl">
      <nav class="flex items-center justify-between gap-3">
        <NuxtLink to="/" class="flex items-center gap-2">
          <span class="font-bold text-lg uppercase leading-none text-white">CHD</span>
          <span class="text-sm leading-none text-slate-400">Task</span>
        </NuxtLink>
        <div class="flex items-center gap-3">
          <template v-if="currentUser">
            <NuxtLink to="/" class="px-3 font-semibold text-white">Home</NuxtLink>
            <button
              class="py-2 px-4 rounded bg-light-100 font-semibold text-sm text-slate-950 hover:bg-light-700 transition-colors"
              :disabled="form.pending"
              @click="onLogoutClick"
            >
              Logout
            </button>
          </template>
          <template v-else>
            <NuxtLink to="/signup" class="px-3 font-semibold text-white">sign up</NuxtLink>
            <NuxtLink to="/login" class="px-3 font-semibold text-white">Login</NuxtLink>
          </template>
        </div>
      </nav>
    </div>
  </header>
</template>
<!--<script>-->
<!--import axios from "axios";-->

<!--export default {-->

<!--  methods: {-->
<!--    onLogoutClick() {-->
<!--      axios.post(`${this.base_url}/api/mgr/auth/logout`, {-->
<!--        headers: {-->
<!--          Accept: 'application/json',-->
<!--          Authorization: 'Bearer ' + localStorage.getItem('accessToken'),-->
<!--        },-->
<!--      })-->
<!--      localStorage.clear()-->
<!--    },-->
<!--  },-->
<!--};-->
<!--</script>-->
