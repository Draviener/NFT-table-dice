import { store } from './store.js'
import { ethers } from "ethers"
import Dice from '../../blockchain/artifacts/contracts/Dice.sol/TabletopDiceNFT.json'

export const web3dice = {  
  provider: null,  
  signer: null,
  diceContract: null,
  diceContractAddress: '0xcD75bCf6fc99452Ee43782014dD3c9299dD577a3', //what will be the best way to populate this? A: (@excalq) the HH deploy task!

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
      this.getOwnedDice()
      store.web3.isConnected = true
    })
    
  },

  async switchNetwork() {

    //Todo: this will need to be smarter when we
    //release to polygon.
    const chainId = '0x13881'
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
    try {
      const nonce = parseInt(new Date().getTime() % 512);
      const roll = await this.diceContract.roll(diceId, nonce)
      store.lastRoll[diceId] = roll
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
    store.ownedDice  = await this.diceContract.tokenListOfOwner(store.address)
    console.log('You have dice', store.ownedDice)
    return store.ownedDice
  }
}
