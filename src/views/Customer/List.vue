<template>
  <div class="page-container">
	<!--工具栏-->
	<div class="toolbar" style="float:left;padding-top:10px;padding-left:15px;">
		<el-form :inline="true" :model="filters" :size="size">
			<el-form-item>
				<el-input v-model="filters.name" placeholder="文档名称"></el-input>
			</el-form-item>
      <el-form-item>
        <el-select v-model="filters.productId" placeholder="请选择所属模板">
          <el-option
            v-for="item in StatusOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
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
        <el-date-picker
          v-model="filters.startTime"
          type="date"
          placeholder="选择开始日期">
        </el-date-picker>
        <el-date-picker
          v-model="filters.endTime"
          type="date"
          placeholder="选择截止日期">
        </el-date-picker>
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
	<kt-table permsEdit="customer:edit" permsDelete="customer:delete" permsDeail="customer:view" permsAuditing="customer:auditing"
		:data="pageResult" :columns="columns"
		@findPage="findPage" @handleEdit="handleEdit" @handleDelete="handleDelete">
	</kt-table>
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
			size: 'small',
			filters: {
				name: '',
        productId:'',
        status:'',
        startTime:'',
        endTime:'',
			},
			columns: [
				{prop:"name",label:"文档名称", minWidth:100},
        {prop:"productId", label:"所属模板", minWidth:100},
				{prop:"type", createBy:"创建人", minWidth:100},
        {prop:"createTime", label:"创建时间", minWidth:120, formatter:this.dateFormat},
				{prop:"path", label:"状态", minWidth:100}
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
	methods: {
		// 获取分页数据
		findPage: function (data) {
			if(data !== null) {
				this.pageRequest = data.pageRequest
			}
			this.pageRequest.columnFilters = {label: {name:'label', value:this.filters.label}}
			this.$api.customer.findPage(this.pageRequest).then((res) => {
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
      	}
	},
	mounted() {
	}
}
</script>

<style scoped>

</style>
