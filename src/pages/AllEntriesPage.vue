<template>
  <q-page>
    <top-bar title="All personal feeds">
      <template #left>
        <progress-counter/>
      </template>
      <template #right>
        <done-button/>
        <more-button @click="moreMenu = true"/>
      </template>
    </top-bar>

    <entry-list url="http://127.0.0.1:8000/api/entries?unreadOnly=1&api_token=api_token"/>
    <entry-list-more-menu v-model="moreMenu"/>
  </q-page>
</template>

<script>
import { defineComponent } from 'vue'
import EntryList from 'components/entry-list/EntryList'
import TopBar from 'components/top-bar/TopBar'
import ProgressCounter from 'components/top-bar/ProgressCounter'
import EntryListMoreMenu from 'components/entry-list/EntryListMoreMenu'
import DoneButton from 'components/top-bar/DoneButton'
import MoreButton from 'components/top-bar/MoreButton'

export default defineComponent({
  name: 'AllEntriesPage',
  components: { MoreButton, DoneButton, EntryListMoreMenu, ProgressCounter, TopBar, EntryList },
  data () {
    return {
      moreMenu: false,
    }
  },
})
</script>
