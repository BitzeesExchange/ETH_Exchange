const express = require('express');
const router = express.Router();
const mysqlConnection = require("../config/connectdb");
const UserController = require('../controller/userController');
// const middleware = require('../middlewares/auth-middleware')

// router.get('/GetAllUsers',UserController.getAllUsers)
// router.post('/GenerateWallet', UserController.GenerateWallet)
// router.post("/getbalance", UserController.getBalance)
// router.post('/transfer',  UserController.TransferBalance)

module.exports = router;