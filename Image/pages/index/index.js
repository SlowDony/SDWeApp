//index.js
//获取应用实例
const app = getApp()
// var imageSrc;

Page({
  data: {
    imageUrls: [],
    imageSrc:"",
    textView:"",
    screenWidth:"",
    screenHeight:"",
    red:"255",
    green:"255",
    blue:"255",
    fontsize:"15",
    fontColor: "#353535",
    fontColorbj:"#ffffff",
  },
  
  onLoad: function (options) {
    var that = this
    //获取系统信息  
    wx.getSystemInfo({
      //获取系统信息成功，将系统窗口的宽高赋给页面的宽高  
      success: function (res) {
        that.setData({
          screenWidth : res.windowWidth,
          screenHeight : res.windowHeight+64
        });
          // console.log(res.windowWidth)  //625
          // console.log(res.windowHeight)   //375
        
        // 这里的单位是PX，实际的手机屏幕有一个Dpr，这里选择iphone，默认Dpr是2
      }
    })
  },
  //字体颜色选择
  radioChange:function(e){
  console.log("选择的字体颜色"+e.detail.value);
      this.setData({
        fontColor: e.detail.value
      });
      if (e.detail.value ==("#ffffff")){
        
        this.setData({
          fontColorbj: "#353535"
        });
     }else{
        this.setData({
          fontColorbj: "#ffffff"
        });
     }

  },
  //设置字体大小
  setFontSize:function(e){
    this.setData({
      fontsize: e.detail.value
    })
  },
  //设置背景色
  //设置红色
  setRed:function(e){
    console.log(e.detail.value);
      this.setData({
        red:e.detail.value
      })
  }, 
  //设置绿色
  setGreen: function (e) {
    console.log(e.detail.value);
    this.setData({
      green: e.detail.value
    })
  }, 
  setBlue: function (e) {
    console.log(e.detail.value);
    this.setData({
      blue: e.detail.value
    })
  }, 
   //获取文字数组
  bindTextAreaBlur:function(e){
    console.log(e.detail.value)
    this.setData({
      textView: e.detail.value
    })
  },
  //设置文字
  setText: function (context) {
    var text = this.data.textView;
    console.log(text);
    
    context.setFontSize(this.data.fontsize);
    // context.setFillStyle("#FFF3D2");
    context.setFillStyle(this.data.fontColor);
    context.fillText(text, 40, ((this.data.screenWidth - 80) * 3 / 4 + 100));
    // context.fillText(text, 100,100);
    context.stroke();
    context.save();
  },
  //设置底部标题
  setBottomTitle: function (context) {
    var bottomTitle = '<史姑娘>';
    // context.setTextAlign("center");
    context.setFontSize(12);
    context.setFillStyle(this.data.fontColor);
    context.fillText(bottomTitle, this.data.screenWidth/2-30, this.data.screenHeight-40);
    // context.stroke();
  },
  //生成图片
  createNewImage: function () {
   
    var that = this;
    var context = wx.createCanvasContext("canvas");
    var path = this.data.imageSrc;
    var erImagePath = "../image/erImage.png"
    // context.setFillStyle('#ffffff');
    // context.setFillStyle("rgb(,22, 122)");
    // console.log(this.data.red);
    var red = this.data.red;
    var green =this.data.green;
    var blue = this.data.blue;
    var bjcolor = "rgb("+ red + "," + green + "," + blue + ")";
    context.setFillStyle(bjcolor);

    context.fillRect(0, 0, that.data.screenWidth, that.data.screenHeight);
    console.log(that.data.screenWidth) ; //625
    console.log(that.data.screenHeight) ;
    context.drawImage(path, 40, 40, that.data.screenWidth - 80, (that.data.screenWidth - 80) * 3 / 4);
    context.drawImage(erImagePath, that.data.screenWidth - 110, that.data.screenHeight-110, 70, 70);
    this.setText(context);
    // context.setFontSize(24);
    // context.setFillStyle("#FFF3D2");
    // context.fillText("哈哈哈哈哈", 40, ((this.data.screenWidth - 80) * 3 / 4 + 100));
    // context.fillText(text, 100,100);
    // context.stroke();
    // context.setFillStyle("#000000");
    this.setBottomTitle(context);

    // context.setTextAlign("center");
    // context.setFontSize(12);
    // context.setFillStyle("#FFF000");
    // context.fillText("<史姑娘>", this.data.screenWidth / 2, this.data.screenHeight - 40);
    // context.stroke();

    context.draw();
    setTimeout(function () {
      wx.canvasToTempFilePath({
        // x: 0,
        // y: 0,
        // width: 0,
        // height: 0,
        // destWidth: 0,
        // destHeight: 0,
        canvasId: 'canvas',
        success: function (res) {
          var tempFilePath = res.tempFilePath;
          console.log(tempFilePath);
          that.setData({
            imageUrls: [tempFilePath]
          });
          wx.previewImage({
            current: 0,
            urls: [tempFilePath]
          })
        },
        fail: function (res) {
          console.log(tempFilePath);
        },
        complete: function (res) {
          
        },
      })
    }, 200);

  },
  //选择图片
  chooseImage: function () {
    console.log("点击");
    var that = this;
    wx.chooseImage({
      sourceType: ['album', 'camera'],
      sizeType: ['original', 'compressed'],
      count: 1,
      success: function (res) {
        console.log(res)
        that.setData({
          imageSrc: res.tempFilePaths[0],
          imageUrls: res.tempFilePaths
        })
      }
    })
  },

  previewImage: function (e) {
    var current = e.target.dataset.src
    wx.previewImage({
      current: 0,
      urls: this.data.imageUrls
    })
  },

  drawImage: function () {
    var that = this;
    wx.showToast({
      title: '生成中',
      icon: 'loading',
      duration: 1000
    });
    setTimeout(function(){
      wx.hideToast()
      that.createNewImage();
    },1000)
    /*
    wx.canvasToTempFilePath({
      canvasId: 'canvas',
      success: function (res) {
        console.log(res.tempFilePath)
        wx.previewImage({
          current: 0,
          urls: [res.tempFilePath]
        })
      },
      fail: function (res) {
        console.log(res)
      }
    })*/
  }
})
