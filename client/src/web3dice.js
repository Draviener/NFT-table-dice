import { store } from './store.js'
import { ethers } from "ethers"
import Dice from '../../blockchain/artifacts/contracts/Dice.sol/TabletopDiceNFT.json'

export const web3dice = {  
  provider: null,  
  signer: null,
  diceContract: null,
  diceContractAddress: '0x06D6Ad006Fd7E8CDc3FBB9114E3CFA015b4Ff9e7', //what will be the best way to populate this?
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

    store.chainId == this.provider.chainId

    //todo - if we were going multichain, we would need to get the correct
    //address for the contract based on which network is currently active

    this.diceContract = new ethers.Contract(this.diceContractAddress, Dice.abi, this.provider)



    console.log ('Wallet provider found')
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

    const chainId = '0x4'
    try {
      await window.ethereum.request({
        method: 'wallet_switchEthereumChain',
        params: [{ chainId: chainId }]
      });
    } catch (error) {
    }
  },

  getBlock() {
    this.provider.getBlockNumber().then(block => {
      store.block = block
      console.log('block number is' + block)
    })
  },
  async roll(diceId) {
    console.log('rolling')
    try {
      const roll = await this.diceContract.roll(diceId)
    } catch (err) {
      console.log("Error: ", err)
    }
    store.web3.lastRoll[diceId] = roll
    console.log('roll', roll)
    return roll
  },
  async getTraits(diceId) {
    try {
      const traits = await this.diceContract.getTraits(diceId)
    } catch (err) {
      console.log("Error: ", err)
    }
    store.web3.traits[diceId] = traits
    return traits
  }
}
