import Vue from "vue";
import VueRouter from "vue-router"

// 引入组件
import Home from '@/pages/Home'
import Search from '@/pages/Search'
import Register from '@/pages/Register'
import Login from '@/pages/Login'

// 使用插件
Vue.use(VueRouter)

// 先把VueRouter原型对象的push保存一份
let originPush = VueRouter.prototype.push
// 重写 push
/**
 * 
 * @param {*} location 告诉原来的push方法往哪里传参
 * @param {*} resolve 成功的回调
 * @param {*} reject 失败的回调
 */
VueRouter.prototype.push = function(location, resolve, reject){
  if(resolve && reject){
    originPush.call(this, location, resolve, reject)
  }else{
    originPush.call(this, location, () => {}, () => {})
  }
}

// 先把VueRouter原型对象的replace保存一份
let originReplace = VueRouter.prototype.replace
// 重写 replace
/**
 * 
 * @param {*} location 告诉原来的replace方法往哪里传参
 * @param {*} resolve 成功的回调
 * @param {*} reject 失败的回调
 */
VueRouter.prototype.replace = function(location, resolve, reject){
  if(resolve && reject){
    originReplace.call(this, location, resolve, reject)
  }else{
    originReplace.call(this, location, () => {}, () => {})
  }
}

// 创建路由实例
export default new VueRouter({
  // 配置路由
  routes: [
    {
      path: '/home',
      component: Home,
      meta: {
        show: true
      }
    },
    {
      path: '/search/:keyword?',
      component: Search,
      name: 'search',
      meta: {
        show: true
      }
    },
    {
      path: '/login',
      component: Login,
      meta: {
        show: false
      }
    },
    {
      path: '/register',
      component: Register,
      meta: {
        show: false
      }
    },
    // 重定向,项目跑起来时,访问/,立马跳转到home页面
    {
      path: '/',
      redirect: '/home'
    }
  ]
})