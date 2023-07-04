const http = require('http')
const fs = require('fs')
const path = require('path')

// 这 3 个依赖经常搭配一起使用！
const contentDisposition = require('content-disposition')
const destroy = require('destroy')
const onFinished = require('on-finished')

// const filePath = path.resolve(process.cwd(), './docs/middleware.gif')
// console.log('extname--', path.extname(filePath))
// const filePath = path.resolve(process.cwd(), './docs/logo.png')
const filePath = path.resolve(process.cwd(), './docs/自我介绍.txt')

http.createServer((req, res) => {
  // set headers
  // res.setHeader('content-type', 'image/gif')
  // res.setHeader('content-type', 'image/png')
  // res.setHeader('content-type', 'text/plain')
  res.setHeader('content-disposition', contentDisposition(filePath))

  // send file
  const fileStream = fs.createReadStream(filePath)
  fileStream.pipe(res)

  onFinished(res, function () {
    console.log('onFinished---')
    destroy(fileStream)
  })
}).listen(3000, () => console.log('the server is running on http://localhost:3000'))
