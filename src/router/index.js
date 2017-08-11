import Vue from 'vue'
import Router from 'vue-router'
import store from '@/store/index'
//import abc from '@/components/abc'

Vue.use(Router)

var router = new Router({
	mode:'history',
	scrollBehavior (to, from, savedPosition) {
	    // debugger
	    return { 
	        x: 0, 
	        y: 0 
	    }
	},
	routes:[
  	{path:'/',name:'navList',redirect:'/navList/topicList'},
    {
    	path:'/navList',
//  	name:'navList',
    	component:require('@/page/navList'),
    	redirect:'/navList/topicList',
    	children:[{
	    	path:'topicList',
	    	name:'topicList',
	    	component:require('@/page/topicList'),
	    	meta:{
	    		title:'topipc',
	    		path:'/topicList'
	    	},
	    },
    	{
				path:'detail/:id',
				name:'detail',
				component:require('@/page/detail')
	    },
    	{
				path:'userRoom',
				name:'userRoom',
				component:require('@/page/userRoom'),
				beforeEnter(to,from,next){
					console.log(store.state.user.isUser)
					store.state.user.isUser
					? next()
					:store.dispatch('checkLogin').then(data=>{next()})
				}
	    }]
    },{
    	path:'/login',
    	name:'login',
    	component:require('@/page/login')
    }]
})
router.beforeEach((to,from,next)=>{
//	console.log(to)
	let bl = to.matched.some(item=>item.meta)
	if (to.matched.some(record => record.meta)) {
	    // this route requires auth, check if logged in
	    // if not, redirect to login page.
//	    console.log(bl)
//	    if (!auth.loggedIn()) {
//	      next({
//	        path: '/login',
//	        query: { redirect: to.fullPath }
//	      })
//	    } else {
	      next()
//	    }
	  } else {
	    next() // 确保一定要调用 next()
	  }
})
export default router

