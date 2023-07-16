/*

【需求实现】
在middleware1中，在req.message中添加一个字符串 aaa；
在middleware2中，在req.message中添加一个 字符串bbb；
在middleware3中，在req.message中添加一个 字符串ccc；
当所有内容添加结束后，在middleware1中，通过res返回最终的结果；

*/

const Koa = require('../lib/application')

const app = new Koa()

const middleware1 = async (ctx, next) => {
  ctx.message = 'aaa'
  await next()
  ctx.body = ctx.message
}

const middleware2 = async (ctx, next) => {
  ctx.message += 'bbb'
  await next()
}

const middleware3 = async (ctx, next) => {
  const p = new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve('ccc')
    }, 2000)
  })

  ctx.message += await p

  // 最后一个中间件，next() 可以不执行
  // await next()
}

app.use(middleware1)
app.use(middleware2)
app.use(middleware3)

app.listen(3000, () => {
  console.log('koa服务器启动成功~')
})

// => 等待2s后，请求方拿到的响应内容是：'aaabbbccc'
