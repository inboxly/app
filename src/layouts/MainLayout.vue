<template>
  <q-layout view="lHr lpR lFr">
    <q-page-container>
      <router-view/>
    </q-page-container>

    <q-drawer show-if-above v-model="leftDrawerOpen" side="left" bordered>
      <left-navigation/>
    </q-drawer>

    <q-drawer show-if-above v-model="rightDrawerOpen" side="right" bordered>
      <!-- drawer content -->
    </q-drawer>

    <q-footer reveal bordered class="bg-black text-white">
      <bottom-navigation @toggle-left-drawer="toggleLeftDrawer"/>
    </q-footer>
  </q-layout>
</template>

<script>
import { ref } from 'vue'
import LeftNavigation from 'components/layout/LeftNavigation'
import BottomNavigation from 'components/layout/BottomNavigation'

export default {
  components: { BottomNavigation, LeftNavigation },
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
