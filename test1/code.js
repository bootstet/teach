// // const man = {
// //   name: 'jscode',
// //   age: 22
// // }

// const { set } = require("lodash")


// const proxy = new Proxy(man, {
//   get(target, property) {
//     if(property in target) {
//       return target[property]
//     } else {
//       throw new Error(`Property ${property} does not exist`)
//     }
//   },
// })

// // console.log(proxy.age)
// // // console.log(proxy.old)
// // man.aaa = 234

// function red () {
//   console.log('red')
// }
// function green () {
//   console.log('green')
// }
// function yellow () {
//   console.log('yellow')
// }

function promise(fn, time) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      fn()
      resolve()
    }, time);
  })
}

function cyclic () {
  setInterval(() => {
    promise(green, 1000)
    promise(yellow, 2000)
    promise(red, 3000)
  }, 3000);
}

// const step = function () {
//   Promise.resolve()
//     .then(() => {
//       // 延时3m调红灯
//     })
//     .then(() => {
//       // 延时2m调黄灯
//     })
//     .then(() => {
//       // 延时1m调路灯
//     })
//     .then(() => {
//       // 最后递归调用3个灯循环的函数
//       return step();
//     });
// };
// // 初始化执行一次亮灯的指示
// step();

cyclic()

var User = {
  count: 1,
  action: {
    getCount: function () {
      return this.count
    }
  }
}

var getCount = User.action.getCount;
setTimeout(() => {
  console.log('result1', User.action.getCount())
});
console.log('result2', getCount())

// 4*****4. 简答 (字节跳动 二面)

// \- 你觉得typescript和javascript有什么区别
// \- typescript你都用过哪些类型
// \- typescript中type和interface的区别
/**
 * 
 
  typescript 是 javascript的超集，是javascript语言之上的语言，
  typescript 在 javascript 之上，多了一些类型系统和es6新特性的支持，最终会被编译为原始的javaScript
  typescript用过的类型： number， string, boolean, null, undefined, symbol, array, object, any
  interface 用来约束一个对象的结构，一个对象去实现一个接口，就必须拥有接口中所约束的所有成员，type是一个类型定义的类型的约束

  *****5. 对 async/await 的理解，分析内部原理
  async/await Generator 的语法糖，并对 Generator 函数进行了改进，基于promise进行了封装

  *****6. async/await 如果右边方法执行出错该怎么办？（百度一面 2020）
  使用 then 函数，将发生错误时，执行相应的处理，或使用catch执行 catch方法里的函数

  *****7. 说一下 event loop 的过程？promise 定义时传入的函数什么时候执行？（小米 三面）
  一开始整个脚本作为一个宏任务执行。执行过程中同步代码直接执行，宏任务等待时间到达或者成功后，将方法的回调放入宏任务队列中，微任务进入微任务队列。
  当前主线程的宏任务执行完出队，检查并清空微任务队列。接着执行浏览器 UI 线程的渲染工作，检查web worder 任务，有则执行。
  然后再取出一个宏任务执行。以此循环...
  promise定义时传入的函数在宏任务队列中执行

  *****8. 说一下防抖函数的应用场景，并简单说下实现方式 （滴滴）

    防抖函数一般用于input输入框架的格式验证，每隔一定的时间去校验input输入的内容
  可以将目标方法包装在setTimeout里，然后这个方法是一个事件的回调函数，如果这个函数一直执行，
  那么动作就一直不执行，等到用户不触发时间了，settimeout就胡自然执行这个方法

  *****9. 说一下V8的垃圾回收机制 （小米）
    js 有垃圾处理器，所以无需手动回收内存，而是由垃圾处理器自动处理。垃圾处理器有自己的回收策略。比如那些执行完毕的函数，
    如果没有外部引用（被引用的话会形成闭包），就会回收。常见的垃圾回收规则是标记清除和引用计数。
    而没有固定一种回收算法能胜任所有场景，采取分代式，可以对不同的代进行不同的处理，即新生代和老生代

  *****10. performance API 中什么指标可以衡量首屏时间
  
  *****11. 在 EcmaScript 新特性中，暂时性死区有什么作用
    js是静态作用域，在代码编译的时候就会去分析各作用域的变量对象，因为创建过程一定是在代码前完成，
    减少运行时错误，防止在声明前就是用这个变量

  *****12. 观察者模式和发布订阅模式的区别标题
  观察者模式有具体的目标调度，当事件触发，Dep 就会去调用观察者的方法，观察者模式的订阅与发布者之间存在依赖的
  发布订阅模式有统一的中心调用，发布者和订阅者不需要知道对方的存在

  *****13. gulp自己写过任务吗？说一下它的构建流程（阿里 2018）
  1 初始化， 安装
  2 在gulpfile.js文件中编写需要gulp构建自动执行的一些任务  exports.default 命令
  done() 表示任务完成 导出函数成员
  3 单独封装一些任务，例如css文件的处理，图片和文字的处理，开发环境服务器的搭建
  4 用并行或者串行将这些任务按需封装起来，用于开发或者上线前打包

  *****14. package-lock.json 有什么作用，如果项目中没有它会怎么样，举例说明

  锁定安装是安装包的版本号，并且上传到git以保证其他人在npm install时依赖保持一致
  因为 npm 是一个用于管理 package之前依赖关系的管理器，它允许开发者在package.json中间标出自己
  项目对npm各库包的依赖。你可以选择以如下方式来标明自己所需库包的版本。
  eg："@types/node" : "^8.0.33"
  这里面的向上标号^是定义了向后兼容依赖，指如果types/node的版本是超过了8.0.33，并在打版本上相同，
  就允许下载 types/node 库包。
  大多数情况这种想新兼容依赖下载最新库包的时候都没有问题，可npm是开源世界，各库包的版本语义可能并不
  相同，有的库包开发者并不遵守这一原则。所以完全相同的一个nodejs代码库，在不同的时间或者不同的npm下载资源下
  下到的各依赖库包版本可能有所不同，因此其依赖库包行为特征也不同有时候完全不兼容。因此，npm package-lock.json
  就是为了解决这个问题，只要按照package-lock.json所示的具体版本下载依赖库包，就能明确所有库包与你上次
  安装的完全一样。

  *****15. webpack 常用配置项有哪些，并说明用途 （跟谁学 2020）
  mode: 工作模式 none production  development 打包后代码的模式
  entry: 入口文件
  output: 输入文件
  devtool: 调试模式
  devServer: 开发模式的一些配置，如代码配置
  module: 打包模块文件，例如一些js css png 字体 的一些加载模块

 * 
 */

