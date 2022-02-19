<script>
import { web3dice } from '../web3dice.js'

export default {
  props: {
    show: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      hover: false
    }
  },
  methods: {
    shop() {
      const url = "https://testnets.opensea.io/assets?search%5Bquery%5D="+web3dice.diceContractAddress
      window.open(url, '_blank')
    },
    explorer() {
      //"https://mumbai.polygonscan.com/address/"
      const url = "https://rinkeby.etherscan.io/address/"+web3dice.diceContractAddress
      window.open(url, '_blank')
    },
    close() {
      this.$emit('close')
    }
  },
  computed: {
    fillOpacity() {
      if (this.hover) {
        return 1
      }
      return 0.6
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

    <rect x="-100" y="-200" width="200" height="200" fill="none" stroke="#ffffff" stroke-opacity="0.2" stroke-width="2" rx="25" ry="25" />      


    <g stroke-width="4" stroke="#ffffff" transform="translate(-270 -250)">
      <rect v-for="n in 10" :x="-20 + n * 50" y="-20" width="40" height="40" fill="none" stroke="#ffffff" stroke-opacity="0.2" stroke-width="2" rx="5" ry="5" />      
    </g>

    <g stroke-width="4" stroke="#ffffff" transform="translate(-200 -100)">
      <line x1="20" y1="-40" x2="-20" y2="0" />
      <line x1="20" y1="40" x2="-20" y2="0" />
    </g>
    <g stroke-width="4" stroke="#ffffff" transform="translate(200 -100)">
      <line x1="-20" y1="-40" x2="20" y2="0" />
      <line x1="-20" y1="40" x2="20" y2="0" />
    </g>

    <g transform="translate(0 150)">
    <rect x="-300" y="0" width="180" height="180" fill="none" stroke="#ffffff" stroke-opacity="0.2" stroke-width="2" rx="25" ry="25" />      
    <rect x="-90" y="0" width="180" height="180" fill="none" stroke="#ffffff" stroke-opacity="0.2" stroke-width="2" rx="25" ry="25" />      
    <rect x="120" y="0" width="180" height="180" fill="none" stroke="#ffffff" stroke-opacity="0.2" stroke-width="2" rx="25" ry="25" />      
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

      <g transform="translate(0 10)">
        <rect x="-100" y="-30" width="200" height="60" fill="#ff44dd" fill-opacity="0.5" stroke="#ff44dd" stroke-opacity="0.2" stroke-width="2" rx="25" ry="25" />      
        <text font-size="0.9em">Let's Play!</text>
        <rect x="-100" y="-30" width="200" height="60" fill="#ffffff" fill-opacity="0" stroke="#ffffff"  stroke-width="0" @click="close" class="can-click" />      
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
