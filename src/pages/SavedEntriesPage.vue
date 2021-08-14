<template>
  <q-page>
    <toolbar title="Read Later">
      <template #left>
        <toolbar-progress/>
      </template>
      <template #right>
        <toolbar-button icon="done" @click="markAllAsRead"/>
        <toolbar-button icon="more_horiz" @click="moreMenu = true"/>
      </template>
    </toolbar>
    <entry-list url="/api/saved/entries"/>
  </q-page>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { api } from 'boot/axios'
import EntryList from 'components/common/EntryList.vue'
import EntryListMenuOverlay from 'components/overlays/EntryListMenuOverlay.vue'
import Toolbar from 'components/layout/Toolbar.vue'
import ToolbarButton from 'components/layout/ToolbarButton.vue'
import ToolbarProgress from 'components/layout/ToolbarProgress.vue'

export default defineComponent({
  name: 'SavedEntriesPage',
  components: { EntryList, EntryListMenuOverlay, Toolbar, ToolbarButton, ToolbarProgress },
  setup () {
    const showEntryListMenu = ref(false)

    function markAllAsRead() {
      api.post('/api/read/saved')
    }

    return {showEntryListMenu, markAllAsRead}
  },
})
</script>
