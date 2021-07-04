<template>
  <q-page>
    <top-bar title="Add content" v-show="!focused">
      <template #right>
        <choose-language-button/>
      </template>
    </top-bar>
    <search-input
      label="Type a query or URL"
      @search="explore"
      @blur="focused = false"
      @focus="focused = true"
    />
  </q-page>
</template>

<script>
import TopBar from 'components/TopBar'
import ChooseLanguageButton from 'components/ChooseLanguageButton'
import SearchInput from 'components/SearchInput'

export default {
  name: 'PageAdd',
  data () {
    return {
      focused: false,
      icon: 'search',
    }
  },
  components: { SearchInput, ChooseLanguageButton, TopBar },
  methods: {
    explore (query) {
      console.log('Sent a query to explore: ' + query)
      this.$axios.post('http://127.0.0.1:8000/api/explore?api_token=api_token', { query }).
        then(response => console.log(response.data))
    },
  },
}
</script>
