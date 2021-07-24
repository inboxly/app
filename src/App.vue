<template>
  <router-view :key="$route.fullPath"/>
</template>
<script>
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'App',
  async preFetch({store}) {
    await store.dispatch('fetchCategories')
    await store.dispatch('fetchCollections')
  },
})
</script>
