<template>
<div class="MainAdmin">
      <!--头部-->
      <el-row :gutter="0">
          <!--头部左边-->
          <el-col :span="4">
            <div class="MainAdmin-top MainAdmin-top-left">
              危险辨识系统后台管理
            </div>
            <!--头部右边-->
          </el-col>
          <el-col :span="20">
            <div class="MainAdmin-top MainAdmin-top-right">
              <h2>{{ username }},欢迎您!!!</h2>
            </div>
          </el-col>
      </el-row>
      <!--中部-->
      <el-row>
         <!--中部左边-->
        <el-col :span="4">
          <div class="MainAdmin-middle-left">
            <el-menu default-active="2" class="MainAdmin-middle-left-menu"  theme="dark" router>
              <el-menu-item index="/UserManager">用户管理</el-menu-item>
              <el-menu-item index="/FileManager">法规文件管理</el-menu-item>
              <el-menu-item index="/DangerManager">危险品管理</el-menu-item>
            </el-menu>
            <el-menu default-active="2" class="el-menu-vertical-demo"  theme="dark" >   
             <el-menu-item index="1" @click="end">
              退出系统
               </el-menu-item>
               
             </el-menu>
          </div><!-- 中部左边部分结束-->
        </el-col>

         <!--中部右边-->
      <div class="MainAdmin-middle-right">
      <transition name="fade" mode="out-in">
							<router-view></router-view>
						</transition>
      </div>
      
      </el-row>
     
</div>
</template>
<script>
export default {
  data () {
    return {
      isrouter:true,
      username:this.$store.state.username
    }
  },
  methods:{
      end(){
        
        this.$confirm('确定退出系统吗？','提示',{})
        .then(() =>{
          this.$store.state.username='游客';
           this.$router.push('/');
        }).catch(() =>{

        });
      },
       isUser(){
         if(this.$store.state.username=='游客'){
          this.$alert('对不起，请先登录', '提示', {
          confirmButtonText: '去登录',
          type: 'warning'
        }).then(() => {
          this.$router.push('/')
        }).catch(() => {    
        });
          }

          }
  },
  mounted(){
      this.isUser();
      this.$router.push({ path: '/UserManager' });
  }

}
</script>

<style>
 
  .MainAdmin-top {
    height: 60px;
    background:#20A0FF;
  }

  .MainAdmin-top-left,.MainAdmin-top-right {
    border-left:1px dotted #e5e9f2;
    border-radius: 1px;
    min-height: 36px;
    font-size: 20px;
    color: black;
  }
  h1{
    font-family:Georgia;
    color: black;
  }
  h2{
    color:saddlebrown
  }
  .MainAdmin-middle-left{
    background: #48576A;
    height: 590px;
    
  }
  .bg-purple {
    background: #d3dce6;
  }
  .bg-purple-light {
    background: #e5e9f2;
  }

  .row-bg {
    padding: 10px 0;
    background-color: #f9fafc;
  }

 
</style>