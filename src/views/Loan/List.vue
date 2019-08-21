<template>
  <div class="page-container">
    <!--工具栏-->
    <div class="toolbar" style="float:left;padding-top:10px;padding-left:15px;">
      <el-form :inline="true" :model="filters" :size="size">
        <!-- <el-form-item>
           <el-select v-model="filters.status" placeholder="请选择状态">
             <el-option
               v-for="item in StatusOptions"
               :key="item.value"
               :label="item.label"
               :value="item.value">
             </el-option>
           </el-select>
         </el-form-item>-->
        <el-form-item>
          <el-input v-model="filters.borrower" placeholder="借款人及相关人"></el-input>
        </el-form-item>
        <el-form-item>
          <kt-button :label="$t('action.search')" perms="customer:view" type="primary" @click="findPages(null)"/>
        </el-form-item>
        <!--	<el-form-item>
                    <kt-button :label="$t('action.add')" perms="customer:add" type="primary" @click="handleAdd" />
                </el-form-item>-->
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
        prop="applicationMatters" header-align="center" align="center" width="120" label="申请事项"
        :formatter="applicationMattersFormat">
      </el-table-column>
      <el-table-column
        prop="guaranteeMethod" header-align="center" align="center" label="担保方式">
      </el-table-column>
      <el-table-column
        prop="createTime" header-align="center" align="center" label="添加时间" :formatter="dateFormat">
      </el-table-column>
      <el-table-column
        prop="createBy" header-align="center" align="center" label="添加人">
      </el-table-column>
      <el-table-column
        fixed="right" header-align="center" align="center" width="185" :label="$t('action.operation')">
        <template slot-scope="scope">
          <kt-button icon="fa fa-edit" label="查看" perms="loan:view" @click="handleDeail(scope.row)"/>
          <kt-button icon="fa fa-edit" label="修改" perms="loan:view" @click="editHref(scope.row)"/>
        </template>
      </el-table-column>

    </el-table>

    <!--查看界面-->
    <el-dialog title="查看文件详情" width="80%" :visible.sync="deailDialogVisible" :close-on-click-modal="false">
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
      <el-row style="margin-bottom: 5px;">
        <el-button icon="el-icon-s-promotion" type="primary" @click="generateDocOnckick" :loading="loading">生成文档
        </el-button>

        <el-button icon="el-icon-download" type="success" @click="batchDown">批量下载</el-button>
        <el-button icon="el-icon-printer" type="warning" @click="batchPrint">批量打印</el-button>
        <el-checkbox :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAllChange">全选</el-checkbox>

      </el-row>

      <el-row v-loading="searchLoading" element-loading-text="处理中" >
        <el-checkbox-group v-model="checkedDocs" @change="handleCheckedDocChange">
          <el-col :span="4" v-for="(doc, index) in fileList">
            <el-card :body-style="{ padding: '0px' }">
              <div style="padding: 14px; height : 155px;">
                <img v-if="doc.docPath.indexOf('doc') > 0 || doc.docPath.indexOf('docx') > 0" src='@/assets/word.jpg'
                     class="image">
                <img v-else-if="doc.docPath.indexOf('xls') > 0 ||  doc.docPath.indexOf('xlsx') > 0"
                     src='@/assets/excel.jpg' class="image">
                <span style="font-size: 14px;">{{doc.fileName}}</span><span class="time">（{{(doc.docSize / 1024).toFixed(1)}} KB）</span>
                <div class="bottom clearfix">
                  <time class="time">{{doc.createTime}}</time>
                </div>
                <div class="bottom clearfix">
                <span style="margin-right: 50px;">
                  <!--<el-checkbox v-model="docIds" :label="doc.id">{{index + 1}}</el-checkbox>-->
                  <el-checkbox :label="doc.id" :key="doc.id">{{index + 1}}</el-checkbox>
                </span>
                  <el-button @click="download(doc)" type="text" size="small">下载</el-button>
                  <el-button @click="printClick(doc)" type="text" size="small">打印</el-button>
                </div>
              </div>
            </el-card>
          </el-col>
        </el-checkbox-group>
      </el-row>

    </el-dialog>
  </div>
</template>

<script>
  import axios from 'axios';
  import KtTable from "@/views/Core/KtTable"
  import KtButton from "@/views/Core/KtButton"
  import {format} from "@/utils/datetime"
  import api from '@/http/api'

  export default {
    components: {
      KtTable,
      KtButton
    },
    data() {
      return {
        isIndeterminate: false,
        checkAll: false,
        checkedDocs: [],
        checkedDocIds: [],
        searchLoading : false,

        //贷款类型
        LoanTypeOptions: [{
          VAL_CODE: '01',
          VAL_NAME: '新增',
        }, {
          VAL_CODE: '02',
          VAL_NAME: '续约',
        }],
        //借口人基础信息
        loanBasisForm: {
          loanType: '',
          applicationMatters: '',
          guaranteeMethod: [],
          borrower: '',
        },
        //文件列表
        fileList: [],
        //查看
        deailDialogVisible: false,
        //状态
        StatusOptions: [{
          value: '0',
          label: '未处理',
        }, {
          value: '1',
          label: '已处理',
        }],
        size: 'small',
        filters: {
          borrower: '',
          status: '0'
        },
        pageRequest: {pageNum: 1, pageSize: 8},
        pageResult: {},

        operation: false, // true:新增, false:编辑
        editDialogVisible: false, // 新增编辑界面是否显示
        editLoading: false,
        dataFormRules: {
          label: [
            {required: true, message: '请输入名称', trigger: 'blur'}
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
        },
        loanBasisId: '',
        baseUrl: this.global.backupBaseUrl,
      }
    },

    computed: {},
    created() {
      this.findPages(null);
    },

    methods: {

      /**
       * 下载
       */
      download(data) {
        let docPath = data.docPath;
        if (docPath == null || docPath == '') {
          this.$alert('下载文件失败 文件为空！', '下载提示', {
            confirmButtonText: '确定'
          });
          return;
        }
        let dataParams = {
          loanDocIds: data.id
        }
        let params = Object.assign({}, dataParams);
        api.fileDoc.batchDownload(params).then((res) => {
          const blob = new Blob([res], {type: 'application.zip'})//构造一个blob对象来处理数据
          const fileName = data.fileName + '.zip';
          //对于<a>标签，只有 Firefox 和 Chrome（内核） 支持 download 属性
          //IE10以上支持blob但是依然不支持download
          if ('download' in document.createElement('a')) { //支持a标签download的浏览器
            const link = document.createElement('a')//创建a标签
            link.download = fileName//a标签添加属性
            link.style.display = 'none'
            link.href = URL.createObjectURL(blob)
            document.body.appendChild(link)
            link.click()//执行下载
            URL.revokeObjectURL(link.href) //释放url
            document.body.removeChild(link)//释放标签
          } else { //其他浏览器
            navigator.msSaveBlob(blob, fileName)
          }
        })
      },

      /**
       * 打印
       */
      printClick(data) {
        let dataParams = {
          loanDocIds: data.id
        }
        let params = Object.assign({}, dataParams);
        api.fileDoc.batchPrint(params).then((url) => {
          if (url != '' && url != null) {
            window.open(url);
          } else {
            this.$message({message: '操作失败', type: 'error'})
          }
        })
      },

      /**
       * 批量打印
       */
      batchPrint() {
        let val = this.checkVal();
        if (val === '') {
          this.$alert('请选择文件', '批量打印提示', {
            confirmButtonText: '确定'
          });
          return;
        }
        let dataParams = {
          loanDocIds: val.substr(0, val.length - 1)
        }
        this.searchLoading = true;
        let params = Object.assign({}, dataParams);
        api.fileDoc.batchPrint(params).then((url) => {
          this.searchLoading = false;
          if (url != '' && url != null) {
            window.open(url);
          } else {
            this.$message({message: '操作失败', type: 'error'})
          }
        });
      },

      handleCheckAllChange(val) {
        this.checkedDocs = val ? this.checkedDocIds : [];
        this.isIndeterminate = false;
      },

      handleCheckedDocChange(value) {
        let checkedCount = value.length;
        this.checkAll = checkedCount === this.fileList.length;
        this.isIndeterminate = checkedCount > 0 && checkedCount < this.fileList.length;
      },

      checkVal: function () {
        let multipleSelection = this.checkedDocs;
        let checkVal = "";
        if (multipleSelection) {
          for (let index in multipleSelection) {
            let data = multipleSelection[index];
            checkVal += data + ",";
          }
        }
        return checkVal;
      },

      /**
       * 批量下载
       */
      batchDown() {
        let val = this.checkVal();
        if (val === '') {
          this.$alert('请选择文件', '批量下载提示', {
            confirmButtonText: '确定'
          });
          return;
        }
        let dataParams = {
          loanDocIds: val.substr(0, val.length - 1)
        };
        this.searchLoading = true;
        let params = Object.assign({}, dataParams);
        api.fileDoc.batchDownload(params).then((res) => {
          this.searchLoading = false;
          const blob = new Blob([res], {type: 'application.zip'})//构造一个blob对象来处理数据
          const fileName = this.dateFtt('yyyyMMddHHmmss', new Date()) + '.zip';
          //对于<a>标签，只有 Firefox 和 Chrome（内核） 支持 download 属性
          //IE10以上支持blob但是依然不支持download
          if ('download' in document.createElement('a')) { //支持a标签download的浏览器
            const link = document.createElement('a');//创建a标签
            link.download = fileName;//a标签添加属性
            link.style.display = 'none';
            link.href = URL.createObjectURL(blob);
            document.body.appendChild(link);
            link.click();//执行下载
            URL.revokeObjectURL(link.href); //释放url
            document.body.removeChild(link);//释放标签
          } else { //其他浏览器
            navigator.msSaveBlob(blob, fileName)
          }
        })

      },

      dateFtt(fmt, date) { //author: meizz
        var o = {
          "M+": date.getMonth() + 1,     //月份
          "d+": date.getDate(),     //日
          "h+": date.getHours(),     //小时
          "m+": date.getMinutes(),     //分
          "s+": date.getSeconds(),     //秒
          "q+": Math.floor((date.getMonth() + 3) / 3), //季度
          "S": date.getMilliseconds()    //毫秒
        };
        if (/(y+)/.test(fmt))
          fmt = fmt.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length));
        for (var k in o)
          if (new RegExp("(" + k + ")").test(fmt))
            fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
        return fmt;
      },

      /**
       * 生成文档
       */
      generateDocOnckick() {
        let dataParams = {
          loanBasisId: this.loanBasisId
        }
        this.searchLoading = true;
        let params = Object.assign({}, dataParams);
        api.loan.generateDoc(params).then((res) => {
          this.searchLoading = false;
          this.findFileList(this.loanBasisId);
          if (res.code == 200) {
            this.$message({message: '操作成功', type: 'success'})
          } else {
            this.$message({message: '操作失败, ' + res.msg, type: 'error'})
          }
        })
      },

      /**
       * 查看
       */
      handleDeail(row) {
        this.loanBasisId = row.id;
        //获取对象信息
        this.getByIds(row);
        //获取文件数据
        this.findFileList(row.id);
        //获取文件列表数据
        this.deailDialogVisible = true;
      },

      //根据id获取文件数据
      findFileList: function (loanBasisId) {
        let dataParams = {
          loanBasisId: loanBasisId
        }
        let params = Object.assign({}, dataParams);
        api.loan.queryByLoanBasisId(params).then((res) => {
          if (res.code == '200') {
            this.setFileList(res.data);
          } else {
            this.fileList = {};
          }
        });
      },

      setFileList(dataList) {
        if (dataList) {
          for (let index in dataList) {
            let data = dataList[index];
            data.fileName = data.docName + '-' + data.sort;
            this.checkedDocIds.push(data.id);
          }
          this.fileList = dataList;

        }
      },

      //根据id获取对象信息
      getByIds(data) {
        let dataParams = {
          id: data.id
        }
        let params = Object.assign({}, dataParams)
        api.loan.findById(params).then((res) => {
          if (res.code == '200') {
            this.loanBasisFormInfp(res.data);
          } else {
            this.loanBasisForm = {};
          }
        })
      },

      //根据基础信息id获取基础对象
      loanBasisFormInfp(data) {
        if (data) {
          //贷款类型: 0新增 1续贷
          let loanTypeName = '';
          if (data.loanType == '0') {
            loanTypeName = '新增';
          } else if (data.loanType == '1') {
            loanTypeName = '续贷';
          }
          //申请事项：0 个人经营性贷款 1信用贷款 2 房屋按揭贷款 3个人消费类贷款
          let applicationMattersName = '';
          if (data.applicationMatters == '0') {
            applicationMattersName = '个人经营性贷款';
          } else if (data.applicationMatters == '1') {
            applicationMattersName = '信用贷款';
          } else if (data.applicationMatters == '2') {
            applicationMattersName = '房屋按揭贷款';
          } else if (data.applicationMatters == '3') {
            applicationMattersName = '个人消费类贷款';
          }
          this.loanBasisForm = data;
          this.loanBasisForm.loanType = loanTypeName;
          this.loanBasisForm.applicationMatters = applicationMattersName;
        }
      },

      // 获取分页数据
      findPages: function (data) {
        if (data !== null) {
          this.pageRequest = data.pageRequest
        }
        this.pageRequest.columnFilters = {borrower: {name: 'borrower', value: this.filters.borrower}}
        api.loan.findPage(this.pageRequest).then((res) => {
          this.pageResult = res.data;
        });
      },
      // 批量删除
      handleDelete: function (data) {
        api.customer.batchDelete(data.params).then(data != null ? data.callback : '')
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
                if (res.code == 200) {
                  this.$message({message: '操作成功', type: 'success'})
                } else {
                  this.$message({message: '操作失败, ' + res.msg, type: 'error'})
                }
                this.editLoading = false
                this.$refs['dataForm'].resetFields()
                this.editDialogVisible = false
                this.findPages(null)
              })
            })
          }
        })
      },
      // 时间格式化
      dateFormat: function (row, column, cellValue, index) {
        return format(row[column.property])
      },
      //申请期限
      applicationPeriodFormat: function (row, column, cellValue, index) {
        if (row[column.property] != '' && row[column.property] != undefined && row[column.property] != null) {
          return row[column.property] + '年';
        } else {
          return '';
        }
      },

      //申请事项：0 个人经营性贷款 1信用贷款 2 房屋按揭贷款 3个人消费类贷款
      applicationMattersFormat: function (row, column, cellValue, index) {
        if (row[column.property] == '0') {
          return '个人经营性贷款';
        } else if (row[column.property] == '1') {
          return '信用贷款';
        } else if (row[column.property] == '2') {
          return '房屋按揭贷款';
        } else if (row[column.property] == '3') {
          return '个人消费类贷款';
        }
      },

      // 状态 0未处理 1已处理
      statusFormat: function (row, column, cellValue, index) {
        if (row[column.property] == '0') {
          return '未处理';
        } else if (row[column.property] == '1') {
          return '已处理';
        }
      },
      // 贷款类型: 0新增 1续贷
      loanTypeFormat: function (row, column, cellValue, index) {
        if (row[column.property] == '0') {
          return '新增';
        } else if (row[column.property] == '1') {
          return '续贷';
        }
      },

      //修改
      editHref(data){
        sessionStorage.setItem('baseLoneId', data.id);
        sessionStorage.setItem('loanType', data.loanType);
        sessionStorage.setItem('status', data.status);
        this.$router.push('/loan/editBase');
        //this.$router.push('/loan/addBase');

      },

    },
    mounted() {
    }
  }
</script>

<style scoped>
  .time {
    font-size: 13px;
    color: #999;
  }

  .bottom {
    margin-top: 13px;
    line-height: 12px;
  }

  .button {
    padding: 0;
    float: right;
  }

  .image {
    width: 16px;
  }

  .clearfix:before,
  .clearfix:after {
    display: table;
    content: "";
  }

  .clearfix:after {
    clear: both
  }
</style>
