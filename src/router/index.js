import Vue from 'vue'
import Vuex from 'vuex'
import Router from 'vue-router'
import store from'../store'
import { mavonEditor } from 'mavon-editor'
import 'mavon-editor/dist/css/index.css'
import { ElementUI } from 'element-ui';

//版本一
//import HelloWorld from '@/components/HelloWorld'
// import Blog from '@/components/pages/Blog'
// import Login from '@/components/login/login'
// import Article from '@/components/pages/tech/Article'
// import Contact from '@/components/pages/tech/Contact'
// import Video from '@/components/pages/tech/Video'
// import Other from '@/components/pages/tech/Other'

//博客前台部分
import Wanda from '@/components/wanda'//首页
import ArticleDetail from '@/components/articleDetail'//文章详情页
import Main from '@/components/main'//主页
import ArticleList from '@/components/articleList'//文章归档列表
import SideBar from '@/components/siderBar'


//个人中心
import ArticleEdit from '@/components/admin/articleEdit.vue'//文章编辑页
import Login from '@/components/admin/login.vue'//登录页
import Echart from '@/components/admin/echart.vue'//echarts
import Snow from '@/components/admin/three/snow'//three
import SunRise from '@/components/admin/three/sunRise'



Vue.use(Router)
Vue.use(Vuex)
Vue.use(mavonEditor)

const VueRouterPush = Router.prototype.push //解决路由跳转的时候同一个路由多次添加是不被允许的问题
Router.prototype.push = function push (to) {
    return VueRouterPush.call(this, to).catch(err => err)
}

// if (sessionStorage.getItem('token')) {
//   store.commit("transUname",{'token':sessionStorage.getItem('token')})
// }
export default new Router({
  mode:'history',
  routes: [
      {
        path: '/',//首页
        name: 'index',
        component: Wanda,
      },
      {
        path: '/wanda',//首页
        name: 'wandaBlog',
        component: Wanda,
      },
      {
        path: '/main',//博客主页
        name: 'main',
        components: {default:Main,sidebar:SideBar},
      },
      {
        path: '/articleList',//文章归档列表
        name: 'articleList',
        components: {default:ArticleList,sidebar:SideBar},
      },
      {
        path: '/articleDetail',//文章详情页
        name: 'articleDetail',
        component: ArticleDetail,
      },
        {
          path: '/admin/login', // 登录页
          name: 'login',
          component: Login,
        },
        {
          path:'/admin',
          component:ArticleEdit,
          // children:[
          //   {path:'/private',component: Private},
          //   {path:'/edit',component: ArticleEdit},
          //   {path:'/personnal', component: mySpace}
          // ]
        },
        {
          path: '/admin/echart', // 登录页
          name: 'echart',
          component: Echart,
        },
      {
        path: '/admin/edit',//文章编辑页
        name: 'edit',
        component: ArticleEdit,
      },
      {
        path: '/admin/three/snow',//文章编辑页
        name: 'snow',
        component: Snow,
      },
      {
        path: '/admin/three/sunRise',//文章编辑页
        name: 'sunRise',
        component: SunRise,
      },







  ]







})
