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
        <div class="html-content" v-show="entry.content" v-html="entry.content"/>
      </entry>
    </div>
  </q-dialog>
</template>

<script lang="ts">
import {defineComponent, PropType} from "vue";
import {useDialogPluginComponent} from "quasar";
import Entry from 'components/common/Entry.vue'
import EntryType from "src/types/EntryType";
import {useStore} from "vuex";

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
  setup(props) {
    const store = useStore()
    store.dispatch('markEntryAsRead', props.entry.id)

    const {dialogRef, onDialogHide} = useDialogPluginComponent();
    return {dialogRef, onDialogHide}
  },
});
</script>

<style>
.html-content img {
  max-width: 100%;
}
.html-content a {
  color: white;
}
</style>
