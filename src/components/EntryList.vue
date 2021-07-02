<template>
  <q-pull-to-refresh @refresh="refresh">
    <q-infinite-scroll @load="more" :disable="!nextUrl" :offset="250">
      <div v-for="(entry, index) in items" :key="index">
        <q-card
          class="entry-card q-mb-lg non-selectable"
          v-intersection="onIntersection"
          :data-id="entry.id"
        >
          <div class="q-mx-md">
            <!-- todo: Add rounded borders to image, but keeping aspect ratio -->
            <q-img :ratio="4/3" :src="entry.image"/>
          </div>

          <q-card-section>
            <div class="text-subtitle1">{{ entry.id + ': ' +  entry.title }}</div>
            <div class="text-subtitle2 text-grey">{{ entry.feed.title }} by {{ entry.author.name }}</div>
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
    onIntersection(intersection) {
      if (intersection.boundingClientRect.bottom < 0) {
        const el = intersection.target;
        console.log(el.dataset.id)
        this.markAsRead(parseInt(el.dataset.id))
        return false
      }
    },
    markAsRead (id) {
      this.$axios.post('http://127.0.0.1:8000/api/read/entries?api_token=api_token', {ids: [id]})
    },
    more (index, done) {
      this.loadEntries(this.nextUrl).then(() => done())
    },
    refresh (done) {
      this.items = [];
      this.loadEntries(this.url).then(() => done())
    },
    loadEntries (url) {
      return this.$axios.get(url).then(response => {
        const { data, links } = response.data
        this.items.push(...data)
        this.nextUrl = links.next ? links.next : null
      })
    },
  },
}
</script>
