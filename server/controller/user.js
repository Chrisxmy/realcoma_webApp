const UserModel = require('../models/users.js')
const host = process.env.NODE_ENV === 'production' ? 'qiniu.xiemengyang.site/' : 'qiniu.xiemengyang.site/'

exports.login = async (ctx, next) => {
    let user = await UserModel.login(ctx.request.body)
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
}


exports.logout = async (ctx, next) => {
    ctx.cookies.set('userid', "", {})
    ctx.body = {
        code: 0,
    };
}

exports.register = async (ctx, next) => {
    let user = await UserModel.createUser(ctx.request.body, ctx, next)
    ctx.cookies.set('userid', user._id, {
        maxAge: 1000 * 60 * 60,
    })
    ctx.body = {code: 0}
}


exports.findAllUsers = async (ctx, next) => {
    let usersList = await UserModel.findAllUsers()
    ctx.body = {
        code: 0,
        users: usersList
    };
}

exports.findUserById = async (ctx, next) => {
    const userid = ctx.cookies.get('userid')
    const user = await UserModel.findUserById(userid)

    ctx.body = {
        code: 0,
        data: user
    };
}

exports.updateUserById = async (ctx, next) => {
    const userid = ctx.cookies.get('userid')
    if (!userid) ctx.throw(401, 'no Auth', {code: 1});
    const user = await UserModel.updateUserById(userid, ctx.request.body)
    ctx.body = {
        code: 0,
        data: user
    };
}


exports.findUsersListByType = async (ctx, next) => {
    const type = ctx.request.query.type
    let list = await UserModel.findUsersListByType(type)
    ctx.body = {
        code: 0,
        data: list
    };
}

exports.upload = async (ctx, next) => {
    if (ctx.req.file) {
        const url = host + ctx.req.file.filename
        const userid = ctx.cookies.get('userid')
        const user = await UserModel.updateUserById(userid, {
            avatar: url
        })
        ctx.body = {
            code: 0,
            filename: user
        };
    }

}