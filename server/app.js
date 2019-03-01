const Koa = require('koa');
const static = require('koa-static');

const bodyParser = require('koa-bodyparser');
const {handleError} = require('./middlewares/handleError')
require('./service/mongoose.js')
const {io} = require('./service/io')
const app = new Koa()
const server = require('http').Server(app.callback())

io(server);

const router = require('./routes/router.js')



app.use(bodyParser());
app.use(handleError());

app.use(router.routes(), router.allowedMethods())

app.use(static(__dirname + '/public',{
    gzip: false
}));



server.listen(8888, () => {
    console.log('starting at port 8888');
});

server.on('error', (err, ctx) => {
    err.status = 404;
    err.body = 'Page Not Found';
})







