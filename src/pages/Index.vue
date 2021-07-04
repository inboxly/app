<template>
  <q-page>
    <top-bar v-show="true" title="All personal feeds">
      <template #left>
        <progress-counter/>
      </template>
      <template #right>
        <q-btn dense flat round icon="done"/>
        <q-btn dense flat round icon="more_horiz" @click="moreMenu = true"/>
      </template>
    </top-bar>

    <entry-list url="http://127.0.0.1:8000/api/entries?unreadOnly=1&api_token=api_token"/>
    <entry-list-more-menu v-model="moreMenu"/>
  </q-page>
</template>

<script>
import { defineComponent } from 'vue'
import EntryList from 'components/EntryList'
import TopBar from 'components/TopBar'
import ProgressCounter from 'components/ProgressCounter'
import EntryListMoreMenu from 'components/EntryListMoreMenu'

export default defineComponent({
  name: 'PageIndex',
  components: { EntryListMoreMenu, ProgressCounter, TopBar, EntryList },
  data () {
    return {
      moreMenu: false,
    }
  },
})
</script>
