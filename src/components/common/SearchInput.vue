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

<script lang="ts">
import {computed, ComputedRef, defineComponent, ref} from 'vue'

export default defineComponent({
  name: 'SearchInput',
  props: {
    label: {
      type: String,
      default: '',
    },
  },
  setup(props, {emit}) {
    const query = ref('')
    const focused = ref(false)
    const icon: ComputedRef<String> = computed(
      () => focused.value ? 'arrow_back' : 'search'
    )

    function search() {
      const trimmedQuery = (query.value || '').trim()
      if (!trimmedQuery) {
        return
      }
      emit('search', query.value)
    }

    function focus() {
      focused.value = true
      emit('focus')
    }

    function blur() {
      focused.value = false
      emit('blur')
    }

    return {query, focused, icon, search, focus, blur}
  },
})
</script>
