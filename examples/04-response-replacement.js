const Koa = require('koa')

const app = new Koa()

const one = (ctx, next) => {
  ctx.body = 'hello middleware1'
  next()
}

const two = (ctx, next) => {
  ctx.body = 'hello middleware2'
  next()
}

const three = (ctx, next) => {
  ctx.body = 'hello middleware3'
  next()
}

app.use(one)
app.use(two)
app.use(three)

app.listen(3000, () => {
  console.log('服务器启动成功~')
})
