import { ethers } from "ethers";
import { env } from "./env";
import { getProvider } from "./provider";

export function getWallet(): ethers.Wallet {
  // TODO: Use Network dependent Private Key
  return new ethers.Wallet(env("RINKEBY_GETH_PRIVATE_KEY"), getProvider());
}