// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

// 为什么不应该使用 tx.origin 进行身份验证？
// tx.origin : 初始调用者，不管合约嵌套调用多少次，值都是不变的。
// msg.sender: 函数调用者，谁调用，就是谁。
// 
// 那为什么不可以用来做身份验证？
// 首先，假如你写了一个 my_contract 合约

contract my_contract {
    address public owner;

    constructor() {
        owner = msg.sender;
    }

    function withdraw(uint256 amount) public {
        require(tx.origin == owner, 'you are not the owner!');
        payable(msg.sender).transfer(amount);
    }

    receive() external payable {}
}

// 实现了一个 withdraw 的转账方法。
// 假如有个人又写了一个恶意合约，其中有一个 attack 方法来调用上面的合约

contract malicious_contract {
    my_contract public wallet;

    constructor(address _wallet) {
        wallet = my_contract(_wallet);
    }

    function attack() public {
        wallet.withdraw(1 ether);
    }
}

// ok，假设现在一个名为a的钱包，调用了这个 malicious_contract
// 在 withdraw 方法里，tx.origin 的值为 a 的钱包地址
// msg.sender 的值为 malicious_contract，因为是 malicious_contract 这个合约调用了它
// 所以这种情况下，require(tx.origin == owner, 'you are not the owner!') 这一行就会发出异常警告。

// 但如果这个a，是你自己呢？与 my_contract 的 owner 就一致了。
// 如果写恶意合约的人以合适的理由诱导你调用他写的 attack 方法，你的钱岂不是都转到他的合约里了？