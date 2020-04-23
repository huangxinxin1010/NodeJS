const Koa = require('koa');
const cors = require('koa2-cors');
const bodyParser = require('koa-bodyparser')
const logger = require('koa-logger')
const checkToken = require('./middleware/check-token')
const router = require('./router');

const app = new Koa();

// 白名单
const whiteList = [
  '/login',
  '/register',
  '/find',
  '/goods',
  '/goods/detail',
  '/category',
  '/rank'
]
// 跨域
app.use(cors())
// 日志
app.use(logger())
// 请求体转换
app.use(bodyParser())
app.use(checkToken(whiteList));
app.use(router.routes());
app.use(router.allowedMethods());
// 后端服务端口
app.listen(3014);
