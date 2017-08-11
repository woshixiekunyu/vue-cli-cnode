<template>
	<div class="login">
		<div class="mian">
			<label for="userName">
				<input type="text" name="userName" id="userName" class="userName" v-model="userNameVal"/>
			</label>
			<input type="button" id="toLogin" class="toLogin" value="登录" @click="toLogin"/>
			<p class="error_msg">{{error_msg}}</p>
		</div>
	</div>
</template>

<script>
	import {ApiPost} from '@/api/index';
	import {mapState} from 'vuex';
	export default {
		name:'login',
		data(){
			return {
				userNameVal:'',
				error_msg:''
			}
		},
		computed:{
			
		},
		methods:{
			toLogin(){
				var that = this;
//				console.log(that.userNameVal)
				var params = {
					accesstoken:that.userNameVal
				}
				ApiPost.user.list(params).then(res=>{
//					console.log(res)
					if(res.data.success){
						res.data.token = that.userNameVal;
						var now = new Date();
						document.cookie = 'userInfo='+JSON.stringify(res.data)+';expires='+now;
//						console.log(res.data)
						that.$store.commit('getUserInfo',res.data)
						history.go(-1)
					}else{
						that.error_msg = res.data.error_msg
					}
				})
			}
		},
		mounted(){
//			console.log(ApiPost.api)
//console.log(this.$store.state.user.isUser)
		}
	}
</script>

<style scoped lang="scss">
	.login{
		width: 100%;
		height: 100%;
		background-color: #ccc;
		padding: 200px 0;
		.mian{
			background-color: #fff;
			width: 600px;
			height: 300px;
			border: 1px solid #ccc;
			margin: 0 auto;
		}
		.userName{
			width: 300px;
			height: 50px;
			padding: 0;
			border-radius: 10px;
			display: block;
			margin: 70px auto 0;
			outline: none;
		}
		.toLogin{
			width: 100px;
			height: 40px;
			display: block;			
			margin: 20px auto 0;
		}
		p.error_msg{
			text-align: center;
			color: #f00;
		}
	}
	
</style>