import { createRouter, createWebHistory } from 'vue-router';
import SearchView from '../views/SearchView.vue';
import CompanyDetailView from '../views/CompanyDetailView.vue';

const routes = [
  {
    path: '/',
    name: 'Home',
    component: SearchView,
  },
  {
    path: '/company/:id',
    name: 'CompanyDetail',
    component: CompanyDetailView,
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.VITE_BASE_URL),
  routes,
});

export default router;
