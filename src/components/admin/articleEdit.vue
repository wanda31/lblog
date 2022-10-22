<template>
  <div id="content-wrap">
    <SideBar></SideBar>
  <div class="markdown">
    <div class="m_header">
      <p>编辑正文</p>
      <div class="demo-input-size">
        <el-input  size="medium" placeholder="请输入文章标题" v-model="input_title" class="input-with-select">
          <el-select v-model="select" slot="prepend" placeholder="原创">
            <el-option label="原创" value="原创"></el-option>
            <el-option label="转载" value="转载"></el-option>
          </el-select>

        </el-input>

        <el-input :autosize="true" type="textarea" placeholder="请输入概述" v-model="textarea" maxlength="500" show-word-limit>

        </el-input>

      </div>
      <el-main>
        <el-tag :key="tag" v-for="tag in dynamicTags" closable :disable-transitions="false" @close="handleClose(tag)">
          {{tag}}
        </el-tag>
        <el-input class="input-new-tag" v-if="inputVisible" v-model="inputValue" ref="saveTagInput" size="small"
          @keyup.enter.native="handleInputConfirm" @blur="handleInputConfirm">
        </el-input>
        <el-button v-else class="button-new-tag" size="small" @click="showInput">+ New Tag</el-button>
      </el-main>
      <el-button @click="submit">提交</el-button>
    </div>
    <div class="container">

      <mavon-editor v-model="content" :toolbars="toolbars" :ishljs="true" ref="md" @imgAdd="$imgAdd" @change="change"
        @save="saveArticle" style="min-height: 600px;margin-top: 20px;" :externalLink="externalLink" :subfield = "subfield"
      :code_style="code_style"/>

    </div>
  </div>
  </div>
</template>

<script>
  import {
    mavonEditor
  } from 'mavon-editor'
  import 'mavon-editor/dist/css/index.css'
  import Vue from 'vue'
  import SideBar from './sideBar.vue'
  Vue.use(mavonEditor)

  export default {
    name: "",
    // props: [],
    components: {
      mavonEditor,SideBar
    },
    data() {
      return {

        input_title: '',
        select: "",
        dynamicTags: [],
        inputVisible: false,
        inputValue: '',
        content: '',
        html: '',
        textarea:"",
        img_file: {},
        subfield: true,
        code_style: 'solarized-dark',
        externalLink:{
           markdown_css: function() {
                          // 这是你的markdown css文件路径
                          return '/markdown/github-markdown.min.css';
                      },
                      hljs_js: function() {
                          // 这是你的hljs文件路径
                          return '/highlightjs/highlight.min.js';
                      },
                      hljs_css: function(css) {
                          // 这是你的代码高亮配色文件路径
                          return '/highlightjs/styles/' + css + '.min.css';
                      },
                      hljs_lang: function(lang) {
                          // 这是你的代码高亮语言解析路径
                          return '/highlightjs/languages/' + lang + '.min.js';
                      },
                      katex_css: function() {
                          // 这是你的katex配色方案路径路径
                          return '/katex/katex.min.css';
                      },
                      katex_js: function() {
                          // 这是你的katex.js路径
                          return '/katex/katex.min.js';
                      },
        },
        toolbars: {
          bold: true, // 粗体
          italic: true, // 斜体
          header: true, // 标题
          underline: true, // 下划线
          strikethrough: true, // 中划线
          mark: true, // 标记
          superscript: true, // 上角标
          subscript: true, // 下角标
          quote: true, // 引用
          ol: true, // 有序列表
          ul: true, // 无序列表
          link: true, // 链接
          imagelink: true, // 图片链接
          code: true, // code
          table: true, // 表格
          fullscreen: true, // 全屏编辑
          readmodel: true, // 沉浸式阅读
          htmlcode: true, // 展示html源码
          help: true, // 帮助
          /* 1.3.5 */
          undo: true, // 上一步
          redo: true, // 下一步
          trash: true, // 清空
          save: true, // 保存（触发events中的save事件）
          /* 1.4.2 */
          navigation: true, // 导航目录
          /* 2.1.8 */
          alignleft: true, // 左对齐
          aligncenter: true, // 居中
          alignright: true, // 右对齐
          /* 2.2.1 */
          subfield: true, // 单双栏模式
          preview: true, // 预览
          ishljs: true
        },
      }
    },
    computed: {

    },
    methods: {
      // changeWidth(){
      //   if()
      // },
      //tag标签类方法
      handleClose(tag) {
        this.dynamicTags.splice(this.dynamicTags.indexOf(tag), 1);
      },

      showInput() {
        this.inputVisible = true;
        this.$nextTick(_ => {
          this.$refs.saveTagInput.$refs.input.focus();
        });
      },

      handleInputConfirm() {
        let inputValue = this.inputValue;
        if (inputValue) {
          this.dynamicTags.push(inputValue);
        }
        this.inputVisible = false;
        this.inputValue = '';
      },
      // 绑定@imgAdd event
      async $imgAdd(pos, $file) {
        // 第一步.将图片上传到服务器.
        var formdata = new FormData();
        console.log(formdata, $file)
        formdata.append('image', $file);
        console.log(formdata);
        this.$http({
          url: '/image_upload',
          method: 'post',
          data: formdata,
          headers: {
            'Content-Type': 'multipart/form-data'
          },
        }).then((res) => {
          console.log(res);
          console.log(res.data.data.url);
          console.log(pos);
          let url = res.data.url || res.data.data.url
          // 第二步.将返回的url替换到文本原位置![...](0) -> ![...](url)
          /**
           * $vm 指为mavonEditor实例，可以通过如下两种方式获取
           * 1. 通过引入对象获取: `import {mavonEditor} from ...` 等方式引入后，`$vm`为`mavonEditor`
           * 2. 通过$refs获取: html声明ref : `<mavon-editor ref=md ></mavon-editor>，`$vm`为 `this.$refs.md`
           */
          this.$refs.md.$img2Url(pos, "http://localhost:8080/server/uploads/image/"+url +'?'+Math.random());
          this.$message.success('上传成功！');
        })
      },
      // 所有操作都会被解析重新渲染
      change(value, render) {
        // render 为 markdown 解析后的结果[html]
        this.html = render;
      },
      saveArticle(value, render) {

        console.log(value)
      },

      // 提交
      async submit() {
        if (this.$store.state.uid) {
          let paramsInfo = {
            'uid': this.$store.state.uid,
            'article_title': this.input_title,
            'article_content': this.content,
            'article_date': getDateTime(),
            'article_html': this.html,
            'article_tag': JSON.stringify(this.dynamicTags),
            'article_type': this.select,
            'article_brief':this.textarea
          }
          if (this.select == "") {
            this.$message.success('请选择文章类型！');
          } else if (this.input_title == "") {
            this.$message.success('请输入文章标题！');
          } else {
            this.$http.post('/admin/edit', paramsInfo).then((res) => {
              console.log(": " + res.code);
              if(res.data.code == 200){
                this.$message.success('提交成功，已成功插入数据库！');
              }else if(res.code == 10404){
                this.open5();
              }

            }).catch((err)=>{
              });
          }

        } else {
          this.$message.success('该功能只对博主开放🙂');
        }
      },
      open5:function() {
             this.$alert('<strong>token已过期，请重新登录！</strong>', '提示', {
               confirmButtonText: '确定',
               callback: action => {
                 this.$message({
                   type: 'info',
                   message: `action: ${ action }`
                 });
                 }
             });
       }
    },
    mounted() {

    }
  }


  function getDateTime() {
    var date = new Date();
    var seperator1 = "-";
    var year = date.getFullYear();
    var month = date.getMonth() + 1;
    var strDate = date.getDate();
    if (month >= 1 && month <= 9) {
      month = "0" + month;
    }
    if (strDate >= 0 && strDate <= 9) {
      strDate = "0" + strDate;
    }
    var currentdate = year + seperator1 + month + seperator1 + strDate;
    console.log(currentdate);
    return currentdate;

  }
</script>


<style>
  #content-wrap{
    height:100%;
    width:100%;
  }
  .markdown {
    padding: 20px;
    height: 600px;
    z-index: 10;
    margin: 0 auto;
  }

  .m_header {
    line-height: normal;
    display: inline-table;

    border-collapse: separate;
    border-spacing: 0;
  }

  .el-select .el-input {
    width: 130px;
  }
  .el-textarea{

  }
  .el-input-group{

    margin-bottom: 20px;

  }
  .input-with-select .el-input-group__prepend {
    background-color: #fff;

  }

  .el-tag+.el-tag {
    margin-left: 10px;
  }

  .button-new-tag {
    margin-left: 10px;
    height: 32px;
    line-height: 30px;
    padding-top: 0;
    padding-bottom: 0;
  }

  .input-new-tag {
    width: 90px;
    margin-left: 10px;
    vertical-align: bottom;
  }
  .container{
    z-index: 10;
  }
</style>
