// buttonBehavior：封装好的button相关的js代码，有点击事件，可放功能事件等）
// var buttonBehavior = require('../common/button_behaior.js');
Component({
  // behaviors: [buttonBehavior],
  /**
   * 组件的属性列表
   */
  properties: {
    //可移动的方向
    direction: {
      type: String,
      value: 'all'
    },
    //按钮的icon
    button_img: {
      type: String,
      value: '../../images/write.svg'
    },
    //按钮图片的宽度，单位rpx
    button_img_width: {
      type: Number,
      value: 80
    },
    //按钮图片的高度，单位rpx
    button_img_height: {
      type: Number,
      value: 80
    },
    //移动按钮的初始x轴坐标
    btn_x: {
      type: String,
      value: '620rpx'
    },
    //移动按钮的初始y轴坐标
    btn_y: {
      type: String,
      value: '1250rpx'
    }
  },
  lifetimes: {
    created: function () {
      //获取设备宽度
      wx.getSystemInfo({
        success: (result) => {
          this.data.screenWidth = result.screenWidth;
          this.data.btn_origin_x = this.data.btn_x;
        },
      })
    }
  },
  /**
   * 组件的初始数据
   */
  data: {
    //移动按钮的初始x轴坐标
    btn_origin_x: 0,
    //屏幕的宽度，用于计算移动结束后，按钮是往左还是往右悬浮
    screenWidth: 375
  },

  /**
   * 组件的方法列表
   */
  methods: {
    touchEnd(e) {
      this.createSelectorQuery().select('.movable_view').boundingClientRect((res) => {
        if (res.left < this.data.screenWidth / 2) {
          return this.setData({
            btn_x: '0px',
            btn_y: res.top + 'px'
          })
        }
        this.setData({
          btn_x: this.data.btn_origin_x,
          btn_y: res.top + 'px'
        });
      }).exec();
    }
  }
})