const ChatModel = require('../models/chat.js')


exports.getMsgList = async (ctx, next) => {
    const from = ctx.cookies.get('userid')
    const to = ctx.request.query.target
    const list = await ChatModel.getMsgList({from, to})
    ctx.body = {
        code: 0,
        data: list,
    }
}


exports.getReceiveMsg = async (ctx, next) => {
    const to = ctx.cookies.get('userid')
    const messages = await ChatModel.getReceiveMsg(to)
    ctx.body = {
        code: 0,
        data: messages,
    }
}



exports.cancelUnread = async (ctx, next) => {
    const from = ctx.cookies.get('userid')
    const to = ctx.request.body.target
    await ChatModel.cancelUnread({from, to})
    ctx.body = {
        code: 0,
        data: 'success'
    }

}