//  1  创建store对象  存储默认状态0
//  2  将store对象放在一个全局的 组件可以够的到的地方
//  3  让组件获取store对象中的状态 并将状态显示在组件中  
import { observable, action, runInAction } from 'mobx'


class CounterStore {
  @observable appleList = [];
  @observable eatList = [];

  // 摘苹果
  @action.bound pickApple = () => {
    const apple = {
      name: this.appleList.length + this.eatList.length,
      weight: Math.ceil(Math.random()*10) + 200
    }
    runInAction(() => setTimeout(() => {
      this.appleList.push(apple)
    }, 300))
  }
  // 吃苹果
  @action.bound eatApple = (apple) => {
    this.eatList = this.eatList.concat(this.appleList.slice(apple, apple + 1))
    this.appleList.splice(apple, 1)

  }
}

const counter = new CounterStore()

export default counter;