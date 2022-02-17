import { store } from './store.js'
import { ethers } from "ethers"

export const web3dice = {  
  provider: null,  
  signer: null,
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

    
    window.ethereum.on('connect', (info) => {
      console.log('connected callback ' + JSON.stringify(info))
      store.web3.hasWallet = true
    })    
    window.ethereum.on("disconnect", (info) => {
      console.log('disconnected callback ' +  + JSON.stringify(info))
    })    

    this.provider.on("network", (newNetwork, oldNetwork) => {
      console.log('network changed')
      if (oldNetwork) {
          window.location.reload()
      }
    })
    this.provider.on("block", (blockNumber) => {
      console.log('block', blockNumber)
    })

    console.log ('Wallet provider found')

    if (this.provider.isConnected) {
      console.log('is this it')
    }

    store.chainId == this.provider.chainId

  },

  

  async connect() {
    try {
      store.accounts = await this.provider.send("eth_requestAccounts", [])
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
  getBlock() {
    this.provider.getBlockNumber().then(block => {
      store.block = block
      console.log('block number is' + block)
    })
  },
}
