## Vue.js 源码剖析-响应式原理、虚拟DOM、模板编译和组件化

### 一、简答题

#### 1、请简述 Vue 首次渲染的过程

+ 1、首先取出Vue的$mount,对$mount重写，对$mount增加新的功能。
+ 2、初始化了一些vue的静态方法，直接挂在vue的构造函数，初始化Vue.options的一些属性。
+ 3、注册_init()方法，初始化vm，
  + 注册了vm的$data/$set/$delete/$watch
  + 初始化事件相关的方法 $on/$once/$off/$emit
  + 初始化生命周期相关的混入方法 _update/$forceUpdate/$destroy
  + 混入 render $nextTick/_render

#### 2、请简述 Vue 响应式的原理
+ initData 数据的初始化
+ **observe() 响应式处理**
  + 创建observe对象
  + 对传入的对象做响应式处理，遍历对象的每一个属性，转换成setter/getter
  + 对数组做响应式处理
  + 在getter中依赖收集，记录watcher对象，发布通知
#### 3、请简述虚拟 DOM 中 Key 的作用和好处
在虚拟dom对比的时候，在patch函数中，调用patchVnode之前，会首先调用sameVnode()判断新老VNode是都是相同节点，sameVnode()中首先判断key是都相同。在进行updateChildren比较子节点的时候，如果没有key，会判定它会相同子节点，会去更新DOM操作，插入DOM操作。如果有key的话，只做比较，更新更新DOM，直接把VNode中不同的DOM插入到DOM中。

#### 4、请简述 Vue 中模板编译的过程
+ 将模板编译为渲染函数
  + 将模板解析成AST，用AST生成渲染函数
  + 遍历AST标记静态节点
  + 使用AST生成渲染函数
  