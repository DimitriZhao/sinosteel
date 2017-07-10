// PropTypes props类型校验
import React, { Component, PropTypes } from 'react'
import { browserHistory, Router } from 'react-router'
// 通过 Provider 将store传递给组件
import { Provider } from 'react-redux'

class AppContainer extends Component {

  static propTypes = {
    routes : PropTypes.object.isRequired,
    store  : PropTypes.object.isRequired
  }

  // 组件在决定重新渲染（虚拟dom比对完毕生成最终的dom后）之前会调用该函数
  shouldComponentUpdate () {
    return false
  }

  render () {
  	// 通过传递的父元素属性获取 routes 和 store
    const { routes, store } = this.props

  	return (
    <Provider store={store}>
      <div className='wrap'>
        <Router history={browserHistory} children={routes} />
      </div>
    </Provider>
  )}

}

export default AppContainer
