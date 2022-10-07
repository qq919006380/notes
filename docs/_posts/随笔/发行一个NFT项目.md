## 准备文件 
- image
- json 
- [metadata](https://docs.opensea.io/docs/metadata-standards)
- [ipfs节点查看](https://ipfs.github.io/public-gateway-checker/)

## 准备合约
#### ERC721标准 
要求每个ERC721标准合约需要实现ERC721及ERC165接口，接口定义如下：
#### 接口说明
接口说明：
- balanceOf(): 返回由_owner 持有的NFTs的数量。
- ownerOf(): 返回tokenId代币持有者的地址。
- approve(): 授予地址_to具有_tokenId的控制权，方法成功后需触发Approval 事件。
- setApprovalForAll(): 授予地址_operator具有所有NFTs的控制权，成功后需触发ApprovalForAll事件。
- getApproved()、isApprovedForAll(): 用来查询授权。
- safeTransferFrom(): 转移NFT所有权，一次成功的转移操作必须发起 Transer 事件。函数的实现需要做一下几种检查：
- [更多标准接口定义](https://learnblockchain.cn/2018/03/23/token-erc721/)
## 部署合约 
## 上传文件
## 合约交互