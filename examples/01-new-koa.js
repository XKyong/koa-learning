const fs = require('fs')
const path = require('path')

const Koa = require('../lib/application')

const app = new Koa()

console.log(typeof app)

/**
 * new Koa过程，搞清楚几个问题：
 * 1.new Koa过程涉及哪些方法处理？
 * 2.针对不同类型，查看下 application 文件中，respond 函数是如何处理的？
*/
app.use((ctx, next) => {
  // string
  // ctx.body = 'hello Koajs'

  // stream
  ctx.set({ 'content-type': 'image/jpg' })
  ctx.body = fs.createReadStream(path.resolve(__dirname, '../assets/avatar.jpg'))

  // json
  // ctx.body = require(path.resolve(__dirname, '../assets/persons.json'))

  next()
})

app.listen(3000, () => {
  console.log('the server is running on http://localhost:3000')
})
