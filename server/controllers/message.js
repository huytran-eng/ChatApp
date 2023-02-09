const asyncHandler = require("express-async-handler")
const Chat = require('../models/chat')
const User = require('../models/user')
const Message = require('../models/message')

module.exports.newMess = asyncHandler(async (req, res) => {
    const { text, chatId } = req.body
    if (!text || !chatId) {
        return res.sendStatus(400)
    }
    const newMsg = new Message({ author: req.user._id, text: text, chat: chatId })
    await newMsg.save()
    await Chat.findByIdAndUpdate(chatId, { latestMessage: newMsg })
    const msg = await Message.findById(newMsg._id).populate("author").populate("chat")
    res.json(msg)
})
module.exports.getMessages = asyncHandler(async (req, res) => {
    const messages = await Message.find({ chat: req.params.id })
        .populate("author", "username email")
        .populate("chat")
    res.json(messages)
})