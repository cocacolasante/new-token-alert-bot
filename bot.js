require("./helpers/server")
require("dotenv").config();
const { GoPlus, ErrorCode } = require("@goplus/sdk-node");
const hre = require("hardhat")

const config = require('./config.json')
const {provider, PositionManager, Factory} = require("./helpers/initializer")

const chain = config.PROJECT_SETTINGS.chainId

const main = async () =>{
    Factory.on("PoolCreated", async (token0, token1, fee, tickSpacing, pool) =>{
        console.log("-------------------------------------")
        console.log(`Pool for token:${token0} and token:${token1}`)
        console.log(`Pool address ${pool}`)
        console.log("-------------------------------------")

        let addresses = [token0, token1]
        // let addresses = ["0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2"]

        let res = await GoPlus.tokenSecurity(chain, addresses, 30);
        if (res.code != ErrorCode.SUCCESS) {
            console.error(res.message);
        } else {
            console.log(res.result);
        }



    })
}

main()