// 新建页面时 默认引入
const app = getApp()
// 初始化一个的request() 实例
const request = app.cloudRequest()

export function dayBing(params) {
  return request.getRequest('/mp/bingImage/ss', params)
}

export function fetchMealList(params) {
  return request.getRequest('/mp/meal-record/s', params)
}

export function login(params) {
  url = '/mp/sso/doLogin'
  if (params) {
    url = url + '?' + Object.keys(params).map(key => key + "=" + params[key]).join("&")
  }
  return request.postRequest(url, {})
}