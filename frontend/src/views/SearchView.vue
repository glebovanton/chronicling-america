<script lang="ts" setup>
import { ref, watch, onBeforeUnmount, computed } from 'vue';
import Multiselect from 'vue-multiselect';
import 'vue-multiselect/dist/vue-multiselect.min.css';
import { useCompanyStore } from '@/stores/company';
import { type Column, SortEnum, type  Company } from 'src/types';

const searchDelay = 500;
const companyStore = useCompanyStore();
const { fetchCompaniesByKey, fetchCachedCompaniesByKey, setCompaniesByKey, setSearchValue } = companyStore;
const search = ref(companyStore.searchValue);
const selectedColumns = ref<Column[]>([
  { key: 'company', label: 'Company' },
  { key: 'ticker', label: 'Ticker' },
  { key: 'ceo', label: 'CEO' },
]);

const sortColumn = ref<string | null>(null);
const sortDirection = ref<SortEnum | null>(null);

let timeout: ReturnType<typeof setTimeout> | null = null;

const allColumns: Column[] = [
  { key: 'company', label: 'Company' },
  { key: 'rank', label: 'Rank' },
  { key: 'ticker', label: 'Ticker' },
  { key: 'sector', label: 'Sector' },
  { key: 'industry', label: 'Industry' },
  { key: 'ceo', label: 'CEO' },
  { key: 'country', label: 'Country' },
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
  new Set(selectedColumns.value.map(column => column.key))
);

const filteredColumns = computed(() =>
  allColumns.filter(column => selectedColumnsSet.value.has(column.key))
);

const sortedCompanies = computed<Company[]>(() => {
  if (!sortColumn.value || !sortDirection.value) {
    return companyStore.companiesByKey as Company[];
  }

  return [...(companyStore.companiesByKey || [])].sort((a: Company, b: Company) => {
    const column = sortColumn.value as keyof Company;

    const aValue = a[column];
    const bValue = b[column];

    if (aValue === undefined && bValue === undefined) {
      return 0;
    }

    if (aValue === undefined) {
      return 1;
    }

    if (bValue === undefined) {
      return -1;
    }

    switch (true) {
      case (aValue < bValue):
        return sortDirection.value === SortEnum.asc ? -1 : 1;
      case (aValue > bValue):
        return sortDirection.value === SortEnum.asc ? 1 : -1;
      default:
        return 0;
    }
  });
});

const sortTable = (column: string) => {
  if (sortColumn.value === column) {
    sortDirection.value = sortDirection.value === SortEnum.asc ? SortEnum.desc : SortEnum.asc;
  } else {
    sortColumn.value = column;
    sortDirection.value = SortEnum.asc;
  }
};
</script>

<template>
    <div class="relative w-4/5 mb-16 text-center text-gray-800 dark:text-gray-300">
        <input
            class="w-full h-[2.5rem] px-3 border border-white border-opacity-40 bg-white bg-opacity-80 shadow-lg
      shadow-black/[0.03] backdrop-blur-[0.5rem] top-6 rounded-full dark:bg-gray-950 dark:border-black/40
      dark:bg-opacity-75"
            placeholder="Type to search for companies"
            v-model.trim="search"
            @keydown.esc.prevent="setCompaniesByKey(null)"
        >
        <button
            v-if="search"
            type="button"
            @click="search = ''"
        >
            <span
                class="absolute top-0 right-4 text-gray-500 hover:text-gray-700 dark:text-gray-400
        dark:hover:text-gray-300"
                style="transform: translateX(-50%) translateY(50%) translateZ(0px);"
            >X</span>
        </button>

        <div class="mt-4 text-left">
            <label
                class="block mb-2 font-semibold"
                for="columns"
            >Select Columns to Display:</label>
            <Multiselect
                label="label"
                placeholder="Select columns"
                track-by="key"
                :close-on-select="false"
                :multiple="true"
                :options="allColumns"
                v-model="selectedColumns"
            />
        </div>

        <div class="mt-4 overflow-x-auto overflow-y-auto max-h-80 custom-scrollbar">
            <table class="border-collapse min-w-full bg-white dark:bg-gray-800 rounded-md">
                <thead class="sticky top-0">
                    <tr class="sticky top-0 bg-gray-200 dark:bg-gray-700">
                        <th
                            v-for="column in filteredColumns"
                            :key="column.key"
                            class="sticky top-0 py-2 px-4 cursor-pointer text-left whitespace-nowrap
            overflow-hidden text-ellipsis"
                            @click="sortTable(column.key)"
                        >
                            {{ column.label }}
                            <span class="inline-block w-4 ml-2">
                                <template v-if="sortColumn === column.key">
                                    {{ sortDirection === SortEnum.asc ? '▲' : '▼' }}
                                </template>
                                <template v-else>◆</template>
                            </span>
                        </th>
                    </tr>
                </thead>
                <tbody>
                    <template v-if="sortedCompanies?.length">
                        <tr
                            v-for="(companyData, index) in sortedCompanies"
                            :key="`company-${index}`"
                            class="odd:bg-white even:bg-gray-50 dark:odd:bg-gray-800 dark:even:bg-gray-900"
                        >
                            <td
                                v-for="column in filteredColumns"
                                :key="`column-${column.key}-${index}`"
                                class="py-2 px-4"
                            >
                                <RouterLink
                                    v-if="column.key === 'company'"
                                    :to="{ name: 'CompanyDetail', params: { id: companyData.id } }"
                                >
                                    {{ companyData[column.key as keyof Company] }}
                                </RouterLink>
                                <span v-else>{{ companyData[column.key as keyof Company] }}</span>
                            </td>
                        </tr>
                    </template>
                    <tr v-else>
                        <td
                            class="py-4 text-center"
                            :colspan="filteredColumns.length"
                        >
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
    width: 10px;
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
  }
}
</style>
