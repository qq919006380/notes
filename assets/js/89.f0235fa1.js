(window.webpackJsonp=window.webpackJsonp||[]).push([[89],{411:function(t,a,v){"use strict";v.r(a);var _=v(4),s=Object(_.a)({},(function(){var t=this,a=t._self._c;return a("ContentSlotsDistributor",{attrs:{"slot-key":t.$parent.slotKey}},[a("h1",{attrs:{id:"钱包类型"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#钱包类型"}},[t._v("#")]),t._v(" 钱包类型")]),t._v(" "),a("h2",{attrs:{id:"eoa-externally-owned-account-帐号"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#eoa-externally-owned-account-帐号"}},[t._v("#")]),t._v(" EOA (Externally Owned Account) 帐号：")]),t._v(" "),a("ul",[a("li",[t._v("中文名叫：外部账户")]),t._v(" "),a("li",[t._v("EOA 帐号是由私钥控制的，通常由个人创建和拥有。")]),t._v(" "),a("li",[t._v("生产规则：私钥 》 keccak256哈希 》 最后20Bytes 》十六进制字符串(EOA地址)")]),t._v(" "),a("li",[t._v("节点验证交易是否被地址owner授权的时候也是固定的规则：交易签名 》 ec_recover 》公钥 》Eoa钱包地址 》 对比要操作的地址 对比结果一致，那么严签通过")]),t._v(" "),a("li",[t._v("拥有 EOA 帐号的人可以使用私钥签署交易，从而发送以太币（ETH）和其他代币，与其他 EOA 帐号或智能合约互动。")]),t._v(" "),a("li",[t._v('EOA 帐号的地址以 "0x" 开头，是以太坊上的普通地址。')]),t._v(" "),a("li",[t._v("代表： MetaMask、imToken")]),t._v(" "),a("li",[t._v("需要注意的是，EOA是以太坊以及其他EVM兼容链才有的概念，严格来说包括BTC在内的主流非EVM链都没有这个设定")])]),t._v(" "),a("h2",{attrs:{id:"ca-contract-accounts-合约账户"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#ca-contract-accounts-合约账户"}},[t._v("#")]),t._v(" CA(Contract Accounts)合约账户：")]),t._v(" "),a("ul",[a("li",[t._v("中文名叫：内部账户")]),t._v(" "),a("li",[t._v("由智能合约地址作为账户地址，同时利用智能合约的可编程性，实现比 EOA 账户更加复杂的业务逻辑，如多签、一次执行多笔交易等；")]),t._v(" "),a("li",[t._v("智能合约账户无法主动发起交易、签名、支付 gas 等操作，需要用 EOA 账户来控制合约账户，实现交易和签名等功能")])]),t._v(" "),a("h2",{attrs:{id:"mpc-tss"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#mpc-tss"}},[t._v("#")]),t._v(" MPC-TSS")]),t._v(" "),a("ul",[a("li",[t._v("MPC - Multi-Party Computation(多方安全计算)")]),t._v(" "),a("li",[t._v("TSS - Threshold Signature Scheme(分布式多方签名协议)")]),t._v(" "),a("li",[t._v("代表：particle")])]),t._v(" "),a("h2",{attrs:{id:"智能合约钱包和账户抽象的关系"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#智能合约钱包和账户抽象的关系"}},[t._v("#")]),t._v(" 智能合约钱包和账户抽象的关系")]),t._v(" "),a("ul",[a("li",[t._v("智能合约钱包就是拿合约做钱包")]),t._v(" "),a("li",[t._v("账户抽象就是以太坊需要让自己账户拥有一个现代化的区块链应用的能力")]),t._v(" "),a("li",[t._v("智能合约是以太坊实现账户抽象最有可能的方法")]),t._v(" "),a("li")]),t._v(" "),a("h2",{attrs:{id:"账户抽象场景创新"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#账户抽象场景创新"}},[t._v("#")]),t._v(" 账户抽象场景创新")]),t._v(" "),a("ul",[a("li",[t._v("Gnosis safe 利用智能合约钱包架构实现多签逻辑")]),t._v(" "),a("li",[t._v("用户可以在一笔上链交易中同时给多个地址发送不同的 token，也可以在用 uniswap 时让 approve 和 swap 在一笔交易里完成，从而做到需要多少授权多少，避免因为过度授权造成安全隐患。")]),t._v(" "),a("li",[t._v("用户可以给不同资产设定不同的操作权限，比如给 PFP 设定比普通 ERC-20 token 更高的操作门槛 (例如需要一把由硬件钱包管理的 admin key 才能转移) ，这样即便日常使用的环境发生密钥泄露，黑客也无法将高价值资产转走，在安全和便利中间取得平衡。")]),t._v(" "),a("li",[t._v("用户可以签署一个离线授权[谁能给我 100 ETH，就可以转走我的某个 BAYCJ，这样不需要授权给第三方合约，用户就可以跟其他人 P2P 地完成原子交易。")]),t._v(" "),a("li",[t._v("多签和社交恢复")])])])}),[],!1,null,null,null);a.default=s.exports}}]);