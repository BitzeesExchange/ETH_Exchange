const jwt = require('jsonwebtoken')
const Cryptr = require('cryptr');
const cryptr = new Cryptr('myTotallySecretKey');
// require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const db = require('./Dao/DbCalls')
const ethWallet = require('ethereumjs-wallet');
const app = express();
// we use JSON  for making API
app.use(bodyParser.json())

const port = process.env.port

// we use JSON  for making API
app.use(express.json())

// Load Routes
app.post("/GenerateWallet",async (req, res) => {
    try {
      const { id, utype, email } = req.body;
  
      // Validate user input
      if (!(utype || email || id)) return res.status(400).json({ status_code: 400, message: 'All input are require, Missing Something Please check.' });
  
      // Generate JWT Token
      const token = jwt.sign(email, `${process.env.JWT_SECRET_KEY}`);
  
      //Generate Public Key and Private Key
      var addressData = ethWallet['default'].generate();
  
      // Generate Private key
      const privkey = (`${addressData.getPrivateKeyString()}`);
  
      // Encrypt privatekey
      const PRIVATEencryptedString = cryptr.encrypt(privkey);
  
      // Generate PublicKey
      const pubkey = (`${addressData.getAddressString()}`);
  
      // Encrypt publickey
      const PUBLICencryptedString = cryptr.encrypt(pubkey);
  
      // Data Destructured for getting Proper Response
      const data = {
        id,
        utype,
        email,
        token
      }
  
      // Storing Data in MySql DataBase
      const DBresult = db.StoreNewUserData(id, utype, email, PRIVATEencryptedString, PUBLICencryptedString)
      if (!DBresult) {
        return res.send()
      } else {
        res.json({ status_code: 200, msg: "Wallet Generared Successfully!!", data: [data] });
      }
    } catch (err) {
      return res.status(500).send({ status_code: 500, msg: err.message })
    }
  }
   )

//set app port
app.listen(1000, () => {
  console.log(`Example app listening at http://localhost:${1000}`);
});