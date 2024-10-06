<script lang="ts" setup>
import { ref, watch, onBeforeUnmount } from 'vue';
import { useCompanyStore } from '@/stores/company';

const searchDelay = 500;
const companyStore = useCompanyStore();
const { fetchCompaniesByKey, fetchCachedCompaniesByKey, setCompaniesByKey, setSearchValue } = companyStore;
const search = ref(companyStore.searchValue);
const loadedIndexes = ref<number[]>([]);
let timeout: ReturnType<typeof setTimeout> | null = null;

const handleVisibilityChange = (isVisible: boolean, index: number) => {
  if (isVisible && !loadedIndexes.value.includes(index)) {
    loadedIndexes.value.push(index);
  }
};

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
</script>

<template>
    <div class="relative w-4/5 mb-16 text-center text-gray-800 dark:text-gray-300">
        <input
            class="w-full h-[2.5rem] px-3 border border-white border-opacity-40 bg-white bg-opacity-80 shadow-lg
            shadow-black/[0.03] backdrop-blur-[0.5rem] top-6 rounded-full dark:bg-gray-950 dark:border-black/40
            dark:bg-opacity-75"
            placeholder="Search companies"
            v-model.trim="search"
            @keydown.esc.prevent=""
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
            >X
            </span>
        </button>
        <div class="mt-4">
            <template v-if="companyStore.companiesByKey?.length">
                <ul class="p-4 mx-10 bg-slate-200/20 rounded max-h-80 overflow-y-auto custom-scrollbar">
                    <li
                        v-for="({ id, company }, index) in companyStore.companiesByKey"
                        :key="`company-${index}`"
                        v-observe-visibility="(isVisible: boolean) => handleVisibilityChange(isVisible, index)"
                    >
                        <template v-if="loadedIndexes.includes(index)">
                            <RouterLink :to="{ name: 'CompanyDetail', params: { id } }">{{ company }}</RouterLink>
                        </template>
                    </li>
                </ul>
            </template>
            <p v-else>
                No companies found
            </p>
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
</style>
