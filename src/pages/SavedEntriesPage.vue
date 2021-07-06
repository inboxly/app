<template>
  <q-page>
    <top-bar title="Read Later">
      <template #left>
        <progress-counter/>
      </template>
      <template #right>
        <done-button/>
        <more-button @click="moreMenu = true"/>
      </template>
    </top-bar>
    <entry-list url="http://127.0.0.1:8000/api/saved/entries?api_token=api_token"/>
  </q-page>
</template>

<script>
import EntryList from 'components/entry-list/EntryList'
import TopBar from 'components/top-bar/TopBar'
import ProgressCounter from 'components/top-bar/ProgressCounter'
import DoneButton from 'components/top-bar/DoneButton'
import MoreButton from 'components/top-bar/MoreButton'
export default {
  name: 'SavedEntriesPage',
  components: { MoreButton, DoneButton, ProgressCounter, TopBar, EntryList },
}
</script>
