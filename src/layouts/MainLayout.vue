<template>
  <q-layout view="lHr lpR lFr">
    <q-page-container>
      <router-view/>
    </q-page-container>

    <q-drawer show-if-above v-model="leftDrawerOpen" side="left" bordered>
      <main-menu/>
    </q-drawer>

    <q-drawer show-if-above v-model="rightDrawerOpen" side="right" bordered>
      <!-- drawer content -->
    </q-drawer>

    <q-footer reveal bordered class="bg-black text-white">
      <q-btn-group spread class="q-pa-xs">
        <q-btn
          icon="subject"
          @click="toggleLeftDrawer"
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
    </q-footer>

  </q-layout>
</template>

<script>
import { ref } from 'vue'
import MainMenu from 'components/MainMenu'

export default {
  components: { MainMenu },
  setup () {
    const leftDrawerOpen = ref(false)
    const rightDrawerOpen = ref(false)

    return {
      leftDrawerOpen,
      toggleLeftDrawer () {
        leftDrawerOpen.value = !leftDrawerOpen.value
      },

      rightDrawerOpen,
      toggleRightDrawer () {
        rightDrawerOpen.value = !rightDrawerOpen.value
      },
    }
  },
}
</script>
