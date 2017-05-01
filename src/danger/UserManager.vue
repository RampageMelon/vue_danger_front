<template>
  <div id="UserManager">
      <div class="UserManager_top">
      <el-col class="UserManager_top" :span="24" >
          <el-form class="UserManager_top_form" :inline="true" :model="filters">
              <el-form-item class="UserManager_top_form_name">
                <el-input class="UserManager_top_form_name_frame" v-model="filters.name" placeholder="请输入用户名"></el-input>
              </el-form-item>
             
           <el-form-item>
              <el-button type="primary" @click="getUsers">查询</el-button>
           </el-form-item>

           <el-form-item>
              <el-button type="success" @click="insertUsers">新增</el-button>
           </el-form-item>
          </el-form>
      </el-col>
     </div>  
     <el-table :data="tableData"style="width: 668px" id="UserManager_middle" >
       <el-table-column type="index" width="55"></el-table-column>
      <el-table-column  prop="username" label="用户名" width="190">

      </el-table-column>
      <el-table-column  prop="deptName" label="单位名称" width="250">
      </el-table-column>
      <el-table-column label="操作" width="170">
      <template scope="scope">
        <el-button type="primary"
          @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
          <el-button type="danger"
          @click="handleDelete(scope.$index, scope.row)">删除</el-button>
      </template>
    </el-table-column>
    </el-table>
	<el-pagination
    layout="prev, pager, next"
    :current-page="page"
    :total="pagenumber"
    :size="pagesize"
     @current-change="handleCurrentChange">
  </el-pagination>
		<el-dialog title="用户详细信息" v-model="dialogVisible" size="large">
          <el-form :inline="true" :model="deptInfo" ref="deptInfo" label-width="70px" class="deptInfo-ruleForm">
            <el-form-item label="用户名" prop="username" >
              <el-input type="text" v-model="deptInfo.username" auto-complete="off" :disabled="false"></el-input>
            </el-form-item>
            <el-form-item label="密码" prop="password">
              <el-input type="text"  v-model="deptInfo.password" auto-complete="off" :disabled="false"></el-input>
            </el-form-item>
             <el-form-item label="单位编号" prop="deptCode" >
              <el-input type="text" v-model="deptInfo.deptCode" auto-complete="off" :disabled="false"></el-input>
            </el-form-item>
            <el-form-item label="单位名称" prop="deptName" >
              <el-input type="text" v-model="deptInfo.deptName" auto-complete="off" :disabled="false"></el-input>
            </el-form-item>
            <el-form-item label="地址" prop="address" >
              <el-input type="text" v-model="deptInfo.address" auto-complete="off" :disabled="false"></el-input>
            </el-form-item>
            <el-form-item label="电话" prop="phone" >
              <el-input type="text" v-model="deptInfo.phone" auto-complete="off" :disabled="false"></el-input>
            </el-form-item>
            <el-form-item label="负责人" prop="principal" >
              <el-input type="text" v-model="deptInfo.principal" auto-complete="off" :disabled="false"></el-input>
            </el-form-item>
            <el-form-item label="邮箱" prop="email" >
              <el-input type="text" v-model="deptInfo.email" auto-complete="off" :disabled="false"></el-input>
            </el-form-item>
            <el-form-item label="业务范围" prop="businessScope" >
              <el-select v-model="deptInfo.businessScope" placeholder="" :disabled="false">
                  <el-option label="危险品生产加工" value="危险品生产加工"></el-option>
                  <el-option label="运输" value="运输"></el-option>
                  <el-option label="仓储" value="仓储"></el-option>
                  <el-option label="使用" value="使用"></el-option>
                  <el-option label="其他" value="其他"></el-option>
            </el-select>
            </el-form-item >
             </el-form>
            <span id="save_button"><el-button type="primary" @click="save" >保存</el-button></span>
    </span>
  </el-dialog>

  <el-dialog title="用户详细信息" v-model="dialogVisible1" size="large">
          <el-form :inline="true" :model="deptInfo1" ref="deptInfo1" label-width="70px" class="deptInfo-ruleForm">
            <el-form-item label="用户名" prop="username" >
              <el-input type="text" v-model="deptInfo1.username" auto-complete="off" :disabled="false"></el-input>
            </el-form-item>
            <el-form-item label="密码" prop="password">
              <el-input type="text"  v-model="deptInfo1.password" auto-complete="off" :disabled="false"></el-input>
            </el-form-item>
             <el-form-item label="单位编号" prop="deptCode" >
              <el-input type="text" v-model="deptInfo1.deptCode" auto-complete="off" :disabled="false"></el-input>
            </el-form-item>
            <el-form-item label="单位名称" prop="deptName" >
              <el-input type="text" v-model="deptInfo1.deptName" auto-complete="off" :disabled="false"></el-input>
            </el-form-item>
            <el-form-item label="地址" prop="address" >
              <el-input type="text" v-model="deptInfo1.address" auto-complete="off" :disabled="false"></el-input>
            </el-form-item>
            <el-form-item label="电话" prop="phone" >
              <el-input type="text" v-model="deptInfo1.phone" auto-complete="off" :disabled="false"></el-input>
            </el-form-item>
            <el-form-item label="负责人" prop="principal" >
              <el-input type="text" v-model="deptInfo1.principal" auto-complete="off" :disabled="false"></el-input>
            </el-form-item>
            <el-form-item label="邮箱" prop="email" >
              <el-input type="text" v-model="deptInfo1.email" auto-complete="off" :disabled="false"></el-input>
            </el-form-item>
            <el-form-item label="业务范围" prop="businessScope" >
              <el-select v-model="deptInfo1.businessScope" placeholder="请选择" :disabled="false">
                  <el-option label="危险品生产加工" value="危险品生产加工"></el-option>
                  <el-option label="运输" value="运输"></el-option>
                  <el-option label="仓储" value="仓储"></el-option>
                  <el-option label="使用" value="使用"></el-option>
                  <el-option label="其他" value="其他"></el-option>
            </el-select>
            </el-form-item >
             </el-form>
            <span id="save_button"><el-button type="primary" @click="save1" >保存</el-button></span>
    </span>
  </el-dialog>
  </div>
</template>

<script>
export default {
  data(){
      return{
         filters: {
					name: '',
				},
        deptInfo: {
          id:'',
          username: '',
          password: '',
          deptCode:'',
          deptName:'',
          address:'',
          phone:'',
          principal:'',
          email:'',
          businessScope:'',
        },
        deptInfo1: {
          id:'',
          username: '',
          password: '',
          deptCode:'',
          deptName:'',
          address:'',
          phone:'',
          principal:'',
          email:'',
          businessScope:'',
        },
        page:1,
        pagesize:10,
        pagenumber:9,
        tableData:[],
        dialogVisible:false,
        dialogVisible1:false,
      }
  },
  methods:{
      //查询（获取用户列表）
      getUsers(){
        
         var _this = this;
         
            this.$http.get('/api/user/selectall'
            ,{
              params:{
                username:_this.filters.name,
                page:_this.page,
              }, 
            }
            )
            .then(function (response) {
              var errorcode=response.data.errorcode;
                 if(errorcode=="200"){
                    _this.tableData=response.data.data;
                    _this.pagenumber=parseInt(response.data.errormsg);
                    
                }else if(errorcode=="500"){
                   _this.$message.error(response.data.errormsg);
                }
              })
            .catch(function (error) {
                console.log(error);
            });

      },
      //新增
      insertUsers(){ 
          this.deptInfo1.id='';this.deptInfo1.username='';this.deptInfo1.password='';this.deptInfo1.deptCode='';this.deptInfo1.deptName='';
          this.deptInfo1.address='';this.deptInfo1.phone='';this.deptInfo1.principal='';this.deptInfo1.email='';this.deptInfo1.businessScope='';
          this.dialogVisible1=true;
      },
      //新增里的保存
      save1(){
          var _this = this;
            
           _this.$confirm('是否提交内容', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'success'
                }).then(() => {
                       this.$http.get('/api/user/regiter'
                        ,{
                          params:{
                            username:_this.deptInfo1.username,
                            password:_this.deptInfo1.password,
                            deptCode:_this.deptInfo1.deptCode,
                            deptName:_this.deptInfo1.deptName,
                            address:_this.deptInfo1.address,
                            phone:_this.deptInfo1.phone,
                            principal:_this.deptInfo1.principal,
                            email:_this.deptInfo1.email,
                            businessScope:_this.deptInfo1.businessScope
                          }, 
                        },
                        )
                        .then(function (response) {
                                        var errorcode=response.data.errorcode;
                                          if(errorcode=="200"){               
                                              _this.$alert('新增成功', '提示', {
                                                  confirmButtonText: '确定',
                                                  callback: action => {
                                                  _this.getUsers();
                                                _this.dialogVisible1=false;
                                                }
                                                  });
                                          }else if(errorcode=="500"){
                                             _this.$alert('新增失败，'+response.data.errormsg, '提示', {
                                                  confirmButtonText: '确定',
                                                  callback: action => {
                                                  }
                                                });
                                          }
                                        })
                                      .catch(function (error) {
                                          console.log(error);
                                      });

                            }).catch(() => {
                                _this.$notify({
                                  title: '提示',
                                  type: 'error',
                                  message: '您还未保存数据！！',
                                  offset: 100
                                  });
                                  }); 
           
      },
      //点击页数
      handleCurrentChange(val) {
        this.page = val;
        this.getUsers();
      },
      //编辑
      handleEdit(index, row) {
        var _this = this;
            this.$http.get('/api/user/select'
            ,{
              params:{
                id:row.id,
              }, 
            }
            )
            .then(function (response) {
              var errorcode=response.data.errorcode;
                 if(errorcode=="200"){
                  _this.deptInfo=response.data.data;

                }else if(errorcode=="500"){
                   _this.$message.error(response.data.errormsg);
                }
              })
            .catch(function (error) {
                console.log(error);
            });


          this.dialogVisible=true;


      },
      //保存
     save(){
                    var _this = this;
                    var data='id='+_this.deptInfo.id+'&username='+_this.deptInfo.username+'&password='+_this.deptInfo.password+
                              '&deptCode='+_this.deptInfo.deptCode+'&deptName='+_this.deptInfo.deptName+
                              '&address='+_this.deptInfo.address+'&phone='+_this.deptInfo.phone+
                              '&principal='+_this.deptInfo.principal+'&email='+_this.deptInfo.email+
                              '&businessScope='+_this.deptInfo.businessScope;



                              _this.$confirm('是否提交内容', '提示', {
                                    confirmButtonText: '确定',
                                    cancelButtonText: '取消',
                                    type: 'success'
                                    }).then(() => {
                                        this.$http.post('/api/user/update',data)
                                        .then(function (response) {
                                          var errorcode=response.data.errorcode;
                                            if(errorcode=="200"){
                                                _this.$alert('保存成功', '提示', {
                                                              confirmButtonText: '确定',
                                                              callback: action => {
                                                              _this.getUsers();
                                                              _this.dialogVisible=false;
                                                              }
                                                          }); 
                                            }else if(errorcode=="500"){
                                              _this.$message.error(response.data.errormsg);
                                                 }
                                              })
                                            .catch(function (error) {
                                                console.log(error);
                                            });
                                      }).catch(() => {
                                            _this.$notify({
                                                title: '提示',
                                                type: 'error',
                                                message: '您还未保存数据！！',
                                                offset: 100
                                             });
                                       });
                                             

                       
                           
          },
      //删除
      handleDelete(index, row) {
          var _this = this;
          _this.$confirm('是否要删除此用户', '提示', {
                                      confirmButtonText: '确定',
                                      cancelButtonText: '取消',
                                      type: 'warning'
                                    }).then(() => {
                                        //删除api
                                        this.$http.get('/api/user/delete'
                                        ,{
                                          params:{
                                            id:row.id,
                                          }, 
                                        })
                                        .then(function (response) {
                                          var errorcode=response.data.errorcode;
                                            if(errorcode=="200"){
                                                _this.$alert('删除成功', '提示', {
                                                confirmButtonText: '确定',
                                                callback: action => {
                                                  _this.getUsers();
                                                }
                                              });
                                            }else if(errorcode=="500"){
                                                _this.$alert('删除失败', '提示', {
                                                confirmButtonText: '确定',
                                                callback: action => {
                                                  _this.getUsers();
                                                }
                                          })
                                        // .catch(function (error) {
                                        //     console.log(error);
                                        // });
                                            }
                                      }).catch(() => {
                                          
                                        });    
                       }).catch(() => {
                                          
                                        });    
      }
  },
      

  mounted(){
      this.getUsers();
      
  }
}
</script>

<style>
#UserManager{
  width: 1090px;
  margin-top: 25px;
  margin-left:250px;
}

.UserManager_top{
  height: 58px;
  border:50px;
  background-color: #F2F2F2;
}
.UserManager_top_form{
  margin-top: 12px;
 
  margin-left: 10px;
}
#UserManager_middle{
  margin-top: 10px;
}

</style>
