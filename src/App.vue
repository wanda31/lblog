<template>
  <div id="app">
          <router-view></router-view>
  </div>
</template>

<script>

export default {
  name: 'App',
   created () {
    // //在页面加载时读取sessionStorage里的状态信息
    if (sessionStorage.getItem("store") ) {
        this.$store.replaceState(Object.assign({}, this.$store.state,JSON.parse(sessionStorage.getItem("store"))))
    }

    //在页面刷新时将vuex里的信息保存到sessionStorage里
    window.addEventListener("beforeunload",()=>{
        sessionStorage.setItem("store",JSON.stringify(this.$store.state))
    })
   },
   updated() {


   }

}
</script>

<style>
  ul {
    list-style-type: none;
    padding: 0;
  }
  a {
    text-decoration: none;
  }


html{
  height: 100%;
}
body{
  width:100%;
  height:100%;
  /* background:url("./assets/img/bgimg2.jpg") no-repeat; */
  /* background:url("./assets/img/bggif.gif") center top rgb(0, 0, 0); */
  background-size: 100% 100%;

}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  width:100%;
  height:100%;
  /* margin-top: 10px; */
}
body{
  margin:0px;
}
 #main{
    /* width:100%;
    height:100%; */
    /* background:url("./assets/img/bgimg2.jpg") no-repeat; */
    /* background:url("./assets/img/bggif.gif") center top rgb(0, 0, 0); */
    background-size: 100% 100%;
  }


</style>
