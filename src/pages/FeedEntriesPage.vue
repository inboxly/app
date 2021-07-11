<template>
  <q-page>
    <bar title="Feed title">
      <template #left>
        <bar-circular-progress :max="progressMax" :value="progressValue"/>
      </template>
      <template #right>
        <bar-button icon="done" @click="markAllAsRead"/>
        <bar-button icon="more_horiz" @click="showEntryListMenu = true"/>
      </template>
    </bar>
    <entry-list :url="url" @refresh="progressMax = progressValue"/>
    <entry-list-menu-overlay v-model="showEntryListMenu"/>
  </q-page>
</template>

<script>
import EntryListMenuOverlay from 'components/overlays/EntryListMenuOverlay'
import EntryList from 'components/common/EntryList'
import BarButton from 'components/layout/BarButton'
import BarCircularProgress from 'components/layout/BarCircularProgress'
import Bar from 'components/layout/Bar'

export default {
  name: 'FeedEntriesPage',
  components: { EntryListMenuOverlay, EntryList, BarButton, BarCircularProgress, Bar },
  data () {
    return {
      showEntryListMenu: false,
      progressMax: 0,
    }
  },
  beforeMount () {
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
