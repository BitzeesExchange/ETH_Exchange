const express = require('express');
const router = express.Router();
const UserController = require('../CONTROLLER/Controller');
// const middleware = require('../middlewares/auth-middleware')

// router.get('/GetAllUsers',UserController.getAllUsers)
// router.post('/GenerateWallet', UserController.GenerateWallet)
router.post("/getbalance", UserController.getBalance)
router.post('/transfer',  UserController.transfer)

module.exports = router;