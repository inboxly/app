<template>
  <q-slide-transition>
    <q-header reveal class="bg-black text-white">
      <q-toolbar class="row">
        <div class="col text-left q-gutter-x-xs">
          <slot name="left"/>
        </div>

        <q-toolbar-title class="text-center text-subtitle1 col-shrink">
          {{ title }}
        </q-toolbar-title>

        <div class="col text-right q-gutter-x-xs">
          <slot name="right"/>
        </div>
      </q-toolbar>
    </q-header>
  </q-slide-transition>
</template>

<script>
export default {
  name: 'Toolbar',
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
