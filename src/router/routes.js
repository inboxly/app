const routes = [
  {
    path: '/',
    name: 'main-layout',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      {
        path: '',
        name: 'all-entries',
        component: () => import('pages/AllEntriesPage.vue'),
      },
      {
        path: 'search-feeds',
        name: 'search-feeds',
        component: () => import('pages/SearchFeedsPage.vue'),
      },
      {
        path: 'search-entries',
        name: 'search-entries',
        component: () => import('pages/SearchEntriesPage.vue'),
      },
      {
        path: 'saved-entries',
        name: 'saved-entries',
        component: () => import('pages/SavedEntriesPage.vue'),
      },
    ],
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/Error404Page.vue'),
  },
]

export default routes
