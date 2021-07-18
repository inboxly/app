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

<script>
export default {
  name: 'Scrollable',
  emits: ['refresh', 'load'],
  props: ['disable', 'minHeight'],
  methods: {
    load (index, done) {
      this.$emit('load', index, done)
    },
    refresh (done) {
      this.$emit('refresh', done)
    },
  },
}
</script>
