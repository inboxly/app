<template>
  <q-page>
    <toolbar title="Today">
      <template #left>
        <toolbar-progress/>
      </template>
      <template #right>
        <toolbar-button icon="done" @click="markAllAsRead"/>
        <toolbar-button icon="more_horiz" @click="showEntryListMenu = true"/>
      </template>
    </toolbar>
    <entry-list url="/api/entries?unreadOnly=1&todayOnly=1"/>
    <entry-list-menu-overlay v-model="showEntryListMenu"/>
  </q-page>
</template>

<script lang="ts">
import {defineComponent, ref} from 'vue'
import {useRouter} from "vue-router";
import {api} from "boot/axios";
import EntryList from 'components/common/EntryList.vue'
import EntryListMenuOverlay from 'components/overlays/EntryListMenuOverlay.vue'
import Toolbar from 'components/layout/Toolbar.vue'
import ToolbarButton from 'components/layout/ToolbarButton.vue'
import ToolbarProgress from 'components/layout/ToolbarProgress.vue'

export default defineComponent({
  name: 'TodayEntriesPage',
  components: {EntryList, EntryListMenuOverlay, Toolbar, ToolbarButton, ToolbarProgress},
  setup() {
    const router = useRouter()
    const showEntryListMenu = ref(false)

    function markAllAsRead() {
      api.post(`/api/read/all?todayOnly=1`).then(() => {
        router.push({name: 'all-entries'})
      })
    }

    return {showEntryListMenu, markAllAsRead}
  },
})
</script>
