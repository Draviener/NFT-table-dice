import("@nomiclabs/hardhat-ethers");
import "@nomiclabs/hardhat-etherscan";
import("@nomiclabs/hardhat-waffle");
import "hardhat-gas-reporter";
import dotenv from "dotenv";
// You need to export an object to set up your config
// Go to https://hardhat.org/config/ to learn more

dotenv.config();

import("./tasks/nft");

import { HardhatUserConfig } from "hardhat/config";

const config: HardhatUserConfig = {
  solidity: "0.8.6",
  networks: {
    rinkeby: {
      url: process.env.RINKEBY_GETH_URI,
      accounts:
        process.env.RINKEBY_GETH_PRIVATE_KEY !== undefined ? [process.env.RINKEBY_GETH_PRIVATE_KEY] : [],
    },
    mumbai: {
      chainId: 80001,
      url: process.env.MUMBAI_RPC_URI,
      accounts:
        process.env.MUMBAI_PRIVATE_KEY !== undefined ? [process.env.MUMBAI_PRIVATE_KEY] : [],
    },
    polygon: {
      chainId: 137,
      url: process.env.POLYGON_RPC_URI,
      accounts: 
        process.env.POLYGON_PRIVATE_KEY !== undefined ? [process.env.POLYGON_PRIVATE_KEY] : [],
    },
  },
  gasReporter: {
    enabled: process.env.REPORT_GAS !== undefined,
    currency: "USD",
  },
  etherscan: {
    apiKey: process.env.ETHERSCAN_API_KEY,
  },
};

export default config;