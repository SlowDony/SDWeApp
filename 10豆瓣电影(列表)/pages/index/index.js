//index.js
//获取应用实例
const app = getApp()
var api = require('../../utils/api.js');

Page({
  data: {
    pn: 1,
    list: []

  },
  onLoad: function (options) {
    // body...
    api.getList('in_theaters', this.data.pn)
      .then(res => {
        console.log(res);
        this.setData({
          list: res.subjects
        })
      })
  }
})
