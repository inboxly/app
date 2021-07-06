<template>
  <q-page>
    <bar title="Search" v-show="!focused"/>
    <search-input
      label="Find specific article in your Inboxly"
      @search="search"
      @blur="focused = false"
      @focus="focused = true"
    />
  </q-page>
</template>

<script>
import Bar from 'components/layout/Bar'
import SearchInput from 'components/common/SearchInput'

export default {
  name: 'SearchEntriesPage',
  components: { SearchInput, Bar },
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
