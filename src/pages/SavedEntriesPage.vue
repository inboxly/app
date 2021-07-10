<template>
  <q-page>
    <bar title="Read Later">
      <template #left>
        <bar-circular-progress/>
      </template>
      <template #right>
        <bar-button icon="done" @click="markAllAsRead"/>
        <bar-button icon="more_horiz" @click="moreMenu = true"/>
      </template>
    </bar>
    <entry-list url="/api/saved/entries"/>
  </q-page>
</template>

<script>
import Bar from 'components/layout/Bar'
import BarButton from 'components/layout/BarButton'
import BarCircularProgress from 'components/layout/BarCircularProgress'
import EntryList from 'components/common/EntryList'
import EntryListMenuOverlay from 'components/overlays/EntryListMenuOverlay'

export default {
  name: 'SavedEntriesPage',
  components: { EntryListMenuOverlay, EntryList, BarButton, BarCircularProgress, Bar },
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
