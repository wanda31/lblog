<template>
  <div class="container">
     <el-container>
        <el-form :model="loginINfo" ref="loginINfo" label-width="100px" class="demo-ruleForm">
          <el-form-item prop="userName" label="用户名" :rules="[{ required: true, message: '请输入用户名'}]">
            <el-input type="userName" v-model="loginINfo.userName" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item prop="password" label="密码" :rules="[{ required: true, message: '请输入密码'}]">
            <el-input type="password" v-model="loginINfo.password" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" v-on:click="submitForm(loginINfo.userName,loginINfo.password)">登录</el-button>

          </el-form-item>
        </el-form>

     </el-container>

  </div>


</template>

<script>
 export default {
   name:"Login",
   data(){
        return {
          loginINfo:{
            userName:"",
            password:""
          },

        }
   },
   methods:{
     submitForm:function(name,password){
              // axios.get('/', {params: ''})
                this.$http.get('/admin/login', {params: {uname: name,upwd:password}}).then( (res) => {
                  console.log(res);
                  let resdata=res.data.data;
                  if(res.data.code==200){
                    this.$router.push({path:this.$store.state.activeIndex});
                    sessionStorage.setItem("token",res.data.token);
                     sessionStorage.setItem("uname",resdata[0].uname);
                     
                    this.$store.commit("transUname",{activeIndex: this.$store.state.activeIndex,uid:resdata[0].uid,uname:resdata[0].uname,isLogin:true,"token":res.data.token});
                    sessionStorage.setItem("store",JSON.stringify(this.$store.state))
                  }else{
                        this.open5();
                  }

                }).catch(error => console.log(error))
              },
         open5:function() {
                this.$alert('<strong>该账号或密码错误，如有问题请联系客服</strong>', '提示', {
                  dangerouslyUseHTMLString: true
                });
                }

   },

 }
</script>

<style scoped>
  .container{
    margin:0;
    padding:0;
    width:100%;
    height:100%;
    background-color: bisque;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .el-container{
    height:50%;
    align-items: center;
    margin-left:0;
  }
   .el-form{
    width:40rem;
    margin:0 auto;
  }
  .el-form-item{
    width: 30rem;

  }
  /*
  .el-input{
    width:30%;
  }
  .el-form-item__error{
    width:100%;
  } */
</style>
