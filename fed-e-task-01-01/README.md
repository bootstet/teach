#### 谈谈你是如何理解JS异步编程的？Eventloop，消息队列都是做什么的？什么是宏任务，什么是微任务？

答：js是单线程语言，在某个特性的时刻只有特定的代码能够被执行，并阻塞其他的代码，所以一些比较耗时的js执行代码会严重影响体验，这个时候就需要异步执行，所以js的代码执行就分两种模式，同步模式和异步模式。
+ 因为回调函数的地狱回调问题，异步模式从一开始的回调函数，发布订阅，到es5的promise、async也一直也在发展中
+ eventloop和消息队列： js中所有的同步任务都在主线程上执行，即在执行栈（call stack）上执行，执行栈外有一个消息队列，当所有执行栈上的任务执行完以后就会按顺序去执行消息队列中的方法。
+ 宏任务和微任务：当主线程的一些方法在从上往下执行的时候，碰到一些事件驱动型的方法，并不会立即执行，而是会把这些方法放到消息队列中，比如setTimeout,setInterval,和一些dom操作元素上的事件。这些事件有些是宏任务，有些是微任务，会优先执行宏任务，在执行微任务。常见的宏任务如 宏任务和微任务：当主线程的一些方法在从上往下执行的时候，碰到一些事件驱动型的方法，并不会立即执行，而是会把这些方法放到消息队列中，比如setTimeout，setIntercal。
+ 等待执行栈上的函数执行完以后，就回去消息对列中把所有的任务都拿出来在一次执行。

# 模块一：函数式编程与 JS 异步编程、手写 Promise参考答案

#### 简答题

### 一、谈谈你是如何理解 JS 异步编程的，EventLoop、消息队列都是做什么的，什么是宏任务，什么是微任务？

- JS 异步编程

  JavaScript 语言的执行环境是单线程的，一次只能执行一个任务，多任务需要排队等候，这种模式可能会阻塞代码，导致代码执行效率低下。为了避免这个问题，出现了异步编程。一般是通过 callback 回调函数、事件发布/订阅、Promise 等来组织代码，本质都是通过回调函数来实现异步代码的存放与执行。

- EventLoop 事件环和消息队列

  **EventLoop** 是一种循环机制 ，不断去轮询一些队列 ，从中找到 需要执行的任务并按顺序执行的一个执行模型。

  **消息队列** 是用来存放宏任务的队列， 比如定时器时间到了， 定时间内传入的方法引用会存到该队列， ajax回调之后的执行方法也会存到该队列。

  ![EventLoop.jpg](http://ww1.sinaimg.cn/large/0069rEoegy1gg8i0534ytj30zm0p7gol.jpg)

  

  一开始整个脚本作为一个宏任务执行。执行过程中同步代码直接执行，宏任务等待时间到达或者成功后，将方法的回调放入宏任务队列中，微任务进入微任务队列。

  当前主线程的宏任务执行完出队，检查并清空微任务队列。接着执行浏览器 UI 线程的渲染工作，检查web worder 任务，有则执行。

  然后再取出一个宏任务执行。以此循环...

  

- 宏任务与微任务

  **宏任务**可以理解为每次执行栈执行的代码就是一个宏任务（包括每次从事件队列中获取一个事件回调并放到执行栈中执行）。

  浏览器为了让 JS 内部宏任务 与 DOM 操作能够有序的执行，会在一个宏任务执行结束后，在下一个宏任务执行开始前，对页面进行重新渲染。

  宏任务包含：script(整体代码)、setTimeout、setInterval、I/O、UI交互事件、MessageChannel 等

  

  **微任务**可以理解是在当前任务执行结束后需要立即执行的任务。也就是说，在当前任务后，在渲染之前，执行清空微任务。

  所以它的响应速度相比宏任务会更快，因为无需等待 UI 渲染。

  微任务包含：Promise.then、MutaionObserver、process.nextTick(Node.js 环境)等

------

#### 代码题

### 一、将下面异步代码使用 Promise 的方式改进

```
setTimeout(function() {
    var a = 'hello'
    setTimeout(function() {
        var b = 'lagou'
        setTimeout(function() {
            var c = 'I ❤️ U'
            console.log(a + b + c)
        }, 10);
    }, 10);
}, 10);
```

> 参考代码：

```
new Promise(resolve => {
    var a = 'hello'
    resolve(a)
}).then(resA => {
    var b = 'lagou'
    return resA + b;
}).then(resB => {
    var c = 'I ❤ U'
    console.log(resB + c)
})
//
async function showStr() {
  let a = await Promise.resolve('helloP')
  let b = await Promise.resolve('lagou')
  let c = await Promise.resolve('IU')
  console.log(a + b + c)
}
showStr()
--------------------------------------------------
/ function promise(str) {
//   return new Promise((resolve, reject) => {
//     setTimeout(() => {
//       resolve(str)
//     }, 10)
//   })
// }

// async function showStr() {
//   let a = await promise('hello')
//   let b = await promise('lagou')
//   let c = await promise('IU')
//   console.log(a + b + c)
// }
// showStr()
-----------------------------
Promise.resolve('hello')
  .then((value) => {
    return value + 'logou';
  })
  .then((value) => {
    return value + 'I ♥ U';
  })
  .then((value) => console.log(value));
```

------

### 二、基于以下代码完成下面的四个练习

```
const fp = require('lodash/fp')
// 数据：horsepower 马力，dollar_value 价格，in_stock 库存
const cars = [
    { name: 'Ferrari FF', horsepower: 660, dollar_value: 700000, in_stock: true },
    { name: 'Spyker C12 Zagato', horsepower: 650, dollar_value: 648000, in_stock: false },
    { name: 'Jaguar XKR-S', horsepower: 550, dollar_value: 132000, in_stock: false },
    { name: 'Audi R8', horsepower: 525, dollar_value: 114200, in_stock: false },
    { name: 'Aston Martin One-77', horsepower: 750, dollar_value: 1850000, in_stock: true },
    { name: 'Pagani Huayra', horsepower: 700, dollar_value: 1300000, in_stock: false }
]
```

#### 练习1：使用组合函数 fp.flowRight() 重新实现下面这个函数

```
let isLastInStock = function(cars){
    // 获取最后一条数据
    let last_car = fp.last(cars)
    // 获取最后一条数据的 in_stock 属性值
    return fp.prop('in_stock', last_car)
}
```

> 先定义获取最后一条数据的函数，再定义获取某个对象中的 in_stock 属性的函数，再用 fp.flowRight 组合函数

```
let isLastInStock = fp.flowRight(fp.prop('in_stock'), fp.last);
console.log(isLastInStock(cars)); // false
```

#### 练习2：使用 fp.flowRight()、fp.prop() 和 fp.first() 获取第一个 car 的 name

> 先定义获取第一条数据的函数，再定义获取某个对象中的 name 属性的函数，再用 fp.flowRight 组合函数

```
const getFirstName = fp.flowRight(fp.prop("name"), fp.first)
console.log(getFirstName(cars)) // Ferrari FF
```

#### 练习3：使用帮助函数 _average 重构 averageDollarValue，使用函数组合的方式实现

```
let _average = function(xs){
    return fp.reduce(fp.add, 0, xs) / xs.length
}
```

> 先定义获取某个对象中的 dollar_value 属性的函数，将该函数作为 fp.map 的数组元素处理函数，再用 fp.flowRight 组合函数

```
let averageDollarValue = fp.flowRight(_average, fp.map('dollar_value'));
console.log(averageDollarValue(cars));  //790700
```

#### 练习4：使用 flowRight 写一个 sanitizeNames() 函数，返回一个下划线连续的小写字符串，把数组中的 name 转换为这种形式，例如：sanitizeNames(["Hello World"]) => ["hello_world"]

```
let _underscore = fp.replace(/\W+/g, '_') // 无须改动，并在 sanitizeNames 中使用它
```

> 先定义获取某个对象中的 name 属性的函数，再定义转化为小写的函数，再将空格和下划线替换，,再用 fp.flowRight 组合函数

```
let sanitizeNames = fp.flowRight(
  fp.map(_underscore),
  fp.map(fp.toLower),
  fp.map((car) => car.name)
);
console.log(sanitizeNames(CARS)) 
// [
//  'ferrari_ff',       
//  'spyker_c12_zagato',
//  'jaguar_xkr_s',
//  'audi_r8',
//  'aston_martin_one_77',
//  'pagani_huayra'
// ]
```

------

### 三、基于下面提供的代码，完成后续的四个练习

```
// support.js
class Container {
    static of(value){
        return new Container(value)
    }
    constructor(value){
        this._value = value
    }
    map(fn){
        return Container.of(fn(this._value))
    }
}

class Maybe {
    static of(x){
        return new Maybe(x)
    }
    isNothing(){
        return this._value === null || this._value === undefined
    }
    constructor(x){
        this._value = x
    }
    map(fn){
        return this.isNothing() ? this : Maybe.of(fn(this._value))
    }
}
module.exports = { Maybe, Container }
```

#### 练习1：使用 fp.add(x, y) 和 fp.map(f,x) 创建一个能让 functor 里的值增加的函数 ex1

```
const fp = require('lodash/fp')
const {Maybe, Container} = require('./support')
let maybe = Maybe.of([5,6,1])
let ex1 = () => {
    // 你需要实现的函数。。。
}
```

> 函子对象的 map 方法可以运行一个函数对值进行处理，函数的参数为传入 of 方法的参数；接着对传入的整个数组进行遍历，并对每一项执行 fp.add 方法

```
let ex1 = maybe.map(i => fp.map(fp.add(1), i))
console.log(ex1) // [6, 7, 2]
```

#### 练习2：实现一个函数 ex2，能够使用 fp.first 获取列表的第一个元素

```
const fp = require('lodash/fp')
const {Maybe, Container} = require('./support')
let xs = Container.of(['do', 'ray', 'me', 'fa', 'so', 'la', 'ti', 'do'])
let ex2 = () => {
    // 你需要实现的函数。。。
}
```

> 解答如下：

```
let ex2 = xs.map(i => fp.first(i))
console.log(ex2)// do
```

#### 练习3：实现一个函数 ex3，使用 safeProp 和 fp.first 找到 user 的名字的首字母

```
const fp = require('lodash/fp')
const {Maybe, Container} = require('./support')
let safeProp = fp.curry(function(x, o){
    return Maybe.of(o[x])
})
let user = { id: 2, name: 'Albert' }
let ex3 = () => {
    // 你需要实现的函数。。。
}
```

> 调用 ex3 函数传入 user 对象，safeProp 是经过柯里化处理的，可以先传“属性”参数，后传“对象”参数。safeProp 函数处理后返回 user 的值，再调用fp.first 获取首字母

```
let ex3 = fp.flowRight(fp.map(i => fp.first(i)), safeProp('name'))
console.log(ex3(user)) // A
// 或者 return safeProp("name", user).map(x => fp.first(x));
```

#### 练习4：使用 Maybe 重写 ex4，不要有 if 语句

```
const fp = require('lodash/fp')
const {Maybe, Container} = require('./support')
let ex4 = function(n){
    if(n){
        return parseInt(n)
    }
}
```

> MayBe 函子用来处理外部的空值情况，防止空值的异常，拿到函子的值之后进行 parseInt 转化

```
let ex4 = n => Maybe.of(n).map(parseInt)
console.log(ex4('1')) // 1
```

------

### 四、手写实现 MyPromise 源码

要求：尽可能还原 Promise 中的每一个 API，并通过注释的方式描述思路和原理。【参考代码】

```javascript
// 初始状态
const PENDING = "pending";
// 完成状态
const FULFILLED = "fulfilled";
// 失败状态
const REJECTED = "rejected";

// 异步执行方法封装
function asyncExecFun(fn) {
  setTimeout(() => fn(), 0);
}

// 执行promise resolve功能
function resolvePromise(promise, res, resolve, reject) {
  // 返回同一个promise
  if (promise === res) {
    reject(new TypeError("Chaining cycle detected for promise #<MyPromise>"));
    return;
  }
  // promise结果
  if (res instanceof MyPromise) {
    res.then(resolve, reject);
  } else {
    // 非promise结果
    resolve(res);
  }
}

/**
 * 1. 是个构造函数
 * 2. 传入一个可执行函数 函数的入参第一个为 fullFill函数 第二个为 reject函数；  函数立即执行，  参数函数异步执行
 * 3. 状态一旦更改就不可以变更  只能 pending => fulfilled 或者  pending => rejected
 * 4. then 的时候要处理入参的情况 successCallback 和failCallback 均可能为非函数
 *      默认的 failCallback 一定要将异常抛出， 这样下一个promise便可将其捕获 异常冒泡的目的
 * 5. then 中执行回调的时候要捕获异常 将其传给下一个promise
 *    如果promise状态未变更 则将回调方法添加到对应队列中
 *    如果promise状态已经变更 需要异步处理成功或者失败回调
 *    因为可能出现 回调结果和当前then返回的Promise一致 从而导致死循环问题
 * 6. catch只是then的一种特殊的写法 方便理解和使用
 * 7. finally 特点 1. 不过resolve或者reject都会执行
 *                2. 回调没有参数
 *                3. 返回一个Promise 且值可以穿透到下一个then或者catch
 * 8. Promise.resolve, Promise.reject 根据其参数返回对应的值 或者状态的Promise即可
 * 9. Proise.all 特点  1. 返回一个Promise
 *                    2. 入参是数组 resolve的情况下出参也是数组 且结果顺序和调用顺序一致
 *                    3. 所有的值或者promise都完成才能resolve 所有要计数
 *                    4. 只要有一个为reject 返回的Promise便reject
 * 10. Proise.race 特点 1. 返回一个Promise
 *                    2. 入参是数组 那么出参根据第一个成功或者失败的参数来确定
 *                    3. 只要有一个resolve 或者reject 便更改返回Promise的状态
 *
 *
 */

class MyPromise {
  status = PENDING;
  value = undefined;
  reason = undefined;
  successCallbacks = [];
  failCallbacks = [];
  constructor(exector) {
    // 立即执行传入参数
    // 参数直接写为 this.resolve  会导致函数内 this指向会发生改变
    // 异步执行状态变更
    // 捕获执行器的异常
    try {
        exector(
          (value) => asyncExecFun(() => this.resolve(value)),
          (reason) => asyncExecFun(() => this.reject(reason))
        );
    } catch (e) {
        this.reject(e)
    }
  }

  resolve(value) {
    // 如果状态已经变更则直接返回
    if (this.status !== PENDING) return;
    this.value = value;
    this.status = FULFILLED;
    // 执行所有成功回调
    while (this.successCallbacks.length) this.successCallbacks.shift()();
  }

  reject(reason) {
    // 如果状态已经变更则直接返回
    if (this.status !== PENDING) return;
    this.reason = reason;
    this.status = REJECTED;
    if(!this.failCallbacks.length){
        throw '(in MyPromise)'
    }
    // 执行所有失败回调
    while (this.failCallbacks.length) this.failCallbacks.shift()();
  }
  then(successCallback, failCallback) {
    // 成功函数处理 忽略函数之外的其他值
    successCallback =
      typeof successCallback == "function" ? successCallback : (v) => v;
    // 失败函数处理 忽略函数之外的其他值 抛出异常  实现catch冒泡的关键
    failCallback =
      typeof failCallback == "function"
        ? failCallback
        : (reason) => {
            throw reason;
          };

    let promise = new MyPromise((resolve, reject) => {
      // 统一异常处理逻辑
      const execFun = (fn, val) => {
        try {
          let res = fn(val);
          resolvePromise(promise, res, resolve, reject);
        } catch (e) {
          reject(e);
        }
      };
      // 执行成功回调
      const execSuccessCallback = () => execFun(successCallback, this.value);
      // 执行失败回调
      const execFailCallback = () => execFun(failCallback, this.reason);
      // 同步将对应成功或者失败回调事件加入对应回调队列
      if (this.status === PENDING) {
        // 将成功回调加入队列
        this.successCallbacks.push(execSuccessCallback);
        // 讲失败回调加入队列
        this.failCallbacks.push(execFailCallback);
        return;
      }
      // 延迟执行 可以将函数执行结果和当前then 返回的promise 进行比较
      asyncExecFun(() => {
        // 如果已经 fulfilled 可直接调用成功回调方法
        if (this.status === FULFILLED) {
          execSuccessCallback();
          // 如果已经 rejected 可直接调用失败回调方法
        } else if (this.status === REJECTED) {
          execFailCallback();
        }
      });
    });
    return promise;
  }

  catch(failCallback) {
    return this.then(undefined, failCallback);
  }

  finally(callback) {
    return this.then(
      // 穿透正常值
      (value) => MyPromise.resolve(callback()).then(() => value),
      (reason) =>
        MyPromise.resolve(callback()).then(() => {
          // 穿透异常信息
          throw reason;
        })
    );
  }

  static resolve(value) {
    // 如果是MyPromise 实例 则直接返回
    if (value instanceof MyPromise) return value;
    // 如果是MyPromise 实例 否则返回一个 MyPromise实例
    return new MyPromise((resolve) => resolve(value));
  }
  static reject(reason) {
    // 如果是MyPromise 实例 则直接返回
    if (reason instanceof MyPromise) return reason;
    // 如果是MyPromise 实例 否则返回一个 MyPromise实例
    return new MyPromise((resolve, reject) => reject(reason));
  }

  // all方法
  static all(array) {
    // 存储结果
    let result = [];
    // 存储数组长度
    let len = array.length;
    // 创建返回MyPromise
    let promise = new MyPromise((resolve, reject) => {
      // 定义当前MyPromise的索引
      let index = 0;
      // 添加数据的公用方法
      function addData(key, data) {
        // 赋值
        result[key] = data;
        // 索引递增
        index++;
        // 全部执行完则resolve
        if (index == len) {
          resolve(result);
        }
      }
      // 按顺序变量数组
      for (let i = 0; i < len; i++) {
        let curr = array[i];
        // 如果是MyPromise则 按其规则处理
        if (curr instanceof MyPromise) {
          curr.then((value) => addData(i, value), reject);
        } else {
          // 非MyPromise直接赋值
          addData(i, curr);
        }
      }
    });
    // 返回新的MyPromise实例
    return promise;
  }
  // 只要有一个成功或者失败就返回
  static race(array) {
    let promise = new MyPromise((resolve, reject) => {
      for (let i = 0; i < array.length; i++) {
        let curr = array[i];
        // MyPromise实例 结果处理
        if (curr instanceof MyPromise) {
          curr.then(resolve, reject);
        } else {
          // 非MyPromise实例处理
          resolve(curr);
        }
      }
    });
    return promise;
  }
}

module.exports = MyPromise;
```

