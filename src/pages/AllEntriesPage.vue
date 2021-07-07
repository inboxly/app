<template>
  <q-page>
    <bar title="All personal feeds">
      <template #left>
        <bar-circular-progress/>
      </template>
      <template #right>
        <bar-button icon="done"/>
        <bar-button icon="more_horiz" @click="showEntryListMenu = true"/>
      </template>
    </bar>
    <entry-list url="/api/entries?unreadOnly=1"/>
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
    }
  },
})
</script>
