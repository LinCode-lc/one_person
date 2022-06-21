
// const DB = wx.cloud.database().collection("list")
const db = wx.cloud.database()
Page({
  data:{
    checkinList:[],
    arr:[]
    // age:12
  },
  onLoad(){
    let that = this
    console.log(0)
    this.setData({
      arr:[1]
    })
    // console.log(this.data)
    db.collection('checkin').where({
      // publishInfo: {
      //   country: 'United States'
      // }
    }).get({
      success: function(res) {  
      const result = res.data
      console.log(result)
      that.setData({
        checkinList:result
      })
     }
    })


    // wx.cloud.callFunction({
    //   name:"checkin",
    //   data:{
    //     type:"checkinList",      
    //   },
    //   success: (res)=>{
    //     const result = res.result.data     
    //     this.setData({
    //       checkinList:result
    //     })
    //   },
    //   fail:function(err){
    //     console.log(err)
    //   }
    // })
  
   

    
  },
  creatCheckin(){
    wx.navigateTo({
      url: "/pages/check_in/detail/detail"
    })
  },
  
})
