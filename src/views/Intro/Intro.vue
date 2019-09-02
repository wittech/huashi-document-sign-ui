<template>
  <div class="page-container">
    <el-row :gutter="20" style="margin-top:15px">
      <div class="tip">
        <p>系统公告</p>
      </div>
      <div style="width:100%;text-align: center">
        <iframe name="notice" height="500" width="98%" style="border:1px #DCDCDC solid"></iframe>
      </div>
    </el-row>
    <el-row>
      <div class="tip">
        <p>催缴通知列表</p>
      </div>
      <el-col :span="24">
        <!--<el-table :data="collectionNoticeData" stripe size="mini" style="width: 100%;">-->
          <!--<el-table-column-->
            <!--prop="borrower" header-align="center" align="center" width="80" label="借款人">-->
          <!--</el-table-column>-->
          <!--<el-table-column-->
            <!--prop="loanType" header-align="center" align="center" width="150" label="贷款类型" :formatter="loanTypeFormat">-->
          <!--</el-table-column>-->
          <!--<el-table-column-->
            <!--prop="applicationMatters" header-align="center" align="center" width="120" label="申请事项"-->
            <!--:formatter="applicationMattersFormat">-->
          <!--</el-table-column>-->
          <!--<el-table-column-->
            <!--prop="applicationAmount" header-align="center" align="center" label="申请金额">-->
          <!--</el-table-column>-->
          <!--<el-table-column-->
            <!--prop="loanStartAndStopDate" header-align="center" align="center" label="贷款起止日期">-->
          <!--</el-table-column>-->
          <!--<el-table-column-->
            <!--prop="status" header-align="center" align="center" label="状态" :formatter="statusFormat">-->
          <!--</el-table-column>-->
        <!--</el-table>-->


        <el-table
          :data="tableData"
          border
          style="width: 100%">
          <el-table-column
            prop="date"
            label="日期"
            width="180">
          </el-table-column>
          <el-table-column
            prop="name"
            label="姓名"
            width="180">
          </el-table-column>
          <el-table-column
            prop="address"
            label="地址">
          </el-table-column>
        </el-table>
      </el-col>
    </el-row>
    <el-row style="margin-bottom: 50px">
      <div class="tip">
        <p>贷后检查列表</p>
      </div>
      <el-col :span="24">
        <el-table
          :data="tableData"
          border
          style="width: 100%">
          <el-table-column
            prop="date"
            label="日期"
            width="180">
          </el-table-column>
          <el-table-column
            prop="name"
            label="姓名"
            width="180">
          </el-table-column>
          <el-table-column
            prop="address"
            label="地址">
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

  export default {
    components: {
      KtTable,
      KtButton
    },
    mounted() {
    },
    created(){
      this.loadNotice();
    },
    methods: {

      loadNotice() {
        this.$api.noticeAnnouncement.findLastest().then((res) => {
          if (res.data !==null) {
            this.$el.getElementsByTagName('iframe')[0].contentWindow.body = res.data.content;
          }
        });
      }

    },
    data() {
      return {
        tableData: [{
          date: '2016-05-02',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-04',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1517 弄'
        }, {
          date: '2016-05-01',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1519 弄'
        }, {
          date: '2016-05-03',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1516 弄'
        }]
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
