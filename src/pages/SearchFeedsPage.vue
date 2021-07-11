<template>
  <q-page>
    <toolbar title="Add content" v-show="!focused">
      <template #right>
        <toolbar-button icon="translate"/>
      </template>
    </toolbar>
    <search-input
      label="Type a query or URL"
      @search="explore"
      @blur="focused = false"
      @focus="focused = true"
    />
  </q-page>
</template>

<script>
import SearchInput from 'components/common/SearchInput'
import Toolbar from 'components/layout/Toolbar'
import ToolbarButton from 'components/layout/ToolbarButton'

export default {
  name: 'SearchFeedsPage',
  data () {
    return {
      focused: false,
      icon: 'search',
    }
  },
  components: { SearchInput, Toolbar, ToolbarButton },
  methods: {
    explore (query) {
      console.log('Sent a query to explore: ' + query)
      this.$api.post('/api/explore', { query }).
        then(response => console.log(response.data))
    },
  },
}
</script>
