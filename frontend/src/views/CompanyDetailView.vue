<template>
  <div v-if="company">
    <h1>{{ company.name }}</h1>
    <p><strong>CEO:</strong> {{ company.ceo }}</p>
    <!-- Display more company details -->
  </div>
</template>

<script lang="ts">
import { ref, onMounted } from 'vue';
import axios from 'axios';
import { useRoute } from 'vue-router';

export default {
  name: 'CompanyDetailView',
  setup() {
    const company = ref(null);
    const route = useRoute();

    onMounted(async () => {
      const response = await axios.get(`http://localhost:5000/api/companies/${route.params.id}`);
      company.value = response.data;
    });

    return {
      company,
    };
  },
};
</script>
