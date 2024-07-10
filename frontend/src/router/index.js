import { createRouter, createWebHistory } from 'vue-router';
import ConversationList from '@/components/ConversationList.vue';
import ConversationMessage from '@/components/ConversationMessage.vue';

const routes = [
  {
    path: '/',
    name: 'Conversations',
    component: ConversationList,
  },
  {
    path: '/messages/:id',
    name: 'ConversationMessages',
    component: ConversationMessage,
    props: true,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
