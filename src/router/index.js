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
        path: '/Kategori/KategoriEdit/:id',
        name: 'KategoriEdit',
        component: () => import('@/views/Kategori/KategoriEdit.vue'),
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
      {
        path: '/article/artikel',
        name: 'ArticleList',
        component: () => import('@/views/article/ArticleList.vue'),
      },
      {
        path: '/article/artikel/tambah',
        name: 'ArticleCreate',
        component: () => import('@/views/article/ArticleCreate.vue'),
      },
      {
        path: '/article/artikel/edit/:slug',
        name: 'EditArticle',
        component: () => import('@/views/article/EditArticle.vue'),
        props: true,
      },
      {
        path: '/article/artikel/:slug',
        name: 'ArticleDetail',
        component: () => import('@/views/article/ArticleDetail.vue'),
      },
      {
        path: '/pesan/list',
        name: 'PesanList',
        component: () => import('@/views/pesan/pesanlist.vue'),
      },
      {
        path: '/penawaran/list',
        name: 'PenawaranList',
        component: () => import('@/views/penawaran/PenawaranList.vue'),
      },
    ],
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/views/auth/Login.vue'),
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: () => import('@/views/NotFound.vue'),
  },
]


const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes,
  scrollBehavior() {
    return { top: 0 }
  },
})

// 🔒 Middleware Auth Guard
router.beforeEach((to, from, next) => {
  const token = localStorage.getItem('token')
  const userRole = localStorage.getItem('role')

  // Jika belum login dan bukan ke /login → redirect ke login
  if (!token && to.path !== '/login') {
    next('/login')
    return
  }

  // Jika bukan admin dan mau akses dashboard → tolak
  if (to.path.startsWith('/dashboard') && userRole !== 'admin') {
    alert('Akses ditolak. Anda bukan admin.')
    next('/login')
    return
  }

  next()
})

export default router
