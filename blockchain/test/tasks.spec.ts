import { deployContractWithLibrary, getTestWallet } from "./test-helpers";
import { waffle, run } from "hardhat";
import { expect } from "chai";
import sinon from "sinon";

describe("tasks", () => {
  beforeEach(async () => {
    const wallet = getTestWallet();
    sinon.stub(process, "env").value({
      ETH_PUBLIC_KEY: wallet.address,
      ETH_PRIVATE_KEY: wallet.privateKey,
    });
  });

  describe("deploy-all-contracts", () => {
    it("calls through and returns the transaction object", async () => {
      sinon.stub(process.stdout, "write");

      await run("deploy-all-contracts");
      await expect(process.stdout.write).to.have.been.calledWithMatch(
        /Contract address: 0x[0-9a-fA-F]{40}/
      );
    });
  });

  describe("mint-nft", () => {
    beforeEach(async () => {
      const deployedContract = await deployContractWithLibrary("TabletopDiceNFT", "DiceLibrary");
      
      process.env.NFT_CONTRACT_ADDRESS = deployedContract.address;
    });

    it("calls through and returns the transaction object", async () => {
      const wallet = getTestWallet();
      sinon.stub(process.stdout, "write");

      await run("mint-nft", { 
          owner: wallet.address,
          name: "🎲",
          sides: 10,
          tokenUri: "https://partavate.com/token/nft-dice/" 
        });

      // 3 Tx, each with logged messages (REMOVING console.log will break this!)
      await expect(process.stdout.write).to.have.been.calledWithMatch(
        /(Creating Die .*|Created NFT:.*|TX hash: 0x[0-9a-fA-F]{40})/
      );
    });
  });
});