<template>
  <div id="left_menu">
    <div class="menu_name">
      <h1>wanda's Blog</h1>
      <h5>向死而生</h5>
    </div>
    <nav>
     <el-menu >
        <router-link to="/wanda" @click.native="linkTo('/wanda')">
          <li class="nav" >
            <i class="el-icon-house"></i>
            <span>首页</span>
          </li>
        </router-link>
        <router-link to="/main" @click.native="linkTo('/main')">
          <li class="nav" >
            <i class="el-icon-collection"></i>
            <span>博客主页</span>
          </li>
        </router-link>
        <router-link to="/articleList" @click.native="linkTo('/articleList')">
          <li class="nav" >
            <i class="el-icon-notebook-1"></i>
            <span>文章列表</span>
          </li>
        </router-link>
        <!-- <router-link to="/admin/edit" @click.native="linkTo('admin/edit')">
          <li class="nav">
            <i class="el-icon-edit"></i>
            <span>写文章</span>
          </li>
        </router-link> -->
        <router-link to="/admin/private" @click.native="linkTo('/admin/edit')">
          <li class="nav">
            <i class="el-icon-user"></i>
            <span>个人中心</span>
          </li>
        </router-link>
     </el-menu>
    </nav>
    <div class="info">
      <img src="../assets/logo1.png" alt="head">
      <audio controls style="position: relative;bottom:25px;background-color: cadetblue;">
        <source src="../../server/audio/米津玄師 - Lemon.mp3" type="audio/mpeg">
        <source src="../../server/audio/朴树 - 平凡之路.mp3" type="audio/mpeg">
        您的浏览器不支持 audio 元素。
      </audio>
      <FullCalendar
        defaultView="dayGridMonth"
        :plugins="calendarPlugins"
        :weekends="true"
        :locale="esLocale"
        :events="[
          { title: 'event 1', date: '2019-04-01' },
          { title: 'event 2', date: '2019-04-02' }
        ]"
        />

    </div>
  </div>
</template>

<script>
  import FullCalendar from '@fullcalendar/vue'
  import dayGridPlugin from '@fullcalendar/daygrid'
  import '@fullcalendar/core/main.css';
  import '@fullcalendar/daygrid/main.css';
  import { Calendar } from '@fullcalendar/core';//日历插件
  //import esLocale from '@fullcalendar/core/locales/zh-cn';//语言环境


  export default {
    name: 'sidebar',
    components: {
      FullCalendar // make the <FullCalendar> tag available
    },
    data() {
      return {
        articleNumber: '',
         calendarPlugins: [ dayGridPlugin ],
         esLocale:"",
         isActive:true
      }
    },
    mounted: function () {
        // let indexNav= document.getElementsByClassName("nav");

        // for(let i=0;0<indexNav.length;i++){
        //   console.log(indexNav[i]);
        //      if(indexNav[i].attributes[0].value==this.$store.state.activeIndex){
        //        indexNav[i].style.background="red"
        //      }
        // }
        // $indexNav.forEach(function(){
        //   console.log(this);
        // })
      //console.log(esLocale);
    },
    methods:{
      linkTo(active){
        console.log(this.$store.state.isLogin);
        this.$store.commit("changeActiveIndex", active);
        if(this.$store.state.isLogin == false && active =="/admin/edit"){
             this.$router.push({path: '/admin/login'})
        }else{
           this.$router.push({path:active})
        }
      },
      handleDateClick(arg) {
          alert(arg.date)
        }
    }
  }
</script>

<style>
  #main{
    marin:20px 200px;
  }
  #left_menu {
    float: left;
    width: 340px;
    margin-right: 20px;
  }

  @media (max-width: 767px) {
    #left_menu {
      display: none;
    }
  }

  #left_menu a:hover {
    color: #222;
    background: #f5f7f9;
  }

  .menu_name {
    background:cadetblue;
    color: white;
    padding: 5px 0;
    /* background: url(../assets/logo4.png) ;
    background-size: 100% 100%; */
  }

  nav {
    background: white;
    padding: 2px 0;
  }

  .nav {
    padding: 5px 20px;
    text-align: left;
    color: #555;
  }
  .router-link-active .nav{
    background-color: cadetblue;
  }
  .nav i{
    margin-right:5px;
  }
  .info {
    margin-top: 10px;
    background: white;
    padding:0px 10px 10px 10px;
  }

  .info_name {
    font-weight: 600;
    padding: 5px;
  }

  .info img {
    width: 70%;
    height: 70%;
  }
  /* 改变日历插件样式 */
  .fc-dayGrid-view .fc-body .fc-row {
    min-height: 2.5em;
  }
  body .fc {
    font-size: 14px;
  }
  .fc-button{
    padding:5px;
  }
  .fc-unthemed th, .fc-unthemed td, .fc-unthemed thead, .fc-unthemed tbody, .fc-unthemed .fc-divider, .fc-unthemed .fc-row, .fc-unthemed .fc-content, .fc-unthemed .fc-popover, .fc-unthemed .fc-list-view, .fc-unthemed .fc-list-heading td{
    border:none;
  }
  .fc .fc-row .fc-content-skeleton table, .fc .fc-row .fc-content-skeleton td, .fc .fc-row .fc-mirror-skeleton td{
    text-align: center;
  }
  .fc-ltr .fc-dayGrid-view .fc-day-top .fc-day-number{
    float:none;
  }
  .fc-unthemed td.fc-today {
    border:none;
    background:cadetblue;
  }
</style>
