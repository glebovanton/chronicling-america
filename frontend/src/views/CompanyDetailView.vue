<script lang="ts" setup>
import { onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { useCompanyStore } from '@/stores/company';

const route = useRoute();
const companyStore = useCompanyStore();
const { company, fetchCompany } = companyStore;

onMounted(async () => {
  console.log('!!!', route.params);
  await fetchCompany(route.params.id as string);
});

function formatKey(key: string): string {
  return key
      .replace(/([A-Z])/g, ' $1') // Insert space before uppercase letters
      .replace(/_/g, ' ') // Replace underscores with spaces
      .replace(/^\w/, (c) => c.toUpperCase()); // Capitalize the first letter
};
</script>

<template>
  <div v-if="company" class="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md">
    <h1 v-if="company.company" class="text-2xl font-bold mb-4 text-gray-800 dark:text-white">
      {{ company.company }}
    </h1>
    <div v-for="(value, key) in company" :key="`company-${String(key)}`" class="mb-2">
      <p class="text-gray-700 dark:text-gray-800">
        <strong class="font-semibold text-gray-800 dark:text-white">{{ formatKey(String(key)) }}:</strong>
        {{ value }}
      </p>
    </div>
  </div>
</template>

