// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
//import App from './components/abc'
import router from '@/router'


import store from '@/store/index'

//引入状态管理

//引入样式库
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-default/index.css'
Vue.use(ElementUI)

//引入自制scss文件
import '@/assets/scss/index.scss';

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
template: '<router-view/>',
//components: { App }
})
