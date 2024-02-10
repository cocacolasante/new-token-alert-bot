const config = require('../config.json')
require("dotenv").config()
const hre = require("hardhat");
const factoryAbi = require("@uniswap/v3-core/artifacts/contracts/UniswapV3Factory.sol/UniswapV3Factory.json")
const nonfugAbi = require("@uniswap/v3-periphery/artifacts/contracts/NonfungiblePositionManager.sol/NonfungiblePositionManager.json")
const routerabi = require("@uniswap/v3-periphery/artifacts/contracts/interfaces/ISwapRouter.sol/ISwapRouter.json")

const TEST_PRIVATE= "0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80"
const wallet = process.env.PRIVATE_KEY || TEST_PRIVATE

// fetch the provider based on project config settings
let provider
if (config.PROJECT_SETTINGS.isLocal) {
    provider = new hre.ethers.WebSocketProvider(`ws://127.0.0.1:8545/`)
} else {
    provider = new hre.ethers.WebSocketProvider(process.env.ARBITRUM_WS)
}

const pFactory = new hre.ethers.Contract(config.ARBITRUM.PANCAKESWAP.FACTORY_ADDRESS, factoryAbi.abi, provider)
const pPositionManager = new hre.ethers.Contract(config.ARBITRUM.PANCAKESWAP.NonfungiblePositionManager, nonfugAbi.abi, provider)
const sFactory = new hre.ethers.Contract(config.ARBITRUM.SUSHISWAP.FACTORY_ADDRESS, factoryAbi.abi, provider)
const sPositionManager = new hre.ethers.Contract(config.ARBITRUM.SUSHISWAP.NonfungiblePositionManager, nonfugAbi.abi, provider)


module.exports = {
    provider,
    pFactory,
    pPositionManager,
    sFactory,
    sPositionManager,
}