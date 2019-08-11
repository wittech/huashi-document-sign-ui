<template>
  <div class="page-container">
	<!--工具栏-->
	<div class="toolbar" style="float:left;padding-top:10px;padding-left:15px;">
		<el-form :inline="true" :model="filters" :size="size">
      <el-form-item>
        <el-select v-model="filters.status" placeholder="请选择状态">
          <el-option
            v-for="item in StatusOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-input v-model="filters.borrower" placeholder="借款人及相关人"></el-input>
      </el-form-item>
			<el-form-item>
				<kt-button :label="$t('action.search')" perms="customer:view" type="primary" @click="findPage(null)"/>
			</el-form-item>
			<el-form-item>
				<kt-button :label="$t('action.add')" perms="customer:add" type="primary" @click="handleAdd" />
			</el-form-item>
		</el-form>
	</div>
    <!--表格内容栏-->
    <el-table :data="pageResult.content" stripe size="mini" style="width: 100%;">
      <el-table-column
        prop="borrower" header-align="center" align="center" width="80" label="借款人">
      </el-table-column>
      <table-tree-column
        prop="loanType" header-align="center" treeKey="id" width="150" label="贷款类型" :formatter="loanTypeFormat">
      </table-tree-column>
      <el-table-column
        prop="applicationMatters" header-align="center" align="center" width="120" label="申请事项" :formatter="applicationMattersFormat">
      </el-table-column>
      <el-table-column
        prop="applicationAmount" header-align="center" align="center" label="申请金额">
      </el-table-column>
      <el-table-column
        prop="loanDate" header-align="center" align="center" label="放款时间" :formatter="dateFormat">
      </el-table-column>
      <el-table-column
        prop="status" header-align="center" align="center" label="状态" :formatter="statusFormat">
      </el-table-column>
      <el-table-column
        fixed="right" header-align="center" align="center" width="185" :label="$t('action.operation')">
        <template slot-scope="scope">
          <kt-button icon="fa fa-edit" label="查看" perms="loan:view" @click="handleDeail(scope.row)"/>
        </template>
      </el-table-column>

    </el-table>

    <!--查看界面-->
    <el-dialog title="查看" width="40%" :visible.sync="deailDialogVisible" :close-on-click-modal="false">
      <el-form :model="loanBasisForm" label-width="80px" :rules="dataFormRules" ref="loanBasisForm" :size="size">
        <div>
          <el-form-item label="贷款类型">
            <el-input v-model="loanBasisForm.loanType" size="small" class="width350"></el-input>
          </el-form-item>
        </div>
        <div>
          <el-form-item label="申请事项">
            <el-input v-model="loanBasisForm.applicationMatters" size="small" class="width350"></el-input>
          </el-form-item>
        </div>

        <el-form-item label="担保方式">
            <el-input v-model="loanBasisForm.guaranteeMethod" size="small" class="width350"></el-input>
        </el-form-item>

        <el-form-item label="借款人">
          <el-input v-model="loanBasisForm.borrower" size="small" class="width350"></el-input>
        </el-form-item>
        <br>
      </el-form>
      <el-table :data="fileList" stripe size="mini" style="width: 100%;">
        <el-table-column
          prop="originMame" header-align="center" align="center" width="80" label="文件原名称">
        </el-table-column>
        <table-tree-column
          prop="newName" header-align="center" treeKey="id" width="150" label="文件新名称">
        </table-tree-column>
        <el-table-column
          prop="type" header-align="center" align="center" width="120" label="文件类型" :formatter="applicationMattersFormat">
        </el-table-column>
        <el-table-column
          fixed="right" header-align="center" align="center" width="185" :label="$t('action.operation')">
          <template slot-scope="scope">
            <kt-button icon="fa fa-edit" label="下载" perms="loan:view" @click="handleDeail(scope.row)"/>
          </template>
        </el-table-column>
      </el-table>
    </el-dialog>

	<!--新增编辑界面-->
	<el-dialog :title="operation?'新增':'编辑'" width="40%" :visible.sync="editDialogVisible" :close-on-click-modal="false">
		<el-form :model="dataForm" label-width="80px" :rules="dataFormRules" ref="dataForm" :size="size">
      <el-form-item label="ID" prop="id"  v-if="false">
        <el-input v-model="dataForm.id" :disabled="true" auto-complete="off"></el-input>
      </el-form-item>
      <el-form-item label="文档名称" prop="name">
        <el-input v-model="dataForm.name" auto-complete="off"></el-input>
      </el-form-item>
			<el-form-item label="文档模板" prop="productId">
				<el-input v-model="dataForm.productId" auto-complete="off"></el-input>
			</el-form-item>
			<el-form-item label="审批人" prop="type">
				<el-input v-model="dataForm.type" auto-complete="off"></el-input>
			</el-form-item>
			<el-form-item label="备注" prop="size">
				<el-input v-model="dataForm.size" auto-complete="off"></el-input>
			</el-form-item>
		</el-form>
		<div slot="footer" class="dialog-footer">
			<el-button :size="size" @click.native="editDialogVisible = false">{{$t('action.cancel')}}</el-button>
			<el-button :size="size" type="primary" @click.native="submitForm" :loading="editLoading">{{$t('action.submit')}}</el-button>
		</div>
	</el-dialog>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import { mapGetters } from 'vuex'
import KtTable from "@/views/Core/KtTable"
import KtButton from "@/views/Core/KtButton"
import { format } from "@/utils/datetime"
export default {
	components:{
			KtTable,
			KtButton
	},
	data() {
		return {
      //贷款类型
      LoanTypeOptions:[{
        VAL_CODE: '01',
        VAL_NAME: '新增',
      },{
        VAL_CODE: '02',
        VAL_NAME: '续约',
      }],
      //借口人基础信息
      loanBasisForm: {
        loanType:'',
        applicationMatters:'',
        guaranteeMethod: [],
        borrower: '',
      },
      //文件列表
		  fileList:[{
        id:'1',
        originMame:'1.jpg',
        newName:'2.jpg',
        type:'1',
        url:''
      }],
		  //查看
      deailDialogVisible:false,
		  //状态
      StatusOptions:[{
        value:'0',
        label:'未处理',
      },{
        value:'1',
        label:'已处理',
      }],
			size: 'small',
			filters: {
        borrower: '',
        status:'0'
			},
			columns: [
				{prop:"borrower",label:"借款人", minWidth:100},
        {prop:"loanType", label:"贷款类型", minWidth:100, formatter:this.loanTypeFormat},
				{prop:"applicationMatters", label:"申请事项", minWidth:100, formatter:this.applicationMattersFormat},
        {prop:"type", label:"申请金额", minWidth:100},
        {prop:"loanDate", label:"放款时间", minWidth:120, formatter:this.dateFormat},
				{prop:"status", label:"状态", minWidth:100, formatter:this.statusFormat}
			],
			pageRequest: { pageNum: 1, pageSize: 8 },
			pageResult: {},

			operation: false, // true:新增, false:编辑
			editDialogVisible: false, // 新增编辑界面是否显示
			editLoading: false,
			dataFormRules: {
				label: [
					{ required: true, message: '请输入名称', trigger: 'blur' }
				]
			},
			// 新增编辑界面数据
			dataForm: {
				id: null,
				productId: null,
				name: null,
				type: null,
				size: null,
				path: null,
				createTime: null,
				lastUpdateTime: null,
			}
		}
	},

  computed: {

  },
  created(){
	  this.findPage(null);
  },

	methods: {
    ...mapActions([
      'getById'
    ]),
    /**
     * 查看
     */
    handleDeail(row){
        //获取对象信息
        this.getByIds(row);
        //获取文件列表数据
        this.deailDialogVisible=true;
    },

    //根据id获取对象信息
    getByIds: function (data) {
        let dataParams = {
          id:data.id
        }
        this.$api.loan.getById(dataParams).then((res) => {
          this.loanBasisForm = res.data
         });
    },

		// 获取分页数据
		findPage: function (data) {
			if(data !== null) {
				this.pageRequest = data.pageRequest
			}
			this.pageRequest.columnFilters = {label: {name:'label', value:this.filters.name}}
			this.$api.loan.findPage(this.pageRequest).then((res) => {
				this.pageResult = res.data
			}).then(data!=null?data.callback:'')
		},
		// 批量删除
		handleDelete: function (data) {
			this.$api.customer.batchDelete(data.params).then(data!=null?data.callback:'')
		},
		// 显示新增界面
		handleAdd: function () {
			this.editDialogVisible = true
			this.operation = true
			this.dataForm = {
				id: null,
				productId: null,
				name: null,
				type: null,
				size: null,
				path: null,
				createTime: null,
				lastUpdateTime: null,
			}
		},
		// 显示编辑界面
		handleEdit: function (params) {
			this.editDialogVisible = true
			this.operation = false
			this.dataForm = Object.assign({}, params.row)
		},
		// 编辑
		submitForm: function () {
			this.$refs.dataForm.validate((valid) => {
				if (valid) {
					this.$confirm('确认提交吗？', '提示', {}).then(() => {
						this.editLoading = true
						let params = Object.assign({}, this.dataForm)
						this.$api.customer.save(params).then((res) => {
							if(res.code == 200) {
								this.$message({ message: '操作成功', type: 'success' })
							} else {
								this.$message({message: '操作失败, ' + res.msg, type: 'error'})
							}
							this.editLoading = false
							this.$refs['dataForm'].resetFields()
							this.editDialogVisible = false
							this.findPage(null)
						})
					})
				}
			})
		},
		// 时间格式化
  dateFormat: function (row, column, cellValue, index){
    	return format(row[column.property])
  },
    //申请事项：0 个人经营性贷款 1信用贷款 2 房屋按揭贷款 3个人消费类贷款
    applicationMattersFormat: function (row, column, cellValue, index){
        if(row[column.property]=='0'){
            return '个人经营性贷款';
        }else if(row[column.property]=='1'){
          return '信用贷款';
        }else if(row[column.property]=='2'){
          return '房屋按揭贷款';
        }else if(row[column.property]=='3'){
          return '个人消费类贷款';
        }
    },
    // 状态 0未处理 1已处理
    statusFormat: function (row, column, cellValue, index){
      if(row[column.property]=='0'){
        return '未处理';
      }else if(row[column.property]=='1'){
        return '已处理';
      }
    },
    // 贷款类型: 0新增 1续贷
    loanTypeFormat: function (row, column, cellValue, index){
      if(row[column.property]=='0'){
        return '新增';
      }else if(row[column.property]=='1'){
        return '续贷';
      }
    },

	},
	mounted() {
	}
}
</script>

<style scoped>

</style>
