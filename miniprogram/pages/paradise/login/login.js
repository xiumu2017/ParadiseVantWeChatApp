// pages/paradise/login/login.js
import Toast from '../../../miniprogram_npm/@vant/weapp/toast/toast';
import {
  login
} from '../../api/home'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    icon: "closed-eye",
    passwordType: "password",

    username: "",
    password: "",

  },

  showPassword() {
    if (this.data.passwordType === "password") {
      this.setData({
        passwordType: ""
      })
      this.setData({
        icon: "eye-o"
      })
    } else {
      this.setData({
        passwordType: "password"
      });
    }
  },

  onSubmit() {
    if (!this.data.username) {
      Toast.fail('用户名不能为空！')
    }
    if (!this.data.password) {
      Toast.fail('请输入密码！')
    }
    login({
      'username': this.data.username,
      'password': this.data.password
    }).then(res => {
      console.log('login complete')
      console.log(res)
      wx.setStorageSync('token', res.data.token)
      wx.switchTab({
        url: '/pages/paradise/myDay/myDay',
      })
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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