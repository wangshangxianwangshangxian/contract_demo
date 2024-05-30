const { ethers } = require('hardhat')

async function main() {
    const [deployer] = await ethers.getSigners();

    console.log("Deploying contracts with the account:", deployer.address);

    const initialSupply = ethers.parseUnits("1000000", 18);
    const MyToken = await ethers.getContractFactory("WaCoin");
    const myToken = await MyToken.deploy(initialSupply);

    console.log("Token deployed to:", myToken.runner.address);
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });
