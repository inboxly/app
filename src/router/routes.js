const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', name: 'index', component: () => import('pages/Index.vue') },
      { path: 'add', name: 'add', component: () => import('pages/Add.vue') },
      { path: 'saved', name: 'saved', component: () => import('pages/Saved.vue') },
      { path: 'search', name: 'search', component: () => import('pages/Search.vue') },
    ],
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/Error404.vue'),
  },
]

export default routes
