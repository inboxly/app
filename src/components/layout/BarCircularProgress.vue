<template>
  <q-circular-progress
    show-value
    reverse
    class="text-white q-ml-xs text-bold"
    :max="max"
    :value="value"
    size="1.6rem"
    color="white"
    track-color="grey-7"
  />
</template>

<script>
export default {
  name: 'BarCircularProgress',
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
}
</script>
