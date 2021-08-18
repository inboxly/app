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

<script lang="ts">
import {defineComponent, ref} from "vue";
import {api} from "boot/axios";
import SearchInput from 'components/common/SearchInput.vue'
import Toolbar from 'components/layout/Toolbar.vue'
import ToolbarButton from 'components/layout/ToolbarButton.vue'

export default defineComponent({
  name: 'SearchFeedsPage',
  components: {SearchInput, Toolbar, ToolbarButton},
  setup() {
    const focused = ref(false)

    function explore(query: string) {
      console.log('Sent a query to explore: ' + query)
      api.post('/api/explore', {query}).then(response => console.log(response.data))
    }

    return {focused, explore}
  },
});
</script>
