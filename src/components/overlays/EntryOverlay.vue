<template>
  <q-dialog
    ref="dialog"
    @hide="$emit('hide')"
    maximized
    transition-show="fade"
    transition-hide="fade"
  >
    <div class="bg-dark">
      <q-toolbar class="row">
        <div class="col text-left">
          <q-btn dense @click="hide" icon="arrow_back"/>
        </div>
        <div class="col text-right">
        </div>
      </q-toolbar>
      <q-card
        :style="entry.is_read ? 'opacity: 0.6' : ''"
        class="entry-card q-mt-md q-mb-lg non-selectable"
        :data-id="entry.id"
      >
        <div class="q-mx-md q-my-sm">
          <q-img class="rounded-borders" :ratio="8/5" :src="entry.image || entry.feed.image"/>
        </div>

        <q-card-section class="q-py-none">
          <div class="entry-title text-subtitle1 q-my-xs">{{ entry.title }}</div>
          <div class="entry-subtitle text-subtitle2 q-my-xs text-grey row no-wrap">
            <div class="ellipsis" v-text="feedTitle" :title="feedTitle"/>
            <div class="q-mx-xs col-auto">/</div>
            <div class="col-auto" :title="createdDate">{{ createdDuration }}</div>
          </div>
        </q-card-section>

        <q-card-section
          class="entry-text q-pt-none text-grey"
          v-show="entry.text"
          v-html="entry.text"
        />
      </q-card>
    </div>
  </q-dialog>
</template>

<script>
import { format } from 'timeago.js'

export default {
  name: 'EntryOverlay',
  props: ['entry'],
  emits: [
    'hide'
  ],

  methods: {
    show () {
      this.$refs.dialog.show()
    },
    hide () {
      this.$refs.dialog.hide()
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
