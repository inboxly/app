<template>
  <q-page>
    <top-bar title="Search" v-show="!focused"/>
    <search-input
      label="Find specific article in your Inboxly"
      @search="search"
      @blur="focused = false"
      @focus="focused = true"
    />
  </q-page>
</template>

<script>
import TopBar from 'components/top-bar/TopBar'
import SearchInput from 'components/SearchInput'

export default {
  name: 'SearchEntriesPage',
  components: { SearchInput, TopBar },
  data () {
    return {
      focused: false,
      query: '',
    }
  },
  methods: {
    search (query) {
      console.log('Search: ' + query)
    },
  },
}
</script>
