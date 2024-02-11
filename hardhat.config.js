require("dotenv").config()
require("@nomicfoundation/hardhat-toolbox")

const privateKey = process.env.PRIVATE_KEY || ""

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.20",
  networks: {
    hardhat: {
      forking: {
        url:process.env.BASE_URL,
      }
    },
    arbitrum:{
      url: process.env.ARBITRUM_URL,
    }
  }
};