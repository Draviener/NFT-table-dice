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
  colorIndex: [
    {
      backgroundColor: '#00134e',
      fontColor: '#0000ff'
    }, {
      backgroundColor: '#00134e',
      fontColor: '#00ff00'
    }, {
      backgroundColor: '#00134e',
      fontColor: '#ff0000'
    }, {
      backgroundColor: '#00134e',
      fontColor: '#ffffff'
    }, {
      backgroundColor: '#1a1a1a',
      fontColor: '#0000ff'
    }, {
      backgroundColor: '#1a1a1a',
      fontColor: '#00ff00'
    }, {
      backgroundColor: '#1a1a1a',
      fontColor: '#ff0000'
    }, {
      backgroundColor: '#1a1a1a',
      fontColor: '#ffffff'
    }, {
      backgroundColor: '#ffffff',
      fontColor: '#0000ff'
    }, {
      backgroundColor: '#ffffff',
      fontColor: '#000000'
    }, {
      backgroundColor: '#ffffff',
      fontColor: '#ff0000'
    }, {
      backgroundColor: '#555753',
      fontColor: '#000000'
    }, {
      backgroundColor: '#555753',
      fontColor: '#88ff88'
    }, {
      backgroundColor: '#555753',
      fontColor: '#ffffff'
    }, {
      backgroundColor: '#8b10d0',
      fontColor: '#000000'
    }, {
      backgroundColor: '#8b10d0',
      fontColor: '#66CC66'
    }, {
      backgroundColor: '#8b10d0',
      fontColor: '#ffffff'
    }, {
      backgroundColor: '#ecdc19',
      fontColor: '#0000ff'
    }, {
      backgroundColor: '#ecdc19',
      fontColor: '#000000'
    }, {
      backgroundColor: '#ecdc19',
      fontColor: '#ff0000'
    }, {
      backgroundColor: '#408fdd',
      fontColor: '#000000'
    }, {
      backgroundColor: '#408fdd',
      fontColor: '#ffffff'
    }, {
      backgroundColor: '#317a26',
      fontColor: '#88ff88'
    }, {
      backgroundColor: '#317a26',
      fontColor: '#ffffff'
    }, {
      backgroundColor: '#f21d0a',
      fontColor: '#880000'
    }, {
      backgroundColor: '#f21d0a',
      fontColor: '#ffffff'
    }, {
      backgroundColor: '#88ff44',
      fontColor: '#0000ff'
    }, {
      backgroundColor: '#d09c10',
      fontColor: '#000000'
    }, {
      backgroundColor: '#ef54da',
      fontColor: '#ff0000'
    }, {
      backgroundColor: '#4e0000',
      fontColor: '#ffffff'
    }, {
      backgroundColor: '#0000ff',
      fontColor: '#ffffff'
    }
  ]
})
