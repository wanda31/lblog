<template>
  <div id="main" class= "infinite-list-wrapper"style="overflow:auto" >
    <div id="main-content" class="main-content" >
      <SideBar></SideBar>
      <div id="right-content">
        <div class="block " >
          <el-timeline>
            <el-timeline-item class="tips">
              目前共计 {{this.sum}} 篇日志，继续加油呀！
            </el-timeline-item>
          </el-timeline>
          <el-timeline class="list"  v-infinite-scroll="load" infinite-scroll-disabled="disabled">
            <el-timeline-item  class="list-item" v-for = "(items,index) in showAticles" :key="index" :timestamp="items.article_date" placement="top">
              <el-card>
                <h4>{{items.article_title}}</h4>
                <p>wanda 提交于 {{items.article_date}}</p>
              </el-card>
            </el-timeline-item>

          </el-timeline>
         <p v-if="loading">加载中...</p>
         <p v-if="noMore">没有更多了</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import SideBar from '@/components/siderBar'
  export default {
    components:{SideBar},

    data(){
      return {
        sum:null,
        articleLists:[],
        pageCount:null,
        loading: false,
        count:5,
        showAticles:[]


      }
    },
    computed: {
          noMore () {
            return this.count >= this.articleLists.length
          },
          disabled () {
            return this.loading || this.noMore
          }
        },
    methods: {
          load () {
            this.loading = true;
            this.showAticles=this.articleLists.slice(0,this.count+=3);
            this.loading = false
          }
        },
    mounted(){
      this.$http.get("/articleList").then((res) => {

        this.sum = res.data.data[0][0].sum;
        this.pageCount= Math.ceil(this.sum/10);
        this.articleLists=res.data.data[1];
        this.showAticles=this.articleLists.slice(0,5);


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
  #right-content .block{
    padding: 50px 100px 50px;
  }
  .el-timeline{
    text-align: left;
  }
  .tips{
    font-size:18px;
  }
</style>
