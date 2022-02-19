<script setup>
import DtenGenericBackground from './_dice-parts/dten-generic-background.svg.vue'
import DtenGenericOne from './_dice-parts/dten-generic-one.svg.vue'
import DtenGenericTwo from './_dice-parts/dten-generic-two.svg.vue'
import DtenGenericThree from './_dice-parts/dten-generic-three.svg.vue'
import DtenGenericFour from './_dice-parts/dten-generic-four.svg.vue'
import DtenGenericFive from './_dice-parts/dten-generic-five.svg.vue'
import DtenGenericSix from './_dice-parts/dten-generic-six.svg.vue'
import DtenGenericSeven from './_dice-parts/dten-generic-seven.svg.vue'
import DtenGenericEight from './_dice-parts/dten-generic-eight.svg.vue'
import DtenGenericNine from './_dice-parts/dten-generic-nine.svg.vue'
import DtenGenericTen from './_dice-parts/dten-generic-ten.svg.vue'
import DtenGenericEleven from './_dice-parts/dten-generic-eleven.svg.vue'
import DtenGenericTwelve from './_dice-parts/dten-generic-twelve.svg.vue'
import DtenGenericThirteen from './_dice-parts/dten-generic-thirteen.svg.vue'
import DtenGenericFourteen from './_dice-parts/dten-generic-fourteen.svg.vue'
import DtenGenericFifteen from './_dice-parts/dten-generic-fifteen.svg.vue'
import DtenGenericSixteen from './_dice-parts/dten-generic-sixteen.svg.vue'
import DtenGenericSeventeen from './_dice-parts/dten-generic-seventeen.svg.vue'
import DtenGenericEighteen from './_dice-parts/dten-generic-eighteen.svg.vue'
import DtenGenericNineteen from './_dice-parts/dten-generic-nineteen.svg.vue'
import DtenGenericTwenty from './_dice-parts/dten-generic-twenty.svg.vue'
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
      type: Number,
      default: 1
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
    <dten-generic-background v-if="background==1" />
    <dten-generic-background v-if="background==2" />
    <dten-generic-background v-if="background==3" />
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
