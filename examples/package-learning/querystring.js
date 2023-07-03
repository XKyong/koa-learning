// node 内置模块
const qs = require('querystring')

const parsedObj = qs.parse('color=blue&size=small&name=谢楷勇')
console.log(parsedObj)

const stringifiedStr = qs.stringify(parsedObj)
console.log(stringifiedStr)
