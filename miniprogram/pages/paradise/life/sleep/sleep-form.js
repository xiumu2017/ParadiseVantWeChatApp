// pages/paradise/life/sleep/sleep-form.js
import {
  create
} from '../../../api/sleep'

Page({

  /**
   * 页面的初始数据
   */
  data: {
    show: false,
    showPicker: false,
    minDate: 0,
    maxDate: 0,
    today: 0,
    timeIndex: 0,
    date: "",
    bedTime: "",
    sleepTime: "",
    wakeTime: "",
    upTime: "",
    sleepQuality: 0,
    memory: "",
    lateReason: "/",
    bestTime: "/",
    remark: "",
  },
  onDateDisplay() {
    this.setData({
      show: true
    });
  },
  onDateClose(index) {
    this.setData({
      show: false
    });
  },
  onDateConfirm(event) {
    var val = this.formatDate(event.detail)
    this.setData({
      show: false,
      date: val,
    });
  },
  showPickerPopup(event) {
    console.log(event)
    this.setData({
      showPicker: true
    })
    let index = event.target.dataset.index
    this.setData({
      timeIndex: index
    })

  },
  onConfirm(event) {
    var val = event.detail
    console.log(val)
    const index = this.data.timeIndex
    switch (index) {
      case 1:
        this.setData({
          bedTime: val
        })
        break;
      case 2:
        this.setData({
          sleepTime: val
        })
        break;
      case 3:
        this.setData({
          wakeTime: val
        })
        break;
      case 4:
        this.setData({
          upTime: val
        })
        break;
    }
    this.setData({
      showPicker: false
    })
  },
  onCancel() {
    this.setData({
      showPicker: false
    })
  },

  formatDate(date) {
    date = new Date(date);
    return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
  },
  submit() {
    let data = {
      "what": this.data.what,
      "place": this.data.place,
      "cost": this.data.cost,
      "date": this.data.date + " 00:00:00",
      "type": this.data.type,
      "payType": this.data.payType,
      "remark": this.data.remark,
      "photos": this.resolveFile()
    };
    console.log(data)
    create(data).then(res => {
      console.log(res);
      if (res.code === 200) {
        wx.showToast({
          title: res.message,
        })
        // 回到哪个页面呢？
      } else {
        wx.showToast({
          title: res.message,
        })
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const now = new Date();
    const year = now.getFullYear();
    const month = now.getMonth();
    const day = now.getDate();
    this.setData({
      minDate: new Date(year, month, day - 7).getTime(),
      maxDate: new Date(year, month, day + 7).getTime(),
      date: this.formatDate(now),
      today: now.getTime()
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