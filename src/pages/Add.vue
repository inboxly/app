<template>
  <q-page>
    <top-bar title="Add content"/>
    <div class="q-pa-md">
      <q-input
        ref="input"
        v-model="query"
        label="Type a query or URL"
        debounce="1000"
        clearable
        @focus="icon = 'arrow_back'"
        @blur="icon = 'search'"
        @update:model-value="explore"
      >
        <template v-slot:prepend>
          <q-btn dense round :icon="icon" @click="$refs.input.blur()"/>
        </template>
      </q-input>
    </div>
  </q-page>
</template>

<script>
import TopBar from 'components/TopBar'

export default {
  name: 'PageAdd',
  data () {
    return {
      query: '',
      icon: 'search',
    }
  },
  components: { TopBar },
  methods: {
    explore (query) {
      const trimmedQuery = (query || '').trim()
      if (!trimmedQuery) {
        return
      }
      console.log('Sent a query to explore: ' + trimmedQuery)
      this.$axios.post('http://127.0.0.1:8000/api/explore?api_token=api_token', { query: trimmedQuery }).
        then(response => console.log(response.data))
    },
  },
}
</script>
