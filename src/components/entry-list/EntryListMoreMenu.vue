<template>
  <q-dialog
    :value='value' @input="newValue => $emit('input', newValue)"
    transition-show="slide-up" transition-hide="slide-down" maximized auto-close
  >
    <div class="bg-dark">
      <top-bar title="Customize feed">
        <template #right>
          <q-btn dense>Done</q-btn>
        </template>
      </top-bar>
    </div>
  </q-dialog>
</template>

<script>
import TopBar from 'components/top-bar/TopBar'
export default {
  name: 'EntryListMoreMenu',
  components: { TopBar },
  props: ['value'],
  setup () {
    return {}
  },
}
</script>
