<template>
  <q-btn dense flat round :icon="icon">
    <slot/>
  </q-btn>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'ToolbarButton',
  props: {
    icon: {
      type: String,
      default: '',
    },
  },
})
</script>
