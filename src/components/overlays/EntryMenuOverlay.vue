<template>
  <q-dialog
    ref="dialog"
    position="bottom"
    auto-close
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

<script>
import SaveToCollectionOverlay from 'components/overlays/SaveToCollectionOverlay'

export default {
  name: 'EntryMenuOverlay',
  props: ['entry'],
  setup () {
    return {}
  },
  methods: {
    show () {
      this.$refs.dialog.show()
    },
    hide () {
      this.$refs.dialog.hide()
    },
    markAsRead() {
      console.log('mark read')
      this.$store.dispatch('markEntryAsRead', this.entry.id)
    },
    markAsUnread() {
      console.log('mark unread')
      this.$store.dispatch('markEntryAsUnread', this.entry.id)
    },
    showSaveToCollectionOverlay() {
      this.$q.dialog({
        component: SaveToCollectionOverlay,
        componentProps: { entry: this.entry }
      })
    },
  },
}
</script>
