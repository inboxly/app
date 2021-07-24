<template>
  <q-dialog
    ref="dialog"
    @hide="$emit('hide')"
    maximized
    transition-show="fade"
    transition-hide="fade"
  >
    <div class="bg-dark">
      <q-toolbar class="row">
        <div class="col text-left">
          <q-btn dense @click="hide" icon="arrow_back"/>
        </div>
        <div class="col text-right">
        </div>
      </q-toolbar>
      <entry :entry="entry">
        <div v-show="entry.text" v-html="entry.text"/>
      </entry>
    </div>
  </q-dialog>
</template>

<script>
import Entry from 'components/common/Entry'

export default {
  name: 'EntryOverlay',
  components: { Entry },
  props: {
    entry: {
      type: Object,
      default: () => {},
    },
  },
  emits: [
    'hide'
  ],
  methods: {
    show () {
      this.$refs.dialog.show()
    },
    hide () {
      this.$refs.dialog.hide()
    },
  },
}
</script>
