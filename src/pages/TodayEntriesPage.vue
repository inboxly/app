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

<script>
import EntryList from 'components/common/EntryList'
import EntryListMenuOverlay from 'components/overlays/EntryListMenuOverlay'
import Toolbar from 'components/layout/Toolbar'
import ToolbarButton from 'components/layout/ToolbarButton'
import ToolbarProgress from 'components/layout/ToolbarProgress'

export default {
  name: 'TodayEntriesPage',
  components: { EntryList, EntryListMenuOverlay, Toolbar, ToolbarButton, ToolbarProgress },
  data () {
    return {
      showEntryListMenu: false,
    }
  },
  methods: {
    markAllAsRead () {
      this.$api.post(`/api/read/all?todayOnly=1`).then(() => {
        this.$router.push({name: 'all-entries'})
      })
    },
  },
}
</script>
