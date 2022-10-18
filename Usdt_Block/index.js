
const express = require("express");
const bodyParser = require("body-parser");
const router = require("../Eth_Block/routes/userRoutes");
const fs = require('fs')
const app = express();
// we use JSON  for making API
app.use(bodyParser.json())


// const port = process.env.port

// we use JSON  for making API
app.use(express.json())

// Load Routes
app.use("/", router)

//set app port
app.listen(2000, () => {
  console.log(`Example app listening at http://localhost:${2000}`);
});

//****************************************************************************************************************************8 */

const Web3 = require('web3')

const contractJson = fs.readFileSync('./contract/USDT.json');
const abi = JSON.parse(contractJson);
// USDTJSON = new web3.eth.Contract(abi);


// const Web3 = require('web3')
const Tx = require('ethereumjs-tx').Transaction

const rpcEndpoint = `https://eth.getblock.io/goerli/?api_key=f95df379-c65d-4cc2-90ea-9ca85a3a2350`

var fromAddress = '0x3c48d495c0fdf31818d2f916964106e7b0b717ad' //從哪個帳戶
var toAddress = '0x87bb074c5a05cd4278f7f5ef190090b8526948dc' //目標帳戶
var privateKey = '11f451b6e4fd7e7966a32f31db51679650bb33d1b412bba681bef4c5e086b603'

const web3 = new Web3(rpcEndpoint)
// USDT contract 連結 https://etherscan.io/address/0xdac17f958d2ee523a2206206994597c13d831ec7#code
const ContractAddress = '0x2dEf988Cdc60179Ab944c31687F907454a79F760';
const USDT = new web3.eth.Contract(abi, ContractAddress,{from: fromAddress})
let amount = web3.utils.toHex(web3.utils.toWei("0.000000000000001000"))

async function main() {

  web3.eth.getTransactionCount(fromAddress)
  .then((count) => {
    let rawTransaction = {
      'from': fromAddress,
      'gasPrice': web3.utils.toHex(20 * 1e9),
      'gasLimit': web3.utils.toHex(210000),
      'to': toAddress,
      'value':(amount),
      'data': USDT.methods.transfer(toAddress, amount).encodeABI(),
      'nonce': web3.utils.toHex(count)
    }
    // let transaction = new Tx(rawTransaction)
    const transaction = new Tx(rawTransaction, { chain: 'goerli' });
    transaction.sign(Buffer.from(privateKey, 'hex'))
    web3.eth.sendSignedTransaction('0x' + transaction.serialize().toString('hex'))
      .on('transactionHash', console.log)
  })
}

main().then(() => {
}).catch((e) => {
  console.log("error", e);
})



















// router.post('/transfer', async function (){
//     const Web3 = require('web3')
//     const web3 = new Web3('https://eth.getblock.io/goerli/?api_key=f95df379-c65d-4cc2-90ea-9ca85a3a2350')
//     web3.eth.accounts.wallet.add('0x11f451b6e4fd7e7966a32f31db51679650bb33d1b412bba681bef4c5e086b603');
//     var contractAbi =[{"constant":true,"inputs":[],"name":"name","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_upgradedAddress","type":"address"}],"name":"deprecate","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"_spender","type":"address"},{"name":"_value","type":"uint256"}],"name":"approve","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"deprecated","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_evilUser","type":"address"}],"name":"addBlackList","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"totalSupply","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_from","type":"address"},{"name":"_to","type":"address"},{"name":"_value","type":"uint256"}],"name":"transferFrom","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"upgradedAddress","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"address"}],"name":"balances","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"decimals","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"maximumFee","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"_totalSupply","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[],"name":"unpause","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"_maker","type":"address"}],"name":"getBlackListStatus","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"address"},{"name":"","type":"address"}],"name":"allowed","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"paused","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"who","type":"address"}],"name":"balanceOf","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[],"name":"pause","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"getOwner","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"owner","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"symbol","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_to","type":"address"},{"name":"_value","type":"uint256"}],"name":"transfer","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"newBasisPoints","type":"uint256"},{"name":"newMaxFee","type":"uint256"}],"name":"setParams","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"amount","type":"uint256"}],"name":"issue","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"amount","type":"uint256"}],"name":"redeem","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"_owner","type":"address"},{"name":"_spender","type":"address"}],"name":"allowance","outputs":[{"name":"remaining","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"basisPointsRate","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"address"}],"name":"isBlackListed","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_clearedUser","type":"address"}],"name":"removeBlackList","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"MAX_UINT","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"_blackListedUser","type":"address"}],"name":"destroyBlackFunds","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"inputs":[{"name":"_initialSupply","type":"uint256"},{"name":"_name","type":"string"},{"name":"_symbol","type":"string"},{"name":"_decimals","type":"uint256"}],"payable":false,"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":false,"name":"amount","type":"uint256"}],"name":"Issue","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"amount","type":"uint256"}],"name":"Redeem","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"newAddress","type":"address"}],"name":"Deprecate","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"feeBasisPoints","type":"uint256"},{"indexed":false,"name":"maxFee","type":"uint256"}],"name":"Params","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"_blackListedUser","type":"address"},{"indexed":false,"name":"_balance","type":"uint256"}],"name":"DestroyedBlackFunds","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"_user","type":"address"}],"name":"AddedBlackList","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"_user","type":"address"}],"name":"RemovedBlackList","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"owner","type":"address"},{"indexed":true,"name":"spender","type":"address"},{"indexed":false,"name":"value","type":"uint256"}],"name":"Approval","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"from","type":"address"},{"indexed":true,"name":"to","type":"address"},{"indexed":false,"name":"value","type":"uint256"}],"name":"Transfer","type":"event"},{"anonymous":false,"inputs":[],"name":"Pause","type":"event"},{"anonymous":false,"inputs":[],"name":"Unpause","type":"event"}]
    
//     var tokenAddress = '0xdAC17F958D2ee523a2206206994597C13D831ec7'
//     var fromAddress = '0x3c48d495c0fdf31818d2f916964106e7b0b717ad'
//     var tokenInst = new web3.eth.Contract(contractAbi,tokenAddress);
//     tokenInst.methods.transfer('0x87bb074c5a05cd4278f7f5ef190090b8526948dc', "0000000025").send({from: fromAddress, gas: 100000},function (error, result){ //get callback from function which is your transaction key
//         if(!error){
//             console.log(result);
//             handleSuccessTrue();
//         } else
//         {
//             console.log("testttt")
//             web3.eth.getBalance(fromAddress, (err,bal) => { console.log('Your account has ' + web3.utils.fromWei(bal, 'ether') + ', Insufficient funds for gas * price + value on your wallet')});
//             // handleSuccessFalse();
//             console.log("testttt")

//         }
//     });
//     //Finally, you can check if usdt tranaction success through this code.
//     tokenInst.methods.balanceOf('0x87bb074c5a05cd4278f7f5ef190090b8526948dc').call().then(console.log)
//     .catch(console.error);
// })