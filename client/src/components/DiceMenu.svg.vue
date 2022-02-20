<script setup>
import Die from './_die.svg.vue'
</script>
<script>
import { web3dice } from '../web3dice.js'
import { store } from '../store.js'

export default {
  props: {
    show: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      hover: false,
      ownedDiceIndex: 0,
      store
    }
  },
  methods: {
    shop() {
      const url = "https://testnets.opensea.io/assets?search%5Bquery%5D="+web3dice.diceContractAddress
      window.open(url, '_blank')
    },
    explorer() {
      const url = "https://mumbai.polygonscan.com/address/"+web3dice.diceContractAddress
      window.open(url, '_blank')
    },
    close() {
      this.$emit('close')
    },
    add(id) {
      for(let i=0;i<3;i++) {
        if (store.selectedDice[i] == this.ownedDiceIndex) {
          store.selectedDice[i] = null
        }
      }
      store.selectedDice[id] = this.ownedDiceIndex
    },
    remove(id) {
      store.selectedDice[id] = null
    },
    goLeft() {
      if (this.isMoreLeft) {
        this.ownedDiceIndex--
      }
    },
    goRight() {
      if (this.isMoreRight) {
        this.ownedDiceIndex++
      }
    },
    getScaler(n) {
      const delta = Math.abs(this.ownedDiceIndex - n)
      const gradient = (delta * delta) / 40
      return Math.max(0, (1 - gradient))
    },
    quickadd() {
      if (store.selectedDice[0] == this.ownedDiceIndex) {
        return
      }
      if (store.selectedDice[1] == this.ownedDiceIndex) {
        return
      }
      if (store.selectedDice[2] == this.ownedDiceIndex) {
        return
      }
      if (store.selectedDice[1] == null) {
        store.selectedDice[1] = this.ownedDiceIndex
        return
      }
      if (store.selectedDice[0] == null) {
        store.selectedDice[0] = this.ownedDiceIndex
        return
      }
      if (store.selectedDice[2] == null) {
        store.selectedDice[2] = this.ownedDiceIndex
        return
      }

    }
  },
  computed: {
    fillOpacity() {
      if (this.hover) {
        return 1
      }
      return 0.6
    },
    haveDice() {
      if (store.ownedDice.length > 0) {
        return true
      }
      return false
    },
    isMoreLeft() {
      if (this.ownedDiceIndex > 0) {
        return true
      }
      return false
    },
    isMoreRight() {
      if (this.ownedDiceIndex + 1 < store.ownedDice.length) {
        return true
      }
      return false
    },
    boxOneOpacity() {
      if (this.ownedDiceIndex == store.selectedDice[0]) {
        return 0.6
      }
      return 0.2
    },
    boxTwoOpacity() {
      if (this.ownedDiceIndex == store.selectedDice[1]) {
        return 0.6
      }
      return 0.2
      
    },
    boxThreeOpacity() {
      if (this.ownedDiceIndex == store.selectedDice[2]) {
        return 0.6
      }
      return 0.2
      
    }
  }  
}
</script>

<template>
  <g :class="{show: show, hide: !show}" class="menu">
    <defs> 
      <linearGradient id="menu-background" gradientTransform="rotate(90)">
        <stop offset="5%" stop-color="#222222" stop-opacity="1" />
        <stop offset="100%" stop-color="#222222" stop-opacity="1" />
      </linearGradient>
    </defs>
  
    <rect x="-350" y="-450" width="700" height="1000" fill="url(#menu-background)" stroke="#ffffff" stroke-opacity="0.2" stroke-width="2" rx="25" ry="25" />

    <g transform="translate(0 -290)" v-if="haveDice">

      <g stroke-width="4" stroke="#ffffff" transform="translate(0 -100)">
        <g v-for="(id, n) in store.ownedDice" :key="'k' + id + n">
          <g :transform="'translate('+ ((n * 20) - (ownedDiceIndex * 20)) +' 0)'">
            <die 
              v-if="n != ownedDiceIndex"
              :transform="'translate(' + ((n - ownedDiceIndex) * 40) * getScaler(n) + ' ' + (getScaler(n) * 100)  + ') scale(' + getScaler(n)/3 + ')'"
              :diceid="n"
            />
          </g>
        </g>
      </g>

      <g transform="translate(0 10)">
        <die 
          transform="translate(0 90) scale(1.1)"
          :diceid="ownedDiceIndex"
          @click="quickadd()"
        />
      </g>
      <text transform="translate(0 220)" font-size="0.5em" fill="#666666">NFT: #{{ store.ownedDice[ownedDiceIndex] }}</text>

      <g stroke-width="4" stroke="#ffffff" transform="translate(-200 100)" v-if="isMoreLeft">
        <line x1="20" y1="-40" x2="-20" y2="0" />
        <line x1="20" y1="40" x2="-20" y2="0" />
        <rect x="-45" y="-55" width="90" height="110" fill="#000000" fill-opacity="0" stroke-width="0" class="can-click" @click="goLeft()" />
      </g>
      <g stroke-width="4" stroke="#ffffff" transform="translate(200 100)" v-if="isMoreRight">        
        <line x1="-20" y1="-40" x2="20" y2="0" />
        <line x1="-20" y1="40" x2="20" y2="0" />
        <rect x="-45" y="-55" width="90" height="110" fill="#000000" fill-opacity="0" stroke-width="0" class="can-click" @click="goRight()" />
      </g>

    </g>
    <g transform="translate(0 -150)" v-else>
    <text>You have no dice.</text>
    </g>

    <g transform="translate(0 50)" v-if="haveDice">

    <rect x="-300" y="0" width="180" height="180" fill="none" stroke="#ffffff" :stroke-opacity="boxOneOpacity" stroke-width="2" rx="25" ry="25" />      
    <rect x="-90" y="0" width="180" height="180" fill="none" stroke="#ffffff" :stroke-opacity="boxTwoOpacity" stroke-width="2" rx="25" ry="25" />      
    <rect x="120" y="0" width="180" height="180" fill="none" stroke="#ffffff" :stroke-opacity="boxThreeOpacity" stroke-width="2" rx="25" ry="25" />      
      <die 
        v-if="store.selectedDice[0] != null"
        transform="translate(-210 90) scale(0.6)"
        :diceid="store.selectedDice[0]"
      />
      <die 
        v-if="store.selectedDice[1] != null"
        transform="translate(0 90) scale(0.6)"
        :diceid="store.selectedDice[1]"
      />
      <die 
        v-if="store.selectedDice[2] != null"
        transform="translate(210 90) scale(0.6)"
        :diceid="store.selectedDice[2]"
      />

    <g transform="translate(-210 180)" v-if="store.selectedDice[0] != null">
      <circle cx="-0" cy="0" r="20" fill="#440000" stroke="#880000" stroke-width="3" />
      <line x1="-10" y1="-10" y2= "10" x2="10" stroke="#ffffff" stroke-width="3"  />
      <line x1= "10" y1="-10" y2="10" x2="-10" stroke="#ffffff" stroke-width="3"  />
      <circle cx="-0" cy="0" r="30" fill="#440000" opacity="0" class="can-click" @click="remove(0)" />
    </g>
    <g transform="translate(-210 0)" v-else>
      <circle cx="-0" cy="0" r="20" fill="#004400" stroke="#008800" stroke-width="3" />
      <line x1="-10" y1="0" x2="10" y2="0" stroke="#ffffff" stroke-width="3"  />
      <line x1= "0" y1="-10" x2="0" y2="10" stroke="#ffffff" stroke-width="3"  />
      <circle cx="-0" cy="0" r="30" fill="#004400" opacity="0" class="can-click" @click="add(0)" />
    </g>
    <g transform="translate(0 180)" v-if="store.selectedDice[1] != null">
      <circle cx="-0" cy="0" r="20" fill="#440000" stroke="#880000" stroke-width="3" />
      <line x1="-10" y1="-10" y2= "10" x2="10" stroke="#ffffff" stroke-width="3"  />
      <line x1= "10" y1="-10" y2="10" x2="-10" stroke="#ffffff" stroke-width="3"  />
      <circle cx="-0" cy="0" r="30" fill="#440000" opacity="0" class="can-click" @click="remove(1)" />
    </g>
    <g transform="translate(0 0)" v-else>
      <circle cx="-0" cy="0" r="20" fill="#004400" stroke="#008800" stroke-width="3" />
      <line x1="-10" y1="0" x2="10" y2="0" stroke="#ffffff" stroke-width="3"  />
      <line x1= "0" y1="-10" x2="0" y2="10" stroke="#ffffff" stroke-width="3"  />
      <circle cx="-0" cy="0" r="30" fill="#004400" opacity="0" class="can-click" @click="add(1)" />
    </g>
    <g transform="translate(210 180)" v-if="store.selectedDice[2] != null">
      <circle cx="-0" cy="0" r="20" fill="#440000" stroke="#880000" stroke-width="3" />
      <line x1="-10" y1="-10" y2= "10" x2="10" stroke="#ffffff" stroke-width="3"  />
      <line x1= "10" y1="-10" y2="10" x2="-10" stroke="#ffffff" stroke-width="3"  />
      <circle cx="-0" cy="0" r="30" fill="#440000" opacity="0" class="can-click" @click="remove(2)" />
    </g>
    <g transform="translate(210 0)" v-else>
      <circle cx="-0" cy="0" r="20" fill="#004400" stroke="#008800" stroke-width="3" />
      <line x1="-10" y1="0" x2="10" y2="0" stroke="#ffffff" stroke-width="3"  />
      <line x1= "0" y1="-10" x2="0" y2="10" stroke="#ffffff" stroke-width="3"  />
      <circle cx="-0" cy="0" r="30" fill="#004400" opacity="0" class="can-click" @click="add(2)" />
    </g>
    </g>


    <g transform="translate(0 350)">
      <g transform="translate(-200 0)">
        <rect x="-80" y="-20" width="160" height="40" fill="#4444ff" fill-opacity="0.5" stroke="#4444ff" stroke-opacity="0.2" stroke-width="2" rx="15" ry="15" />      
        <text font-size="0.6em">Shop For Dice</text>
        <rect x="-80" y="-20" width="160" height="40" fill="#ffffff" fill-opacity="0" stroke="#ffffff"  stroke-width="0" @click="shop" class="can-click" />      
      </g>

      <g transform="translate(200 0)">
        <rect x="-80" y="-20" width="160" height="40" fill="#4444ff" fill-opacity="0.5" stroke="#4444ff" stroke-opacity="0.2" stroke-width="2" rx="15" ry="15" />      
        <text font-size="0.6em">View Contract</text>
        <rect x="-80" y="-20" width="160" height="40" fill="#ffffff" fill-opacity="0" stroke="#ffffff"  stroke-width="0" @click="explorer" class="can-click" />      
      </g>

      <g transform="translate(0 20)">
        <rect x="-100" y="-40" width="200" height="80" fill="#ff44dd" fill-opacity="0.5" stroke="#ff44dd" stroke-opacity="0.2" stroke-width="2" rx="25" ry="25" />      
        <text font-size="0.9em" v-if="haveDice">Let's Play!</text>
        <text font-size="0.6em" v-else>Close</text>
        <rect x="-100" y="-40" width="200" height="80" fill="#ffffff" fill-opacity="0" stroke="#ffffff"  stroke-width="0" @click="close" class="can-click" />      
      </g>
    </g>
  </g>
</template>

<style>
  g.show {
    transform: rotate(0deg);
  }
  g.hide {
    transform: rotate(-180deg);
  }
  g.menu {
    transition: transform 0.5s;
    transform-origin: 100% 0%;
  }
</style>
