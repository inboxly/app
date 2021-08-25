<template>
  <q-btn-group spread class="q-pa-xs">
    <q-btn
      size="1rem"
      icon="subject"
      @click="toggleLeftDrawer"
      :class="{ 'text-primary': ![
            'all-entries',
            'read-later-entries',
            'search-entries',
            'search-feeds'
          ].includes(route.name) }"
    />
    <q-btn
      size="1rem"
      icon="bookmark_border"
      :to="{name: 'read-later-entries'}"
      :class="{'text-primary': route.name === 'read-later-entries'}"
    />
    <q-btn
      size="1rem"
      icon="grid_view"
      :to="{name: 'all-entries'}"
      :class="{'text-primary': route.name === 'all-entries'}"
    />
    <q-btn
      size="1rem"
      icon="add"
      :to="{name: 'search-feeds'}"
      :class="{'text-primary': route.name === 'search-feeds'}"
    />
    <q-btn
      size="1rem"
      icon="search"
      :to="{name: 'search-entries'}"
      :class="{'text-primary': route.name === 'search-entries'}"
    />
  </q-btn-group>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useRoute } from "vue-router"

export default defineComponent({
  name: 'BottomNavigation',
  setup (_, {emit}) {
    const route = useRoute()

    function toggleLeftDrawer () {
      emit('toggleLeftDrawer')
    }

    return {toggleLeftDrawer, route}
  },
})
</script>
