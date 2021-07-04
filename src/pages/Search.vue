<template>
  <q-page>
    <top-bar title="Search" v-show="!focus"/>
    <div class="q-pa-md">
      <q-input
        ref="input"
        v-model="query"
        label="Find specific article in your Inboxly"
        debounce="1000"
        clearable
        @focus="focus = true"
        @blur="focus = false"
        @update:model-value="search"
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
  name: 'PageSearch',
  components: { TopBar },
  data () {
    return {
      focus: false,
      query: '',
    }
  },
  methods: {
    search () {

    },
  },
}
</script>
