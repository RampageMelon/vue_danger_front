<template>
  <section>
		<label>用户名<input type="text" v-model="username"></input></label>
		密码<input type="password" v-model="password"></input>
        <button  @click="doLogin">登录</button>
	</section>
</template>

<script>

export default {
  
  name: 'hello',
  data () {
    return {
            username:'',
            password:''            
    }
  },
  computed: {
    username () {
      return this.$store.state.username
    },
    password () {
      return this.$store.state.password
    }
  },
  methods:{
        doLogin(){
          //对应vuex/store.js的mutations: {login
            this.$store.commit('login', {
            username:this.username,
            password:this.password
           })

           
            var _this = this;
            this.$http.get('/api/user'
            ,{
              params:{
                username:this.username,
                password:this.password
              }, 
            }
            )
            .then(function (response) {
              var errorcode=response.data.errorcode;
                 if(errorcode=="200"){
                     _this.$router.push({ path: '/Hello' });
                }else{
                     _this.$router.push({ path: '/Error' });
                }
              })
            .catch(function (error) {
                console.log(error);
            });
             
              
           
    }
  }
}
</script>


<style >

</style>
