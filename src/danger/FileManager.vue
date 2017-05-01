<template>
  <div id="FileManager">
      <div class="FileManager_top">
      <el-col class="FileManager_top" :span="24" >
        <div class="FileManager_top_timu">法规文件：</div>
      </el-col>
     </div>  
     <el-table :data="tableData"style="width: 670px" id="FileManager_middle" >
       <el-table-column type="index" width="55"></el-table-column>
       <el-table-column  prop="fileName" label="法规文件名称" width="250">
      </el-table-column>
      <el-table-column  prop="createPeople" label="上传者" width="100">
      </el-table-column>
      <el-table-column  width="55"></el-table-column>
      <el-table-column label="操作" width="208">
      <template scope="scope">
        <el-button type="primary"
          @click="handleEdit(scope.$index, scope.row)">查看</el-button>
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

    <el-dialog title="文件" v-model="dialogVisible" size="large">
    <span v-html="content"></span>
    <span slot="footer" class="dialog-footer">
      <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
    </span>
  </el-dialog>

  </div>
</template>

<script>
export default {
  data(){
      return{
        page:1,
        pagesize:10,
        pagenumber:9,
        tableData:[],
        dialogVisible:false,
        content:''
      }
  },
  methods:{
     
      getUsers(){
         var _this = this;
            this.$http.get('/api/lawfile/selectall'
            ,{
              params:{
                page:_this.page,
              }, 
            }
            )
            .then(function (response) {
              var errorcode=response.data.errorcode;
                 if(errorcode=="200"){
                    _this.tableData=response.data.data;
                    console.debug(_this.tableData);
                    _this.pagenumber=parseInt(response.data.errormsg);
                }else if(errorcode=="500"){
                }
              })
            .catch(function (error) {
                console.log(error);
            });

      },
      handleCurrentChange(val) {
        this.page = val;
        this.getUsers();
      },
      handleEdit(index, row) {
        var _this = this;
            this.$http.get('/api/lawfile/selectcontent'
            ,{
              params:{
                fileName:row.fileName,
              }, 
            }
            )
            .then(function (response) {
              var errorcode=response.data.errorcode;
                 if(errorcode=="200"){
                    _this.content=response.data.data;
                }else if(errorcode=="500"){
                }
              })
            .catch(function (error) {
                console.log(error);
            });


          this.dialogVisible=true;


      },
      handleDelete(index, row) {
       
      }
  },
  mounted(){
      this.getUsers();
      
  }
}
</script>

<style>
#FileManager{
  width: 1090px;
  margin-top: 25px;
  margin-left:250px;
}

.FileManager_top{
  height: 58px;
  border:50px;
  background-color: #F2F2F2;
}

.FileManager_top_timu{
  font-size: 30px;
  color: cornflowerblue;
}

.FileManager_top_form{
  margin-top: 12px;
 
  margin-left: 10px;
}
#FileManager_middle{
  margin-top: 10px;
}

</style>
