import { reactive } from 'vue'

export const store = reactive({
  web3: {
    hasWallet: false,
    isConnected: false,
    chain: null,
    accounts: null,
    //todo: one array of dice objects with roll and trait properties
  },
  address: '',
  block: 0,
  lastRoll: [],
  diceTraits: []
})
