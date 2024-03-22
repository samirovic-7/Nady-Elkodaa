<template>
  <div class="container">
    <h1 class="title">Welcome to My Home Page</h1>
    <p class="description">authentication Task using Nuxt3</p>
     <PageDescription />
  </div>
</template>

<style>
/* CSS */
.container {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
  text-align: center;
}

.title {
  font-size: 3.5em;
  color: white;
  margin-bottom: 20px;
}

.description {
  font-size: 2.2em;
  color: white;
  margin-bottom: 40px;
}

.user-info {
  background-color: #f5f5f5;
  padding: 10px;
  border-radius: 5px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

.username {
  font-size: 1.1em;
  color: #333;
}

</style>
