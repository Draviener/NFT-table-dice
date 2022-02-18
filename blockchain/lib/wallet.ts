import { ethers } from "ethers";
import { env } from "./env";
import { getProvider } from "./provider";
import config from "../hardhat.config"

export function getWallet(network: string, accountNum = 0): ethers.Wallet {
  // TODO: Use Network dependent Private Key
  const private_key = config.networks?.network?.accounts?[accountNum] : "Unknown";
  return new ethers.Wallet(private_key, getProvider());
}