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
          <kt-button :label="$t('action.search')" perms="customer:view" type="primary" @click="findPages(null)"/>
        </el-form-item>
      </el-form>
    </div>
    <!--表格内容栏-->
    <el-table :data="pageResult.content" stripe size="mini" style="width: 100%;">
      <el-table-column
        prop="borrower" header-align="center" align="center" width="80" label="借款人">
      </el-table-column>
      <el-table-column
        prop="loanType" header-align="center" align="center" width="150" label="贷款类型" :formatter="loanTypeFormat">
      </el-table-column>
      <el-table-column
        prop="applicationMatters" header-align="center" align="center" width="120" label="申请事项"
        :formatter="applicationMattersFormat">
      </el-table-column>
      <el-table-column
        prop="applicationAmount" header-align="center" align="center" label="申请金额">
      </el-table-column>
      <el-table-column
        prop="loanStartAndStopDate" header-align="center" align="center" label="贷款起止日期">
      </el-table-column>
      <el-table-column
        prop="status" header-align="center" align="center" label="状态" :formatter="statusFormat">
      </el-table-column>
      <el-table-column
        fixed="right" header-align="center" width="300" align="center" :label="$t('action.operation')">
        <template slot-scope="scope">
          <kt-button icon="fa fa-edit" label="填写" perms="loan:view" @click="collectionNoticeDialog(scope.row)"/>
          <kt-button icon="el-icon-printer" label="预览打印" perms="loan:view" @click="handleDeail(scope.row)"/>
          <kt-button icon="fa fa-edit" label="已处理" perms="loan:view" @click="processedClick(scope.row)"/>
        </template>
      </el-table-column>
    </el-table>
    <!--分页栏-->
    <div class="toolbar" style="padding:10px;">
      <el-pagination layout="total, prev, pager, next, jumper" @current-change="refreshPageRequest"
                     :current-page="pageRequest.pageNum" :page-size="pageRequest.pageSize" :total="pageResult.totalSize" style="float:right;">
      </el-pagination>
    </div>

    <!--填写界面-->
    <el-dialog title="填写" width="50%" :visible.sync="collectionNoticeDialogVisible" :close-on-click-modal="false">
      <el-form :model="collectionNoticeForm" label-width="150px" ref="collectionNoticeForm" :size="size">
        <el-form-item label="借款人">
          <el-input v-model="collectionNoticeForm.borrower" disabled="true" size="small" class="width180"></el-input>
        </el-form-item>
        <el-form-item label="个人借款合同编号">
          <el-input v-model="collectionNoticeForm.personalLoanContractNumber" disabled="true" size="small"
                    class="width180"></el-input>
        </el-form-item>
        <el-form-item label="借款期限">
          <el-input v-model="collectionNoticeForm.borrowingPeriod" disabled="true" size="small"
                    class="width180"></el-input>
          月
        </el-form-item>
        <el-form-item label="贷款起止日期">
          <el-input v-model="collectionNoticeForm.loanStartAndStopDate" disabled="true" size="small"
                    class="width180"></el-input>
        </el-form-item>
        <el-form-item label="填写日期">
          <el-date-picker
            v-model="collectionNoticeForm.fillDate"
            type="date"
            placeholder="检查时间">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="所欠本金">
          <el-input v-model="collectionNoticeForm.owePrincipal" size="small" class="width180"></el-input>
          元
        </el-form-item>
        <el-form-item label="所欠利息">
          <el-input v-model="collectionNoticeForm.oweInterest" size="small" class="width180"></el-input>
          元
        </el-form-item>
        <br>
        <el-form-item>
          <el-button type="primary" @click="postLoanCheckFormSave(7)">保存</el-button>
          <el-button type="primary" @click="returnUrl">返回</el-button>
        </el-form-item>
        <br>
      </el-form>
    </el-dialog>

    <!--查看界面-->
    <el-dialog title="预览打印" width="1000px" :visible.sync="deailDialogVisible" :close-on-click-modal="false">
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
      <el-row style="margin-bottom: 5px; margin-top: 5px;">
        <el-button icon="el-icon-s-promotion" type="primary" @click="generateDocOnckick">生成文档</el-button>
        <el-button icon="el-icon-download" type="success" @click="batchDown">批量下载</el-button>
        <el-button icon="el-icon-printer" type="warning" @click="batchPrint">批量打印</el-button>

        <el-switch
          v-model="watermarkSwitch"
          active-color="#13ce66"
          inactive-color="#409eff"
          inactive-text="打印是否加入水印" style="margin-left: 10px; margin-right: 5px;" @change="watermarkSwitchChange">
        </el-switch>
        <el-input
          placeholder="水印内容"
          v-model="watermark"
          v-show="watermarkDisplay"
          style="width:350px;"
          clearable>
        </el-input>

      </el-row>

      <el-table
        border
        :data="fileList"
        @selection-change="handleSelectionChange"
        style="width: 100%"
        v-loading="searchLoading" element-loading-text="处理中">
        <el-table-column
          type="selection"
          width="55">
        </el-table-column>
        <el-table-column
          fixed
          prop="docName"
          label="文档名称"
          width="150">
        </el-table-column>
        <el-table-column
          fixed
          prop="docSize"
          label="文件大小（字节）"
          width="150">
        </el-table-column>
        <el-table-column
          label="操作">
          <template slot-scope="scope">
            <el-button @click="download(scope.row)" type="text" size="small">下载</el-button>
            <el-button @click="printClick(scope.row)" type="text" size="small">打印</el-button>
          </template>
        </el-table-column>
      </el-table>
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
        searchLoading: false,

        watermark: '广西桂林漓江农村合作银行城北支行',
        watermarkSwitch : false,
        watermarkDisplay : false,

        //保存 贷款到期
        collectionNoticeForm: {
          id: '',
          loanBasisId: '',
          borrower: '',
          personalLoanContractNumber: '',
          borrowingPeriod: '',
          loanStartAndStopDate: '',
          fillDate: '',
          owePrincipal: '',
          oweInterest: '',
          lastUpdateNy: ''
        },
        //贷款到期（逾期）催收通知书标记
        collectionNoticeDialogVisible: false,
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
          value: '-1',
          label: '全部',
        }, {
          value: '0',
          label: '未处理',
        }, {
          value: '1',
          label: '已处理',
        }],
        size: 'small',
        filters: {
          borrower: '',
          status: '-1'
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
        loanNoticeId: '',
        baseUrl: this.global.backupBaseUrl,
        //选中相关人员数据
        multipleSelection: [],
      }
    },

    computed: {},
    created() {
      this.findPages(null);
    },

    methods: {
      // 换页刷新
      refreshPageRequest: function (pageNum) {
        this.pageRequest.pageNum = pageNum;
        let data = {
          'pageRequest':this.pageRequest
        }
        this.findPages(data)
      },

      watermarkSwitchChange(val) {
        this.watermarkDisplay = val;
      },

      /**
       * 打印
       */
      printClick(data) {
        let dataParams = {
          loanNoticeDocIds: data.id,
          watermark: (this.watermarkSwitch === true ? this.watermark : "")
        };
        let params = Object.assign({}, dataParams);
        api.collectionNotice.batchPrint(params).then((url) => {
          if (url !=='' && url != null) {
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
        let multipleSelection = this.multipleSelection;
        let stars = "";
        if (multipleSelection) {
          for (let index in multipleSelection) {
            let data = multipleSelection[index];
            stars += data.id + ',';
          }
        }
        if (stars === '') {
          this.$alert('请选择文件', '批量下载提示', {
            confirmButtonText: '确定'
          });
          return;
        }
        let dataParams = {
          loanNoticeDocIds: stars.substr(0, stars.length - 1),
          watermark: (this.watermarkSwitch === true ? this.watermark : "")
        };

        let params = Object.assign({}, dataParams);
        api.collectionNotice.batchPrint(params).then((url) => {
          if (url !== '' && url != null) {
            window.open(url);
          } else {
            this.$message({message: '操作失败', type: 'error'})
          }
        });
      },

      /**
       *填写
       */
      collectionNoticeDialog(data) {
        //获取对象信息
        this.getById(data);
      },

      /**
       *清空
       */
      collectionNoticeFormClear() {
        let collectionNoticeForm = {
          id: '',
          loanBasisId: '',
          borrower: '',
          personalLoanContractNumber: '',
          borrowingPeriod: '',
          loanStartAndStopDate: '',
          fillDate: '',
          owePrincipal: '',
          oweInterest: '',
          lastIpdateNy: ''
        };
        this.collectionNoticeForm = collectionNoticeForm;
      },

      /**
       *返回
       */
      returnUrl() {
        this.collectionNoticeDialogVisible = false;
        // 要求重新加载导航菜单
        this.$store.commit('menuRouteLoaded', false);
        this.$router.push('/collectionNotice/list');
      },

      //根据loanBasisId获取对象信息
      getById(data) {
        let dataParams = {
          id: data.id
        }
        let params = Object.assign({}, dataParams)
        api.collectionNotice.findById(params).then((res) => {
          this.collectionNoticeFormClear();
          if (res.code == '200') {
            this.collectionNoticeDialogVisible = true;
            this.collectionNoticeForm = res.data;
          } else {
            this.collectionNoticeForm = {};
          }
        })
      },

      /**
       *保存
       */
      postLoanCheckFormSave() {
        this.collectionNoticeForm.lastUpdateBy = sessionStorage.getItem("user");
        this.$confirm('确认要保存吗？', '提示', {}).then(() => {
          api.collectionNotice.save(this.collectionNoticeForm).then((res) => {
            if (res.code == 200) {
              this.collectionNoticeFormClear();
              this.returnUrl();
              this.$message({message: '操作成功', type: 'success'})
            } else {
              this.$message({message: '操作失败, ' + res.msg, type: 'error'})
            }
          })
        })
      },

      /**
       *已处理
       */
      processedClick(data) {
        this.collectionNoticeForm = data;
        this.collectionNoticeForm.status = '1';
        this.collectionNoticeForm.lastUpdateBy = sessionStorage.getItem("user");
        this.$confirm('确认要处理吗？', '提示', {}).then(() => {
          api.collectionNotice.save(this.collectionNoticeForm).then((res) => {
            if (res.code == 200) {
              this.postLoanCheckFormClear();
              this.returnUrl();
              this.$message({message: '操作成功', type: 'success'})
            } else {
              this.$message({message: '操作失败, ' + res.msg, type: 'error'})
            }
          })
        })
      },

      /**
       *选择文件
       */
      handleSelectionChange(val) {
        this.multipleSelection = val;
      },

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
          loanNoticeDocIds: data.id
        }
        let params = Object.assign({}, dataParams);
        api.collectionNotice.batchDownload(params).then((res) => {
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
       * 批量下载
       */
      batchDown() {
        let multipleSelection = this.multipleSelection;
        let stars = "";
        if (multipleSelection) {
          for (let index in multipleSelection) {
            let data = multipleSelection[index];
            stars += data.id + ',';
          }
        }
        if (stars === '') {
          this.$alert('请选择文件', '批量下载提示', {
            confirmButtonText: '确定'
          });
          return;
        }
        let dataParams = {
          loanNoticeDocIds: stars.substr(0, stars.length - 1)
        }
        let params = Object.assign({}, dataParams);
        api.collectionNotice.batchDownload(params).then((res) => {
          const blob = new Blob([res], {type: 'application.zip'})//构造一个blob对象来处理数据
          const fileName = this.dateFtt('yyyyMMddHHmmss', new Date()) + '.zip';
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
          loanNoticeId: this.loanNoticeId
        };

        this.searchLoading = true;
        let params = Object.assign({}, dataParams);
        api.collectionNotice.generateDoc(params).then((res) => {
          this.searchLoading = false;
          if (res.code === 200) {
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
        this.loanBasisId = row.loanBasisId;
        this.loanNoticeId = row.id;
        //获取对象信息
        this.getByIoanBasisId(row);
        //获取文件数据
        this.findFileList(row);
        //获取文件列表数据
        this.deailDialogVisible = true;
      },

      //根据id获取文件数据
      findFileList: function (data) {
        let dataParams = {
          loanNoticeId: data.id
        };
        let params = Object.assign({}, dataParams);
        api.collectionNotice.findByLoanNoticeId(params).then((res) => {
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
          }
          this.fileList = dataList;
        }
      },

      //根据id获取对象信息
      getByIoanBasisId(data) {
        let dataParams = {
          id: data.loanBasisId
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
        this.pageRequest.columnFilters = {
          borrower: {name: 'borrower', value: this.filters.borrower},
          status: {name: 'status', value: this.filters.status}
        }
        api.collectionNotice.findPage(this.pageRequest).then((res) => {
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

    },
    mounted() {
    }
  }
</script>

<style scoped>

  <!--
  文本下拉框-- >
  .el-widith-l {
    width: 180px !important;
  }

  .el-form-item {
    margin-bottom: 15px !important;
  }

  .el-radio-group {
    width: 660px !important;
  }

  .el-form-item__label {
    width: 150px !important;
  }

  .el-checkbox-group {
    width: 660px !important;
  }

  .checkgroup {
    width: 660px !important;
  }

  .width180 {
    width: 180px !important;
  }

  .width150 {
    width: 210px !important;
  }

  .width350 {
    width: 550px !important;
  }

  .width378 {
    max-width: 378px;
  }

  .height30 {
    height: 30px !important;
  }

  .row-list-ove {
    position: relative;
    height: auto;
    margin-bottom: 10px;
    display: flex;
    flex-direction: row;
  }

  .ove-block {
    /*width:auto;*/
    flex: 1;
    margin-right: 20px;
    display: flex;
    flex-direction: row;
  }

  .ove-title {
    /*width:auto;*/
    flex: 0.7;
    /*width:80px;*/
    /*background:#eee;*/
    display: flex;
    flex-direction: row-reverse;
    align-items: center;
  }

  .typeface {
    font-size: 12px;
    font-family: Helvetica Neue, "微软雅黑", "黑体";
    color: #333;
  }

  .ove-content {
    /*flex:1;*/
    /*background:#888;*/
    margin-left: 10px;
    display: flex;
    flex-direction: row;
    align-items: center;
  }

  .redface {
    font-size: 12px;
    font-family: Helvetica Neue, "微软雅黑", "黑体";
    color: #F44848;
  }

  .top5 {
    margin-top: 5px;
  }

  .el-date-table .el-radio {

  }

  /*进度 样式*/
  .schedule {
    cursor: pointer;
  }

</style>
