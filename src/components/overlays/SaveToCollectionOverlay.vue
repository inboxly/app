<template>
  <q-dialog
    ref="dialogRef" @hide="onDialogHide"
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
          @click="toggleSavingToReadLater"
        >
          <q-item-section avatar style="min-width: auto">
            <q-icon
              :class="entry.is_read_later ? 'text-primary' : 'text-grey'"
              :name="entry.is_read_later ? 'bookmark' : 'bookmark_border'"
            />
          </q-item-section>
          <q-item-section>Read later</q-item-section>
          <q-item-section v-if="entry.is_read_later" side>
            <q-badge color="primary">&check; Saved</q-badge>
          </q-item-section>
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
          <q-item-section>{{ collection.name }}</q-item-section>
          <q-item-section v-if="savedToCollection(collection)" side>
            <q-badge color="primary">&check; Saved</q-badge>
          </q-item-section>
        </q-item>
      </q-list>
    </div>
  </q-dialog>
</template>

<script lang="ts">
import {useDialogPluginComponent} from "quasar";
import {computed, ComputedRef, defineComponent, PropType} from 'vue'
import {useStore} from "vuex";
import {useRoute} from "vue-router";
import CollectionType from "src/types/CollectionType";
import EntryType from "src/types/EntryType";

export default defineComponent({
  name: 'SaveToCollectionOverlay',
  props: {
    value: {
      type: Boolean
    },
    entry: {
      type: Object as PropType<EntryType>,
      required: true
    }
  },
  emits: [...useDialogPluginComponent.emits],
  setup(props) {
    const {dialogRef, onDialogHide} = useDialogPluginComponent();
    const store = useStore()
    const route = useRoute()

    const collections: ComputedRef<CollectionType[]> = computed(() => store.state.collections);
    const readLaterCollectionId = store.state.profile.read_later_collection_id

    function savedToCollection(collection: CollectionType) {
      return props.entry.collections.some(
        entryCollection => entryCollection.id === collection.id,
      )
    }

    function toggleSavingToReadLater() {
      const payload = {entryId: props.entry.id}
      const isReadLaterRoute = route.name === 'read-later-entries'

      if (props.entry.is_read_later) {
        store.dispatch('removeEntryFromReadLater', payload)
        if (isReadLaterRoute) {
          store.commit('removeEntries', [props.entry])
          onDialogHide()
        }
      } else {
        store.dispatch('saveEntryToReadLater', payload)
        if (isReadLaterRoute) {
          store.commit('unshiftEntries', [props.entry])
        }
      }
    }

    function toggleSavingToCollection(collection: CollectionType) {
      const payload = {collectionId: collection.id, entryId: props.entry.id}
      const isSelectedCollection = route.name === 'collection-entries'
        && +route.params.collectionId === collection.id

      if (savedToCollection(collection)) {
        store.dispatch('removeEntryFromCollection', payload)
        if (isSelectedCollection) {
          store.commit('removeEntries', [props.entry])
          onDialogHide()
        }
      } else {
        store.dispatch('saveEntryToCollection', payload)
        if (isSelectedCollection) {
          store.commit('unshiftEntries', [props.entry])
        }
      }
    }

    return {
      dialogRef, onDialogHide, collections, readLaterCollectionId,
      savedToCollection, entry: props.entry, toggleSavingToReadLater, toggleSavingToCollection
    }
  },
})
</script>
