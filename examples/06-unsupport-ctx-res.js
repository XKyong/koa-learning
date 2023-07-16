/**
 * 绕过 Koa 的 response 处理是 不被支持的. 应避免使用以下 node 属性：
 * res.statusCode
 * res.writeHead()
 * res.write()
 * res.end()
*/
const Koa = require('../lib/application')

const app = new Koa()

app.use((ctx, next) => {
  // ctx.respond = false

  ctx.res.end('hello ctx.res!')
})

app.listen(3000, () => {
  console.log('the server is running on http://localhost:3000')
})

/**
 * 不支持的原因，通过调试可以发现：
 * 在 中间件（函数）执行过程中，执行了 ctx.res.end('hello ctx.res!') 代码响应了请求，
 * 但最终 http 状态码会是 404 的（[application.js]this.handleRequest 方法中执行了“res.statusCode = 404”代码），因为绕过了 Koa response 处理，源码中是 application 文件中 repond 函数处理，
 * 这会让人疑惑，也容易引入问题，可能会破坏 Koa 中间件和 Koa 本身的预期功能，因此说是“不支持”的！
 * 虽然显式设置 ctx.respond = false 就可以绕过 Koa 的内置 response 处理
*/
