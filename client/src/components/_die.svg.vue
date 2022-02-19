<script>
export default {
  props: {
    isRolling: {
      type: Boolean,
      default: false
    },
    value: {
      type: Number,
      default: 1
    },
    type: {
      type: Number,
      default: 1
    },
    colorTheme: {
      type: Number,
      default: 1
    }
  },
  data () {
    return {
    }
  },
  computed: {
  }
}
</script>

<template>
  <g fill="#ffffff" stroke="#ffffff">
    <text>{{ value }}</text>
  </g>
</template>

<style>
</style>
