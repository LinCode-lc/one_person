// pages/dictionary/dictionary.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    value:"",
    searchRes: {},
    showDetail:false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  doShow(){
    this.setData({
      showDetail:!this.data.showDetail
    })
  },
  doInput(event) {
  
    this.setData({
      value: event.detail.value
    })
  },
  doSearch: function () {
    let str = this.data.value
    let directory = getApp().globalData.directory
    console.log(directory)
    for (let item of directory) {
      let count = 0
      for (let aq of item.annotations) {
        if (aq.Q.indexOf(str) != -1) {
          count++
        }
        if (count > 1) {
          this.setData({
            searchRes: item
          })
          return
        }
      }

    }
  },
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