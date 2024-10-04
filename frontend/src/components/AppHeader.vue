<script lang="ts" setup>
import { RouterLink, useRoute } from "vue-router";

const linksData = [
  {
    name: "Home",
    title: "Home",
  },
  {
    name: "About",
    title: "About",
  },
];

function isActive (name: string): boolean {
  const route = useRoute();

  return route.name === name;
}
</script>

<template>
    <header class="z-[1] relative">
        <div
            class="flex fixed left-1/2 px-3 border border-white border-opacity-40 bg-white bg-opacity-80 shadow-lg
            shadow-black/[0.03] backdrop-blur-[0.5rem] top-6 h-[3.25rem] w-4/5 rounded-full dark:bg-gray-950
            dark:border-black/40 dark:bg-opacity-75"
            style="
        opacity: 1;
        transform: translateX(-50%) translateY(0px) translateZ(0px);
      "
        >
            <nav class="flex h-12 py-2">
                <ul
                    class="flex flex-wrap items-center justify-center gap-y-1 text-[0.9rem] font-medium text-gray900
                sm:w-[initial] sm:flex-nowrap sm:gap-5"
                >
                    <li
                        v-for="({ name, title }, index) in linksData"
                        :key="`link-${index}`"
                        class="h-3/4 flex items-center justify-center relative"
                        style="opacity: 1; transform: none"
                    >
                        <RouterLink
                            class="flex w-full items-center justify-center px-3 py-3 hover:text-gray-950 transition
                            dark:hover:text-gray-300 text-gray-950 dark:text-gray-200"
                            :to="{ name }"
                        >{{ title }}
                            <span
                                v-show="isActive(name)"
                                class="bg-gray-100 rounded-full absolute inset-0 -z-10 dark:bg-gray-700"
                                style="transform: none; transform-origin: 50% 50% 0"
                            ></span>
                        </RouterLink>
                    </li>
                </ul>
            </nav>
        </div>
    </header>
</template>

<style lang="scss" scoped>
header {
  line-height: 1.5;
  max-height: 100vh;
}
</style>
