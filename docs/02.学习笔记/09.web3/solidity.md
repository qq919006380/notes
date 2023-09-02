---
title: solidity
date: 2022-09-08 21:53:45
permalink: /pages/a7c4c0/
sidebar: auto
categories:
  - 随笔
tags:
  - 
author: 
  name: 夏天夏
  link: https://github.com/qq919006380
---
## [官方翻译文档](https://docs.soliditylang.org/zh/v0.8.19/index.html)
## 变量类型
- 数值类型
    - 布尔值(bool)
    - 整数型
        - int整数 包括负数
        - uint 正整数
        - uint256 256位正整数
    - 函数类型(solidity文档里把函数归到数值)
    - 定长字节 bytes32 bytes8 bytes1 
- 引用类型
    - 数组
    - 结构体
    - 地址类型
      - address 普通地址
      - payable address 可以转账的地址,比普通地址多了 transfer 和 send 两个成员方法
        
- 映射类型
    - solidity里的哈希表

## 函数类型
#### 可见性说明
  - publish 内部外部均可见，publish变量会自动生成getter函数用于查询数值
  - private 只能从本合约内部访问，继承的合约也不能用（也可用于修饰状态变量）
  - external 只能从合约外部访问（但可使用this.f()来调用f是函数名）
  - internal(默认) 只能从合约内部访问，继承的合约可以用（也可用于修饰状态变量）
#### 函数的权限 （默认是能读能写）
  - pure 不能读取写入储存在链上的状态变量
    - pure 函数通常用于执行纯粹的计算任务，例如数学计算或数据转换，而不会对区块链状态产生影响。
  - view 能读，但不能写
    - view 函数通常用于查询合约的状态或执行计算，而不会产生状态变化
  - payable 可支付的

#### 函数的输出
- return 用于函数体中，返回指定的变量
- returns 加在函数名称后面，用于返回变量类型以及变量名


## 引用类型
#### solidity数据存储位置有三类 storage、memory、calldata不同存储位置的gas成本不同，storage类型数据存在链上，类似计算机的硬盘，gas多，memory和calldata类型存在临时内存里gas少，各自场景
1、storage合约里的状态变量默认都是storage 
2、memory 函数里的参数和临时变量一般都用memory，存储内存中，不上链 
3、calldata和memory类似，存储在内存中，不上链，于memory不同的是calldata变量不能修改（immutable）一般用于函数的参数 

#### 赋值关系
1、storage（合约的状态变量）赋值给本地storage（函数里的）时候，会创建引用。
2、storage赋值给memory，会创建独立的复本。
3、memory赋值给memory，会创建引用，改变新变量会影响原变量。
4、其他情况，变量赋值给storage，会创建独立的复本，修改其中一个不会影响另一个。


## 变量作用域
#### 状态变量
状态变量存储在链上，所以gas消耗高，在合约内函数外声明
```sol
contract Hello{
    uint publish q
}
```

#### 局部变量
局部变量是仅在函数执行过程中有效的变量，函数退出后变量无效，局部变量的数据存储在内存中，不上链，gas低，局部变量只在函数内声明
```sol
function fn() external pure returns(uint){
    uint xxx=1
    return(xxx)
}
```

#### 全局变量
全局变量是全局范围工作的变量，都是solidity预留的关键字，他们可以在函数内不声明直接使用,[更多全局变量](https://learnblockchain.cn/docs/solidity/units-and-global-variables.html#special-variables-and-functions)

- blockhash(uint blockNumber): (bytes32)给定区块的哈希值 – 只适用于256最近区块, 不包含当前区块。
- block.coinbase: (address payable) 当前区块矿工的地址
- block.gaslimit: (uint) 当前区块的gaslimit
- block.number: (uint) 当前区块的number
- block.timestamp: (uint) 当前区块的时间戳，为unix纪元以来的秒
- gasleft(): (uint256) 剩余 gas
- msg.data: (bytes calldata) 完整call data
- msg.sender: (address payable) 消息发送者 (当前 caller)
- msg.sig: (bytes4) calldata的前四个字节 (function identifier)
- msg.value: (uint) 当前交易发送的wei值


## 数组
#### 固定长度数组
```
uint[8] array1;
byte[5] array2;
address[100] array3
```
#### 可变长度数组
```
uint[] array1;
byte[] array2;
address[] array3
```
#### 创建数组的规则
1、对于memory修饰的动态数组，可以用new操作符来创造，但是必须声明长度，并且声明后长度不能修改
```sol
    // memory动态数组
    uint[] memory array8 = new uint[](5);
    bytes memory array9 = new bytes(9);
```
2、数组字面常数是写作表达式形式的数组，并且不会立即赋值给变量，例如[uint(1),2,3]（需要声明第一个元素的类型，不然默认用存储空间最小的类型）

3、如果创建的是动态数组，你需要一个一个元素的赋值。
```sol
 uint[] memory x = new uint[](3);
    x[0] = 1;
    x[1] = 3;
    x[2] = 4;
```

#### 数组成员
- length: 数组有一个包含元素数量的length成员，memory数组的长度在创建后是固定的。
- push(): 动态数组和bytes拥有push()成员，可以在数组最后添加一个0元素。
- push(x): 动态数组和bytes拥有push(x)成员，可以在数组最后添加一个x元素。
- pop(): 动态数组和bytes拥有pop()成员，可以移除数组最后一个元素。

