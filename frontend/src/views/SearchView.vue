<script lang="ts" setup>
import { ref, watch, onBeforeUnmount } from 'vue';
import { useCompanyStore } from '@/stores/company'

const searchDelay = 500;
const companyStore = useCompanyStore();
const { fetchCompaniesByKey, setCompaniesByKey, setSearchValue } = companyStore;
const search = ref(companyStore.searchValue);
let timeout: ReturnType<typeof setTimeout> | null = null;

watch(search, (newValue: string) => {
  setSearchValue(newValue);

  if (timeout) clearTimeout(timeout);

  timeout = setTimeout(async () => {
    if (newValue) {
      await fetchCompaniesByKey(newValue);
    } else {
      setCompaniesByKey(null);
    }
  }, searchDelay);
});

onBeforeUnmount(() => {
  if (timeout) clearTimeout(timeout);
});
</script>

<template>
  <div class="w-full mb-16 px-4 text-center text-gray-800 dark:text-gray-300">
    <input v-model.trim="search" class="h-[2.5rem] px-3 w-full border border-white border-opacity-40 bg-white bg-opacity-80 shadow-lg shadow-black/[0.03] backdrop-blur-[0.5rem] top-6 w-4/5 rounded-full dark:bg-gray-950 dark:border-black/40 dark:bg-opacity-75" placeholder="Search companies" />
    <div class="mt-4">
      <template v-if="companyStore.companiesByKey?.length">
        <ul class="p-4 mx-10 bg-slate-200/20 rounded">
          <li v-for="({id, company}, index) in companyStore.companiesByKey" :key="`company-${index}`">
            <router-link :to="`/company/${id}`">{{ company }}</router-link>
          </li>
        </ul>
      </template>
      <p v-else>
        No companies found
      </p>
    </div>
  </div>
</template>
