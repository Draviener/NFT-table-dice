import { task, types } from "hardhat/config";
import { Contract } from "ethers";
import { TransactionResponse } from "@ethersproject/abstract-provider";
import { env } from "../lib/env";
import { getContract } from "../lib/contract";


task("mint-nft", "Mint Dice NFTs")
  .addParam("owner", "Who will own the NFT", env("ETH_PUBLIC_KEY"), types.string)
  .addParam("name", "The Name of the Die NFT", "🎲", types.string)
  .addParam("sides", "The Number of Faces", 10, types.int)
  .addParam("fgColor", "The Font Color in hex chars", "ffffff", types.string)
  .addParam("bgColor", "The Background Color in hex chars", "00134e", types.string)
  .addParam("font", "The Font Id", 1, types.int)
  .setAction(async (taskArgs, hre) => {
    return getContract("TabletopDiceNFT", hre)
      .then((contract: Contract) => {
        return contract.mintNFT(
          taskArgs.owner,
          taskArgs.name,
          taskArgs.sides, 
          taskArgs.fgColor,
          taskArgs.bgColor,
          taskArgs.font,
          { gasLimit: 500_000 }
        );
      })
      .then((tr: TransactionResponse) => {
        process.stdout.write(`TX hash: ${tr.hash}\n`);
      });
  });
