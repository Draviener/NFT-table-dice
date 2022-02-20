<script setup>
import DtenGenericBackground from './_dice-parts/background/dten-generic-background.svg.vue'
import DtenGenericNumbers from './_dice-parts/dten-generic-numbers.svg.vue'
import DtenPixelNumbers from './_dice-parts/dten-pixel-numbers.svg.vue'
</script>

<script>
import { store } from '../store.js'

export default {
  props: {
    diceid: {
      type: Number,
      default: 1
    },
  },
  data () {
    return {
      rollingNumber: 1,
      store
    }
  },
  watch: {
    rolling(value) {
      if (value) {
        this.rollNumbers()
      }
    }
  },
  methods: {
    rollNumbers () {
      this.rollingNumber = ((this.rollingNumber) % this.sides) + 1
      if (this.rolling) {
        setTimeout(this.rollNumbers, 200)
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
      return (this.diceid % this.sides + 1)
    },
    background () {
      return 1
    },
    fontType () {
      const typeId = this.diceid % 2
      return typeId
    },
    fontColor () {
      const colorId = this.diceid % 30
      return store.colorIndex[colorId].fontColor
    },
    backgroundColor () {
      const colorId = this.diceid % 30
      return store.colorIndex[colorId].backgroundColor
    },
    sides () {
      const nftid = store.ownedDice[this.diceid]
      if (store.diceTraits[nftid]) {
        return store.diceTraits[nftid].sides
      }
      return 20
    },

  }
}
</script>

<template>
  <g  v-if="store.ownedDice[diceid] != null">
    <ellipse cx="0" cy="60" rx="60" ry="10" fill="#000000" opacity="0.25" stroke-width="0" />
    <g class="dice" :class="{rolling: rolling}">
      <g fill="#ffffff" stroke="#ffffff">
      <animateTransform v-if="rolling" attributeName="transform"
                        attributeType="XML"
                        type="rotate"
                        from="0"
                        to="360"
                        dur="0.75s"
                        animate="freeze"
                        repeatCount="indefinite"/>
        <dten-generic-background :backgroundColor="backgroundColor" />
        <g v-if="fontType == 0">
          <dten-generic-numbers :fontColor="fontColor" :value="displayValue()" />
        </g>
        <g v-if="fontType == 1">
          <dten-pixel-numbers :fontColor="fontColor" :value="displayValue()" />
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
