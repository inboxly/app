<template>
  <q-slide-transition>
    <q-header reveal bordered class="bg-black text-white">
      <q-toolbar class="row">
        <div class="col text-left">
          <slot name="left"/>
        </div>

        <q-toolbar-title class="text-center text-subtitle1 col-7">
          {{ title }}
        </q-toolbar-title>

        <div class="col text-right">
          <slot name="right"/>
        </div>
      </q-toolbar>
    </q-header>
  </q-slide-transition>
</template>

<script>
export default {
  name: 'Bar',
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
