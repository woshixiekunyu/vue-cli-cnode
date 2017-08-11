<template>
	<div class="navList">
		<div class="left">
			<el-row class="tac">
				<el-col :span="8" style="width: 100%;">
					<el-menu default-active="1" router class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose">
						<el-submenu index="1">
							<template slot="title"><i class="el-icon-information"></i>主题</template>
							<el-menu-item-group>
								<el-menu-item index="/navList/topicList" @click="abc('all')">全部</el-menu-item>
								<el-menu-item index="/navList/topicList" @click="abc('ask')">问答</el-menu-item>
								<el-menu-item index="/navList/topicList" @click="abc('good')">精华</el-menu-item>
								<el-menu-item index="/navList/topicList" @click="abc('job')">招聘</el-menu-item>
								<el-menu-item index="/navList/topicList" @click="abc('share')">分享</el-menu-item>
								<el-menu-item index="/navList/topicList" @click="abc('dev')">测试</el-menu-item>
							</el-menu-item-group>
						</el-submenu>
						<el-menu-item index="/navList/userRoom"><i class="el-icon-menu"></i>个人中心</el-menu-item>
						<el-menu-item index="3"><i class="el-icon-message"></i>消息管理</el-menu-item>
					</el-menu>
					<div class="toLogin" @click="toLogin">
						<i class="el-icon-message"></i>{{isUser?'已登录(退出)':'登录'}}</div>
				</el-col>
			</el-row>
		</div>
		<div class="right">
			<router-view></router-view>
		</div>
	</div>
</template>
<style scoped lang="scss">
	.navList{
		display: flex;
	}
	.left{
		position: fixed;
		left: 0;
		top: 0;
		min-width: 200px;
		flex: 1.5;
	}
	.right{
		padding-left: 200px;
		flex: 8.5;
	}
	.toLogin{
		width: 160px;
		padding: 0 20px;
		line-height: 56px;
		background-color:#eef1f6;
		cursor: pointer;
		font-size: 14px;
		color: #48576a;
		i{
			margin-right: 10px;;
		}
		&:hover{
			background-color: #d1dbe5;
		}
	}
	
</style>
<script>
	import router from '@/router/index';
	import {Api} from '@/api/index';
	import {mapState} from 'vuex';
	import {isLogin} from '@/util/getIsLogin';
	export default {
		data(){
			return {
				tab:''
			}
		},
		methods: {
			handleOpen(key, keyPath) {
//				console.log(key, keyPath);
			},
			handleClose(key, keyPath) {
//				console.log(key, keyPath);
			},
			abc(a){
				this.$store.commit('getTopicTab',a);
			},
			toLogin(){
				if(!this.isUser){
					this.$router.push({path:'/login'})
				}else{
					var now = new Date();
					now.setDate(now.getDate()-22)
//					console.log(now)
					document.cookie = 'userInfo='+{}+';expires='+now;
			        this.$notify.success({
			          title: 'Tip',
			          message: '已退出登录',
			          offset: 100
			        });
			        this.$store.commit('getIsUser',false)
			        router.push({path:'/navList/topicList'})
				}
			}
		},
		computed:{
			...mapState({
				isUser:state=>state.user.isUser,
//				userInfo:state=>state.user.userInfo,
			}),
		},
		mounted(){
			var that = this;
			var isLogining = isLogin.getIsLogin('user') ;
//			console.log(isLogining)
			if(isLogining){
				this.$store.commit('getIsUser',true)
				this.$store.commit('getUserInfo',isLogining)
//				console.log(this.$store.state.user.isUser)
			}else{
				this.$store.commit('getIsUser',false)
				this.$store.commit('getUserInfo',isLogining)
//				console.log(this.$store.state.user.isUser)
			}
//			console.log(userInfo)
			this.$store.commit('getTopicTab',this.tab)
		}
	}
</script>