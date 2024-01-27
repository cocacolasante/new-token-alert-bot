require("./helpers/server")
require("dotenv").config();
const { GoPlus, ErrorCode } = require("@goplus/sdk-node");
const hre = require("hardhat")

const config = require('./config.json')
const {provider, PositionManager, Factory} = require("./helpers/initializer")
const {validateContract} = require("./helpers/utils")

const chain = config.PROJECT_SETTINGS.chainId

const main = async () =>{
    let purchasedTokens = [{}]
    Factory.on("PoolCreated", async (token0, token1, fee, tickSpacing, pool) =>{
        console.log("-------------------------------------")
        console.log(`Pool for token:${token0} and token:${token1}`)
        console.log(`Pool address ${pool}`)
        console.log("-------------------------------------")

        // let addresses = [token0, token1]
        let addresses = ["0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2"]

        let res = await GoPlus.tokenSecurity(chain, addresses, 30);
        if (res.code != ErrorCode.SUCCESS) {
            console.error(res.message);
            return
        } 

        console.log(res.result);
        const valid = validateContract(res.result)
        console.log(valid)
        
        if(!valid.isValid){
            console.log("Non qualified token")
            return
        }

        if(valid.trustScore > 5){
            console.log("Non qualified token")
            return
        }


        // swap logic to buy token from new pool

        let tokenPair = {
            token0,
            token1
        }
        purchasedTokens.push(tokenPair)









    })
    // create new listener for when tokens are added to purchase tokens to add new swap listeners
    for(i = 0; i < purchasedTokens.length; i++){
        // get swap pair information
        // listen to swaps
    }

    // create listener for swap events to monitor price in either direction
    // if price drops by 20%, sell
    // if price increased by 10000, sell
}

main()