<template>
  <q-card class="entry-card q-mt-md q-mb-lg non-selectable">
    <div class="q-mx-md q-my-sm">
      <q-img no-native-menu class="rounded-borders" :ratio="8/5" :src="entry.image || entry.feed.image"/>
    </div>

    <q-card-section class="q-py-none">
      <div class="entry-title text-subtitle1 q-my-xs">{{ entry.title }}</div>
      <div class="entry-subtitle text-subtitle2 q-my-xs text-grey row no-wrap">
        <div class="ellipsis" v-text="feedTitle" :title="feedTitle"/>
        <div class="q-mx-xs col-auto">/</div>
        <div class="col-auto" :title="createdDate">{{ createdDuration }}</div>
      </div>
    </q-card-section>

    <q-card-section class="entry-text q-pt-none text-grey">
      <slot>
        <div v-show="entry.description" v-text="entry.description"/>
      </slot>
    </q-card-section>
  </q-card>
</template>

<script>
import { format } from 'timeago.js'

export default {
  name: 'Entry',
  props: {
    entry: {
      type: Object,
      default: () => {},
    },
  },
  computed: {
    feedTitle () {
      const title = this.entry.feed.custom_title ?? this.entry.feed.title
      const author = (this.entry.author && this.entry.author.name) || ''
      return title === author ? title : title + ' by ' + author
    },
    createdDate () {
      const date = new Date(this.entry.created_at)
      return date.toLocaleString('en-CA')
    },
    createdDuration () {
      return format(new Date(this.entry.created_at))
    },
  },
}
</script>

<style>
.entry-title {
  line-height: 1.4;
}
.entry-text {
  line-height: 1.4;
}
</style>
