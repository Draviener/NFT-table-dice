import { createApp } from 'vue'
import App from './App.vue'
import { web3dice } from './web3dice.js'

web3dice.init()
const app = createApp(App).mount('#app')

