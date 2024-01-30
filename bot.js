require("./helpers/server")
require("dotenv").config();
const { GoPlus, ErrorCode } = require("@goplus/sdk-node");
const hre = require("hardhat")
const {addListenerForToken, createPoolListener} = require("./helpers/listener")
const config = require('./config.json')
const {provider, PositionManager, Factory, Router} = require("./helpers/initializer")
const {validateContract} = require("./helpers/utils")

const chain = config.PROJECT_SETTINGS.chainId

const WETH = "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2"

const main = async () =>{
    let activeListeners = new Map();
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
    
        const valid = validateContract(res.result)

        if(!valid.isValid || !valid.trustScore > 5){
            console.log("Non qualified token")
            return
        }

        // if(token1 != WETH){
        //     console.log("token not paired with weth")
        // }

        const deadline = Math.floor(Date.now() / 1000) + 1200;

        const params = {
            tokenIn: token1,
            tokenOut: token0,
            fee: fee,
            recipient: process.env.SIGNER_PUBLIC,
            deadline: deadline,
            amountIn: BigInt(100),
            amountOutMinimum: 0,
            sqrtPriceLimitX96: 0
        };

        const signer = new hre.ethers.Wallet(process.env.SIGNER, provider)
        const tx = await Router.connect(signer).exactInputSingle(params)
        const resp = await tx.wait()
        if(resp.status == 1){
            console.log("Success")
        }else {
            console.log("Failed")

        }
        // swap logic to buy token from new pool

        if(!activeListeners.has(pool)){
            console.log("listening for swap on pair: ", pool)
            
            const poolPair = await createPoolListener(pool)

            activeListeners.set(pool, poolPair);
            console.log("creted pool pair")
            poolPair.on("Swap", () =>{
                console.log("listening for swap")

            })

        }
       

        








    })
    // create new listener for when tokens are added to purchase tokens to add new swap listeners
    // create listener for swap events to monitor price in either direction
    // if price drops by 20%, sell
    // if price increased by 10000, sell
}

main()