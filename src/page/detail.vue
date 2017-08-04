<template>
	<div class="detail" v-model="watchHtml">
		<div class="top">
			<div class="arttitle">
				<div class="flag">
					<span v-if="detailInfo.top === true">置顶</span>
					<span v-if="detailInfo.top === true?false:(detailInfo.tab === 'ask'?true:false)">问答</span>
					<span v-if="detailInfo.top === true?false:(detailInfo.tab === 'share'?true:false)">分享</span>
					<span v-if="detailInfo.top === true?false:(detailInfo.tab === 'job'?true:false)">招聘</span>
					<span v-if="detailInfo.top === true?false:(detailInfo.tab === 'good'?true:false)">精华</span>
					<span v-if="detailInfo.top === true?false:(detailInfo.tab === 'dev'?true:false)">测试</span>
				</div>
				<div class="detail-title"><h2>{{detailInfo.title}}</h2></div>
			</div>
			<div class="baseInfo">
				<div class="come">
					<span>•发布于&nbsp;{{detailInfo.create_at}}&nbsp;•&nbsp;作者<router-link to="">{{loginname}}</router-link>&nbsp;•&nbsp;{{detailInfo.visit_count}}次浏览&nbsp;•&nbsp;来自&nbsp;分享</span>
				</div>
				<div class="collect">
					<span class="collects" @click="collect" v-model="iscollect">{{iscollect}}</span>
				</div>
				
			</div>
		</div>
		<div class="content" v-html="detailInfo.content"></div>
		<div class="disction">
			<p class="replyCount">{{replyCount}} 条评论</p>
			<ul>
				<li v-for="(item,idx) in detailInfo.replies">
					<div class="discContent">
						<div class="discImg">
							<img :src="item.author.avatar_url" alt="" />
						</div>
						<div class="disInfo">
							<span class="discName">{{item.author.loginname}}</span>
							<span class="discPos">{{idx+1}}楼•{{item.create_at}}</span>
							<p class="discCon" v-html="item.content"></p>
						</div>
						<div class="zan">
							<i class="icon_zan" :class="item.is_uped?'active':''" @click="zan(item.id,idx)">{{zanIcon}}</i>
							<span class="zanCount">{{item.ups.length}}</span>
						</div>
						<div class="toDisc">
							<span @click="openSetDisc(idx,item.author.loginname)">〓</span>
						</div>
					</div>
					<div class="setDisc" :class="item.bool?'showSetDisc':'hideSetDisc'">
						<textarea name="textarea" v-model="setCon" placeholder="请输入内容 "></textarea>
						<input type="button" @click="toSetDisc(item.id,idx)" class="button" value="发表" />
					</div>
				</li>
			</ul>
		</div>
		<div class="tips" v-if="isTips">
			<p>{{tipsCon}}</p>
		</div>
		<div class="setupArticleDisc" v-if="!isShow">
			<span @click="setupArticleDisc">我要评论</span>
		</div>
		<div class="tosetDisC" v-if="isShow">
			<textarea name="textarea" v-model="setCon" placeholder="请输入内容 "></textarea>
			<input type="button" @click="toSetDisC" class="button" value="发表" />
		</div>
	</div>
</template>

<script>
	import {Api,ApiPost,Apitoapes,toapesPost} from '@/api/index';
	import axios from 'axios';
	import {mapState} from 'vuex';
	import {Mate} from '@/util/formate';
	import {isLogin} from '@/util/getIsLogin';
	export default {
		name:'detail',
		data(){
			return {
				detailInfo:{},
				loginname:'',
				isTips:false,
				iscollect:'收藏',
				replyCount:'',
				zanIcon:'☆',
				setCon:'',
				isShow:false,
				watchHtml:''
			}
		},
		methods:{
			//收藏
			collect(){
				var that = this;
				var isLogining = isLogin.getIsLogin();
				var detailID = this.$route.params.id;
				var datas = {
							accesstoken : isLogining,
							topic_id : detailID
						}
				if(isLogining){
					if(that.iscollect === '收藏'){
//						console.log(ApiPost)
						ApiPost.collect.list(datas).then(res=>{
							console.log(res)
							that.tipsCon = "收藏成功";
							that.iscollect = '取消收藏';
							that.showTips(that.tipsCon);
						})
					}else{
						ApiPost.de_collect.list(datas).then(res=>{
							console.log(res)
							that.tipsCon = "取消收藏";
							that.iscollect = '收藏'
							that.showTips(that.tipsCon);
						})
					}
					
				}else{
					that.tipsCon = "请先登录";
					that.showTips(that.tipsCon,true)
				}
			},
			//提示字段
			showTips(tipsCon,isJump){
				var that = this;
				that.tipsCon = tipsCon;
				that.isTips = true;
				setTimeout(()=>{
					that.isTips = false;
					if(isJump){
						that.$router.push({path:'/login'})
					}
				},500)
			},
			//点赞
			zan(id,idx){
				var that = this;
				var isLogining = isLogin.getIsLogin();
				console.log(id,isLogining)
				var params = {
					accesstoken:isLogining
				}
				toapesPost.getpost('/reply/'+id+'/ups',params).then(res=>{
					console.log(res)
					if(isLogining){
						if(res.data.action === 'up'){
							that.detailInfo.replies[idx].ups.length+=1;
							that.detailInfo.replies[idx].is_uped = true;
						}else{
							that.detailInfo.replies[idx].ups.length-=1;
							that.detailInfo.replies[idx].is_uped = false;
						}
					}else{
						that.tipsCon = "请先登录";
						that.showTips(that.tipsCon,true)
					}
				})
			},
			//打开@评论输入框
			openSetDisc(idx,name){
				this.isShow = false;
				this.setCon = ''
				for(let i=0;i<this.detailInfo.replies.length;i++){
					this.detailInfo.replies[i].bool = false;
				}
				this.detailInfo.replies[idx].bool = true;
				this.setCon = '@'+name+' '
//					console.log(this.detailInfo.replies[idx].bool)
			},
			//@评论
			toSetDisc(id,idx){
				var that = this;
				var isLogining = isLogin.getIsLogin();
				var msg = that.setCon;
				var params = {
					accesstoken:isLogining,
					content:msg,
					reply_id:id
				}
				toapesPost.getpost('topic/'+that.detailInfo.id+'/replies',params).then(res=>{
					console.log(res)
					that.setCon = ''
				})
				this.detailInfo.replies[idx].bool = false;
				setTimeout(()=>{
					this.watchHtml = 1;
				},3000)
			},
			//打开详情文章输入框
			setupArticleDisc(){
				for(let i=0;i<this.detailInfo.replies.length;i++){
					this.detailInfo.replies[i].bool = false;
				}
				this.setCon = ''
				this.isShow = true;
			},
			
			//评论详情文章
			toSetDisC(){
				var msg = this.setCon;
				if(msg === ''){
					this.tipsCon = "请输入内容";
					this.showTips(this.tipsCon,false)
					this.isShow = false;
					return
				}
				
				var isLogining = isLogin.getIsLogin();
				var params = {
					accesstoken:isLogining,
					content:msg,
				}
				toapesPost.getpost('/topic/'+this.detailInfo.id+'/replies',params).then(res=>{
					console.log(res)
					this.setCon = '';
				})
				setTimeout(()=>{
					this.watchHtml = 2;
				},3000)
				
			},
			//封装获取详情页内容
			getDetailCon(getName){
				var that = this;
				var isLogining = isLogin.getIsLogin();
				var detailID = this.$route.params.id;
				Apitoapes.topic('/topic/'+detailID,{accesstoken:isLogining}).then(res=>{
					that.detailInfo = res.data.data;
					that.detailInfo.create_at = Mate.getNumDate(new Date(that.detailInfo.create_at))
					that.replyCount= that.detailInfo.replies.length;
					that.detailInfo.replies.map(function(item,idx){
						item.create_at = Mate.getNumDate(new Date(item.create_at));
						item.bool = false;
						return item
					})
					if(getName){
						that.loginname = that.detailInfo.author.loginname;
						if(res.data.data.is_collect){
							that.iscollect = '取消收藏'
						}else{
							that.iscollect = '收藏'
						}
					}
					
				})
			}
		},
		computed:{
//			watchHtml(){
//			}
		},
		watch:{
			//监听是否评论并同时显示评论的内容到页面
			watchHtml(val){
				this.getDetailCon(false)
			}
		},
		mounted(){
			this.getDetailCon(true)
		}
	}
</script>
