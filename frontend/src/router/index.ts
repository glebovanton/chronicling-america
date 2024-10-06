import { createRouter, createWebHistory } from 'vue-router';
import AboutView from '../views/AboutView.vue';
import SearchView from '../views/SearchView.vue';
import CompanyDetailView from '../views/CompanyDetailView.vue';
import NotFoundView from '../views/NotFoundView.vue';

const prefix = import.meta.env.VITE_C_ENV === 'git' ? '/chronicling-america-fe' : '';

console.log('!!!import.meta.env.VITE_C_ENV', import.meta.env.VITE_C_ENV);

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
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: NotFoundView,
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.VITE_C_BASE_URL),
  routes,
});

export default router;
