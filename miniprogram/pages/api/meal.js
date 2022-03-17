// 新建页面时 默认引入
const app = getApp()
// 初始化一个的request() 实例
const request = app.cloudRequest()

export function createMeal(data) {
  return request.postRequest('/mp/meal-record/create', data)
}