require("./helpers/server")
require("dotenv").config();
const hre = require("hardhat")


const config = require('./config.json')
const {provider, PositionManager, Factory} = require("./helpers/initializer")

const main = async () =>{
    Factory.on("PoolCreated", (token0, token1, fee, tickSpacing, pool) =>{
        console.log(token0, token1, fee, tickSpacing, pool)
    })
}

main()