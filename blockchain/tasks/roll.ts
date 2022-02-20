import { task, types } from "hardhat/config";
import { Contract } from "ethers";
import { TransactionResponse } from "@ethersproject/abstract-provider";
import { env } from "../lib/env";
import { getContract } from "../lib/contract";

task("roll", "Roll a die that I own")
  .addParam("tokenid", "NFT token id", 0, types.int)
  .addParam("nonce", "NFT token id", 3, types.int)
  .setAction(async (taskArgs, hre) => {
    console.log("Rolling Dice on NFT #", taskArgs.tokenid);
    return getContract("TabletopDiceNFT", hre)
      .then((contract: Contract) => {
        return contract.roll(taskArgs.tokenid, taskArgs.nonce);
      })
      .then((tr: TransactionResponse) => {
        process.stdout.write(`TX hash: ${tr.hash}\n`);
      });
  });
