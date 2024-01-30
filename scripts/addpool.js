require("dotenv").config()
const hre = require("hardhat");
const {UNISWAP_FACTORY, TOKEN0_ADDRESS, TOKEN1_ADDRESS, NONFUNG_DEPLOYER} = require("../constants")

const uniswapAbi = require("@uniswap/v3-core/artifacts/contracts/UniswapV3Factory.sol/UniswapV3Factory.json")
const nonfugAbi = require("@uniswap/v3-periphery/artifacts/contracts/NonfungiblePositionManager.sol/NonfungiblePositionManager.json")

const bn = require('bignumber.js')
bn.config({ EXPONENTIAL_AT: 999999, DECIMAL_PLACES: 40 })

const TEST_PRIVATE= "0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80"
const alchemyApiKey = process.env.ALCHEMY_MAINNET_KEY;

async function main() {
    if (!alchemyApiKey) {
        throw new Error('Alchemy API key is not set in environment variables');
    }
    // const provider = new hre.ethers.AlchemyProvider("mainnet",`https://eth-mainnet.g.alchemy.com/v2/${alchemyApiKey}`)
    const provider = new hre.ethers.JsonRpcProvider("http://localhost:8545")
    const signer = new hre.ethers.Wallet(TEST_PRIVATE, provider)

    const factory = new hre.ethers.Contract(UNISWAP_FACTORY, uniswapAbi.abi, signer)
    
    const nonFugDeployer = new hre.ethers.Contract(NONFUNG_DEPLOYER, nonfugAbi.abi, signer)

    console.log(`fetched factory at ${factory.target}`)
    console.log(`nonFugDeployer factory at ${nonFugDeployer.target}`)

    const added = await nonFugDeployer.connect(signer).createAndInitializePoolIfNecessary(TOKEN0_ADDRESS, TOKEN1_ADDRESS, 500, encodePriceSqrt(1, 1), { gasLimit: 5000000 })
    const res = await added.wait()
    if(res.status == 1 ){
        console.log("success")
    }

    const poolAddress = await factory.connect(signer).getPool(TOKEN0_ADDRESS, TOKEN1_ADDRESS, 500)
    console.log(poolAddress)

    


}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});



function encodePriceSqrt(reserve1, reserve0) {
    return BigInt(
      new bn(reserve1.toString())
        .div(reserve0.toString())
        .sqrt()
        .multipliedBy(new bn(2).pow(96))
        .integerValue(3)
        .toString()
    )
  }
  