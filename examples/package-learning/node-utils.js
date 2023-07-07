const util = require('util')

// utils.format
console.log(util.format('i am %s %s', 'kai'))
console.log(util.format('the json is: %j', { name: 'kai', age: 23 }))
console.log(util.format('the object is: %o', { name: 'kai', age: 23 }))
console.log(util.format('i am %d', 100.23))
