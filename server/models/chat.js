const mongoose = require('mongoose')
const Schema = mongoose.Schema
const { ObjectId } = Schema.Types


const ChatSchema = new Schema({
    chatId:{type: String, required:true },
    from: {type: ObjectId, required:true ,ref: 'User' },
    to: {type: ObjectId, required:true },
    content:{type:String, required:true },
    isRead:{type:Boolean, default:false },
    createTime:{type: Number, default: new Date().getTime() },
})

const ChatModel = mongoose.model('Chat', ChatSchema)


async function createMsg({from,to,content}){
    const chatId = [from, to].sort().join('_')
    const chat = new ChatModel({
        chatId,
        from,
        to,
        content,
        createTime:new Date().getTime(),
    })
    return await chat.save()
}


async function getMsgList({from,to}){
    let chatId = [from, to].sort().join('_')
    const list = !to ? ChatModel.find({}) : ChatModel.find({chatId}).populate('from', {'avatar':1,'username':1})
    return list
}

async function getReceiveMsg(to){
    const list = ChatModel.find({to}).populate('from', {'avatar':1,'username':1})
    return list
}

async function cancelUnread({from,to}){
    let chatId = [from, to].sort().join('_')
    const messages = ChatModel.updateMany({chatId},{
        isRead:true
    }, {
        new: true
    })

    return messages
}


module.exports = {
    model: ChatModel,
    createMsg,
    getMsgList,
    getReceiveMsg,
    cancelUnread
}