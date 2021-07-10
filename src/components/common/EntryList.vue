<template>
  <q-pull-to-refresh @refresh="reloadEntries">
    <q-infinite-scroll
      @load="loadMoreEntries"
      :disable="!nextUrl"
      :offset="250"
    >
      <entry-list-card
        v-for="entry in entries"
        :key="entry.id"
        :entry="entry"
        @contextmenu.prevent="selectEntry(entry)"
      />
      <template v-slot:loading>
        <div class="row justify-center q-my-md">
          <q-spinner-dots color="primary" size="40px"/>
        </div>
      </template>
    </q-infinite-scroll>

    <entry-menu-overlay
      :entry="selectedEntry"
      v-model="showEntryMenu"
      @hide="unselectEntry"
    />

    <div
      class="row items-center justify-center"
      :style="!!entries.length ? 'min-height: 100vh' : 'min-height: inherit !important'"
    >
      <div v-if="!entries.length">All done!</div>
    </div>
  </q-pull-to-refresh>
</template>

<script>
import EntryMenuOverlay from 'components/overlays/EntryMenuOverlay'
import EntryListCard from 'components/common/EntryListCard'

export default {
  name: 'EntryList',
  components: { EntryListCard, EntryMenuOverlay },
  data () {
    return {
      nextUrl: null,
      showEntryMenu: false,
      selectedEntry: null,
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
      this.$store.dispatch('fetchEntries', this.url).then(nextUrl => {
        this.nextUrl = nextUrl
        done()
      })
    },
    selectEntry(entry) {
      this.selectedEntry = entry
      this.showEntryMenu = true
    },
    unselectEntry() {
      this.selectedEntry = null
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
