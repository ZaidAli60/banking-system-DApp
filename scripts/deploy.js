const hre = require("hardhat");

async function main() {
    const Contract = await hre.ethers.getContractFactory("Bank");
    const myContract = await Contract.deploy();

    await myContract.waitForDeployment();

    console.log("Contract deployed to :" , await myContract.getAddress())

}

main()