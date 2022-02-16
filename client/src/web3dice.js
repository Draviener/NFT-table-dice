import { store } from './store.js'
import { ethers } from "ethers"
import { splitSignature, stripZeros } from '@ethersproject/bytes'

const provider = new ethers.providers.Web3Provider(window.ethereum)

export const web3dice = {    
  connect() {
    provider.send("eth_requestAccounts", []).then(accounts => {
        store.accounts = accounts
    })
    const signer = provider.getSigner()
    signer.getAddress().then( address => {
      store.address = address
    })
    store.web3Connected = true
  },
  getBlock() {
    provider.getBlockNumber().then(block => {
      store.block = block
      console.log('block number is' + block)
    })
  },
}
