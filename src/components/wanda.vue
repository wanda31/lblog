<template>
<div class="container">
  <div class="hello">
    <img src=".././assets/logo.png">
    <h2 >技术客</h2>
    <ul>
      <li>
        <router-link :to="{name:'main'}" @click.native="linkTo('/main')">
          博客主页
        </router-link>
      </li>
      <li>
        <router-link :to="{name:'articleList'}" @click.native="linkTo('/articleList')">
          文章列表
        </router-link>
      </li>
      <!-- <li>
        <router-link :to="{name:'edit'}"  @click.native="linkTo('admin/edit')">
          写文章
        </router-link>
      </li> -->

    </ul>
    <h2>宅客</h2>
    <ul>
      <li>
        <router-link :to="{name:'login'}" @click.native="linkTo('/admin/login')">
          私人领地，勿扰😀
        </router-link>
      </li>

    </ul>
  </div>
</div>

</template>

<script>


export default {
  name: 'wandaBlog',

  data () {
    return {

     // msg: "Welcome to wanda's blog"
    }
  },
  mounted() {
    this.$store.commit("changeActiveIndex", "/wanda");
  }
  ,
   methods: {
     linkTo(active){
       this.$store.commit("changeActiveIndex", active);
       this.$router.push({path: active})
     }

   }

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
  text-decoration: none;
}
.container{
   width:100%;
  height:100%;
   background:url("../assets/img/bgimg2.jpg") no-repeat;
  /* background:url("./assets/img/bggif.gif") center top rgb(0, 0, 0); */
  background-size: 100% 100%;

}
.hello{
  position: relative;
  top:25%;
}
</style>
