import { reactive } from 'vue'

export const store = reactive({
  web3: {
    hasWallet: false,
    isConnected: false,
    chain: null,
    accounts: null,
    //todo: one array of dice objects with roll and trait properties
  },
  diceLoaded: false,
  address: '',
  block: 0,
  lastRoll: [],
  diceTraits: [],
  isRolling: [],
  ownedDice: [
  ],
  selectedDice: [
    null,
    null,
    null
  ],
  diceSelected() {
    if(this.selectedDice[0] != null) {
      return true
    }
    if(this.selectedDice[1] != null) {
      return true
    }
    if(this.selectedDice[2] != null) {
      return true
    }
    false
  }
})
