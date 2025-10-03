import { h, resolveComponent } from 'vue'
import { createRouter, createWebHashHistory } from 'vue-router'

import DefaultLayout from '@/layouts/DefaultLayout'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: DefaultLayout,
    redirect: '/dashboard',
    children: [
      {
        path: '/dashboard',
        name: 'Dashboard',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () =>
          import(
            /* webpackChunkName: "dashboard" */ '@/views/dashboard/Dashboard.vue'
          ),
      },
      {
        path: '/admin',
        name: 'admin',
        redirect: '/admin/Barang',
      },
      {
        path: '/admin/Barang',
        name: 'Barang',
        component: () => import('@/views/admin/Barang.vue'),
      },
{
  path: '/admin/Kategori',
  name: 'KategoriList',
  component: () => import('@/views/admin/KategoriList.vue')
},
{
  path: '/admin/KategoriAdd',
  name: 'KategoriAdd',
  component: () => import('@/views/admin/KategoriAdd.vue')
}
    ],
  },
{
  path: '/admin/KategoriEdit/:id',
  name: 'KategoriEdit',
  component: () => import('@/views/admin/KategoriEdit.vue'),
  // props: true
}


]

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes,
  scrollBehavior() {
    // always scroll to top
    return { top: 0 }
  },
})

export default router
