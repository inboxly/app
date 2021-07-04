<template>
  <q-page>
    <top-bar title="Read Later">
      <template #left>
        <progress-counter/>
      </template>
      <template #right>
        <q-btn dense flat round icon="done"/>
        <q-btn dense flat round icon="more_horiz"/>
      </template>
    </top-bar>
    <entry-list url="http://127.0.0.1:8000/api/saved/entries?api_token=api_token"/>
  </q-page>
</template>

<script>
import EntryList from 'components/EntryList'
import TopBar from 'components/TopBar'
import ProgressCounter from 'components/ProgressCounter'
export default {
  name: 'PageSaved',
  components: { ProgressCounter, TopBar, EntryList },
}
</script>
