import axios from './factory';

class ApiConfig {
//	constructor() {
//		this.api = {}
//		this.api.topic = {
//			list:'/topics'
//		};
//		this.api.user = {
//			list:'/accesstoken'
//		};
//		this.api.collect = {
//			list:'/topic_collect/collect'
//		};
//		this.api.getpost = {
//			list:''
//		}
//	};
//	tourl(){
//		let rs = {};
//		for(let item in this.api){
//			rs[item] = (url)=>{
//					return axios.get(url)
//			}
//		}
//		return rs
//	};
//	toPost(){
//		let rs = {};
//		for(let item in this.api){
//			rs[item] = (url)=>{
//					return axios.post(url)
//			}
//		}
//		return rs
//	}
	constructor() {
		this.api = {}
		this.api.topic = {
			list:{url:'/topics'}
		};
		this.api.user = {
			list:{url:'/accesstoken'}
		};
		this.api.collect = {
			list:{url:'/topic_collect/collect'}
		};
		this.api.de_collect = {
			list:{url:'/topic_collect/de_collect'}
		};
		this.api.getpost = {
			list:{url:'/'}
		}
	};
	toisapi(){
		var that = this;
		let rs = {};
		for(let item in that.api){
			rs[item] = {};
			for(let v in that.api[item]){
//				console.log(!!that.api[item][v]['url'])
				that.api[item][v]['url']
				? rs[item][v] = that.api[item][v]['url']
				: console.log('请求失败')
			}
			
		}
		return rs
	};
	//请求get,自带url
	tourl(){
		var that = this;
		var ugModule = that.toisapi()
		let rs = {};
		for(let items in ugModule){
			rs[items] = {};
			for(let v in ugModule[items]){
				
				rs[items][v] = (params)=>{
					return axios.get(ugModule[items][v],{params:params})
				}
			}
			
		}
		return rs
	};
	//请求get，不带url，get时，params的参数使用{params:params}
	toapes(){
		var that = this;
//		var ugModule = that.toisapi()
		let rs = {};
		for(let items in that.api){
			rs[items] = (url,params)=>{
				return axios.get(url,{params:params})
			}
		}
		return rs
	};
//	请求post，不带url
	toapesPost(){
		var that = this;
//		var ugModule = that.toisapi()
		let rs = {};
		for(let items in that.api){
			rs[items] = (url,params)=>{
				return axios.post(url,params)
			}
		}
		return rs
	};
	//请求post，自带url，post时，参数直接用params
	toPost(){
		var that = this;
		var ugModule = that.toisapi()
		let rs = {};
		for(let items in ugModule){
			rs[items] = {};
			for(let v in ugModule[items]){
				
				rs[items][v] = (params)=>{
//					console.log(params)
					return axios.post(ugModule[items][v],params)
				}
			}
			
		}
		return rs
	}
}

export const Api = new ApiConfig().tourl();
export const ApiPost = new ApiConfig().toPost();
export const Apitoapes = new ApiConfig().toapes();
export const toapesPost = new ApiConfig().toapesPost();