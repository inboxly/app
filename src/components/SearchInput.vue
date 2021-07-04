<template>
  <div class="q-pa-md">
    <q-input
      borderless
      ref="input"
      v-model="query"
      :label="label"
      debounce="1000"
      clearable
      @focus="focus"
      @blur="blur"
      @update:model-value="search"
    >
      <template #before>
        <q-btn dense round :icon="icon" @click="blur"/>
      </template>
    </q-input>
  </div>
</template>

<script>
export default {
  name: 'SearchInput',
  props: {
    label: {
      type: String,
      default: '',
    },
  },
  data () {
    return {
      query: '',
      focused: false,
    }
  },
  emits: ['search', 'blur', 'focus'],
  methods: {
    search () {
      const trimmedQuery = (this.query || '').trim()
      if (!trimmedQuery) {
        return
      }
      this.$emit('search', this.query)
    },
    focus () {
      this.focused = true;
      this.$emit('focus')
    },
    blur () {
      this.focused = false;
      this.$emit('blur')
    },
  },
  computed: {
    icon () {
      return this.focused ? 'arrow_back' : 'search'
    },
  },
}
</script>
