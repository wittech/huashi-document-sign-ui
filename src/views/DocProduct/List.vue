<template>
  <div class="container" style="width:99%;margin-top:-25px;">
	<!--工具栏-->
	<div class="toolbar" style="float:left;padding-top:10px;padding-left:15px;">
		<el-form :inline="true" :model="filters" :size="size">
			<el-form-item>
				<el-input v-model="filters.label" placeholder="名称"></el-input>
			</el-form-item>
			<el-form-item>
				<kt-button :label="$t('action.search')" perms="docProduct:view" type="primary" @click="findPage(null)"/>
			</el-form-item>
			<el-form-item>
				<kt-button :label="$t('action.add')" perms="docProduct:add" type="primary" @click="handleAdd" />
			</el-form-item>
		</el-form>
	</div>
	<!--表格内容栏-->
	<kt-table permsEdit="docProduct:edit" permsDelete="docProduct:delete"
		:data="pageResult" :columns="columns"
		@findPage="findPage" @handleEdit="handleEdit" @handleDelete="handleDelete">
	</kt-table>
	<!--新增编辑界面-->
	<el-dialog :title="operation?'新增':'编辑'" width="40%" :visible.sync="editDialogVisible" :close-on-click-modal="false">
		<el-form :model="dataForm" label-width="80px" :rules="dataFormRules" ref="dataForm" :size="size">
			<el-form-item label="" prop="id"  v-if="dataForm.isPrimaryKey">
				<el-input v-model="dataForm.id" auto-complete="off"></el-input>
			</el-form-item>
			<el-form-item label="归档标签" prop="label"  v-if="dataForm.isPrimaryKey">
				<el-input v-model="dataForm.label" auto-complete="off"></el-input>
			</el-form-item>
			<el-form-item label="产品名称" prop="name"  v-if="dataForm.isPrimaryKey">
				<el-input v-model="dataForm.name" auto-complete="off"></el-input>
			</el-form-item>
			<el-form-item label="审批状态" prop="status"  v-if="dataForm.isPrimaryKey">
				<el-input v-model="dataForm.status" auto-complete="off"></el-input>
			</el-form-item>
			<el-form-item label="" prop="remark"  v-if="dataForm.isPrimaryKey">
				<el-input v-model="dataForm.remark" auto-complete="off"></el-input>
			</el-form-item>
			<el-form-item label="审批账号" prop="approveBy"  v-if="dataForm.isPrimaryKey">
				<el-input v-model="dataForm.approveBy" auto-complete="off"></el-input>
			</el-form-item>
			<el-form-item label="审批时间" prop="approveTime"  v-if="dataForm.isPrimaryKey">
				<el-input v-model="dataForm.approveTime" auto-complete="off"></el-input>
			</el-form-item>
			<el-form-item label="审批备注" prop="approveDes"  v-if="dataForm.isPrimaryKey">
				<el-input v-model="dataForm.approveDes" auto-complete="off"></el-input>
			</el-form-item>
			<el-form-item label="文件个数" prop="fileCount"  v-if="dataForm.isPrimaryKey">
				<el-input v-model="dataForm.fileCount" auto-complete="off"></el-input>
			</el-form-item>
			<el-form-item label="" prop="createTime"  v-if="dataForm.isPrimaryKey">
				<el-input v-model="dataForm.createTime" auto-complete="off"></el-input>
			</el-form-item>
			<el-form-item label="" prop="createBy"  v-if="dataForm.isPrimaryKey">
				<el-input v-model="dataForm.createBy" auto-complete="off"></el-input>
			</el-form-item>
			<el-form-item label="" prop="lastUpdateTime"  v-if="dataForm.isPrimaryKey">
				<el-input v-model="dataForm.lastUpdateTime" auto-complete="off"></el-input>
			</el-form-item>
			<el-form-item label="" prop="lastUpdateBy"  v-if="dataForm.isPrimaryKey">
				<el-input v-model="dataForm.lastUpdateBy" auto-complete="off"></el-input>
			</el-form-item>
			<el-form-item label="是否停用 0:未删除，1：已删除" prop="isDeleted"  v-if="dataForm.isPrimaryKey">
				<el-input v-model="dataForm.isDeleted" auto-complete="off"></el-input>
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
				label: ''
			},
			columns: [
				{prop:"id", label:"", minWidth:100},
				{prop:"name", label:"文档模板名称", minWidth:100},
        {prop:"fileCount", label:"文件个数", minWidth:100},
        {prop:"status", label:"审批状态", minWidth:100},
        {prop:"remark", label:"备注说明", minWidth:100},
        {prop:"createTime", label:"创建时间", minWidth:120, formatter:this.dateFormat},
        {prop:"createBy", label:"创建人", minWidth:100}
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
				label: null,
				name: null,
				status: null,
				remark: null,
				approveBy: null,
				approveTime: null,
				approveDes: null,
				fileCount: null,
				createTime: null,
				createBy: null,
				lastUpdateTime: null,
				lastUpdateBy: null,
				isDeleted: null,
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
			this.$api.docProduct.findPage(this.pageRequest).then((res) => {
				this.pageResult = res.data
			}).then(data!=null?data.callback:'')
		},
		// 批量删除
		handleDelete: function (data) {
			this.$api.docProduct.batchDelete(data.params).then(data!=null?data.callback:'')
		},
		// 显示新增界面
		handleAdd: function () {
			this.editDialogVisible = true
			this.operation = true
			this.dataForm = {
				id: null,
				label: null,
				name: null,
				status: null,
				remark: null,
				approveBy: null,
				approveTime: null,
				approveDes: null,
				fileCount: null,
				createTime: null,
				createBy: null,
				lastUpdateTime: null,
				lastUpdateBy: null,
				isDeleted: null,
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
						this.$api.docProduct.save(params).then((res) => {
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
