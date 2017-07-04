// 该方法拦截 action，数据请求封装
import 'isomorphic-fetch'

export const BZ_REQUESTER = Symbol('BZ REQUESTER')

export default store => next => action => {

  const reqAPI = action[BZ_REQUESTER]

  // 非特定数据请求跳过
  if (typeof reqAPI === 'undefined') {
    return next(action)
  }

  // 从action内提取所需参数
  var { url, callback } = reqAPI
  return doRequest(url, callback)
  
}

const doRequest = (request, callback) => {
  return fetch(request).then(response => response.json().then(json => ({ json, response })))
    .then(({ json, response }) => {
      if (!response.ok) {
        return Promise.reject(json)
      }
      callback && callback(json)
      return json
  })
}