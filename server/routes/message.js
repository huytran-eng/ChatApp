const express = require("express");
const router = express.Router({ mergeParams: true });
const message = require('../controllers/message')
const isLoggedIn = require('../middeware/userAuth')

router.post('/', isLoggedIn, message.newMess)
router.get('/:id', isLoggedIn, message.getMessages)

module.exports = router