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
    {  //0
      backgroundColor: '#00134e',
      fontColor: '#0000ff'
    }, 
    { //1
      backgroundColor: '#00134e',
      fontColor: '#00ff00'
    }, 
    { //2
      backgroundColor: '#00134e',
      fontColor: '#ff0000'
    }, 
    { //3
      backgroundColor: '#00134e',
      fontColor: '#ffffff'
    }, 
    { //4
      backgroundColor: '#1a1a1a',
      fontColor: '#0000ff'
    }, 
    { //5
      backgroundColor: '#1a1a1a',
      fontColor: '#00ff00'
    }, 
    { //5
      backgroundColor: '#1a1a1a',
      fontColor: '#ff0000'
    }, 
    { //7
      backgroundColor: '#1a1a1a',
      fontColor: '#ffffff'
    }, 
    { //8
      backgroundColor: '#ffffff',
      fontColor: '#0000ff'
    }, 
    { //9
      backgroundColor: '#ffffff',
      fontColor: '#000000'
    }, 
    { //10
      backgroundColor: '#ffffff',
      fontColor: '#ff0000'
    }, 
    { //11
      backgroundColor: '#555753',
      fontColor: '#000000'
    }, 
    { //12
      backgroundColor: '#555753',
      fontColor: '#88ff88'
    }, 
    { //13
      backgroundColor: '#555753',
      fontColor: '#ffffff'
    }, 
    { //14
      backgroundColor: '#8b10d0',
      fontColor: '#000000'
    }, 
    { //15
      backgroundColor: '#8b10d0',
      fontColor: '#66CC66'
    }, 
    { //16
      backgroundColor: '#8b10d0',
      fontColor: '#ffffff'
    }, 
    { //17
      backgroundColor: '#ecdc19',
      fontColor: '#0000ff'
    }, 
    { //18
      backgroundColor: '#ecdc19',
      fontColor: '#000000'
    }, 
    { //19
      backgroundColor: '#ecdc19',
      fontColor: '#ff0000'
    }, 
    { //20
      backgroundColor: '#408fdd',
      fontColor: '#000000'
    }, 
    { //21
      backgroundColor: '#408fdd',
      fontColor: '#ffffff'
    }, 
    { //22
      backgroundColor: '#317a26',
      fontColor: '#88ff88'
    }, 
    { //23
      backgroundColor: '#317a26',
      fontColor: '#ffffff'
    }, 
    { //24
      backgroundColor: '#f21d0a',
      fontColor: '#880000'
    }, 
    { //25
      backgroundColor: '#f21d0a',
      fontColor: '#ffffff'
    }, 
    { //26
      backgroundColor: '#88ff44',
      fontColor: '#0000ff'
    }, 
    { //27
      backgroundColor: '#d09c10',
      fontColor: '#000000'
    }, 
    { //28
      backgroundColor: '#ef54da',
      fontColor: '#ff0000'
    }, 
    { //29
      backgroundColor: '#4e0000',
      fontColor: '#ffffff'
    }, 
    { //30
      backgroundColor: '#0000ff',
      fontColor: '#ffffff'
    }
  ]
})
