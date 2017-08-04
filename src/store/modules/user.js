const getUrlModule = {
	state:{
		userInfo:'登录'
	},
	mutations:{
		getUserInfo(state,a){
			state.userInfo = a
		}
	}
}
export default getUrlModule