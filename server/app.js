const Koa = require('koa');
const path = require('path')
const fs = require('fs')
const bodyParser = require('koa-bodyparser');
const {handleError} = require('./middlewares/handleError')
require('./service/mongoose.js')
const {io} = require('./service/io')
const app = new Koa()
const server = require('http').Server(app.callback())

io(server);

const user = require('./routes/user.js')
const chat = require('./routes/chat.js')
const upload = require('./routes/upload.js')


app.use(bodyParser());
app.use(handleError());

app.use(user.routes(), user.allowedMethods())
app.use(chat.routes(), chat.allowedMethods())
app.use(upload.routes(), upload.allowedMethods())


server.listen(8888, () => {
    console.log('starting at port 8888');
});

server.on('error', (err, ctx) => {
    err.status = 404;
    err.body = 'Page Not Found';
})







