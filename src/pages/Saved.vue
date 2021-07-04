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
import EntryList from 'components/EntryList'
import TopBar from 'components/TopBar'
import ProgressCounter from 'components/ProgressCounter'
import DoneButton from 'components/DoneButton'
import MoreButton from 'components/MoreButton'
export default {
  name: 'PageSaved',
  components: { MoreButton, DoneButton, ProgressCounter, TopBar, EntryList },
}
</script>
