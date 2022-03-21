// pages/paradise/life/meal/meal-form.js
import {
  createMeal
} from '../../../api/meal'

import { uploadByPath, test } from '../../../../utils/upload'
// import { uploadFile } from '../../../../utils/fileUpload'
var simpleUpload = require('../../../../utils/fileUpload');

// // 新建页面时 默认引入
// const app = getApp()
// // 初始化一个的request() 实例
// const request = app.cloudRequest()
// const bucket = 'paradise-1256237186'
// const region = 'ap-nanjing'
// // const COS = require('cos-wx-sdk-v5')
// const COS = require("../../../../lib/cos-wx-sdk-v5")
// var cos = new COS({
//   // 必选参数
//   getAuthorization: function (options, callback) {
//     // 服务端 JS 和 PHP 例子：https://github.com/tencentyun/cos-js-sdk-v5/blob/master/server/
//     // 服务端其他语言参考 COS STS SDK ：https://github.com/tencentyun/qcloud-cos-sts-sdk
//     // STS 详细文档指引看：https://cloud.tencent.com/document/product/436/14048
//     request.getRequest('/mp/minio/credential').then(res => {
//       var data = res.data
//       console.log(data)
//       var credentials = data && data.credentials
//       console.log(credentials)
//       if (!data || !credentials) return console.error('credentials invalid')
//       callback({
//         TmpSecretId: credentials.tmpSecretId,
//         TmpSecretKey: credentials.tmpSecretKey,
//         SecurityToken: credentials.sessionToken,
//         // 建议返回服务器时间作为签名的开始时间，避免用户浏览器本地时间偏差过大导致签名错误
//         StartTime: data.startTime, // 时间戳，单位秒，如：1580000000
//         ExpiredTime: data.expiredTime // 时间戳，单位秒，如：1580000900
//       })
//     })
//   }
// })

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

  test(){
    test()
  },

  testNoSdk(){
    simpleUpload()
  },

  submit() {
    let data = {
      "what": this.data.what,
      "place": this.data.place,
      "cost": this.data.cost,
      "date": this.data.date + " 00:00:00",
      "type": this.data.type,
      "payType": this.data.payType,
      "remark": this.data.remark
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
  // upload(filePath, key, callback, statusCallback) {
  //   cos.postObject({
  //     Bucket: bucket,
  //     /* 必须 */
  //     Region: region,
  //     /* 存储桶所在地域，必须字段 */
  //     Key: key,
  //     /* 必须 */
  //     StorageClass: 'STANDARD',
  //     FilePath: filePath,
  //     // Body: fileObject, // 上传文件对象
  //     onProgress: function (progressData) {
  //       console.log(JSON.stringify(progressData))
  //       statusCallback(progressData)
  //     }
  //   }, function (err, data) {
  //     if (err) {
  //       console.log(err)
  //     }
  //     console.log(err || data)
  //     if (data) {
  //       callback(data.Location)
  //     }
  //   })
  // },

  afterRead(event) {
    console.log(event)
    const array = event.detail.file;
    console.log(array)
    // 当设置 mutiple 为 true 时, file 为数组格式，否则为对象格式
    for (let index = 0; index < array.length; index++) {
      const file = array[index];
      var filePath = file.url;
      var filename = filePath.substr(filePath.lastIndexOf('/') + 1);
      console.log(filename)
      uploadByPath(filePath, filename,
        function (url) {
          console.log(url)
          // 上传完成需要更新 fileList
          const {
            fileList = []
          } = this.data;
          fileList.push({
            ...file,
            url: res.data
          });
          this.setData({
            fileList
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