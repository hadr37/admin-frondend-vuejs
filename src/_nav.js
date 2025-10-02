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
    to: '/admin/Barang',
    icon: 'cil-drop',
  },
  {
    component: 'CNavItem',
    name: 'Kategori',
    to: '/admin/Kategori',
    icon: 'cil-pencil',
  },
 
]