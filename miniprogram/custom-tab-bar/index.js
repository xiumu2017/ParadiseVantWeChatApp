Component({
  data: {
    selected: 0,
    color: "#7A7E83",
    selectedColor: "#3cc51f",
    list: [{
        "pagePath": "/pages/index/index",
        "iconPath": "../images/icon_component.png",
        "selectedIconPath": "../images/icon_component_HL.png",
        "text": "组件"
      },
      {
        "pagePath": "/pages/paradise/index/index",
        "iconPath": "../images/icon_API.png",
        "selectedIconPath": "../images/icon_API_HL.png",
        "text": "接口"
      }
    ]
  },
  attached() {},
  methods: {
    switchTab(e) {
      console.log(e)
      const data = e.currentTarget.dataset
      const url = data.path
      console.log(url)
      wx.switchTab({
        'url': url
      })
      this.setData({
        selected: data.index
      })
    }
  }
})