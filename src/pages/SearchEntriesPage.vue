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

<script lang="ts">
import {defineComponent, ref} from "vue";
import SearchInput from 'components/common/SearchInput.vue'
import Toolbar from 'components/layout/Toolbar.vue'

export default defineComponent({
  name: 'SearchEntriesPage',
  components: {SearchInput, Toolbar},
  setup() {
    const focused = ref(false)

    function search(query) {
      console.log('Search: ' + query)
    }

    return {focused, search}
  },
});
</script>
