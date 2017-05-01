<template>
  <div id="RecordQuire">
      <div class="RecordQuire_top">
      <el-col class="RecordQuire_top" :span="24" >
        <div class="RecordQuire_top_timu">历史查询记录:</div>
      </el-col>
     </div>  
     <el-table :data="tableData"style="width: 668px" id="RecordQuire_middle" >
       <el-table-column type="index" width="55"></el-table-column>
      <el-table-column  prop="recordName" label="危险化学品名称" width="250">

      </el-table-column>
      <el-table-column  prop="recordTime" label="查询时间" width="240">

      </el-table-column>
      <el-table-column  prop="" label=" " width="120">
      </el-table-column>
    </el-table>
	<el-pagination
    layout="prev, pager, next"
    :current-page="page"
    :total="pagenumber"
    :size="pagesize"
     @current-change="handleCurrentChange">
  </el-pagination>
  </div>
</template>

<script>
export default {
  data(){
      return{
        page:1,
        pagesize:10,
        pagenumber:9,
        tableData:[]
      }
  },
  methods:{
      getUsers(){
         var _this = this;
            this.$http.get('/api/record/select'
            ,{
              params:{
                recordUsername:_this.$store.state.username,
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
                }
              })
            .catch(function (error) {
                console.log(error);
            });

      },
      handleCurrentChange(val) {
        this.page = val;
        this.getUsers();
      }
  },
  mounted(){
      this.getUsers();
      
  }
}
</script>

<style>
#RecordQuire{
  width: 1090px;
  margin-top: 25px;
  margin-left:250px;
}

.RecordQuire_top{
  height: 58px;
  border:50px;
  background-color: #F2F2F2;
}

.RecordQuire_top_timu{
  font-size: 30px;
  color: cornflowerblue;
}

.RecordQuire_top_form{
  margin-top: 12px;
 
  margin-left: 10px;
}
#RecordQuire_middle{
  margin-top: 10px;
}

</style>
