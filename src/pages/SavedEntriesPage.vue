<template>
  <q-page>
    <bar title="Read Later">
      <template #left>
        <bar-circular-progress/>
      </template>
      <template #right>
        <bar-button icon="done"/>
        <bar-button icon="more_horiz" @click="moreMenu = true"/>
      </template>
    </bar>
    <entry-list url="http://127.0.0.1:8000/api/saved/entries?api_token=api_token"/>
  </q-page>
</template>

<script>
import Bar from 'components/layout/Bar'
import BarButton from 'components/layout/BarButton'
import BarCircularProgress from 'components/layout/BarCircularProgress'
import EntryList from 'components/common/EntryList'

export default {
  name: 'SavedEntriesPage',
  components: { Bar, BarButton, BarCircularProgress, EntryList },
}
</script>
