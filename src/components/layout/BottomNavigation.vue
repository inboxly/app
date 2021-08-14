<template>
  <q-btn-group spread class="q-pa-xs">
    <q-btn
      size="1rem"
      icon="subject"
      @click="$emit('toggleLeftDrawer')"
      :class="{ 'text-primary': ![
            'all-entries',
            'saved-entries',
            'search-entries',
            'search-feeds'
          ].includes($route.name) }"
    />
    <q-btn
      size="1rem"
      icon="bookmark_border"
      :to="{name: 'saved-entries'}"
      :class="{'text-primary': $route.name === 'saved-entries'}"
    />
    <q-btn
      size="1rem"
      icon="grid_view"
      :to="{name: 'all-entries'}"
      :class="{'text-primary': $route.name === 'all-entries'}"
    />
    <q-btn
      size="1rem"
      icon="add"
      :to="{name: 'search-feeds'}"
      :class="{'text-primary': $route.name === 'search-feeds'}"
    />
    <q-btn
      size="1rem"
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
