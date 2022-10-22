<template>
  <div id="sidebar">
  <span @click="showMenus" class="showMenuIcon">
    <i class="el-icon-s-fold" v-show="!isCollapse"></i>
    <i class="el-icon-s-unfold" v-show="isCollapse"></i>
  </span>
  <el-menu :default-active="activeIndex" @select="handleSelect" class="el-menu-vertical-demo" id="el-menu-vertical-demo" @open="handleOpen" @close="handleClose" :collapse="isCollapse">
    <el-submenu index="/admin/three/snow">
      <template slot="title">
        <i class="el-icon-location"></i>
        <span slot="title">threejs动画</span>
      </template>
       <el-menu-item-group>
        <el-menu-item index="/admin/three/snow" @click.native="linkTo('/admin/three/snow')">
          <i class="el-icon-light-rain"></i>
          <span slot="title">snow</span>
        </el-menu-item>
        <el-menu-item index="/admin/three/sunRise" @click.native="linkTo('/admin/three/sunRise')">
          <i class="el-icon-sunrise-1"></i>
          <span slot="title">sunRise</span>
        </el-menu-item>
      </el-menu-item-group>

    </el-submenu>
    <el-menu-item index="/admin/echart" @click.native="linkTo('/admin/echart')">
      <i class="el-icon-s-data"></i>
      <span slot="title">echarts图表</span>
    </el-menu-item>
     <el-menu-item index="/admin/edit" @click.native="linkTo('/admin/edit')">
      <i class="el-icon-document"></i>
      <span slot="title">写文章</span>
    </el-menu-item>
    </el-menu-item>
     <el-menu-item index="/main" @click.native="linkTo('/main')">
      <i class="el-icon-house"></i>
      <span slot="title">博客主页</span>
    </el-menu-item>
    <div class="friendLinks">
      <p>友情链接</p>
      <div>
        <a href="https://www.cnblogs.com/liuzhibin/p/5944821.html" target="_blank">前端组件合集</a>
        <a href="https://cssbattle.dev/?utm_source=xinquji" target="_blank">css Battle</a>
        <a href="http://zh.learnlayout.com/" target="_blank">css布局</a>
        <a href="https://leetcode-cn.com/" target="_blank">leetCode</a>
        <a href="https://learn.unrealengine.com/home/dashboard" target="_blank">虚幻4</a>
        <a href="https://es6.ruanyifeng.com/" target="_blank">ES6</a>
        <a href="http://www.iread.cf/" target="_blank">iread电子书下载</a>
        <a href="http://www.neea.cn/" target="_blank">教育考试网</a>
        <a href="http://chuquan.me/" target="_blank">楚权的世界</a>
      </div>
    </div>
  </el-menu>

  </div>
</template>


<style>
  #sidebar{
    position: absolute;
    height:100%;
    float:left;
    text-align: left;
    z-index:100000;
  }
  .el-menu-vertical-demo:not(.el-menu--collapse) {
    width: 200px;
    height:100%;
    /* min-height: 400px; */
  }
  .el-menu--collapse {
    display:none;
  }
  .showMenuIcon{
    line-height: 40px;
    float: left;
    width:1px;
  }
  .el-icon-s-unfold{
    transform: scale(2.5);
    top:10px;
    left: 20px;
    position: relative;
    /* z-index: 20; */
  }
  .el-icon-s-fold{
    transform: scale(2.5);
    left: 220px;
    top: 20px;
    position: relative;
    float: left;
   /* z-index: 20; */
  }
  .friendLinks{
    height:200px;
  }
  .friendLinks p{
    background-color: #BCE8F1;
    padding: 5px;
  }
  .friendLinks div{
    font-size: 12px;
    padding:2px 12px;
    display: flex;
    flex-wrap: wrap;
  }
  .friendLinks div a{
    margin:5px;
  }
</style>

<script>
  //import EchartTest from './echarts/test.vue'

  export default {

    data() {
      return {
        isCollapse: false,
        screenWidth: 0,
        activeIndex:''
      };
    },
    watch:{

    },
    mounted() {
          // if(window.innerWidth < 600){
          //   console.log("111");
          //   var showside=document.getElementById("el-menu-vertical-demo");
          //   console.log(showside);
          //   showside.style.display ="none"
          // }
          this.activeIndex=this.$store.state.activeIndex
    },
    methods: {
      showMenus(){
        this.isCollapse = !this.isCollapse;
      },
      linkTo(active){
        this.$store.commit("changeActiveIndex", active);
        if(this.$store.state.isLogin == false && active =="admin/private"){
             this.$router.push({path: '/admin/login'})
        }else{
           this.$router.push({path:active})
        }
      },
       handleSelect(key, keyPath) {
              console.log(key, keyPath);
              this.$store.commit("changeActiveIndex", key);
       },
      handleOpen(key, keyPath) {
        console.log(key, keyPath);
      },
      handleClose(key, keyPath) {
        console.log(key, keyPath);
      }
    }
  }
</script>
