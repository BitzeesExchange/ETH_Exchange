const express = require('express');
const router = express.Router();
const mysqlConnection = require("../config/connectdb");
const UserController = require('../controllers/userController');
const middleware = require('../middlewares/auth-middleware')

// router.get('/GetAllUsers',UserController.getAllUsers)
// router.post('/userResgistration', UserController.GenerateWallet)
router.post("/getbalance", middleware.Authorization, UserController.getbalance)
router.post('/transfer',  UserController.TransferBalance)

module.exports = router;
