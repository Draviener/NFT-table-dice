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

  task("mint-nft-batches", "Mint Dice NFTs")
  .setAction(async (taskArgs, hre) => {
    return getContract("TabletopDiceNFT", hre)
      .then(async (contract: Contract) => {

        let rand = function (min: number, max: number) { // min and max included 
          return Math.floor(Math.random() * (max - min + 1) + min)
        }

        let sides = 10;
        let nameWords = ["🎲", "💥", "🦍", "🐻", "🐅", "🦂", "🐉", "🏦", "🪐", "🚀", "🏹", 
          "Snake", "Hicks", "Railroad", "Jack", "Benny", "Puppy", "Six", "Gear", "Hustle", "Hipster", 
          "Phoebe", "Jake", "Red", "Easy", "North", "East", "South", "West", "Fever", "Square", 
          "Holding", "Damage", "Dungeon", "Yo", "Brooklyn", "Little", "Metal", "Iron", "Ace", 
          "Bigfoot", "Down", "Up", "Rodeo", "Paladin", "Mage", "Devil", "Goddess", "Hack", "Midnight"]

        let randomName = function () { return nameWords[rand(0, nameWords.length-1)] + ' ' +  nameWords[rand(0, nameWords.length-1)]; };
        let randomStyleId = function () { return rand(0, 30); };
        let randomFontId = function () { return rand(0, 1); };

        let accounts = 5; // In .env
        let mintPerAccount = 20;
        let exactCopies = 1;
        for (let i = 0; i < accounts; i++) {
          for (let j = 0; j < mintPerAccount; j++) {
            let mint = {
              owner: env(`ACCOUNT_${i}`),
              name: randomName(),
              styleId: randomStyleId(),
              font: randomFontId()
            };

            console.log("Minting:", mint);
            
            await contract.mintNFTBatch(
              mint.owner,
              mint.name,
              sides, 
              mint.styleId,
              mint.font,
              exactCopies,
              { gasLimit: 500_000 }
            );
          }
        }
      })
    .catch(error => console.log(error.error));
});
