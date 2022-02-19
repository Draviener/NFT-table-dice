import { store } from './store.js'
import { ethers } from "ethers"
import Dice from '../../blockchain/artifacts/contracts/Dice.sol/TabletopDiceNFT.json'

export const web3dice = {  
  provider: null,  
  signer: null,
  diceContract: null,
  diceContractAddress: '0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512', //what will be the best way to populate this? A: (@excalq) the HH deploy task!
  async init() {
    try {
      this.provider = new ethers.providers.Web3Provider(window.ethereum,"any")
    } catch (e) {
      console.log('Error: ' + e.message)
      return
    }
    store.web3.hasWallet = true
    
    try {
      store.web3.chain = await this.provider.getNetwork()
    } catch (e) {
      console.log('Error: ' + e.message)
    }     

    this.provider.on("network", (newNetwork, oldNetwork) => {
      console.log('network changed')
      if (oldNetwork) {
          window.location.reload()
      }
    })
    this.provider.on("block", (blockNumber) => {
      console.log('block', blockNumber)
    })

    //todo - if we were going multichain, we would need to get the correct
    //address for the contract based on which network is currently active

    this.diceContract = new ethers.Contract(this.diceContractAddress, Dice.abi, this.provider)

    console.log ('Wallet provider found')
    if (parseInt(store.web3.chain.chainId) == 4) { 
      this.connect()
    }
  },
  
  async connect() {
    try {
      store.web3.accounts = await this.provider.send("eth_requestAccounts", [])
    } catch(e) {
      console.log('Error: ' + e.message)
      return
    } 
    this.signer = this.provider.getSigner()
    
    this.signer.getAddress().then( address => {
      store.address = address
    })
    store.web3.isConnected = true

    
  },

  async switchNetwork() {

    //Todo: this will need to be smarter when we
    //release to polygon.
    const chainId = '0x4'
    try {
      await window.ethereum.request({
        method: 'wallet_switchEthereumChain',
        params: [{ chainId: chainId }]
      });
    } catch (error) {
    }
  },

  async delayedRoll(diceId) {
    let rollDelay = Math.floor(Math.random() * 100)
    console.log('delay', rollDelay)
    setTimeout(() => {this.roll(diceId)}, rollDelay)
  },

  async roll(diceId) {
    store.isRolling[diceId] = true
    console.log('rolling')
    try {
      const roll = await this.diceContract.roll(diceId)
      store.lastRoll[diceId] = roll
      console.log('roll', roll)
      //store.isRolling[diceId] = false
      setTimeout(() => {store.isRolling[diceId] = false}, 1000)
      return roll
    } catch (err) {
      console.log("Error: ", err)
      store.isRolling[diceId] = false
      return 'failed'
    }
  },

  async getTraits(diceId) {
    try {
      const traits = await this.diceContract.getTraits(diceId)
      store.diceTraits[diceId] = traits
      return traits
    } catch (err) {
      console.log("Error: ", err)
      return 'failed'
    }
  },

  async getOwnedDice() {
    const owned = [1,2,1,2,1,2]
    store.ownedDice = owned
    console.log('You have dice', store.ownedDice)
    return owned
  }
}
