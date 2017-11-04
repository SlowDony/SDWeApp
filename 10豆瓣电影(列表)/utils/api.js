var API_URL = 'https://api.douban.com/v2/movie/coming_soon'

function coming_soonApi(type,params) {
	return new Promise((resolve,reject)=>{
		wx.request({
		  url: API_URL, //仅为示例，并非真实的接口地址
		  // data: params,
		  header: {
		      'content-type': 'json' // 默认值
		  },
		  success: resolve ,
		  fail:reject
		})
	})
	// body...
}

module.exports = {
	getList:function(type,pn){
	   return coming_soonApi()
			  .then(res=>res.data)
	}
}





























