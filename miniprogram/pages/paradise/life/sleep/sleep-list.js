// pages/paradise/life/sleep/sleep-list.js
var {
  fetch
} = require("../../../api/sleep")
Page({

  /**
   * 页面的初始数据
   */
  data: {
    weeks: ["Sun🔆", "Mon💥", "Tue💪", "Wed🙃", "Thu🤬", "Fri👏", "Sat🎉"],
    sleepData: [],
  },
  openForm() {
    wx.navigateTo({
      url: '/pages/paradise/life/sleep/sleep-form',
    })
  },
  formatTime() {
    const now = new Date();
    return (
      `${now.getFullYear()}/
        ${now.getMonth() + 1}/
        ${now.getDate()} 
        ${now.getHours() < 10 ? "0" + now.getHours() : now.getHours()}:
        ${now.getMinutes() < 10 ? "0" + now.getMinutes() : now.getMinutes()}:
        ${now.getSeconds() < 10 ? "0" + now.getSeconds() : now.getSeconds()} 
        ` + this.weeks[now.getDay()]
    );
  },
  fetchData() {
    let this_ = this
    fetch({
      pageNum: 1,
      pageSize: 7
    }).then((res) => {
      if (res.code === 200) {
        let sleepData = res.data.list;
        sleepData.forEach((item) => {
          // iOS 下这种获取 date 的方法不生效
          // item.title = this.weeks[new Date(item.date).getDay()];
          let d = new Date(item.date.replace(/-/g, "/")).getDay();
          item.title = this.data.weeks[d];
          item.date = this.formatDate(item.date);
          item.st = this.formatDateTime(item.sleepTime);
          item.et = this.formatDateTime(item.upTime);
        });
        console.log("sleepData", sleepData);
        this.setData({
          sleepData: sleepData
        })
      }
    });
  },
  formatDate(date) {
    return date.split(" ")[0];
  },
  formatDateTime(date) {
    if (!date) {
      return "";
    }
    return date.split(" ")[1].replace(":00", "");
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.fetchData()
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