// 跟 协商缓存 相关！
const fresh = require('fresh')
const reqHeaders1 = { 'if-none-match': '"foo"' }
const resHeaders1 = { etag: '"bar"' }
console.log(fresh(reqHeaders1, resHeaders1))
// => false

const reqHeaders2 = { 'if-none-match': '"foo"' }
const resHeaders2 = { etag: '"foo"' }
console.log(fresh(reqHeaders2, resHeaders2))
// => true
