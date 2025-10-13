export default [
  {
    component: 'CNavItem',
    name: 'Dashboard',
    to: '/dashboard',
    icon: 'cil-speedometer',
    badge: {
      color: 'primary',
      text: 'NEW',
    },
  },
  {
    component: 'CNavTitle',
    name: 'Admin',
  },
  {
    component: 'CNavItem',
    name: 'Barang',
    to: '/Barang/Barang',
    icon: 'cil-basket',
  },
  {
    component: 'CNavItem',
    name: 'Kategori',
    to: '/Kategori/Kategori',
    icon: 'cil-list',
  },
 {
    component: 'CNavItem',
    name: 'User',
    to: '/Users/list',
    icon: 'cil-user',
  },
 
]