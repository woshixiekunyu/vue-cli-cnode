export const isLogin = {
	getIsLogin(){
		var cookie = document.cookie.split(' ;')
		var isLogining;
		cookie.forEach(function(item){
			var arr = item.split('=');
			if(arr[0] === 'userInfo'){
				isLogining = arr[1];
			}
		})
		return isLogining;
	}
}
