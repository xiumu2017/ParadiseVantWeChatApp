// pages/paradise/life/meal/meal-form.js
import {
  createMeal
} from '../../../api/meal'

var simpleUpload = require('../../../../utils/fileUpload');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    show: false,
    minDate: 0,
    maxDate: 0,
    what: "",
    place: "",
    cost: "0",
    date: "",
    type: "",
    payType: "",
    remark: "",
    date: "",
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
    });
  },
  onTypeConfirm(event) {
    var val = event.detail
    this.setData({
      showPicker: false,
      typeText: val.value,
      type: val.index,
    });
  },
  onPayTypeConfirm(event) {
    var val = event.detail
    this.setData({
      showPayTypePicker: false,
      payTypeText: val.value,
      payType: val.index,
    });
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
    createMeal(data).then(res => {
      console.log(res);
      if (res.code === 200) {
        wx.showToast({
          title: res.message,
        })
      } else {
        wx.showToast({
          title: res.message,
        })
      }
    })
  },

  resolveFile(){
    let list = this.data.fileList
    console.log(list)
    return list.map(function(obj,index){return obj.url}).join(',')
  },

  afterRead(event) {
    let this_ = this;
    console.log(event)
    const array = event.detail.file;
    console.log(array)
    // 当设置 mutiple 为 true 时, file 为数组格式，否则为对象格式
    for (let index = 0; index < array.length; index++) {
      const file = array[index];
      var filePath = file.url;
      simpleUpload(filePath,
        function (url) {
          // 上传完成需要更新 fileList
          console.log('url', url);
          let tempFileList = this_.data.fileList;
          tempFileList.push({
            'url': url
          });
          this_.setData({
            'fileList': tempFileList
          });
        },
        function (progressData) {
          console.log("progressData", progressData);
          if (progressData.percent < 1) {
            file.status = "uploading";
            file.message = "上传中...";
          }
          if (progressData.percent >= 1) {
            file.status = "done";
          }
        }
      )
    }
  },
  onDeleteFile(event) {
    console.log(event)
    let list = this.data.fileList
    list.splice(event.detail.index, 1)
    this.setData({
      'fileList': list
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