// const app = getApp()

class request {
  constructor() {
    this._envId = 'paradise-env-1go9lkkpdd72f03e'
    this._wxService = 'paradise-app'
    this._token = wx.getStorageSync('token')
  }

  /**
   * GET类型的网络请求
   */
  getRequest(url, params) {
    if (params) {
      url = url + '?' + Object.keys(params).map(key => key + "=" + params[key]).join("&")
    }
    return this.requestAll(url, {}, 'GET')
  }

  /**
   * DELETE类型的网络请求
   */
  deleteRequest(url, data) {
    return this.requestAll(url, data, 'DELETE')
  }

  /**
   * PUT类型的网络请求
   */
  putRequest(url, data) {
    return this.requestAll(url, data, 'PUT')
  }

  /**
   * POST类型的网络请求
   */
  postRequest(url, data) {
    return this.requestAll(url, data, 'POST')
  }

  /**
   * 网络请求
   */
  requestAll(url, data, method) {
    return new Promise((resolve, reject) => {
      wx.cloud.callContainer({
        "config": {
          "env": this._envId
        },
        "path": url,
        "header": {
          "X-WX-SERVICE": this._wxService,
          "content-type": "application/json",
          "Authorization": "Bearer " + this._token
        },
        "method": method,
        data: data,
        success: (res => {
          if (res.statusCode === 200) {
            //200: 服务端业务处理正常结束
            resolve(res.data)
          }else if (res.statusCode == 401){
            wx.showToast({
              title: 'title',
            })
          } else {
            //其它错误，提示用户错误信息
            reject(res.data)
          }
        }),
        fail: (res => {
          reject(res)
        })
      })
    })
  }
}

export default request