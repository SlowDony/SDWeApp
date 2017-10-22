//index.js


var count = 0;
var param = {

  //  data : {
  //    clickMsg1 = '显示点击的内容'
	// },
	//e就是事件对象,包含了很多内容,比如谁被点击了,什么时间被点击了,在什么xy位置被点击了

    clickMe :function(e){
	    console.log(e);
	    count++;

	    //如何区分到底是view0点击还是view1点击
	    //通过id就可以区分到底是view0被点击还是view1被点击

	     var id = e.currentTarget.dataset.hi;

	    //吧view0上的点击的显示出来
	    param.data.clickMsg1 = "显示点击的内容" + id +"点击次数"+count;

	    //setdata重新刷新界面数据
	    this.setData(param.data);


 	}
};

Page(param)