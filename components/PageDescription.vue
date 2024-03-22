<script lang="ts" setup>
const currentUser = useAuthUser();
</script>

<template>
  <div class="user-info mb-3 text-lg text-light-100">
    <p class="username">Hi: {{ currentUser ? currentUser.email : "please login" }}</p>
  </div>
</template>
<style>
.user-info {
  background-color:silver;
  padding: 10px;
  border-radius: 5px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

.username {
  font-size: 1.1em;
  color: #333;
}
</style>
