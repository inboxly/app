<template>
  <q-page>
    <toolbar :title="category.title">
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
  name: 'CategoryEntriesPage',
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
    category() {
      const category = this.$store.state.categories.find(category => category.id === parseInt(this.$route.params.categoryId))
      return category || {}
    },
  },
}
</script>
