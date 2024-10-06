<script setup lang="ts">
import { RouterView } from 'vue-router';
import AppHeader from "./components/AppHeader.vue";
import AppFooter from "./components/AppFooter.vue";
import ThemeSwitch from "./components/ThemeSwitch.vue";
</script>

<template>
    <main class="flex flex-col items-center px-4 w-full">
        <AppHeader />
        <img
            alt="Vue logo"
            class="logo"
            height="150"
            src="src/assets/logo.png"
            width="150"
        >
        <RouterView />
        <ThemeSwitch />
        <AppFooter />
    </main>
</template>

<style scoped>
  .logo {
    display: block;
    margin: 0 auto 2rem;
  }
</style>
