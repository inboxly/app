<template>
  <q-dialog
    :value='value' @input="newValue => $emit('input', newValue)"
    transition-show="slide-up" transition-hide="slide-down" maximized auto-close
  >
    <div class="bg-dark ">
        <q-toolbar class="row">
          <div class="col text-left"></div>
          <q-toolbar-title class="text-center text-subtitle1 col-7">
            Customize feed
          </q-toolbar-title>
          <div class="col text-right">
            <q-btn dense>Done</q-btn>
          </div>
        </q-toolbar>
    </div>
  </q-dialog>
</template>

<script>
export default {
  name: 'EntryListMenuOverlay',
  props: ['value'],
  setup () {
    return {}
  },
}
</script>
