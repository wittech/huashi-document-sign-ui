<template>
  <div class="page-container">
    <!--工具栏-->
    <div class="toolbar" style="float:left;padding-top:10px;padding-left:15px;">
      <el-form :inline="true" :model="filters" :size="size">
        <el-form-item>
          <el-input v-model="filters.title" placeholder="标题"></el-input>
        </el-form-item>
        <el-form-item>
          <kt-button icon="fa fa-search" :label="$t('action.search')" perms="sys:dict:view" type="primary" @click="findPage(null)"/>
        </el-form-item>
        <el-form-item>
          <kt-button icon="fa fa-plus" :label="$t('action.add')" perms="sys:dict:add" type="primary" @click="handleAdd" />
        </el-form-item>
      </el-form>
    </div>
    <!--表格内容栏-->
    <kt-table :height="350" permsEdit="noticeAnnouncement:edit" permsDelete="noticeAnnouncement:delete"
              :data="pageResult" :columns="columns"
              @findPage="findPage" @handleEdit="handleEdit" @handleDelete="handleDelete">
    </kt-table>
    <!--新增编辑界面-->
    <el-dialog :title="operation?'新增':'编辑'" width="60%" :visible.sync="editDialogVisible" :close-on-click-modal="false">
      <el-form :model="dataForm" label-width="80px" :rules="dataFormRules" ref="dataForm" :size="size">
        <el-form-item label="ID" prop="id"  v-if="false">
          <el-input v-model="dataForm.id" :disabled="true" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="标题" prop="title">
          <el-input v-model="dataForm.title" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="内容" prop="content">
            <el-card style="height: 310px;">
              <quill-editor v-model="dataForm.content" ref="myQuillEditor" style="height: 310px;width:689.39px;" :options="editorOption">
              </quill-editor>
            </el-card>
          <!--<el-input v-model="dataForm.content" auto-complete="off"></el-input>-->
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
  import { quillEditor } from 'vue-quill-editor' //调用编辑器
  import 'quill/dist/quill.core.css'
  import 'quill/dist/quill.snow.css'
  import 'quill/dist/quill.bubble.css'
  export default {
    components:{
      KtTable,
      KtButton,
      quillEditor
    },
    computed: {
      editor() {
        return this.$refs.myQuillEditor.quill
      }
    },
    data() {
      return {
        size: 'small',
        filters: {
          title: ''
        },
        columns: [
          {prop:"id", label:"ID", minWidth:50},
          {prop:"title", label:"标题", minWidth:100},
          {prop:"content", label:"内容", minWidth:100},
          {prop:"createBy", label:"创建人", minWidth:100},
          {prop:"createTime", label:"创建时间", minWidth:120, formatter:this.dateFormat}
        ],
        pageRequest: { pageNum: 1, pageSize: 10 },
        pageResult: {},

        operation: false, // true:新增, false:编辑
        editDialogVisible: false, // 新增编辑界面是否显示
        editLoading: false,
        dataFormRules: {
          title: [
            { required: true, message: '请输入标题', trigger: 'blur' }
          ],
          content: [
            { required: true, message: '请输入内容', trigger: 'blur' }
          ]
        },
        // 新增编辑界面数据
        dataForm: {
          id: 0,
          title: '',
          content: ''
        },
        editorOption: {}
      }
    },
    methods: {
      onEditorReady(editor) {
      },
      // 获取分页数据
      findPage: function (data) {
        if(data !== null) {
          this.pageRequest = data.pageRequest
        }
        this.pageRequest.columnFilters = {title: {name:'title', value:this.filters.title}}
        this.$api.noticeAnnouncement.findPage(this.pageRequest).then((res) => {
          this.pageResult = res.data
        }).then(data!=null?data.callback:'')
      },
      // 批量删除
      handleDelete: function (data) {
        this.$api.noticeAnnouncement.batchDelete(data.params).then(data!=null?data.callback:'')
      },
      // 显示新增界面
      handleAdd: function () {
        this.editDialogVisible = true
        this.operation = true
        this.dataForm = {
          id: 0,
          title: '',
          content: '',
          createBy:'',
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
              this.$api.noticeAnnouncement.save(params).then((res) => {
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
      let user = sessionStorage.getItem("user");
      if (user) {
         this.dataForm.createBy=user;
      }
    }
  }
</script>

<style scoped>

</style>
