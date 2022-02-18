import { task, types } from "hardhat/config";
import { Contract } from "ethers";
import { TransactionResponse } from "@ethersproject/abstract-provider";
import { env } from "../lib/env";
import { getContract } from "../lib/contract";
import { getWallet } from "../lib/wallet";

task("deploy-contract", "Deploy NFT contract").setAction(async (_, hre) => {
  // First deploy the Library, since an address is required
  const LibraryPromise = hre.ethers.getContractFactory("DiceLibrary");
  const libraryDeployed = await LibraryPromise.then((contractFactory) => contractFactory.deploy());

  const factoryOptions = {
    signer: getWallet(),
    libraries: {
        "DiceLibrary": libraryDeployed.address,
    }
  };

  return hre.ethers
    .getContractFactory("TabletopDiceNFT", factoryOptions)
    .then((contractFactory) => contractFactory.deploy())
    .then((result) => {
      process.stdout.write(`Contract address: ${result.address}`);
    });
});


task("mint-nft", "Mint Dice NFTs")
  .addParam("owner", "Who will own the NFT", env("ETH_PUBLIC_KEY"), types.string)
  .addParam("name", "The Name of the Die NFT", "🎲", types.string)
  .addParam("sides", "The Number of Faces", 10, types.int)
  .addParam("tokenUri", "NFT Metadata URI", "https://partavate.com/token/nft-dice/", types.string)
  .setAction(async (taskArgs, hre) => {
    return getContract("TabletopDiceNFT", hre)
      .then((contract: Contract) => {
        return contract.mintNFT(
          taskArgs.owner,
          taskArgs.name,
          taskArgs.sides,
          taskArgs.tokenUri, {
          gasLimit: 500_000,
        });
      })
      .then((tr: TransactionResponse) => {
        process.stdout.write(`TX hash: ${tr.hash}`);
      });
  });