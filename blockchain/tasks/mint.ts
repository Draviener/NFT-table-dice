import { task, types } from "hardhat/config";
import { Contract } from "ethers";
import { TransactionResponse } from "@ethersproject/abstract-provider";
import { env } from "../lib/env";
import { getContract } from "../lib/contract";


task("mint-nft", "Mint Dice NFTs")
  .addParam("owner", "Who will own the NFT", env("ETH_PUBLIC_KEY"), types.string)
  .addParam("name", "The Name of the Die NFT", "🎲", types.string)
  .addParam("sides", "The Number of Faces", 10, types.int)
  .addParam("styleId", "The Style Number (0-30)", 0, types.int)
  .addParam("font", "The Font Id", 1, types.int)
  .setAction(async (taskArgs, hre) => {
    return getContract("TabletopDiceNFT", hre)
      .then((contract: Contract) => {
        return contract.mintNFT(
          taskArgs.owner,
          taskArgs.name,
          taskArgs.sides, 
          taskArgs.styleId,
          taskArgs.font,
          { gasLimit: 500_000 }
        );
      })
      .then((tr: TransactionResponse) => {
        process.stdout.write(`TX hash: ${tr.hash}\n`);
      });
  });
