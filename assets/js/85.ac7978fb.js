(window.webpackJsonp=window.webpackJsonp||[]).push([[85],{408:function(s,t,a){"use strict";a.r(t);var n=a(4),e=Object(n.a)({},(function(){var s=this,t=s._self._c;return t("ContentSlotsDistributor",{attrs:{"slot-key":s.$parent.slotKey}},[t("h2",{attrs:{id:"官方翻译文档"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#官方翻译文档"}},[s._v("#")]),s._v(" "),t("a",{attrs:{href:"https://docs.soliditylang.org/zh/v0.8.19/index.html",target:"_blank",rel:"noopener noreferrer"}},[s._v("官方翻译文档"),t("OutboundLink")],1)]),s._v(" "),t("h2",{attrs:{id:"变量类型"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#变量类型"}},[s._v("#")]),s._v(" 变量类型")]),s._v(" "),t("ul",[t("li",[t("p",[s._v("数值类型")]),s._v(" "),t("ul",[t("li",[s._v("布尔值(bool)")]),s._v(" "),t("li",[s._v("整数型\n"),t("ul",[t("li",[s._v("int整数 包括负数")]),s._v(" "),t("li",[s._v("uint 正整数")]),s._v(" "),t("li",[s._v("uint256 256位正整数")])])]),s._v(" "),t("li",[s._v("函数类型(solidity文档里把函数归到数值)")]),s._v(" "),t("li",[s._v("定长字节 bytes32 bytes8 bytes1")])])]),s._v(" "),t("li",[t("p",[s._v("引用类型")]),s._v(" "),t("ul",[t("li",[s._v("数组")]),s._v(" "),t("li",[s._v("结构体 struct")]),s._v(" "),t("li",[s._v("映射 mapping")]),s._v(" "),t("li",[s._v("地址类型\n"),t("ul",[t("li",[s._v("address 普通地址")]),s._v(" "),t("li",[s._v("payable address 可以转账的地址,比普通地址多了 transfer 和 send 两个成员方法")])])])])]),s._v(" "),t("li",[t("p",[s._v("映射类型")]),s._v(" "),t("ul",[t("li",[s._v("solidity里的哈希表")])])])]),s._v(" "),t("h2",{attrs:{id:"函数类型"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#函数类型"}},[s._v("#")]),s._v(" 函数类型")]),s._v(" "),t("h4",{attrs:{id:"可见性说明"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#可见性说明"}},[s._v("#")]),s._v(" 可见性说明")]),s._v(" "),t("p",[s._v("如果是函数默认是publish，如果是变量默认是internal")]),s._v(" "),t("ul",[t("li",[s._v("publish 内部外部均可见，publish变量会自动生成getter函数用于查询数值")]),s._v(" "),t("li",[s._v("private 只能从本合约内部访问，继承的合约也不能用（也可用于修饰状态变量）")]),s._v(" "),t("li",[s._v("external 只能从合约外部访问（但可使用this.f()来调用f是函数名）")]),s._v(" "),t("li",[s._v("internal 只能从合约内部访问，继承的合约可以用（也可用于修饰状态变量）")])]),s._v(" "),t("h4",{attrs:{id:"函数的权限-默认是能读能写"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#函数的权限-默认是能读能写"}},[s._v("#")]),s._v(" 函数的权限 （默认是能读能写）")]),s._v(" "),t("ul",[t("li",[s._v("pure 不能读取写入储存在链上的状态变量\n"),t("ul",[t("li",[s._v("pure 函数通常用于执行纯粹的计算任务，例如数学计算或数据转换，而不会对区块链状态产生影响。")])])]),s._v(" "),t("li",[s._v("view 能读，但不能写\n"),t("ul",[t("li",[s._v("view 函数通常用于查询合约的状态或执行计算，而不会产生状态变化")])])]),s._v(" "),t("li",[s._v("payable 可支付的")])]),s._v(" "),t("h4",{attrs:{id:"函数的输出"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#函数的输出"}},[s._v("#")]),s._v(" 函数的输出")]),s._v(" "),t("ul",[t("li",[s._v("return 用于函数体中，返回指定的变量")]),s._v(" "),t("li",[s._v("returns 加在函数名称后面，用于返回变量类型以及变量名")])]),s._v(" "),t("h2",{attrs:{id:"引用类型"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#引用类型"}},[s._v("#")]),s._v(" 引用类型")]),s._v(" "),t("p",[s._v("引用类型(Reference Type)：包括数组（array）和结构体（struct），由于这类变量比较复杂，占用存储空间大，我们在使用时必须要声明数据存储的位置。")]),s._v(" "),t("h4",{attrs:{id:"solidity数据存储位置有三类-storage、memory、calldata不同存储位置的gas成本不同-storage类型数据存在链上-类似计算机的硬盘-gas多-memory和calldata类型存在临时内存里gas少-各自场景"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#solidity数据存储位置有三类-storage、memory、calldata不同存储位置的gas成本不同-storage类型数据存在链上-类似计算机的硬盘-gas多-memory和calldata类型存在临时内存里gas少-各自场景"}},[s._v("#")]),s._v(" solidity数据存储位置有三类 storage、memory、calldata不同存储位置的gas成本不同，storage类型数据存在链上，类似计算机的硬盘，gas多，memory和calldata类型存在临时内存里gas少，各自场景")]),s._v(" "),t("h3",{attrs:{id:"引用类型-如数组、结构体等-在作为函数参数或返回值时-需要明确指定是memory-临时存储-函数调用结束后数据消失-、storage-永久存储-在合约存储中-还是calldata-特殊的不可变数据位置-仅用于外部函数的参数-。"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#引用类型-如数组、结构体等-在作为函数参数或返回值时-需要明确指定是memory-临时存储-函数调用结束后数据消失-、storage-永久存储-在合约存储中-还是calldata-特殊的不可变数据位置-仅用于外部函数的参数-。"}},[s._v("#")]),s._v(" 引用类型（如数组、结构体等）在作为函数参数或返回值时，需要明确指定是memory（临时存储，函数调用结束后数据消失）、storage（永久存储，在合约存储中）还是calldata（特殊的不可变数据位置，仅用于外部函数的参数）。")]),s._v(" "),t("p",[s._v("1、storage合约里的状态变量默认都是storage\n2、memory 函数里的参数和临时变量一般都用memory，存储内存中，不上链\n3、calldata和memory类似，存储在内存中，不上链，于memory不同的是calldata变量不能修改（immutable）一般用于函数的参数")]),s._v(" "),t("h4",{attrs:{id:"赋值关系"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#赋值关系"}},[s._v("#")]),s._v(" 赋值关系")]),s._v(" "),t("p",[s._v("1、storage（合约的状态变量）赋值给本地storage（函数里的）时候，会创建引用。\n2、storage赋值给memory，会创建独立的复本。\n3、memory赋值给memory，会创建引用，改变新变量会影响原变量。\n4、其他情况，变量赋值给storage，会创建独立的复本，修改其中一个不会影响另一个。")]),s._v(" "),t("h2",{attrs:{id:"变量作用域"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#变量作用域"}},[s._v("#")]),s._v(" 变量作用域")]),s._v(" "),t("h4",{attrs:{id:"状态变量"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#状态变量"}},[s._v("#")]),s._v(" 状态变量")]),s._v(" "),t("p",[s._v("状态变量存储在链上，所以gas消耗高，在合约内函数外声明")]),s._v(" "),t("div",{staticClass:"language-sol line-numbers-mode"},[t("pre",{pre:!0,attrs:{class:"language-sol"}},[t("code",[t("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("contract")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token class-name"}},[s._v("Hello")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("{")]),s._v("\n    "),t("span",{pre:!0,attrs:{class:"token builtin"}},[s._v("uint")]),s._v(" publish q\n"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("}")]),s._v("\n")])]),s._v(" "),t("div",{staticClass:"line-numbers-wrapper"},[t("span",{staticClass:"line-number"},[s._v("1")]),t("br"),t("span",{staticClass:"line-number"},[s._v("2")]),t("br"),t("span",{staticClass:"line-number"},[s._v("3")]),t("br")])]),t("h4",{attrs:{id:"局部变量"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#局部变量"}},[s._v("#")]),s._v(" 局部变量")]),s._v(" "),t("p",[s._v("局部变量是仅在函数执行过程中有效的变量，函数退出后变量无效，局部变量的数据存储在内存中，不上链，gas低，局部变量只在函数内声明")]),s._v(" "),t("div",{staticClass:"language-sol line-numbers-mode"},[t("pre",{pre:!0,attrs:{class:"language-sol"}},[t("code",[t("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("function")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token function"}},[s._v("fn")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("external")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("pure")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("returns")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),t("span",{pre:!0,attrs:{class:"token builtin"}},[s._v("uint")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("{")]),s._v("\n    "),t("span",{pre:!0,attrs:{class:"token builtin"}},[s._v("uint")]),s._v(" xxx"),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),t("span",{pre:!0,attrs:{class:"token number"}},[s._v("1")]),s._v("\n    "),t("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("return")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),s._v("xxx"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),s._v("\n"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("}")]),s._v("\n")])]),s._v(" "),t("div",{staticClass:"line-numbers-wrapper"},[t("span",{staticClass:"line-number"},[s._v("1")]),t("br"),t("span",{staticClass:"line-number"},[s._v("2")]),t("br"),t("span",{staticClass:"line-number"},[s._v("3")]),t("br"),t("span",{staticClass:"line-number"},[s._v("4")]),t("br")])]),t("h4",{attrs:{id:"全局变量"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#全局变量"}},[s._v("#")]),s._v(" 全局变量")]),s._v(" "),t("p",[s._v("全局变量是全局范围工作的变量，都是solidity预留的关键字，他们可以在函数内不声明直接使用,"),t("a",{attrs:{href:"https://learnblockchain.cn/docs/solidity/units-and-global-variables.html#special-variables-and-functions",target:"_blank",rel:"noopener noreferrer"}},[s._v("更多全局变量"),t("OutboundLink")],1)]),s._v(" "),t("ul",[t("li",[s._v("blockhash(uint blockNumber): (bytes32)给定区块的哈希值 – 只适用于256最近区块, 不包含当前区块。")]),s._v(" "),t("li",[s._v("block.coinbase: (address payable) 当前区块矿工的地址")]),s._v(" "),t("li",[s._v("block.gaslimit: (uint) 当前区块的gaslimit")]),s._v(" "),t("li",[s._v("block.number: (uint) 当前区块的number")]),s._v(" "),t("li",[s._v("block.timestamp: (uint) 当前区块的时间戳，为unix纪元以来的秒")]),s._v(" "),t("li",[s._v("gasleft(): (uint256) 剩余 gas")]),s._v(" "),t("li",[s._v("msg.data: (bytes calldata) 完整call data")]),s._v(" "),t("li",[s._v("msg.sender: (address payable) 消息发送者 (当前 caller)")]),s._v(" "),t("li",[s._v("msg.sig: (bytes4) calldata的前四个字节 (function identifier)")]),s._v(" "),t("li",[s._v("msg.value: (uint) 当前交易发送的wei值")])]),s._v(" "),t("h2",{attrs:{id:"数组"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#数组"}},[s._v("#")]),s._v(" 数组")]),s._v(" "),t("h4",{attrs:{id:"固定长度数组"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#固定长度数组"}},[s._v("#")]),s._v(" 固定长度数组")]),s._v(" "),t("div",{staticClass:"language- line-numbers-mode"},[t("pre",{pre:!0,attrs:{class:"language-text"}},[t("code",[s._v("uint[8] array1;\nbyte[5] array2;\naddress[100] array3\n")])]),s._v(" "),t("div",{staticClass:"line-numbers-wrapper"},[t("span",{staticClass:"line-number"},[s._v("1")]),t("br"),t("span",{staticClass:"line-number"},[s._v("2")]),t("br"),t("span",{staticClass:"line-number"},[s._v("3")]),t("br")])]),t("h4",{attrs:{id:"可变长度数组"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#可变长度数组"}},[s._v("#")]),s._v(" 可变长度数组")]),s._v(" "),t("div",{staticClass:"language- line-numbers-mode"},[t("pre",{pre:!0,attrs:{class:"language-text"}},[t("code",[s._v("uint[] array1;\nbyte[] array2;\naddress[] array3\n")])]),s._v(" "),t("div",{staticClass:"line-numbers-wrapper"},[t("span",{staticClass:"line-number"},[s._v("1")]),t("br"),t("span",{staticClass:"line-number"},[s._v("2")]),t("br"),t("span",{staticClass:"line-number"},[s._v("3")]),t("br")])]),t("h4",{attrs:{id:"创建数组的规则"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#创建数组的规则"}},[s._v("#")]),s._v(" 创建数组的规则")]),s._v(" "),t("p",[s._v("1、对于memory修饰的动态数组，可以用new操作符来创造，但是必须声明长度，并且声明后长度不能修改")]),s._v(" "),t("div",{staticClass:"language-sol line-numbers-mode"},[t("pre",{pre:!0,attrs:{class:"language-sol"}},[t("code",[s._v("    "),t("span",{pre:!0,attrs:{class:"token comment"}},[s._v("// memory动态数组")]),s._v("\n    "),t("span",{pre:!0,attrs:{class:"token builtin"}},[s._v("uint")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("[")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("]")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("memory")]),s._v(" array8 "),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("new")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token class-name"}},[s._v("uint")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("[")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("]")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),t("span",{pre:!0,attrs:{class:"token number"}},[s._v("5")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(";")]),s._v("\n    "),t("span",{pre:!0,attrs:{class:"token builtin"}},[s._v("bytes")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("memory")]),s._v(" array9 "),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("new")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token class-name"}},[s._v("bytes")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),t("span",{pre:!0,attrs:{class:"token number"}},[s._v("9")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(";")]),s._v("\n")])]),s._v(" "),t("div",{staticClass:"line-numbers-wrapper"},[t("span",{staticClass:"line-number"},[s._v("1")]),t("br"),t("span",{staticClass:"line-number"},[s._v("2")]),t("br"),t("span",{staticClass:"line-number"},[s._v("3")]),t("br")])]),t("p",[s._v("2、数组字面常数是写作表达式形式的数组，并且不会立即赋值给变量，例如[uint(1),2,3]（需要声明第一个元素的类型，不然默认用存储空间最小的类型）")]),s._v(" "),t("p",[s._v("3、如果创建的是动态数组，你需要一个一个元素的赋值。")]),s._v(" "),t("div",{staticClass:"language-sol line-numbers-mode"},[t("pre",{pre:!0,attrs:{class:"language-sol"}},[t("code",[s._v(" "),t("span",{pre:!0,attrs:{class:"token builtin"}},[s._v("uint")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("[")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("]")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("memory")]),s._v(" x "),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("new")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token class-name"}},[s._v("uint")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("[")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("]")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),t("span",{pre:!0,attrs:{class:"token number"}},[s._v("3")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(";")]),s._v("\n    x"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("[")]),t("span",{pre:!0,attrs:{class:"token number"}},[s._v("0")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("]")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token number"}},[s._v("1")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(";")]),s._v("\n    x"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("[")]),t("span",{pre:!0,attrs:{class:"token number"}},[s._v("1")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("]")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token number"}},[s._v("3")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(";")]),s._v("\n    x"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("[")]),t("span",{pre:!0,attrs:{class:"token number"}},[s._v("2")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("]")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token number"}},[s._v("4")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(";")]),s._v("\n")])]),s._v(" "),t("div",{staticClass:"line-numbers-wrapper"},[t("span",{staticClass:"line-number"},[s._v("1")]),t("br"),t("span",{staticClass:"line-number"},[s._v("2")]),t("br"),t("span",{staticClass:"line-number"},[s._v("3")]),t("br"),t("span",{staticClass:"line-number"},[s._v("4")]),t("br")])]),t("h4",{attrs:{id:"数组成员"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#数组成员"}},[s._v("#")]),s._v(" 数组成员")]),s._v(" "),t("ul",[t("li",[s._v("length: 数组有一个包含元素数量的length成员，memory数组的长度在创建后是固定的。")]),s._v(" "),t("li",[s._v("push(): 动态数组和bytes拥有push()成员，可以在数组最后添加一个0元素。")]),s._v(" "),t("li",[s._v("push(x): 动态数组和bytes拥有push(x)成员，可以在数组最后添加一个x元素。")]),s._v(" "),t("li",[s._v("pop(): 动态数组和bytes拥有pop()成员，可以移除数组最后一个元素。")])]),s._v(" "),t("h4",{attrs:{id:"结构体-struct"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#结构体-struct"}},[s._v("#")]),s._v(" 结构体 struct")]),s._v(" "),t("div",{staticClass:"language-sol line-numbers-mode"},[t("pre",{pre:!0,attrs:{class:"language-sol"}},[t("code",[t("span",{pre:!0,attrs:{class:"token comment"}},[s._v("// 结构体")]),s._v("\n    "),t("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("struct")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token class-name"}},[s._v("Student")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("{")]),s._v("\n        "),t("span",{pre:!0,attrs:{class:"token builtin"}},[s._v("uint256")]),s._v(" id"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(";")]),s._v("\n        "),t("span",{pre:!0,attrs:{class:"token builtin"}},[s._v("uint256")]),s._v(" score"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(";")]),s._v(" \n    "),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("}")]),s._v("\n\nStudent student"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(";")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token comment"}},[s._v("// 初始一个student结构体")]),s._v("\n\n"),t("span",{pre:!0,attrs:{class:"token comment"}},[s._v("//  给结构体赋值")]),s._v("\n"),t("span",{pre:!0,attrs:{class:"token comment"}},[s._v("// 方法1:在函数中创建一个storage的struct引用")]),s._v("\n"),t("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("function")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token function"}},[s._v("initStudent1")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("external")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("{")]),s._v("\n    Student "),t("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("storage")]),s._v(" _student "),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),s._v(" student"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(";")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token comment"}},[s._v("// assign a copy of student")]),s._v("\n    _student"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(".")]),s._v("id "),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token number"}},[s._v("11")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(";")]),s._v("\n    _student"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(".")]),s._v("score "),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token number"}},[s._v("100")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(";")]),s._v("\n"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("}")]),s._v("\n"),t("span",{pre:!0,attrs:{class:"token comment"}},[s._v("// 方法2:直接引用状态变量的struct")]),s._v("\n"),t("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("function")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token function"}},[s._v("initStudent2")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("external")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("{")]),s._v("\n    student"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(".")]),s._v("id "),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token number"}},[s._v("1")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(";")]),s._v("\n    student"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(".")]),s._v("score "),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token number"}},[s._v("80")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(";")]),s._v("\n"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("}")]),s._v("\n\n"),t("span",{pre:!0,attrs:{class:"token comment"}},[s._v("// 方法3:构造函数式")]),s._v("\n"),t("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("function")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token function"}},[s._v("initStudent3")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("external")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("{")]),s._v("\n    student "),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token function"}},[s._v("Student")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),t("span",{pre:!0,attrs:{class:"token number"}},[s._v("3")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(",")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token number"}},[s._v("90")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(";")]),s._v("\n"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("}")]),s._v("\n"),t("span",{pre:!0,attrs:{class:"token comment"}},[s._v("// 方法4:key value")]),s._v("\n"),t("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("function")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token function"}},[s._v("initStudent4")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("external")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("{")]),s._v("\n    student "),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token function"}},[s._v("Student")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("{")]),s._v("id"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(":")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token number"}},[s._v("4")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(",")]),s._v(" score"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(":")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token number"}},[s._v("60")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("}")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(";")]),s._v("\n"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("}")]),s._v("\n")])]),s._v(" "),t("div",{staticClass:"line-numbers-wrapper"},[t("span",{staticClass:"line-number"},[s._v("1")]),t("br"),t("span",{staticClass:"line-number"},[s._v("2")]),t("br"),t("span",{staticClass:"line-number"},[s._v("3")]),t("br"),t("span",{staticClass:"line-number"},[s._v("4")]),t("br"),t("span",{staticClass:"line-number"},[s._v("5")]),t("br"),t("span",{staticClass:"line-number"},[s._v("6")]),t("br"),t("span",{staticClass:"line-number"},[s._v("7")]),t("br"),t("span",{staticClass:"line-number"},[s._v("8")]),t("br"),t("span",{staticClass:"line-number"},[s._v("9")]),t("br"),t("span",{staticClass:"line-number"},[s._v("10")]),t("br"),t("span",{staticClass:"line-number"},[s._v("11")]),t("br"),t("span",{staticClass:"line-number"},[s._v("12")]),t("br"),t("span",{staticClass:"line-number"},[s._v("13")]),t("br"),t("span",{staticClass:"line-number"},[s._v("14")]),t("br"),t("span",{staticClass:"line-number"},[s._v("15")]),t("br"),t("span",{staticClass:"line-number"},[s._v("16")]),t("br"),t("span",{staticClass:"line-number"},[s._v("17")]),t("br"),t("span",{staticClass:"line-number"},[s._v("18")]),t("br"),t("span",{staticClass:"line-number"},[s._v("19")]),t("br"),t("span",{staticClass:"line-number"},[s._v("20")]),t("br"),t("span",{staticClass:"line-number"},[s._v("21")]),t("br"),t("span",{staticClass:"line-number"},[s._v("22")]),t("br"),t("span",{staticClass:"line-number"},[s._v("23")]),t("br"),t("span",{staticClass:"line-number"},[s._v("24")]),t("br"),t("span",{staticClass:"line-number"},[s._v("25")]),t("br"),t("span",{staticClass:"line-number"},[s._v("26")]),t("br"),t("span",{staticClass:"line-number"},[s._v("27")]),t("br"),t("span",{staticClass:"line-number"},[s._v("28")]),t("br"),t("span",{staticClass:"line-number"},[s._v("29")]),t("br")])]),t("h4",{attrs:{id:"映射mapping"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#映射mapping"}},[s._v("#")]),s._v(" 映射Mapping")]),s._v(" "),t("div",{staticClass:"language- line-numbers-mode"},[t("pre",{pre:!0,attrs:{class:"language-text"}},[t("code",[s._v("mapping(uint => address) public idToAddress; // id映射到地址\nmapping(address => address) public swapPair; // 币对的映射，地址到地址\n")])]),s._v(" "),t("div",{staticClass:"line-numbers-wrapper"},[t("span",{staticClass:"line-number"},[s._v("1")]),t("br"),t("span",{staticClass:"line-number"},[s._v("2")]),t("br")])])])}),[],!1,null,null,null);t.default=e.exports}}]);