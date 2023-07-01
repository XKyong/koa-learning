/*

【需求实现】
在middleware1中，在req.message中添加一个字符串 aaa；
在middleware2中，在req.message中添加一个 字符串bbb；
在middleware3中，在req.message中添加一个 字符串ccc；
当所有内容添加结束后，在middleware1中，通过res返回最终的结果；

*/

const Koa = require('../lib/application')

const app = new Koa()

const middleware1 = (ctx, next) => {
  ctx.message = 'aaa'
  next()
  ctx.body = ctx.message
}

const middleware2 = (ctx, next) => {
  ctx.message += 'bbb'
  next()
}

const middleware3 = (ctx, next) => {
  ctx.message += 'ccc'
  next()
}

app.use(middleware1)
app.use(middleware2)
app.use(middleware3)

app.listen(3000, () => {
  console.log('koa服务器启动成功~')
})
