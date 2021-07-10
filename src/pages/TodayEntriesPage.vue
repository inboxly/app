<template>
  <q-page>
    <bar title="Today">
      <template #left>
        <bar-circular-progress/>
      </template>
      <template #right>
        <bar-button icon="done" @click="markAllAsRead"/>
        <bar-button icon="more_horiz" @click="showEntryListMenu = true"/>
      </template>
    </bar>
    <entry-list url="/api/entries?unreadOnly=1&todayOnly=1"/>
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
  name: 'TodayEntriesPage',
  components: { EntryListMenuOverlay, EntryList, BarButton, BarCircularProgress, Bar },
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
