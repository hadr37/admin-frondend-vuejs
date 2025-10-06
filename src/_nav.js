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
    icon: 'cil-drop',
  },
  {
    component: 'CNavItem',
    name: 'Kategori',
    to: '/Kategori/Kategori',
    icon: 'cil-pencil',
  },
 
]