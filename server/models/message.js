const mongoose = require('mongoose')
const User = require('./user')
const Chat = require('./chat')

const messageSchema = new mongoose.Schema({
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    text: {
        type: String,
        trim: true,
        require: true
    },
    chat: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Chat'
    }
}
);
module.exports = mongoose.model('Message', messageSchema)