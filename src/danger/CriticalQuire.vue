<template>
  <div id="CriticalQuire">
      <div class="CriticalQuire_top">
      <el-col class="CriticalQuire_top" :span="24" >
          <el-form class="CriticalQuire_top_form" :inline="true" :model="filters">
              <el-form-item class="CriticalQuire_top_form_name">
                <el-input class="CriticalQuire_top_form_name_frame" v-model="filters.name" placeholder="请输入危险品名"></el-input>
              </el-form-item>
             <el-form-item label="类型" prop="type" >
              <el-select v-model="filters.type" placeholder="全部" >
                <el-option label="全部" value="全部"></el-option>
                  <el-option label="爆炸品" value="爆炸品"></el-option>
                  <el-option label="易燃气体" value="易燃气体"></el-option>
                  <el-option label="毒性气体" value="毒性气体"></el-option>
                  <el-option label="易燃液体" value="易燃液体"></el-option>
                  <el-option label="易于自燃的物质" value="易于自燃的物质"></el-option>
                  <el-option label="遇水放出易燃气体的物质" value="遇水放出易燃气体的物质"></el-option>
                  <el-option label="氧化性物质" value="氧化性物质"></el-option>
                  <el-option label="有机过氧化物" value="有机过氧化物"></el-option>
                  <el-option label="毒性物质" value="毒性物质"></el-option>
                  <el-option label="气体" value="气体"></el-option>
            </el-select>
            </el-form-item >
           <el-form-item>
              <el-button type="primary" @click="getUsers">查询</el-button>
           </el-form-item>
          </el-form>
      </el-col>
     </div>  
     <el-table :data="tableData"style="width: 828px" id="CriticalQuire_middle" >
       <el-table-column type="index" width="55"></el-table-column>
      <el-table-column  prop="criticalType" label="类别" width="190">

      </el-table-column>
      <el-table-column  prop="criticalName" label="危险化学品名称和说明" width="410">

      </el-table-column>
      <el-table-column  prop="criticalAmount" label="临界量(T)" width="170">
      </el-table-column>
    </el-table>
	<el-pagination
    layout="prev, pager, next"
    :current-page="page"
    :total="pagenumber"
    :size="pagesize"
     @current-change="handleCurrentChange">
  </el-pagination>
			</el-pagination>
  </div>
</template>

<script>
export default {
  data(){
      return{
         filters: {
					name: '',
          type:'全部'
				},
        page:1,
        pagesize:10,
        pagenumber:9,
        tableData:[]
      }
  },
  methods:{
      getUsers(){
         var _this = this;
            this.$http.get('/api/dangerCritical/select'
            ,{
              params:{
                criticalName:_this.filters.name,
                criticalType:_this.filters.type,
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
#CriticalQuire{
  width: 1090px;
  margin-top: 25px;
  margin-left:250px;
}

.CriticalQuire_top{
  height: 58px;
  border:50px;
  background-color: #F2F2F2;
}
.CriticalQuire_top_form{
  margin-top: 12px;
 
  margin-left: 10px;
}
#CriticalQuire_middle{
  margin-top: 10px;
}

</style>
