# 智能合约练习

## 临时笔记
1. 控制权限的方式？
使用修饰器，内容是检查当前的调用者是不是owner。

2. 什么是p2p网络？
每个节点即是客户端，又是服务器，所以节点之间能够直接交互。与之对应的是cs网络，即客户端-服务端架构。

3. struct只能定义数据，和class的区别是没有函数和成员方法。

4. 变量的默认存储位置？
合约里-函数之外：storage
函数入参：memory
函数出餐：string类型是引用类型，它是storage，所以如果要返回一个字符串，需要显示指定其为memory。

~~5. ERC各个标准在应用层面实际上是一个合约，你的合约继承他们，就代表着你符合他们的标准。~~

~~6. 代币不是币，是一种数字资产，所以狗狗币，NFT，游戏道具都可以理解为代币，而以太币才是货币，还是加密货币。~~

7. solidity 0.8.0 是一个关键的版本。它解决了几个关键问题：
- 整数溢出的缺陷
- 引入 try-catch 错误处理机制
- 自定义错误类型

8. struct 是值类型，没有构造函数，所以在实例化它时，不需要使用 new 关键字，而像函数一样调用即可。

9. public、view这俩关键字可以不写，但为了更清晰表明，还是写上吧。

10. 可以直接读取合约的变量，但最好还是封装成一个方法，通过方法返回这个变量，为了封装。

11. 部署完合约之后最好验证一下合约，上传源码，以增加透明度、信任度、调试和审计。

## 合约开发流程细节
1. 安装环境

2. 编写合约
3. 测试合约
- 使用默认的 `npx hardhat test` 来部署一个合约，它会随着脚本的结束而结束。使用`npx hardhat node`来启动一个节点，就可以持久化测试，直到关闭IDE。
4. 部署合约

## 代币合约
代币不是币，是一种数字资产，所以狗狗币，NFT，游戏道具都可以理解为代币，而以太币才是货币，还是加密货币。
ERC各个标准在应用层面实际上是一个合约，你的合约继承他们，就代表着你符合他们的标准。
合约需要符合ERC20标准，所以在合约中需要引入ERC20.sol，并且你的合约要继承他们。
```solidity
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
contract MyCoin is ERC20 {
    constructor(uint256 initialSupply) ERC20("CoinName", "CoinCode") {
        // 指定了代币发行后首先存在哪个钱包上
        _mint(msg.sender, initialSupply);
    }
    // your contract content.
}
```

