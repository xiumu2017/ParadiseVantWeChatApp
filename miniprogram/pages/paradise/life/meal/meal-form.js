// pages/paradise/life/meal/meal-form.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    minDate: new Date(2021, 0, 1),
    maxDate: new Date(2021, 5, 1),
    formData: {
      what: "",
      place: "",
      cost: "0",
      date: "",
      type: "",
      payType: "",
      remark: "",
    },
    date: "",
    type: "",
    payType: "",
    showCalendar: false,
    showPicker: false,
    showPayTypePicker: false,
    typeArr: [],
    payTypeArr: [],
    fileList: [],
    photos: [],
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