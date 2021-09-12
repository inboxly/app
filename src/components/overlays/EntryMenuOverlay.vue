<template>
  <q-dialog
    ref="dialogRef" @hide="onDialogHide"
    position="bottom" auto-close
  >
    <div class="bg-dark">
      <q-list padding>
        <q-item clickable v-ripple>
          <q-item-section avatar style="min-width: auto">
            <q-icon class="text-grey" name="star_outline"/>
          </q-item-section>
          <q-item-section @click="showSaveToCollectionOverlay">Save to collection</q-item-section>
        </q-item>
        <q-item clickable v-ripple>
          <q-item-section avatar style="min-width: auto">
            <q-icon class="text-grey" name="share"/>
          </q-item-section>
          <q-item-section>Share</q-item-section>
        </q-item>
        <q-item clickable v-ripple>
          <q-item-section avatar style="min-width: auto">
            <q-icon class="text-grey" name="done"/>
          </q-item-section>
          <q-item-section v-if="entry.is_read" @click="markAsUnread">Mark as unread</q-item-section>
          <q-item-section v-else @click="markAsRead">Mark as read</q-item-section>
        </q-item>
      </q-list>
    </div>
  </q-dialog>
</template>

<script lang="ts">
import SaveToCollectionOverlay from 'components/overlays/SaveToCollectionOverlay.vue'
import {defineComponent, PropType} from 'vue'
import {useDialogPluginComponent, useQuasar} from "quasar";
import {useStore} from "vuex";
import EntryType from "src/types/EntryType";

export default defineComponent({
  name: 'EntryMenuOverlay',
  props: {
    entry: {
      type: Object as PropType<EntryType>,
      required: true,
    },
  },
  emits: [...useDialogPluginComponent.emits],
  setup(props) {
    const {dialogRef, onDialogHide} = useDialogPluginComponent()
    const store = useStore()
    const quasar = useQuasar()

    function markAsRead() {
      store.dispatch('markEntryAsRead', props.entry.id)
    }

    function markAsUnread() {
      store.dispatch('markEntryAsUnread', props.entry.id)
    }

    function showSaveToCollectionOverlay() {
      quasar.dialog({
        component: SaveToCollectionOverlay,
        componentProps: {entry: props.entry},
      })
    }

    return {dialogRef, onDialogHide, markAsRead, markAsUnread, showSaveToCollectionOverlay}
  },
})
</script>
