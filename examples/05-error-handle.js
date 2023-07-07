// ctx.app.emit
// 错误处理：https://github.com/demopark/koa-docs-Zh-CN/blob/master/error-handling.md
const Koa = require('../lib/application')

const app = new Koa()

app.use(async (ctx, next) => {
  try {
    await next()
  } catch (err) {
    err.status = err.statusCode || err.status || 500
    throw err
  }
})

app.use(async (ctx, next) => {
  // Error 报错
  aa()
})

app.listen(3000, () => {
  console.log('服务器启动成功~')
})
