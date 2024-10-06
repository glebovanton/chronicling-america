import { createRouter, createWebHistory } from 'vue-router';
import AboutView from '../views/AboutView.vue';
import SearchView from '../views/SearchView.vue';
import CompanyDetailView from '../views/CompanyDetailView.vue';
import NotFoundView from '../views/NotFoundView.vue';

const routes = [
  {
    path: `/`,
    name: 'Home',
    component: SearchView,
  },
  {
    path: `/company/:id`,
    name: 'CompanyDetail',
    component: CompanyDetailView,
  },
  {
    path: `/about`,
    name: 'About',
    component: AboutView,
  },
  {
    path: `/:pathMatch(.*)*`,
    name: 'NotFound',
    component: NotFoundView,
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.VITE_C_BASE_URL),
  routes,
});

export default router;
