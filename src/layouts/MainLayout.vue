<template>
  <q-layout view="lHr lpR lFr">

    <q-header reveal bordered class="bg-black text-white">
      <q-toolbar class="row">
        <div class="col text-left">
          <q-circular-progress
            show-value
            class="text-white q-ml-xs"
            :max="875"
            :value="142"
            size="1.6rem"
            color="white"
            track-color="grey"
          />
        </div>

        <q-toolbar-title class="text-center text-subtitle1 col-7">
          All personal feeds
        </q-toolbar-title>

        <div class="col text-right">
          <q-btn dense flat round icon="done"/>
          <q-btn dense flat round icon="more_horiz"/>
        </div>
      </q-toolbar>
    </q-header>

    <q-drawer show-if-above v-model="leftDrawerOpen" side="left" bordered>
     <main-menu/>
    </q-drawer>

    <q-drawer show-if-above v-model="rightDrawerOpen" side="right" bordered>
      <!-- drawer content -->
    </q-drawer>

    <q-page-container>
      <router-view/>
    </q-page-container>

    <q-footer reveal bordered class="bg-black text-white">
      <q-btn-group spread class="q-pa-xs">
        <q-btn dense flat round :ripple="false" icon="subject" @click="toggleLeftDrawer"/>
        <q-btn dense flat round :ripple="false" icon="bookmark_border"/>
        <q-btn dense flat round :ripple="false" icon="grid_view" class="text-primary"/>
        <q-btn dense flat round :ripple="false" icon="add"/>
        <q-btn dense flat round :ripple="false" icon="search"/>
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
