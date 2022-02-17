<script>
import { store } from './store.js'
import { web3dice } from './web3dice.js'

export default {
  data() {
    return {
      store
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
    }
  }
}
</script>

<template>

    <div class="wrapper" v-if="!store.web3.hasWallet">
      We called out looking for your Web3 wallet provider; but alas, we heard nothing.
    </div>
    <div class="wrapper" v-else-if="!store.web3.isConnected">
      You are connected to: {{ chainName }}.<br />
      <button @click="connect()">Let's Connect</button>
    </div>
    <div class="wrapper" v-else>
      You are connected to: {{ chainName }}.<br />
      You are {{ store.address }}
    </div>
    <div>
    </div>

</template>

<style>
@import './assets/base.css';

#app {
  text-align: center
}
</style>
