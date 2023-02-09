const express = require("express");
const router = express.Router({ mergeParams: true });
const user = require('../controllers/user')
const isLoggedIn = require('../middeware/userAuth')
router.get('/', isLoggedIn, user.allUsers);
router.post('/signup', user.register)
router.post('/login', user.login)
module.exports = router;    