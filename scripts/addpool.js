require("dotenv").config()
const hre = require("hardhat");
const {UNISWAP_FACTORY} = require("../constants")
const uniswapAbi = require("@uniswap/v3-core/artifacts/contracts/UniswapV3Factory.sol/UniswapV3Factory.json")

async function main() {
    const provider = new hre.ethers.AlchemyProvider( "mainnet",`https://eth-mainnet.g.alchemy.com/v2/${process.env.ALCHEMY_MAINNET_KEY}`)
    const factory = new hre.ethers.Contract(UNISWAP_FACTORY, uniswapAbi.abi, provider)

    console.log(`fetched factory at ${factory.target}`)


}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
