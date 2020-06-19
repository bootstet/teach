const fp = require('lodash/fp')
const _ = require('lodash')

// 数据
// horsepower 马力，dollar_value 价格，in_stock 库存
const cars = [
  {name: "Ferrari FF", horsepower: 660, dollar_value: 700000, in_stock: true},
  {name: "Spyker C12 Zagato", horsepower: 650, dollar_value: 648000, in_stock: false},
  {name: "Jaguar XKR-S", horsepower: 550, dollar_value: 132000, in_stock: false},
  {name: "Audi R8", horsepower: 525, dollar_value: 114200, in_stock: false},
  {name: "Aston Martin One-77", horsepower: 750, dollar_value: 1850000, in_stock: true},
  {name: "Pagani Huayra", horsepower: 700, dollar_value: 1300000, in_stock: false}
]

// 练习 1 ： 使用函数组合fp.flowRight()重新实现下面这个函数
let inLastInStock = function (cars) {
  // 获取最后一条数据
  let last_car = fp.last(cars)
  console.log(last_car)
  // 获取最后一条数据的 in_stock 属性值
  return fp.prop('in_stock', last_car)
}
// => 答案
let inLastInStock1 = fp.flowRight(fp.prop('in_stock'), fp.last) 
// flowRight 从右往左执行， 有参数传参数，没参数不传写方法体即可，要返回这个方法，而不是方法执行后的结构

console.log(inLastInStock1(cars))

// --------------------------我是分割线-----------------------------------

// 练习2 使用fp.flowRight()、 fp.prop()、fp.first()、获取第一个car的name
// 答案 =>
let getFirstCarName = fp.flowRight(fp.prop('name'), fp.first)
console.log(getFirstCarName(cars))

// --------------------------我是分割线-----------------------------------

// 练习3 使用帮助函数 _average 重构 averageDollarValue, 使用函数组合
// 的方式实现
let _average = function (xs) {
  return fp.reduce(fp.add, 0, xs) / xs.length
} // 无需改动

let averageDollarValue = function (cars) {
  let dollar_values = fp.map(function(cars) {
    return cars.dollar_value
  }, cars)
  return _average(dollar_values)
}
console.log(averageDollarValue(cars))
// 答案 =>
// 过滤所有的dollar_vlaue 组成一个新的数组
const filterName = arr => fp.map(cars => cars.dollar_value, arr)
// 使用组合函数
let averageDollarValue1 = fp.flowRight(_average, filterName)
console.log(averageDollarValue1(cars))



// --------------------------我是分割线-----------------------------------

// 练习4 ： 使用flowRight写一个sanitizeNames()函数，返回一个下划线
// 链接的小写字符串，把数组中的name转换为这种形式：例如：
// sanitizeNames(['Hello World']) => ['hello_world']
let _underscore = fp.replace(/\W+/g, '_') // <-- 无须改动


let strTrans = fp.flowRight(_.toLower, _underscore)

let sanitizeNames = fp.flowRight( fp.map(item => strTrans(item.name)))
console.log((sanitizeNames(cars)))



