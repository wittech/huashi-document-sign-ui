<template>
  <div class="page-container">
    <el-row :gutter="20" style="margin-top:15px">
      <div class="tip">
        <p>系统公告</p>
      </div>
      <div style="width:98%; margin-left:1%; border : 1px #DCDCDC solid;height: 500px;overflow-y: auto;" v-html="notice">
        <!--<iframe ref="iframe" id="iframe" height="500" width="98%" style="border:1px #DCDCDC solid"></iframe>-->
      </div>
    </el-row>
    <el-row>
      <div class="tip">
        <p>催缴通知列表</p>
      </div>
      <el-col :span="24">
        <el-table :data="collectionNoticeData" border style="width: 100%;">
          <el-table-column
            type="index" label="序"
            header-align="center" align="center">
          </el-table-column>
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
        </el-table>
      </el-col>
    </el-row>
    <el-row style="margin-bottom: 50px">
      <div class="tip">
        <p>贷后检查列表</p>
      </div>
      <el-col :span="24">
        <el-table :data="postloanCheckData" border style="width: 100%">
          <el-table-column
            type="index" label="序"
            header-align="center" align="center">
          </el-table-column>
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
            prop="loanDate" header-align="center" align="center" label="放款时间" :formatter="dateFormat">
          </el-table-column>
          <el-table-column
            prop="status" header-align="center" align="center" label="状态" :formatter="statusFormat">
          </el-table-column>
        </el-table>
      </el-col>
    </el-row>
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
    mounted() {
    },
    created(){
      this.loadNotice();
      this.findCollectionNoticeData();
      this.findPostloanCheckData();
    },
    methods: {

      loadNotice() {
        // alert(document.getElementById('iframe'));
        this.$api.noticeAnnouncement.findLastest({}).then((res) => {
          if (res.data !==null) {
            this.notice = res.data.content
          }
        });
      },

      // 获取分页数据
      findCollectionNoticeData() {
        api.collectionNotice.findLastest({}).then((res) => {
          this.collectionNoticeData = res.data;
        });
      },

      // 获取分页数据
      findPostloanCheckData() {
        api.postLoanCheck.findLastest({}).then((res) => {
          this.postloanCheckData = res.data;
        });
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

      // 时间格式化
      dateFormat: function (row, column, cellValue, index) {
        return format(row[column.property])
      }

    },
    data() {
      return {

        notice : "",
        collectionNoticeData : [],
        postloanCheckData : [],

      }
    }
  }
</script>

<style>
  .page-container .tip {
    padding: 8px 16px;
    background-color: #ecf8ff;
    border-radius: 4px;
    border-left: 5px solid #50bfff;
    margin: 20px 0;
  }

  .page-container p {
    font-size: 14px;
    color: #5e6d82;
    line-height: 1.5em;
  }

  .page-container .tip code {
    background-color: hsla(0, 0%, 100%, .7);
    color: #445368;
  }

  code {
    background-color: #f9fafc;
    padding: 0 4px;
    border: 1px solid #eaeefb;
    border-radius: 4px;
  }

  p {
  }

</style>
