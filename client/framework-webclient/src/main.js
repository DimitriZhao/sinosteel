import React from 'react'
import ReactDOM from 'react-dom'
// createStore创建状态管理树
import createStore from 'STORE/createStore'
// 应用容器模块
import AppContainer from 'CONTAINERS/AppContainer'

import {setStore} from 'STORE/globalStore'

// 创建初始化状态容器，指向一个window全局变量
const initialState = window.___INITIAL_STATE__
// 创建一个全局的store状态管理器
const store = createStore(initialState)

// 获取渲染的根节点
const MOUNT_NODE = document.getElementById('root')

setStore(store);

// 定义一个渲染方法
let render = () => {
  // 将store方法注入路由器，用于管理state状态树，并获取该路由
  const routes = require('ROUTES').default(store)
  // 在根节点渲染页面
  ReactDOM.render(
    <AppContainer store={store} routes={routes} />,
    MOUNT_NODE
  )
}

// 在开发模式下
if (__DEV__) {
  // 判断是否模块热加载
  if (module.hot) {
    // 定义开发环境下渲染方法
    const renderApp = render
    // 定义错误日志框渲染方法
    const renderError = (error) => {
      const RedBox = require('redbox-react').default
      ReactDOM.render(<RedBox error={error} />, MOUNT_NODE)
    }

    // 用 try/catch 包裹render方法，以切换渲染内容，发生错误时，渲染错误日志页面
    render = () => {
      try {
        renderApp()
      } catch (error) {
        renderError(error)
      }
    }

    // 设置模块热替换方法
    module.hot.accept('ROUTES', () =>
      setImmediate(() => {
        ReactDOM.unmountComponentAtNode(MOUNT_NODE)
        render()
      })
    )
  }
}

// ie兼容 startWith bug
if (typeof String.prototype.startsWith != 'function') {  
  String.prototype.startsWith = function (prefix){  
    return this.slice(0, prefix.length) === prefix
  }  
}  

// 开始正式渲染
render()
