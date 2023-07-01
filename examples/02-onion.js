const Koa = require('../lib/application')

const app = new Koa()

// 有请求发过来时，下边中间件的代码逻辑才会执行！

app.use(async function fn1 (ctx, next) {
  console.log('middleware-1-start')
  ctx.state.message = 'fn1-'
  await next()
  console.log('fn1 ctx: ', ctx.state.message)
  console.log('middleware-1-end')
})

app.use(async function fn2 (ctx, next) {
  console.log('middleware-2-start')
  ctx.state.message += 'fn2-'

  const fetchList = async (total = 100) => {
    return new Promise((resolve, reject) => {
      const list = []
      for (let i = 0; i < total; i++) {
        list.push('item-' + (i + 1))
      }

      setTimeout(() => resolve(list), 3000)
    })
  }

  const list = await fetchList()
  ctx.state.message += `listLen: ${list.length}`
  await next()
  console.log('middleware-2-end')
})

app.listen(3000, () => console.log('the server is running on http://localhost:3000'))

// ------------------ 上述中间件可以等价处理为 ------------------
// 理解了下边的代码，基本上就理解了 Koa 的“洋葱模型”原理！
// const ctx = { state: {} }

// // 模拟中间件 fn1
// async function fn1 (ctx, next) {
//   console.log('middleware-1-start')
//   ctx.state.message = 'fn1-'
//   await next()
//   console.log('fn1 ctx: ', ctx.state.message)
//   console.log('middleware-1-end')
// }

// // 模拟中间件 fn2
// async function fn2 (ctx, next) {
//   console.log('middleware-2-start')
//   ctx.state.message += 'fn2-'

//   const fetchList = async (total = 100) => {
//     return new Promise((resolve, reject) => {
//       const list = []
//       for (let i = 0; i < total; i++) {
//         list.push('item-' + (i + 1))
//       }

//       setTimeout(() => resolve(list), 3000)
//     })
//   }

//   const list = await fetchList()
//   ctx.state.message += `listLen: ${list.length}`
//   await next()
//   console.log('middleware-2-end')
// }

// // 模拟 koa-compose 处理后的中间件函数
// function fnMiddleware (ctx) {
//   return Promise.resolve(
//     fn1(ctx, function next1 () {
//       return Promise.resolve(
//         fn2(ctx, function next2 () {
//           return Promise.resolve()
//         })
//       )
//     })
//   )
// }

// fnMiddleware(ctx).then(res => {
//   console.log('fnMiddleware then: ', res, ctx)
//   // 处理请求响应数据...
// }).catch(err => {
//   console.error(err)
// })

/**
 * 输出结果分析：
 * 运行时即输出 'middleware-1-start' 和 'middleware-2-start'；
 * 然后等待 3s 后，同时输出如下内容：
 * middleware-2-end
 * fn1 ctx:  fn1-fn2-listLen: 100
 * middleware-1-end
 * fnMiddleware then:  undefined { state: { message: 'fn1-fn2-listLen: 100' } }
 *
*/
