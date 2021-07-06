<template>
  <q-btn dense flat round :icon="icon">
    <slot/>
  </q-btn>
</template>

<script>
export default {
  name: 'BarButton',
  props: {
    icon: {
      type: String,
      default: '',
    },
  },
}
</script>
