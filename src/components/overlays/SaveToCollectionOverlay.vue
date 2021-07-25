<template>
  <q-dialog
    ref="dialog"
    :value='value' @input="newValue => $emit('input', newValue)"
    transition-show="slide-up" transition-hide="slide-down" maximized auto-close
  >
    <div class="bg-dark">

      <q-toolbar class="row">
        <div class="col text-left"></div>
        <q-toolbar-title class="text-center text-subtitle1 col-7">
          Save to collection
        </q-toolbar-title>
        <div class="col text-right">
          <q-btn dense>Done</q-btn>
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
          @click="saveToCollection(collection)"
        >
          <q-item-section avatar style="min-width: auto">
            <q-icon class="text-grey" name="star_outline"/>
          </q-item-section>
          <q-item-section>{{ collection.title }}</q-item-section>
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
    saveToCollection(collection) {
      console.log(`Save entry #${this.entry.id} to collection #${collection.id}`)
    },
  },
  computed: {
    collections () {
      return this.$store.state.collections
    },
  },
}
</script>
