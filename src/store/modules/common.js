
const comonModule = {
	state:{
		tab:'all',
		page:1,
		image:'',
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
	}
}
export default comonModule
