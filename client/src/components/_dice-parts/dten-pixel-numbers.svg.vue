<script setup>
import DtenPixelOne from './numbers/pixel/dten-pixel-one.svg.vue'
import DtenPixelTwo from './numbers/pixel/dten-pixel-two.svg.vue'
import DtenPixelThree from './numbers/pixel/dten-pixel-three.svg.vue'
import DtenPixelFour from './numbers/pixel/dten-pixel-four.svg.vue'
import DtenPixelFive from './numbers/pixel/dten-pixel-five.svg.vue'
import DtenPixelSix from './numbers/pixel/dten-pixel-six.svg.vue'
import DtenPixelSeven from './numbers/pixel/dten-pixel-seven.svg.vue'
import DtenPixelEight from './numbers/pixel/dten-pixel-eight.svg.vue'
import DtenPixelNine from './numbers/pixel/dten-pixel-nine.svg.vue'
import DtenPixelTen from './numbers/pixel/dten-pixel-ten.svg.vue'
import DtenPixelEleven from './numbers/pixel/dten-pixel-eleven.svg.vue'
import DtenPixelTwelve from './numbers/pixel/dten-pixel-twelve.svg.vue'
import DtenPixelThirteen from './numbers/pixel/dten-pixel-thirteen.svg.vue'
import DtenPixelFourteen from './numbers/pixel/dten-pixel-fourteen.svg.vue'
import DtenPixelFifteen from './numbers/pixel/dten-pixel-fifteen.svg.vue'
import DtenPixelSixteen from './numbers/pixel/dten-pixel-sixteen.svg.vue'
import DtenPixelSeventeen from './numbers/pixel/dten-pixel-seventeen.svg.vue'
import DtenPixelEighteen from './numbers/pixel/dten-pixel-eighteen.svg.vue'
import DtenPixelNineteen from './numbers/pixel/dten-pixel-nineteen.svg.vue'
import DtenPixelTwenty from './numbers/pixel/dten-pixel-twenty.svg.vue'
</script>

<script>
export default {
  props: {
    value: {
      type: Number,
      default: 1
    },
    fontColor: {
      type: String,
      default: '#ffffff'
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
  <g :fill="fontColor" :stroke="fontColor" stroke-opacity="0.25">
    <dten-pixel-one v-if="value==1" />
    <dten-pixel-two v-if="value==2" />
    <dten-pixel-three v-if="value==3" />
    <dten-pixel-four v-if="value==4" />
    <dten-pixel-five v-if="value==5" />
    <dten-pixel-six v-if="value==6" />
    <dten-pixel-seven v-if="value==7" />
    <dten-pixel-eight v-if="value==8" />
    <dten-pixel-nine v-if="value==9" />
    <dten-pixel-ten v-if="value==10" />
    <dten-pixel-eleven v-if="value==11" />
    <dten-pixel-twelve v-if="value==12" />
    <dten-pixel-thirteen v-if="value==13" />
    <dten-pixel-fourteen v-if="value==14" />
    <dten-pixel-fifteen v-if="value==15" />
    <dten-pixel-sixteen v-if="value==16" />
    <dten-pixel-seventeen v-if="value==17" />
    <dten-pixel-eighteen v-if="value==18" />
    <dten-pixel-nineteen v-if="value==19" />
    <dten-pixel-twenty v-if="value==20" />
  </g>
</template>

<style>
</style>
