<template>
  <q-dialog
    ref="dialogRef" @hide="onDialogHide"
    transition-show="fade" transition-hide="fade" maximized
  >
    <div class="bg-dark">
      <q-toolbar class="row">
        <div class="col text-left">
          <q-btn dense @click="dialogRef.hide" icon="arrow_back"/>
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

<script lang="ts">
import {defineComponent, PropType} from "vue";
import {useDialogPluginComponent} from "quasar";
import Entry from 'components/common/Entry.vue'
import EntryType from "src/types/EntryType";

export default defineComponent({
  name: 'EntryOverlay',
  components: {Entry},
  props: {
    entry: {
      type: Object as PropType<EntryType>,
      required: true
    },
    noMarkRead: {
      type: Boolean,
      default: false
    },
  },
  emits: [...useDialogPluginComponent.emits],
  setup() {
    const {dialogRef, onDialogHide} = useDialogPluginComponent();
    return {dialogRef, onDialogHide}
  },
});
</script>
