const {ethers} = require('ethers');
// const transfer = require('./transfer.json');
const Cryptr = require('cryptr');
const cryptr = new Cryptr('myTotallySecretKey');
const db = require('../DOA/DBQuery')
const RPC = 'https://eth.getblock.io/goerli/?api_key=f95df379-c65d-4cc2-90ea-9ca85a3a2350'; // Your RPC url here

const account3 = '0xc69dF16DaB21304Db0F72dF94753255497413129'; // Your public address here
const privateKey = 'c910faac7ba22f8bde6baebd6ccd8e97c45d2590ba037d69f67e3c1382493e64'; // put your private key here
const amount = ethers.utils.parseUnits("1",8)

const provider = new ethers.providers.JsonRpcProvider(
    RPC
)

const wallet = new ethers.Wallet(privateKey, provider); // Generate wallet


const contractAddress = '0x9Eb0E172688B0577Cb039005F59153D4087ECC8E';
const ABI = [
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
	},
	{
		"constant": true,
		"inputs": [
			{
				"name": "_owner",
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
		"constant": false,
		"inputs": [
			{
				"name": "_to",
				"type": "address"
			},
			{
				"name": "_value",
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
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"name": "from",
				"type": "address"
			},
			{
				"indexed": true,
				"name": "to",
				"type": "address"
			},
			{
				"indexed": false,
				"name": "value",
				"type": "uint256"
			}
		],
		"name": "Transfer",
		"type": "event"
	}
];
const contract = new ethers.Contract(
    contractAddress,
    ABI,
    wallet // when we are doing transaction then that time we have to give signer
  )

exports.getBalance = async function (req,res){
    try {
        const email = req.body.email
        if (!email) return res.status(400).send({ msg: "Please Enter email-id" })
    
        // Fetching user details from Database using email-id
        const DBresult = await db.getEmail(email)
    
        // Fetched publickey from email entered in req body
        const [Result] = DBresult.map(a => a.publickey)
        if (Result == undefined) return res.status(404).send({ msg: "Email not found!!" })
        // Decrypting  Publickey
        const decryptedString = cryptr.decrypt(Result);
            // GET BALANCE FROM GIVEN PUBLICKEY Using "eathers" Package
    
        const recieverBal = await contract.balanceOf(decryptedString);
        const result =(`${account3} :${await recieverBal.toString()}`);
        return res.status(200).send({ status_code: 200, msg: "Successs!!", data: result })
      } catch (err) {
        return res.status(500).send({ status_code: 500, msg: err.message })
      }
 
 }

 exports.transfer = async function call(req,res){
    try {
        const id = req.body.id
        const email = req.body.email
        const account2 = req.body.account2
        const TransferAmount = req.body.TransferAmount
    
        // Ensuring Input All Fields
        if ( !account2 || !TransferAmount || !email || !id) return res.status(400).send("Please provide all details")
    
        // Fetching privatekey using email-id from MySql Database
        const DBresult = await db.getEmail(email)
        if (!DBresult) return res.status(400).send({ status_code: 400, msg: "Data not Found!!!" })
        else {
          const [Result] = DBresult.map(a => a.privatekey)
          // Decrypting privatekey
          const privateKey1 = cryptr.decrypt(Result);
        //   const provider = new ethers.providers.JsonRpcProvider(process.env.provider)
    
          const [publickey] = DBresult.map(a => a.publickey)
          const PublicKey = cryptr.decrypt(publickey);
         
          // Getting balance of sender and Receiver account Before Transaction
          const senderBalanceBefore = await provider.getBalance(PublicKey)
          const recieverBalanceBefore = await provider.getBalance(account2)
    
          const Sender_balance_before = `${ethers.utils.formatEther(senderBalanceBefore)}`
          console.log(`reciever balance before: ${ethers.utils.formatEther(recieverBalanceBefore)}\n`)
    
          // Confirming sufficient fund available for transaction
          if (TransferAmount > Sender_balance_before) return res.status(400).send({ msg: "Transaction failed!! Insufficient funds!!" })
    
          // Sending ETH to account2 using publickey 
            const tx = await contract.transfer(account3, amount)
          //Wait for transactions to be mined
           let tx_wait = await tx.wait();
           const Transaction_Hash = tx_wait.transactionHash
    
          // Getting balance of sender and Receiver account Before Transaction
          const senderBalanceAfter = await provider.getBalance(PublicKey)
          const recieverBalanceAfter = await provider.getBalance(account2)
    
          // Storing Data in MySql DataBase
          const data = db.StoreUserTxnDetails(email, id, Transaction_Hash)
          if (!data) {
            return res.status(400).send({ status_code: 400, msg: "Data Not Found!!" })
          } else {
            // Final Response
            return res.status(200).send({
              status_code: 200, msg: "Successs!!", data: [{
                Sender_balance_before: `${ethers.utils.formatEther(senderBalanceBefore)}`,
                reciever_balance_before: `${ethers.utils.formatEther(recieverBalanceBefore)}`,
                Sender_balance_after: `${ethers.utils.formatEther(senderBalanceAfter)}`,
                reciever_balance_after: `${ethers.utils.formatEther(recieverBalanceAfter)}`,
                Transaction_Hash: Transaction_Hash
              }]
            })
          }
        }
      } catch (err) {
        return res.status(500).send({ msg: err.message })
      }
    }
    // const tx = await contract.transfer(account3, amount)
    //     //Wait for transactions to be mined
    //  let tx_wait = await tx.wait();
    //  console.log(tx_wait);
    //  return res.send(tx_wait.transactionHash)
  

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

// //			Send WBTC
//     const tx = await contract.transfer(account3, amount)

//   //Wait for transactions to be mined
//    let tx_wait = await tx.wait();

//    	//Reciever Balance  after Transactions
//    const recieverBal2 = await contract.balanceOf(account3);
//    console.log(`${account3} :${await recieverBal2.toString()}`);

//    	//Sender Balance after transactions
//    const senderBal2 = await contract.balanceOf(await wallet.getAddress());
//    console.log(`${await wallet.getAddress()} :${await senderBal2.toString()}`)

 

//     console.log(tx_wait);

   
// }

// call();