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
          :class="{'text-primary': !['saved', 'index', 'add', 'search'].includes($route.name)}"
        />
        <q-btn icon="bookmark_border" :to="{name: 'saved'}" :class="{'text-primary': $route.name === 'saved'}"/>
        <q-btn icon="grid_view" :to="{name: 'index'}" :class="{'text-primary': $route.name === 'index'}"/>
        <q-btn icon="add" :to="{name: 'add'}" :class="{'text-primary': $route.name === 'add'}"/>
        <q-btn icon="search" :to="{name: 'search'}" :class="{'text-primary': $route.name === 'search'}"/>
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
