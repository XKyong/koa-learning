const http = require('http')

const typeis = require('type-is')

http.createServer((req, res) => {
  const istext = typeis(req, ['json'])
  // json
  console.log(istext)
  res.end(JSON.stringify({ msg: 'you ' + (istext ? 'sent' : 'did not send') + ' me json' }))
}).listen(3000, () => console.log('the server is running on http://localhost:3000'))

// 客户端请求---------------------------------
// async function postData (url, data) {
//   const res = await fetch(url, {
//     method: 'POST', // *GET, POST, PUT, DELETE, etc.
//     mode: 'cors', // no-cors, *cors, same-origin
//     cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
//     credentials: 'same-origin', // include, *same-origin, omit
//     headers: {
//       'Content-Type': 'application/json; charset=utf-8'
//     },
//     redirect: 'follow', // manual, *follow, error
//     referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
//     body: JSON.stringify(data) // body data type must match "Content-Type" header
//   })

//   return res.json()
// }

// postData('http://localhost:3000/req/123?name=kai&age=23').then(console.log)
