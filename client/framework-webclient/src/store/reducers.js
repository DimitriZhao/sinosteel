// 获取合并reducers的方法
import { combineReducers } from 'redux'
// location 变化触发的 reducer
import locationReducer from './location'

// 获取合并后的 reducers，该方法接收一个异步 reducers 数组，可视为reducer生成器
export const makeRootReducer = (asyncReducers) => {
  return combineReducers({
    location: locationReducer,
    ...asyncReducers
  })
}

// 该方法注入一个异步reducers，若内已包含 ，则不接受注入，可视为reducer注入器
export const injectReducer = (store, { key, reducer }) => {
  if (Object.hasOwnProperty.call(store.asyncReducers, key))  	{
    return
  }
  store.asyncReducers[key] = reducer
  store.replaceReducer(makeRootReducer(store.asyncReducers))
}

// 默认导出reducers生成器
export default makeRootReducer
