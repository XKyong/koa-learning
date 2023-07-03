const http = require('http')
const parse = require('parseurl')

http.createServer((req, res) => {
  // http://localhost:3000/req/123?name=kai&age=23
  const parsedUrl = parse(req)
  // =>
  // {
  //   "protocol": null,
  //   "slashes": null,
  //   "auth": null,
  //   "host": null,
  //   "port": null,
  //   "hostname": null,
  //   "hash": null,
  //   "search": "?name=kai&age=23",
  //   "query": "name=kai&age=23",
  //   "pathname": "/req/123",
  //   "path": "/req/123?name=kai&age=23",
  //   "href": "/req/123?name=kai&age=23",
  //   "_raw": "/req/123?name=kai&age=23"
  // }
  res.end(JSON.stringify(parsedUrl))
}).listen(3000, () => console.log('the server is running on http://localhost:3000'))
