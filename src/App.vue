<template>
  <router-view :key="route.fullPath"/>
</template>
<script lang="ts">
import { defineComponent } from 'vue'
import { useRoute } from 'vue-router'

export default defineComponent({
  name: 'App',
  async preFetch({store}) {
    await store.dispatch('fetchProfile')
    await store.dispatch('fetchCategories')
    await store.dispatch('fetchCollections')
  },
  setup () {
    const route = useRoute()
    return {route}
  },
})
</script>
