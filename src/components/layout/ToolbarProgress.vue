<template>
  <q-circular-progress
    show-value
    reverse
    class="text-white q-ml-xs text-bold"
    :max="max"
    :value="value"
    size="1.6rem"
    font-size=".5rem"
    thickness=".1"
    color="grey-9"
    track-color="white"
  />
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'ToolbarProgress',
  props: {
    max: {
      type: Number,
      default: 0,
    },
    value: {
      type: Number,
      default: 0,
    },
  },
})
</script>
