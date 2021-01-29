import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'
import './index.less'

@inject('counter')
@observer
class Apple extends Component {
  render() {
    const { counter } = this.props
    const { appleList, eatApple} = counter
    return (
      <div className="container-list">
        {
          appleList && appleList.map((item, index) => (
            <div className="item" key={index}>
              <div>
                <span>红苹果-{item.name}号</span>
                <span>{item.weight}克</span>
              </div>
              <button onClick={() => eatApple(index)}>吃掉</button>
            </div>
          ))
        }
      </div>
    )
  }
}

export default Apple