<template>
  <q-pull-to-refresh @refresh="refresh">
    <q-infinite-scroll @load="load" :disable="disable" :offset="250">
      <slot/>
      <template v-slot:loading>
        <div class="row justify-center q-my-md">
          <q-spinner-dots color="primary" size="40px"/>
        </div>
      </template>
    </q-infinite-scroll>

    <div
      v-if="disable"
      class="row items-center justify-center"
      :style="`min-height: ${minHeight} !important`"
    >
      <div>All done!</div>
    </div>
  </q-pull-to-refresh>
</template>

<script lang="ts">
import {defineComponent} from "vue";

export default defineComponent({
  name: 'Scrollable',
  props: {
    disable: {
      type: Boolean,
    },
    minHeight: {
      type: String,
    },
  },
  setup(props, {emit}) {
    function load(index: Number, done: Function) {
      emit('load', index, done)
    }

    function refresh(done: Function) {
      emit('refresh', done)
    }

    return {load, refresh}
  },
});
</script>

<style>
.q-pull-to-refresh,
.q-pull-to-refresh__content {
  min-height: inherit !important;
}
</style>
