<template>
  <q-page>
    <top-bar title="Saved" more/>
    <entry-list url="http://127.0.0.1:8000/api/saved/entries?api_token=api_token"/>
  </q-page>
</template>

<script>
import EntryList from 'components/EntryList'
import TopBar from 'components/TopBar'
export default {
  name: 'PageSaved',
  components: {TopBar, EntryList },
}
</script>
