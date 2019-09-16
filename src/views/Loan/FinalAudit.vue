<template>
  <el-form :model="finalAuditInformation" label-width="150px" :rules="dataFormRules" ref="contractInformation" :size="size">


    <el-form-item label="借款金额">
      <el-input v-model="contractInformation.personalLoanContractNo" size="small" class="width150"></el-input>
    </el-form-item>

    <el-form-item label="借款期限">
      <el-input v-model="contractInformation.mortgageGuaranteeContractNo" size="small" class="width150"></el-input>
    </el-form-item>

    <el-row >
      <el-form-item label="利率执行标准">
        <el-col span="3">
          <el-radio v-model="radio" label="1年">1年</el-radio>
          <el-radio v-model="radio" label="5年">5年</el-radio>
        </el-col>
        <el-col span="3">
          <el-form-item label="贷款市场报价利率">
            <el-input placeholder="" size="small" class="width150" v-model="input2">
              <template slot="append">%</template>
            </el-input>
          </el-form-item>
        </el-col>
      </el-form-item>
    </el-row>


    <el-row >
      <el-form-item label="浮动方式">
        <el-col span="3">
          <el-radio v-model="radio" label="上浮">上浮</el-radio>
          <el-radio v-model="radio" label="下浮">下浮</el-radio>
        </el-col>
        <el-col span="3">
          <el-form-item label="">
            <el-input placeholder=""  size="small" class="width150" v-model="input2">
              <template slot="append">%</template>
            </el-input>
          </el-form-item>
        </el-col>
      </el-form-item>
    </el-row>

    <el-form-item label="执行年利率">
      <el-form-item label="">
        <el-input placeholder="执行年利率" size="small" class="width150" v-model="input2">
          <template slot="append">%</template>
        </el-input>
      </el-form-item>
    </el-form-item>
    <el-form-item label="结息方式">
      <el-radio v-model="radio" label="按月">按月</el-radio>
      <el-radio v-model="radio" label="按季">按季</el-radio>
      <el-radio v-model="radio" label="按年">按年</el-radio>
    </el-form-item>

    <el-row >
      <el-form-item label="还款方式">
        <el-col span="12">
          <el-radio v-model="radio" label="利随本清">利随本清</el-radio>
          <el-radio v-model="radio" label="到期一次性还本">到期一次性还本</el-radio>
          <el-radio v-model="radio" label="分期还本">分期还本</el-radio>
          <el-radio v-model="radio" label="等额本金">等额本金</el-radio>
          <el-radio v-model="radio" label="等额本息">等额本息</el-radio>
          <el-radio v-model="radio" label="其他">其他</el-radio>
        </el-col>
        <el-col span="1">
          <el-form-item label="">
            <el-input v-model="contractInformation.guaranteeGuaranteeContractNo" size="small" class="width150"></el-input>
          </el-form-item>
        </el-col>
      </el-form-item>
    </el-row>
  </el-form>
</template>

<script>
    export default {
        name: "FinalAudit"
    }
</script>

<style scoped>

</style>
