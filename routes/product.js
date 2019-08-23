const express = require('express');
const router = express.Router();

const { userById } = require("../controllers/user");

const { create } = require('../controllers/product');
const { signup, signin, signout, requireSignin } = require("../controllers/auth");

router.post('/product/create/:userId', requireSignin, create)

router.param('userId', userById)

module.exports = router