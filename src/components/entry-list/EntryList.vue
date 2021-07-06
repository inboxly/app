<template>
  <q-pull-to-refresh @refresh="reloadEntries">
    <q-infinite-scroll
      @load="loadMoreEntries"
      :disable="!moreEntriesUrl"
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

    <entry-list-context-menu
      :entry="selectedEntry"
      v-model="showContextMenu"
      @hide="unselectEntry"
    />
  </q-pull-to-refresh>
</template>

<script>
import EntryListContextMenu from 'components/entry-list/EntryListContextMenu'
import EntryListCard from 'components/entry-list/EntryListCard'

export default {
  name: 'EntryList',
  components: { EntryListCard, EntryListContextMenu },
  data () {
    return {
      entries: [],
      moreEntriesUrl: null,
      showContextMenu: false,
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
    this.loadEntries(this.url)
  },
  methods: {
    loadEntries (url) {
      return this.$axios.get(url).then(response => {
        const { data, links } = response.data
        this.entries.push(...data)
        this.nextUrl = links.next ? links.next : null
      })
    },
    loadMoreEntries (index, done) {
      this.loadEntries(this.moreEntriesUrl).then(() => done())
    },
    reloadEntries (done) {
      this.entries = []
      this.loadEntries(this.url).then(() => done())
    },
    selectEntry(entry) {
      this.selectedEntry = entry
      this.showContextMenu = true
    },
    unselectEntry() {
      this.selectedEntry = null
    },
  },
}
</script>
