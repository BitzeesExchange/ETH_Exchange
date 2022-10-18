const express = require('express');
const router = express.Router();
const mysqlConnection = require("../config/connectdb");
const UserController = require('../controllers/userController');
const middleware = require('../middlewares/auth-middleware')

router.get('/GetAllUsers',UserController.getAllUsers)
router.post('/userResgistration', UserController.userResgistration)
router.post("/getbalance", middleware.Authorization, UserController.getbalance)
router.post('/transfer', middleware.Authorization, UserController.TransferBalance)

module.exports = router;
