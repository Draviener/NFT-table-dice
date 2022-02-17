import { reactive } from 'vue'

export const store = reactive({
  web3: {
    hasWallet: false,
    isConnected: false,
    chain: null,
  },
  accounts: null,
  address: '',
  block: 0
})
