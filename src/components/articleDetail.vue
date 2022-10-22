<template>
  <article>
    <h3 style="text-align:center">{{title}}</h3>
   <!-- <img src="../../server/uploads/image/bgimg2.jpg" alt="bgimg2.jpg"> -->
   <img src="../../server/uploads/image/9.png" alt="bgimg2.jpg">
    <el-row v-show="isLogin">
      <el-button @click="changeToEdit">编辑</el-button>
      <el-button @click="updateArticle">更新</el-button>
    </el-row>
    <mavon-editor @change="changeData" :value="mdContent" v-model="content" @imgAdd="$imgAdd" ref="md" :subfield="false"
      :defaultOpen="'preview'" :toolbarsFlag='toolbarsFlag' :editable="editable" :scrollStyle="true" :ishljs="true"
      :externalLink="false" />
  </article>

</template>

<script>
  import {
    mavonEditor
  } from 'mavon-editor'
  import 'mavon-editor/dist/css/index.css'
  import 'github-markdown-css/github-markdown.css'

  export default {
    name: 'MainContent',
    components: {
      mavonEditor,
    },
    data() {
      return {
        article_id: this.$route.query.article_id,
        mdContent: "",
        title: "",
        isLogin: this.$store.state.isLogin,
        toolbarsFlag: false,
        editable: false,
        html: "",
        content: ""

      };
    },
    computed: {

    },
    methods: {
      changeToEdit() {
        this.toolbarsFlag = true;
        this.editable = true;
      },
      updateArticle() {
        this.$http.post("/updateArticleDetail", {

          article_content: this.content,
          article_html: this.html,
          article_id: this.$route.query.article_id,
        }).then((res) => {
          if(res.data){
            //this.$store.commit("changeActiveIndex", active);
            this.$router.push({path: '/main'});
          }else{
            this.$message.success('更新失败！');
          }
          console.log(this.$route.query.article_id);
        })
      },
      changeData(value, render) {
        this.content = value;
        this.html = render;
      },
      // 绑定@imgAdd event
      async $imgAdd(pos, $file) {
        // 第一步.将图片上传到服务器.
        var formdata = new FormData();
        console.log(formdata, $file)
        formdata.append('image', $file);
        this.$http({
          url: '/image_upload',
          method: 'post',
          data: formdata,
          headers: {
            'Content-Type': 'multipart/form-data'
          },
        }).then((res) => {
          console.log(res)
          // 第二步.将返回的url替换到文本原位置![...](0) -> ![...](url)
          /**
           * $vm 指为mavonEditor实例，可以通过如下两种方式获取
           * 1. 通过引入对象获取: `import {mavonEditor} from ...` 等方式引入后，`$vm`为`mavonEditor`
           * 2. 通过$refs获取: html声明ref : `<mavon-editor ref=md ></mavon-editor>，`$vm`为 `this.$refs.md`
           */
          //this.$refs.md.$imgUpdateByUrl(pos, res.data.url);
          this.$refs.md.$img2Url(pos, "http://localhost:8080/static/image/"+res.data.data.url);
          this.$message.success('上传成功！');
        })
      },
    },
    mounted() {
      //article_id=this.$route.query.article_id;
      this.$http.get('/articleDetail', {
        params: {
          article_id: this.$route.query.article_id
        }
      }).then((res) => {
        console.log(res.data);
        if (this.isLogin) {
          console.log(this.toolbarsFlag + "---------toolbarsFlag");
          //this.mdContent=res.data.data[0].article_content;
          this.content=res.data.data[0].article_content;
          // if (this.toolbarsFlag) {
          //   this.content = res.data.data[0].article_content;
          // } else {
          //   this.content = res.data.data[0].article_html;
          // }


        } else {
          //this.mdContent=res.data.data[0].article_html;
          this.content = res.data.data[0].article_html;
          //this.content=res.data.data[0].article_content;
        }
        //this.content=res.data.data[0].article_html;
        this.title = res.data.data[0].article_title;

      })
    },
  }
</script>

<style>
  .markdown-body {
    /* 编写容器的一些css，根据需要进行调整，这里是我博客的，在github提供的.markdown-body基础上修改的 */
    box-sizing: border-box;
    min-width: 200px;
    /* max-width: 980px; */
    /* padding: 45px; */
    max-width: 98%;
    margin: 0 auto;
    box-shadow: 2px 4px 6px gray;
    /* padding-left: 20px;
    padding-right: 15px;
    padding-top: 40px; */
    padding-bottom: 45px;
    margin-bottom: 100px;
    border: none;
  }

  .v-show-content {
    background: none;
  }
</style>
