<template>
  <q-circular-progress
    show-value
    class="text-white q-ml-xs"
    :max="875"
    :value="142"
    size="1.6rem"
    color="white"
    track-color="grey"
  />
</template>

<script>
export default {
  name: 'BarCircularProgress',
  setup () {
    return {}
  }
}
</script>
