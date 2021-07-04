<template>
  <q-dialog :value='value' @input="newValue => $emit('input', newValue)" position="bottom">
    <div class="bg-dark">
      <q-list padding>
        <q-item clickable v-ripple>
          <q-item-section avatar style="min-width: auto">
            <q-icon class="text-grey" name="star_outline"/>
          </q-item-section>
          <q-item-section>Save to board</q-item-section>
        </q-item>
        <q-item clickable v-ripple>
          <q-item-section avatar style="min-width: auto">
            <q-icon class="text-grey" name="share"/>
          </q-item-section>
          <q-item-section>Share</q-item-section>
        </q-item>
        <q-item clickable v-ripple>
          <q-item-section avatar style="min-width: auto">
            <q-icon class="text-grey" name="done"/>
          </q-item-section>
          <q-item-section>Mark as read</q-item-section>
        </q-item>
      </q-list>
    </div>
  </q-dialog>
</template>

<script>
export default {
  name: 'EntryListContextMenu',
  props: ['value'],
  setup () {
    return {}
  }
}
</script>
