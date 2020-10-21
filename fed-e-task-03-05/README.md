## 1 Vue 3.0 性能提升主要是通过哪几方面体现的？
	通过proxy对象重写的相应式系统，优化编译的过程和虚拟提升了渲染性能，优化源码的体积。
	+ 响应式系统升级，使用proxy对象，可监听数组中length和对象的删除
	+ 编译优化 vue.js 3.0中编辑和提升所有的静态根节点，diff的时候只需要对比动态节点内容
	+ 优化打包体积 3.0移除了不常用的API inline-template、filter

## 2 Vue 3.0 所采用的 Composition Api 与 Vue 2.x使用的Options Api 有什么区别？
+ Options API
	+ 包好一个描述组件选项（data、 methods、props等）的对象
	+ Options API 开发复杂组件，同一个功能逻辑的代码被拆分到不同选项
	
+ Composition API
	+ vue.js3.0 新增的一组 API
	+ 一组基于函数的API
	+ 可以更灵活的组织组件的逻辑
	https://github.com/vuejs/rfcs
	https://composition-api.vuejs.org

## 3 Proxy 相对于 Object.defineproperty 有哪些优点？
+ Proxy对象本身的性能比 defineproperty要好
+ Proxy对象拦截对象的访问，复制，删除等操作，不需要遍历，object.defineproperty监听不到属性的删除，也监听不到length的变化
+ 使用Proxy默认就可以监听动态添加的属性，数组length的操作

## 4 Vue 3.0 在编译方面有那些优化？
+ Vue.js 2.x 中通过编辑静态根节点，优化diff的过程
+ Vue.js 3.0 中编辑和提升所有的静态根节点，diff的时候只需要对比动态节点内容，vue3.0引入片段Fragments，不用放唯一根节点，可以放多个同级标签

## 5 Vue.js 3.0 相应式系统的实现原理？
+ 底层使用proxy代理对象监听属性，不需要遍历属性，转换为get和set
+ 多层属性嵌套，在访问属性过程中处理下一级属性
+ 默认监听动态添加的属性
+ 默认监听属性的删除操作
+ 默认监听数组索引和length属性
+ 可以作为单独的模块使用