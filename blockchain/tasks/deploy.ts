import { task, types } from "hardhat/config";
import { Contract } from "ethers";
import { TransactionResponse } from "@ethersproject/abstract-provider";
import { env } from "../lib/env";
import { getContract } from "../lib/contract";

task("deploy-all-contracts", "Deploy NFT contract").setAction(async (_, hre) => {
  // First deploy the Library, since an address is required
  const LibraryPromise = hre.ethers.getContractFactory("DiceLibrary");
  const libraryDeployed = await LibraryPromise.then((contractFactory) => contractFactory.deploy());

  const factoryOptions = {
    // TODO: read --networks parameter, also make lib/wallet.ts work
    // signer: getWallet("rinkeby"),
    libraries: {
        "DiceLibrary": libraryDeployed.address,
    }
  };

  console.log("DiceLibrary.sol redeployed. NFT ownership is reset. New address is: ", libraryDeployed.address);
  console.log("Update the library address in \"deploy\" task!!");

  return hre.ethers
    .getContractFactory("TabletopDiceNFT", factoryOptions)
    .then((contractFactory) => contractFactory.deploy())
    .then((result) => {
      process.stdout.write(`Contract address: ${result.address}\n`);
      // TODO: Update contract address in .env
    });
});

// Deploys only the outer Dice.sol. // TODO: Actually persist owner storage
task("deploy", "Deploy NFT contract").setAction(async (_, hre) => {
  return hre.ethers
    .getContractFactory("TabletopDiceNFT", {
      libraries: {
          "DiceLibrary": "0x2B7F80C11293eA8AACb5Ed39a28246523284bB7B",
      }})
    .then((contractFactory) => contractFactory.deploy())
    .then((result) => {
      process.stdout.write(`Contract address: ${result.address}\n`);
      // TODO: Update contract address in .env
    });
});
