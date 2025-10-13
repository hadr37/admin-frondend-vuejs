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
        component: () => import('@/views/dashboard/Dashboard.vue'),
      },
      {
        path: '/Barang/barang',
        name: 'BarangList',
        component: () => import('@/views/Barang/BarangList.vue'),
      },
      {
        path: '/Barang/barangadd',
        name: 'BarangAdd',
        component: () => import('@/views/Barang/BarangAdd.vue'),
      },
      {
        path: '/Barang/barang/edit/:id',
        name: 'BarangEdit',
        component: () => import('@/views/Barang/BarangEdit.vue'),
        props: true,
      },
      {
        path: '/Kategori/Kategori',
        name: 'KategoriList',
        component: () => import('@/views/Kategori/KategoriList.vue'),
      },
      {
        path: '/Kategori/KategoriAdd',
        name: 'KategoriAdd',
        component: () => import('@/views/Kategori/KategoriAdd.vue'),
      },
      {
        path: '/Users/list',
        name: 'UserList',
        component: () => import('@/views/users/ListUser.vue'),
      },
      {
        path: '/Users/add',
        name: 'UserAdd',
        component: () => import('@/views/users/AddUser.vue'),
      },
      {
        path: '/Users/edit/:id',
        name: 'UserEdit',
        component: () => import('@/views/users/EditUser.vue'),
        props: true,
      },
    ],
  },

  {
    path: '/Kategori/KategoriEdit/:id',
    name: 'KategoriEdit',
    component: () => import('@/views/Kategori/KategoriEdit.vue'),
  },
]

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes,
  scrollBehavior() {
    return { top: 0 }
  },
})

export default router
