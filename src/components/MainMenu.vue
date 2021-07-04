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
        >
          <q-item-section avatar style="min-width: auto">
            <q-icon class="text-primary" name="rss_feed"/>
          </q-item-section>

          <q-item-section>Today</q-item-section>
        </q-item>

        <q-item
          clickable
          v-ripple
          :active="link === 'read_later'"
          @click="link = 'read_later'"
          active-class="my-menu-link"
        >
          <q-item-section avatar style="min-width: auto">
            <q-icon class="text-grey" name="bookmark_border" />
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
            <q-icon class="text-grey" name="workspace_premium" />
          </q-item-section>

          <q-item-section>Upgrade</q-item-section>
        </q-item>
      </q-list>
    </div>

    <div>
      <q-list padding class="text-primary">
        <q-item-label class="q-py-none" header>Feeds</q-item-label>
        <q-item
          clickable
          v-ripple
          :active="link === 'all'"
          @click="link = 'all'"
          active-class="my-menu-link"
        >
          <q-item-section avatar style="min-width: auto">
            <q-icon class="text-grey" name="menu" />
          </q-item-section>

          <q-item-section>All</q-item-section>
        </q-item>

        <q-item
          clickable
          v-ripple
          :active="link === 'favorite'"
          @click="link = 'favorite'"
          active-class="my-menu-link"
        >
          <q-item-section avatar style="min-width: auto">
            <q-icon class="text-grey" name="folder_special" />
          </q-item-section>

          <q-item-section>Favorite</q-item-section>
        </q-item>

        <q-item
          clickable
          v-ripple
          :active="link === 'some_category'"
          @click="link = 'some_category'"
          active-class="my-menu-link"
        >
          <q-item-section avatar style="min-width: auto">
            <q-icon class="text-grey" name="chevron_right" />
          </q-item-section>

          <q-item-section>Some category</q-item-section>
        </q-item>
      </q-list>
    </div>

    <div>
      <q-list padding class="text-primary">
        <q-item-label class="q-py-none" header>Boards</q-item-label>
        <q-item
          clickable
          v-ripple
          :active="link === 'some_board'"
          @click="link = 'some_board'"
          active-class="my-menu-link"
        >
          <q-item-section avatar style="min-width: auto">
            <q-icon class="text-grey" name="star_outline" />
          </q-item-section>

          <q-item-section>Some board</q-item-section>
        </q-item>

        <q-item
          clickable
          v-ripple
          :active="link === 'another_board'"
          @click="link = 'another_board'"
          active-class="my-menu-link"
        >
          <q-item-section avatar style="min-width: auto">
            <q-icon class="text-grey" name="star_outline" />
          </q-item-section>

          <q-item-section>Another board</q-item-section>
        </q-item>
      </q-list>
    </div>

    <div class="q-pa-md text-grey">
      <q-btn stretch outline class="full-width">Add content</q-btn>
    </div>

    <div>
      <q-list padding class="text-primary">
        <q-item
          clickable
          v-ripple
          :active="link === 'recently_read'"
          @click="link = 'recently_read'"
          active-class="my-menu-link"
        >
          <q-item-section avatar style="min-width: auto">
            <q-icon class="text-grey" name="schedule" />
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
            <q-icon class="text-grey" name="nights_stay" />
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
            <q-icon class="text-grey" name="card_giftcard" />
          </q-item-section>

          <q-item-section>New features</q-item-section>
        </q-item>

        <q-item
          clickable
          v-ripple
          :active="link === 'settings'"
          @click="link = 'settings'"
          active-class="my-menu-link"
        >
          <q-item-section avatar style="min-width: auto">
            <q-icon class="text-grey" name="settings" />
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
            <q-icon class="text-grey" name="power_settings_new" />
          </q-item-section>

          <q-item-section>Logout</q-item-section>
        </q-item>
      </q-list>
    </div>
  </div>
</template>

<script>
export default {
  name: 'MainMenu',
  data () {
    return {
      link: '',
    }
  },
  setup () {
    return {}
  }
}
</script>
