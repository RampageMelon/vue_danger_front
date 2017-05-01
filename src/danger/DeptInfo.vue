<template>
 
   
 
      <div id="dept_info">
           <h2>单位信息</h2>
          <el-form :inline="true" :model="deptInfo" ref="deptInfo" label-width="70px" class="deptInfo-ruleForm">
            <el-form-item label="用户名" prop="username" >
              <el-input type="text" v-model="deptInfo.username" auto-complete="off" :disabled="true"></el-input>
            </el-form-item>
            <el-form-item label="密码" prop="password">
              <el-input type="password"  v-model="deptInfo.password" auto-complete="off" :disabled="true"></el-input>
            </el-form-item>
             <el-form-item label="单位编号" prop="dept_code" >
              <el-input type="text" v-model="deptInfo.dept_code" auto-complete="off" :disabled="isEdit"></el-input>
            </el-form-item>
            <el-form-item label="单位名称" prop="dept_name" >
              <el-input type="text" v-model="deptInfo.dept_name" auto-complete="off" :disabled="isEdit"></el-input>
            </el-form-item>
            <el-form-item label="地址" prop="address" >
              <el-input type="text" v-model="deptInfo.address" auto-complete="off" :disabled="isEdit"></el-input>
            </el-form-item>
            <el-form-item label="电话" prop="phone" >
              <el-input type="text" v-model="deptInfo.phone" auto-complete="off" :disabled="isEdit"></el-input>
            </el-form-item>
            <el-form-item label="负责人" prop="principal" >
              <el-input type="text" v-model="deptInfo.principal" auto-complete="off" :disabled="isEdit"></el-input>
            </el-form-item>
            <el-form-item label="邮箱" prop="email" >
              <el-input type="text" v-model="deptInfo.email" auto-complete="off" :disabled="isEdit"></el-input>
            </el-form-item>
            <el-form-item label="业务范围" prop="business_scope" >
              <el-select v-model="deptInfo.business_scope" placeholder="business_scope" :disabled="isEdit">
                  <el-option label="危险品生产加工" value="危险品生产加工"></el-option>
                  <el-option label="运输" value="运输"></el-option>
                  <el-option label="仓储" value="仓储"></el-option>
                  <el-option label="使用" value="使用"></el-option>
                  <el-option label="其他" value="其他"></el-option>
            </el-select>
            </el-form-item >
             </el-form>
           <span id="edit_button"><el-button type="success" @click="edit">编辑</el-button></span>
            <span id="save_button"><el-button type="primary" @click="save" :disabled="isEdit">保存</el-button></span>
</div><!-- deptinfor结尾-->
</template>
<script>
  export default {
    data() {
      return { 
        deptInfo: {
          username: this.$store.state.username,
          password: this.$store.state.password,
          dept_code:this.$store.state.dept_code,
          dept_name:this.$store.state.dept_name,
          address:this.$store.state.address,
          phone:this.$store.state.phone,
          principal:this.$store.state.principal,
          email:this.$store.state.email,
          business_scope:this.$store.state.business_scope

        },
        user_id:this.$store.state.user_id,
        isEdit:true,
      };
    },
    methods: {
          edit(){
                  this.$confirm('是否要编辑内容', '提示', {
                      confirmButtonText: '确定',
                      cancelButtonText: '取消',
                      type: 'success'
                    }).then(() => {
                      this.$notify({
                        title: '提示',
                        type: 'warning',
                        message: '编辑后记得点击保存，方可生效！！',
                        offset: 100
                      });
                      this.isEdit=false;
                    }).catch(() => {
                      this.isEdit=true;  
                    });

                 
          },
          save(){
                    var _this = this;
                    var data='id='+_this.user_id+'&username='+_this.deptInfo.username+'&password='+_this.deptInfo.password+
                              '&deptCode='+_this.deptInfo.dept_code+'&deptName='+_this.deptInfo.dept_name+
                              '&address='+_this.deptInfo.address+'&phone='+_this.deptInfo.phone+
                              '&principal='+_this.deptInfo.principal+'&email='+_this.deptInfo.email+
                              '&businessScope='+_this.deptInfo.business_scope;

                          this.$http.post('/api/user/update',data)
                          .then(function (response) {
                            var errorcode=response.data.errorcode;
                              if(errorcode=="200"){

                                  _this.$confirm('是否提交内容', '提示', {
                                      confirmButtonText: '确定',
                                      cancelButtonText: '取消',
                                      type: 'success'
                                    }).then(() => {
                                      _this.$alert('保存成功', '提示', {
                                          confirmButtonText: '确定',
                                          callback: action => {
                                            _this.isEdit=true; 
                                          }
                                        });
                                      }).catch(() => {
                                          _this.$notify({
                                            title: '提示',
                                            type: 'error',
                                            message: '您还未保存数据！！',
                                            offset: 100
                                          });
                                        });
                                                      
                                  
                              }else if(errorcode=="500"){
                                   console.debug(response);
                                 _this.$alert('保存失败', '提示', {
                                      confirmButtonText: '确定',
                                      callback: action => {
                                        _this.isEdit=true; 
                                      }
                                    });
                              }
                            })
                          .catch(function (error) {
                              console.log(error);
                          });
          }
    }
  }
</script>

<style>
#dept_info{
  width: 800px;
  margin-top: 25px;
  margin-left:300px;
}
h2{
  margin-bottom: 25px;
}
#edit_button{
   margin-left:350px;
   margin-right: 15px;
}

</style>