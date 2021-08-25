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
        path: 'categories/:categoryId/entries',
        name: 'category-entries',
        component: () => import('pages/CategoryEntriesPage.vue'),
      },
      {
        path: 'collections/:collectionId/entries',
        name: 'collection-entries',
        component: () => import('pages/CollectionEntriesPage.vue'),
      },
      {
        path: 'feeds/:feedId/entries',
        name: 'feed-entries',
        component: () => import('pages/FeedEntriesPage.vue'),
      },
      {
        path: 'read',
        name: 'read-entries',
        component: () => import('pages/ReadEntriesPage.vue'),
      },
      {
        path: 'later',
        name: 'read-later-entries',
        component: () => import('pages/ReadLaterEntriesPage'),
      },
      {
        path: 'search/entries',
        name: 'search-entries',
        component: () => import('pages/SearchEntriesPage.vue'),
      },
      {
        path: 'search/feeds',
        name: 'search-feeds',
        component: () => import('pages/SearchFeedsPage.vue'),
      },
      {
        path: 'today',
        name: 'today-entries',
        component: () => import('pages/TodayEntriesPage.vue'),
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
