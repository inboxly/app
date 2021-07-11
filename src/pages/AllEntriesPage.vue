<template>
  <q-page>
    <bar title="All personal feeds">
      <template #left>
        <bar-circular-progress :max="progressMax" :value="progressValue"/>
      </template>
      <template #right>
        <bar-button icon="done" @click="markAllAsRead"/>
        <bar-button icon="more_horiz" @click="showEntryListMenu = true"/>
      </template>
    </bar>
    <entry-list url="/api/entries?unreadOnly=1" @refresh="progressMax = progressValue"/>
    <entry-list-menu-overlay v-model="showEntryListMenu"/>
  </q-page>
</template>

<script>
import { defineComponent } from 'vue'
import Bar from 'components/layout/Bar'
import BarButton from 'components/layout/BarButton'
import BarCircularProgress from 'components/layout/BarCircularProgress'
import EntryList from 'components/common/EntryList'
import EntryListMenuOverlay from 'components/overlays/EntryListMenuOverlay'

export default defineComponent({
  name: 'AllEntriesPage',
  components: { Bar, BarButton, BarCircularProgress, EntryList, EntryListMenuOverlay },
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
