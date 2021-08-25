<template>
  <q-page>
    <toolbar title="All personal feeds">
      <template #left>
        <toolbar-progress :max="progressMax" :value="progressValue"/>
      </template>
      <template #right>
        <toolbar-button icon="done" @click="markAllAsRead"/>
        <toolbar-button icon="more_horiz" @click="showEntryListMenu = true"/>
      </template>
    </toolbar>
    <entry-list url="/api/entries?state=unread" @refresh="progressMax = progressValue"/>
    <entry-list-menu-overlay v-model="showEntryListMenu"/>
  </q-page>
</template>

<script lang="ts">
import { computed, defineComponent, onBeforeMount, ref } from 'vue'
import { useStore } from 'vuex'
import { api } from 'src/boot/axios'
import EntryList from 'components/common/EntryList.vue'
import EntryListMenuOverlay from 'components/overlays/EntryListMenuOverlay.vue'
import Toolbar from 'components/layout/Toolbar.vue'
import ToolbarButton from 'components/layout/ToolbarButton.vue'
import ToolbarProgress from 'components/layout/ToolbarProgress.vue'

export default defineComponent({
  name: 'AllEntriesPage',
  components: { EntryList, EntryListMenuOverlay, Toolbar, ToolbarButton, ToolbarProgress },
  setup () {
    const store = useStore()
    const showEntryListMenu = ref(false)
    const progressMax = ref(0)
    const progressValue = computed(() => store.getters.getAllEntriesCount)

    onBeforeMount(() => {
      store.dispatch('fetchFeedsCounts').then(() => progressMax.value = progressValue.value)
    })

    function markAllAsRead () {
      api.post('/api/read/all').then(() => {
        store.commit('setEntries', [])
      })
    }

    return { showEntryListMenu, progressMax, progressValue, markAllAsRead }
  },
})
</script>
