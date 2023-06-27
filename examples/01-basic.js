const Koa = require('../lib/application')

const app = new Koa()

console.log(typeof app)

app.use((ctx, next) => {
  ctx.body = 'hello Koajs'

  next()
})

app.listen(3000, () => {
  console.log('the server is running on http://localhost:3000')
})
