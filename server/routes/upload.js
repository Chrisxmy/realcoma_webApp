const Router = require('koa-router')
const User = require('../models/users.js')
const isAuth = require('../middlewares/auth')
const { uploadQiniu } = require('../service/qiniu.js')
const path = require('path')

const host = process.env.NODE_ENV === 'production' ? 'http://qiniu.xiemengyang.site/' : 'http://qiniu.xiemengyang.site/'


const multer = require('koa-multer');

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        const {originalname} =  file
        const url = path.join(__dirname, '../public/', originalname )
        cb(null,  path.join(__dirname, '../public' ))
        // uploadQiniu(originalname, url)
    },
    filename: function (req, file, cb) {   
        cb(null, file.originalname);
    }
})
var upload = multer({storage: storage});

const router = new Router()

router.post('/upload', upload.single('file'), async (ctx, next) => {
    if (ctx.req.file) {
        const url = host + ctx.req.file.filename
        const userid = ctx.cookies.get('userid')
        const user = await User.updateUserById(userid, {
            avatar: url
        })
        ctx.body = {
            code: 0,
            filename: user
        };
    }

})

module.exports = router



