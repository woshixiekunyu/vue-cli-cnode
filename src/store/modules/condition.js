//import Vuxx from './common';
const conditionModule = {
	state:{
		roleListParams:{},
	},
	mutations:{
		changeroleListParams(state,a){
			state.roleListParams = Object.assign({},a)
		}
	}
}
export default conditionModule