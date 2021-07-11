<template>
  <q-page>
    <toolbar :title="feed.title">
      <template #left>
        <toolbar-progress :max="progressMax" :value="progressValue"/>
      </template>
      <template #right>
        <toolbar-button icon="done" @click="markAllAsRead"/>
        <toolbar-button icon="more_horiz" @click="showEntryListMenu = true"/>
      </template>
    </toolbar>
    <entry-list :url="url" @refresh="progressMax = progressValue"/>
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
  name: 'FeedEntriesPage',
  components: { EntryList, EntryListMenuOverlay, Toolbar, ToolbarButton, ToolbarProgress },
  data () {
    return {
      feed: {},
      showEntryListMenu: false,
      progressMax: 0,
    }
  },
  beforeMount () {
    this.$api.get(`/api/feeds/${this.$route.params.feedId}`).then(
      response => this.feed = response.data.data
    )
    this.$store.dispatch('fetchFeedsCounts').then(
      () => this.progressMax = this.progressValue,
    )
  },
  methods: {
    markAllAsRead () {
      this.$api.post(`/api/read/feeds/${this.$route.params.feedId}`).then(() => {
        this.$store.commit('setEntries', [])
      })
    },
  },
  computed: {
    url () {
      const feedId = this.$route.params.feedId
      return `/api/feeds/${feedId}/entries?unreadOnly=1`
    },
    progressValue () {
      return this.$store.getters.getFeedEntriesCount(parseInt(this.$route.params.feedId))
    },
  },
}
</script>
