<template>
<div id="login">
  <div id="login_img"><img src="./img/login.jpg" /></div>
  <div id="login_main">
      <div id="login_main_top">
        <h1>危品辨别系统管理员登录</h1>
        <a>用户名密码都是admin1 </a>
      </div><!-- main头部结尾-->
      <div id="login_main_center">   
          <el-form :model="loginForm"  ref="loginForm" label-width="55px" class="demo-ruleForm">
            <el-form-item label="用户名" prop="username" >
              <el-input type="text" v-model="loginForm.username" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="密码" prop="password">
              <el-input type="password"  v-model="loginForm.password" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item>
              <span id="login_button_user"><el-button type="primary" @click="doLogin">登录</el-button></span>
              <span id="relogin_button_admin"><el-button type="success" @click="relogin">返回普通用户登录界面</el-button></span>
            </el-form-item>
        </el-form>
      </div><!-- main中部结尾-->
  </div><!-- main结尾-->
</div><!-- login结尾-->
</template>
<script>
  export default {
    data() {
      return {
        loginForm: {
          username: '',
          password: ''
        },
        loading:false
      };
    },
    methods: {
       //登录加载过渡效果的方法
        load(){
           this.loading = true;
           setTimeout(() => {this.loading = false; }, 1000);
           this.$Loading.start();
           setTimeout(() => {this.$Loading.finish();}, 1000); 
        },
        change(id,username,password,email,phone){
          this.$store.state.manager_id=id;
          this.$store.state.username=username;
          this.$store.state.password=password;
          this.$store.state.phone=phone;
           this.$store.state.email=email;
        },
        doLogin(){
            var _this = this;
            this.$http.get('/api/manager/login'
            ,{
              params:{
                username:this.loginForm.username,
                password:this.loginForm.password
              }, 
            }
            )
            .then(function (response) {
              var errorcode=response.data.errorcode;
                 if(errorcode=="200"){
                       //进去主界面的过渡效果方法
                      _this.load();
                      //把获取到的参数存入store
                      _this.change(response.data.data.id,_this.loginForm.username,_this.loginForm.password
                      ,response.data.data.email,response.data.data.phone);
                      setTimeout(() => {_this.$router.push({ path: '/MainAdmin' });}, 1500); 
                }else{
                     //如果返回500，就在页面上方弹出错误信息
                    _this.$message.error(response.data.errormsg);
                }
              })
            .catch(function (error) {
                console.log(error);
            });
    },
    relogin(){
      this.$confirm('确定返回普通用户登录界面吗？','提示',{

      }).then(() =>{
       this.$router.back();
      }).catch(() =>{
      });
      ;
    },

  }
}
</script>

<style>


/*登录form*/
#login{
  width: 100%;
  margin: 0 auto;
  /*position:relative;*/
  background-color:black;
}
/*登录背景*/
#login_img{
  height: 720px;
  position:absolute
}

/*输入框*/
#login_main{
   width: 400px;
   margin:250px 50px 200px 450px;
   border:1px solid black;
   opacity:0.8;
   border-radius:10px;
   box-shadow:inset 0 0 1px 1px #ccc;
   position:absolute;
   background-color:white;
}
#login_main_top{
  /*background-color:green;*/
   font-family: 'Open Sans',sans-serif;  
  text-align: center;
}
#login_main_center{
   margin: 0px 30% 0px 0px;
   /*background-color:green;*/
}

/*登录按钮*/
#login_button_user{
  /*margin-right:x;*/
}

/*返回登录按钮*/
#relogin_button_admin{


}


  </style>