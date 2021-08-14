<template>
  <q-dialog
    ref="dialog"
    :value='value' @input="newValue => $emit('input', newValue)"
    transition-show="slide-up" transition-hide="slide-down" maximized
  >
    <div class="bg-dark">
      <q-toolbar class="row">
        <div class="col text-left"></div>
        <q-toolbar-title class="text-center text-subtitle1 col-7">
          Save to collection
        </q-toolbar-title>
        <div class="col text-right">
          <q-btn dense v-close-popup>Done</q-btn>
        </div>
      </q-toolbar>
      <q-list padding>
        <q-item
          clickable
          v-ripple
          @click="saveToReadLater"
        >
          <q-item-section avatar style="min-width: auto">
            <q-icon class="text-grey" name="bookmark_border"/>
          </q-item-section>
          <q-item-section>Read later</q-item-section>
        </q-item>
        <q-item
          clickable
          v-ripple
          v-for="collection in collections"
          :key="collection.id"
          @click="toggleSavingToCollection(collection)"
        >
          <q-item-section avatar style="min-width: auto">
            <q-icon
              :class="savedToCollection(collection) ? 'text-primary' : 'text-grey'"
              :name="savedToCollection(collection) ? 'star' : 'star_outline'"
            />
          </q-item-section>
          <q-item-section>{{ collection.title }}</q-item-section>
          <q-item-section v-if="savedToCollection(collection)" side>
            <q-badge color="primary">&check; Saved</q-badge>
          </q-item-section>
        </q-item>
      </q-list>
    </div>
  </q-dialog>
</template>

<script>
export default {
  name: 'SaveToCollectionOverlay',
  props: ['value', 'entry'],
  emits: ['input'],
  methods: {
    show () {
      this.$refs.dialog.show()
    },
    hide () {
      this.$refs.dialog.hide()
    },
    saveToReadLater() {
      console.log(`Save entry #${this.entry.id} to read later`)
    },
    toggleSavingToCollection(collection) {
      const payload = { collectionId: collection.id, entryId: this.entry.id }
      const isSelectedCollection = this.$route.name === 'collection-entries'
        && +this.$route.params.collectionId === collection.id

      if (this.savedToCollection(collection)) {
        // todo: Bug! Removing from collection not synced with UI
        this.$store.dispatch('removeEntryFromCollection', payload)
        if (isSelectedCollection) {
          this.$store.commit('removeEntries', [this.entry])
        }
      } else {
        this.$store.dispatch('saveEntryToCollection', payload)
        if (isSelectedCollection) {
          this.$store.commit('unshiftEntries', [this.entry])
        }
      }
    },
  },
  computed: {
    collections () {
      return this.$store.state.collections
    },
    savedToCollection() {
      console.log(this.entry)
      return collection => this.entry.collections.some(
        entryCollection => entryCollection.id === collection.id
      )
    },
  },
}
</script>
