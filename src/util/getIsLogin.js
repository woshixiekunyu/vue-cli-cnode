export const isLogin = {
	getIsLogin(isWhat){
		var cookie = document.cookie.split('; ')
		var isLogining;
		var Zan;
		cookie.forEach(function(item){
			var arr = item.split('=');
			
			if(arr[0] === 'userInfo'){
				isLogining = arr[1]+arr[2]+arr[3];
//				console.log(isLogining)
			}else if(arr[0] === 'zan'){
				Zan = arr[1];
			}
		})

		if(isLogining){
			if(isWhat === 'user'){
				
				return JSON.parse(isLogining);
			}else if(isWhat === 'zan'){
				return Zan;
			}
			
		}
		
	}
}
