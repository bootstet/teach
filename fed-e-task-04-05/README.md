### 
React + Redux + Ant Design + TypeScript 实战 作业地址：

###
请完成下面几道简答题。

#### 1.通过该项目，请简要说明 typescript 比 javascript 的优势在哪？
 + 1 能在开发阶段就检测错误并抛出错误，当多人开发时，类型的安全监测可提高代码协作
 + 2 支持可选参数
 + 3 支持静态类型，interface在书写代码的时候，就会有准确的只能提示，提高编码效率。在开发的时候
 提高代码的健壮性，使得代码质量更好，更清晰


#### 2.请简述一下支付流程
+ 1 点击支付，前端会向后端请求接口，后端会返回一个带有支付地址的响应。
+ 2 成功拿到接口响应后，跳转至支付页面，支付之后，支付宝会重定向提前设置好的页面，用来告诉用户支付
是成功还是失败。
+ 3 同时支付宝会向服务端发送一个post请求，请求地址提前设置好的，用来告诉我们的服务端我们的支付是成功的还是失败的，
服务端去创建相应的订单。

#### 3.react-redux 的主要作用是什么，常用的 api 有哪些，什么作用？
+ 1 用来管理项目的状态，管理数据，解决组件与组件之间的通信问题。
+ 2 常用api
  ```js
    // 创建状态容器
    const store = Redux.createStore()
    // 获取状态
    store.getState()
    // 订阅状态
    store.subScribe()
    // 触发action
    store.dispatch({type: 'xxx'})

    // react hook
    // extract data from the Redux store state
    const result: any = useSelector(selectore: Function, equalityFn?: Funcion)
    // use dispatch to dispatch actions 
    const dispatch = useDispatch()

  ```

#### 4.redux 中的异步如何处理？
 + 使用中间件 eg: redux-saga 配合 genetator函数 来处理异步
 ```ts
    function* example() {
      yield call({delay, 1000})
      // todo something
      function () {
        //xxxx
      }
      yield ...
    }

 ```

 