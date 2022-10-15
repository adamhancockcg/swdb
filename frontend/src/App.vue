<script setup>
import {RouterLink, RouterView} from "vue-router";
</script>

<template>
  <header>
    <router-link to="/">
      <div>
        <img class="logo" src="/logo.png" alt="" /></div
    ></router-link>
  </header>

  <RouterView />
</template>

<style scoped>
header {
  font-size: large;

  line-height: 1.5;
  max-height: 100vh;
  text-align: right;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
  width: 500px;
}

nav {
  width: 100%;
  font-size: 12px;
  text-align: center;
  margin-top: 2rem;
}

nav a.router-link-exact-active {
  color: var(--color-text);
}

nav a.router-link-exact-active:hover {
  background-color: transparent;
}

nav a {
  display: inline-block;
  padding: 0 1rem;
  border-left: 1px solid var(--color-border);
}

nav a:first-of-type {
  border: 0;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 3);
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }

  nav {
    text-align: left;
    margin-left: -1rem;
    font-size: 1rem;

    padding: 1rem 0;
    margin-top: 1rem;
  }
}
</style>
