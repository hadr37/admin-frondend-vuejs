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
  path: "/Barang/barang",
  name: "BarangList",
  component: () => import("@/views/Barang/BarangList.vue"),
},
{
  path: "/Barang/barangadd",
  name: "BarangAdd",
  component: () => import("@/views/Barang/BarangAdd.vue"),
},
{
  path: "/Barang/barang/edit/:id",
  name: "BarangEdit",
  component: () => import("@/views/Barang/BarangEdit.vue"),
  props: true,
},

{
  path: '/Kategori/Kategori',
  name: 'KategoriList',
  component: () => import('@/views/Kategori/KategoriList.vue')
},
{
  path: '/Kategori/KategoriAdd',
  name: 'KategoriAdd',
  component: () => import('@/views/Kategori/KategoriAdd.vue')
}
    ],
  },
{
  path: '/Kategori/KategoriEdit/:id',
  name: 'KategoriEdit',
  component: () => import('@/views/Kategori/KategoriEdit.vue'),
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
