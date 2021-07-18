<template>
  <div
    class="text-primary text-bold q-ma-md"
    v-if="!prevDate || (label(date) !== label(prevDate))"
    v-text="label(date)"
  />
</template>

<script>
export default {
  name: 'DateLabel',
  props: ['date', 'prevDate'],
  computed: {
    label () {
      return date => {
        const dateLabel = (new Date(date)).toLocaleDateString('en-CA')
        const today = new Date()
        const yesterday = new Date()
        yesterday.setDate(today.getDate() - 1)

        switch (dateLabel) {
          case today.toLocaleDateString('en-CA'):
            return 'Today'
          case yesterday.toLocaleDateString('en-CA'):
            return 'Yesterday'
          default:
            return dateLabel
        }
      }
    },
  },
}
</script>
