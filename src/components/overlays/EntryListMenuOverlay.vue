<template>
  <q-dialog
    ref="dialogRef" @hide="onDialogHide"
    transition-show="slide-up" transition-hide="slide-down" maximized auto-close
  >
    <div class="bg-dark ">
      <q-toolbar class="row">
        <div class="col text-left"></div>
        <q-toolbar-title class="text-center text-subtitle1 col-7">
          Customize feed
        </q-toolbar-title>
        <div class="col text-right">
          <q-btn dense>Done</q-btn>
        </div>
      </q-toolbar>

      <div class="q-pa-md">
        <div class="text-primary text-bold q-mb-sm" v-text="'View'"/>
        <q-option-group
          :options="viewOptions"
          type="radio"
          v-model="view"
        />
      </div>
      <div class="q-pa-md">
        <div class="text-primary text-bold q-mb-sm" v-text="'Density'"/>
        <q-option-group
          :options="densityOptions"
          type="radio"
          v-model="density"
        />
      </div>
      <div class="q-pa-md">
        <div class="text-primary text-bold q-mb-sm" v-text="'Sort By'"/>
        <q-option-group
          :options="sortOptions"
          type="radio"
          v-model="sort"
        />
      </div>
    </div>
  </q-dialog>
</template>

<script lang="ts">
import {defineComponent, ref, reactive, watch} from 'vue'
import {useDialogPluginComponent} from "quasar";

export default defineComponent({
  name: 'EntryListMenuOverlay',
  props: ['value'],
  emits: [...useDialogPluginComponent.emits],
  setup() {
    const {dialogRef, onDialogHide} = useDialogPluginComponent();
    const view = ref('cards');
    const density = ref('comfortable');
    const sort = ref('latest');
    const viewOptions = reactive([
      { label: 'Text-Only', value: 'text' },
      { label: 'Magazine', value: 'magazine' },
      { label: 'Cards', value: 'cards' },
    ])
    const densityOptions = reactive([
      {label: 'Compact', value: 'compact'},
      {label: 'Comfortable', value: 'comfortable'},
    ]);
    const sortOptions = reactive([
      {label: 'Most Popular', value: 'popular'},
      {label: 'Popular + Latest', value: 'popular-latest'},
      {label: 'Latest', value: 'latest'},
    ]);

    watch(view, (newValue) => {
      console.log(`Changed view option to: ${newValue}`)
    })
    watch(density, (newValue) => {
      console.log(`Changed density option to: ${newValue}`)
    })
    watch(sort, (newValue) => {
      console.log(`Changed sort option to: ${newValue}`)
    })

    return {dialogRef, onDialogHide, view, density, sort, viewOptions, densityOptions, sortOptions}
  },
})
</script>
