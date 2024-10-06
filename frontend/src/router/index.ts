import { createRouter, createWebHistory } from 'vue-router';
import AboutView from '../views/AboutView.vue';
import SearchView from '../views/SearchView.vue';
import CompanyDetailView from '../views/CompanyDetailView.vue';

const prefix = import.meta.env.VITE_C_ENV === 'git' ? '/chronicling-america-fe' : '';

const routes = [
  {
    path: `${prefix}/`,
    name: 'Home',
    component: SearchView,
  },
  {
    path: `${prefix}/company/:id`,
    name: 'CompanyDetail',
    component: CompanyDetailView,
  },
  {
    path: `${prefix}/about`,
    name: 'About',
    component: AboutView,
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.VITE_C_BASE_URL),
  routes,
});

export default router;
