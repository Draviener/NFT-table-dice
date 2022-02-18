import { Contract, ethers } from "ethers";
import { getContractAt } from "@nomiclabs/hardhat-ethers/internal/helpers";
import { HardhatRuntimeEnvironment } from "hardhat/types";
import { env } from "./env";
import { getProvider } from "./provider";

export function getContract(
  name: string,
  hre: HardhatRuntimeEnvironment
): Promise<Contract> {
  const WALLET = new ethers.Wallet(env("ETH_PRIVATE_KEY"), getProvider());
  return getContractAt(hre, name, env("NFT_CONTRACT_ADDRESS"), WALLET);
}