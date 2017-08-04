import Vue from 'vue'
import Router from 'vue-router'

//import abc from '@/components/abc'

Vue.use(Router)

  const routes = [
  	{path:'/',name:'navList',redirect:'/navList/topicList'},
    {
    	path:'/navList',
    	component:require('@/page/navList'),
    	children:[{
	    	path:'topicList',
	    	name:'topicList',
	    	component:require('@/page/topicList')
	    },
    	{
				path:'detail/:id',
				name:'detail',
				component:require('@/page/detail')
	    },
    	{
				path:'userRoom',
				name:'userRoom',
				component:require('@/page/userRoom')
	    }]
    },{
    	path:'/login',
    	name:'login',
    	component:require('@/page/login')
    }]
export default new Router({
	mode:'history',
	scrollBehavior (to, from, savedPosition) {
	    // debugger
	    return { 
	        x: 0, 
	        y: 0 
	    }
	},
	routes
})

