const express = require('express');
const router = express.Router();
const UserController = require('../Controller/Controller');
// const middleware = require('../middlewares/auth-middleware')

router.post("/getbalance", UserController.getBalance)
router.post('/transfer',  UserController.Transfer)

module.exports = router;