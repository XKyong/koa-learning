// ctx.app.emit
// 错误处理：https://github.com/demopark/koa-docs-Zh-CN/blob/master/error-handling.md
const Koa = require('../lib/application')

const app = new Koa()

let count = 0

// app.use(async function errHandler1 (ctx, next) {
//   try {
//     await next()
//   } catch (err) {
//     // some errors will have .status
//     // however this is not a guarantee
//     ctx.status = err.statusCode || err.status || 500
//     ctx.type = 'html'
//     ctx.body = '<p>Something <em>exploded</em>, please contact Maru.</p>'

//     // throw err
//   }
// })

app.use(async function errHandler2 (ctx, next) {
  try {
    await next()
  } catch (err) {
    // since we handled this manually we'll
    // want to delegate to the regular app
    // level error handling as well so that
    // centralized still functions correctly.
    // ctx.app.emit('error', err, ctx)
    // ctx.app 即为当前应用实例，即 Koa 实例
    ctx.app.emit('custom-error', err, ctx)
  }
})

app.use(async function fn1 (ctx, next) {
  // Error 报错
  aa()
})

// app.use(async function fn2 () {
//   throw new Error('boom boom')
// })

// error handler
// app.on('error', function (err, ctx) {
app.on('custom-error', function (err, ctx) {
  console.log('error handler----', err)
  ctx.status = err.statusCode || err.status || 500
  ctx.type = 'html'
  ctx.body = `<p>Something <em>exploded</em>, please contact Maru. count: ${++count}</p>`
})

app.listen(3000, () => {
  console.log('服务器启动成功~')
})

/**
 * 调试总结：
 * 1.实际运行时会发现刷新页面1次，custom-error 错误事件侦听器会触发2次，因为还有多了个 favicon.ico 的请求！
 *
 * 2.错误处理有几种情况的写法：
 * （1）fn1/fn2
 * 这种情况即不做额外添加错误处理中间件（如上述errHandler1和errHandler2），那么此时，
 * a.如果 fn1/fn2 不是异步函数，则抛出去的错误先后会经过 [koa-compose]"return Promise.reject(err)" -> [application.js]"fnMiddleware(ctx).then(handleResponse).catch(onerror)" -> [context.js]"ctx.onerror(err)" -> [application.js]"onerror"方法 处理,
 *   至于响应的内容，等[application.js]"onerror"方法代码执行完成后，会回到 [context.js]"ctx.onerror(err)" 中，执行后续的 respond 逻辑，最终调用 res.end(msg) 返回给请求方。
 * b.如果 fn1/fn2 是异步函数(async)，则当fn1/fn2中间件内部执行出错，返回值是 rejected 状态的 Promise，因此抛出去的错误先后会经过 [application.js]"fnMiddleware(ctx).then(handleResponse).catch(onerror)" -> [context.js]"ctx.onerror(err)" -> [application.js]"onerror"方法 处理,
 *   至于响应的内容，等[application.js]"onerror"方法代码执行完成后，会回到 [context.js]"ctx.onerror(err)" 中，执行后续的 respond 逻辑，最终调用 res.end(msg) 返回给请求方。
 *
 * （2）errHandler1 搭配 fn1/fn2（异步函数）
 * 这种情况下，可以在 errHandler1 catch 分支中做 ctx.body 的处理，然后根据需要，
 * a.执行 "throw err" 把错误再抛出去，抛出去的错误先后会经过 [application.js]"fnMiddleware(ctx).then(handleResponse).catch(onerror)" -> [context.js]"ctx.onerror(err)" -> [application.js]"onerror"方法 处理,
 *   至于响应的内容，等[application.js]"onerror"方法代码执行完成后，会回到 [context.js]"ctx.onerror(err)" 中，执行后续的 respond 逻辑，最终调用 res.end(msg) 返回给请求方,
 *   errHandler1 catch 分支中 ctx.body 的处理会被覆盖掉；
 * b.不执行 "throw err"，则错误在errHandler1 catch 分支中处理掉了，
 *   至于响应的内容，在经过 [application.js]"fnMiddleware(ctx).then(handleResponse).catch(onerror)" -> [application.js]"respond(ctx)"处理后返回给请求方，
 *   errHandler1 catch 分支中 ctx.body 的处理不会被覆盖掉，而是作为最终的响应内容；
 *
 * （3）errHandler2 搭配 custom-error 搭配 fn1/fn2（异步函数）
 * 这种情况下，fn1/fn2 抛出去的错误被 errHandler2 catch 分支捕获到之后，通过 ctx.app.emit 方法直接指定给对应的错误事件监听器处理程序（app.on）进行处理，
 * 至于响应的内容，我们可以在监听器处理程序做 ctx.body 的处理，然后等所有的中间件执行完之后，
 * 经过 [application.js]"fnMiddleware(ctx).then(handleResponse).catch(onerror)" -> [application.js]"respond(ctx)"处理后返回给请求方
*/
