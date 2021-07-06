<template>
  <q-dialog
    :value='value' @input="newValue => $emit('input', newValue)"
    transition-show="slide-up" transition-hide="slide-down" maximized auto-close
  >
    <div class="bg-dark">
      <bar title="Customize feed">
        <template #right>
          <q-btn dense>Done</q-btn>
        </template>
      </bar>
    </div>
  </q-dialog>
</template>

<script>
import Bar from 'components/layout/Bar'
export default {
  name: 'EntryListMenuOverlay',
  components: { Bar },
  props: ['value'],
  setup () {
    return {}
  },
}
</script>
