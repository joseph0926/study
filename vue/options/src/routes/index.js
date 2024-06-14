import { createRouter, createWebHistory } from 'vue-router';
import HomePage from '@/components/HomePage.vue';
import ThreadPage from '@/components/ThreadPage.vue';

const routes = [
  { name: 'Home', path: '/', component: HomePage },
  { name: 'Thread', path: '/thread/:id', component: ThreadPage }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;
