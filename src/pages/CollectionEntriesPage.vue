<template>
  <q-page>
    <toolbar :title="collection.title">
      <template #left>
        <toolbar-progress/>
      </template>
      <template #right>
        <toolbar-button icon="done" @click="markAllAsRead"/>
        <toolbar-button icon="more_horiz" @click="showEntryListMenu = true"/>
      </template>
    </toolbar>
    <entry-list :url="url"/>
    <entry-list-menu-overlay v-model="showEntryListMenu"/>
  </q-page>
</template>

<script lang="ts">
import {computed, defineComponent, ref} from "vue";
import {useRoute} from "vue-router";
import {useStore} from "vuex";
import {api} from "boot/axios";
import CollectionType from "src/types/CollectionType";
import EntryList from 'components/common/EntryList.vue'
import EntryListMenuOverlay from 'components/overlays/EntryListMenuOverlay.vue'
import Toolbar from 'components/layout/Toolbar.vue'
import ToolbarButton from 'components/layout/ToolbarButton.vue'
import ToolbarProgress from 'components/layout/ToolbarProgress.vue'

export default defineComponent({
  name: 'CollectionEntriesPage',
  components: {EntryList, EntryListMenuOverlay, Toolbar, ToolbarButton, ToolbarProgress},
  setup() {
    const route = useRoute()
    const store = useStore()
    const showEntryListMenu = ref(false)
    const url = computed(() => `/api/collections/${route.params.collectionId}/entries?unreadOnly=1`)
    const collection = computed(() => {
      const foundCollection = store.state.collections.find(
        (collection: CollectionType) => collection.id === +route.params.collectionId
      )
      return foundCollection || {}
    })

    function markAllAsRead() {
      api.post(`/api/read/collections/${route.params.collectionId}`)
    }

    return {showEntryListMenu, url, collection, markAllAsRead}
  },
});
</script>
