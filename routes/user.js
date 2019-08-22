const express = require('express');
const router = express.Router();
const {userSignupValidator} = require('../validator/index');

const { signup, signin, signout } = require("../controllers/user");

router.post('/signup', userSignupValidator, signup)
router.post('/signin', signout)
router.get('/signout', signout)


module.exports = router