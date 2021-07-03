<template>
  <q-header reveal bordered class="bg-black text-white">
    <q-toolbar class="row">
      <div class="col text-left">
        <q-circular-progress
          show-value
          class="text-white q-ml-xs"
          :max="875"
          :value="142"
          size="1.6rem"
          color="white"
          track-color="grey"
        />
      </div>

      <q-toolbar-title class="text-center text-subtitle1 col-7">
        {{ title }}
      </q-toolbar-title>

      <div class="col text-right">
        <q-btn dense flat round icon="done"/>
        <q-btn dense flat round icon="more_horiz"/>
      </div>
    </q-toolbar>
  </q-header>
</template>

<script>
export default {
  name: 'TopToolbar',
  props: {
    title: {
      type: String,
      default: '',
    },
  },
  setup () {
    return {}
  }
}
</script>
