<template>
  <q-page>
    <bar title="Category title">
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
import Bar from 'components/layout/Bar'
import BarCircularProgress from 'components/layout/BarCircularProgress'
import BarButton from 'components/layout/BarButton'
import EntryList from 'components/common/EntryList'
import EntryListMenuOverlay from 'components/overlays/EntryListMenuOverlay'
export default {
  name: 'CategoryEntriesPage',
  components: { EntryListMenuOverlay, EntryList, BarButton, BarCircularProgress, Bar },
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
      this.$api.post(`/api/read/categories/${this.$route.params.categoryId}`).then(() => {
        this.$store.commit('setEntries', [])
      })
    },
  },
  computed: {
    url () {
      const categoryId = this.$route.params.categoryId
      return `/api/categories/${categoryId}/entries?unreadOnly=1`
    },
    progressValue () {
      return this.$store.getters.getCategoryEntriesCount(parseInt(this.$route.params.categoryId))
    },
  },
}
</script>
