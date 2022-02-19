<script setup>
import DtenGenericBackground from './_dice-parts/dten-generic-background.svg.vue'
import DtenGenericThree from './_dice-parts/dten-generic-three.svg.vue'
</script>
<script>
export default {
  props: {
    rolling: {
      type: Boolean,
      default: false
    },
    value: {
      type: Number,
      default: 1
    },
    background: {
      type: String,
      default: 10
    },
    font: {
      type: Number,
      default: 1
    },
    color: {
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
    <g v-if="font==1">
      <dten-generic-three v-if="value==1" />
      <dten-generic-three v-if="value==2" />
      <dten-generic-three v-if="value==3" />
      <dten-generic-three v-if="value==4" />
      <dten-generic-three v-if="value==5" />
      <dten-generic-three v-if="value==6" />
      <dten-generic-three v-if="value==7" />
      <dten-generic-three v-if="value==8" />
      <dten-generic-three v-if="value==9" />
      <dten-generic-three v-if="value==10" />
    </g>
  </g>
</template>

<style>
</style>
