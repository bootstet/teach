const PENDING = 'pending';
const FULFILLED = 'fufilled';
const REJECTED = 'rejected';

class myPromise {
  constructor (executor) {
    try {
      executor(this.resolve, this.reject)
    } catch (e) {
      this.reject(e)
    }
  }
  // promise 状态
  status = PENDING;
  // 成功之后的值
  value = undefined;
  // 失败之后的原因
  reason = undefined;
  // 成功之后的回调
  successCallback = []
  failCallback = []
  resolve = value => {
    // 如果状态不是等待，组织往下进行
    if(this.status !== PENDING) return 
    // 将状态改为成功
    this.status = FULFILLED
    // 保存成功之后的值
    this.value = value
    // 判断成功回调是否存在
    // this.successCallback && this.successCallback(this.value)
    while(this.successCallback.length) this.successCallback.shift()()
  }
  reject = reason => {
    // 如果状态不是等待，组织往下进行
    if(this.status !== PENDING) return 
    // 将状态改为失败 
    this.status = REJECTED
    // 保存失败的原因
    this.reason = reason
    // 判断失败回调是否存在 如果存在 调用
    // this.failCallback && this.failCallback(this.values)
    while(this.failCallback.length) this.failCallback.shift()()
  }
  then (successCallback, failCallback) {
    let promise2  = new myPromise((resolve, reject) => {
      // 判断状态
      if (this.status === FULFILLED) {
        setTimeout(() => {
          try {
            let x = successCallback(this.value)
            // 判断 x 的值是普通值还是promise对象
            // 如果是普通值  直接调用resolve
            // 如果是promise对象  查看promise对象返回的结果
            // 在根据promise对象返回呢的结果 决定调用resolve 还是调用reject
            // resolve(x); 
            resolvePromise(promise2, x, resolve, reject)
          } catch {
            reject(e)
          }
          
        }, 0);
        
      } else if(this.status === REJECTED) {
        setTimeout(() => {
          try {
            let x = failCallback(this.reason)
            // 判断 x 的值是普通值还是promise对象
            // 如果是普通值  直接调用resolve
            // 如果是promise对象  查看promise对象返回的结果
            // 在根据promise对象返回呢的结果 决定调用resolve 还是调用reject
            // resolve(x); 
            resolvePromise(promise2, x, resolve, reject)
          } catch {
            reject(e)
          }
          
        }, 0);
        
      } else {
        // 等待状态
        // 将成功状态和失败状态存储下来
        // this.successCallback = successCallback
        // this.failCallback = failCallback

        this.successCallback.push(()=>{
          // successCallback()
          setTimeout(() => {
            try {
              let x = successCallback(this.value)
              // 判断 x 的值是普通值还是promise对象
              // 如果是普通值  直接调用resolve
              // 如果是promise对象  查看promise对象返回的结果
              // 在根据promise对象返回呢的结果 决定调用resolve 还是调用reject
              // resolve(x); 
              resolvePromise(promise2, x, resolve, reject)
            } catch {
              reject(e)
            }
            
          }, 0);
        } )
        this.failCallback.push(() => {
          // failCallback()
          setTimeout(() => {
            try {
              let x = failCallback(this.reason)

              console.log(aaa)
              // 判断 x 的值是普通值还是promise对象
              // 如果是普通值  直接调用resolve
              // 如果是promise对象  查看promise对象返回的结果
              // 在根据promise对象返回呢的结果 决定调用resolve 还是调用reject
              // resolve(x); 
              resolvePromise(promise2, x, resolve, reject)
            } catch {
              reject(e)
            }
            
          }, 0);
        })
      }
    })
    return promise2
  }
}

function resolvePromise (promise2, x, resolve, reject) {
  if (promise2 === x) {
    console.log(new TypeError('charereo  dfasd '))
    return  reject(new TypeError('charereo  dfasd '))
    
  }
  if (x instanceof myPromise) {
    // promise
    // x.then((value) => resolve(value), (reason) => reject(reason))
    x.then(resolve, reject)
  } else {
    // 普通值
    resolve(x)
  }
}

module.exports = myPromise