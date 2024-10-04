import { createRouter, createWebHistory } from 'vue-router';
import AboutView from '../views/AboutView.vue';
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
  {
    path: '/about',
    name: 'About',
    component: AboutView,
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.VITE_BASE_URL),
  routes,
});

export default router;
