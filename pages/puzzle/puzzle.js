//index.js
//获取应用实例
let map = new Map()
map.set('mh', 0)
map.set('zdg', 1)
map.set('gouqi', 2)
map.set('yangsheng', 3)
// map.set('dp', 4)
// map.set('man', 5)
let nameMap = new Map()
nameMap.set('mh',"沐华")
nameMap.set('zdg',"尘世行")
nameMap.set('gouqi',"枸杞")
// nameMap.set('man',"大兄弟")
// nameMap.set('dp',"dp")
nameMap.set('yangsheng',"洋参")

let arr = ['mh', 'zdg', 'gouqi', 'yangsheng']
function Puzzle() {
  this.isStart = false
  this.randomData = []
  this.finishData = ""
  this.gameImg = "zdg"
  this.level = 3
  this.step = 0
  this.test = 1
  // 初始化

  // 鼠标移动图片

  // 键盘事件


  // 检查是否拼图完成

  // 切换游戏图片

  // 根据不同难度生成拼图完成时的数据用来对比，判断是否完成

  // 生成小图片数量数组

}
Puzzle.prototype.init = function ({
  gameImg,
  level
}) {
  this.step = 0
  this.level = level
  this.gameImg = gameImg
  this.randomData = this.getRandomData()
  // this.randomData = [1,2,3,4,5,6,7,9,8]
  this.isStart = true
  if (this.isStart) this.finishData = this.getFinishData()
}
Puzzle.prototype.move = function (idx) {
  let level = this.level
  let target = this.randomData.indexOf(idx) // 当前选中位置下标
  let space = this.randomData.indexOf(Math.pow(level, 2)) // 空白位置下标

  // 过滤一下，空白位置在最左边时点击右边上一个数字时也能实现交换
  // 以及空白位置在最右边点击左边下一个数字时也能实现交换
  let condition =
    (space % level == 0 && target % level == level - 1) ||
    (space % level == level - 1 && target % level == 0)

  if (!condition) {
    // 点击目标的，上或下或左或右是空白位，就交换位置
    if (
      target == space - level ||
      target == space + level ||
      target == space - 1 ||
      target == space + 1
    ) {
      this.change(space, target)
    }
  }
}
Puzzle.prototype.onKeydown = function (code) {
  let level = this.level
  // 目标位置下标
  let target
  // 空白位置下标
  let space = this.randomData.indexOf(Math.pow(level, 2))
  switch (code) {
    case 37:
      target = space + 1
      if (space % level == level - 1) return
      this.change(space, target)
      break
    case 38:
      target = space + level
      if (target > this.randomData.length - 1) return
      this.change(space, target)
      break
    case 39:
      target = space - 1
      if (space % level == 0) return
      this.change(space, target)
      break
    case 40:
      target = space - level
      if (target < 0) return
      this.change(space, target)
      break
  }
}
Puzzle.prototype.change = function (space, target) {
  // 空白位置替换成目标位置
  this.randomData[space] = this.randomData[target]
  // 目标位置为最大值，就完成了替换
  this.randomData[target] = Math.pow(this.level, 2)
  this.step += 1
  console.log(this.randomData)
  this.finish()
}
Puzzle.prototype.finish = function () {
  if (this.randomData.join("") == this.finishData) {
    console.log("成功了")
    // wx.showToast({
    //   title: '成功',
    //   icon: 'success',
    //   duration: 2000
    // })
    wx.showModal({
      title: '恭喜通关',

      content: nameMap.get(this.gameImg),
      success (res) {
        if (res.confirm) {
          console.log('用户点击确定')
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }

    })
    console.log(this.step)
    // ElMessageBox.alert(`恭喜你，闯关成功，仅用${this.step}步`, "提示", {
    //   confirmButtonText: "OK",
    //   callback: (action: Action) => {
    //     this.randomData = []
    //     this.step = 0
    //     this.isStart = false
    //   },
    // })
  }
}
Puzzle.prototype.setImg = function (img) {
  this.gameImg = img
}
Puzzle.prototype.getFinishData = function () {
  let str = ""
  for (let i = 1, len = Math.pow(this.level, 2); i <= len; i++) {
    str += i
  }
  return str
}
Puzzle.prototype.getRandomData = function () {
  let randomData = []
  // 根据游戏等级生成最大值，减1是因为最大值保留作空白位放最后
  let max = Math.pow(this.level, 2) - 1
  while (randomData.length < max) {
    // 生成一个范围内的随机数
    let random = Math.floor(Math.random() * max) + 1
    if (randomData.indexOf(random) == -1) {
      // 没有重复的就添加
      randomData.push(random)
    }
  }
  // 添加最大数字作为空白位
  randomData.push(max + 1)
  return randomData
}
let p = new Puzzle()
const app = getApp()
var {
  getGameImgFile,
  getSmallImg
} = require('../../utils/games/utils');
const {
  gameImg,
  randomData,
  level,
  isStart
} = p;

Page({
  data: {
    puzzle: p,

    games: [{
        label: "沐华",
        value: "mh"
      },
      {
        label: "尘世行",
        value: "zdg"
      },
      {
        label: "大妹子",
        value: "woman"
      },
      {
        label: "大兄弟",
        value: "man"
      },
      {
        label: "斗破苍穹",
        value: "dp"
      },
      {
        label: "洋参",
        value: "yangsheng"
      }
    ],
    // gameImg,
    // randomData:[1,3,4,2,7,5,9,8,6],
    // level, isStart ,
    isLoading: false,
    baseSrc: '../../images/puzzle/',
  },

  onLoad() {


    console.log(p)
    this.setData({
      height: app.globalData.height
    })
    this.setData({
      shopMessage: getApp().globalData.shopMessage
    })

  },
  onReady() {
    let that = this
    setTimeout(function () {
      that.setData({
        isLoading: true
      })
    }, 500)
  },
  getSmallImg(e) {
    getSmallImg()
    console.log(e.target.dataset.src)
  },

  // 鼠标移动图片
  handleMove(e) {
    let index = e.currentTarget.dataset.item
    console.log(index)
    p.move(index);
    this.setData({
      puzzle: p
    })
    console.log(p)
  },
  doStart() {
    p.init({
      gameImg: "zdg",
      level: 3
    })
    this.setData({
      puzzle: p
    })
  },
  doChangeImg() {
    let index = map.get(this.data.puzzle.gameImg)
    index++
    if (index == arr.length) {
      index = 0
    }
    let newImg = arr[index]
    let level = this.data.puzzle.level
    console.log(newImg)
    console.log(level)
    p.init({
      gameImg:newImg,
      level
    })
    console.log(p)
    this.setData({
      puzzle: p
    })
  },
  doChangeDifficulty(){
    let level = this.data.puzzle.level
    let gameImg = this.data.puzzle.gameImg
    level++
    if(level==5){
      level = 3
    }
    p.init({
      gameImg,
      level
    })
    this.setData({
      puzzle: p
    })
  },
  // 键盘事件
  handleKeyDown(e) {
    if (!isStart.value) return;
    games.onKeydown(e.keyCode);
  }
  // onMounted(() => {
  //   document.addEventListener("keydown", handleKeyDown);
  // });
  // onBeforeUnmount(() => {
  //   document.removeEventListener("keydown", handleKeyDown);
  // });

})