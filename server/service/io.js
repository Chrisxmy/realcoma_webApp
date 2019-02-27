
const Chat = require('../models/chat.js')
const User = require('../models/users.js')

exports.io = function(server){
        const io = require('socket.io')(server)
        io.on('connection', async function (socket) {
            socket.on('sendMsg', async function (data) {
                let msg = await Chat.createMsg(data)
                let user = await User.findUserById(data.from)
                msg = msg.toObject()
                const {username,avatar} = user[0]
                msg.from = {_id:msg.from, username,avatar}
                io.emit('receiveMsg', msg)
            })
        })
}