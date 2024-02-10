require("./helpers/server")
require("dotenv").config();
const { GoPlus, ErrorCode } = require("@goplus/sdk-node");
const hre = require("hardhat")
const config = require('./config.json')
const { pFactory, sFactory} = require("./helpers/initializer")
const {validateContract, sendNotification} = require("./helpers/utils")

const chain = config.PROJECT_SETTINGS.chainId

const WETH = "0x82aF49447D8a07e3bd95BD0d56f35241523fBab1"

const main = async () =>{
    pFactory.on("PoolCreated", async (token0, token1, fee, tickSpacing, pool) =>{
        console.log("-------------------------------------")
        console.log(`Pool for token:${token0} and token:${token1}`)
        console.log(`Pool address ${pool}`)
        console.log("-------------------------------------")
        console.log(`Pool fee ${fee}`)
        console.log("-------------------------------------")
        console.log(`Pool Tick Spacing ${tickSpacing}`)
        console.log("-------------------------------------")

        // let addresses = [token0, token1]
        let addresses = [WETH, WETH]

        let res = await GoPlus.tokenSecurity(chain, addresses, 30);
        
        if (res.code != ErrorCode.SUCCESS) {
            console.error(res.message);
            return
        } 
        console.log(res.result)
        const valid = await validateContract(res.result)
        
        if(!valid.isValid || !valid.trustScore > 5){
            console.log("Non qualified token")
            return
        }

        console.log("valid")
        await sendNotification(pool, token0, token1, "Pancake Swap")
        // add function to send email about new token pair


    })

    sFactory.on("PoolCreated", async (token0, token1, fee, tickSpacing, pool) =>{
        console.log("-------------------------------------")
        console.log(`Pool for token:${token0} and token:${token1}`)
        console.log(`Pool address ${pool}`)
        console.log("-------------------------------------")

        // let addresses = [token0, token1]
        let addresses = [token0, token1]

        let res = await GoPlus.tokenSecurity(chain, addresses, 30);
        if (res.code != ErrorCode.SUCCESS) {
            console.error(res.message);
            return
        } 
    
        const valid = validateContract(res.result)

        if(!valid.isValid || !valid.trustScore > 5){
            console.log("Non qualified token")
            return
        }

        console.log("valid")
        await sendNotification(pool, token0, token1, "Sushi Swap")
        // add function to send email about new token pair


    })
    
}

main()