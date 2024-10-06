<script setup lang="ts">
const startYear = 2024;
const copyrightYears = `${startYear}${new Date().getFullYear() <= startYear ? "" : -new Date().getFullYear()}`;
</script>

<template>
    <footer class="fixed z-[1] bottom-0 w-full bg-white dark:bg-gray-800 px-4 py-2 text-center text-gray-500">
        <small class="mb-2 block text-xs">&copy; Copyright: Anton Glebov. {{ copyrightYears }}</small>
        <p class="text-xs">
            <span class="font-semibold">About this website:</span> built with Vue 3
            &amp; Pinia, TypeScript, Tailwind CSS,
            Axios, Github pages.
        </p>
    </footer>

</template>
