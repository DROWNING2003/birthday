import { test } from 'vitest';
import { createRouter, createWebHistory } from 'vue-router'
import index from '@/pages/index.vue'
import two from '@/pages/second.vue'
import three from '@/pages/three.vue'


const routes = [
  {
    path: '/',
    component: index,
    meta: {
      title: '生日快乐',
    },
  },
  {
    path: '/two',
    component: two,
    meta: {
      title: '生日快乐',
    },
  },
  {
    path: '/three',
    component: three,
    meta: {
      title: '生日快乐',
    },
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
