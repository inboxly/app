<template>
  <q-pull-to-refresh @refresh="refresh">
    <q-infinite-scroll @load="more" :disable="!nextUrl" :offset="250">
      <div v-for="(entry, index) in items" :key="index" class="q-mt-md">
        <q-card
            :style="entry.is_read ? 'opacity: 0.6' : ''"
            class="entry-card q-mb-lg non-selectable"
            v-intersection="onIntersection"
            :data-id="entry.id"
        >
          <div class="q-mx-md">
            <!-- todo: Add rounded borders to image, but keeping aspect ratio -->
            <q-img :ratio="8/5" :src="entry.image"/>
          </div>

          <q-card-section>
            <div class="text-subtitle1">{{ entry.title }}</div>
            <div class="text-subtitle2 text-grey" v-text="feedTitle(entry)"/>
          </q-card-section>

          <q-card-section v-show="entry.description" class="q-pt-none text-grey">
            {{ entry.description }}
          </q-card-section>
        </q-card>
      </div>

      <template v-slot:loading>
        <div class="row justify-center q-my-md">
          <q-spinner-dots color="primary" size="40px"/>
        </div>
      </template>

    </q-infinite-scroll>
  </q-pull-to-refresh>
</template>

<script>
export default {
  name: 'EntryList',
  data () {
    return {
      items: [],
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
    this.loadEntries(this.url)
  },
  methods: {
    onIntersection (intersection) {
      if (intersection.boundingClientRect.bottom < 0) {
        const el = intersection.target
        console.log(el.dataset.id)
        this.markAsRead(parseInt(el.dataset.id))
        return false
      }
    },
    markAsRead (id) {
      this.$axios.post('http://127.0.0.1:8000/api/read/entries?api_token=api_token', { ids: [id] }).then(() => {
        const entry = this.items.find(entry => entry.id === id)
        if (entry) {
          entry.is_read = true
        }
      })
    },
    more (index, done) {
      this.loadEntries(this.nextUrl).then(() => done())
    },
    refresh (done) {
      this.items = []
      this.loadEntries(this.url).then(() => done())
    },
    loadEntries (url) {
      return this.$axios.get(url).then(response => {
        const { data, links } = response.data
        this.items.push(...data)
        this.nextUrl = links.next ? links.next : null
      })
    },
    feedTitle (entry) {
      const title = entry.feed.custom_title ?? entry.feed.title
      const author = (entry.author && entry.author.name) || ''
      return title === author ? title : title + ' by ' + author
    },
  },
}
</script>
