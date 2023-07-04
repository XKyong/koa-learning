const only = require('only')

const obj = {
  name: 'tobi',
  last: 'holowaychuk',
  email: 'tobi@learnboost.com',
  _id: '12345'
}

// Return whitelisted properties of an object.
// 以下2种写法输出结果一致！
console.log(only(obj, ['name', 'last']))
console.log(only(obj, 'name last'))
