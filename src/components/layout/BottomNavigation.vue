<template>
  <q-btn-group spread class="q-pa-xs">
    <q-btn
      icon="subject"
      @click="$emit('toggleLeftDrawer')"
      :class="{ 'text-primary': ![
            'index',
            'saved-entries',
            'search-entries',
            'search-feeds'
          ].includes($route.name) }"
    />
    <q-btn
      icon="bookmark_border"
      :to="{name: 'saved-entries'}"
      :class="{'text-primary': $route.name === 'saved-entries'}"
    />
    <q-btn
      icon="grid_view"
      :to="{name: 'all-entries'}"
      :class="{'text-primary': $route.name === 'all-entries'}"
    />
    <q-btn
      icon="add"
      :to="{name: 'search-feeds'}"
      :class="{'text-primary': $route.name === 'search-feeds'}"
    />
    <q-btn
      icon="search"
      :to="{name: 'search-entries'}"
      :class="{'text-primary': $route.name === 'search-entries'}"
    />
  </q-btn-group>
</template>

<script>
export default {
  name: 'BottomNavigation',
}
</script>
