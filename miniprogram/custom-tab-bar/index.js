Component({
  data: {
    active: '',
    selected: 0,
    color: "#7A7E83",
    selectedColor: "#3cc51f",
    list: [{
        icon: 'home-o',
        text: '首页',
        url: '/pages/paradise/myDay/myDay'
      },
      {
        icon: 'apps-o',
        text: '菜单',
        url: '/pages/index/index'
      },
      {
        icon: 'apps-o',
        text: '记录',
        url: ''
      },
      {
        icon: 'shopping-cart-o',
        text: '购物车',
        url: '/pages/paradise/index/index'
      },
      {
        icon: 'manager-o',
        text: '我的',
        url: '/pages/paradise/life/index'
      }
    ],
    show: false,
    actions: [{
        name: '拾光记忆',
      },
      {
        name: '南柯一梦',
      },
      {
        name: '大快朵颐'
      }
    ]
  },
  attached() {},


  methods: {
    onCancel() {
      this.setData({
        show: false
      })
    },
    onClose() {
      this.setData({
        show: false
      })
    },

    onSelect(event) {
      wx.showToast({
        title: `点击标签 ${event.detail.name}`,
        icon: 'none',
      });
      wx.navigateTo({
        url: '/pages/paradise/life/meal/meal-list',
      })
    },
    onChange(event) {
      if (event.detail === 2) {
        // 显示悬浮动作面板
        this.setData({
          show: true
        });

      } else {
        wx.switchTab({
          url: this.data.list[event.detail].url
        });
      }
    },
    init() {
      const page = getCurrentPages().pop();
      this.setData({
        active: this.data.list.findIndex(item => item.url === `/${page.route}`)
      });
    }
  }
})