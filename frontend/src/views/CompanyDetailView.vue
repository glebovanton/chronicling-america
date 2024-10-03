<script lang="ts" setup>
import { onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { useCompanyStore } from '@/stores/company';

const route = useRoute();
const companyStore = useCompanyStore();
const { fetchCompany } = companyStore;

onMounted(async () => {
  await fetchCompany(route.params.id as string);
});

function formatKey (key: string): string {
  return key
      .replace(/([A-Z])/g, ' $1') // Insert space before uppercase letters
      .replace(/_/g, ' ') // Replace underscores with spaces
      .replace(/^\w/, c => c.toUpperCase()); // Capitalize the first letter
}
</script>

<template>
    <div
        v-if="companyStore.company"
        class="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md"
    >
        <h1
            v-if="companyStore.company.company"
            class="text-2xl font-bold mb-4 text-gray-800 dark:text-white"
        >
            {{ companyStore.company.company }}
        </h1>
        <div
            v-for="(value, key) in companyStore.company"
            :key="`company-${key}`"
            class="mb-2"
        >
            <p class="text-gray-700 dark:text-white">
                <strong class="font-semibold text-gray-800 dark:text-white">{{ formatKey(String(key)) }}:</strong>
                {{ value }}
            </p>
        </div>
    </div>
</template>

