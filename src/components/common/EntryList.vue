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
        <date-label :date="entry.created_at" :prev-date="entries[index -1]?.created_at"/>
        <entry-list-card :entry="entry" @contextmenu.prevent="openEntryMenu(entry)" @click="openEntry(entry)"/>
      </template>
  </scrollable>
</template>

<script>
import DateLabel from 'components/common/DateLabel'
import EntryListCard from 'components/common/EntryListCard'
import EntryMenuOverlay from 'components/overlays/EntryMenuOverlay'
import EntryOverlay from 'components/overlays/EntryOverlay'
import Scrollable from 'components/common/Scrollable'

export default {
  name: 'EntryList',
  components: { DateLabel, EntryListCard, EntryMenuOverlay, EntryOverlay, Scrollable },
  data () {
    return {
      nextUrl: null,
    }
  },
  props: {
    url: {
      type: String,
      default: null,
    },
  },
  created () {
    this.$store.dispatch('fetchEntries', this.url).then(nextUrl => {
      this.nextUrl = nextUrl
    })
  },
  computed: {
    entries () {
      return this.$store.state.entries
    },
  },
  methods: {
    loadMoreEntries (index, done) {
      if (this.nextUrl) {
        this.$store.dispatch('fetchMoreEntries', this.nextUrl).then(nextUrl => {
          this.nextUrl = nextUrl
          done()
        })
      }
    },
    reloadEntries (done) {
      this.$store.dispatch('fetchFeedsCounts')
      this.$store.dispatch('fetchEntries', this.url).then(nextUrl => {
        this.nextUrl = nextUrl
        done()
      })
      this.$emit('refresh')
    },
    openEntry(entry) {
      this.$q.dialog({
        component: EntryOverlay,
        componentProps: { entry }
      })
    },
    openEntryMenu(entry) {
      this.$q.dialog({
        component: EntryMenuOverlay,
        componentProps: { entry }
      })
    },
  },
}
</script>
