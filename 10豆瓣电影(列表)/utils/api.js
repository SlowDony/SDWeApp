var API_URL = 'https://api.douban.com/v2/movie'

function coming_soonApi(type,params) {
	return new Promise((resolve,reject)=>{
		wx.request({
		  url: `${API_URL}/${type}`, //仅为示例，并非真实的接口地址
		  data: params,
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
	getList:function(type,pn=0,count=20){
	   return coming_soonApi(type,{"start":pn*count,"count":count})
			  .then(res=>res.data)
	}
}





























