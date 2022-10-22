// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import Vuex from 'vuex'
import App from './App'
import router from './router'//路由
import store from'./store'//状态管理
import echarts from 'echarts'

import axios from 'axios'
import Mock from 'mockjs'//mock数据
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

import Three from 'three'

import { Calendar } from '@fullcalendar/core';//日历插件
import dayGridPlugin from '@fullcalendar/daygrid';

axios.defaults.baseURL = '/api' // 开发本地代理
//axios.defaults.headers.post['Contenst-Type'] = 'application/json;'
//axios.defaults.headers.common['token'] = store.state.token  // 在每次发送请求的header中添加token

Vue.config.productionTip = false
Vue.use(ElementUI);
Vue.prototype.$http = axios;
Vue.use(Vuex)
Vue.prototype.bus = new Vue();//用于组件间的通信
// 使用 Mock
//var Mock = require('mockjs')
//Vue.use(Three)


if (sessionStorage.getItem('token')) {
  store.commit("transUname",{'token':sessionStorage.getItem('token')})
}

// // // 添加请求拦截器
axios.interceptors.request.use(function (config) {
  // 在发送请求之前做些什么
  // 判断是否存在token,如果存在将每个页面header添加token
  if (store.state.token) {
    config.headers.common['token'] = store.state.token
  }
  console.log("config-----" + config.headers.common['token']);

  return config
}, function (error) {
  router.push('/admin/login')
  return Promise.reject(error)
})

// 添加响应拦截器
axios.interceptors.response.use(function (response) {
  // 对响应数据做点什么
  console.log("响应+++++++++"+response.data.code);
   // if (response.data.code == 200 || response.code == 200) {
   //      return Promise.resolve(response);
   //    } else {
        if (response.data) {
          switch (response.data.code || response.code) {
            case 10404:
            console.log("resolve"+ 10404);
              store.commit('changeActiveIndex',store.state.activeIndex)
               store.commit("transUname",{'token':'',isLogin:false,uname:"登录",activeIndex:store.state.activeIndex})
              sessionStorage.clear();//清空
                  open5(response.data.message);
               //new Vue().$message.success(response.data.message);
              // return Promise.resolve(response);
              break;
              case 10119:
              console.log("resolve"+ 10119);
                store.commit('changeActiveIndex',store.state.activeIndex)
                 store.commit("transUname",{'token':'',isLogin:false,uname:"登录",activeIndex:store.state.activeIndex})
                sessionStorage.clear();//清空
                  open5(response.data.message)
                 //new Vue().$message.success(response.data.message);
                // return Promise.resolve(response);
                break;
              case 200 :
               return Promise.resolve(response);
          }
        }else{

      }
}, function (error) {
  // 对响应错误做点什么
  console.log(error);

  return Promise.reject(error)
 })
function open5(mesg) {
             new Vue().$alert( mesg, '提示', {
               confirmButtonText: '确定',
               callback: action => {
                 router.push('/admin/login');
                 }
             });
       }
// router.beforeEach((to, from, next) => {
// if (to.path !== '/admin/login' && !sessionStorage.getItem('token')) {
//     //next({path: '/admin/login'})
//     next();
//   } else {
//     next()
//   }
// next()
//        })





/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  echarts,
  Mock,
  ElementUI,
  //token,
  components: {
    App ,

  },
  template: '<App/>'
})
