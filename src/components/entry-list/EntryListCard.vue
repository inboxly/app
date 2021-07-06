<template>
  <q-card
    :style="entry.is_read ? 'opacity: 0.6' : ''"
    class="entry-card q-my-md non-selectable"
    v-intersection="handleIntersection"
    :data-id="entry.id"
  >
    <div class="q-mx-md">
      <!-- todo: Add rounded borders to image, but keeping aspect ratio -->
      <q-img :ratio="8/5" :src="entry.image"/>
    </div>

    <q-card-section>
      <div class="text-subtitle1">{{ entry.title }}</div>
      <div class="text-subtitle2 text-grey" v-text="feedTitle"/>
    </q-card-section>

    <q-card-section v-show="entry.description" class="q-pt-none text-grey">
      {{ entry.description }}
    </q-card-section>
  </q-card>
</template>

<script>
export default {
  name: 'EntryListCard',
  props: {
    entry: {
      type: Object,
      default: () => {},
    },
  },
  methods: {
    handleIntersection (intersection) {
      const isAboveViewport = intersection.boundingClientRect.bottom < 0

      if (isAboveViewport) {
        const entryId = parseInt(intersection.target.dataset.id)
        this.markEntryAsRead(entryId)
        return false
      }
    },
    markEntryAsRead (entryId) {
      this.$axios.post('http://127.0.0.1:8000/api/read/entries?api_token=api_token', {
        ids: [entryId],
      }).then(() => {
        this.entry.is_read = true
      })
    },
  },
  computed: {
    feedTitle () {
      const title = this.entry.feed.custom_title ?? this.entry.feed.title
      const author = (this.entry.author && this.entry.author.name) || ''
      return title === author ? title : title + ' by ' + author
    },
  },
}
</script>
