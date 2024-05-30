const { ethers } = require("hardhat")

async function main() {
    const [deployer] = await ethers.getSigners()

    console.log('Deploying contracts with the account: ', deployer.address)

    // const balance = await deployer.provider.getBalance()
    // console.log('Account balance: ', ethers.utils.formatEther(balance))

    const todo_list_factory = await ethers.getContractFactory('todo_list')
    const contract = await todo_list_factory.deploy()

    console.log('todo_list deployed to: ', contract.runner.address)
}

main().then(() => process.exit(0)).catch(err => console.log(err) && process.exit(1))