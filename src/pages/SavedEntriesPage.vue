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

<script>
import EntryList from 'components/common/EntryList'
import EntryListMenuOverlay from 'components/overlays/EntryListMenuOverlay'
import Toolbar from 'components/layout/Toolbar'
import ToolbarButton from 'components/layout/ToolbarButton'
import ToolbarProgress from 'components/layout/ToolbarProgress'

export default {
  name: 'SavedEntriesPage',
  components: { EntryList, EntryListMenuOverlay, Toolbar, ToolbarButton, ToolbarProgress },
  data () {
    return {
      showEntryListMenu: false,
    }
  },
  methods: {
    markAllAsRead () {
      this.$api.post('/api/read/saved')
    },
  },
}
</script>
