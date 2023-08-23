import Web3 from "web3"
import WalletConnectProvider from "@walletconnect/web3-provider";

let web3 = null
// console.log(window,'window')
if(typeof window!=='undefined'&&typeof window.ethereum!=='undefined') {
    //使用metamask提供的web3对象实例
    web3 = new Web3(window.ethereum)
}else if(typeof window!=='undefined'&&typeof window.web3!=='undefined') {
    //使用旧版metamask提供的web3对象实例
    web3 = new Web3(window.web3.currentProvider)
}else {
    //如果没有可用的provider则使用本地节点
    // var obj = {
    //     network: "80001",
    //     rpc: {
    //       80001: "https://rpc-mumbai.maticvigil.com",
    //     },
    //     chainId: 80001,
    //     qrcode: true,
    //   };
    //   var provider = new WalletConnectProvider(obj);
    //   web3 = new Web3(provider);
}

export default(_,inject) => {
    inject('web3',web3)
}