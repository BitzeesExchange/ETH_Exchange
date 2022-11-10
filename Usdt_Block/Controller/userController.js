const {ethers} = require('ethers');
// const transfer = require('./transfer.json');

const RPC = 'https://eth.getblock.io/goerli/?api_key=f95df379-c65d-4cc2-90ea-9ca85a3a2350'; // Your RPC url here

const account3 = '0x3c48d495c0fdf31818d2f916964106e7b0b717ad'; // Your public address here
const privateKey = '11f451b6e4fd7e7966a32f31db51679650bb33d1b412bba681bef4c5e086b603'; // put your private key here
const amount = ethers.utils.parseUnits("5", 18)

const provider = new ethers.providers.JsonRpcProvider(
    RPC
)

const wallet = new ethers.Wallet(privateKey, provider); // Generate wallet


const contractAddress = '0x710FE347b00F05aC496d1C45Ac256fF1087855Fa';
const ABI = [
    "function balanceOf(address) view returns (uint)",
    "function transfer(address to, uint amount) returns (bool)",
];

async function call() {
    const contract = new ethers.Contract(
        contractAddress,
        ABI,
        wallet // when we are doing transaction then that time we have to give signer
    )


	//Reciever Balance  before Transactions
    const recieverBal = await contract.balanceOf(account3);
    console.log(`${account3} :${await recieverBal.toString()}`);

	//Sender Balance before transactions
     const senderBal = await contract.balanceOf(await wallet.getAddress());
    console.log(`${await wallet.getAddress()} :${await senderBal.toString()}`)

//			Send SHIBA INU Token
    const tx = await contract.transfer(account3, amount)

  //Wait for transactions to be mined
   let tx_wait = await tx.wait();

   	//Reciever Balance  after Transactions
   const recieverBal2 = await contract.balanceOf(account3);
   console.log(`${account3} :${await recieverBal2.toString()}`);

   	//Sender Balance after transactions
   const senderBal2 = await contract.balanceOf(await wallet.getAddress());
   console.log(`${await wallet.getAddress()} :${await senderBal2.toString()}`)

   //For showing all transaction through events
//    const transferEvents = await contract.queryFilter('Transfer')
// 		console.log(transferEvents);
    // transactions.map((item) =>{
    //     console.log(item.args.from, "," ,item.args.to, ":", ethers.utils.formatEther(item.args.value));
    // })

    console.log(tx_wait);
}

call();

// const jwt = require('jsonwebtoken')
// require("dotenv").config();
// const { ethers } = require("ethers");
// // const db = require('../Dao/user')
// const Cryptr = require('cryptr');
// const cryptr = new Cryptr('myTotallySecretKey');
// const ethWallet = require('ethereumjs-wallet');

// const RPC = 'https://eth.getblock.io/goerli/?api_key=f95df379-c65d-4cc2-90ea-9ca85a3a2350'; // Your RPC url here
// const provider = new ethers.providers.JsonRpcProvider(
//   RPC
// )
// const contractAddress = '0x0a7557a802b63625eAE631Ab0084892b0523d1d0';
// const ABI = [
// 	{
// 		"constant": true,
// 		"inputs": [],
// 		"name": "totalSupply",
// 		"outputs": [
// 			{
// 				"name": "",
// 				"type": "uint256"
// 			}
// 		],
// 		"payable": false,
// 		"stateMutability": "view",
// 		"type": "function"
// 	},
// 	{
// 		"constant": true,
// 		"inputs": [
// 			{
// 				"name": "",
// 				"type": "address"
// 			}
// 		],
// 		"name": "balances",
// 		"outputs": [
// 			{
// 				"name": "",
// 				"type": "uint256"
// 			}
// 		],
// 		"payable": false,
// 		"stateMutability": "view",
// 		"type": "function"
// 	},
// 	{
// 		"constant": true,
// 		"inputs": [],
// 		"name": "maximumFee",
// 		"outputs": [
// 			{
// 				"name": "",
// 				"type": "uint256"
// 			}
// 		],
// 		"payable": false,
// 		"stateMutability": "view",
// 		"type": "function"
// 	},
// 	{
// 		"constant": true,
// 		"inputs": [],
// 		"name": "_totalSupply",
// 		"outputs": [
// 			{
// 				"name": "",
// 				"type": "uint256"
// 			}
// 		],
// 		"payable": false,
// 		"stateMutability": "view",
// 		"type": "function"
// 	},
// 	{
// 		"constant": true,
// 		"inputs": [
// 			{
// 				"name": "_owner",
// 				"type": "address"
// 			}
// 		],
// 		"name": "balanceOf",
// 		"outputs": [
// 			{
// 				"name": "balance",
// 				"type": "uint256"
// 			}
// 		],
// 		"payable": false,
// 		"stateMutability": "view",
// 		"type": "function"
// 	},
// 	{
// 		"constant": true,
// 		"inputs": [],
// 		"name": "owner",
// 		"outputs": [
// 			{
// 				"name": "",
// 				"type": "address"
// 			}
// 		],
// 		"payable": false,
// 		"stateMutability": "view",
// 		"type": "function"
// 	},
// 	{
// 		"constant": false,
// 		"inputs": [
// 			{
// 				"name": "_to",
// 				"type": "address"
// 			},
// 			{
// 				"name": "_value",
// 				"type": "uint256"
// 			}
// 		],
// 		"name": "transfer",
// 		"outputs": [],
// 		"payable": false,
// 		"stateMutability": "nonpayable",
// 		"type": "function"
// 	},
// 	{
// 		"constant": true,
// 		"inputs": [],
// 		"name": "basisPointsRate",
// 		"outputs": [
// 			{
// 				"name": "",
// 				"type": "uint256"
// 			}
// 		],
// 		"payable": false,
// 		"stateMutability": "view",
// 		"type": "function"
// 	},
// 	{
// 		"constant": false,
// 		"inputs": [
// 			{
// 				"name": "newOwner",
// 				"type": "address"
// 			}
// 		],
// 		"name": "transferOwnership",
// 		"outputs": [],
// 		"payable": false,
// 		"stateMutability": "nonpayable",
// 		"type": "function"
// 	},
// 	{
// 		"anonymous": false,
// 		"inputs": [
// 			{
// 				"indexed": true,
// 				"name": "from",
// 				"type": "address"
// 			},
// 			{
// 				"indexed": true,
// 				"name": "to",
// 				"type": "address"
// 			},
// 			{
// 				"indexed": false,
// 				"name": "value",
// 				"type": "uint256"
// 			}
// 		],
// 		"name": "Transfer",
// 		"type": "event"
// 	}
// ]

// const contract = new ethers.Contract(
//   contractAddress,
//   ABI // when we are doing transaction then that time we have to give signer
// )
// exports.getbalance = async (req, res) => {
//   try {
//     const email = req.body.email
//     if (!email) return res.status(400).send({ msg: "Please Enter email-id" })

//     // Fetching user details from Database using email-id
//     const DBresult = await db.getEmail(email)

//     // Fetched publickey from email entered in req body
//     const [Result] = DBresult.map(a => a.publickey)
//     if (Result == undefined) return res.status(404).send({ msg: "Email not found!!" })
//     // Decrypting  Publickey
//     const decryptedString = cryptr.decrypt(Result);
//   // console.log(decryptedString)

//   const [privateKey] = DBresult.map(a => a.privatekey)
//   const decryptedStringp = cryptr.decrypt(privateKey);
//     //  console.log(decryptedStringp)
//     // GET BALANCE FROM GIVEN PUBLICKEY Using "eathers" Package
//     // const provider = new ethers.providers.JsonRpcProvider(process.env.provider)

//     const balance = await contract.getBalance(decryptedStringp)      // need time optimisation 
//     return res.status(200).send({ status_code: 200, msg: "Successs!!", data: [{ ETH_Balance: `${ethers.utils.formatEther(balance)}` }] })
//   } catch (err) {
//     return res.status(500).send({ status_code: 500, msg: err.message })
//   }
// }


// // Api for Fund Transaction 
// exports.TransferBalance = async (req, res) => {
//   try {
//     const id = req.body.id
//     const email = req.body.email
//     const account2 = req.body.account2
//     const TransferAmount = req.body.TransferAmount

//     // Ensuring Input All Fields
//     if ( !account2 || !TransferAmount || !email || !id) return res.status(400).send("Please provide all details")

//     // Fetching privatekey using email-id from MySql Database
//     const DBresult = await db.getEmail(email)
//     if (!DBresult) return res.status(400).send({ status_code: 400, msg: "Data not Found!!!" })
//     else {
//       const [Result] = DBresult.map(a => a.privatekey)
//       // Decrypting privatekey
//       const privateKey1 = cryptr.decrypt(Result);
//       const provider = new ethers.providers.JsonRpcProvider(process.env.provider)

//       const [publickey] = DBresult.map(a => a.publickey)
//       const PublicKey = cryptr.decrypt(publickey);
//       console.log(publickey)
//       // Signing in ether wallet using privatekey
//       const wallet = new ethers.Wallet(privateKey1, provider)
//       // Getting balance of sender and Receiver account Before Transaction
//       const senderBalanceBefore = await provider.getBalance(PublicKey)
//       const recieverBalanceBefore = await provider.getBalance(account2)

//       const Sender_balance_before = `${ethers.utils.formatEther(senderBalanceBefore)}`
//       console.log(`reciever balance before: ${ethers.utils.formatEther(recieverBalanceBefore)}\n`)

//       // Confirming sufficient fund available for transaction
//       if (TransferAmount > Sender_balance_before) return res.status(400).send({ msg: "Transaction failed!! Insufficient funds!!" })

//       // Sending ETH to account2 using publickey 
//       const tx = await wallet.sendTransaction({
//         to: account2,
//         value: ethers.utils.parseEther(TransferAmount)
//       })
//       await tx.wait()                      // need time optimisation 
//       const TransactionHash = tx.hash
//       console.log(TransactionHash)

//       // Getting balance of sender and Receiver account Before Transaction
//       const senderBalanceAfter = await provider.getBalance(PublicKey)
//       const recieverBalanceAfter = await provider.getBalance(account2)

//       // Storing Data in MySql DataBase
//       const data = db.StoreUserTxnDetails(email, id, TransactionHash)
//       if (!data) {
//         return res.status(400).send({ status_code: 400, msg: "Data Not Found!!" })
//       } else {
//         // Final Response
//         return res.status(200).send({
//           status_code: 200, msg: "Successs!!", data: [{
//             Sender_balance_before: `${ethers.utils.formatEther(senderBalanceBefore)}`,
//             reciever_balance_before: `${ethers.utils.formatEther(recieverBalanceBefore)}`,
//             Sender_balance_after: `${ethers.utils.formatEther(senderBalanceAfter)}`,
//             reciever_balance_after: `${ethers.utils.formatEther(recieverBalanceAfter)}`,
//             Transaction_Hash: tx.hash
//           }]
//         })
//       }
//     }
//   } catch (err) {
//     return res.status(500).send({ msg: err.message })
//   }
// }


















// const jwt = require('jsonwebtoken')
// require("dotenv").config();
// const db = require('../DOA/DbCalls')
// const Cryptr = require('cryptr');
// const cryptr = new Cryptr('myTotallySecretKey');
// const fs = require('fs')
// const Web3 = require('web3')

// const web3 = new Web3('https://eth.getblock.io/goerli/?api_key=f95df379-c65d-4cc2-90ea-9ca85a3a2350')
// var contractAbi = fs.readFileSync("./contract/USDT.json");
// const abi = JSON.parse(contractAbi);
// var ContractAddress = '0x2dEf988Cdc60179Ab944c31687F907454a79F760'


// exports.getbalance = async (req, res) => {
//   try {
//     const email = req.body.email
//     if (!email) return res.status(400).send({ msg: "Please Enter email-id" })

//     // Fetching user details from Database using email-id
//     const DBresult = await db.getEmail(email)

//     // Fetched publickey from email entered in req body
//     const [Result] = DBresult.map(a => a.publickey)
//     if (Result == undefined) return res.status(404).send({ msg: "Email not found!!" })

//     // Decrypting  Publickey
//     const decryptedString = cryptr.decrypt(Result);

//     // GET BALANCE FROM GIVEN PUBLICKEY Using "eathers" Package

//     var tokenInst = new web3.eth.Contract(abi,ContractAddress);

//     const balance =await  tokenInst.methods.balanceOf(decryptedString).call()
//     const balanceWeiBN = web3.utils.fromWei(balance)

//     return res.status(200).send({ status_code: 200, msg: "Successs!!", data: [{ Balance: balanceWeiBN + ' ' + 'USDT'}] })
//   } catch (err) {
//     return res.status(500).send({ status_code: 500, msg: err.message })
//   }
// }

// async function main(){
//     web3.eth.accounts.wallet.add('0x11f451b6e4fd7e7966a32f31db51679650bb33d1b412bba681bef4c5e086b603');
 
//     var fromAddress = '0x3c48d495c0fdf31818d2f916964106e7b0b717ad'
//     var tokenInst = new web3.eth.Contract(contractAbi,ContractAddress);
//     let amount = 00000000000000000024
//     tokenInst.methods.transfer('0x87bb074c5a05cd4278f7f5ef190090b8526948dc', amount.toString()).send({from: fromAddress, gas: 100000},function (error, result){ //get callback from function which is your transaction key
//         if(!error){
//             console.log(result);
//             // handleSuccessTrue();
//         } else
//         {
//             web3.eth.getBalance(fromAddress, (err,bal) => { console.log('Your account has ' + web3.utils.fromWei(bal, 'ether') + ', Insufficient funds for gas * price + value on your wallet')});
//             // handleSuccessFalse();
//     }
//     });
//     //Finally, you can check if usdt tranaction success through this code.
//     tokenInst.methods.balanceOf('0x87bb074c5a05cd4278f7f5ef190090b8526948dc').call().then(console.log)
//     .catch(console.error);
// }



// const {ethers} = require('ethers');
// // const transfer = require('./transfer.json');

// const RPC = 'https://eth.getblock.io/goerli/?api_key=f95df379-c65d-4cc2-90ea-9ca85a3a2350'; // Your RPC url here

// const account3 = '0xc69dF16DaB21304Db0F72dF94753255497413129'; // Your public address here
// const privateKey = 'c910faac7ba22f8bde6baebd6ccd8e97c45d2590ba037d69f67e3c1382493e64'; // put your private key here
// const amount = ethers.utils.parseUnits("1", 6)

// const provider = new ethers.providers.JsonRpcProvider(
//     RPC
// )

// const wallet = new ethers.Wallet(privateKey, provider); // Generate wallet


// const contractAddress = '0x0a7557a802b63625eAE631Ab0084892b0523d1d0';
// const ABI = [
// 	{
// 		"constant": true,
// 		"inputs": [],
// 		"name": "totalSupply",
// 		"outputs": [
// 			{
// 				"name": "",
// 				"type": "uint256"
// 			}
// 		],
// 		"payable": false,
// 		"stateMutability": "view",
// 		"type": "function"
// 	},
// 	{
// 		"constant": true,
// 		"inputs": [
// 			{
// 				"name": "",
// 				"type": "address"
// 			}
// 		],
// 		"name": "balances",
// 		"outputs": [
// 			{
// 				"name": "",
// 				"type": "uint256"
// 			}
// 		],
// 		"payable": false,
// 		"stateMutability": "view",
// 		"type": "function"
// 	},
// 	{
// 		"constant": true,
// 		"inputs": [],
// 		"name": "maximumFee",
// 		"outputs": [
// 			{
// 				"name": "",
// 				"type": "uint256"
// 			}
// 		],
// 		"payable": false,
// 		"stateMutability": "view",
// 		"type": "function"
// 	},
// 	{
// 		"constant": true,
// 		"inputs": [],
// 		"name": "_totalSupply",
// 		"outputs": [
// 			{
// 				"name": "",
// 				"type": "uint256"
// 			}
// 		],
// 		"payable": false,
// 		"stateMutability": "view",
// 		"type": "function"
// 	},
// 	{
// 		"constant": true,
// 		"inputs": [
// 			{
// 				"name": "_owner",
// 				"type": "address"
// 			}
// 		],
// 		"name": "balanceOf",
// 		"outputs": [
// 			{
// 				"name": "balance",
// 				"type": "uint256"
// 			}
// 		],
// 		"payable": false,
// 		"stateMutability": "view",
// 		"type": "function"
// 	},
// 	{
// 		"constant": true,
// 		"inputs": [],
// 		"name": "owner",
// 		"outputs": [
// 			{
// 				"name": "",
// 				"type": "address"
// 			}
// 		],
// 		"payable": false,
// 		"stateMutability": "view",
// 		"type": "function"
// 	},
// 	{
// 		"constant": false,
// 		"inputs": [
// 			{
// 				"name": "_to",
// 				"type": "address"
// 			},
// 			{
// 				"name": "_value",
// 				"type": "uint256"
// 			}
// 		],
// 		"name": "transfer",
// 		"outputs": [],
// 		"payable": false,
// 		"stateMutability": "nonpayable",
// 		"type": "function"
// 	},
// 	{
// 		"constant": true,
// 		"inputs": [],
// 		"name": "basisPointsRate",
// 		"outputs": [
// 			{
// 				"name": "",
// 				"type": "uint256"
// 			}
// 		],
// 		"payable": false,
// 		"stateMutability": "view",
// 		"type": "function"
// 	},
// 	{
// 		"constant": false,
// 		"inputs": [
// 			{
// 				"name": "newOwner",
// 				"type": "address"
// 			}
// 		],
// 		"name": "transferOwnership",
// 		"outputs": [],
// 		"payable": false,
// 		"stateMutability": "nonpayable",
// 		"type": "function"
// 	},
// 	{
// 		"anonymous": false,
// 		"inputs": [
// 			{
// 				"indexed": true,
// 				"name": "from",
// 				"type": "address"
// 			},
// 			{
// 				"indexed": true,
// 				"name": "to",
// 				"type": "address"
// 			},
// 			{
// 				"indexed": false,
// 				"name": "value",
// 				"type": "uint256"
// 			}
// 		],
// 		"name": "Transfer",
// 		"type": "event"
// 	}
// ];

// async function call() {
//     const contract = new ethers.Contract(
//         contractAddress,
//         ABI,
//         wallet // when we are doing transaction then that time we have to give signer
//     )


// 	//Reciever Balance  before Transactions
//     const recieverBal = await contract.balanceOf(account3);
//     console.log(`${account3} :${await recieverBal.toString()}`);

// 	//Sender Balance before transactions
//      const senderBal = await contract.balanceOf(await wallet.getAddress());
//     console.log(`${await wallet.getAddress()} :${await senderBal.toString()}`)

// //			Send USDT
//     const tx = await contract.transfer(account3, amount)

//   //Wait for transactions to be mined
//    let tx_wait = await tx.wait();

//    	//Reciever Balance  after Transactions
//    const recieverBal2 = await contract.balanceOf(account3);
//    console.log(`${account3} :${await recieverBal2.toString()}`);

//    	//Sender Balance after transactions
//    const senderBal2 = await contract.balanceOf(await wallet.getAddress());
//    console.log(`${await wallet.getAddress()} :${await senderBal2.toString()}`)

//    //For showing all transaction through events
//    const transferEvents = await contract.queryFilter('Transfer')
// 		console.log(transferEvents);
//     // transactions.map((item) =>{
//     //     console.log(item.args.from, "," ,item.args.to, ":", ethers.utils.formatEther(item.args.value));
//     // })

//     console.log(tx_wait);
// }

// call();