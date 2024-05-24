const config = require('../config.json')
require("dotenv").config()
const hre = require("hardhat");
const factoryAbi = require("@uniswap/v3-core/artifacts/contracts/UniswapV3Factory.sol/UniswapV3Factory.json")

// fetch arbitrum provider based on project config settings
let provider
if (config.PROJECT_SETTINGS.isLocal) {
    provider = new hre.ethers.WebSocketProvider(`ws://127.0.0.1:8545/`)
} else {
    provider = new hre.ethers.WebSocketProvider(process.env.ARBITRUM_WS)
}
// fetch base provider
let baseProvider
if (config.PROJECT_SETTINGS.isLocal) {
    baseProvider = new hre.ethers.WebSocketProvider(`ws://127.0.0.1:8545/`)
} else {
    baseProvider = new hre.ethers.WebSocketProvider(process.env.BASE_WS)
}
let BSCProvider 
if (config.PROJECT_SETTINGS.isLocal) {
    BSCProvider = new hre.ethers.WebSocketProvider(`ws://127.0.0.1:8545/`)
} else {
    BSCProvider = new hre.ethers.WebSocketProvider(process.env.BSC_WS)
}

// add additional networks based on code above above
// get instances of the pancakeswap and sushiswap factory on ARBITRUM
const pFactory = new hre.ethers.Contract(config.ARBITRUM.PANCAKESWAP.FACTORY_ADDRESS, factoryAbi.abi, provider)
const sFactory = new hre.ethers.Contract(config.ARBITRUM.SUSHISWAP.FACTORY_ADDRESS, factoryAbi.abi, provider)

// get instances of the pancakeswap and sushiswap factory on BASE
const basePanFactory = new hre.ethers.Contract(config.BASE.PANCAKESWAP.FACTORY_ADDRESS, factoryAbi.abi, baseProvider)
const baseSushiFactory = new hre.ethers.Contract(config.BASE.SUSHISWAP.FACTORY_ADDRESS, factoryAbi.abi, baseProvider)

// get instances of the binance smart chain pancake swap
const bscPancakeFactory = new hre.ethers.Contract(config.BSC.PANCAKESWAP, factoryAbi.abi, BSCProvider)
const bscSushiFactory = new hre.ethers.Contract(config.BSC.SUSHISWAP.FACTORY_ADDRESS, factoryAbi.abi, BSCProvider)

module.exports = {
    provider,
    pFactory,
    sFactory,
    basePanFactory,
    baseSushiFactory,
    bscPancakeFactory,
    bscSushiFactory
}