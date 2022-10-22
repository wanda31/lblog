<template>
  <div id="main">
    <div id="main-content" class="main-content">
      <SideBar></SideBar>
      <div id="right-content">
        <section>
          <article v-for="items in currentPageData" class="article">
              <header class="article_header">
                <h2 class="title">{{items.article_title}}</h2>
                <span><i class="el-icon-notebook-1"></i> 发表于: {{items.article_date}}</span>
                <span style="margin-left: 20px;"><i class="el-icon-folder"></i> 分类：{{items.article_type}}</span>
              </header>
              <div class="contentOutline">
                <p>{{items.article_brief}}</p>
                  <el-button size="medium" @click="linkTo('/articleDetail',items.article_id)">阅读全文 >></el-button>
              </div>
              <footer>
                <div class="article_footer"></div>
              </footer>
          </article>
          <el-pagination
            :page-size="10"
            :page-count="pageCount"
            layout="prev, pager, next"
            :total="total"
            @current-change="currentChange"
            >
          </el-pagination>
        </section>
      </div>
      <el-backtop target=".main-content" :bottom="100">
          <div
            style="{
              height: 100%;
              width: 100%;
              background-color: #f2f5f6;
              box-shadow: 0 0 6px rgba(0,0,0, .12);
              text-align: center;
              line-height: 40px;
              color: #1989fa;
            }"
          >
            UP
          </div>
        </el-backtop>
    </div>
  </div>

</template>

<script>
  import SideBar from '@/components/siderBar'

  export default {
    components:{SideBar},
    data () {
      return {
          total:0,
          pageCount:0,
          allData:[],
          currentPageData:[]
       // msg: "Welcome to wanda's blog"
      }
    },
    beforeDestroy:function(){

    },
    computed:{

    },
     methods: {
       linkTo(active,article_id){
         this.$store.commit("changeActiveIndex", active);
         this.$router.push({name: 'articleDetail',query:{article_id:article_id}})
          // this.$router.push({name: active,params:{article_id:article_id}})//通过此种路由传参。不能用path，只能用name
       },
       //返回当前页按钮数字
       currentChange(val){
          this.currentPageData = this.allData.slice((val-1)*10,val*10);
       },

     },
     mounted(){
       this.$http.get("/articleList").then((res) => {
                this.total=res.data.data[0][0].sum;
                this.pageCount= Math.ceil(this.total/10);
                this.allData = res.data.data[1];
                 this.currentPageData = this.allData.slice(0,10);
       })
     }

  }


</script>

<style scoped>
p{
  margin:0;
  padding:0;
}
h2{
  margin-bottom: 10px;
  padding-top: 20px;
}
#main{
  background-color: #f7f4f1;
  height: 100%;
}
#main-content{
  display: block;
  padding:30px 150px;
  padding-bottom: 0px;;
  min-height:96%;
  background-color: #f7f4f1
}
#main-content::after{
  content:".";
  display: block;
  clear:both;
}
#right-content{
  float:left;
  width:calc(100% - 360px);
  background: #fff;
  height:100%;
}
#right-content section{
  margin-top:80px;
}

.article{
  width: 85%;
  margin: 0 auto;
  /* margin: 10 40px; */
  box-shadow: 0px 0px 3px 2px powderblue;
  /* background-color: rgb(251, 251, 251); */
  border-bottom: 1px solid wheat;;
}
.article_header{
  color: #999;
  font-family: 'Lato', "PingFang SC", "Microsoft YaHei", sans-serif;
  font-size: 12px;
  text-align: center;
}
.article_header .title{
  font-size: 26px;
  text-align: center;
  word-break: break-word;
  font-weight: 400;
  font-family: 'Lato', "PingFang SC", "Microsoft YaHei", sans-serif;
  color:black;
}
.contentOutline{
  width:85%;
  margin:2.25rem auto;
   /* box-shadow: 2px 4px 6px gray; */
}
.contentOutline p{
  text-align: left;
   /* box-shadow: 2px 4px 6px gray; */
}
.article_footer{
  display: block;
  margin: 80px auto 60px;
  width: 8%;
  height: 1px;
  background: #ccc;
  text-align: center;
}

.el-pagination{
  padding:20px 10px;
}
.el-button--medium, .el-button--medium.is-round {
  border:2px solid cadetblue;
  padding: 9px 15px;
  margin-top: 50px;
}

</style>
