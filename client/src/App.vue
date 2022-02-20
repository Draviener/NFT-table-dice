<script setup>
import SvgContainer from './components/layouts/SvgContainer.vue'
import MenuIcon from './components/_menu-icon.svg.vue'
import Die from './components/_die.svg.vue'
import DiceMenu from './components/DiceMenu.svg.vue'
import { web3dice } from './web3dice.js'

</script>

<script>
import { store } from './store.js'

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
      this.menu = true
    },
    closeMenu() {
      this.menu = false
    },
    async roll() {
      if (!store.diceSelected()) {
        this.menu = true
      } else {
        //let traits = await web3dice.getTraits(diceId)
        //console.log('traits: ', traits)
        if (store.selectedDice[0] != null) {
          await  web3dice.delayedRoll(store.selectedDice[0])
        }
        if (store.selectedDice[1] != null) {
          await  web3dice.delayedRoll(store.selectedDice[1])
        }
        if (store.selectedDice[2] != null) {
          await  web3dice.delayedRoll(store.selectedDice[2])
        }
      }
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
          <g v-if="chainName != 'maticmum'">
            <text>Please switch to Polygon Mumbai</text>
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

          <dice-menu :show="menu" />    

          <g transform="translate(0 150)">
            <die 
              v-if="store.selectedDice[0] != null"
              transform="translate(-140 -10)"
              :diceid="store.selectedDice[0]"
            />
            <die 
              v-if="store.selectedDice[1] != null"
              transform="translate(0 10)"
              :diceid="store.selectedDice[1]"
            />
            <die 
              v-if="store.selectedDice[2] != null"
              transform="translate(140 -10)"
              :diceid="store.selectedDice[2]"
            />
            <text v-if="!store.diceSelected()">Select Your Dice</text>
            <rect x="-300" y="-100" width="600" height="200" fill="#000000" stroke="#ffffff" fill-opacity="0" stroke-width="0" class="can-click" @click="roll()" />
          </g>
          <rect v-if="menu" x="-2000" y="-2000" width="4000" height="4000" fill="#000000" opacity="0.4" @click="closeMenu" />
          <dice-menu :show="menu" @close="closeMenu()" />        
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
