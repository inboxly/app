<template>
  <q-page>
    <bar title="Collection title">
      <template #left>
        <bar-circular-progress/>
      </template>
      <template #right>
        <bar-button icon="done"/>
        <bar-button icon="more_horiz" @click="showEntryListMenu = true"/>
      </template>
    </bar>
    <entry-list :url="url"/>
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
  name: 'CollectionEntriesPage',
  components: { EntryListMenuOverlay, EntryList, BarButton, BarCircularProgress, Bar },
  data () {
    return {
      showEntryListMenu: false,
    }
  },
  computed: {
    url () {
      const collectionId = this.$route.params.collectionId
      return `/api/collections/${collectionId}/entries?unreadOnly=1`
    },
  },
}
</script>
