import Vue from 'vue'
import App from './App.vue'
// 引入路由
import router from '@/router'
// 三级联动组件 --- 注册为全局组件
import TypeNav from '@/components/TypeNav'
// 引入仓库进行注册
import store from '@/store'
// 引入MockServer.js --- mock数据
import mockServer from '@/mock/mockServer'
// 引入swiper样式
import 'swiper/css/swiper.css'

// 注册全局组件
// 第一个参数:全局组件的名字,第二个参数:哪个组件
Vue.component(TypeNav.name, TypeNav)

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  // 注册路由
  router,
  // 注册仓库
  store
}).$mount('#app')
