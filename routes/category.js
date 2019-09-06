const express = require('express');
const router = express.Router();
const { requireSignin, isAdmin, isAuth } = require("../controllers/auth");
const { userById } = require("../controllers/user");


const { create, categorybyId, read, update, remove, list } = require("../controllers/category");

router.get('/category/:categoryId', read)
router.post('/category/create/:userId', requireSignin, isAuth, isAdmin, create);
router.put('/category/:categoryId/:userId', requireSignin, isAuth, isAdmin, update);
router.delete('/category/:categoryId/:userId', requireSignin, isAuth, isAdmin, remove);
router.get('/categories', list)

router.param('userId', userById)
router.param('categoryId', categorybyId)

module.exports = router