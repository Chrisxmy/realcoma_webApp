const Router = require('koa-router')
const Chat = require('../models/chat.js')
const User = require('../models/users.js')
const isAuth = require('../middlewares/auth')


const router = new Router()
router.get('/chat/list', async (ctx, next) => {
    const from = ctx.cookies.get('userid')
    const to = ctx.request.query.target
    const list = await Chat.getMsgList({from, to})
    ctx.body = {
        code: 0,
        data: list,
    }
})

router.get('/chat/messages', async (ctx, next) => {
    const to = ctx.cookies.get('userid')
    const messages = await Chat.getReceiveMsg(to)
    ctx.body = {
        code: 0,
        data: messages,
    }
})

router.post('/chat/cancelUnread', async (ctx, next) => {
    const from = ctx.cookies.get('userid')
    const to = ctx.request.body.target
    await Chat.cancelUnread({from, to})
    ctx.body = {
        code: 0,
        data: 'success'
    }

})

module.exports = router



