import router from '@/router/index';
import {isLogin} from '@/util/getIsLogin';
const getUrlModule = {
	state:{
		userInfo:{},
		isUser:'false'
	},
	mutations:{
		getUserInfo(state,a){
			state.userInfo = a
		},
		getIsUser(state,a){
			state.isUser = a
		}
	},
	actions:{
		checkLogin({commit}){
			return new Promise((resolve,reject)=>{
//				this.$router.push()
				console.log(1)
//				window.location = '/login';
					var isLogining = isLogin.getIsLogin();
					console.log(isLogining)
					if(isLogining){
						commit(getIsUser,true)
					}else{
						router.push({path:'/login'})
					}
//				resolve()
			})
		}
	}
}
export default getUrlModule