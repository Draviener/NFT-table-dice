import { reactive } from 'vue'

export const store = reactive({
  web3Connected: false,
  accounts: null,
  address: '',
  block: 0
})
