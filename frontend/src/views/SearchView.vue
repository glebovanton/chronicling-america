<template>
  <div>
    <input v-model="search" @input="onSearch" placeholder="Search companies..." />
    <div v-if="companies.length">
      <ul>
        <li v-for="company in companies" :key="company.id">
          <router-link :to="`/company/${company.id}`">{{ company.name }}</router-link>
        </li>
      </ul>
    </div>
    <div v-else>
      No companies found.
    </div>
  </div>
</template>

<script lang="ts">
import { ref } from 'vue';
import axios from 'axios';

export default {
  name: 'SearchView',
  setup() {
    const search = ref('');
    const companies = ref([]);

    const onSearch = async () => {
      if (search.value) {
        const response = await axios.get(`http://localhost:5000/api/companies?search=${search.value}`);
        companies.value = response.data;
      } else {
        companies.value = [];
      }
    };

    return {
      search,
      companies,
      onSearch,
    };
  },
};
</script>
