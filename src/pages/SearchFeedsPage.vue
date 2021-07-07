<template>
  <q-page>
    <bar title="Add content" v-show="!focused">
      <template #right>
        <bar-button icon="translate"/>
      </template>
    </bar>
    <search-input
      label="Type a query or URL"
      @search="explore"
      @blur="focused = false"
      @focus="focused = true"
    />
  </q-page>
</template>

<script>
import Bar from 'components/layout/Bar'
import BarButton from 'components/layout/BarButton'
import SearchInput from 'components/common/SearchInput'

export default {
  name: 'SearchFeedsPage',
  data () {
    return {
      focused: false,
      icon: 'search',
    }
  },
  components: { Bar, BarButton, SearchInput },
  methods: {
    explore (query) {
      console.log('Sent a query to explore: ' + query)
      this.$api.post('/api/explore', { query }).
        then(response => console.log(response.data))
    },
  },
}
</script>
