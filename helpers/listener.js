const hre = require("hardhat");
const poolabi = require("@uniswap/v3-core/artifacts/contracts/UniswapV3Pool.sol/UniswapV3Pool.json")
const{provider} = require("./initializer")

async function addListenerForToken(pair){
    pair.on("Swap", () =>{
        console.log("listening for swap on pair:", pair)
    })
}

const createPoolListener = async (poolAddress) =>{
    
    return new hre.ethers.Contract(poolAddress, poolabi.abi, provider)
    
}

module.exports = {
    addListenerForToken,
    createPoolListener
}