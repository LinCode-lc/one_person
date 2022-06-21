//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    array: ['美国', '中国', '巴西', '日本'],
    // 组件所需的参数
    nvabarData: {

      height: 0
    },

    height: app.globalData.height * 2 + 20,
    isLoading: false
  },
  onLoad() {
    this.setData({
      height: app.globalData.height
    })
    this.setData({
      shopMessage: getApp().globalData.shopMessage
    })

  },
  onReady() {
    let that = this
    setTimeout(function() {
      that.setData({
        isLoading: true
      })
    }, 500)
  },

})