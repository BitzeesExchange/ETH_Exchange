
const express = require("express");
const bodyParser = require("body-parser");
const router = require("./routers/router");
const fs = require('fs')
const app = express();
// we use JSON  for making API
app.use(bodyParser.json())


// const port = process.env.port

// we use JSON  for making API
app.use(express.json())

// Load Routes
app.use("/usdt", router)

//set app port
app.listen(2000, () => {
  console.log(`Example app listening at http://localhost:${2000}`);
});



//****************************************************************************************************************************8 */


// const contractJson = fs.readFileSync('./contract/USDT.json');
// const abi = JSON.parse(contractJson);
// // USDTJSON = new web3.eth.Contract(abi);

// const Web3 = require('web3')
// const Tx = require('ethereumjs-tx').Transaction

// const rpcEndpoint = `https://eth.getblock.io/goerli/?api_key=f95df379-c65d-4cc2-90ea-9ca85a3a2350`

// var fromAddress = '0x3c48d495c0fdf31818d2f916964106e7b0b717ad' 
// var toAddress = '0x87bb074c5a05cd4278f7f5ef190090b8526948dc' 
// var privateKey = '11f451b6e4fd7e7966a32f31db51679650bb33d1b412bba681bef4c5e086b603'

// const web3 = new Web3(new Web3.providers.HttpProvider(rpcEndpoint))
// const ContractAddress = '0x2dEf988Cdc60179Ab944c31687F907454a79F760';
// const USDT = new web3.eth.Contract(abi, ContractAddress,{from: fromAddress})
// // let amount = web3.utils.toHex(20,"tether")
// let amount = web3.utils.toHex(web3.utils.toWei("0.000000000000001000" ,"tether"))
// let contract_txn = USDT.methods.transfer(toAddress,amount).encodeABI()

// async function main() {

//   // web3.eth.getTransactionCount(fromAddress)

  
//     let rawTransaction = {
//       'from': fromAddress,
//       'gasPrice': web3.utils.toHex(30 * 1e9),
//       'gasLimit': web3.utils.toHex(210000),
//       'to': toAddress,
//       'value':(amount),
//       'data': contract_txn,
//       'nonce': web3.utils.toHex(web3.eth.getTransactionCount(fromAddress))
//       // web3.eth.getTransactionCount(my_account.address)
//     }

//     const transaction = new Tx(rawTransaction, { chain: 'goerli' });

//     transaction.sign(Buffer.from(privateKey, 'hex'))

//     web3.eth.sendSignedTransaction('0x' + transaction.serialize().toString('hex'))
//       .on('transactionHash', console.log)
  
//   }

// main().then(() => {
// }).catch((e) => {
//   console.log("error", e);
// })



// ********************************************************************************************

const Web3 = require('web3')
const Tx = require('ethereumjs-tx').Transaction

const rpcEndpoint = `https://eth.getblock.io/goerli/?api_key=f95df379-c65d-4cc2-90ea-9ca85a3a2350`
    var toAddress = '0x87bb074c5a05cd4278f7f5ef190090b8526948dc'
const web3 = new Web3(new Web3.providers.HttpProvider(rpcEndpoint))

var count = web3.eth.getTransactionCount("0x3c48d495c0fdf31818d2f916964106e7b0b717ad");
// const contractJson = fs.readFileSync('./contract/USDT.json');
var abi = [
        {
          "constant": false,
          "inputs": [
            {
              "name": "guy",
              "type": "address"
            },
            {
              "name": "wad",
              "type": "uint256"
            }
          ],
          "name": "approve",
          "outputs": [
            {
              "name": "",
              "type": "bool"
            }
          ],
          "payable": false,
          "stateMutability": "nonpayable",
          "type": "function"
        },
        {
          "constant": false,
          "inputs": [],
          "name": "deposit",
          "outputs": [],
          "payable": true,
          "stateMutability": "payable",
          "type": "function"
        },
        {
          "constant": false,
          "inputs": [
            {
              "name": "dst",
              "type": "address"
            },
            {
              "name": "wad",
              "type": "uint256"
            }
          ],
          "name": "transfer",
          "outputs": [
            {
              "name": "",
              "type": "bool"
            }
          ],
          "payable": false,
          "stateMutability": "nonpayable",
          "type": "function"
        },
        {
          "constant": false,
          "inputs": [
            {
              "name": "src",
              "type": "address"
            },
            {
              "name": "dst",
              "type": "address"
            },
            {
              "name": "wad",
              "type": "uint256"
            }
          ],
          "name": "transferFrom",
          "outputs": [
            {
              "name": "",
              "type": "bool"
            }
          ],
          "payable": false,
          "stateMutability": "nonpayable",
          "type": "function"
        },
        {
          "constant": false,
          "inputs": [
            {
              "name": "wad",
              "type": "uint256"
            }
          ],
          "name": "withdraw",
          "outputs": [],
          "payable": false,
          "stateMutability": "nonpayable",
          "type": "function"
        },
        {
          "payable": true,
          "stateMutability": "payable",
          "type": "fallback"
        },
        {
          "anonymous": false,
          "inputs": [
            {
              "indexed": true,
              "name": "src",
              "type": "address"
            },
            {
              "indexed": true,
              "name": "guy",
              "type": "address"
            },
            {
              "indexed": false,
              "name": "wad",
              "type": "uint256"
            }
          ],
          "name": "Approval",
          "type": "event"
        },
        {
          "anonymous": false,
          "inputs": [
            {
              "indexed": true,
              "name": "src",
              "type": "address"
            },
            {
              "indexed": true,
              "name": "dst",
              "type": "address"
            },
            {
              "indexed": false,
              "name": "wad",
              "type": "uint256"
            }
          ],
          "name": "Transfer",
          "type": "event"
        },
        {
          "anonymous": false,
          "inputs": [
            {
              "indexed": true,
              "name": "dst",
              "type": "address"
            },
            {
              "indexed": false,
              "name": "wad",
              "type": "uint256"
            }
          ],
          "name": "Deposit",
          "type": "event"
        },
        {
          "anonymous": false,
          "inputs": [
            {
              "indexed": true,
              "name": "src",
              "type": "address"
            },
            {
              "indexed": false,
              "name": "wad",
              "type": "uint256"
            }
          ],
          "name": "Withdrawal",
          "type": "event"
        },
        {
          "constant": true,
          "inputs": [
            {
              "name": "",
              "type": "address"
            },
            {
              "name": "",
              "type": "address"
            }
          ],
          "name": "allowance",
          "outputs": [
            {
              "name": "",
              "type": "uint256"
            }
          ],
          "payable": false,
          "stateMutability": "view",
          "type": "function"
        },
        {
          "constant": true,
          "inputs": [
            {
              "name": "",
              "type": "address"
            }
          ],
          "name": "balanceOf",
          "outputs": [
            {
              "name": "",
              "type": "uint256"
            }
          ],
          "payable": false,
          "stateMutability": "view",
          "type": "function"
        },
        {
          "constant": true,
          "inputs": [],
          "name": "decimals",
          "outputs": [
            {
              "name": "",
              "type": "uint8"
            }
          ],
          "payable": false,
          "stateMutability": "view",
          "type": "function"
        },
        {
          "constant": true,
          "inputs": [],
          "name": "name",
          "outputs": [
            {
              "name": "",
              "type": "string"
            }
          ],
          "payable": false,
          "stateMutability": "view",
          "type": "function"
        },
        {
          "constant": true,
          "inputs": [],
          "name": "symbol",
          "outputs": [
            {
              "name": "",
              "type": "string"
            }
          ],
          "payable": false,
          "stateMutability": "view",
          "type": "function"
        },
        {
          "constant": true,
          "inputs": [],
          "name": "totalSupply",
          "outputs": [
            {
              "name": "",
              "type": "uint256"
            }
          ],
          "payable": false,
          "stateMutability": "view",
          "type": "function"
        }
      ]
let amount = web3.utils.toHex(web3.utils.toWei('0.001',"tether"))

var contractAddress = "0x37ca285cd8a4282910b7a4e9dc89b41b9849c9ca";
const contract = new web3.eth.Contract(abi, contractAddress)
var rawTransaction = {
    "from": "0x3c48d495c0fdf31818d2f916964106e7b0b717ad",
    "nonce": 10000,
    "gasPrice": "0x04e3b29200",
    "gasLimit": "0x7458",
    "to": contractAddress,
    "value": "0x0",
    "data": contract.methods.transfer(toAddress,amount).encodeABI(),
    "chainId": 0x03
};

var privateKey = '0x11f451b6e4fd7e7966a32f31db51679650bb33d1b412bba681bef4c5e086b603'
const transaction = new Tx(rawTransaction, { chain: 'goerli' });

    transaction.sign(Buffer.from('11f451b6e4fd7e7966a32f31db51679650bb33d1b412bba681bef4c5e086b603', 'hex'))

    web3.eth.sendSignedTransaction('0x' + transaction.serialize().toString('hex'))
      .on('transactionHash', console.log)




// const Web3 = require('web3')

// async function main(){
//     const web3 = new Web3('https://eth.getblock.io/goerli/?api_key=f95df379-c65d-4cc2-90ea-9ca85a3a2350')
//     web3.eth.accounts.wallet.add('0x11f451b6e4fd7e7966a32f31db51679650bb33d1b412bba681bef4c5e086b603');
  
//     var contractAbi =[
//       {
//         "constant": false,
//         "inputs": [
//           {
//             "name": "guy",
//             "type": "address"
//           },
//           {
//             "name": "wad",
//             "type": "uint256"
//           }
//         ],
//         "name": "approve",
//         "outputs": [
//           {
//             "name": "",
//             "type": "bool"
//           }
//         ],
//         "payable": false,
//         "stateMutability": "nonpayable",
//         "type": "function"
//       },
//       {
//         "constant": false,
//         "inputs": [],
//         "name": "deposit",
//         "outputs": [],
//         "payable": true,
//         "stateMutability": "payable",
//         "type": "function"
//       },
//       {
//         "constant": false,
//         "inputs": [
//           {
//             "name": "dst",
//             "type": "address"
//           },
//           {
//             "name": "wad",
//             "type": "uint256"
//           }
//         ],
//         "name": "transfer",
//         "outputs": [
//           {
//             "name": "",
//             "type": "bool"
//           }
//         ],
//         "payable": false,
//         "stateMutability": "nonpayable",
//         "type": "function"
//       },
//       {
//         "constant": false,
//         "inputs": [
//           {
//             "name": "src",
//             "type": "address"
//           },
//           {
//             "name": "dst",
//             "type": "address"
//           },
//           {
//             "name": "wad",
//             "type": "uint256"
//           }
//         ],
//         "name": "transferFrom",
//         "outputs": [
//           {
//             "name": "",
//             "type": "bool"
//           }
//         ],
//         "payable": false,
//         "stateMutability": "nonpayable",
//         "type": "function"
//       },
//       {
//         "constant": false,
//         "inputs": [
//           {
//             "name": "wad",
//             "type": "uint256"
//           }
//         ],
//         "name": "withdraw",
//         "outputs": [],
//         "payable": false,
//         "stateMutability": "nonpayable",
//         "type": "function"
//       },
//       {
//         "payable": true,
//         "stateMutability": "payable",
//         "type": "fallback"
//       },
//       {
//         "anonymous": false,
//         "inputs": [
//           {
//             "indexed": true,
//             "name": "src",
//             "type": "address"
//           },
//           {
//             "indexed": true,
//             "name": "guy",
//             "type": "address"
//           },
//           {
//             "indexed": false,
//             "name": "wad",
//             "type": "uint256"
//           }
//         ],
//         "name": "Approval",
//         "type": "event"
//       },
//       {
//         "anonymous": false,
//         "inputs": [
//           {
//             "indexed": true,
//             "name": "src",
//             "type": "address"
//           },
//           {
//             "indexed": true,
//             "name": "dst",
//             "type": "address"
//           },
//           {
//             "indexed": false,
//             "name": "wad",
//             "type": "uint256"
//           }
//         ],
//         "name": "Transfer",
//         "type": "event"
//       },
//       {
//         "anonymous": false,
//         "inputs": [
//           {
//             "indexed": true,
//             "name": "dst",
//             "type": "address"
//           },
//           {
//             "indexed": false,
//             "name": "wad",
//             "type": "uint256"
//           }
//         ],
//         "name": "Deposit",
//         "type": "event"
//       },
//       {
//         "anonymous": false,
//         "inputs": [
//           {
//             "indexed": true,
//             "name": "src",
//             "type": "address"
//           },
//           {
//             "indexed": false,
//             "name": "wad",
//             "type": "uint256"
//           }
//         ],
//         "name": "Withdrawal",
//         "type": "event"
//       },
//       {
//         "constant": true,
//         "inputs": [
//           {
//             "name": "",
//             "type": "address"
//           },
//           {
//             "name": "",
//             "type": "address"
//           }
//         ],
//         "name": "allowance",
//         "outputs": [
//           {
//             "name": "",
//             "type": "uint256"
//           }
//         ],
//         "payable": false,
//         "stateMutability": "view",
//         "type": "function"
//       },
//       {
//         "constant": true,
//         "inputs": [
//           {
//             "name": "",
//             "type": "address"
//           }
//         ],
//         "name": "balanceOf",
//         "outputs": [
//           {
//             "name": "",
//             "type": "uint256"
//           }
//         ],
//         "payable": false,
//         "stateMutability": "view",
//         "type": "function"
//       },
//       {
//         "constant": true,
//         "inputs": [],
//         "name": "decimals",
//         "outputs": [
//           {
//             "name": "",
//             "type": "uint8"
//           }
//         ],
//         "payable": false,
//         "stateMutability": "view",
//         "type": "function"
//       },
//       {
//         "constant": true,
//         "inputs": [],
//         "name": "name",
//         "outputs": [
//           {
//             "name": "",
//             "type": "string"
//           }
//         ],
//         "payable": false,
//         "stateMutability": "view",
//         "type": "function"
//       },
//       {
//         "constant": true,
//         "inputs": [],
//         "name": "symbol",
//         "outputs": [
//           {
//             "name": "",
//             "type": "string"
//           }
//         ],
//         "payable": false,
//         "stateMutability": "view",
//         "type": "function"
//       },
//       {
//         "constant": true,
//         "inputs": [],
//         "name": "totalSupply",
//         "outputs": [
//           {
//             "name": "",
//             "type": "uint256"
//           }
//         ],
//         "payable": false,
//         "stateMutability": "view",
//         "type": "function"
//       }
//     ]
//     var ContractAddress = '0x37ca285cd8a4282910b7a4e9dc89b41b9849c9ca'
//     var fromAddress = '0x3c48d495c0fdf31818d2f916964106e7b0b717ad'
//     var toAddress = '0x87bb074c5a05cd4278f7f5ef190090b8526948dc'
//     var tokenInst = new web3.eth.Contract(contractAbi,ContractAddress);
//     // let amount = (("0.03"));
//     // console.log(amount)
//     const val = "0.01"; // this guy
// let amount   =  web3.utils.toHex(1234567111111111111111111).toString()
//   console.log(amount)
//     tokenInst.methods.transfer(toAddress, web3.utils.toWei('0.01')).send({from: fromAddress, gas: 100000},function (error, result){
//     async function main2(){
//       const balance =await  tokenInst.methods.balanceOf(fromAddress).call()   
//       const balanceWeiBN = web3.utils.fromWei(balance)
//       console.log({balance:balanceWeiBN})
//      }
//        main2()
//       if(!error){
//             console.log(result);
//             web3.eth.getBalance(fromAddress, (err,bal) => { console.log('Your account has balance ' + (bal, 'ether'))});

//             handleSuccessTrue();
//         } else
//         {
//             web3.eth.getBalance(fromAddress, (err,bal) => { console.log('Your account has ' + web3.utils.fromWei(bal, 'ether') )});
//             // handleSuccessFalse();
//     }
//     });
//     //Finally, you can check if usdt tranaction success through this code.
//     tokenInst.methods.balanceOf('0x87bb074c5a05cd4278f7f5ef190090b8526948dc').call().then(console.log)
//     .catch(console.error);
// }
// main().then(() => {
//   }).catch((e) => {
//     console.log("error", e);
//   })



//   const Web3 = require('web3');

// // Variables definition
// const privKey =
// '0x11f451b6e4fd7e7966a32f31db51679650bb33d1b412bba681bef4c5e086b603'; // Genesis private key
// const addressFrom = '0x3c48d495c0fdf31818d2f916964106e7b0b717ad';
// const addressTo = '0x87bb074c5a05cd4278f7f5ef190090b8526948dc';
// const web3 = new Web3('https://eth.getblock.io/goerli/?api_key=f95df379-c65d-4cc2-90ea-9ca85a3a2350');

// // Create transaction
// const deploy = async () => {
// console.log(
// `Attempting to make transaction from ${addressFrom} to ${addressTo}`
// );

// const createTransaction = await web3.eth.accounts.signTransaction(
// {
// from: addressFrom,
// to: addressTo,
// value: web3.utils.toWei('0.000000001', 'ether'),
// gas: '21000',
// },
// privKey
// );

// // Deploy transaction
// const createReceipt = await web3.eth.sendSignedTransaction(
// createTransaction.rawTransaction
// );
// console.log(
// `Transaction successful with hash: ${createReceipt.transactionHash}`
// );
// };

// deploy();