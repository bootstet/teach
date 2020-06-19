// 1 将下面异步代码使用Promise的方式改进
// setTimeout(function () {
//   var a = 'hello '
//   setTimeout(function () {
//     var b = 'lagou'
//     setTimeout(function () {
//       var c = 'i love you'
//       console.log(a + b + c)
//     }, 10)
//   }, 10)
// }, 10)


// 改造后的

var promise  = new Promise((resolve, reject) => {
  setTimeout(() => {
    var a = 'hello '
    resolve(a)
  }, 10)
})

promise.then(value => {
  // 这里b有是一个异步函数，所以需要在把异步之后的函数传给下一个then
  // 所以需要,在弄一个promise方法，通过resolve方法传递给下一个
  return new Promise(reslove => {
    setTimeout(() => {
      var b = 'lagou '
      reslove(value + b)
    }, 10)
  })

}).then(value => {
  setTimeout(() => {
    var c = 'i love you'
    console.log(value + c)
  }, 10)
})


