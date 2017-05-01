<template>
  <div id="DangerQuire">
    <div class="timu">危险品辨识：</div>
    <div class="shurukuang">
    <el-select v-model="value5" filterable remote :remote-method="remoteMethod" multiple placeholder="请输入危险品名称 " size="large">
    <el-option
      v-for="item in options"
      :key="item.value"
      :label="item.label"
      :value="item.value"
      >
    </el-option>
  </el-select>
    </div>
  <el-dialog  v-model="dialogVisible" size="tiny">
  <el-table :data="dangerValue">
    <el-table-column property="name" label="名称" width="120"></el-table-column>
    <el-table-column property="number" label="数量(吨)" width="90"></el-table-column>
    <el-table-column label="操作" >
      <template scope="scope">
        <el-button
          @click="handleEdit(scope.$index, scope.row)">输入数量</el-button>
      </template>
    </el-table-column>
  </el-table>
  <el-button size="success"     @click="bianshi">开始辨识</el-button>
  </el-dialog>
   <div class="anniu">
  <el-button @click="sure">确定选择</el-button>
  </div>
  </div>
 
</template>

<script>
export default {
    data() {
        return {
            options: [],
            // 选择框选择到的值
            value5: [],

            //dangerValue2作为中介值，dangerValue则是正确显示于表格的值,amout2同理
            dangerValue2:[],
            dangerValue:[],
            amount2:[],
            amount:[],
            dialogVisible:false,
            isinput:false
        }
        },
        methods:{

          test(){
              return 'aaaa';
          },
            // 根据名字查询临界量
            selectAmount(query){
                  var _this = this;
                  this.$http.get('/api/dangerCritical/select/amount'
                      ,{
                        params:{
                          criticalName:query
                        }, 
                      }
                      )
                      .then(function (response) {
                        var errorcode=response.data.errorcode;
                          if(errorcode=="200"){  
                              _this.amount2.push(response.data.data);
                          }else if(errorcode=="500"){
                              //如果返回500，就在页面上方弹出错误信息
                              this.errormsg(response.data.errormsg);
                          }
                        })
                      .catch(function (error) {
                          console.log(error);
                      });
            },

            isDanger(){
                this.$alert('经过系统严密计算，这些危险化学品为重大危险源！！！', '结果', {
                    confirmButtonText: '确定',
                    callback: action => {
                        this.$message({
                          type: 'success',
                          message: "感谢您的使用！"
                        });
                    }
                  });
            },
            noDanger(){
                  this.$alert('经过系统严密计算，这些危险化学品的含量安全。', '结果', {
                    confirmButtonText: '确定',
                    callback: action => {
                        this.$message({
                          type: 'success',
                          message: "感谢您的使用！"
                        });
                    }
                  });
            },
            remoteMethod(query) {
                  var _this = this;
                  this.$http.get('/api/dangerCritical/select/name'
                      ,{
                        params:{
                          criticalName:query
                        }, 
                      }
                      )
                      .then(function (response) {
                        var errorcode=response.data.errorcode;
                          if(errorcode=="200"){
                              _this.options=response.data.data;
                          }else if(errorcode=="500"){
                              //如果返回500，就在页面上方弹出错误信息
                              // this.errormsg(response.data.errormsg);
                          }
                        })
                      .catch(function (error) {
                          console.log(error);
                      });
            },
            //把选择到的名字加入dangerValue2
            sure(){
                var _this = this;
                //判断是否选择了数据，否则不给弹框
                if(this.value5.length!=0){
                for(var i=0;i<this.value5.length;i++){
                    //这里再根据危险品名字查询他的临界量，带入指定参数
                    this.dangerValue2.push({name:this.value5[i],number:0,amount:1});
                }
                this.dangerValue=this.dangerValue2;
                this.dangerValue2=[];
                
               
                // console.debug(this.test());
                // console.debug(this.dangerValue);
                this.dialogVisible=true;
            }else{
                this.$message.error('请选择一条数据')
            }
        },
            //修改number的值，并对number的值进行是否为数字判断
            handleEdit(index,row){
                this.$prompt('请输入数量', '提示', {
                        confirmButtonText: '确定',
                        }).then(({ value }) => {
                        
                          //这里获取相应的临界值
                          var _this = this;
                            this.$http.get('/api/dangerCritical/select/amount'
                                ,{
                                  params:{
                                    criticalName:row.name
                                  }, 
                                }
                                )
                                .then(function (response) {
                                  var errorcode=response.data.errorcode;
                                    if(errorcode=="200"){
                                        
                                        _this.dangerValue[index].amount=response.data.data;
                                    }else if(errorcode=="500"){
                                        //如果返回500，就在页面上方弹出错误信息
                                        _this.errormsg(response.data.errormsg);
                                    }
                                  })
                                .catch(function (error) {
                                    console.log(error);
                                });

                        // 判断输入的是否是数字
                        if(!isNaN(value)&&value!=null){
                          row.number=value;
                          console.debug(this.dangerValue);
                          }
                        else{this.$message.error('对不起您输入的是空值或者不是数字，请重新输入');}
                        }).catch(() => {

                        });
            },
            bianshi(){
                //如果表格的条数只有一条,判断临界量
                if(this.dangerValue.length==1){
                    //这里把这条数据加入记录表（username，危险品name【后台再自己加时间】）中
                    var _this = this;
                  this.$http.get('/api/record/regiter'
                      ,{
                        params:{
                          recordName:_this.dangerValue[0].name,
                          recordUsername:_this.$store.state.username
                        }, 
                      }
                      )
                      .then(function (response) {
                        var errorcode=response.data.errorcode;
                          if(errorcode=="200"){  
                              console.debug('注册成功显示='+response.data.errormsg)
                              console.debug('用户名为='+_this.$store.state.username)
                          }else if(errorcode=="500"){
                              //如果返回500，就在页面上方弹出错误信息
                              _this.errormsg(response.data.errormsg);
                          }
                        })
                      .catch(function (error) {
                          console.log(error);
                      });

                    
                    if(this.dangerValue[0].number>=this.dangerValue[0].amount){
                        this.isDanger();
                    }else{
                        this.noDanger();
                    }
                }
                //否则按照公式来判断
                else{
                    //这里也把这条数据加入记录表（username，危险品【后台再自己加时间】）中

                    var _this = this;
                    var number=0;
                    for(var i=0;i<this.dangerValue.length;i++){

                        this.$http.get('/api/record/regiter'
                            ,{
                              params:{
                                recordName:this.dangerValue[i].name,
                                recordUsername:_this.$store.state.username
                              }, 
                            }
                            )
                            .then(function (response) {
                              var errorcode=response.data.errorcode;
                                if(errorcode=="200"){  
                                    console.debug('注册成功显示='+response.data.errormsg)
                                }else if(errorcode=="500"){
                                    //如果返回500，就在页面上方弹出错误信息
                                    _this.errormsg(response.data.errormsg);
                                }
                              })
                            .catch(function (error) {
                                console.log(error);
                             });





                      number=number+this.dangerValue[i].number/this.dangerValue[i].amount;
                      
                    }
                    if(number>=1){
                    
                       this.isDanger();
                    }else{
                     
                      
                       this.noDanger();
                    }
                }
            }
        },
        mounted(){

  }
}
</script>

<style>
.timu{
 font-size:32px;
 color: red;
}
.shurukuang{
  margin-left: 350px;
  margin-top: 10px;
}
.anniu{
  margin-left: 480px;
  margin-top: 10px;
}


</style>
