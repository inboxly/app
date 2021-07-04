<template>
  <q-page>
    <top-bar title="Add content" v-show="!focus">
      <template #right>
        <q-btn dense flat round icon="translate"/>
      </template>
    </top-bar>
    <div class="q-pa-md">
      <q-input
        ref="input"
        v-model="query"
        label="Type a query or URL"
        debounce="1000"
        clearable
        @focus="focus = true"
        @blur="focus = false"
        @update:model-value="explore"
      >
        <template #prepend>
          <q-btn dense round :icon="focus ? 'arrow_back' : 'search'" @click="focus && $refs.input.blur()"/>
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
      focus: false,
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
