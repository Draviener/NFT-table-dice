<script setup>
import DtenGenericBackground from './_dice-parts/dten-generic-background.svg.vue'
import DtenGenericNumbers from './_dice-parts/dten-generic-numbers.svg.vue'
</script>
<script>
import { onMounted } from 'vue'
import { store } from '../store.js'

export default {
  props: {
    diceid: {
      type: Number,
      default: 1
    },
  },
  setup () {
    this.tick()
  },
  data () {
    return {
      rollingNumber: 1
    }
  },
  watch: {
    rolling(value, oldValue) {
      if (value) {
        this.tick()
      }
    }
  },
  methods: {
    tick () {
      this.rollingNumber = ((this.rollingNumber + 1) % this.sides) + 1
      if (this.rolling) {
        setTimeout(this.tick, 100)
      }
    },
    displayValue () {
      if (this.rolling) {
        return this.rollingNumber
      }
      return this.value
    },
  },
  computed: {
    rolling () {
      return store.isRolling[this.diceid]      
    },
    value () {
      if (store.lastRoll[this.diceid]) {
        return parseInt(store.lastRoll[this.diceid])
      }
      return 1     
    },
    background () {
      return 1
    },
    font () {
      return 1
    },
    color () {
      return 1
    },

  }
}
</script>

<template>
  <g>
    <ellipse cx="0" cy="60" rx="60" ry="10" fill="#000000" opacity="0.25" />
    <g class="dice" :class="{rolling: rolling}">
      <g fill="#ffffff" stroke="#ffffff">
      <animateTransform v-if="this.rolling" attributeName="transform"
                        attributeType="XML"
                        type="rotate"
                        from="0"
                        to="360"
                        dur="0.75s"
                        animate="freeze"
                        repeatCount="indefinite"/>
        <dten-generic-background v-if="background==1" />
        <dten-generic-background v-if="background==2" />
        <dten-generic-background v-if="background==3" />
        <g v-if="font==1">
          <dten-generic-numbers :value="displayValue()" />
        </g>
      </g>
    </g>
  </g>
</template>

<style>
.dice {
  transition: 0.5s ease-out; 
}
.rolling {
  transition: 2s linear;
  transform: translate(0,-100px) scale(0.75);
}
</style>
