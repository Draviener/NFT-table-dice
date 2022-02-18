<script setup>
import SvgContainer from './components/layouts/SvgContainer.vue'
import MenuIcon from './components/_menu-icon.svg.vue'
import DiceMenu from './components/DiceMenu.svg.vue'
</script>

<script>
import { store } from './store.js'
import { web3dice } from './web3dice.js'

export default {
  data() {
    return {
      store,
      menu: false
    }
  },
  computed: {
    chainName() {
      if ( store.web3.chain != null) {
        return store.web3.chain.name
      }      
      return 'no chain found'
    }
  },
  methods: {
    connect() {
      web3dice.connect()
    },
    openMenu() {
      this.menu = !this.menu
    },
    roll(diceId) {
      let diceRoll = web3dice.roll(diceId)
      alert('dice rolled: ' + JSON.stringify(diceRoll))
    },
    switchNetwork() {
      web3dice.switchNetwork()
    }
  }
}
</script>

<template>
  <div id="svgContainer">
    <svg-container>
      <g fill="#ffffff"  text-anchor="middle" dominant-baseline="middle" font-size="1.75em">

        <g v-if="!store.web3.hasWallet">
          <text transform="translate(0 -50)">I called out looking for your Web3 wallet provider;</text>
          <text>but alas, I heard only silence.</text>
        </g>

        <g v-else-if="!store.web3.isConnected">
          <text transform="translate(0 -50)">You are on the {{ chainName }} network.</text>
          <g v-if="chainName != 'rinkeby'">
            <text>Please switch to rinkeby</text>
            <g transform="translate(0 70)">
              <rect x="-120" y="-30" width="240" height="60" fill="#222222" rx="15" ry="15" />
              <text>Switch Networks</text>
              <rect x="-120" y="-30" width="240" height="60" fill="#000000" fill-opacity="0" @click="switchNetwork()" class="can-click" />
            </g>
          </g>
          <g v-else>
            <text>Let's connect your account!</text>
            <g transform="translate(0 70)">
              <rect x="-120" y="-30" width="240" height="60" fill="#222222" rx="15" ry="15" />
              <text>Connect It</text>
              <rect x="-120" y="-30" width="240" height="60" fill="#000000" fill-opacity="0" @click="connect()" class="can-click" />
            </g>
          </g>
        </g>

        <g v-else>
          <g :transform="'translate(' + 300 + ' ' + -430 +')'">
            <menu-icon @click="openMenu()" />
          </g>
          <rect x="-140" y="200" width="80" height="80" stroke="#ffffff" fill="#000000" fill-opacity="0.1" stroke-width="1" rx="5" ry="5" />
          <rect x="-40" y="200" width="80" height="80" stroke="#ffffff" fill="#000000" fill-opacity="0.1" stroke-width="1" rx="5" ry="5" />
          <rect x="60" y="200" width="80" height="80" stroke="#ffffff" fill="#000000" fill-opacity="0.1" stroke-width="1" rx="5" ry="5" />
          <rect x="-150" y="190" width="300" height="100" fill="#000000" fill-opacity="0" stroke-width="0" class="can-click" @click="roll(1)" />

          <dice-menu :show="menu" />    

        </g>
      </g>
    </svg-container>
  </div>

</template>

<style>
@import './assets/base.css';

#app {
  text-align: center
}
#svgContainer {
  background: #000000;
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  overflow: hidden;
  z-index: 1000;
  height: 100vh;
  width: 100vw;
}
.can-click:hover {
  cursor: pointer;
}
</style>
