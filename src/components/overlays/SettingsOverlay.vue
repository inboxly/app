<template>
  <q-dialog
    ref="dialogRef" @hide="onDialogHide"
    transition-show="slide-up" transition-hide="slide-down" maximized auto-close
  >
    <div class="bg-dark">
      <q-toolbar class="row">
        <div class="col text-left">
          <q-btn dense @click="dialogRef.hide" icon="arrow_back"/>
        </div>
        Settings overlay
        <div class="col text-right">
        </div>
      </q-toolbar>
    </div>
  </q-dialog>
</template>

<script lang="ts">
import {defineComponent} from 'vue'
import {useDialogPluginComponent} from "quasar";

export default defineComponent({
  name: 'SettingsOverlay',
  emits: [...useDialogPluginComponent.emits],
  setup() {
    const {dialogRef, onDialogHide} = useDialogPluginComponent();
    return {dialogRef, onDialogHide}
  }
});
</script>
