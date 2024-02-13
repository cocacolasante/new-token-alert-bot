// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// You can also run a script with `npx hardhat run <script>`. If you do that, Hardhat
// will compile your contracts, add the Hardhat Runtime Environment's members to the
// global scope, and execute the script.
const hre = require("hardhat");

async function main() {


  const token0 = await hre.ethers.deployContract("Token", ["Credit Token", "CT", hre.ethers.parseEther("1")]);

  await token0.waitForDeployment();

  console.log(
    `Token0 deployed to ${token0.target}`)

  const token1 = await hre.ethers.deployContract("Token", ["Credit Token", "CT", hre.ethers.parseEther("1")]);

  await token1.waitForDeployment();

  console.log(
    `Token1  deployed to ${token1.target}`
  );


}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
