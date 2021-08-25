<template>
  <div>
    <div class="text-right q-my-md q-mx-sm text-bold">
      <q-btn flat>Edit</q-btn>
    </div>
    <div>
      <q-list padding>
        <q-item
          clickable
          v-ripple
          :active="true"
          @click="link = 'today'"
          active-class="my-menu-link"
          :to="{name: 'today-entries'}"
        >
          <q-item-section avatar style="min-width: auto">
            <q-icon class="text-primary" name="rss_feed"/>
          </q-item-section>

          <q-item-section>Today</q-item-section>
        </q-item>

        <q-item
          clickable
          v-ripple
          :active="link === 'later'"
          @click="link = 'later'"
          :to="{name: 'read-later-entries'}"
          active-class="my-menu-link"
        >
          <q-item-section avatar style="min-width: auto">
            <q-icon class="text-grey" name="bookmark_border"/>
          </q-item-section>

          <q-item-section>Read Later</q-item-section>
        </q-item>

        <q-item
          clickable
          v-ripple
          :active="link === 'upgrade'"
          @click="link = 'upgrade'"
          active-class="my-menu-link"
        >
          <q-item-section avatar style="min-width: auto">
            <q-icon class="text-grey" name="workspace_premium"/>
          </q-item-section>

          <q-item-section>Upgrade</q-item-section>
        </q-item>
      </q-list>
    </div>

    <div>
      <q-list padding>
        <q-item-label class="q-py-none" header>Feeds</q-item-label>
        <q-item
          clickable
          v-ripple
          :active="link === 'all'"
          @click="link = 'all'"
          active-class="my-menu-link"
          :to="{name: 'all-entries'}"
        >
          <q-item-section avatar style="min-width: auto">
            <q-icon class="text-grey" name="menu"/>
          </q-item-section>

          <q-item-section>All</q-item-section>
        </q-item>

        <!--        <q-item-->
        <!--          clickable-->
        <!--          v-ripple-->
        <!--          :active="link === 'favorite'"-->
        <!--          @click="link = 'favorite'"-->
        <!--          active-class="my-menu-link"-->
        <!--        >-->
        <!--          <q-item-section avatar style="min-width: auto">-->
        <!--            <q-icon class="text-grey" name="folder_special"/>-->
        <!--          </q-item-section>-->

        <!--          <q-item-section>Favorite</q-item-section>-->
        <!--        </q-item>-->

        <q-tree
          class="q-px-md"
          node-key="name"
          icon="chevron_right"
          no-connectors
          label-key="name"
          children-key="feeds"
          :nodes="categories"
          v-ripple
          active-class="my-menu-link"
        >
          <template v-slot:default-header="prop">
            <div
              class="row full-width q-my-xs cursor-pointer"
              @click="goToCategoryOrFeed(prop.node)"
            >
              <q-img
                v-if="prop.node.image"
                :src="prop.node.image"
                width="1rem"
                height="1rem"
                class="q-pl-none q-ml-none col-auto"
              />
              <div
                class="q-ml-md col ellipsis"
                v-text="prop.node.name"
              />
              <div class="col-auto text-right" v-text="categoryOrFeedCount(prop.node)"/>
            </div>
          </template>
        </q-tree>
      </q-list>
    </div>

    <div>
      <q-list padding class="text-primary">
        <q-item-label class="q-py-none" header>Collections</q-item-label>
        <q-item v-for="collection in collections" :key="collection.id"
                clickable
                v-ripple
                :active="link === 'some_collection'"
                @click="link = 'some_collection'"
                active-class="my-menu-link"
                :to="{name: 'collection-entries', params: {collectionId: collection.id}}"
        >
          <q-item-section avatar style="min-width: auto">
            <q-icon class="text-grey" name="star_outline"/>
          </q-item-section>

          <q-item-section>{{ collection.name }}</q-item-section>
        </q-item>
      </q-list>
    </div>

    <div class="q-pa-md text-grey">
      <q-btn stretch outline class="full-width" :to="{name: 'search-feeds'}">Add content</q-btn>
    </div>

    <div>
      <q-list padding class="text-primary">
        <q-item
          clickable
          v-ripple
          :active="link === 'recently_read'"
          @click="link = 'recently_read'"
          active-class="my-menu-link"
          :to="{name: 'read-entries'}"
        >
          <q-item-section avatar style="min-width: auto">
            <q-icon class="text-grey" name="schedule"/>
          </q-item-section>

          <q-item-section>Recently read</q-item-section>
        </q-item>

        <q-item
          clickable
          v-ripple
          :active="link === 'choose_theme'"
          @click="link = 'choose_theme'"
          active-class="my-menu-link"
        >
          <q-item-section avatar style="min-width: auto">
            <q-icon class="text-grey" name="nights_stay"/>
          </q-item-section>

          <q-item-section>Choose theme</q-item-section>
        </q-item>

        <q-item
          clickable
          v-ripple
          :active="link === 'new_features'"
          @click="link = 'new_features'"
          active-class="my-menu-link"
        >
          <q-item-section avatar style="min-width: auto">
            <q-icon class="text-grey" name="card_giftcard"/>
          </q-item-section>

          <q-item-section>New features</q-item-section>
        </q-item>

        <q-item
          clickable
          v-ripple
          :active="link === 'settings'"
          @click="openSettings"
          active-class="my-menu-link"
        >
          <q-item-section avatar style="min-width: auto">
            <q-icon class="text-grey" name="settings"/>
          </q-item-section>

          <q-item-section>Settings</q-item-section>
        </q-item>

        <q-item
          clickable
          v-ripple
          :active="link === 'logout'"
          @click="link = 'logout'"
          active-class="my-menu-link"
        >
          <q-item-section avatar style="min-width: auto">
            <q-icon class="text-grey" name="power_settings_new"/>
          </q-item-section>

          <q-item-section>Logout</q-item-section>
        </q-item>
      </q-list>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, ref } from 'vue'
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'
import FeedType from "src/types/FeedType";
import {useQuasar} from "quasar";
import SettingsOverlay from "components/overlays/SettingsOverlay.vue";
import CollectionType from "src/types/CollectionType";

export default defineComponent({
  name: 'LeftNavigation',
  emits: ['toggleLeftDrawer'],
  setup (_, {emit}) {
    const quasar = useQuasar()
    const router = useRouter()
    const store = useStore()

    const link = ref('')
    const collections = computed<CollectionType[]>(() => store.state.collections)

    interface CategoryOrFeedType {
      id: number,
      feeds: FeedType[]|undefined
    }

    const categories = computed(() => store.state.categories)

    function goToCategoryOrFeed (categoryOrFeed: CategoryOrFeedType) {
      categoryOrFeed.feeds
        ? router.push({ name: 'category-entries', params: { categoryId: categoryOrFeed.id } })
        : router.push({ name: 'feed-entries', params: { feedId: categoryOrFeed.id } })
    }

    function categoryOrFeedCount (categoryOrFeed: CategoryOrFeedType) {
      return categoryOrFeed.feeds
        ? store.getters.getCategoryEntriesCount(categoryOrFeed.id)
        : store.getters.getFeedEntriesCount(categoryOrFeed.id)
    }

    function openSettings(): void {
      link.value = 'settings';
      quasar.dialog({component: SettingsOverlay})
      toggleLeftDrawer()
    }

    function toggleLeftDrawer () {
      emit('toggleLeftDrawer')
    }

    return {router, link, collections, categories, goToCategoryOrFeed, categoryOrFeedCount, openSettings, toggleLeftDrawer}
  },
})
</script>
