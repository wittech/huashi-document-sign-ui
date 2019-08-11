<template>
  <div class="page-container">
	<!--工具栏-->
	<div class="toolbar" style="float:left;padding-top:10px;padding-left:15px;">
		<el-form :inline="true" :model="filters" :size="size">
			<el-form-item>
				<el-input v-model="filters.name" placeholder="名称"></el-input>
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
      <el-form-item label="ID" prop="id"  v-if="false">
        <el-input v-model="dataForm.id" :disabled="true" auto-complete="off"></el-input>
      </el-form-item>
			<el-form-item label="模板名称" prop="name">
				<el-input v-model="dataForm.name" auto-complete="off"></el-input>
			</el-form-item>
			<el-form-item label="文件个数" prop="fileCount">
				<el-input v-model="dataForm.fileCount" auto-complete="off"></el-input>
			</el-form-item>
			<el-form-item label="审批人" prop="approveBy">
				<el-input v-model="dataForm.approveBy" auto-complete="off"></el-input>
			</el-form-item>
			<el-form-item label="备注" prop="remark">
				<el-input v-model="dataForm.remark" auto-complete="off"></el-input>
			</el-form-item>
      <div class="titleTag">
        <el-tag size="medium">----------------------------------公用变量标签------------------------------------------------------------------</el-tag>
      </div>

      <div class="tableDate">
        <div class="button" style="width:3%;float:right;">
          <P><el-button class="el-icon-plus" @click.prevent="addRow()"></el-button></P>
          <p><el-button class="el-icon-minus" @click.prevent="delData()"></el-button></p>
        </div>
        <div class="table">
          <el-table
            :data="tableData"
            ref="table"
            tooltip-effect="dark"
            border
            stripe
            style="width: 95%"
            @selection-change='selectRow'>
            <el-table-column type="selection" width="45" align="center"></el-table-column>
            <el-table-column label="标签名称"align="center">
              <template slot-scope="scope">
                <el-input v-model="scope.row.address"></el-input>
              </template>
            </el-table-column>
            <el-table-column  label="默认值"align="center">
              <template slot-scope="scope">
                <el-input v-model="scope.row.address"></el-input>
              </template>
            </el-table-column>
            <el-table-column label="是否必填" >
              <template slot-scope="scope">
                <el-checkbox label="" name="type"></el-checkbox>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </div>

      <div class="titleTag">
        <el-tag size="medium">----------------------------------文档模板及变量标签------------------------------------------------------------------</el-tag>
      </div>
      <el-upload
        class="upload-demo"
        action="https://jsonplaceholder.typicode.com/posts/"
        :on-preview="handlePreview"
        :on-remove="emove"
        :file-list="fileList2"
        list-type="picture">
        <el-button size="small" type="primary">点击上传</el-button>
        <div slot="tip" class="el-upload__tip">只能上传xls, doc文件</div>
      </el-upload>


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
		  //文件上传数据集
      fileList2: [],
      tableData: [{
        rowNum: '',
        address: '',
        name: ''
      }, {
        rowNum: '',
        address: '',
        name: ''
      }],
      selectlistRow: [],

			size: 'small',
			filters: {
        name: '',
        status:''
			},
      StatusOptions: [{
        value: '0',
        label: '启用'
      }, {
        value: '1',
        label: '停用'
      }],
			columns: [
				{prop:"name", label:"文档模板名称", minWidth:100},
        {prop:"fileCount", label:"文件个数", minWidth:100},
        {prop:"remark", label:"备注说明", minWidth:100},
        {prop:"status", label:"状态", minWidth:100},
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
    emove(file, fileList) {
      console.log(file, fileList);
    },
    handlePreview(file) {
      console.log(file);
    },
    // 获取表格选中时的数据
    selectRow (val) {
      this.selectlistRow = val
    },
    // 增加行
    addRow () {
      var list = {
        rowNum: '',
        address: this.address,
        name: this.name,
        weather: this.weather,
        phone: this.phone,
        date: this.date,
        mdate: this.mdate,
        loveer: this.loveer}
      this.tableData.unshift(list)
    },
    // 删除选中行
    delData () {
      for (let i = 0; i < this.selectlistRow.length; i++) {
        let val = this.selectlistRow;
        // 获取选中行的索引的方法
        // 遍历表格中tableData数据和选中的val数据，比较它们的rowNum,相等则输出选中行的索引
        // rowNum的作用主要是为了让每一行有一个唯一的数据，方便比较，可以根据个人的开发需求从后台传入特定的数据
        val.forEach((val, index) => {
          this.tableData.forEach((v, i) => {
            if (val.rowNum === v.rowNum) {
              // i 为选中的索引
              this.tableData.splice(i, 1)
            }
          })
        })
      }
      // 删除完数据之后清除勾选框
      this.$refs.tableData.clearSelection()
    },

		// 获取分页数据
		findPage: function (data) {
			if(data !== null) {
				this.pageRequest = data.pageRequest
			}
			this.pageRequest.columnFilters = {name: {name:'name', value:this.filters.name}}
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
  .main {
    width: 80%;
    margin: 0 auto;
    border-radius: 5px;
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
  }
  .titleTag {
    float: left;
    margin: 20px 0 10px 10px;
  }
  .menu {
    float: right;
    margin: 20px 10px 10px 0;
  }
  .table {
    margin: 10px;
    padding-bottom: 10px;
  }
</style>
