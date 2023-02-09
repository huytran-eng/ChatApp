const express = require("express");
const router = express.Router({ mergeParams: true });
const chat = require('../controllers/chat')
const isLoggedIn = require('../middeware/userAuth')

router.post('/', isLoggedIn, chat.accessChat)
router.get('/', isLoggedIn, chat.fetchChats)
router.post('/group', isLoggedIn, chat.createGroupChat)
// router.route("/groupremove", isLoggedIn, chat.removeFromGroup);
// router.route("/groupadd", isLoggedIn, chat.addToGroup);
module.exports = router