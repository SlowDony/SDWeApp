//index.js
//获取应用实例
const app = getApp()
var api = require('../../utils/api.js');

Page({
  data: {
    pn: 1,
    list: [],
    showloding:true,
    showmore:true
  },
  scrolltolower:function(e){
      if (!this.data.showmore)return;
      this.loadData(this.data.pn);
      // console.log(1111)
  },

  loadData:function(pn){
     api.getList('in_theaters', pn)
      .then(res => {
        console.log(res);
        if (res.subjects.length>0) {
             this.setData({
               list: this.data.list.concat(res.subjects),
             showloding:false,
             pn:pn+1
             })
        }else
        {
            this.setData({
                showmore:false
            })
        }
       
      })
  },
  onLoad: function (options) {
    // body...
    this.loadData(this.data.pn);
   
  }
})
