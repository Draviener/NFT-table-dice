import { ethers, waffle } from "hardhat";
import { Contract, Wallet } from "ethers";
import { expect } from "chai";
import { TransactionResponse } from "@ethersproject/abstract-provider";
import { deployContractWithLibrary } from "./test-helpers";

describe("TabletopDiceNFT", () => {
  const BASE_URI = "https://example.com";
  let deployedContract: Contract;
  let wallet: Wallet;
  let name = "Dungeon Master's D20";
  let sides = 20;
  let fgColor = "0000ff";
  let bgColor = "00134e";
  let font = 1;
  let nonceFn = () => { return Math.floor(Math.random() * 100) };

  beforeEach(async () => {
    [wallet] = waffle.provider.getWallets();
    deployedContract = await deployContractWithLibrary("TabletopDiceNFT", "DiceLibrary");
  });

  async function mintNftDefault(): Promise<TransactionResponse> {
    return deployedContract.mintNFT(
      wallet.address, 
      name,
      sides,
      fgColor,
      bgColor,
      font
    );
  }

  describe("mintNft", async () => {
    it("emits the Transfer event", async () => {
      await expect(mintNftDefault())
        .to.emit(deployedContract, "Transfer")
        .withArgs(ethers.constants.AddressZero, wallet.address, "0");
    });

    it("returns the new item ID", async () => {
      await expect(
        await deployedContract.callStatic.mintNFT(
          wallet.address,
          name,
          sides,
          fgColor,
          bgColor,
          font)
      ).to.eq("0");
    });

    it("increments the item ID", async () => {
      const STARTING_NEW_ITEM_ID = "0";
      const NEXT_NEW_ITEM_ID = "1";

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
        fgColor,
        bgColor,
        font
      );
      await expect(TX).to.be.revertedWith("ERC721: mint to the zero address");
    });

    it("Mints dice NFTs with attributes", async () => {
      let name = "der Würfel!";
      let sides = 10;
      let font = 14;
      let tokenURIexpected = 
        `https://dice.partavate.com/metadata/${name}/${sides}/${fgColor}/${bgColor}/${font}`;

      await deployedContract.mintNFT(wallet.address, 
        name,
        sides,
        fgColor,
        bgColor,
        font);

      // TODO: Get tokenId from emitted event:
      const tokenId = 0;
      let die = await deployedContract.getTraits(tokenId);
      expect(die.name).to.equal(name);
      expect(die.sides).to.equal(sides);
      expect(die.fgColor).to.equal(fgColor);
      expect(die.bgColor).to.equal(bgColor);
      expect(die.font).to.equal(font);

      console.log(await deployedContract.tokenURI(tokenId));
      expect(await deployedContract.tokenURI(tokenId)).to.equal(tokenURIexpected);
    });
  });

  describe("balanceOf", () => {
    it("gets the count of NFTs for this address", async () => {
      await expect(await deployedContract.balanceOf(wallet.address)).to.eq("0");

      await mintNftDefault();
      await mintNftDefault();
      await mintNftDefault();

      let nftBalance = await deployedContract.balanceOf(wallet.address);
      expect(nftBalance).to.eq("3");
    });
  });

  describe("Rolling Tabletop Dice", () => {
    it("Dice NFTs must roll with a result from 1-$sides", async () => {
      await mintNftDefault();

      let tokenId = 0;
      let numRolls = 10;
      for (let index = 0; index < numRolls; ++index) {
        await ethers.provider.send('evm_mine', []); // Advance block number
        expect(await deployedContract.roll(tokenId, nonceFn()))
          .to.be.within(1, sides, "Die result is out of allowed range!")
      }

      it("10-side dice NFTs must roll with a result from 0-9", async () => {1
        await deployedContract.mintNFT(wallet.address, "D10", 10, fgColor, bgColor, font);
  
        let tokenId = 0;
        let numRolls = 10;
        for (let index = 0; index < numRolls; ++index) {
          await ethers.provider.send('evm_mine', []); // Advance block number
          expect(await deployedContract.roll(tokenId, nonceFn()))
            .to.be.within(0, sides, "Die result is out of allowed range!")
        }
      });
    });
  });

  describe("Getting an owners NFT collection", () => {
    it("returns an array of all owned NFT tokenIds", async () => {
      const otherAccount = (await ethers.getSigners())[1];

      let numMinted = 11;
      
      // The first random NFTs will belong to someone else
      for (let i = 0; i < Math.random() * 30; i++) {
        await deployedContract.mintNFT(
          otherAccount.address, 
          "D20", 
          20, 
          fgColor, 
          bgColor, 
          font
        );
      }
      // Now generate NFTs for our wallet address
      for (let i = 0; i < numMinted; i++) {
        await mintNftDefault();
      }
      expect(await deployedContract.getOwnedTokenIds()).to.be.length(numMinted);
    });
  });
});