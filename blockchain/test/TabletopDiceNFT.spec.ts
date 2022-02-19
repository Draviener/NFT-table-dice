import { ethers, waffle } from "hardhat";
import { Contract, Wallet } from "ethers";
import { expect } from "chai";
import { TransactionResponse } from "@ethersproject/abstract-provider";
import sinon from "sinon";
import { deployContractWithLibrary } from "./test-helpers";
import * as provider from "../lib/provider";
import { resourceLimits } from "worker_threads";
import { deployContract } from "ethereum-waffle";

describe("TabletopDiceNFT", () => {
  const TOKEN_URI = "https://hackerlink.s3.amazonaws.com/static/files/dice-with-color.png";
  let deployedContract: Contract;
  let wallet: Wallet;
  let name = "D6 Standard";
  let sides = 6;

  beforeEach(async () => {
    sinon.stub(provider, "getProvider").returns(waffle.provider);
    [wallet] = waffle.provider.getWallets();
    //deployedContract = await deployTestContract("TabletopDiceNFT");
    deployedContract = await deployContractWithLibrary("TabletopDiceNFT", "DiceLibrary");
  });

  async function mintNftDefault(): Promise<TransactionResponse> {
    return deployedContract.mintNFT(wallet.address, name, sides, TOKEN_URI);
  }

  describe("mintNft", async () => {
    it("emits the Transfer event", async () => {
      await expect(mintNftDefault())
        .to.emit(deployedContract, "Transfer")
        .withArgs(ethers.constants.AddressZero, wallet.address, "1");
    });

    it("returns the new item ID", async () => {
      await expect(
        await deployedContract.callStatic.mintNFT(wallet.address, name, sides, TOKEN_URI)
      ).to.eq("1");
    });

    it("increments the item ID", async () => {
      const STARTING_NEW_ITEM_ID = "1";
      const NEXT_NEW_ITEM_ID = "2";

      await expect(mintNftDefault())
        .to.emit(deployedContract, "Transfer")
        .withArgs(
          ethers.constants.AddressZero,
          wallet.address,
          STARTING_NEW_ITEM_ID
        );

      await expect(mintNftDefault())
        .to.emit(deployedContract, "Transfer")
        .withArgs(
          ethers.constants.AddressZero,
          wallet.address,
          NEXT_NEW_ITEM_ID
        );
    });

    it("cannot mint to address zero", async () => {
      const TX = deployedContract.mintNFT(
        ethers.constants.AddressZero,
        name, 
        sides,
        TOKEN_URI
      );
      await expect(TX).to.be.revertedWith("ERC721: mint to the zero address");
    });

    it("Mints dice NFTs with attributes", async () => {
      let name = "der Würfel!";
      let sides = 10;
      let tokenURI = 'https://hackerlink.s3.amazonaws.com/static/files/dice-with-color.png';

      await deployedContract.mintNFT(wallet.address, name, sides, tokenURI);

      // TODO: Get tokenId from emitted event:
      const tokenId = 1;
      let die = await deployedContract.getTraits(tokenId);
      expect(die.name).to.equal(name);
      expect(die.sides).to.equal(sides);
      expect(die.tokenURI).to.equal(tokenURI);
    });
  });

  describe("balanceOf", () => {
    it("gets the count of NFTs for this address", async () => {
      await expect(await deployedContract.balanceOf(wallet.address)).to.eq("0");

      await mintNftDefault();

      expect(await deployedContract.balanceOf(wallet.address)).to.eq("1");
    });
  });

  describe("Rolling Tabletop Dice", () => {
    it("Dice NFTs must roll with a result from 1-$sides", async () => {
      await mintNftDefault();

      let tokenId = 1;
      let numRolls = 10;
      for (var index = 0; index < numRolls; ++index) {
        await ethers.provider.send('evm_mine', []); // Advance block number
        expect(await deployedContract.roll(tokenId))
          .to.be.within(1, sides, "Die result is out of allowed range!")
      }

      it("10-side dice NFTs must roll with a result from 0-9", async () => {
        await deployedContract.mintNFT(wallet.address, "D10", 10, TOKEN_URI);
  
        let tokenId = 1;
        let numRolls = 10;
        for (var index = 0; index < numRolls; ++index) {
          await ethers.provider.send('evm_mine', []); // Advance block number
          expect(await deployedContract.roll(tokenId))
            .to.be.within(0, sides, "Die result is out of allowed range!")
        }
      });
    });
  });
});