// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// You can also run a script with `npx hardhat run <script>`. If you do that, Hardhat
// will compile your contracts, add the Hardhat Runtime Environment's members to the
// global scope, and execute the script.
const hre = require("hardhat");
require("dotenv").config()
// const {provider } = require("../helpers/initializer")
const {UNISWAP_FACTORY, TOKEN0_ADDRESS, TOKEN1_ADDRESS, NONFUNG_DEPLOYER} = require("../constants")
const tokenAbi = require("../artifacts/contracts/Token.sol/Token.json")
const {PositionManager, Factory, Router} = require("../helpers/initializer")

async function main() {

    const provider = new hre.ethers.JsonRpcProvider("http://localhost:8545")
    const signer = new hre.ethers.Wallet(process.env.SIGNER, provider)

    console.log("MINTING eth for token1")
    const token1 = new hre.ethers.Contract(TOKEN1_ADDRESS, tokenAbi.abi, provider)
    const token0 = new hre.ethers.Contract(TOKEN0_ADDRESS, tokenAbi.abi, provider)

    let tx = await token1.connect(signer).mintTokens(1, {value: hre.ethers.parseEther("1")})

    let res = await tx.wait()
    if(res.status == 1 ){
    console.log("success")
    }else {
    console.log("fail")

    }
    tx = await token0.connect(signer).mintTokens(1, {value: hre.ethers.parseEther("1")})

    res = await tx.wait()
    if(res.status == 1 ){
    console.log("success")
    }else {
    console.log("fail")

    }

    const amount = 1

    tx = await token0.connect(signer).approve(PositionManager.target, amount);
    res = await tx.wait()
    console.log(res.status)
    tx = await token1.connect(signer).approve(PositionManager.target, amount);   
    res = await tx.wait()
    // Example: Setting a price range
    const lowerPrice = 0.9; // Lower end of your price range
    const upperPrice = 1.1; // Upper end of your price range

    const tickLower = priceToTick(lowerPrice);
    const tickUpper = priceToTick(upperPrice);

    const liquidityParams = {
        token0: token0.address,
        token1: token1.address,
        fee: 0,
        tickLower: tickLower,
        tickUpper: tickUpper,
        amount0Desired: amount,
        amount1Desired: amount,
        amount0Min: amount,
        amount1Min: amount,
        recipient: process.env.SIGNER_PUBLIC,
        deadline: Math.floor(Date.now() / 1000) + 60 * 20, // 20 minutes from the current Unix timestamp
    };

    tx = await PositionManager.connect(signer).mint(liquidityParams);
    await tx.wait();

}

function priceToTick(price) {
    return Math.floor(Math.log(price) / Math.log(1.0001));
}




// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
