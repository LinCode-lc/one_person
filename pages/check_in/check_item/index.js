// pages/daka/daka.js
let start = 0;
let end = 0;
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    checkinItem:{}
  },

  /**
   * 组件的初始数据
   */
  data: {
    //指纹的图片路径
    
    imageSrc:"/images/check/fingerprint.svg",
    //打卡时间
    checkTime:[],
    count:0,
  },

  /**
   * 组件的方法列表
   */
  methods: {
    //快速打卡
    start(){
      start = new Date();
      console.log("start",start)
      
    },
    end(){
      let id = this.properties.checkinItem._id
      console.log(this.data.count)
      end = new Date();
      if((end-start)>1200){
        this.setData({
          imageSrc:"/images/check/fingerprint_active.svg",
          
        })

        //打卡时间存入数据库
        let db = wx.cloud.database()
        const _ = db.command
        db.collection('checkin').doc(id).update({
          data: {
            creatTime: _.push([end]),
            count: _.inc(1)
          }
        })
        const count = this.properties.checkinItem.count+1;
        console.log(count)
        this.setData({
          checkinItem:{...this.properties.checkinItem,count:count}
        })
        wx.showToast({
          title: '打卡成功',
          duration: 1000,
          
          // icon: icon,
          // image: 'image',
          // mask: true,
          // success: (res) => {},
          // fail: (res) => {},
          // complete: (res) => {},
        })
      }
    },
    //创建打卡详情
    doEdit(){
      // wx.navigateTo({
      //   url:"/pages/detail/detail?key"+this.properties.checkinItem._id
      // })
    },
    // attached(){
    //   this.setData({
    //     count:this.properties.checkinItem.count
    //   })
    // }
  }
})
