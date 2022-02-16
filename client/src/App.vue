<script>
import { store } from './store.js'
import { web3dice } from './web3dice.js'

export default {
  data() {
    return {
      store
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

    <div class="wrapper" v-if="store.web3Connected">
      You are connected. 
      Welcome back {{ store.address }}
    </div>
    <div class="wrapper" v-else>
      <button @click="connect()">Let's go!</button>
    </div>

</template>

<style>
@import './assets/base.css';

#app {
  text-align: center
}
</style>
