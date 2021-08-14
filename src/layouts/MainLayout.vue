<template>
  <q-layout view="lHr lpR lFr">
    <q-page-container>
      <router-view/>
    </q-page-container>

    <q-drawer show-if-above v-model="leftDrawerOpen" side="left" bordered>
      <left-navigation @toggle-left-drawer="toggleLeftDrawer"/>
    </q-drawer>

    <q-drawer show-if-above v-model="rightDrawerOpen" side="right" bordered>
      <!-- drawer content -->
    </q-drawer>

    <q-footer reveal bordered class="bg-black text-white">
      <bottom-navigation @toggle-left-drawer="toggleLeftDrawer"/>
    </q-footer>
  </q-layout>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import LeftNavigation from 'components/layout/LeftNavigation.vue'
import BottomNavigation from 'components/layout/BottomNavigation.vue'

export default defineComponent({
  components: { BottomNavigation, LeftNavigation },
  setup () {
    const leftDrawerOpen = ref(false)
    const rightDrawerOpen = ref(false)

    function toggleLeftDrawer () {
      leftDrawerOpen.value = !leftDrawerOpen.value
    }

    function toggleRightDrawer () {
      rightDrawerOpen.value = !rightDrawerOpen.value
    }

    return { leftDrawerOpen, rightDrawerOpen, toggleLeftDrawer, toggleRightDrawer }
  },
})
</script>
