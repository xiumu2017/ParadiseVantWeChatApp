// pages/myDay.js
import {
  dayBing
} from '../../api/home'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    token: '',
    bing: {}
  },

  getBing: function (token) {
    dayBing({
      'pageNum': 1,
      'pageSize': 1
    }).then(res => {
      this.setData({
        bing: res.data.data.list[0]
      })
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let this_ = this;
    wx.getStorage({
      'key': 'token',
      success(res) {
        this_.setData({
          token: res.data
        })
        this_.getBing("Bearer " + res.data)
      }
    })

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {


  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    if (typeof this.getTabBar === 'function' && this.getTabBar()) {
      this.getTabBar().init()
    }
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})