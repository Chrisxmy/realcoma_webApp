const Router = require('koa-router')
const router = new Router({
    prefix: process.env.NODE_ENV === 'production' ? '/api' : ''
})
const path = require('path')
const isAuth = require('../middlewares/auth')
const UserController = require('../controller/user')
const ChatController = require('../controller/chat')

const multer = require('koa-multer');
const { uploadQiniu } = require('../service/qiniu.js')


var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        const {originalname} =  file
        const url = path.join(__dirname, '../public/', originalname )
        cb(null,  path.join(__dirname, '../public' ))
        uploadQiniu(originalname, url)
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    }
})
var upload = multer({storage: storage});

router.post('/upload', upload.single('file'), UserController.upload)


router.get('/info', isAuth(), UserController.findUserById)
router.get('/users', UserController.findAllUsers)
router.post('/login', UserController.login)
router.post('/register', UserController.register)
router.post('/user/update', UserController.updateUserById)
router.post('/logout', UserController.logout)
router.get('/user/list', UserController.findUsersListByType)




router.get('/chat/list', ChatController.getMsgList)

router.get('/chat/messages', ChatController.getReceiveMsg)

router.post('/chat/cancelUnread', ChatController.cancelUnread)






module.exports = router



