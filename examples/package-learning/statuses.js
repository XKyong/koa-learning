const statuses = require('statuses')

console.log(statuses(403)) // 403
console.log(statuses('404')) // 404

console.log(statuses('forbidden')) // 403
console.log(statuses.codes)
console.log(statuses['not found']) // 404
console.log(statuses['500']) // 'Internal Server Error'

// Returns true if a status code expects an empty body
console.log(statuses.empty[204]) // true
console.log(statuses.empty[200]) // undefined
