const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("TodoList Contract", function () {
  let wa;
  let owner;
  let addr1
  let addr2

  beforeEach(async function () {
    const W = await ethers.getContractFactory("WaCoin");
    [owner, addr1, addr2] = await ethers.getSigners();
    const initialSupply = ethers.parseEther('1000000')
    wa = await W.deploy(initialSupply);
  });

    it('check balance', async function () {
        const balance = await wa.balanceOf(owner.address);
        console.log(balance)
    })

    it('check transfer', async function () {
        const balance_owner = await wa.balanceOf(owner.address);
        const balance_addr1 = await wa.balanceOf(addr1.address);
        console.log(`合约余额 ${balance_owner} | ${balance_addr1}`)
        await wa.transfer(addr1.address, '50000')
        const balance_owner_2 = await wa.balanceOf(owner.address);
        const balance_addr1_2 = await wa.balanceOf(addr1.address);
        console.log(`合约余额 ${balance_owner_2} | ${balance_addr1_2}`)
    })

});
