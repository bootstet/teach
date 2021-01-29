import React, { Component } from 'react'
import Apple from './components/apple'
import './App.less';
import { inject, observer } from 'mobx-react';

@inject('counter')
@observer
class App extends Component {
  render() {
    const { counter } = this.props
    const { appleList, pickApple, eatList} = counter
    return (
      <div className="App">
        <div className="container">
          <header className="header">苹果篮子</header>
          <div className="conent">
            <div className="left">
              <div className="title">当前</div>
              <div>{appleList.length}个苹果，{appleList.reduce((a,b) => a + b.weight, 0)}克</div>
            </div>
            <div className="right">
              <div className="title">已吃掉</div>
              <div>{eatList.length}个苹果，{eatList.reduce((total, item) => total + item.weight, 0)}克</div>
            </div>
          </div>
          <Apple/>
          <div className="footer">
            <button onClick={() => pickApple()}>摘苹果</button>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
