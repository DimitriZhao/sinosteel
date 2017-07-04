// applyMiddleware 为应用middleware中间件方法
// compose 一般用于将多个middleware中间件合并
// createStore 用于创建store状态管理器
import { applyMiddleware, compose, createStore } from 'redux'
// redux-thunk 帮助你统一了异步和同步 action 的调用方式，把异步过程放在 action 级别解决redux-thunk 帮助你统一了异步和同步 action 的调用方式，把异步过程放在 action 级别解决
import thunk from 'redux-thunk'
// 浏览器的History API模块
import { browserHistory } from 'react-router'
// 创建一个reducers，包含同步reducers和异步reducers
import makeRootReducer from './reducers'
// 获取url更新后回调方法，用于触发新store的注入
import { updateLocation } from './location'

import requesterMiddleware from 'UTILS/requesterMiddleware'

export default (initialState = {}) => {
  // 中间件方法扩展
  const middleware = [thunk, requesterMiddleware]
  // store增强器扩展
  const enhancers = []
  // 定义合并增强器方法用户合并enhancers
  let composeEnhancers = compose

  // 在开发环境并且开启devtools的条件下，替换成devtools的增强器扩展
  if (__DEV__) {
    const composeWithDevToolsExtension = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    if (typeof composeWithDevToolsExtension === 'function') {
      composeEnhancers = composeWithDevToolsExtension
    }
  }

  // 初始化store状态管理器
  const store = createStore(
    makeRootReducer(),
    initialState,
    composeEnhancers(
      applyMiddleware(...middleware),
      ...enhancers
    )
  )

  // 定义一个异步的 reducuers容器
  store.asyncReducers = {}
  // 取消订阅，可调用 store.unsubscribeHistory()，浏览器 History 监听url变化，实时更新store
  store.unsubscribeHistory = browserHistory.listen(updateLocation(store))

  // 模块热替换下，store替换合并异步reducers后的新reducers
  if (module.hot) {
    module.hot.accept('./reducers', () => {
      const reducers = require('./reducers').default
      store.replaceReducer(reducers(store.asyncReducers))
    })
  }

  return store
}
