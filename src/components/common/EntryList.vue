<template>
  <q-pull-to-refresh @refresh="reloadEntries">
    <q-infinite-scroll
      @load="loadMoreEntries"
      :disable="!nextUrl"
      :offset="250"
    >
      <template
        v-for="(entry, index) in entries"
        :key="entry.id"
      >
        <date-label :date="entry.created_at" :prev-date="entries[index -1]?.created_at"/>
        <entry-list-card :entry="entry" @contextmenu.prevent="openEntryMenu(entry)" @click="openEntry(entry)"/>
      </template>
      <template v-slot:loading>
        <div class="row justify-center q-my-md">
          <q-spinner-dots color="primary" size="40px"/>
        </div>
      </template>
    </q-infinite-scroll>

    <div
      v-if="!nextUrl"
      class="row items-center justify-center"
      :style="!!entries.length ? 'min-height: 100vh' : 'min-height: inherit !important'"
    >
      <div>All done!</div>
    </div>
  </q-pull-to-refresh>
</template>

<script>
import DateLabel from 'components/common/DateLabel'
import EntryListCard from 'components/common/EntryListCard'
import EntryMenuOverlay from 'components/overlays/EntryMenuOverlay'
import EntryOverlay from 'components/overlays/EntryOverlay'

export default {
  name: 'EntryList',
  components: { DateLabel, EntryListCard, EntryMenuOverlay, EntryOverlay },
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

<style>
.q-pull-to-refresh,
.q-pull-to-refresh__content{
  min-height: inherit !important;
}
</style>
