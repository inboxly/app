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
    <entry-list url="/api/entries?readOnly=1"/>
    <entry-list-menu-overlay v-model="showEntryListMenu"/>
  </q-page>
</template>

<script>
import EntryList from 'components/common/EntryList'
import EntryListMenuOverlay from 'components/overlays/EntryListMenuOverlay'
import Toolbar from 'components/layout/Toolbar'
import ToolbarButton from 'components/layout/ToolbarButton'
import ToolbarProgress from 'components/layout/ToolbarProgress'

export default {
  name: 'ReadEntriesPage',
  components: { EntryList, EntryListMenuOverlay, Toolbar, ToolbarButton, ToolbarProgress },
  data () {
    return {
      showEntryListMenu: false,
    }
  }
}
</script>
