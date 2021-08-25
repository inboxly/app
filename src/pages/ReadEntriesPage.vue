<template>
  <q-page>
    <toolbar title="Recently Read">
      <template #left>
        <toolbar-progress/>
      </template>
      <template #right>
        <toolbar-button icon="more_horiz" @click="showEntryListMenu = true"/>
      </template>
    </toolbar>
    <entry-list no-mark-read url="/api/entries?state=read"/>
    <entry-list-menu-overlay v-model="showEntryListMenu"/>
  </q-page>
</template>

<script lang="ts">
import {defineComponent, ref} from "vue";
import EntryList from 'components/common/EntryList.vue'
import EntryListMenuOverlay from 'components/overlays/EntryListMenuOverlay.vue'
import Toolbar from 'components/layout/Toolbar.vue'
import ToolbarButton from 'components/layout/ToolbarButton.vue'
import ToolbarProgress from 'components/layout/ToolbarProgress.vue'

export default defineComponent({
  name: 'ReadEntriesPage',
  components: {EntryList, EntryListMenuOverlay, Toolbar, ToolbarButton, ToolbarProgress},
  setup() {
    const showEntryListMenu = ref(false)
    return {showEntryListMenu}
  },
});
</script>
