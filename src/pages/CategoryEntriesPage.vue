<template>
  <q-page>
    <toolbar :title="category.name">
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
import {useStore} from "vuex";
import {computed, ComputedRef, onBeforeMount, ref} from "vue";
import {useRoute} from "vue-router";
import {api} from "boot/axios";
import CategoryType from "src/types/CategoryType";
import EntryList from 'components/common/EntryList.vue'
import EntryListMenuOverlay from 'components/overlays/EntryListMenuOverlay.vue'
import Toolbar from 'components/layout/Toolbar.vue'
import ToolbarButton from 'components/layout/ToolbarButton.vue'
import ToolbarProgress from 'components/layout/ToolbarProgress.vue'

export default {
  name: 'CategoryEntriesPage',
  components: {EntryList, EntryListMenuOverlay, Toolbar, ToolbarButton, ToolbarProgress},
  setup() {
    const route = useRoute()
    const store = useStore()

    const showEntryListMenu = ref(false)
    const progressMax = ref(0)
    const progressValue = computed(() => store.getters.getCategoryEntriesCount(+route.params.categoryId))
    const url = computed(() => `/api/categories/${route.params.categoryId}/entries?state=unread`)
    const category: ComputedRef<CategoryType> = computed(() => {
      return store.state.categories.find((category: CategoryType) => category.id === +route.params.categoryId)
    })

    onBeforeMount(() => {
      store.dispatch('fetchFeedsCounts').then(() => progressMax.value = progressValue.value)
    })

    function markAllAsRead() {
      api.post(`/api/read/categories/${route.params.categoryId}`).then(() => {
        store.commit('setEntries', [])
      })
    }

    return {showEntryListMenu, progressMax, progressValue, url, category, markAllAsRead}
  },
}
</script>
