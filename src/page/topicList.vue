<template>
	<div class="topicList">
		<!--<div class="form-group">
		        <label>背景图</label>
		        <input type="file" class="form-control" @change="onFileChange">
		 </div>
		<button @click="cmImg">提交</button>
		<img class="lookImg" :src="getImg" alt="" />-->
		<div class="topic-items">
			<ul style="z-index: 10000000;" v-if="!loading2">
				<li v-for="(item,idx) in topicList" class="topic-items-item">
					<div class="userImg">
						<img :src="item.author.avatar_url" alt="" />
					</div>
					<div class="rl">
						<span>{{item.reply_count}}</span>/<span>{{item.visit_count}}</span>
					</div>
					<div class="flag">
						<span v-if="item.top === true">置顶</span>
						<span v-if="item.top === true?false:(item.tab === 'ask'?true:false)">问答</span>
						<span v-if="item.top === true?false:(item.tab === 'share'?true:false)">分享</span>
						<span v-if="item.top === true?false:(item.tab === 'job'?true:false)">招聘</span>
						<span v-if="item.top === true?false:(item.tab === 'good'?true:false)">精华</span>
						<span v-if="item.top === true?false:(item.tab === 'dev'?true:false)">测试</span>
					</div>
					<div class="title">
						<router-link :to="'detail/'+item.id" tag="a" v-bind:class="{ underLine:isunder }">{{item.title}}</router-link>
					</div>
					<div class="lastDisc">
						<div class="lastImg">
							<img src="" alt="" />
						</div>
						<div class="lasttime">
							{{item.last_reply_at}}
						</div>
					</div>
				</li>
			</ul>
		</div>
		<div class="block" v-if="!loading2" style="position: fixed;left: 40%;bottom: 30px;">
		    <el-pagination
		      @size-change="handleSizeChange"
		      @current-change="handleCurrentChange"
		      :current-page.sync="currentPage3"
		      :page-size="100"
			  :current-page="params.pageNum"
		      layout="prev, pager, next, jumper"
		      :total="total">
		    </el-pagination>
		</div>
		<input type="text" v-if="!loading2" v-model="tab" hidden/>
		<!--<input type="text" v-if="!loading2" v-model="page" hidden/>-->
		<el-table
	    v-loading="loading2"
	    element-loading-text="拼命加载中"
	    style="width: 100%" v-if="loading2">
		  </el-table>
	</div>
</template>

<script>
	import {Api} from '@/api/index';
	import axios from '@/api/factory';
	import {mapState} from 'vuex'
	import {Mate} from '@/util/formate';
//	import {isLogin} from '@/util/getIsLogin';
	export default {
		name:'topicList',
		
		data(){
			return {
				topicList:[],
				detailId:[],
				loading2:true,
				currentPage3: 1,
				forTime:'',
				isunder:false,
				params:Object.assign({
					pageNum:1
				},this.$store.state.condition.roleListParams),
				total:10000,
				isgo:false
			}
		},
		methods:{
			onFileChange(e) {
//				console.log(e)
			   var files = e.target.files || e.dataTransfer.files;
//			   console.log(files[0])
			   if (!files.length) return;
			      this.createImage(files[0]);
			   },
			createImage(file) {
			   var image = new Image();
			   var reader = new FileReader();
			   var vm = this;
			   reader.onload = (e) => {
			        vm.image = e.target.result;
			   };
			       reader.readAsDataURL(file);
			},
			handleSizeChange(val) {
//		        console.log(`每页 ${val} 条`);
		     },
		    handleCurrentChange(val) {
		      	var that = this;
//		      	console.log(this.params.pageNum,val)
		      	var maxPageNum = Math.floor(that.total/100);
//		      	console.log(val,maxPageNum,1111)
	      		if(val === maxPageNum){
		      		that.total+=100
		      	}
		      	if(val && this.params.pageNum !== val) this.params.pageNum = val;
		        this.$store.commit('changeroleListParams',this.params);
		        this.getTab(val,that.tab)
		    },
		     
		    getTab(page,tab){
		      	var that = this;
		      	that.topicList=[];
		      	page = this.params.pageNum;
		      	var params = {
		      		limit:10,
		      		page:page,
		      		tab:that.tab
		      	}
		      	Api.topic.list(params).then(res=>{
//		      		console.log(res)
//console.log(this.$store.state.user.isUser)
					that.topicList = that.topicList.concat(res.data.data.map(function(item){
						item.last_reply_at = Mate.getNumDate(new Date(item.last_reply_at))
						return item;
					}))
					that.loading2 = false;
					that.isgo = true;
				})
		    }
		},
		computed: {
			...mapState({
				tab:state=>state.common.tab,
//				page:state=>state.condition.roleListParams,
				getImg:state=>state.common.image
			}),
		},
		watch:{
			tab(val){
				if(this.isgo){
					var that = this;
					that.topicList=[];
					that.loading2 = true;
					if(val && this.params.pageNum !== val) this.params.pageNum = 1;
			        this.$store.commit('changeroleListParams',this.params);
			        this.getTab(1,that.tab)
				}
				
//				that.getTab(that.page,val)
			},
//			page(val){
//				var that = this;
//				that.topicList=[];
//				that.loading2 = true;
//				that.getTab(val,that.tab)
//			}
		},
		mounted(){
			var that = this
//			console.log(console.log(this.params))
//			that.getTab(that.page,that.tab)
			that.handleCurrentChange();
//			console.log(this.$store.state.condition.aaa)
		}
		
	}
</script>

<style scoped lang="scss">
	.topicList{
		.topic-items{
			padding-bottom: 100px;
			ul{
				margin: 0;
				padding: 0 20px;
				.topic-items-item{
					display: flex;
					height: 50px;
					line-height: 50px;
					text-align: center;
					border-bottom:1px solid #ccc;
					.userImg{
						flex:0.7;
						img{
							width: 30px;
							vertical-align: middle;
							border-radius: 50%;
							cursor: pointer;
						}
					}
					.rl{
						flex:0.8;
						text-align: left;
						vertical-align: middle;
						span{
							font-size: 12px;
							&:last-Child{
								color:#aaa
							}
						}
					}
					.flag{
						flex: 1;
						span{
							padding: 3px 4px;
							background-color: #80BD01;
							color:#fff;
							font-size: 12px;
							border-radius: 5px;
						}
					}
					.title{
						text-align: left;
						flex: 9;
						white-space: nowrap;
						overflow: hidden;
						text-overflow:ellipsis;
						padding: 0 10px;
						a{
							text-decoration: none;
							color:#000;
							&:hover{
								text-decoration: underline;
							}
						}
					}
					.lastDisc{
						text-align: left;
						flex: 1;
						font-size: 12px;
					}
				}
			}
			.underLine{
				text-decoration: underline;
			}
		}
	}
	
</style>