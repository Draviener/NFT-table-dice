<script setup>
import DtenGenericOne from './numbers/generic/dten-generic-one.svg.vue'
import DtenGenericTwo from './numbers/generic/dten-generic-two.svg.vue'
import DtenGenericThree from './numbers/generic/dten-generic-three.svg.vue'
import DtenGenericFour from './numbers/generic/dten-generic-four.svg.vue'
import DtenGenericFive from './numbers/generic/dten-generic-five.svg.vue'
import DtenGenericSix from './numbers/generic/dten-generic-six.svg.vue'
import DtenGenericSeven from './numbers/generic/dten-generic-seven.svg.vue'
import DtenGenericEight from './numbers/generic/dten-generic-eight.svg.vue'
import DtenGenericNine from './numbers/generic/dten-generic-nine.svg.vue'
import DtenGenericTen from './numbers/generic/dten-generic-ten.svg.vue'
import DtenGenericEleven from './numbers/generic/dten-generic-eleven.svg.vue'
import DtenGenericTwelve from './numbers/generic/dten-generic-twelve.svg.vue'
import DtenGenericThirteen from './numbers/generic/dten-generic-thirteen.svg.vue'
import DtenGenericFourteen from './numbers/generic/dten-generic-fourteen.svg.vue'
import DtenGenericFifteen from './numbers/generic/dten-generic-fifteen.svg.vue'
import DtenGenericSixteen from './numbers/generic/dten-generic-sixteen.svg.vue'
import DtenGenericSeventeen from './numbers/generic/dten-generic-seventeen.svg.vue'
import DtenGenericEighteen from './numbers/generic/dten-generic-eighteen.svg.vue'
import DtenGenericNineteen from './numbers/generic/dten-generic-nineteen.svg.vue'
import DtenGenericTwenty from './numbers/generic/dten-generic-twenty.svg.vue'
</script>
<script>
export default {
  props: {
    value: {
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
    <dten-generic-one v-if="value==1" />
    <dten-generic-two v-if="value==2" />
    <dten-generic-three v-if="value==3" />
    <dten-generic-four v-if="value==4" />
    <dten-generic-five v-if="value==5" />
    <dten-generic-six v-if="value==6" />
    <dten-generic-seven v-if="value==7" />
    <dten-generic-eight v-if="value==8" />
    <dten-generic-nine v-if="value==9" />
    <dten-generic-ten v-if="value==10" />
    <dten-generic-eleven v-if="value==11" />
    <dten-generic-twelve v-if="value==12" />
    <dten-generic-thirteen v-if="value==13" />
    <dten-generic-fourteen v-if="value==14" />
    <dten-generic-fifteen v-if="value==15" />
    <dten-generic-sixteen v-if="value==16" />
    <dten-generic-seventeen v-if="value==17" />
    <dten-generic-eighteen v-if="value==18" />
    <dten-generic-nineteen v-if="value==19" />
    <dten-generic-twenty v-if="value==20" />
  </g>
</template>

<style>
</style>
