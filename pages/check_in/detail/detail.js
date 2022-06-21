// pages/detail/detail.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    currentDate: '12:00',
    minHour: 10,
    maxHour: 20,
    value: '',
    time: '12:01',
  },

  doInput(event){
    console.log(event)
    this.setData({
      value:event.detail.value
    })
  },
  submit(){
    const db = wx.cloud.database()
    db.collection('checkin').add({
      // data 字段表示需新增的 JSON 数据
      data: {
        title:this.data.value,
        count:0,
        creatTime:[],
        when:this.data.time
      },
      success: function(res) {
        // res 是一个对象，其中有 _id 字段标记刚创建的记录的 id
        console.log(res)
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  bindTimeChange: function(e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      time: e.detail.value
    })
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