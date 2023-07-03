const delegate = require('delegates')

const proto = {
  showName () {
    return 'proto'
  }
}

const propA = {
  aa: 12,
  bb: 23,
  cc: 'i am cc',
  _bar: 'propA',
  showAaName () {
    return this.aa
  },
  getSumTotal () {
    console.log('getSumTotal---')
    return this.aa + this.bb
  },
  get bar () {
    return this._bar
  },
  set bar (val) {
    this._bar = val
  }
}

proto.propA = propA

delegate(proto, 'propA')
  .method('showAaName')
  .method('getSumTotal')
  .getter('bar')
  .access('aa')

proto.aa = 100
proto.bar = 200

console.log(proto) // =>
// {
//   showName: [Function: showName],
//   propA: {
//     aa: 100,
//     bb: 23,
//     cc: 'i am cc',
//     _bar: 'propA',
//     showAaName: [Function: showAaName],
//     getSumTotal: [Function: getSumTotal],
//     bar: [Getter/Setter]
//   },
//   showAaName: [Function (anonymous)],
//   getSumTotal: [Function (anonymous)],
//   bar: [Getter],
//   aa: [Getter/Setter]
// }

console.log(proto.aa) // 100
// 'propA' -> 因为被委托对象proto（delegated object）上的 bar 是 getter，赋值操作不生效，访问时实际返回的是 proto.propA.bar
console.log(proto.bar)
console.log(proto.showName()) // 'proto'
console.log(proto.getSumTotal())
console.log(proto.propA.getSumTotal())
console.log(Object.getPrototypeOf(proto) === propA) // true
