<template>
  <q-page>
    <toolbar :title="feed.title">
      <template #left>
        <toolbar-progress :max="progressMax" :value="progressValue"/>
      </template>
      <template #right>
        <toolbar-button icon="done" @click="markAllAsRead"/>
        <toolbar-button icon="more_horiz" @click="showEntryListMenu = true"/>
      </template>
    </toolbar>
    <entry-list :url="url" @refresh="progressMax = progressValue"/>
    <entry-list-menu-overlay v-model="showEntryListMenu"/>
  </q-page>
</template>

<script lang="ts">
import {computed, defineComponent, onBeforeMount, ref} from "vue";
import {useRoute} from "vue-router";
import {useStore} from "vuex";
import {api} from "boot/axios";
import EntryList from 'components/common/EntryList.vue'
import EntryListMenuOverlay from 'components/overlays/EntryListMenuOverlay.vue'
import Toolbar from 'components/layout/Toolbar.vue'
import ToolbarButton from 'components/layout/ToolbarButton.vue'
import ToolbarProgress from 'components/layout/ToolbarProgress.vue'

export default defineComponent({
  name: 'FeedEntriesPage',
  components: {EntryList, EntryListMenuOverlay, Toolbar, ToolbarButton, ToolbarProgress},
  setup() {
    const route = useRoute()
    const store = useStore()

    const feed = ref({})
    const showEntryListMenu = ref(false)
    const progressMax = ref(0)
    const progressValue = computed(() => store.getters.getFeedEntriesCount(+route.params.feedId))
    const url = computed(() => `/api/feeds/${route.params.feedId}/entries?unreadOnly=1`)

    onBeforeMount(() => {
      api.get(`/api/feeds/${route.params.feedId}`).then(
        response => feed.value = response.data.data
      )
      store.dispatch('fetchFeedsCounts').then(() => progressMax.value = progressValue.value)
    })

    function markAllAsRead() {
      api.post(`/api/read/feeds/${route.params.feedId}`).then(() => {
        store.commit('setEntries', [])
      })
    }

    return {showEntryListMenu, progressMax, progressValue, url, feed, markAllAsRead}
  },
});
</script>
