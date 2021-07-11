<template>
  <q-page>
    <toolbar title="All personal feeds">
      <template #left>
        <toolbar-progress :max="progressMax" :value="progressValue"/>
      </template>
      <template #right>
        <toolbar-button icon="done" @click="markAllAsRead"/>
        <toolbar-button icon="more_horiz" @click="showEntryListMenu = true"/>
      </template>
    </toolbar>
    <entry-list url="/api/entries?unreadOnly=1" @refresh="progressMax = progressValue"/>
    <entry-list-menu-overlay v-model="showEntryListMenu"/>
  </q-page>
</template>

<script>
import { defineComponent } from 'vue'
import EntryList from 'components/common/EntryList'
import EntryListMenuOverlay from 'components/overlays/EntryListMenuOverlay'
import Toolbar from 'components/layout/Toolbar'
import ToolbarButton from 'components/layout/ToolbarButton'
import ToolbarProgress from 'components/layout/ToolbarProgress'

export default defineComponent({
  name: 'AllEntriesPage',
  components: { EntryList, EntryListMenuOverlay, Toolbar, ToolbarButton, ToolbarProgress },
  data () {
    return {
      showEntryListMenu: false,
      progressMax: 0,
    }
  },
  beforeMount () {
    this.$store.dispatch('fetchFeedsCounts').then(
      () => this.progressMax = this.progressValue
    )
  },
  methods: {
    markAllAsRead () {
      this.$api.post('/api/read/all').then(() => {
        this.$store.commit('setEntries', [])
      })
    },
  },
  computed: {
    progressValue () {
      return this.$store.getters.getAllEntriesCount
    },
  },
})
</script>
