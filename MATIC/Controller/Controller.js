const { ethers } = require('ethers');
const Cryptr = require('cryptr');
const cryptr = new Cryptr('myTotallySecretKey');
const db = require('../DOA/DBQuery')
require("dotenv").config();
const provider = new ethers.providers.JsonRpcProvider(process.env.RPC)

// Generate wallet

let abi = process.env.ABI
let contractAddress = process.env.contractAddress


exports.getBalance = async function (req, res) {
  try {
    const email = req.body.email
    if (!email) return res.status(400).send({ msg: "Please Enter email-id" })

    // Fetching user details from Database using email-id
    const DBresult = await db.getEmail(email)

    // Fetched publickey from email entered in req body
    const [Result] = DBresult.map(a => a.publickey)
    if (Result == undefined) return res.status(404).send({ msg: "Email not found!!" })
    // Decrypting  Publickey
    const decryptedPublicKey = cryptr.decrypt(Result);
    // GET BALANCE FROM GIVEN PUBLICKEY Using "eathers" Package

    const privateKey = DBresult.map(a => a.privatekey)
    const decryptedPrivateKey = cryptr.decrypt(privateKey);
    const wallet = new ethers.Wallet(decryptedPrivateKey, provider);
    const contract = new ethers.Contract(
      contractAddress,
      abi,
      wallet // when we are doing transaction then that time we have to give signer
    )
    const tokenBalance = await contract.balanceOf(decryptedPublicKey);
    const result = (`${decryptedPublicKey} :${await tokenBalance.toString()}`);
    return res.status(200).send({ status_code: 200, msg: "Successs!!", data: result })
  } catch (err) {
    return res.status(500).send({ status_code: 500, msg: err.message })
  }

}

exports.Transfer = async function (req, res) {
  try {
    const id = req.body.id
    const email = req.body.email
    const account2 = req.body.account2
    const TransferAmount = req.body.TransferAmount
    const amount = ethers.utils.parseUnits(TransferAmount, 18)
    // Ensuring Input All Fields
    if (!account2 || !TransferAmount || !email || !id) return res.status(400).send("Please provide all details")

    // Fetching privatekey using email-id from MySql Database
    const DBresult = await db.getEmail(email)
    if (!DBresult) return res.status(400).send({ status_code: 400, msg: "Data not Found!!!" })
    else {

      const [publickey] = DBresult.map(a => a.publickey)
      const PublicKey = cryptr.decrypt(publickey);
      const privateKey = DBresult.map(a => a.privatekey)
      const decryptedPrivateKey = cryptr.decrypt(privateKey);
      const wallet = new ethers.Wallet(decryptedPrivateKey, provider);
      
      const contract = new ethers.Contract(
        contractAddress,
        abi,
        wallet // when we are doing transaction then that time we have to give signer
      )

      // Getting balance of sender and Receiver account Before Transaction
      const senderBalanceBefore = await contract.balanceOf(PublicKey)
      const recieverBalanceBefore = await contract.balanceOf(account2)

      const Sender_balance_before = `${ethers.utils.formatEther(senderBalanceBefore)}`
     console.log(Sender_balance_before)
     console.log(TransferAmount)
      // Confirming sufficient fund available for transaction
      if (TransferAmount > Sender_balance_before) return res.status(400).send({ msg: "Transaction failed!! Insufficient funds!!" })

      // Sending LINK to account2 using publickey 
      const tx = await contract.transfer(account2, amount)
      //Wait for transactions to be mined
      let tx_wait = await tx.wait();
      const Transaction_Hash = tx_wait.transactionHash

      // Getting balance of sender and Receiver account Before Transaction
      const senderBalanceAfter = await contract.balanceOf(PublicKey)
      const recieverBalanceAfter = await contract.balanceOf(account2)

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