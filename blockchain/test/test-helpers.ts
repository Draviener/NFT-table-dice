import sinon from "sinon";
import chai from "chai";
import sinonChai from "sinon-chai";
import { ethers as hardhatEthers, waffle } from "hardhat";
import { Contract, Wallet } from "ethers";
import type { FactoryOptions } from "@nomiclabs/hardhat-ethers/types";

chai.use(sinonChai);

afterEach(() => {
  sinon.restore();
});

export async function deployContractWithLibrary(name: string, library: string): Promise<Contract> {
    // First deploy the Library, since an address is required
    const LibraryPromise = hardhatEthers.getContractFactory(library);
    const libraryDeployed = await LibraryPromise.then((contractFactory) => contractFactory.deploy());

    const factoryOptions:FactoryOptions = {
      signer: getTestWallet(),
      libraries: {
          [library]: libraryDeployed.address,
      }
    };

    return hardhatEthers
      .getContractFactory(name, factoryOptions)
      .then((contractFactory) => contractFactory.deploy());
}


export function deployTestContract(name: string): Promise<Contract> {
  return hardhatEthers
    .getContractFactory(name, getTestWallet())
    .then((contractFactory) => contractFactory.deploy());
}

export function getTestWallet(): Wallet {
  return waffle.provider.getWallets()[0];
}