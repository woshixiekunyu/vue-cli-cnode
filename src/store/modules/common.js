
const comonModule = {
	state:{
		tab:'all',
		page:1,
		image:'',
		isZan:''
	},
	mutations:{
		getTopicTab(state,a){
			state.tab = a;
		},
		getPageNum(state,a){
			state.page = a;
		},
		getImg(state,a){
			state.image = a;
		},
		getIsZan(state,a){
			state.isZan = a;
		}
	}
}
export default comonModule
