const Router = require('koa-router')
const router = new Router()

const User = require('../models/users.js')
const isAuth = require('../middlewares/auth')




router.get('/info', isAuth(), async (ctx, next) => {
    const userid = ctx.cookies.get('userid')
    const user = await User.findUserById(userid)

    ctx.body = {
        code: 0,
        data: user
    };
})

router.get('/users', async (ctx, next) => {
    let usersList = await User.findAllUsers()
    ctx.body = {
        code: 0,
        users: usersList
    };
})

router.post('/login', async (ctx, next) => {
    let user = await User.login(ctx.request.body)
    if (!user) ctx.throw(500, '账号或密码不存在')
    ctx.cookies.set('userid', user._id, {
        maxAge: 1000 * 60 * 60,
        expire: Date.now() + 1000 * 60 * 60,
        path: '/',
    })
    ctx.body = {
        code: 0,
        data: user
    };
})

router.post('/register', async (ctx, next) => {
    let user = await User.createUser(ctx.request.body, ctx, next)
    ctx.cookies.set('userid', user._id, {
        maxAge: 1000 * 60 * 60,
    })
    ctx.body = {code: 0}
})

router.post('/user/update', async (ctx, next) => {
    const userid = ctx.cookies.get('userid')
    if (!userid) ctx.throw(401, 'no Auth', {code: 1});
    const user = await User.updateUserById(userid, ctx.request.body)
    ctx.body = {
        code: 0,
        data: user
    };
})

router.get('/user/list', async (ctx, next) => {
    const type = ctx.request.query.type
    let list = await User.findUsersListByType(type)
    ctx.body = {
        code: 0,
        data: list
    };
})

router.post('/logout', async (ctx, next) => {
    ctx.cookies.set('userid', "", {})
    ctx.body = {
        code: 0,
    };
})

module.exports = router



