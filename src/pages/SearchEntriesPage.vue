<template>
  <q-page>
    <toolbar title="Search" v-show="!focused"/>
    <search-input
      label="Find specific article in your Inboxly"
      @search="search"
      @blur="focused = false"
      @focus="focused = true"
    />
  </q-page>
</template>

<script>
import SearchInput from 'components/common/SearchInput'
import Toolbar from 'components/layout/Toolbar'

export default {
  name: 'SearchEntriesPage',
  components: { SearchInput, Toolbar },
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
