const express = require('express');
const router = express.Router();
// const mysqlConnection = require("../config/connectdb");
const UserController = require('../Controller/Controller');
// const middleware = require('../middlewares/auth-middleware');

// router.get('/GetAllUsers',UserController.getAllUsers)
// router.post('/userResgistration', UserController.GenerateWallet)
router.post("/getbalance",UserController.getBalance)
router.post('/transfer',  UserController.Transfer)

module.exports = router;