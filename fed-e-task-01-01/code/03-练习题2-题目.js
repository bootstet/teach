// 练习1： 使用fp.add(x, y) 和 fp.map(f, x)
// 创建一个能让function 里的值增加的函数ex1
const fp = require('lodash/fp')
const { Maybe, Container } = require('./app.js')

let maybe = Maybe.of([5, 6, 1])
let ex1 = num => {
  return fp.map(e => fp.add(e, num) , maybe._value)
}
console.log(ex1(1))

// 练习2 实现一个函数ex2，能够使用fp.first获取列表的第一个元素


let xs = Container.of(['do', 'ray', 'me', 'fa', 'so', 'la', 'ti', 'do'])
let ex2 = () => {
  return fp.first(xs._value)
}
console.log(ex2())

// 练习3 实现一个函数ex3, 能够使用safeProp 和 fp.first 找到user的名字的首字母

let safeProp = fp.curry(function(x, o) {
  return Maybe.of(o[x])
})

let user = { id: 2, name: 'Albert'}
let ex3 = () => {
  // 获取user中的name
  const f = safeProp('name', user)
  // 获取name中的首字母
  return fp.first(f._value)
}
console.log(ex3())

// 练习4： 使用Maybe 重写ex4 ，不要用if语句

let ext = function (n) {
  if (n) {
    return parseInt(n)
  }
}
// 答：

let ext1 = function (n) {
  let r = Maybe.of(n)
            .map( n => parseInt(n) )
  return r._value
}
console.log(ext(2))
console.log(ext1(2))
