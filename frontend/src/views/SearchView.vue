<script lang="ts" setup>
import { ref, watch, onBeforeUnmount, computed } from 'vue';
import Multiselect from 'vue-multiselect';
import 'vue-multiselect/dist/vue-multiselect.min.css';
import { useCompanyStore } from '@/stores/company';

const searchDelay = 500;
const companyStore = useCompanyStore();
const { fetchCompaniesByKey, fetchCachedCompaniesByKey, setCompaniesByKey, setSearchValue } = companyStore;
const search = ref(companyStore.searchValue);
const selectedColumns = ref<{ key: string; label: string }[]>([
  { key: 'company', label: 'Company' },
  { key: 'ticker', label: 'Ticker' },
  { key: 'ceo', label: 'CEO' },
]);

let timeout: ReturnType<typeof setTimeout> | null = null;

const allColumns = [
  { key: 'company', label: 'Company' },
  { key: 'rank', label: 'Rank' },
  { key: 'ticker', label: 'Ticker' },
  { key: 'sector', label: 'Sector' },
  { key: 'industry', label: 'Industry' },
  { key: 'ceo', label: 'CEO' },
  { key: 'country', label: 'Country' },
  { key: 'marketcap_march28_m', label: 'Market Cap (March 28)' },
];

watch(search, (newValue: string) => {
  setSearchValue(newValue);

  if (timeout) clearTimeout(timeout);

  timeout = setTimeout(async () => {
    if (newValue) {
      if (import.meta.env.VITE_C_ENV === 'git') {
        await fetchCachedCompaniesByKey(newValue);
      } else {
        await fetchCompaniesByKey(newValue);
      }
    } else {
      setCompaniesByKey(null);
    }
  }, searchDelay);
});

onBeforeUnmount(() => {
  if (timeout) clearTimeout(timeout);
});

const selectedColumnsSet = computed(() =>
  new Set(selectedColumns.value.map((column) => column.key))
);

const filteredColumns = computed(() =>
  allColumns.filter((column) => selectedColumnsSet.value.has(column.key))
);
</script>

<template>
  <div class="relative w-4/5 mb-16 text-center text-gray-800 dark:text-gray-300">
    <input
      class="w-full h-[2.5rem] px-3 border border-white border-opacity-40 bg-white bg-opacity-80 shadow-lg
      shadow-black/[0.03] backdrop-blur-[0.5rem] top-6 rounded-full dark:bg-gray-950 dark:border-black/40
      dark:bg-opacity-75"
      placeholder="Search companies"
      v-model.trim="search"
      @keydown.esc.prevent="setCompaniesByKey(null)"
    />
    <button v-if="search" type="button" @click="search = ''">
      <span
        class="absolute top-0 right-4 text-gray-500 hover:text-gray-700 dark:text-gray-400
        dark:hover:text-gray-300"
        style="transform: translateX(-50%) translateY(50%) translateZ(0px);"
      >X</span>
    </button>

    <div class="mt-4 text-left">
      <label for="columns" class="block mb-2 font-semibold">Select Columns to Display:</label>
      <Multiselect
        v-model="selectedColumns"
        :options="allColumns"
        track-by="key"
        label="label"
        placeholder="Select columns"
        :multiple="true"
        :close-on-select="false"
      />
    </div>

    <div class="mt-4 overflow-x-auto">
      <table class="min-w-full bg-white dark:bg-gray-800 rounded-md">
        <thead>
        <tr class="bg-gray-200 dark:bg-gray-700">
          <th
            v-for="column in filteredColumns"
            :key="column.key"
            class="py-2 px-4"
          >
            {{ column.label }}
          </th>
        </tr>
        </thead>
        <tbody>
        <template v-if="companyStore.companiesByKey?.length">
          <tr
            v-for="(companyData, index) in companyStore.companiesByKey"
            :key="`company-${index}`"
            class="odd:bg-white even:bg-gray-50 dark:odd:bg-gray-800 dark:even:bg-gray-900"
          >
            <td
              v-for="column in filteredColumns"
              :key="`column-${column.key}-${index}`"
              class="py-2 px-4"
            >
              <RouterLink v-if="column.key === 'company'" :to="{ name: 'CompanyDetail', params: { id: companyData.id } }">
                {{ companyData[column.key] }}
              </RouterLink>
              <span v-else>{{ companyData[column.key] }}</span>
            </td>
          </tr>
        </template>
        <tr v-else>
          <td :colspan="filteredColumns.length" class="py-4 text-center">
            No companies found
          </td>
        </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.custom-scrollbar {
  overflow-y: auto;

  &::-webkit-scrollbar {
    width: 8px;
  }

  &::-webkit-scrollbar-track {
    background: rgba(203, 213, 225, 0.3);
    border-radius: 50px;
  }

  &::-webkit-scrollbar-thumb {
    background-color: #64748b;
    border-radius: 50px;
    border: 2px solid rgba(203, 213, 225, 0.3);
  }

  scrollbar-width: thin;
  scrollbar-color: #64748b rgba(203, 213, 225, 0.3);
}

:deep(.multiselect) {
  .multiselect__tag {
    background-color: #374151;
    border-radius: 0.375rem;
    color: #f9fafb;
  }
  .multiselect__option--highlight {
    background-color: #e5e7eb;
    color: #f9fafb;
    &:after {
      background: #6B7280;
    }
  }
  .multiselect__option--selected {
    background-color: #c3c3c3;
    color: #f9fafb;
    .multiselect__option--highlight {
      &:after {
        background: #ffafaf;
      }
    }
  }
}
</style>
