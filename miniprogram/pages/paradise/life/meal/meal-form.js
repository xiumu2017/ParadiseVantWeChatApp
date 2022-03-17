// pages/paradise/life/meal/meal-form.js
import {
  createMeal
} from '../../../api/meal'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    show: false,
    minDate: new Date(2021, 0, 1),
    maxDate: new Date(2021, 5, 1),
    what: "",
    place: "",
    cost: "0",
    date: "",
    type: "",
    payType: "",
    remark: "",
    date: "",
    type: "",
    payType: "",
    showCalendar: false,
    showPicker: false,
    showPayTypePicker: false,
    typeText: '',
    payTypeText: '',
    typeArr: ['零食', '早餐', '午餐', '晚餐', '宵夜'],
    payTypeArr: ['微信支付', '支付宝支付', '现金支付', '银行卡', '其它', '老婆付钱'],
    fileList: [],
    photos: [],
  },
  onDateDisplay() {
    this.setData({
      show: true
    });
  },
  onTypeDisplay() {
    this.setData({
      showPicker: true
    });
  },
  onPayTypeDisplay() {
    this.setData({
      showPayTypePicker: true
    });
  },
  onDateClose(index) {
    this.setData({
      show: false
    });
  },
  onTypeClose(index) {
    this.setData({
      showPicker: false
    });
  },
  onPayTypeClose(index) {
    this.setData({
      showPayTypePicker: false
    });
  },
  onDateConfirm(event) {
    var val = this.formatDate(event.detail)
    this.setData({
      show: false,
      date: val,
      'formData.date': val,
    });
  },
  onTypeConfirm(event) {
    var val = event.detail
    this.setData({
      showPicker: false,
      typeText: val.value,
      'formData.type': val.index,
    });
  },
  onPayTypeConfirm(event) {
    var val = event.detail
    this.setData({
      showPayTypePicker: false,
      payTypeText: val.value,
      'formData.payType': val.index,
    });
  },

  formatDate(date) {
    date = new Date(date);
    return `${date.getFullYear()}/${date.getMonth() + 1}/${date.getDate()}`;
  },

  submit() {
    let data = this.data.formData;
    console.log(data)
    createMeal(data).then(res => {
      console.log(res);
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