<template>
  <q-card class="entry-card q-mt-md q-mb-lg non-selectable">
    <div class="q-mx-md q-my-sm">
      <q-img no-native-menu class="rounded-borders" :ratio="8/5" :src="entry.image || entry.feed.image"/>
    </div>

    <q-card-section class="q-py-none">
      <div class="entry-title q-my-xs">{{ entry.title }}</div>
      <div class="entry-subtitle q-my-sm text-grey row no-wrap">
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

<script lang="ts">
import {defineComponent, PropType, computed} from 'vue'
import { format } from 'timeago.js'
import EntryType from "src/types/EntryType";

export default defineComponent({
  name: 'Entry',
  props: {
    entry: {
      type: Object as PropType<EntryType>,
      required: true
    },
  },
  setup(props) {
    const feedTitle = computed(() => {
      const title = props.entry.feed.custom_title ?? props.entry.feed.title
      const author = (props.entry.author && props.entry.author.name) || ''
      return title === author ? title : title + ' by ' + author
    })

    const createdDate = computed(() => {
      const date = new Date(props.entry.created_at)
      return date.toLocaleString('en-CA')
    })

    const createdDuration = computed(() => {
      return format(new Date(props.entry.created_at))
    })

    return {feedTitle, createdDate, createdDuration}
  },
})
</script>

<style>
.entry-title {
  font-size: 1.1rem;
  line-height: 1.3;
}
.entry-text {
  line-height: 1.4;
}
</style>
