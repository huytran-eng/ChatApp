
const express = require('express')
const app = express()
const http = require('http')
const server = http.createServer(app)
const mongoose = require('mongoose')
const session = require('express-session')
const userRoutes = require('./routes/user')
const chatRoutes = require('./routes/chat')
const messageRoutes = require('./routes/message')

var cors = require('cors')
require("dotenv").config();
const dburl = 'mongodb://localhost:27017/chatapp-react'
mongoose.connect(dburl)
    .then(() => console.log("da ket noi mongoose"))
    .catch(err => {
        throw (err)
    })



app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors()) // include before other routes
app.get('/', (req, res,) => res.send('Hello world!'));


app.use("/user", userRoutes);
app.use("/chat", chatRoutes);
app.use("/message", messageRoutes);


app.all('*', (req, res, next) => {
    next(new ExpressError('Khong Tim Thay', 404))
})
app.use((err, req, res, next) => {
    const { statusCode = 500, message = 'Oh No, Something Went Wrong!' } = err;
    res.status(statusCode).render('error', { err })
})

const io = require('socket.io')(server, {
    cors: { origin: "*" }
});
io.on("connection", (socket) => {
    socket.on("setup", (userData) => {
        if (userData) socket.join(userData._id)
    })
    socket.on('leave-call', (user, roomId) => {
        console.log('roi cuoc goi')
        socket.to(roomId).emit('call-ended');
    })
    socket.on('new-message', (messageData) => {
        const userId = messageData.author._id
        messageData.chat.users.map(user => {
            if (user != userId) {
                io.to(user).emit('message-recieved', messageData)
            }
        })
    })
    socket.on('call', (user, chat) => {
        chat.users.map(u => {
            if (u._id != user._id) {
                io.to(u._id).emit('recieve-call', user.username, chat._id)
            }
        })
    })
    socket.on('join-vid', (user, roomId) => {
        socket.join(roomId)
        socket.to(roomId).emit('join-vid', user);
    })
    socket.on('decline-call', (user, caller) => {
        io.to(caller._id).emit('call-declined')
    })

})

server.listen(5000, function () {
    console.log('listening 5000');
});
