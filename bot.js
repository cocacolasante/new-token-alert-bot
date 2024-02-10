require("./helpers/server")
require("dotenv").config();
const { GoPlus, ErrorCode } = require("@goplus/sdk-node");
const hre = require("hardhat")
const {addListenerForToken, createPoolListener} = require("./helpers/listener")
const config = require('./config.json')
const {provider, pPositionManager, pFactory, sFactory, sPositionManager} = require("./helpers/initializer")
const {validateContract} = require("./helpers/utils")

const chain = config.PROJECT_SETTINGS.chainId

const WETH = "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2"

const main = async () =>{
    
    pFactory.on("PoolCreated", async (token0, token1, fee, tickSpacing, pool) =>{
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

        // add function to send email about new token pair


    })
    
}

main()