//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    message: 'Hello World',
    array:[1,2,3,4,5],
    viewname :'webview',
    zhangsan :{name:"张三","age":12},
    lisi:{name:"李四",age:19},
    count:1
  },

  add:function (e) {
    
    this.setData({
      count:this.data.count+1
    })
  }

  
})
