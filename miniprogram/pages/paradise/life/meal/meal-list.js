// pages/paradise/life/meal-list.js
import {
  fetchMealList
} from '../../../api/home'
const typeArr = ["零食", "早饭", "午饭", "晚饭", "夜宵"]
const payTypeArr = ["微信支付", "支付宝支付", "现金", "银行卡", "其它","老婆付钱"]

Page({

  /**
   * 页面的初始数据
   */
  data: {
    showEmpty: true,
    mealData: [],
    imgParam: '?imageMogr2/quality/40',
    imgParam2: '?imageView2/1/w/432/h/576/q/40',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    fetchMealList({
      pageNum: 1,
      pageSize: 9
    }).then((res) => {
      console.debug('获取 meal-list')
      console.log(res)
      if (res.code === 200) {
        let mealDataArr = res.data.list;
        mealDataArr.forEach((item) => {
          item.title =
            this.formatDate(item.date) + " " + typeArr[item.type];
          item.payTypeStr = payTypeArr[item.payType];
          item.cost = item.cost / 100;
          item.photoArray = item.photos.split(",")
        });
        if (mealDataArr && mealDataArr.length > 0) {
          this.setData({
            'showEmpty': false
          })
          this.setData({
            'mealData': mealDataArr
          })
        }
      }
    });

  },
  formatDate(date) {
    return date.split(" ")[0];
  },
  openForm: function() {
    wx.navigateTo({
      url: '/pages/paradise/life/meal/meal-form',
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