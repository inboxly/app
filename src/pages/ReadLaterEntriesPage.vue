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
    <entry-list :url="url"/>
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
import {useStore} from "vuex";

export default defineComponent({
  name: 'ReadLaterEntriesPage',
  components: { EntryList, EntryListMenuOverlay, Toolbar, ToolbarButton, ToolbarProgress },
  setup () {
    const store = useStore()
    const showEntryListMenu = ref(false)
    const readLaterCollectionId = store.state.profile.read_later_collection_id
    const url = ref(`/api/collections/${readLaterCollectionId}/entries`)

    function markAllAsRead() {
      api.post(`/api/read/collections/${readLaterCollectionId}`)
    }

    return {showEntryListMenu, url, markAllAsRead}
  },
})
</script>
