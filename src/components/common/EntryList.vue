<template>
  <scrollable
    :disable="!nextUrl"
    :min-height="!!entries.length ? '100vh' : 'inherit'"
    @refresh="reloadEntries"
    @load="loadMoreEntries"
  >
    <template
      v-for="(entry, index) in entries"
      :key="entry.id"
    >
      <date-label
        :date="entry.created_at"
        :prev-date="entries[index -1]?.created_at"
      />
      <entry
        :style="entry.is_read ? 'opacity: 0.6' : ''"
        :entry="entry"
        :data-id="entry.id"
        v-intersection="handleIntersection"
        @click="openEntry(entry)"
        @contextmenu.prevent="openEntryMenu(entry)"
      />
    </template>
  </scrollable>
</template>

<script lang="ts">
import {computed, ComputedRef, defineComponent, ref} from "vue";
import {useStore} from "vuex";
import {useQuasar} from "quasar";
import DateLabel from 'components/common/DateLabel.vue'
import Entry from 'components/common/Entry.vue'
import EntryMenuOverlay from 'components/overlays/EntryMenuOverlay.vue'
import EntryOverlay from 'components/overlays/EntryOverlay.vue'
import Scrollable from 'components/common/Scrollable.vue'
import EntryType from 'src/types/EntryType'

export default defineComponent({
  name: 'EntryList',
  components: {DateLabel, Entry, EntryMenuOverlay, EntryOverlay, Scrollable},
  props: {
    url: {
      type: String,
      required: true,
    },
    noMarkRead: {
      type: Boolean,
      default: false
    },
  },
  setup(props, {emit}) {
    const quasar = useQuasar()
    const store = useStore()

    store.dispatch('fetchEntries', props.url).then(
      (next: string) => nextUrl.value = next
    )

    const nextUrl = ref('')
    const entries: ComputedRef<EntryType[]> = computed(() => store.state.entries);

    function handleIntersection(intersection: any): void | false {
      if (props.noMarkRead) {
        return false
      }
      const isAboveViewport = intersection.boundingClientRect.bottom < 0;
      if (isAboveViewport) {
        const entryId = intersection.target.dataset.id
        store.dispatch('markEntryAsRead', entryId)
        return false
      }
    }

    function loadMoreEntries(index: Number, done: Function): void {
      if (nextUrl.value) {
        store.dispatch('fetchMoreEntries', nextUrl.value).then(next => {
          nextUrl.value = next
          done()
        })
      }
    }

    function reloadEntries(done: Function): void {
      store.dispatch('fetchFeedsCounts')
      store.dispatch('fetchEntries', props.url).then(next => {
        nextUrl.value = next
        done()
      })
      emit('refresh')
    }

    function openEntry(entry: EntryType): void {
      quasar.dialog({
        component: EntryOverlay,
        componentProps: {entry}
      })
    }

    function openEntryMenu(entry: EntryType): void {
      quasar.dialog({
        component: EntryMenuOverlay,
        componentProps: {entry, noMarkRead: props.noMarkRead}
      })
    }

    return {nextUrl, entries, handleIntersection, loadMoreEntries, reloadEntries, openEntry, openEntryMenu}
  },
});
</script>
