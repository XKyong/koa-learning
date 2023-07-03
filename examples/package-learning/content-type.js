const contentType = require('content-type')

// interface ReturnObj {
//   type: String
//   parameters: {
//     charset?: string
//   }
// }
console.log(contentType.parse('image/svg+xml; charset=utf-8'))
console.log(contentType.parse('application/json'))

// contentType.parse(req) => contentType.parse(req.headers['content-type'])
// contentType.parse(res) => contentType.parse(res.getHeader('content-type'))
