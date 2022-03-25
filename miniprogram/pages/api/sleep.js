// 新建页面时 默认引入
const app = getApp()
// 初始化一个的request() 实例
const request = app.cloudRequest()

export function fetch(params) {
  return request.getRequest('/mp/sleep-record/s', params)
}

export function create(data) {
  return request.postRequest('/mp/sleep-record/create', data)
}