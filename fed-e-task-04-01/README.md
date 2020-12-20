## 1. 请简述 React 16 版本中初始渲染的流程

+ 1、首先babel编译为createElement方法的调用，在调用createElement方法时，传入元素的类型，元素的属性，以及元素的子元素，createElement方法时，返回构建好的VirtualDom对象。
  createElement方法，会将无效的元素删除，会将文本节点进行处理，添加上相应的type，context值，转换virtualDom对象。
+ 2、将virtualDOM添加到Fiber中
+ 3、调用render方法将 Fiber对象中的feiber转换为真实的DOM对象
  - 在进行 virtual DOM转换之前还需要确定Virtual DOM 的类 Component VS Native Element
  - 创建文本节点和元素节点，为元素节点添加属性
  - 渲染组件
## 2. 为什么 React 16 版本中 render阶段放弃了使用递归
 + 使用递归，一旦任务开始进行就无法中断，如果应用中组件数量庞大，主线程被长期占用，直到整颗 VirtualDOM 树比对更新完成之后主线程才能被释放，主线程才能执行其他任务。这就会导致一些用户交互，动画等任务无法立即执行，页面就会产生卡顿，非常影响用户体验。
 + 所以React16后，利用浏览器空闲时间执行任务，拒绝长时间占用主线程。
 + 放弃递归只采用循环，因为循环可以被中断
 + 
## 3. 请简述 React 16 版本中 commit 阶段的三个子阶段分别做了什么事情
 + before Mutation 阶段 (执行 DOM 操作前的一些操作) eg：调用 getSnapShotBeforeUpdate 生命周期函数
 + mutation 阶段 （执行DOM操作）
 + layout 阶段 （执行 DOM 操作后的一些操作和声明周期函数的调用） 

## 4. 请简述 workInProgress Fiber 树存在的意义是什么

 + 构建root fiber，以及每一个元素的fiber对象
 + 给root 对象添加finishedWord属性，存储render阶段的工作成果（待提交的fiber对象）
 + 创建 workInProgress Fiber树中的 rootFiber




<!-- ##### react 模块一：
+ 夯实 JSX 语法，提高组件及表单操作的使用熟练度
+ 掌握VirtualDOM 使用，理解为什么使用虚拟DOM
+ 理解fiber 算法实现原理，实现不同组件的渲染操作
+ 阅读源码，掌握调试技巧及初始化流程
+ 阅读源码解析 workLoopSync 执行流程
+ 阅读源码拆解commit不同阶段 -->