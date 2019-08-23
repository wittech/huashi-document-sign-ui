<template>
  <div>
    <el-steps :active="active" finish-status="success">
      <el-step title="基础信息" @click.native="stepClick(0)"  class="schedule"></el-step>
      <el-step title="借款人情况" @click.native="stepClick(1)" class="schedule"></el-step>
      <el-step title="相关人情况" @click.native="stepClick(2)" class="schedule"></el-step>
      <el-step title="抵押物" @click.native="stepClick(3)" class="schedule"></el-step>
      <el-step title="相关贷款业务信息" @click.native="stepClick(4)" class="schedule"></el-step>
      <!--<el-step title="合影" @click.native="stepClick(5)" class="schedule"></el-step>-->
      <el-step title="个人贷款调查报告表" @click.native="stepClick(6)" class="schedule"></el-step>
      <el-step title="合同信息" @click.native="stepClick(7)" class="schedule"></el-step>
      <!-- <el-step title="基础信息"></el-step>
          <el-step title="借款人情况"></el-step>
          <el-step title="相关人情况"></el-step>
          <el-step title="抵押物"></el-step>
          <el-step title="相关贷款业务信息"></el-step>
         &lt;!&ndash; <el-step title="合影"></el-step>&ndash;&gt;
          <el-step title="个人贷款调查报告表"></el-step>
          <el-step title="合同信息"></el-step>-->
    </el-steps>
    <!--0、基础信息-->
    <div v-if="active==0" class="step1">
      <el-form :model="loanBasisForm" label-width="80px" :rules="loanBasisFormRules" ref="loanBasisForm" :size="size">
        <div>
          <el-form-item label="贷款类型" prop="loanType">
            <el-radio-group v-model="loanBasisForm.loanType" @change="loanTypeChage">
              <el-radio  v-for="(vl, index) in LoanTypeOptions" :label="vl.VAL_CODE" :key="index">
                {{vl.VAL_NAME}}
              </el-radio>
            </el-radio-group>
          </el-form-item>
        </div>
        <div>
          <el-form-item label="申请事项" v-show="applicationMattersFlag">
            <el-radio-group v-model="loanBasisForm.applicationMatters" @change="applicationMattersChange">
              <el-radio  v-for="(vl, index) in ApplicationMattersOptions" :label="vl.VAL_CODE" :key="index">
                {{vl.VAL_NAME}}
              </el-radio>
            </el-radio-group>
          </el-form-item>
        </div>

        <el-form-item label="担保方式" v-show="guaranteeNethodFlag">
          <el-checkbox-group  v-model="loanBasisForm.guaranteeMethod" class="checkgroup">
            <el-checkbox v-for="vl in GuaranteeMethodOptions" :key="vl.VAL_CODE" :label="vl.VAL_CODE">{{vl.VAL_NAME}}</el-checkbox>
          </el-checkbox-group>
        </el-form-item>

        <el-form-item label="借款人" prop="borrower">
          <el-input v-model="loanBasisForm.borrower" auto-complete="off" size="small" class="width350"></el-input>
        </el-form-item>

        <el-form-item>
          <el-button type="primary"  @click="saveBasicSubmit">下一步</el-button>
          <el-button @click="previous">返回</el-button>
        </el-form-item>
      </el-form>

    </div>
    <!--1、借款人情况-->
    <div v-if="active==1">
      <el-form :model="relatedPersonnelInformationForm" label-width="150px" :rules="add2Rules" ref="relatedPersonnelInformationForm" :size="size">
        <el-row>
          <el-col span="8">
            <el-form-item label="姓名" class="item" prop="name">
              <el-input v-model="relatedPersonnelInformationForm.name" size="small" class="width150"></el-input>
            </el-form-item>
          </el-col>
          <el-col span="8">
            <el-form-item label="身份证号码" prop="identityNumber">
              <el-input v-model="relatedPersonnelInformationForm.identityNumber" size="small" class="width150"></el-input>
            </el-form-item>
          </el-col>
        </el-row>

        <el-form-item label="年龄" prop="age">
          <el-input v-model.number="relatedPersonnelInformationForm.age" size="small" class="width150"></el-input>
        </el-form-item>
        <el-form-item label="性别">
          <el-radio-group v-model="relatedPersonnelInformationForm.sex">
            <el-radio  v-for="(vl, index) in SexOptions" :label="vl.VAL_CODE" :key="index">
              {{vl.VAL_NAME}}
            </el-radio>
          </el-radio-group>
        </el-form-item>
        <el-row>
          <el-col span="8">
            <el-form-item label="户籍所在地">
              <el-input v-model="relatedPersonnelInformationForm.domicile" size="small" class="width150"></el-input>
            </el-form-item>
          </el-col>
          <el-col span="8">
            <el-form-item label="现居住地址">
              <el-input v-model="relatedPersonnelInformationForm.currentHomeAddress" size="small" class="width150"></el-input>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row>
          <el-col span="8">
            <el-form-item label="本地居住时间" prop="localResidenceTime">
              <el-input v-model="relatedPersonnelInformationForm.localResidenceTime" size="small" class="width150"></el-input> 年
            </el-form-item>
          </el-col>
        </el-row>
        <el-form-item label="常用通信地址">
          <el-radio-group v-model="relatedPersonnelInformationForm.contactAddress">
            <el-radio  v-for="(vl, index) in ContactAddressOptions" :label="vl.VAL_CODE" :key="index">
              {{vl.VAL_NAME}}
            </el-radio>
          </el-radio-group>
        </el-form-item>

        <el-row>
          <el-col span="8">
            <el-form-item label="联系电话">
              <el-input v-model="relatedPersonnelInformationForm.contactNumber" size="small" class="width150"></el-input>
            </el-form-item>
          </el-col>
          <el-col span="8">
            <el-form-item label="电子邮箱">
              <el-input v-model="relatedPersonnelInformationForm.email" size="small" class="width150"></el-input>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row>
          <el-col span="8">
            <el-form-item label="QQ号">
              <el-input v-model="relatedPersonnelInformationForm.qq" size="small" class="width150"></el-input>
            </el-form-item>
          </el-col>
          <el-col span="8">
            <el-form-item label="微信号">
              <el-input v-model="relatedPersonnelInformationForm.wechat" size="small" class="width150"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-form-item label="文化程度">
          <el-radio-group v-model="relatedPersonnelInformationForm.educationalLevel" @change="educationaLevelChange">
            <el-radio  v-for="(vl, index) in EducationalLevelOptions" :label="vl.VAL_CODE" :key="index">
              {{vl.VAL_NAME}}
            </el-radio>
          </el-radio-group>
          <!--其他-->
          <el-input v-model="relatedPersonnelInformationForm.educationalLevelValue" v-show="educationalLevelFlag" size="small" class="width150"></el-input>
        </el-form-item>

        <el-form-item label="现住房来源">
          <el-radio-group v-model="relatedPersonnelInformationForm.currentHousingSource" @change="currentHousingSourceChange">
            <el-radio  v-for="(vl, index) in CurrentHousingSourceOptions" :label="vl.VAL_CODE" :key="index">
              {{vl.VAL_NAME}}
            </el-radio>
          </el-radio-group>
          <!--其他-->
          <el-input v-model="relatedPersonnelInformationForm.currentHousingSourceValue" v-show="currentHousingSourceFlag" size="small" class="width150"></el-input>
        </el-form-item>
        <el-row>
          <el-col span="8">
            <el-form-item label="工作单位">
              <el-input v-model="relatedPersonnelInformationForm.employer" size="small" class="width150"></el-input>
            </el-form-item>
          </el-col>
          <el-col span="8">
            <el-form-item label="职务">
              <el-input v-model="relatedPersonnelInformationForm.position" size="small" class="width150"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col span="8">
            <el-form-item label="持股比例">
              <el-input v-model="relatedPersonnelInformationForm.shareholdingRatio" size="small" class="width150"></el-input>
            </el-form-item>
          </el-col>
          <el-col span="8">
            <el-form-item label="工作年限" prop="unitWorkingYears">
              <el-input v-model="relatedPersonnelInformationForm.unitWorkingYears" placeholder="在该单位工作年限" size="small" class="width150"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col span="8">
            <el-form-item label="投资经营企业">
              <el-input v-model="relatedPersonnelInformationForm.companyName" placeholder="所投资或经营企业名称" size="small" class="width150"></el-input>
            </el-form-item>
          </el-col>
          <el-col span="8">
            <el-form-item label="行业经营年限" prop="yearsOperation">
              <el-input v-model="relatedPersonnelInformationForm.yearsOperation" placeholder="本行业和相近行业经营年限" size="small" class="width180"></el-input>
            </el-form-item>
          </el-col>
        </el-row>

        <el-form-item label="资产情况">
          <el-radio-group v-model="relatedPersonnelInformationForm.assetSituation" @change="assetSituationChange">
            <el-radio  v-for="(vl, index) in AssetSituationOptions" :label="vl.VAL_CODE" :key="index">
              {{vl.VAL_NAME}}
            </el-radio>
          </el-radio-group>
        </el-form-item>

        <el-form-item label="资产类型" v-show="assetTypeFlag">
          <el-checkbox-group  v-model="relatedPersonnelInformationForm.assetType" class="checkgroup">
            <el-checkbox v-for="vl in AssetTypeOptions" @change="checkedChange(vl)" :key="vl.VAL_CODE" :label="vl.VAL_CODE">{{vl.VAL_NAME}}</el-checkbox>
          </el-checkbox-group>
        </el-form-item>

        <!--房屋 start-->
        <div v-show="housFlag">
          <!--   <el-form-item>
               <el-button icon="fa fa-plus" type="primary" @click="onSubmit">新增房屋</el-button>
             </el-form-item>-->
          <el-button icon="fa fa-plus" type="primary" @click="addHousAsset">增加房屋资产</el-button>

          <el-table
            border
            :data="assetTypeHousesTableData"
            style="width: 80%">
            <el-table-column
              fixed
              prop="whetherOwnershipCertificatess"
              label="是否不动产权证"
              width="150">
            </el-table-column>
            <el-table-column
              prop="propertyCertificateNumber"
              label="不动产权证号"
              width="120">
            </el-table-column>
            <el-table-column
              prop="deed"
              label="房产证号"
              width="120">
            </el-table-column>
            <el-table-column
              prop="landCertificate"
              label="土地证号"
              width="120">
            </el-table-column>
            <el-table-column
              prop="constructionArea"
              label="房屋建筑面积"
              width="120">
            </el-table-column>
            <el-table-column
              label="操作">
              <template slot-scope="scope">
                <el-button @click="removeHousAsset(scope.$index + 1)" type="text" size="small">删除</el-button>
                <!--<el-button @click="handleHousAssetEdit(scope.row.assetTypeHouses)" type="text" size="small">编辑</el-button>-->
              </template>
            </el-table-column>
          </el-table>

          <!--新增编辑界面-->
          <el-dialog :title="operation?'新增':'新增'" width="60%" :visible.sync="addHousAssetDialogVisible" :close-on-click-modal="false">
            <el-form :model="assetTypeHouses" label-width="150px" :rules="dataFormRules" ref="dataForm" :size="size">
              <el-form-item label="是否不动产权证">
                <el-radio-group v-model="assetTypeHouses.whetherOwnershipCertificates" @change="whetherOwnershipCertificatesChange">
                  <el-radio  v-for="(vl, index) in WhetherOwnershipCertificatesOptions" :label="vl.VAL_CODE" :key="index">
                    {{vl.VAL_NAME}}
                  </el-radio>
                </el-radio-group>
              </el-form-item>

              <el-form-item label="不动产权证号" v-show="propertyCertificateNumberFlag">
                <el-input v-model="assetTypeHouses.propertyCertificateNumber" size="small" class="width180"></el-input>
              </el-form-item>

              <el-row>
                <el-col span="8" v-show="deedNumberFlag">
                  <el-form-item label="房产证号">
                    <el-input v-model="assetTypeHouses.deed"  size="small" class="width180"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col span="8" v-show="deedLandCertificateFlag">
                  <el-form-item label="土地证号">
                    <el-input v-model="assetTypeHouses.landCertificate"  size="small" class="width180"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>

              <el-row>
                <el-col span="8">
                  <el-form-item label="名称">
                    <el-input v-model="assetTypeHouses.name" size="small" class="width180"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col span="8">
                  <el-form-item label="地址">
                    <el-input v-model="assetTypeHouses.address" size="small" class="width180"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>

              <el-form-item label="所属地">
                <el-radio-group v-model="assetTypeHouses.affiliation">
                  <el-radio  v-for="(vl, index) in AffiliationOptions" :label="vl.VAL_CODE" :key="index">
                    {{vl.VAL_NAME}}
                  </el-radio>
                </el-radio-group>
              </el-form-item>

              <el-row>
                <el-col span="8">
                  <el-form-item label="房屋建筑面积">
                    <el-input v-model="assetTypeHouses.constructionArea" size="small" class="width180"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col span="8">
                  <el-form-item label="价值">
                    <el-input v-model="assetTypeHouses.value" size="small" class="width180"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>

              <el-form-item label="融资情况">
                <el-radio-group v-model="assetTypeHouses.financingSituation">
                  <el-radio  v-for="(vl, index) in FinancingSituationOptions" :label="vl.VAL_CODE" :key="index">
                    {{vl.VAL_NAME}}
                  </el-radio>
                </el-radio-group>
              </el-form-item>

              <el-form-item label="是否有共有人">
                <el-radio-group v-model="assetTypeHouses.whetherCoOwner" @change="whetherCoownerChange">
                  <el-radio  v-for="(vl, index) in WhetherCoownerOptions" :label="vl.VAL_CODE" :key="index">
                    {{vl.VAL_NAME}}
                  </el-radio>
                </el-radio-group>
              </el-form-item>
              <el-form-item label="共有人姓名" v-show="coOwnerNameFlag">
                <el-input v-model="assetTypeHouses.coOwnerName" size="small" class="width180"></el-input>
              </el-form-item>

              <el-form-item label="是否有租赁">
                <el-radio-group v-model="assetTypeHouses.whetherLease">
                  <el-radio  v-for="(vl, index) in WhetherLeaseOptions" :label="vl.VAL_CODE" :key="index">
                    {{vl.VAL_NAME}}
                  </el-radio>
                </el-radio-group>
              </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
              <el-button :size="size" @click.native="addHousAssetDialogVisible = false">{{$t('action.cancel')}}</el-button>
              <el-button :size="size" type="primary" @click.native="assetTypeHousesForm" :loading="editLoading">{{$t('action.submit')}}</el-button>
            </div>
          </el-dialog>
          <br><br>
        </div>
        <!--房屋 end-->
        <!--土地 start-->
        <div v-show="landFlag">
          <el-button icon="fa fa-plus" type="primary" @click="addLandAsset">增加土地资产</el-button>
          <br>
          <el-table
            border
            :data="landTableData"
            style="width: 80%">
            <el-table-column
              fixed
              prop="landCertificate"
              label="土地证号"
              width="150">
            </el-table-column>
            <el-table-column
              prop="name"
              label="名称"
              width="120">
            </el-table-column>
            <el-table-column
              prop="address"
              label="地址"
              width="120">
            </el-table-column>
            <el-table-column
              prop="constructionArea"
              label="土地占用面积"
              width="120">
            </el-table-column>
            <el-table-column
              label="操作">
              <template slot-scope="scope">
                <el-button @click="removeLandAsset(scope.$index + 1)" type="text" size="small">删除</el-button>
                <!--<el-button @click="handleLandAssetEdit(scope.row.assetTypeLand)" type="text" size="small">编辑</el-button>-->
              </template>
            </el-table-column>
          </el-table>

          <!--新增编辑土地界面-->
          <el-dialog :title="operationLand?'新增':'编辑'" width="60%" :visible.sync="addLandAssetDialogVisible" :close-on-click-modal="false">
            <el-form :model="assetTypeLand" label-width="150px" :rules="dataFormRules" ref="dataForm" :size="size">
              <el-form-item label="土地证号">
                <el-input v-model="assetTypeLand.landCertificate" size="small" class="width180"></el-input>
              </el-form-item>
              <el-row>
                <el-col span="8">
                  <el-form-item label="名称">
                    <el-input v-model="assetTypeLand.name" size="small" class="width180"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col span="8">
                  <el-form-item label="地址">
                    <el-input v-model="assetTypeLand.address" size="small" class="width180"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>

              <el-form-item label="所属地">
                <el-radio-group v-model="assetTypeLand.affiliation">
                  <el-radio  v-for="(vl, index) in AffiliationOptions" :label="vl.VAL_CODE" :key="index">
                    {{vl.VAL_NAME}}
                  </el-radio>
                </el-radio-group>
              </el-form-item>

              <el-row>
                <el-col span="8">
                  <el-form-item label="土地占用面积">
                    <el-input v-model="assetTypeLand.constructionArea" size="small" class="width180"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col span="8">
                  <el-form-item label="价值">
                    <el-input v-model="assetTypeLand.value" size="small" class="width180"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>

              <el-form-item label="融资情况">
                <el-radio-group v-model="assetTypeLand.financingSituation">
                  <el-radio  v-for="(vl, index) in FinancingSituationOptions" :label="vl.VAL_CODE" :key="index">
                    {{vl.VAL_NAME}}
                  </el-radio>
                </el-radio-group>
              </el-form-item>

              <el-form-item label="是否有共有人">
                <el-radio-group v-model="assetTypeLand.whetherCoOwner" @change="whetherCoownerChange">
                  <el-radio  v-for="(vl, index) in WhetherCoownerOptions" :label="vl.VAL_CODE" :key="index">
                    {{vl.VAL_NAME}}
                  </el-radio>
                </el-radio-group>
              </el-form-item>
              <el-form-item label="共有人姓名" v-show="coOwnerNameFlag">
                <el-input v-model="assetTypeLand.coOwnerName" size="small" class="width180"></el-input>
              </el-form-item>

              <el-form-item label="是否有租赁">
                <el-radio-group v-model="assetTypeLand.whetherLease">
                  <el-radio  v-for="(vl, index) in WhetherLeaseOptions" :label="vl.VAL_CODE" :key="index">
                    {{vl.VAL_NAME}}
                  </el-radio>
                </el-radio-group>
              </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
              <el-button :size="size" @click.native="addLandAssetDialogVisible = false">{{$t('action.cancel')}}</el-button>
              <el-button :size="size" type="primary" @click.native="assetTypeLandForm" :loading="editLoading">{{$t('action.submit')}}</el-button>
            </div>
          </el-dialog>
          <br><br>
        </div>
        <!--土地 end-->
        <!--汽车 start-->
        <div v-show="carFlag">
          <el-button icon="fa fa-plus" type="primary" @click="addCarAsset">增加汽车资产</el-button>
          <br>
          <el-table
            border
            :data="carTableData"
            style="width: 80%">
            <el-table-column
              fixed
              prop="brand"
              label="汽车品牌"
              width="150">
            </el-table-column>
            <el-table-column
              prop="value"
              label="价值"
              width="120">
            </el-table-column>
            <el-table-column
              prop="numberPlate"
              label="车牌号"
              width="120">
            </el-table-column>
            <el-table-column
              prop="drivingLicenseNumber"
              label="行驶证号"
              width="120">
            </el-table-column>
            <el-table-column
              label="操作">
              <template slot-scope="scope">
                <el-button @click="removeCarAsset(scope.$index + 1)" type="text" size="small">删除</el-button>
                <!-- <el-button @click="handleCarAssetEdit(scope.row.assetTypeCar)" type="text" size="small">编辑</el-button>-->
              </template>
            </el-table-column>
          </el-table>
          <el-dialog :title="operationCar?'新增':'编辑'" width="60%" :visible.sync="addCarAssetDialogVisible" :close-on-click-modal="false">
            <el-form :model="assetTypeCar" label-width="80px" :rules="dataFormRules" ref="dataForm" :size="size">
              <el-row>
                <el-col span="8">
                  <el-form-item label="汽车品牌">
                    <el-input v-model="assetTypeCar.brand" size="small" class="width180"></el-input>
                  </el-form-item>
                </el-col>
                <el-col span="8">
                  <el-form-item label="价值">
                    <el-input v-model="assetTypeCar.value" size="small" class="width180"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col span="8">
                  <el-form-item label="车牌号">
                    <el-input v-model="assetTypeCar.numberPlate" size="small" class="width180"></el-input>
                  </el-form-item>
                </el-col>
                <el-col span="8">
                  <el-form-item label="行驶证号">
                    <el-input v-model="assetTypeCar.drivingLicenseNumber" size="small" class="width180"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
            </el-form>
            <div slot="footer" class="dialog-footer">
              <el-button :size="size" @click.native="addCarAssetDialogVisible = false">{{$t('action.cancel')}}</el-button>
              <el-button :size="size" type="primary" @click.native="assetTypeCarForm" :loading="editLoading">{{$t('action.submit')}}</el-button>
            </div>
          </el-dialog>
          <br><br>
        </div>
        <!--汽车 end-->
        <!--证券 start-->
        <div v-show="securitiesFlag">
          <el-button icon="fa fa-plus" type="primary" @click="addSecuritiesAsset">增加证券资产</el-button>
          <br>
          <el-table
            border
            :data="securitiesTableData"
            style="width: 80%">
            <el-table-column
              fixed
              prop="types"
              label="证券种类"
              width="150">
            </el-table-column>
            <el-table-column
              prop="value"
              label="价值"
              width="120">
            </el-table-column>
            <el-table-column
              label="操作">
              <template slot-scope="scope">
                <el-button @click="removeSecuritiesAsset(scope.$index + 1)" type="text" size="small">删除</el-button>
                <!--<el-button @click="handleSecuritiesAssetEdit(scope.row.assetTypeSecurities)" type="text" size="small">编辑</el-button>-->
              </template>
            </el-table-column>
          </el-table>
          <el-dialog :title="operationSecurities?'新增':'编辑'" width="60%" :visible.sync="addSecuritiesAssetDialogVisible" :close-on-click-modal="false">
            <el-form :model="assetTypeSecurities" label-width="80px" :rules="dataFormRules" ref="dataForm" :size="size">
              <el-form-item label="证券种类">
                <el-radio-group v-model="assetTypeSecurities.type">
                  <el-radio  v-for="(vl, index) in SecuritiesTypeOptions" :label="vl.VAL_CODE" :key="index">
                    {{vl.VAL_NAME}}
                  </el-radio>
                </el-radio-group>
              </el-form-item>
              <el-form-item label="价值">
                <el-input v-model="assetTypeSecurities.value" size="small" class="width180"></el-input>
              </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
              <el-button :size="size" @click.native="addSecuritiesAssetDialogVisible = false">{{$t('action.cancel')}}</el-button>
              <el-button :size="size" type="primary" @click.native="assetTypeSecuritiesForm" :loading="editLoading">{{$t('action.submit')}}</el-button>
            </div>
          </el-dialog>
          <br><br>
        </div>
        <!--证券 end-->
        <!--其他 start-->
        <div v-show="otherFlag">
          <el-button icon="fa fa-plus" type="primary" @click="addOtherAsset">增加其他资产</el-button>
          <br>
          <el-table
            border
            :data="otherTableData"
            style="width: 80%">
            <el-table-column
              fixed
              prop="assetName"
              label="资产名称"
              width="150">
            </el-table-column>
            <el-table-column
              prop="value"
              label="价值"
              width="120">
            </el-table-column>
            <el-table-column
              label="操作">
              <template slot-scope="scope">
                <el-button @click="removeOtherAsset(scope.$index + 1)" type="text" size="small">删除</el-button>
                <!--<el-button @click="handleOtherAssetEdit(scope.row.assetTypeOther)" type="text" size="small">编辑</el-button>-->
              </template>
            </el-table-column>
          </el-table>
          <el-dialog :title="operationOther?'新增':'编辑'" width="60%" :visible.sync="addOtherAssetDialogVisible" :close-on-click-modal="false">
            <el-form :model="assetTypeOther" label-width="80px" :rules="dataFormRules" ref="dataForm" :size="size">
              <el-row>
                <el-col span="8">
                  <el-form-item label="资产名称">
                    <el-input v-model="assetTypeOther.assetName" size="small" class="width180"></el-input>
                  </el-form-item>
                </el-col>
                <el-col span="8">
                  <el-form-item label="价值">
                    <el-input v-model="assetTypeOther.value" size="small" class="width180"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
            </el-form>
            <div slot="footer" class="dialog-footer">
              <el-button :size="size" @click.native="addOtherAssetDialogVisible = false">{{$t('action.cancel')}}</el-button>
              <el-button :size="size" type="primary" @click.native="assetTypeOtherForm" :loading="editLoading">{{$t('action.submit')}}</el-button>
            </div>
          </el-dialog>
          <br><br>
        </div>
        <!--其他 end-->

        <!--婚姻状态-->
        <el-form-item label="婚姻状况" prop="maritalStatus">
          <el-radio-group v-model="relatedPersonnelInformationForm.maritalStatus" @change="maritalStatusChange">
            <el-radio  v-for="(vl, index) in MaritalStatusOptions" :label="vl.VAL_CODE" :key="index">
              {{vl.VAL_NAME}}
            </el-radio>
          </el-radio-group>
        </el-form-item>

        <!--婚姻状况 start-->
        <div v-show="maritalStatusFlag">
          <!--已婚-->
          <div v-show="maritalStatusMarriedFlag">

            <el-row>
              <el-col span="8">
                <el-form-item label="姓名" class="item">
                  <el-input v-model="relatedPersonnelInformationSpouseForm.name" size="small" class="width150"></el-input>
                </el-form-item>
              </el-col>
              <el-col span="8">
                <el-form-item label="身份证号码">
                  <el-input v-model="relatedPersonnelInformationSpouseForm.identityNumber" size="small" class="width150"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-form-item label="年龄">
              <el-input v-model="relatedPersonnelInformationSpouseForm.age" size="small" class="width150"></el-input>
            </el-form-item>
            <el-form-item label="性别">
              <el-radio-group v-model="relatedPersonnelInformationSpouseForm.sex">
                <el-radio  v-for="(vl, index) in SexOptions" :label="vl.VAL_CODE" :key="index">
                  {{vl.VAL_NAME}}
                </el-radio>
              </el-radio-group>
            </el-form-item>
            <el-row>
              <el-col span="8">
                <el-form-item label="户籍所在地">
                  <el-input v-model="relatedPersonnelInformationSpouseForm.domicile" size="small" class="width150"></el-input>
                </el-form-item>
              </el-col>
              <el-col span="8">
                <el-form-item label="现居住地址">
                  <el-input v-model="relatedPersonnelInformationSpouseForm.currentHomeAddress" size="small" class="width150"></el-input>
                </el-form-item>
              </el-col>
            </el-row>

            <el-row>
              <el-col span="8">
                <el-form-item label="本地居住时间">
                  <el-input v-model="relatedPersonnelInformationSpouseForm.localResidenceTime" size="small" class="width150"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-form-item label="常用通信地址">
              <el-radio-group v-model="relatedPersonnelInformationSpouseForm.contactAddress">
                <el-radio  v-for="(vl, index) in ContactAddressOptions" :label="vl.VAL_CODE" :key="index">
                  {{vl.VAL_NAME}}
                </el-radio>
              </el-radio-group>
            </el-form-item>

            <el-row>
              <el-col span="8">
                <el-form-item label="联系电话">
                  <el-input v-model="relatedPersonnelInformationSpouseForm.contactNumber" size="small" class="width150"></el-input>
                </el-form-item>
              </el-col>
              <el-col span="8">
                <el-form-item label="电子邮箱">
                  <el-input v-model="relatedPersonnelInformationSpouseForm.email" size="small" class="width150"></el-input>
                </el-form-item>
              </el-col>
            </el-row>

            <el-row>
              <el-col span="8">
                <el-form-item label="QQ号">
                  <el-input v-model="relatedPersonnelInformationSpouseForm.qq" size="small" class="width150"></el-input>
                </el-form-item>
              </el-col>
              <el-col span="8">
                <el-form-item label="微信号">
                  <el-input v-model="relatedPersonnelInformationSpouseForm.wechat" size="small" class="width150"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-form-item label="文化程度">
              <el-radio-group v-model="relatedPersonnelInformationSpouseForm.educationalLevel" @change="educationaLevelChange">
                <el-radio  v-for="(vl, index) in EducationalLevelOptions" :label="vl.VAL_CODE" :key="index">
                  {{vl.VAL_NAME}}
                </el-radio>
              </el-radio-group>
              <!--其他-->
              <el-input v-model="relatedPersonnelInformationSpouseForm.educationalLevelValue" v-show="educationalLevelFlag" size="small" class="width150"></el-input>
            </el-form-item>

            <el-form-item label="现住房来源">
              <el-radio-group v-model="relatedPersonnelInformationSpouseForm.currentHousingSource" @change="currentHousingSourceChange">
                <el-radio  v-for="(vl, index) in CurrentHousingSourceOptions" :label="vl.VAL_CODE" :key="index">
                  {{vl.VAL_NAME}}
                </el-radio>
              </el-radio-group>
              <!--其他-->
              <el-input v-model="relatedPersonnelInformationSpouseForm.currentHousingSourceValue" v-show="currentHousingSourceFlag" size="small" class="width150"></el-input>
            </el-form-item>
            <el-row>
              <el-col span="8">
                <el-form-item label="工作单位">
                  <el-input v-model="relatedPersonnelInformationSpouseForm.employer" size="small" class="width150"></el-input>
                </el-form-item>
              </el-col>
              <el-col span="8">
                <el-form-item label="职务">
                  <el-input v-model="relatedPersonnelInformationSpouseForm.position" size="small" class="width150"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col span="8">
                <el-form-item label="持股比例">
                  <el-input v-model="relatedPersonnelInformationSpouseForm.shareholdingRatio" size="small" class="width150"></el-input>
                </el-form-item>
              </el-col>
              <el-col span="8">
                <el-form-item label="单位工作年限">
                  <el-input v-model="relatedPersonnelInformationSpouseForm.unitWorkingYears" placeholder="该单位工作年限" size="small" class="width150"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col span="8">
                <el-form-item label="投资经营企业">
                  <el-input v-model="relatedPersonnelInformationSpouseForm.companyName" placeholder="所投资或经营企业名称" size="small" class="width150"></el-input>
                </el-form-item>
              </el-col>
              <el-col span="8">
                <el-form-item label="行业经营年限">
                  <el-input v-model="relatedPersonnelInformationSpouseForm.yearsOperation" placeholder="本行业和相近行业经营年限" size="small" class="width180"></el-input>
                </el-form-item>
              </el-col>
            </el-row>

            <el-form-item label="资产情况">
              <el-radio-group v-model="relatedPersonnelInformationSpouseForm.assetSituation" @change="assetSituationSpouseChange">
                <el-radio  v-for="(vl, index) in AssetSituationOptions" :label="vl.VAL_CODE" :key="index">
                  {{vl.VAL_NAME}}
                </el-radio>
              </el-radio-group>
            </el-form-item>

            <el-form-item label="资产类型" v-show="assetTypeFlagSpouse">
              <el-checkbox-group  v-model="relatedPersonnelInformationSpouseForm.assetType" class="checkgroup">
                <el-checkbox v-for="vl in AssetTypeOptions" @change="checkedSpouseChange(vl)" :key="vl.VAL_CODE" :label="vl.VAL_CODE">{{vl.VAL_NAME}}</el-checkbox>
              </el-checkbox-group>
            </el-form-item>

            <!--房屋 start-->
            <div v-show="housSpouseFlag">
              <!--   <el-form-item>
                   <el-button icon="fa fa-plus" type="primary" @click="onSubmit">新增房屋</el-button>
                 </el-form-item>-->
              <el-button icon="fa fa-plus" type="primary" @click="addSpouseHousAsset">增加房屋资产</el-button>
              <br>
              <el-table
                border
                :data="assetTypeSpouseHousesTableData"
                style="width: 80%">
                <el-table-column
                  fixed
                  prop="whetherOwnershipCertificatess"
                  label="是否不动产权证"
                  width="150">
                </el-table-column>
                <el-table-column
                  prop="propertyCertificateNumber"
                  label="不动产权证号"
                  width="120">
                </el-table-column>
                <el-table-column
                  prop="deed"
                  label="房产证号"
                  width="120">
                </el-table-column>
                <el-table-column
                  prop="landCertificate"
                  label="土地证号"
                  width="120">
                </el-table-column>
                <el-table-column
                  prop="constructionArea"
                  label="房屋建筑面积"
                  width="120">
                </el-table-column>
                <el-table-column
                  label="操作">
                  <template slot-scope="scope">
                    <el-button @click="removeSpouseHousAsset(scope.$index + 1)" type="text" size="small">删除</el-button>
                    <!-- <el-button @click="handleSpouseHousAssetEdit(scope.row.assetTypeHouses)" type="text" size="small">编辑</el-button>-->
                  </template>
                </el-table-column>
              </el-table>

              <!--新增编辑界面-->
              <el-dialog :title="spouseAssetTypeHouses?'新增':'新增'" width="60%" :visible.sync="addSpouseHousAssetDialogVisible" :close-on-click-modal="false">
                <el-form :model="spouseAssetTypeHouses" label-width="150px" :rules="dataFormRules" ref="dataForm" :size="size">
                  <el-form-item label="是否不动产权证">
                    <el-radio-group v-model="spouseAssetTypeHouses.whetherOwnershipCertificates" @change="whetherOwnershipCertificatesChange">
                      <el-radio  v-for="(vl, index) in WhetherOwnershipCertificatesOptions" :label="vl.VAL_CODE" :key="index">
                        {{vl.VAL_NAME}}
                      </el-radio>
                    </el-radio-group>
                  </el-form-item>

                  <el-form-item label="不动产权证号" v-show="propertyCertificateNumberFlag">
                    <el-input v-model="spouseAssetTypeHouses.propertyCertificateNumber" size="small" class="width180"></el-input>
                  </el-form-item>

                  <el-row>
                    <el-col span="8" v-show="deedNumberFlag">
                      <el-form-item label="房产证号">
                        <el-input v-model="spouseAssetTypeHouses.deed"  size="small" class="width180"></el-input>
                      </el-form-item>
                    </el-col>
                  </el-row>
                  <el-row>
                    <el-col span="8" v-show="deedLandCertificateFlag">
                      <el-form-item label="土地证号">
                        <el-input v-model="spouseAssetTypeHouses.landCertificate" size="small" class="width180"></el-input>
                      </el-form-item>
                    </el-col>
                  </el-row>

                  <el-row>
                    <el-col span="8">
                      <el-form-item label="名称">
                        <el-input v-model="spouseAssetTypeHouses.name" size="small" class="width180"></el-input>
                      </el-form-item>
                    </el-col>
                  </el-row>
                  <el-row>
                    <el-col span="8">
                      <el-form-item label="地址">
                        <el-input v-model="spouseAssetTypeHouses.address" size="small" class="width180"></el-input>
                      </el-form-item>
                    </el-col>
                  </el-row>

                  <el-form-item label="所属地">
                    <el-radio-group v-model="spouseAssetTypeHouses.affiliation">
                      <el-radio  v-for="(vl, index) in AffiliationOptions" :label="vl.VAL_CODE" :key="index">
                        {{vl.VAL_NAME}}
                      </el-radio>
                    </el-radio-group>
                  </el-form-item>

                  <el-row>
                    <el-col span="8">
                      <el-form-item label="房屋建筑面积">
                        <el-input v-model="spouseAssetTypeHouses.constructionArea" size="small" class="width180"></el-input>
                      </el-form-item>
                    </el-col>
                  </el-row>
                  <el-row>
                    <el-col span="8">
                      <el-form-item label="价值">
                        <el-input v-model="spouseAssetTypeHouses.value" size="small" class="width180"></el-input>
                      </el-form-item>
                    </el-col>
                  </el-row>

                  <el-form-item label="融资情况">
                    <el-radio-group v-model="spouseAssetTypeHouses.financingSituation">
                      <el-radio  v-for="(vl, index) in FinancingSituationOptions" :label="vl.VAL_CODE" :key="index">
                        {{vl.VAL_NAME}}
                      </el-radio>
                    </el-radio-group>
                  </el-form-item>

                  <el-form-item label="是否有共有人">
                    <el-radio-group v-model="spouseAssetTypeHouses.whetherCoOwner" @change="whetherCoownerChange">
                      <el-radio  v-for="(vl, index) in WhetherCoownerOptions" :label="vl.VAL_CODE" :key="index">
                        {{vl.VAL_NAME}}
                      </el-radio>
                    </el-radio-group>
                  </el-form-item>
                  <el-form-item label="共有人姓名" v-show="coOwnerNameFlag">
                    <el-input v-model="spouseAssetTypeHouses.co_owner_name" size="small" class="width180"></el-input>
                  </el-form-item>

                  <el-form-item label="是否有租赁">
                    <el-radio-group v-model="spouseAssetTypeHouses.whetherLease">
                      <el-radio  v-for="(vl, index) in WhetherLeaseOptions" :label="vl.VAL_CODE" :key="index">
                        {{vl.VAL_NAME}}
                      </el-radio>
                    </el-radio-group>
                  </el-form-item>
                </el-form>
                <div slot="footer" class="dialog-footer">
                  <el-button :size="size" @click.native="addSpouseHousAssetDialogVisible = false">{{$t('action.cancel')}}</el-button>
                  <el-button :size="size" type="primary" @click.native="assetTypeSpouseHousesForm" :loading="editLoading">{{$t('action.submit')}}</el-button>
                </div>
              </el-dialog>
              <br><br>
            </div>
            <!--房屋 end-->
            <!--土地 start-->
            <div v-show="landSpouseFlag">
              <el-button icon="fa fa-plus" type="primary" @click="addSpouseLandAsset">增加土地资产</el-button>
              <br>
              <el-table
                border
                :data="spouseLandTableData"
                style="width: 80%">
                <el-table-column
                  fixed
                  prop="landCertificate"
                  label="土地证号"
                  width="150">
                </el-table-column>
                <el-table-column
                  prop="name"
                  label="名称"
                  width="120">
                </el-table-column>
                <el-table-column
                  prop="address"
                  label="地址"
                  width="120">
                </el-table-column>
                <el-table-column
                  prop="constructionArea"
                  label="房屋建筑面积"
                  width="120">
                </el-table-column>
                <el-table-column
                  label="操作">
                  <template slot-scope="scope">
                    <el-button @click="removeSpouseLandAsset(scope.$index + 1)" type="text" size="small">删除</el-button>
                    <!--<el-button @click="handleSpouseLandAssetEdit(scope.row.assetTypeLand)" type="text" size="small">编辑</el-button>-->
                  </template>
                </el-table-column>
              </el-table>

              <!--新增编辑土地界面-->
              <el-dialog :title="operationSpouseLand?'新增':'编辑'" width="60%" :visible.sync="addSpouseLandAssetDialogVisible" :close-on-click-modal="false">
                <el-form :model="spouseAssetTypeLand" label-width="150px" :rules="dataFormRules" ref="spouseAssetTypeLand" :size="size">
                  <el-form-item label="土地证号">
                    <el-input v-model="spouseAssetTypeLand.landCertificate" size="small" class="width180"></el-input>
                  </el-form-item>
                  <el-row>
                    <el-col span="8">
                      <el-form-item label="名称">
                        <el-input v-model="spouseAssetTypeLand.name" size="small" class="width180"></el-input>
                      </el-form-item>
                    </el-col>
                  </el-row>
                  <el-row>
                    <el-col span="8">
                      <el-form-item label="地址">
                        <el-input v-model="spouseAssetTypeLand.address" size="small" class="width180"></el-input>
                      </el-form-item>
                    </el-col>
                  </el-row>

                  <el-form-item label="所属地">
                    <el-radio-group v-model="spouseAssetTypeLand.affiliation">
                      <el-radio  v-for="(vl, index) in AffiliationOptions" :label="vl.VAL_CODE" :key="index">
                        {{vl.VAL_NAME}}
                      </el-radio>
                    </el-radio-group>
                  </el-form-item>

                  <el-row>
                    <el-col span="8">
                      <el-form-item label="房屋建筑面积">
                        <el-input v-model="spouseAssetTypeLand.constructionArea" size="small" class="width180"></el-input>
                      </el-form-item>
                    </el-col>
                  </el-row>
                  <el-row>
                    <el-col span="8">
                      <el-form-item label="价值">
                        <el-input v-model="spouseAssetTypeLand.value" size="small" class="width180"></el-input>
                      </el-form-item>
                    </el-col>
                  </el-row>

                  <el-form-item label="融资情况">
                    <el-radio-group v-model="spouseAssetTypeLand.financingSituation">
                      <el-radio  v-for="(vl, index) in FinancingSituationOptions" :label="vl.VAL_CODE" :key="index">
                        {{vl.VAL_NAME}}
                      </el-radio>
                    </el-radio-group>
                  </el-form-item>

                  <el-form-item label="是否有共有人">
                    <el-radio-group v-model="spouseAssetTypeLand.whetherCoOwner" @change="whetherCoownerChange">
                      <el-radio  v-for="(vl, index) in WhetherCoownerOptions" :label="vl.VAL_CODE" :key="index">
                        {{vl.VAL_NAME}}
                      </el-radio>
                    </el-radio-group>
                  </el-form-item>
                  <el-form-item label="共有人姓名" v-show="coOwnerNameFlag">
                    <el-input v-model="spouseAssetTypeLand.coOwnerName" size="small" class="width180"></el-input>
                  </el-form-item>

                  <el-form-item label="是否有租赁">
                    <el-radio-group v-model="spouseAssetTypeLand.whetherLease">
                      <el-radio  v-for="(vl, index) in WhetherLeaseOptions" :label="vl.VAL_CODE" :key="index">
                        {{vl.VAL_NAME}}
                      </el-radio>
                    </el-radio-group>
                  </el-form-item>
                </el-form>
                <div slot="footer" class="dialog-footer">
                  <el-button :size="size" @click.native="addSpouseLandAssetDialogVisible = false">{{$t('action.cancel')}}</el-button>
                  <el-button :size="size" type="primary" @click.native="assetTypeSpouseLandForm" :loading="editLoading">{{$t('action.submit')}}</el-button>
                </div>
              </el-dialog>
              <br><br>
            </div>
            <!--土地 end-->
            <!--汽车 start-->
            <div v-show="carSpouseFlag">
              <el-button icon="fa fa-plus" type="primary" @click="addSpouseCarAsset">增加汽车资产</el-button>
              <br>
              <el-table
                border
                :data="spouseCarTableData"
                style="width: 80%">
                <el-table-column
                  fixed
                  prop="brand"
                  label="汽车品牌"
                  width="150">
                </el-table-column>
                <el-table-column
                  prop="value"
                  label="价值"
                  width="120">
                </el-table-column>
                <el-table-column
                  prop="numberPlate"
                  label="车牌号"
                  width="120">
                </el-table-column>
                <el-table-column
                  prop="drivingLicenseNumber"
                  label="行驶证号"
                  width="120">
                </el-table-column>
                <el-table-column
                  label="操作">
                  <template slot-scope="scope">
                    <el-button @click="removeSpouseCarAsset(scope.$index + 1)" type="text" size="small">删除</el-button>
                    <!-- <el-button @click="handleSpouseCarAssetEdit(scope.row.assetTypeCar)" type="text" size="small">编辑</el-button>-->
                  </template>
                </el-table-column>
              </el-table>
              <el-dialog :title="operationSpouseCar?'新增':'编辑'" width="60%" :visible.sync="addSpouseCarAssetDialogVisible" :close-on-click-modal="false">
                <el-form :model="spouseAssetTypeCar" label-width="80px" :rules="dataFormRules" ref="dataForm" :size="size">
                  <el-row>
                    <el-col span="8">
                      <el-form-item label="汽车品牌">
                        <el-input v-model="spouseAssetTypeCar.brand" size="small" class="width180"></el-input>
                      </el-form-item>
                    </el-col>
                    <el-col span="8">
                      <el-form-item label="价值">
                        <el-input v-model="spouseAssetTypeCar.value" size="small" class="width180"></el-input>
                      </el-form-item>
                    </el-col>
                  </el-row>
                  <el-row>
                    <el-col span="8">
                      <el-form-item label="车牌号">
                        <el-input v-model="spouseAssetTypeCar.numberPlate" size="small" class="width180"></el-input>
                      </el-form-item>
                    </el-col>
                    <el-col span="8">
                      <el-form-item label="行驶证号">
                        <el-input v-model="spouseAssetTypeCar.drivingLicenseNumber" size="small" class="width180"></el-input>
                      </el-form-item>
                    </el-col>
                  </el-row>
                </el-form>
                <div slot="footer" class="dialog-footer">
                  <el-button :size="size" @click.native="addSpouseCarAssetDialogVisible = false">{{$t('action.cancel')}}</el-button>
                  <el-button :size="size" type="primary" @click.native="assetTypeSpouseCarForm" :loading="editLoading">{{$t('action.submit')}}</el-button>
                </div>
              </el-dialog>
              <br><br>
            </div>
            <!--汽车 end-->
            <!--证券 start-->
            <div v-show="securitiesSpouseFlag">
              <el-button icon="fa fa-plus" type="primary" @click="addSpouseSecuritiesAsset">增加证券资产</el-button>
              <br>
              <el-table
                border
                :data="spouseSecuritiesTableData"
                style="width: 80%">
                <el-table-column
                  fixed
                  prop="type"
                  label="证券种类"
                  width="150">
                </el-table-column>
                <el-table-column
                  prop="value"
                  label="价值"
                  width="120">
                </el-table-column>
                <el-table-column
                  label="操作">
                  <template slot-scope="scope">
                    <el-button @click="removeSpouseSecuritiesAsset(scope.$index + 1)" type="text" size="small">删除</el-button>
                    <!-- <el-button @click="handleSpouseSecuritiesAssetEdit(scope.row.assetTypeSecurities)" type="text" size="small">编辑</el-button>-->
                  </template>
                </el-table-column>
              </el-table>
              <el-dialog :title="operationSpouseSecurities?'新增':'编辑'" width="60%" :visible.sync="addSpouseSecuritiesAssetDialogVisible" :close-on-click-modal="false">
                <el-form :model="spouseAssetTypeSecurities" label-width="80px" :rules="dataFormRules" ref="dataForm" :size="size">
                  <el-form-item label="证券种类">
                    <el-radio-group v-model="spouseAssetTypeSecurities.type">
                      <el-radio  v-for="(vl, index) in SecuritiesTypeOptions" :label="vl.VAL_CODE" :key="index">
                        {{vl.VAL_NAME}}
                      </el-radio>
                    </el-radio-group>
                  </el-form-item>
                  <el-form-item label="价值">
                    <el-input v-model="spouseAssetTypeSecurities.value" size="small" class="width180"></el-input>
                  </el-form-item>
                </el-form>
                <div slot="footer" class="dialog-footer">
                  <el-button :size="size" @click.native="addSpouseSecuritiesAssetDialogVisible = false">{{$t('action.cancel')}}</el-button>
                  <el-button :size="size" type="primary" @click.native="assetTypeSpouseSecuritiesForm" :loading="editLoading">{{$t('action.submit')}}</el-button>
                </div>
              </el-dialog>
              <br><br>
            </div>
            <!--证券 end-->
            <!--其他 start-->
            <div v-show="otherSpouseFlag">
              <el-button icon="fa fa-plus" type="primary" @click="addSpouseOtherAsset">增加其他资产</el-button>
              <br>
              <el-table
                border
                :data="spouseOtherTableData"
                style="width: 80%">
                <el-table-column
                  fixed
                  prop="assetName"
                  label="资产名称"
                  width="150">
                </el-table-column>
                <el-table-column
                  prop="value"
                  label="价值"
                  width="120">
                </el-table-column>
                <el-table-column
                  label="操作">
                  <template slot-scope="scope">
                    <el-button @click="removeSpouseOtherAsset(scope.$index + 1)" type="text" size="small">删除</el-button>
                    <!--<el-button @click="handleSpouseOtherAssetEdit(scope.row.assetTypeOther)" type="text" size="small">编辑</el-button>-->
                  </template>
                </el-table-column>
              </el-table>
              <el-dialog :title="operationSpouseOther?'新增':'编辑'" width="60%" :visible.sync="addSpouseOtherAssetDialogVisible" :close-on-click-modal="false">
                <el-form :model="spouseAssetTypeOther" label-width="80px" :rules="dataFormRules" ref="dataForm" :size="size">
                  <el-row>
                    <el-col span="8">
                      <el-form-item label="资产名称">
                        <el-input v-model="spouseAssetTypeOther.assetName" size="small" class="width180"></el-input>
                      </el-form-item>
                    </el-col>
                    <el-col span="8">
                      <el-form-item label="价值">
                        <el-input v-model="spouseAssetTypeOther.value" size="small" class="width180"></el-input>
                      </el-form-item>
                    </el-col>
                  </el-row>
                </el-form>
                <div slot="footer" class="dialog-footer">
                  <el-button :size="size" @click.native="addSpouseOtherAssetDialogVisible = false">{{$t('action.cancel')}}</el-button>
                  <el-button :size="size" type="primary" @click.native="assetTypeSpouseOtherForm" :loading="editLoading">{{$t('action.submit')}}</el-button>
                </div>
              </el-dialog>
              <br><br>
            </div>
            <!--其他 end-->

          </div>
          <!--离异-->
          <div v-show="maritalStatusDivorcedFlag">
            <el-row>
              <el-col span="8">
                <el-form-item label="原配偶姓名">
                  <el-input v-model="relatedPersonnelInformationForm.originalSpouseName" size="small" class="width180"></el-input>
                </el-form-item>
              </el-col>
              <el-col span="8">
                <el-form-item label="离婚时间">
                  <el-date-picker
                    v-model="relatedPersonnelInformationForm.divorceTime"
                    type="date"
                    placeholder="离婚时间">
                  </el-date-picker>
                </el-form-item>
              </el-col>
            </el-row>
            <el-form-item label="离婚方式">
              <el-radio-group v-model="relatedPersonnelInformationForm.divorceMethod">
                <el-radio  v-for="(vl, index) in DivorceMethodOptions" :label="vl.VAL_CODE" :key="index">
                  {{vl.VAL_NAME}}
                </el-radio>
              </el-radio-group>
            </el-form-item>

          </div>
          <!--丧偶-->
          <div v-show="maritalStatusWidowedFlag">
            <el-row>
              <el-col span="8">
                <el-form-item label="原配偶姓名">
                  <el-input v-model="relatedPersonnelInformationForm.originalSpouseName" size="small" class="width180"></el-input>
                </el-form-item>
              </el-col>
              <el-col span="8">
                <el-form-item label="原配偶死亡时间">
                  <el-date-picker
                    v-model="relatedPersonnelInformationForm.divorceTime"
                    type="date"
                    placeholder="离婚时间">
                  </el-date-picker>
                </el-form-item>
              </el-col>
            </el-row>
          </div>
          <!--其他-->
          <div v-show="maritalStatusOtherFlag">
            <el-form-item label="其他">
              <el-input v-model="relatedPersonnelInformationForm.originalSpouseName" size="small" class="width180"></el-input>
            </el-form-item>
          </div>

        </div>
        <!--婚姻状况 end-->

        <!--家庭收支情况 start-->
        <div>
          <hr>
          <el-row>
            <el-col span="8">
              <el-form-item label="家庭总资产">
                <el-input v-model="householdIncomeForm.totalAssets" size="small" class="width150"></el-input>
              </el-form-item>
            </el-col>
            <el-col span="8">
              <el-form-item label="家庭年总收入">
                <el-input v-model="householdIncomeForm.totalRevenue" size="small" class="width180"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col span="8">
              <el-form-item label="申请人年薪金收入">
                <el-input v-model="householdIncomeForm.applicantAnnualIncome" size="small" class="width150"></el-input>
              </el-form-item>
            </el-col>
            <el-col span="8">
              <el-form-item label="申请人年经营性收入">
                <el-input v-model="householdIncomeForm.applicantOperatingIncome" size="small" class="width180"></el-input>
              </el-form-item>
            </el-col>
            <el-col span="8">
              <el-form-item label="申请人其他收入">
                <el-input v-model="householdIncomeForm.applicantOtherIncome" size="small" class="width180"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col span="8">
              <el-form-item label="配偶年薪金收入">
                <el-input v-model="householdIncomeForm.spouseAnnualIncome" size="small" class="width150"></el-input>
              </el-form-item>
            </el-col>
            <el-col span="8">
              <el-form-item label="配偶年经营性收入">
                <el-input v-model="householdIncomeForm.spouseOperatingIncome" size="small" class="width180"></el-input>
              </el-form-item>
            </el-col>
            <el-col span="8">
              <el-form-item label="配偶其他收入">
                <el-input v-model="householdIncomeForm.spouseOtherIncome" size="small" class="width180"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col span="8">
              <el-form-item label="家庭年总支出">
                <el-input v-model="householdIncomeForm.totalAnnualExpenditure" size="small" class="width150"></el-input>
              </el-form-item>
            </el-col>
            <el-col span="8">
              <el-form-item label="年日常生活总支出">
                <el-input v-model="householdIncomeForm.lifeTotalExpenditure" size="small" class="width180"></el-input>
              </el-form-item>
            </el-col>
            <el-col span="8">
              <el-form-item label="年日常基本生活支出">
                <el-input v-model="householdIncomeForm.basicLifeTotalExpenditure" size="small" class="width180"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col span="8">
              <el-form-item label="年子女教育支出">
                <el-input v-model="householdIncomeForm.educationExpenditure" size="small" class="width150"></el-input>
              </el-form-item>
            </el-col>
            <el-col span="8">
              <el-form-item label="年其他临时性支出">
                <el-input v-model="householdIncomeForm.temporaryExpenditure" size="small" class="width180"></el-input>
              </el-form-item>
            </el-col>
            <el-col span="8">
              <el-form-item label="年债务性总支出">
                <el-input v-model="householdIncomeForm.debtTotalExpenditure" size="small" class="width180"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col span="8">
              <el-form-item label="申请人年还贷支出">
                <el-input v-model="householdIncomeForm.annualLoanExpenditure" size="small" class="width150"></el-input>
              </el-form-item>
            </el-col>
            <el-col span="8">
              <el-form-item label="配偶年还贷支出">
                <el-input v-model="householdIncomeForm.spouseTemporaryExpenditure" size="small" class="width180"></el-input>
              </el-form-item>
            </el-col>
            <el-col span="8">
              <el-form-item label="家庭供养人口">
                <el-input v-model="householdIncomeForm.supportPopulation" size="small" class="width180"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col span="8">
              <el-form-item label="家庭对外担保总额">
                <el-input v-model="householdIncomeForm.foreignGuaranteeLumpSum" size="small" class="width150"></el-input>
              </el-form-item>
            </el-col>
            <el-col span="8">
              <el-form-item label="家庭总负债">
                <el-input v-model="householdIncomeForm.totalLiability" size="small" class="width180"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
        </div>
        <!--家庭收支情况 end-->
        <el-form-item>
          <el-button type="primary" @click="saveBorrowerSubumit(2)">下一步</el-button>
        </el-form-item>
      </el-form>
    </div>
    <!--2、相关人情况-->
    <div v-if="active==2">
      <!--查询相关人标记-->
      <div v-if="listRelevantPeopleFlag">
        <el-form :model="relatedOterPersonnelInformationForm" label-width="100px" :rules="dataFormRules" ref="relatedOterPersonnelInformationForm" :size="size">
          <el-button icon="fa fa-plus" type="primary" @click="addOterPersonnelAsset">增加其他相关人</el-button>
          <br>
          <el-table
            border
            :data="oterPersonneltableData"
            style="width: 80%">
            <el-table-column
              fixed
              prop="name"
              label="姓名"
              width="150">
            </el-table-column>
            <el-table-column
              prop="identityNumber"
              label="身份证号码"
              width="120">
            </el-table-column>
            <el-table-column
              prop="age"
              label="年龄"
              width="120">
            </el-table-column>
            <el-table-column
              label="操作">
              <template slot-scope="scope">
                <el-button @click="removeOtherPersonnelAsset(scope.$index + 1)" type="text" size="small">删除</el-button>
                <!--<el-button @click="handleOtherPersonnelAssetEdit(scope.row.relatedOterPersonnelInformationForm)" type="text" size="small">编辑</el-button>-->
              </template>
            </el-table-column>
          </el-table>
          <br>
          <el-form-item>
            <el-button type="primary" @click="oterPersonnelNextStep(3)">下一步</el-button>
          </el-form-item>
        </el-form>
      </div>
      <!--添加相关人标记-->
      <div v-if="addRelevantPeopleFlag">
        <el-form :model="relatedPersonnelInformationForm" label-width="150px" :rules="add3Rules" ref="relatedPersonnelInformationForm" :size="size">
          <el-form-item label="与借款人关系" prop="type">
            <el-checkbox-group  v-model="relatedPersonnelInformationForm.type" class="checkgroup">
              <el-checkbox v-for="vl in TypeOptions" :key="vl.VAL_CODE" :label="vl.VAL_CODE">{{vl.VAL_NAME}}</el-checkbox>
            </el-checkbox-group>
          </el-form-item>
          <el-row>
            <el-col span="8">
              <el-form-item label="姓名" class="item" prop="name">
                <el-input v-model="relatedPersonnelInformationForm.name" size="small" class="width150"></el-input>
              </el-form-item>
            </el-col>
            <el-col span="8">
              <el-form-item label="身份证号码" prop="identityNumber">
                <el-input v-model="relatedPersonnelInformationForm.identityNumber" size="small" class="width150"></el-input>
              </el-form-item>
            </el-col>
          </el-row>

          <el-form-item label="年龄">
            <el-input v-model="relatedPersonnelInformationForm.age" size="small" class="width150"></el-input>
          </el-form-item>
          <el-form-item label="性别">
            <el-radio-group v-model="relatedPersonnelInformationForm.sex">
              <el-radio  v-for="(vl, index) in SexOptions" :label="vl.VAL_CODE" :key="index">
                {{vl.VAL_NAME}}
              </el-radio>
            </el-radio-group>
          </el-form-item>
          <el-row>
            <el-col span="8">
              <el-form-item label="户籍所在地">
                <el-input v-model="relatedPersonnelInformationForm.domicile" size="small" class="width150"></el-input>
              </el-form-item>
            </el-col>
            <el-col span="8">
              <el-form-item label="现居住地址">
                <el-input v-model="relatedPersonnelInformationForm.currentHomeAddress" size="small" class="width150"></el-input>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row>
            <el-col span="8">
              <el-form-item label="本地居住时间">
                <el-input v-model="relatedPersonnelInformationForm.localResidenceTime" size="small" class="width150"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-form-item label="常用通信地址">
            <el-radio-group v-model="relatedPersonnelInformationForm.contactAddress">
              <el-radio  v-for="(vl, index) in ContactAddressOptions" :label="vl.VAL_CODE" :key="index">
                {{vl.VAL_NAME}}
              </el-radio>
            </el-radio-group>
          </el-form-item>

          <el-row>
            <el-col span="8">
              <el-form-item label="联系电话">
                <el-input v-model="relatedPersonnelInformationForm.contactNumber" size="small" class="width150"></el-input>
              </el-form-item>
            </el-col>
            <el-col span="8">
              <el-form-item label="电子邮箱">
                <el-input v-model="relatedPersonnelInformationForm.email" size="small" class="width150"></el-input>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row>
            <el-col span="8">
              <el-form-item label="QQ号">
                <el-input v-model="relatedPersonnelInformationForm.qq" size="small" class="width150"></el-input>
              </el-form-item>
            </el-col>
            <el-col span="8">
              <el-form-item label="微信号">
                <el-input v-model="relatedPersonnelInformationForm.wechat" size="small" class="width150"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-form-item label="文化程度">
            <el-radio-group v-model="relatedPersonnelInformationForm.educationalLevel" @change="educationaLevelChange">
              <el-radio  v-for="(vl, index) in EducationalLevelOptions" :label="vl.VAL_CODE" :key="index">
                {{vl.VAL_NAME}}
              </el-radio>
            </el-radio-group>
            <!--其他-->
            <el-input v-model="relatedPersonnelInformationForm.educationalLevelValue" v-show="educationalLevelFlag" size="small" class="width150"></el-input>
          </el-form-item>

          <el-form-item label="现住房来源">
            <el-radio-group v-model="relatedPersonnelInformationForm.currentHousingSource" @change="currentHousingSourceChange">
              <el-radio  v-for="(vl, index) in CurrentHousingSourceOptions" :label="vl.VAL_CODE" :key="index">
                {{vl.VAL_NAME}}
              </el-radio>
            </el-radio-group>
            <!--其他-->
            <el-input v-model="relatedPersonnelInformationForm.currentHousingSourceValue" v-show="currentHousingSourceFlag" size="small" class="width150"></el-input>
          </el-form-item>
          <el-row>
            <el-col span="8">
              <el-form-item label="工作单位">
                <el-input v-model="relatedPersonnelInformationForm.employer" size="small" class="width150"></el-input>
              </el-form-item>
            </el-col>
            <el-col span="8">
              <el-form-item label="职务">
                <el-input v-model="relatedPersonnelInformationForm.position" size="small" class="width150"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col span="8">
              <el-form-item label="持股比例">
                <el-input v-model="relatedPersonnelInformationForm.shareholdingRatio" size="small" class="width150"></el-input>
              </el-form-item>
            </el-col>
            <el-col span="8">
              <el-form-item label="单位工作年限">
                <el-input v-model="relatedPersonnelInformationForm.unitWorkingYears" placeholder="在该单位工作年限" size="small" class="width150"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col span="8">
              <el-form-item label="投资经营企业">
                <el-input v-model="relatedPersonnelInformationForm.companyName" placeholder="所投资或经营企业名称" size="small" class="width150"></el-input>
              </el-form-item>
            </el-col>
            <el-col span="8">
              <el-form-item label="行业经营年限">
                <el-input v-model="relatedPersonnelInformationForm.yearsOperation" placeholder="本行业和相近行业经营年限" size="small" class="width180"></el-input>
              </el-form-item>
            </el-col>
          </el-row>

          <el-form-item label="资产情况">
            <el-radio-group v-model="relatedPersonnelInformationForm.assetSituation" @change="assetSituationChange">
              <el-radio  v-for="(vl, index) in AssetSituationOptions" :label="vl.VAL_CODE" :key="index">
                {{vl.VAL_NAME}}
              </el-radio>
            </el-radio-group>
          </el-form-item>

          <el-form-item label="资产类型" v-show="assetTypeFlag">
            <el-checkbox-group  v-model="relatedPersonnelInformationForm.assetType" class="checkgroup">
              <el-checkbox v-for="vl in AssetTypeOptions" @change="checkedChange(vl)" :key="vl.VAL_CODE" :label="vl.VAL_CODE">{{vl.VAL_NAME}}</el-checkbox>
            </el-checkbox-group>
          </el-form-item>

          <!--房屋 start-->
          <div v-show="housFlag">
            <!--   <el-form-item>
                 <el-button icon="fa fa-plus" type="primary" @click="onSubmit">新增房屋</el-button>
               </el-form-item>-->
            <el-button icon="fa fa-plus" type="primary" @click="addHousAsset">增加房屋资产</el-button>
            <br>
            <el-table
              border
              :data="assetTypeHousesTableData"
              style="width: 80%">
              <el-table-column
                fixed
                prop="whetherOwnershipCertificatess"
                label="是否不动产权证"
                width="150">
              </el-table-column>
              <el-table-column
                prop="propertyCertificateNumber"
                label="不动产权证号"
                width="120">
              </el-table-column>
              <el-table-column
                prop="deed"
                label="房产证号"
                width="120">
              </el-table-column>
              <el-table-column
                prop="landCertificate"
                label="土地证号"
                width="120">
              </el-table-column>
              <el-table-column
                prop="constructionArea"
                label="房屋建筑面积"
                width="120">
              </el-table-column>
              <el-table-column
                label="操作">
                <template slot-scope="scope">
                  <el-button @click="removeHousAsset(scope.$index + 1)" type="text" size="small">删除</el-button>
                  <!-- <el-button @click="handleHousAssetEdit(scope.row.assetTypeHouses)" type="text" size="small">编辑</el-button>-->
                </template>
              </el-table-column>
            </el-table>

            <!--新增编辑界面-->
            <el-dialog :title="operation?'新增':'新增'" width="60%" :visible.sync="addHousAssetDialogVisible" :close-on-click-modal="false">
              <el-form :model="assetTypeHouses" label-width="80px" :rules="dataFormRules" ref="dataForm" :size="size">
                <el-form-item label="是否不动产权证">
                  <el-radio-group v-model="assetTypeHouses.whetherOwnershipCertificates" @change="whetherOwnershipCertificatesChange">
                    <el-radio  v-for="(vl, index) in WhetherOwnershipCertificatesOptions" :label="vl.VAL_CODE" :key="index">
                      {{vl.VAL_NAME}}
                    </el-radio>
                  </el-radio-group>
                </el-form-item>

                <el-form-item label="不动产权证号" v-show="propertyCertificateNumberFlag">
                  <el-input v-model="assetTypeHouses.propertyCertificateNumber" size="small" class="width180"></el-input>
                </el-form-item>

                <el-row >
                  <el-col span="8" v-show="deedNumberFlag">
                    <el-form-item label="房产证号">
                      <el-input v-model="assetTypeHouses.deed" size="small" class="width180"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col span="8" v-show="deedLandCertificateFlag">
                    <el-form-item label="土地证号">
                      <el-input v-model="assetTypeHouses.landCertificate" size="small" class="width180"></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>

                <el-row>
                  <el-col span="8">
                    <el-form-item label="名称">
                      <el-input v-model="assetTypeHouses.name" size="small" class="width180"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col span="8">
                    <el-form-item label="地址">
                      <el-input v-model="assetTypeHouses.address" size="small" class="width180"></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>

                <el-form-item label="所属地">
                  <el-radio-group v-model="assetTypeHouses.affiliation">
                    <el-radio  v-for="(vl, index) in AffiliationOptions" :label="vl.VAL_CODE" :key="index">
                      {{vl.VAL_NAME}}
                    </el-radio>
                  </el-radio-group>
                </el-form-item>

                <el-row>
                  <el-col span="8">
                    <el-form-item label="房屋建筑面积">
                      <el-input v-model="assetTypeHouses.constructionArea" size="small" class="width180"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col span="8">
                    <el-form-item label="价值">
                      <el-input v-model="assetTypeHouses.value" size="small" class="width180"></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>

                <el-form-item label="融资情况">
                  <el-radio-group v-model="assetTypeHouses.financingSituation">
                    <el-radio  v-for="(vl, index) in FinancingSituationOptions" :label="vl.VAL_CODE" :key="index">
                      {{vl.VAL_NAME}}
                    </el-radio>
                  </el-radio-group>
                </el-form-item>

                <el-form-item label="是否有共有人">
                  <el-radio-group v-model="assetTypeHouses.whetherCoOwner" @change="whetherCoownerChange">
                    <el-radio  v-for="(vl, index) in WhetherCoownerOptions" :label="vl.VAL_CODE" :key="index">
                      {{vl.VAL_NAME}}
                    </el-radio>
                  </el-radio-group>
                </el-form-item>
                <el-form-item label="共有人姓名" v-show="coOwnerNameFlag">
                  <el-input v-model="assetTypeHouses.coOwnerName" size="small" class="width180"></el-input>
                </el-form-item>

                <el-form-item label="是否有租赁">
                  <el-radio-group v-model="assetTypeHouses.whetherLease">
                    <el-radio  v-for="(vl, index) in WhetherLeaseOptions" :label="vl.VAL_CODE" :key="index">
                      {{vl.VAL_NAME}}
                    </el-radio>
                  </el-radio-group>
                </el-form-item>
              </el-form>
              <div slot="footer" class="dialog-footer">
                <el-button :size="size" @click.native="addHousAssetDialogVisible = false">{{$t('action.cancel')}}</el-button>
                <el-button :size="size" type="primary" @click.native="assetTypeHousesForm" :loading="editLoading">{{$t('action.submit')}}</el-button>
              </div>
            </el-dialog>
            <br><br>
          </div>
          <!--房屋 end-->
          <!--土地 start-->
          <div v-show="landFlag">
            <el-button icon="fa fa-plus" type="primary" @click="addLandAsset">增加土地资产</el-button>
            <br>
            <el-table
              border
              :data="landTableData"
              style="width: 80%">
              <el-table-column
                fixed
                prop="landCertificate"
                label="土地证号"
                width="150">
              </el-table-column>
              <el-table-column
                prop="name"
                label="名称"
                width="120">
              </el-table-column>
              <el-table-column
                prop="address"
                label="地址"
                width="120">
              </el-table-column>
              <el-table-column
                prop="constructionArea"
                label="房屋建筑面积"
                width="120">
              </el-table-column>
              <el-table-column
                label="操作">
                <template slot-scope="scope">
                  <el-button @click="removeLandAsset(scope.$index + 1)" type="text" size="small">删除</el-button>
                  <!--  <el-button @click="handleLandAssetEdit(scope.row.assetTypeLand)" type="text" size="small">编辑</el-button>-->
                </template>
              </el-table-column>
            </el-table>

            <!--新增编辑土地界面-->
            <el-dialog :title="operationLand?'新增':'编辑'" width="60%" :visible.sync="addLandAssetDialogVisible" :close-on-click-modal="false">
              <el-form :model="assetTypeLand" label-width="80px" :rules="dataFormRules" ref="dataForm" :size="size">
                <el-form-item label="土地证号">
                  <el-input v-model="assetTypeLand.landCertificate" size="small" class="width180"></el-input>
                </el-form-item>
                <el-row>
                  <el-col span="8">
                    <el-form-item label="名称">
                      <el-input v-model="assetTypeLand.name" size="small" class="width180"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col span="8">
                    <el-form-item label="地址">
                      <el-input v-model="assetTypeLand.address" size="small" class="width180"></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>

                <el-form-item label="所属地">
                  <el-radio-group v-model="assetTypeLand.affiliation">
                    <el-radio  v-for="(vl, index) in AffiliationOptions" :label="vl.VAL_CODE" :key="index">
                      {{vl.VAL_NAME}}
                    </el-radio>
                  </el-radio-group>
                </el-form-item>

                <el-row>
                  <el-col span="8">
                    <el-form-item label="房屋建筑面积">
                      <el-input v-model="assetTypeLand.constructionArea" size="small" class="width180"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col span="8">
                    <el-form-item label="价值">
                      <el-input v-model="assetTypeLand.value" size="small" class="width180"></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>

                <el-form-item label="融资情况">
                  <el-radio-group v-model="assetTypeLand.financingSituation">
                    <el-radio  v-for="(vl, index) in FinancingSituationOptions" :label="vl.VAL_CODE" :key="index">
                      {{vl.VAL_NAME}}
                    </el-radio>
                  </el-radio-group>
                </el-form-item>

                <el-form-item label="是否有共有人">
                  <el-radio-group v-model="assetTypeLand.whetherCoOwner" @change="whetherCoownerChange">
                    <el-radio  v-for="(vl, index) in WhetherCoownerOptions" :label="vl.VAL_CODE" :key="index">
                      {{vl.VAL_NAME}}
                    </el-radio>
                  </el-radio-group>
                </el-form-item>
                <el-form-item label="共有人姓名" v-show="coOwnerNameFlag">
                  <el-input v-model="assetTypeLand.coOwnerName" size="small" class="width180"></el-input>
                </el-form-item>

                <el-form-item label="是否有租赁">
                  <el-radio-group v-model="assetTypeLand.whetherLease">
                    <el-radio  v-for="(vl, index) in WhetherLeaseOptions" :label="vl.VAL_CODE" :key="index">
                      {{vl.VAL_NAME}}
                    </el-radio>
                  </el-radio-group>
                </el-form-item>
              </el-form>
              <div slot="footer" class="dialog-footer">
                <el-button :size="size" @click.native="addLandAssetDialogVisible = false">{{$t('action.cancel')}}</el-button>
                <el-button :size="size" type="primary" @click.native="assetTypeLandForm" :loading="editLoading">{{$t('action.submit')}}</el-button>
              </div>
            </el-dialog>
            <br><br>
          </div>
          <!--土地 end-->
          <!--汽车 start-->
          <div v-show="carFlag">
            <el-button icon="fa fa-plus" type="primary" @click="addCarAsset">增加汽车资产</el-button>
            <br>
            <el-table
              border
              :data="carTableData"
              style="width: 80%">
              <el-table-column
                fixed
                prop="brand"
                label="汽车品牌"
                width="150">
              </el-table-column>
              <el-table-column
                prop="value"
                label="价值"
                width="120">
              </el-table-column>
              <el-table-column
                prop="numberPlate"
                label="车牌号"
                width="120">
              </el-table-column>
              <el-table-column
                prop="drivingLicenseNumber"
                label="行驶证号"
                width="120">
              </el-table-column>
              <el-table-column
                label="操作">
                <template slot-scope="scope">
                  <el-button @click="removeCarAsset(scope.$index + 1)" type="text" size="small">删除</el-button>
                  <!--  <el-button @click="handleCarAssetEdit(scope.row.assetTypeCar)" type="text" size="small">编辑</el-button>-->
                </template>
              </el-table-column>
            </el-table>
            <el-dialog :title="operationCar?'新增':'编辑'" width="60%" :visible.sync="addCarAssetDialogVisible" :close-on-click-modal="false">
              <el-form :model="assetTypeCar" label-width="80px" :rules="dataFormRules" ref="dataForm" :size="size">
                <el-row>
                  <el-col span="8">
                    <el-form-item label="汽车品牌">
                      <el-input v-model="assetTypeCar.brand" size="small" class="width180"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col span="8">
                    <el-form-item label="价值">
                      <el-input v-model="assetTypeCar.value" size="small" class="width180"></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col span="8">
                    <el-form-item label="车牌号">
                      <el-input v-model="assetTypeCar.numberPlate" size="small" class="width180"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col span="8">
                    <el-form-item label="行驶证号">
                      <el-input v-model="assetTypeCar.drivingLicenseNumber" size="small" class="width180"></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
              </el-form>
              <div slot="footer" class="dialog-footer">
                <el-button :size="size" @click.native="addCarAssetDialogVisible = false">{{$t('action.cancel')}}</el-button>
                <el-button :size="size" type="primary" @click.native="assetTypeCarForm" :loading="editLoading">{{$t('action.submit')}}</el-button>
              </div>
            </el-dialog>
            <br><br>
          </div>
          <!--汽车 end-->
          <!--证券 start-->
          <div v-show="securitiesFlag">
            <el-button icon="fa fa-plus" type="primary" @click="addSecuritiesAsset">增加证券资产</el-button>
            <br>
            <el-table
              border
              :data="securitiesTableData"
              style="width: 80%">
              <el-table-column
                fixed
                prop="types"
                label="证券种类"
                width="150">
              </el-table-column>
              <el-table-column
                prop="value"
                label="价值"
                width="120">
              </el-table-column>
              <el-table-column
                label="操作">
                <template slot-scope="scope">
                  <el-button @click="removeSecuritiesAsset(scope.$index + 1)" type="text" size="small">删除</el-button>
                  <!--<el-button @click="handleSecuritiesAssetEdit(scope.row.assetTypeSecurities)" type="text" size="small">编辑</el-button>-->
                </template>
              </el-table-column>
            </el-table>
            <el-dialog :title="operationSecurities?'新增':'编辑'" width="60%" :visible.sync="addSecuritiesAssetDialogVisible" :close-on-click-modal="false">
              <el-form :model="assetTypeSecurities" label-width="80px" :rules="dataFormRules" ref="dataForm" :size="size">
                <el-form-item label="证券种类">
                  <el-radio-group v-model="assetTypeSecurities.type">
                    <el-radio  v-for="(vl, index) in SecuritiesTypeOptions" :label="vl.VAL_CODE" :key="index">
                      {{vl.VAL_NAME}}
                    </el-radio>
                  </el-radio-group>
                </el-form-item>
                <el-form-item label="价值">
                  <el-input v-model="assetTypeSecurities.value" size="small" class="width180"></el-input>
                </el-form-item>
              </el-form>
              <div slot="footer" class="dialog-footer">
                <el-button :size="size" @click.native="addSecuritiesAssetDialogVisible = false">{{$t('action.cancel')}}</el-button>
                <el-button :size="size" type="primary" @click.native="assetTypeSecuritiesForm" :loading="editLoading">{{$t('action.submit')}}</el-button>
              </div>
            </el-dialog>
            <br><br>
          </div>
          <!--证券 end-->
          <!--其他 start-->
          <div v-show="otherFlag">
            <el-button icon="fa fa-plus" type="primary" @click="addOtherAsset">增加其他资产</el-button>
            <br>
            <el-table
              border
              :data="otherTableData"
              style="width: 80%">
              <el-table-column
                fixed
                prop="assetName"
                label="资产名称"
                width="150">
              </el-table-column>
              <el-table-column
                prop="value"
                label="价值"
                width="120">
              </el-table-column>
              <el-table-column
                label="操作">
                <template slot-scope="scope">
                  <el-button @click="removeOtherAsset(scope.$index + 1)" type="text" size="small">删除</el-button>
                  <!-- <el-button @click="handleOtherAssetEdit(scope.row.assetTypeOther)" type="text" size="small">编辑</el-button>-->
                </template>
              </el-table-column>
            </el-table>
            <el-dialog :title="operationOther?'新增':'编辑'" width="60%" :visible.sync="addOtherAssetDialogVisible" :close-on-click-modal="false">
              <el-form :model="assetTypeOther" label-width="80px" :rules="dataFormRules" ref="dataForm" :size="size">
                <el-row>
                  <el-col span="8">
                    <el-form-item label="资产名称">
                      <el-input v-model="assetTypeOther.assetName" size="small" class="width180"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col span="8">
                    <el-form-item label="价值">
                      <el-input v-model="assetTypeOther.value" size="small" class="width180"></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
              </el-form>
              <div slot="footer" class="dialog-footer">
                <el-button :size="size" @click.native="addOtherAssetDialogVisible = false">{{$t('action.cancel')}}</el-button>
                <el-button :size="size" type="primary" @click.native="assetTypeOtherForm" :loading="editLoading">{{$t('action.submit')}}</el-button>
              </div>
            </el-dialog>
            <br><br>
          </div>
          <!--其他 end-->

          <!--婚姻状态-->
          <el-form-item label="婚姻状况" prop="maritalStatus">
            <el-radio-group v-model="relatedPersonnelInformationForm.maritalStatus" @change="maritalStatusChange">
              <el-radio  v-for="(vl, index) in MaritalStatusOptions" :label="vl.VAL_CODE" :key="index">
                {{vl.VAL_NAME}}
              </el-radio>
            </el-radio-group>
          </el-form-item>

          <!--婚姻状况 start-->
          <div v-show="maritalStatusFlag">
            <!--已婚-->
            <div v-show="maritalStatusMarriedFlag">
              <el-form-item label="与借款人关系">
                <el-checkbox-group  v-model="relatedPersonnelInformationSpouseForm.type" class="checkgroup">
                  <el-checkbox v-for="vl in SpouseTypeOptions" :key="vl.VAL_CODE" :label="vl.VAL_CODE">{{vl.VAL_NAME}}</el-checkbox>
                </el-checkbox-group>
              </el-form-item>
              <el-row>
                <el-col span="8">
                  <el-form-item label="姓名" class="item">
                    <el-input v-model="relatedPersonnelInformationSpouseForm.name" size="small" class="width150"></el-input>
                  </el-form-item>
                </el-col>
                <el-col span="8">
                  <el-form-item label="身份证号码">
                    <el-input v-model="relatedPersonnelInformationSpouseForm.identityNumber" size="small" class="width150"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-form-item label="年龄">
                <el-input v-model="relatedPersonnelInformationSpouseForm.age" size="small" class="width150"></el-input>
              </el-form-item>
              <el-form-item label="性别">
                <el-radio-group v-model="relatedPersonnelInformationSpouseForm.sex">
                  <el-radio  v-for="(vl, index) in SexOptions" :label="vl.VAL_CODE" :key="index">
                    {{vl.VAL_NAME}}
                  </el-radio>
                </el-radio-group>
              </el-form-item>
              <el-row>
                <el-col span="8">
                  <el-form-item label="户籍所在地">
                    <el-input v-model="relatedPersonnelInformationSpouseForm.domicile" size="small" class="width150"></el-input>
                  </el-form-item>
                </el-col>
                <el-col span="8">
                  <el-form-item label="现居住地址">
                    <el-input v-model="relatedPersonnelInformationSpouseForm.currentHomeAddress" size="small" class="width150"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>

              <el-row>
                <el-col span="8">
                  <el-form-item label="本地居住时间">
                    <el-input v-model="relatedPersonnelInformationSpouseForm.localResidenceTime" size="small" class="width150"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-form-item label="常用通信地址">
                <el-radio-group v-model="relatedPersonnelInformationSpouseForm.contactAddress">
                  <el-radio  v-for="(vl, index) in ContactAddressOptions" :label="vl.VAL_CODE" :key="index">
                    {{vl.VAL_NAME}}
                  </el-radio>
                </el-radio-group>
              </el-form-item>

              <el-row>
                <el-col span="8">
                  <el-form-item label="联系电话">
                    <el-input v-model="relatedPersonnelInformationSpouseForm.contactNumber" size="small" class="width150"></el-input>
                  </el-form-item>
                </el-col>
                <el-col span="8">
                  <el-form-item label="电子邮箱">
                    <el-input v-model="relatedPersonnelInformationSpouseForm.email" size="small" class="width150"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>

              <el-row>
                <el-col span="8">
                  <el-form-item label="QQ号">
                    <el-input v-model="relatedPersonnelInformationSpouseForm.qq" size="small" class="width150"></el-input>
                  </el-form-item>
                </el-col>
                <el-col span="8">
                  <el-form-item label="微信号">
                    <el-input v-model="relatedPersonnelInformationSpouseForm.wechat" size="small" class="width150"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-form-item label="文化程度">
                <el-radio-group v-model="relatedPersonnelInformationSpouseForm.educationalLevel" @change="educationaLevelChange">
                  <el-radio  v-for="(vl, index) in EducationalLevelOptions" :label="vl.VAL_CODE" :key="index">
                    {{vl.VAL_NAME}}
                  </el-radio>
                </el-radio-group>
                <!--其他-->
                <el-input v-model="relatedPersonnelInformationSpouseForm.educationalLevelValue" v-show="educationalLevelFlag" size="small" class="width150"></el-input>
              </el-form-item>

              <el-form-item label="现住房来源">
                <el-radio-group v-model="relatedPersonnelInformationSpouseForm.currentHousingSource" @change="currentHousingSourceChange">
                  <el-radio  v-for="(vl, index) in CurrentHousingSourceOptions" :label="vl.VAL_CODE" :key="index">
                    {{vl.VAL_NAME}}
                  </el-radio>
                </el-radio-group>
                <!--其他-->
                <el-input v-model="relatedPersonnelInformationSpouseForm.currentHousingSourceValue" v-show="currentHousingSourceFlag" size="small" class="width150"></el-input>
              </el-form-item>
              <el-row>
                <el-col span="8">
                  <el-form-item label="工作单位">
                    <el-input v-model="relatedPersonnelInformationSpouseForm.employer" size="small" class="width150"></el-input>
                  </el-form-item>
                </el-col>
                <el-col span="8">
                  <el-form-item label="职务">
                    <el-input v-model="relatedPersonnelInformationSpouseForm.position" size="small" class="width150"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col span="8">
                  <el-form-item label="持股比例">
                    <el-input v-model="relatedPersonnelInformationSpouseForm.shareholdingRatio" size="small" class="width150"></el-input>
                  </el-form-item>
                </el-col>
                <el-col span="8">
                  <el-form-item label="单位工作年限">
                    <el-input v-model="relatedPersonnelInformationSpouseForm.unitWorkingYears" placeholder="在该单位工作年限" size="small" class="width150"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col span="8">
                  <el-form-item label="投资经营企业">
                    <el-input v-model="relatedPersonnelInformationSpouseForm.companyName" placeholder="所投资或经营企业名称" size="small" class="width150"></el-input>
                  </el-form-item>
                </el-col>
                <el-col span="8">
                  <el-form-item label="行业经营年限">
                    <el-input v-model="relatedPersonnelInformationSpouseForm.yearsOperation" placeholder="本行业和相近行业经营年限" size="small" class="width180"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>

              <el-form-item label="资产情况">
                <el-radio-group v-model="relatedPersonnelInformationSpouseForm.assetSituation" @change="assetSituationSpouseChange">
                  <el-radio  v-for="(vl, index) in AssetSituationOptions" :label="vl.VAL_CODE" :key="index">
                    {{vl.VAL_NAME}}
                  </el-radio>
                </el-radio-group>
              </el-form-item>

              <el-form-item label="资产类型" v-show="assetTypeFlagSpouse">
                <el-checkbox-group  v-model="relatedPersonnelInformationSpouseForm.assetType" class="checkgroup">
                  <el-checkbox v-for="vl in AssetTypeOptions" @change="checkedSpouseChange(vl)" :key="vl.VAL_CODE" :label="vl.VAL_CODE">{{vl.VAL_NAME}}</el-checkbox>
                </el-checkbox-group>
              </el-form-item>

              <!--房屋 start-->
              <div v-show="housSpouseFlag">
                <!--   <el-form-item>
                     <el-button icon="fa fa-plus" type="primary" @click="onSubmit">新增房屋</el-button>
                   </el-form-item>-->
                <el-button icon="fa fa-plus" type="primary" @click="addSpouseHousAsset">增加房屋资产</el-button>
                <br>
                <el-table
                  border
                  :data="assetTypeSpouseHousesTableData"
                  style="width: 80%">
                  <el-table-column
                    fixed
                    prop="whetherOwnershipCertificatess"
                    label="是否不动产权证"
                    width="150">
                  </el-table-column>
                  <el-table-column
                    prop="propertyCertificateNumber"
                    label="不动产权证号"
                    width="120">
                  </el-table-column>
                  <el-table-column
                    prop="deed"
                    label="房产证号"
                    width="120">
                  </el-table-column>
                  <el-table-column
                    prop="landCertificate"
                    label="土地证号"
                    width="120">
                  </el-table-column>
                  <el-table-column
                    prop="constructionArea"
                    label="房屋建筑面积"
                    width="120">
                  </el-table-column>
                  <el-table-column
                    label="操作">
                    <template slot-scope="scope">
                      <el-button @click="removeSpouseHousAsset(scope.$index + 1)" type="text" size="small">删除</el-button>
                      <!-- <el-button @click="handleSpouseHousAssetEdit(scope.row.assetTypeHouses)" type="text" size="small">编辑</el-button>-->
                    </template>
                  </el-table-column>
                </el-table>

                <!--新增编辑界面-->
                <el-dialog :title="operationSpouse?'新增':'新增'" width="60%" :visible.sync="addSpouseHousAssetDialogVisible" :close-on-click-modal="false">
                  <el-form :model="spouseAssetTypeHouses" label-width="150px" :rules="dataFormRules" ref="dataForm" :size="size">
                    <el-form-item label="是否不动产权证">
                      <el-radio-group v-model="spouseAssetTypeHouses.whetherOwnershipCertificates" @change="whetherOwnershipCertificatesChange">
                        <el-radio  v-for="(vl, index) in WhetherOwnershipCertificatesOptions" :label="vl.VAL_CODE" :key="index">
                          {{vl.VAL_NAME}}
                        </el-radio>
                      </el-radio-group>
                    </el-form-item>

                    <el-form-item label="不动产权证号" v-show="propertyCertificateNumberFlag">
                      <el-input v-model="spouseAssetTypeHouses.propertyCertificateNumber" size="small" class="width180"></el-input>
                    </el-form-item>

                    <el-row>
                      <el-col span="8" v-show="deedNumberFlag">
                        <el-form-item label="房产证号">
                          <el-input v-model="spouseAssetTypeHouses.deed" size="small" class="width180"></el-input>
                        </el-form-item>
                      </el-col>
                    </el-row>
                    <el-row>
                      <el-col span="8" v-show="deedLandCertificateFlag">
                        <el-form-item label="土地证号">
                          <el-input v-model="spouseAssetTypeHouses.landCertificate" size="small" class="width180"></el-input>
                        </el-form-item>
                      </el-col>
                    </el-row>

                    <el-row>
                      <el-col span="8">
                        <el-form-item label="名称">
                          <el-input v-model="spouseAssetTypeHouses.name" size="small" class="width180"></el-input>
                        </el-form-item>
                      </el-col>
                    </el-row>
                    <el-row>
                      <el-col span="8">
                        <el-form-item label="地址">
                          <el-input v-model="spouseAssetTypeHouses.address" size="small" class="width180"></el-input>
                        </el-form-item>
                      </el-col>
                    </el-row>

                    <el-form-item label="所属地">
                      <el-radio-group v-model="spouseAssetTypeHouses.affiliation">
                        <el-radio  v-for="(vl, index) in AffiliationOptions" :label="vl.VAL_CODE" :key="index">
                          {{vl.VAL_NAME}}
                        </el-radio>
                      </el-radio-group>
                    </el-form-item>

                    <el-row>
                      <el-col span="8">
                        <el-form-item label="房屋建筑面积">
                          <el-input v-model="spouseAssetTypeHouses.constructionArea" size="small" class="width180"></el-input>
                        </el-form-item>
                      </el-col>
                    </el-row>
                    <el-row>
                      <el-col span="8">
                        <el-form-item label="价值">
                          <el-input v-model="spouseAssetTypeHouses.value" size="small" class="width180"></el-input>
                        </el-form-item>
                      </el-col>
                    </el-row>

                    <el-form-item label="融资情况">
                      <el-radio-group v-model="spouseAssetTypeHouses.financingSituation">
                        <el-radio  v-for="(vl, index) in FinancingSituationOptions" :label="vl.VAL_CODE" :key="index">
                          {{vl.VAL_NAME}}
                        </el-radio>
                      </el-radio-group>
                    </el-form-item>

                    <el-form-item label="是否有共有人">
                      <el-radio-group v-model="spouseAssetTypeHouses.whetherCoOwner" @change="whetherCoownerChange">
                        <el-radio  v-for="(vl, index) in WhetherCoownerOptions" :label="vl.VAL_CODE" :key="index">
                          {{vl.VAL_NAME}}
                        </el-radio>
                      </el-radio-group>
                    </el-form-item>
                    <el-form-item label="共有人姓名" v-show="coOwnerNameFlag">
                      <el-input v-model="spouseAssetTypeHouses.coOwnerName" size="small" class="width180"></el-input>
                    </el-form-item>

                    <el-form-item label="是否有租赁">
                      <el-radio-group v-model="spouseAssetTypeHouses.whetherLease">
                        <el-radio  v-for="(vl, index) in WhetherLeaseOptions" :label="vl.VAL_CODE" :key="index">
                          {{vl.VAL_NAME}}
                        </el-radio>
                      </el-radio-group>
                    </el-form-item>
                  </el-form>
                  <div slot="footer" class="dialog-footer">
                    <el-button :size="size" @click.native="addSpouseHousAssetDialogVisible = false">{{$t('action.cancel')}}</el-button>
                    <el-button :size="size" type="primary" @click.native="assetTypeSpouseHousesForm" :loading="editLoading">{{$t('action.submit')}}</el-button>
                  </div>
                </el-dialog>
                <br><br>
              </div>
              <!--房屋 end-->
              <!--土地 start-->
              <div v-show="landSpouseFlag">
                <el-button icon="fa fa-plus" type="primary" @click="addSpouseLandAsset">增加土地资产</el-button>
                <br>
                <el-table
                  border
                  :data="spouseLandTableData"
                  style="width: 80%">
                  <el-table-column
                    fixed
                    prop="landCertificate"
                    label="土地证号"
                    width="150">
                  </el-table-column>
                  <el-table-column
                    prop="name"
                    label="名称"
                    width="120">
                  </el-table-column>
                  <el-table-column
                    prop="address"
                    label="地址"
                    width="120">
                  </el-table-column>
                  <el-table-column
                    prop="constructionArea"
                    label="房屋建筑面积"
                    width="120">
                  </el-table-column>
                  <el-table-column
                    label="操作">
                    <template slot-scope="scope">
                      <el-button @click="removeSpouseLandAsset(scope.$index + 1)" type="text" size="small">删除</el-button>
                      <!-- <el-button @click="handleSpouseLandAssetEdit(scope.row.assetTypeLand)" type="text" size="small">编辑</el-button>-->
                    </template>
                  </el-table-column>
                </el-table>

                <!--新增编辑土地界面-->
                <el-dialog :title="operationSpouseLand?'新增':'编辑'" width="60%" :visible.sync="addSpouseLandAssetDialogVisible" :close-on-click-modal="false">
                  <el-form :model="spouseAssetTypeLand" label-width="150px" :rules="dataFormRules" ref="spouseAssetTypeLand" :size="size">
                    <el-form-item label="土地证号">
                      <el-input v-model="spouseAssetTypeLand.landCertificate" size="small" class="width180"></el-input>
                    </el-form-item>
                    <el-row>
                      <el-col span="8">
                        <el-form-item label="名称">
                          <el-input v-model="spouseAssetTypeLand.name" size="small" class="width180"></el-input>
                        </el-form-item>
                      </el-col>
                    </el-row>
                    <el-row>
                      <el-col span="8">
                        <el-form-item label="地址">
                          <el-input v-model="spouseAssetTypeLand.address" size="small" class="width180"></el-input>
                        </el-form-item>
                      </el-col>
                    </el-row>

                    <el-form-item label="所属地">
                      <el-radio-group v-model="spouseAssetTypeLand.affiliation">
                        <el-radio  v-for="(vl, index) in AffiliationOptions" :label="vl.VAL_CODE" :key="index">
                          {{vl.VAL_NAME}}
                        </el-radio>
                      </el-radio-group>
                    </el-form-item>

                    <el-row>
                      <el-col span="8">
                        <el-form-item label="房屋建筑面积">
                          <el-input v-model="spouseAssetTypeLand.constructionArea" size="small" class="width180"></el-input>
                        </el-form-item>
                      </el-col>
                    </el-row>
                    <el-row>
                      <el-col span="8">
                        <el-form-item label="价值">
                          <el-input v-model="spouseAssetTypeLand.value" size="small" class="width180"></el-input>
                        </el-form-item>
                      </el-col>
                    </el-row>

                    <el-form-item label="融资情况">
                      <el-radio-group v-model="spouseAssetTypeLand.financingSituation">
                        <el-radio  v-for="(vl, index) in FinancingSituationOptions" :label="vl.VAL_CODE" :key="index">
                          {{vl.VAL_NAME}}
                        </el-radio>
                      </el-radio-group>
                    </el-form-item>

                    <el-form-item label="是否有共有人">
                      <el-radio-group v-model="spouseAssetTypeLand.whetherCoOwner" @change="whetherCoownerChange">
                        <el-radio  v-for="(vl, index) in WhetherCoownerOptions" :label="vl.VAL_CODE" :key="index">
                          {{vl.VAL_NAME}}
                        </el-radio>
                      </el-radio-group>
                    </el-form-item>
                    <el-form-item label="共有人姓名" v-show="coOwnerNameFlag">
                      <el-input v-model="spouseAssetTypeLand.coOwnerName" size="small" class="width180"></el-input>
                    </el-form-item>

                    <el-form-item label="是否有租赁">
                      <el-radio-group v-model="spouseAssetTypeLand.whetherLease">
                        <el-radio  v-for="(vl, index) in WhetherLeaseOptions" :label="vl.VAL_CODE" :key="index">
                          {{vl.VAL_NAME}}
                        </el-radio>
                      </el-radio-group>
                    </el-form-item>
                  </el-form>
                  <div slot="footer" class="dialog-footer">
                    <el-button :size="size" @click.native="addSpouseLandAssetDialogVisible = false">{{$t('action.cancel')}}</el-button>
                    <el-button :size="size" type="primary" @click.native="assetTypeSpouseLandForm" :loading="editLoading">{{$t('action.submit')}}</el-button>
                  </div>
                </el-dialog>
                <br><br>
              </div>
              <!--土地 end-->
              <!--汽车 start-->
              <div v-show="carSpouseFlag">
                <el-button icon="fa fa-plus" type="primary" @click="addSpouseCarAsset">增加汽车资产</el-button>
                <br>
                <el-table
                  border
                  :data="spouseCarTableData"
                  style="width: 80%">
                  <el-table-column
                    fixed
                    prop="brand"
                    label="汽车品牌"
                    width="150">
                  </el-table-column>
                  <el-table-column
                    prop="value"
                    label="价值"
                    width="120">
                  </el-table-column>
                  <el-table-column
                    prop="numberPlate"
                    label="车牌号"
                    width="120">
                  </el-table-column>
                  <el-table-column
                    prop="drivingLicenseNumber"
                    label="行驶证号"
                    width="120">
                  </el-table-column>
                  <el-table-column
                    label="操作">
                    <template slot-scope="scope">
                      <el-button @click="removeSpouseCarAsset(scope.$index + 1)" type="text" size="small">删除</el-button>
                      <!-- <el-button @click="handleSpouseCarAssetEdit(scope.row.assetTypeCar)" type="text" size="small">编辑</el-button>-->
                    </template>
                  </el-table-column>
                </el-table>
                <el-dialog :title="operationSpouseCar?'新增':'编辑'" width="60%" :visible.sync="addSpouseCarAssetDialogVisible" :close-on-click-modal="false">
                  <el-form :model="spouseAssetTypeCar" label-width="80px" :rules="dataFormRules" ref="dataForm" :size="size">
                    <el-row>
                      <el-col span="8">
                        <el-form-item label="汽车品牌">
                          <el-input v-model="spouseAssetTypeCar.brand" size="small" class="width180"></el-input>
                        </el-form-item>
                      </el-col>
                      <el-col span="8">
                        <el-form-item label="价值">
                          <el-input v-model="spouseAssetTypeCar.value" size="small" class="width180"></el-input>
                        </el-form-item>
                      </el-col>
                    </el-row>
                    <el-row>
                      <el-col span="8">
                        <el-form-item label="车牌号">
                          <el-input v-model="spouseAssetTypeCar.numberPlate" size="small" class="width180"></el-input>
                        </el-form-item>
                      </el-col>
                      <el-col span="8">
                        <el-form-item label="行驶证号">
                          <el-input v-model="spouseAssetTypeCar.drivingLicenseNumber" size="small" class="width180"></el-input>
                        </el-form-item>
                      </el-col>
                    </el-row>
                  </el-form>
                  <div slot="footer" class="dialog-footer">
                    <el-button :size="size" @click.native="addSpouseCarAssetDialogVisible = false">{{$t('action.cancel')}}</el-button>
                    <el-button :size="size" type="primary" @click.native="assetTypeSpouseCarForm" :loading="editLoading">{{$t('action.submit')}}</el-button>
                  </div>
                </el-dialog>
                <br><br>
              </div>
              <!--汽车 end-->
              <!--证券 start-->
              <div v-show="securitiesSpouseFlag">
                <el-button icon="fa fa-plus" type="primary" @click="addSpouseSecuritiesAsset">增加证券资产</el-button>
                <br>
                <el-table
                  border
                  :data="spouseSecuritiesTableData"
                  style="width: 80%">
                  <el-table-column
                    fixed
                    prop="type"
                    label="证券种类"
                    width="150">
                  </el-table-column>
                  <el-table-column
                    prop="value"
                    label="价值"
                    width="120">
                  </el-table-column>
                  <el-table-column
                    label="操作">
                    <template slot-scope="scope">
                      <el-button @click="removeSpouseSecuritiesAsset(scope.$index + 1)" type="text" size="small">删除</el-button>
                      <!--  <el-button @click="handleSpouseSecuritiesAssetEdit(scope.row.assetTypeSecurities)" type="text" size="small">编辑</el-button>-->
                    </template>
                  </el-table-column>
                </el-table>
                <el-dialog :title="operationSpouseSecurities?'新增':'编辑'" width="60%" :visible.sync="addSpouseSecuritiesAssetDialogVisible" :close-on-click-modal="false">
                  <el-form :model="spouseAssetTypeSecurities" label-width="80px" :rules="dataFormRules" ref="dataForm" :size="size">
                    <el-form-item label="证券种类">
                      <el-radio-group v-model="spouseAssetTypeSecurities.type">
                        <el-radio  v-for="(vl, index) in SecuritiesTypeOptions" :label="vl.VAL_CODE" :key="index">
                          {{vl.VAL_NAME}}
                        </el-radio>
                      </el-radio-group>
                    </el-form-item>
                    <el-form-item label="价值">
                      <el-input v-model="spouseAssetTypeSecurities.value" size="small" class="width180"></el-input>
                    </el-form-item>
                  </el-form>
                  <div slot="footer" class="dialog-footer">
                    <el-button :size="size" @click.native="addSpouseSecuritiesAssetDialogVisible = false">{{$t('action.cancel')}}</el-button>
                    <el-button :size="size" type="primary" @click.native="assetTypeSpouseSecuritiesForm" :loading="editLoading">{{$t('action.submit')}}</el-button>
                  </div>
                </el-dialog>
                <br><br>
              </div>
              <!--证券 end-->
              <!--其他 start-->
              <div v-show="otherSpouseFlag">
                <el-button icon="fa fa-plus" type="primary" @click="addSpouseOtherAsset">增加其他资产</el-button>
                <br>
                <el-table
                  border
                  :data="spouseOtherTableData"
                  style="width: 80%">
                  <el-table-column
                    fixed
                    prop="assetName"
                    label="资产名称"
                    width="150">
                  </el-table-column>
                  <el-table-column
                    prop="value"
                    label="价值"
                    width="120">
                  </el-table-column>
                  <el-table-column
                    label="操作">
                    <template slot-scope="scope">
                      <el-button @click="removeSpouseOtherAsset(scope.$index + 1)" type="text" size="small">删除</el-button>
                      <!-- <el-button @click="handleSpouseOtherAssetEdit(scope.row.assetTypeOther)" type="text" size="small">编辑</el-button>-->
                    </template>
                  </el-table-column>
                </el-table>
                <el-dialog :title="operationSpouseOther?'新增':'编辑'" width="60%" :visible.sync="addSpouseOtherAssetDialogVisible" :close-on-click-modal="false">
                  <el-form :model="assetTypeOther" label-width="80px" :rules="dataFormRules" ref="dataForm" :size="size">
                    <el-row>
                      <el-col span="8">
                        <el-form-item label="资产名称">
                          <el-input v-model="spouseAssetTypeOther.assetName" size="small" class="width180"></el-input>
                        </el-form-item>
                      </el-col>
                      <el-col span="8">
                        <el-form-item label="价值">
                          <el-input v-model="spouseAssetTypeOther.value" size="small" class="width180"></el-input>
                        </el-form-item>
                      </el-col>
                    </el-row>
                  </el-form>
                  <div slot="footer" class="dialog-footer">
                    <el-button :size="size" @click.native="addOtherAssetDialogVisible = false">{{$t('action.cancel')}}</el-button>
                    <el-button :size="size" type="primary" @click.native="assetTypeSpouseOtherForm" :loading="editLoading">{{$t('action.submit')}}</el-button>
                  </div>
                </el-dialog>
                <br><br>
              </div>
              <!--其他 end-->

            </div>
            <!--离异-->
            <div v-show="maritalStatusDivorcedFlag">
              <el-row>
                <el-col span="8">
                  <el-form-item label="原配偶姓名">
                    <el-input v-model="relatedPersonnelInformationForm.originalSpouseName" size="small" class="width180"></el-input>
                  </el-form-item>
                </el-col>
                <el-col span="8">
                  <el-form-item label="离婚时间">
                    <el-date-picker
                      v-model="relatedPersonnelInformationForm.divorceTime"
                      type="date"
                      placeholder="离婚时间">
                    </el-date-picker>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-form-item label="离婚方式">
                <el-radio-group v-model="relatedPersonnelInformationForm.divorceMethod">
                  <el-radio  v-for="(vl, index) in DivorceMethodOptions" :label="vl.VAL_CODE" :key="index">
                    {{vl.VAL_NAME}}
                  </el-radio>
                </el-radio-group>
              </el-form-item>

            </div>
            <!--丧偶-->
            <div v-show="maritalStatusWidowedFlag">
              <el-row>
                <el-col span="8">
                  <el-form-item label="原配偶姓名">
                    <el-input v-model="relatedPersonnelInformationForm.originalSpouseName" size="small" class="width180"></el-input>
                  </el-form-item>
                </el-col>
                <el-col span="8">
                  <el-form-item label="原配偶死亡时间">
                    <el-date-picker
                      v-model="relatedPersonnelInformationForm.divorceTime"
                      type="date"
                      placeholder="离婚时间">
                    </el-date-picker>
                  </el-form-item>
                </el-col>
              </el-row>
            </div>
            <!--其他-->
            <div v-show="maritalStatusOtherFlag">
              <el-form-item label="其他">
                <el-input v-model="relatedPersonnelInformationForm.originalSpouseName" size="small" class="width180"></el-input>
              </el-form-item>
            </div>

          </div>
          <!--婚姻状况 end-->

          <!--家庭收支情况 start-->
          <div>
            <hr>
            <el-row>
              <el-col span="8">
                <el-form-item label="家庭总资产">
                  <el-input v-model="householdIncomeForm.totalAssets" size="small" class="width150"></el-input>
                </el-form-item>
              </el-col>
              <el-col span="8">
                <el-form-item label="家庭年总收入">
                  <el-input v-model="householdIncomeForm.totalRevenue" size="small" class="width180"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col span="8">
                <el-form-item label="家庭年总支出">
                  <el-input v-model="householdIncomeForm.totalAnnualExpenditure" size="small" class="width150"></el-input>
                </el-form-item>
              </el-col>
              <el-col span="8">
                <el-form-item label="年债务性总支出">
                  <el-input v-model="householdIncomeForm.debtTotalExpenditure" size="small" class="width180"></el-input>
                </el-form-item>
              </el-col>
              <el-col span="8">
                <el-form-item label="家庭对外担保总额">
                  <el-input v-model="householdIncomeForm.foreignGuaranteeLumpSum" size="small" class="width150"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col span="8">
                <el-form-item label="家庭总负债">
                  <el-input v-model="householdIncomeForm.totalLiability" size="small" class="width180"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
          </div>
          <!--家庭收支情况 end-->
          <el-form-item>
            <el-button type="primary" @click="assetTypeOterPersonnelForm()">保存</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
    <!--3、抵押物-->
    <div v-if="active==3">
      <el-form :model="pawn" label-width="150px" :rules="dataFormRules" ref="pawn" :size="size">
        <div v-if="pawnListFlag">
          <el-button icon="fa fa-plus" type="primary" @click="addPawn">增加其他抵押物</el-button>
          <br>
          <el-table
            border
            :data="pawnTableData"
            style="width: 80%">
            <el-table-column
              fixed
              prop="mortgageTypes"
              label="抵押物类型"
              width="150">
            </el-table-column>
            <el-table-column
              prop="landNatures"
              label="土地性质"
              width="120">
            </el-table-column>
            <el-table-column
              prop="collateralName"
              label="抵押物名称"
              width="120">
            </el-table-column>
            <el-table-column
              prop="collateralDeposit"
              label="抵押物存放地"
              width="300">
            </el-table-column>
            <el-table-column
              prop="value"
              label="价值"
              width="120">
            </el-table-column>
            <el-table-column
              label="操作">
              <template slot-scope="scope">
                <el-button @click="removePawnAsset(scope.$index + 1)" type="text" size="small">删除</el-button>
              <!--  <el-button @click="handlePawnEdit(scope.row)" type="text" size="small">编辑</el-button>-->
              </template>
            </el-table-column>
          </el-table>
          <el-form-item>
            <el-button type="primary" @click="savePawnNextStep(4)">下一步</el-button>
          </el-form-item>
        </div>
        <div v-if="pawnAddFlag">
          <!--编辑-->
          <el-dialog title="相关房屋土地资产列表" width="100%" :visible.sync="referenceDialogVisible" :close-on-click-modal="false">
            <el-table
              border
              :data="referenceAssetList"
              style="width: 80%">
              <el-table-column
                fixed width="150">
                <template slot-scope="scope">
                  <el-radio class="radio" v-model="radioData"  :label="scope.row.id" @change="checkAll(scope.row)"></el-radio>
                </template>
              </el-table-column>
              <el-table-column
                fixed
                prop="assetType"
                label="资产类型"
                width="150">
              </el-table-column>
              <el-table-column
                fixed
                prop="assetType"
                label="资产名称"
                width="150">
              </el-table-column>
              <el-table-column
                prop="assetName"
                label="资产名称"
                width="120">
              </el-table-column>
              <el-table-column
                prop="name"
                label="资产归属"
                width="120">
              </el-table-column>
              <el-table-column
                prop="coowner"
                label="共有人"
                width="120">
              </el-table-column>
              <el-table-column
                prop="address"
                label="地址">
              </el-table-column>
            </el-table>
            <br>
            <div slot="footer" class="dialog-footer" style="text-align: center">
              <el-button :size="size" type="primary" @click.native="selectReference">选择</el-button>
              <el-button :size="size" type="primary" @click.native="referenceDialogClose">关闭</el-button>
            </div>
          </el-dialog>
          <el-form-item label="抵押物类型">
            <el-radio-group v-model="pawn.mortgageType" @change="mortgageTypeChange">
              <el-radio  v-for="(vl, index) in MortgageTypeOptions" :label="vl.VAL_CODE" :key="index">
                {{vl.VAL_NAME}}
              </el-radio>
            </el-radio-group>
            <el-button type="primary" @click="referenceDialog()">引用</el-button>
          </el-form-item>
          <el-form-item label="是否不动产权证" v-if="whetherOwnershipCertificatesFlag">
            <el-radio-group v-model="pawn.whetherOwnershipCertificates" @change="whetherOwnershipCertificatesPawnChange">
              <el-radio  v-for="(vl, index) in WhetherOwnershipCertificateseOptions" :label="vl.VAL_CODE" :key="index">
                {{vl.VAL_NAME}}
              </el-radio>
            </el-radio-group>
          </el-form-item>

          <el-form-item label="不动产权证号" v-show="propertyCertificateNumberFlag">
            <el-input v-model="pawn.propertyCertificateNumber" size="small" class="width180"></el-input>
          </el-form-item>

          <el-row >
            <el-col span="8">
              <el-form-item label="房产证号" v-show="deedNumberFlag">
                <el-input v-model="pawn.propertyCertificateNumber" size="small" class="width180"></el-input>
              </el-form-item>
              <el-form-item label="土地证号" v-show="deedLandCertificateFlag">
                <el-input v-model="pawn.landCertificateNumber" size="small" class="width180"></el-input>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row>
            <el-col span="8">
              <el-form-item label="房屋建筑面积" v-if="buildingAreaFlag">
                <el-input v-model="pawn.buildingArea" size="small" class="width180"></el-input>
              </el-form-item>
              <el-form-item label="土地占用面积" v-if="landOccupationAreaFlag">
                <el-input v-model="pawn.landOccupationArea" size="small" class="width180"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col span="8">
              <el-form-item label="抵押物名称">
                <el-input v-model="pawn.collateralName" size="small" class="width180"></el-input>
              </el-form-item>
            </el-col>
          </el-row>

          <el-form-item label="土地性质">
            <el-radio-group v-model="pawn.landNature">
              <el-radio  v-for="(vl, index) in LandNatureOptions" :label="vl.VAL_CODE" :key="index">
                {{vl.VAL_NAME}}
              </el-radio>
            </el-radio-group>
          </el-form-item>

          <el-form-item label="所属地">
            <el-radio-group v-model="pawn.affiliation">
              <el-radio  v-for="(vl, index) in AffiliationOptions" :label="vl.VAL_CODE" :key="index">
                {{vl.VAL_NAME}}
              </el-radio>
            </el-radio-group>
          </el-form-item>

          <el-row>
            <el-col span="8">
              <el-form-item label="抵押物存放地">
                <el-input v-model="pawn.collateralDeposit" size="small" class="width180"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col span="8">
              <el-form-item label="价值">
                <el-input v-model="pawn.value" size="small" class="width180"></el-input>
              </el-form-item>
            </el-col>
          </el-row>

          <el-form-item label="评估公司">
            <el-radio-group v-model="pawn.evaluationCorporation">
              <el-radio  v-for="(vl, index) in EvaluationCorporationOptions" :label="vl.VAL_CODE" :key="index">
                {{vl.VAL_NAME}}
              </el-radio>
            </el-radio-group>
          </el-form-item>

          <el-form-item label="融资情况">
            <el-radio-group v-model="pawn.financingSituation">
              <el-radio  v-for="(vl, index) in FinancingSituationOptions" :label="vl.VAL_CODE" :key="index">
                {{vl.VAL_NAME}}
              </el-radio>
            </el-radio-group>
          </el-form-item>

          <el-form-item label="是否有共有人">
            <el-radio-group v-model="pawn.whetherCoowner" @change="whetherCoownerChange">
              <el-radio  v-for="(vl, index) in WhetherCoownerOptions" :label="vl.VAL_CODE" :key="index">
                {{vl.VAL_NAME}}
              </el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="共有人姓名" v-show="coOwnerNameFlag">
            <el-input v-model="pawn.coownerName" size="small" class="width180"></el-input>
          </el-form-item>

          <el-form-item label="是否有租赁">
            <el-radio-group v-model="pawn.whetherLease" @change="whetherLeaseChange">
              <el-radio  v-for="(vl, index) in WhetherLeaseOptions" :label="vl.VAL_CODE" :key="index">
                {{vl.VAL_NAME}}
              </el-radio>
            </el-radio-group>
          </el-form-item>
          <div v-if="whetherLeaseFlag">
            <el-row>
              <el-col span="8">
                <el-form-item label="租赁合同名称">
                  <el-input v-model="pawn.leaseContractName" size="small" class="width180"></el-input>
                </el-form-item>
              </el-col>
              <el-col span="8">
                <el-form-item label="承租方姓名">
                  <el-input v-model="pawn.lesseeName" size="small" class="width180"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col span="8">
                <el-form-item label="承租期限(开始)">
                  <el-date-picker
                    v-model="pawn.leaseTermStartTime"
                    type="date"
                    placeholder="承租期限(开始)">
                  </el-date-picker>
                </el-form-item>
              </el-col>
              <el-col span="8">
                <el-form-item label="承租期限(结束)">
                  <el-date-picker
                    v-model="pawn.leaseTermEndTime"
                    type="date"
                    placeholder="承租期限(结束)">
                  </el-date-picker>
                </el-form-item>
              </el-col>
            </el-row>
            <el-form-item label="租金支付方式">
              <el-radio-group v-model="pawn.rentPaymentMethod">
                <el-radio  v-for="(vl, index) in RentPaymentMethodOptions" :label="vl.VAL_CODE" :key="index">
                  {{vl.VAL_NAME}}
                </el-radio>
              </el-radio-group>
            </el-form-item>
            <el-row>
              <el-col span="8">
                <el-form-item label="租金/月">
                  <el-input v-model="pawn.rent" size="small" class="width180"></el-input>
                </el-form-item>
              </el-col>
              <el-col span="8">
                <el-form-item label="合同签署时间">
                  <el-date-picker
                    v-model="pawn.contractSigningTime"
                    type="date"
                    placeholder="合同签署时间">
                  </el-date-picker>
                  <!-- <el-input v-model="pawn.contractSigningTime" size="small" class="width180"></el-input>-->
                </el-form-item>
              </el-col>
            </el-row>
          </div>
          <el-form-item label="所属名下">
            <el-input v-model="pawn.groups" size="small" class="width180"></el-input>
            <el-button :size="size" @click.native="selectAssets">选择</el-button>
          </el-form-item>
          <br>
          <div slot="footer" class="dialog-footer">
            <el-button :size="size" type="primary" @click.native="assetTypePawnForm" :loading="editLoading">保存</el-button>
          </div>
        </div>
        <el-dialog title="相关人员列表" width="50%" :visible.sync="addPawnDialogVisible" :close-on-click-modal="false">
          <el-table
            border
            :data="assetsTableData"
            @selection-change="handleSelectionChange"
            style="width: 100%">
            <el-table-column
              type="selection"
              width="55">
            </el-table-column>
            <el-table-column
              fixed
              prop="name"
              label="姓名"
              width="150">
            </el-table-column>
            <el-table-column
              prop="borrowerRelationship"
              label="与借款人关系"
              width="120">
            </el-table-column>
            <el-table-column
              prop="sexName"
              label="性别"
              width="120">
            </el-table-column>
            <el-table-column
              prop="spouse"
              label="配偶"
              width="100">
            </el-table-column>
          </el-table>
          <el-form-item>
            <el-button type="primary" @click="selectSubmit()">选择</el-button>
            <el-button type="primary" @click="closeAddPawnDialogVisible">关闭</el-button>
          </el-form-item>
        </el-dialog>
        <!--编辑-->
        <el-dialog title="相关人员编辑" width="60%" :visible.sync="addPawnEditDialogVisible" :close-on-click-modal="false">
          <el-form-item label="抵押物类型">
            <el-radio-group v-model="pawn.mortgageType" @change="mortgageTypeChange">
              <el-radio  v-for="(vl, index) in MortgageTypeOptions" :label="vl.VAL_CODE" :key="index">
                {{vl.VAL_NAME}}
              </el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="是否不动产权证" v-if="whetherOwnershipCertificatesFlag">
            <el-radio-group v-model="pawn.whetherOwnershipCertificates" @change="whetherOwnershipCertificatesPawnChange">
              <el-radio  v-for="(vl, index) in WhetherOwnershipCertificateseOptions" :label="vl.VAL_CODE" :key="index">
                {{vl.VAL_NAME}}
              </el-radio>
            </el-radio-group>
          </el-form-item>

          <el-form-item label="不动产权证号" v-show="propertyCertificateNumberFlag">
            <el-input v-model="pawn.propertyCertificateNumber" size="small" class="width180"></el-input>
          </el-form-item>

          <el-row v-show="deedLandCertificateFlag">
            <el-col span="8">
              <el-form-item label="土地证号">
                <el-input v-model="pawn.landCertificateNumber" size="small" class="width180"></el-input>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row>
            <el-col span="8">
              <el-form-item label="房屋建筑面积" v-if="buildingAreaFlag">
                <el-input v-model="pawn.buildingArea" size="small" class="width180"></el-input>
              </el-form-item>
              <el-form-item label="土地占用面积" v-if="landOccupationAreaFlag">
                <el-input v-model="pawn.landOccupationArea" size="small" class="width180"></el-input>
              </el-form-item>
            </el-col>
            <el-col span="8">
              <el-form-item label="抵押物名称">
                <el-input v-model="pawn.collateralName" size="small" class="width180"></el-input>
              </el-form-item>
            </el-col>
          </el-row>

          <el-form-item label="土地性质">
            <el-radio-group v-model="pawn.landNature">
              <el-radio  v-for="(vl, index) in LandNatureOptions" :label="vl.VAL_CODE" :key="index">
                {{vl.VAL_NAME}}
              </el-radio>
            </el-radio-group>
          </el-form-item>

          <el-form-item label="所属地">
            <el-radio-group v-model="pawn.affiliation">
              <el-radio  v-for="(vl, index) in AffiliationOptions" :label="vl.VAL_CODE" :key="index">
                {{vl.VAL_NAME}}
              </el-radio>
            </el-radio-group>
          </el-form-item>

          <el-row>
            <el-col span="8">
              <el-form-item label="抵押物存放地">
                <el-input v-model="pawn.collateralDeposit" size="small" class="width180"></el-input>
              </el-form-item>
            </el-col>
            <el-col span="8">
              <el-form-item label="价值">
                <el-input v-model="pawn.value" size="small" class="width180"></el-input>
              </el-form-item>
            </el-col>
          </el-row>

          <el-form-item label="评估公司">
            <el-radio-group v-model="pawn.evaluationCorporation">
              <el-radio  v-for="(vl, index) in EvaluationCorporationOptions" :label="vl.VAL_CODE" :key="index">
                {{vl.VAL_NAME}}
              </el-radio>
            </el-radio-group>
          </el-form-item>

          <el-form-item label="融资情况">
            <el-radio-group v-model="pawn.financingSituation">
              <el-radio  v-for="(vl, index) in FinancingSituationOptions" :label="vl.VAL_CODE" :key="index">
                {{vl.VAL_NAME}}
              </el-radio>
            </el-radio-group>
          </el-form-item>

          <el-form-item label="是否有共有人">
            <el-radio-group v-model="pawn.whetherCoowner" @change="whetherCoownerChange">
              <el-radio  v-for="(vl, index) in WhetherCoownerOptions" :label="vl.VAL_CODE" :key="index">
                {{vl.VAL_NAME}}
              </el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="共有人姓名" v-show="coOwnerNameFlag">
            <el-input v-model="pawn.coownerName" size="small" class="width180"></el-input>
          </el-form-item>

          <el-form-item label="是否有租赁">
            <el-radio-group v-model="pawn.whetherLease" @change="whetherLeaseChange">
              <el-radio  v-for="(vl, index) in WhetherLeaseOptions" :label="vl.VAL_CODE" :key="index">
                {{vl.VAL_NAME}}
              </el-radio>
            </el-radio-group>
          </el-form-item>
          <div v-if="whetherLeaseFlag">
            <el-row>
              <el-col span="8">
                <el-form-item label="租赁合同名称">
                  <el-input v-model="pawn.leaseContractName" size="small" class="width180"></el-input>
                </el-form-item>
              </el-col>
              <el-col span="8">
                <el-form-item label="承租方姓名">
                  <el-input v-model="pawn.lesseeName" size="small" class="width180"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col span="8">
                <el-form-item label="承租期限(开始)">
                  <el-input v-model="pawn.leaseTermStartTime" size="small" class="width180"></el-input>
                </el-form-item>
              </el-col>
              <el-col span="8">
                <el-form-item label="承租期限(结束)">
                  <el-input v-model="pawn.leaseTermEndTime" size="small" class="width180"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-form-item label="租金支付方式">
              <el-radio-group v-model="pawn.rentPaymentMethod">
                <el-radio  v-for="(vl, index) in RentPaymentMethodOptions" :label="vl.VAL_CODE" :key="index">
                  {{vl.VAL_NAME}}
                </el-radio>
              </el-radio-group>
            </el-form-item>
            <el-row>
              <el-col span="8">
                <el-form-item label="租金/月">
                  <el-input v-model="pawn.rent" size="small" class="width180"></el-input>
                </el-form-item>
              </el-col>
              <el-col span="8">
                <el-form-item label="合同签署时间">
                  <el-input v-model="pawn.contractSigningTime" size="small" class="width180"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
          </div>
          <el-form-item label="所属名下">
            <el-input v-model="pawn.groups" size="small" class="width180"></el-input>
            <el-button :size="size" @click.native="selectAssets">选择</el-button>
          </el-form-item>
          <br>
          <div slot="footer" class="dialog-footer">
            <el-button :size="size" type="primary" @click.native="assetTypePawnFormEdit" :loading="editLoading">{{$t('action.submit')}}</el-button>
          </div>
        </el-dialog>

        <br><br>
      </el-form>
    </div>
    <!--4、其他相关贷款业务信息-->
    <div v-if="active==4">
      <el-form :model="loanBusinessInformation" label-width="150px" :rules="dataFormRules" ref="loanBusinessInformation" :size="size">
        <el-row>
          <el-col span="8">
            <el-form-item label="借款人账号" class="item">
              <el-input v-model="loanBusinessInformation.borrowerAccount" size="small" class="width150"></el-input>
            </el-form-item>
          </el-col>
          <el-col span="8">
            <el-form-item label="客户号">
              <el-input v-model="loanBusinessInformation.clientNumber" size="small" class="width150"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-button icon="fa fa-plus" type="primary" @click="addCounterparty">增加交易对手信息</el-button>
        <br>
        <el-table
          border
          :data="counterpartyTableData"
          style="width: 80%">
          <el-table-column
            fixed
            prop="name"
            label="交易对手名称"
            width="150">
          </el-table-column>
          <el-table-column
            prop="accountNumber"
            label="交易对手账号"
            width="120">
          </el-table-column>
          <el-table-column
            prop="bank"
            label="开户行"
            width="120">
          </el-table-column>
          <el-table-column
            prop="amount"
            label="交易金额"
            width="300">
          </el-table-column>
          <el-table-column
            label="操作">
            <template slot-scope="scope">
              <el-button @click="removeCounterpartyAsset(scope.$index + 1)" type="text" size="small">删除</el-button>
              <!-- <el-button @click="handleCounterpartyEdit(scope.row.counterpartyInformation)" type="text" size="small">编辑</el-button>-->
            </template>
          </el-table-column>
        </el-table>
        <el-dialog title="新增交易对手" width="60%" :visible.sync="addCounterpartyDialogVisible" :close-on-click-modal="false">
          <el-form-item label="交易对手名称">
            <el-input v-model="counterpartyInformation.name" size="small" class="width180"></el-input>
          </el-form-item>
          <el-form-item label="交易对手账号">
            <el-input v-model="counterpartyInformation.accountNumber" size="small" class="width180"></el-input>
          </el-form-item>
          <el-form-item label="开户行">
            <el-input v-model="counterpartyInformation.bank" size="small" class="width180"></el-input>
          </el-form-item>
          <el-form-item label="交易金额">
            <el-input v-model="counterpartyInformation.amount" size="small" class="width180"></el-input>
          </el-form-item>
          <br>
          <div slot="footer" class="dialog-footer">
            <el-button :size="size" type="primary" @click.native="counterpartyFormSave" :loading="editLoading">{{$t('action.submit')}}</el-button>
          </div>
        </el-dialog>
        <br>
        <div>
          <hr>
          <el-form :model="loanBusinessInformation" label-width="150px" :rules="dataFormRules" ref="loanBusinessInformation" :size="size">
            <el-row>
              <el-col span="8">
                <el-form-item label="申请金额">
                  <el-input v-model="loanBusinessInformation.applicationAmount" size="small" class="width150"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col span="8">
                <el-form-item label="申请期限">
                  <el-input v-model="loanBusinessInformation.applicationPeriod" size="small" class="width180"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-form-item label="是否申请循环额度">
              <el-radio-group v-model="loanBusinessInformation.cycleQuota">
                <el-radio  v-for="(vl, index) in CycleQuotaOptions" :label="vl.VAL_CODE" :key="index">
                  {{vl.VAL_NAME}}
                </el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item label="利率">
              <el-radio-group v-model="loanBusinessInformation.interestRate" @change="interestRateChange">
                <el-radio  v-for="(vl, index) in InterestRateOptions" :label="vl.VAL_CODE" :key="index">
                  {{vl.VAL_NAME}}
                </el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item label="利率调整方式" v-if="interestRateFlag">
              <el-radio-group v-model="loanBusinessInformation.adjustmentMethod">
                <el-radio  v-for="(vl, index) in AdjustmentMethodOptions" :label="vl.VAL_CODE" :key="index">
                  {{vl.VAL_NAME}}
                </el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item label="利率上浮幅度">
              <el-input v-model="loanBusinessInformation.interestRateRise" size="small" class="width150"></el-input>
            </el-form-item>
            <el-row>
              <el-col span="8">
                <el-form-item label="申请利率">
                  <el-input v-model="loanBusinessInformation.applicationRate" size="small" class="width180"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col span="8">
                <el-form-item label="保证金比例">
                  <el-input v-model="loanBusinessInformation.marginRatio" size="small" class="width180"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col span="8">
                <el-form-item label="原信贷业务余额">
                  <el-input v-model="loanBusinessInformation.originalCreditBalance" size="small" class="width180"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-form-item label="用途">
              <el-radio-group v-model="loanBusinessInformation.useInfo">
                <el-radio  v-for="(vl, index) in UseOptions" :label="vl.VAL_CODE" :key="index">
                  {{vl.VAL_NAME}}
                </el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item label="用途具体说明">
              <el-input type="textarea" v-model="loanBusinessInformation.description"></el-input>
            </el-form-item>
            <el-form-item label="还款方式">
              <el-radio-group v-model="loanBusinessInformation.repayment" @change="repaymentChange">
                <el-radio  v-for="(vl, index) in RepaymentOptions" :label="vl.VAL_CODE" :key="index">
                  {{vl.VAL_NAME}}
                </el-radio>
              </el-radio-group>
              <el-input v-if="repaymentOtherFlag" v-model="loanBusinessInformation.value" size="small" class="width180"></el-input>
            </el-form-item>
            <el-row>
              <el-col span="8">
                <el-form-item label="扣款账户户名">
                  <el-input v-model="loanBusinessInformation.debitAccountName" size="small" class="width180"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col span="8">
                <el-form-item label="扣款账号">
                  <el-input v-model="loanBusinessInformation.accountNumber" size="small" class="width180"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-form-item label="还款期数" v-if="repaymentFlag">
              <el-input v-model="loanBusinessInformation.repaymentPeriod" size="small" class="width180"></el-input>
            </el-form-item>
            <el-row v-if="repaymentPeriodFlag">
              <el-col span="8">
                <el-form-item label="还款计划">
                  <el-input v-model="repaymentPlan.repaymentTime" size="small" class="width180"></el-input>
                </el-form-item>
              </el-col>
              <el-col span="8">
                <el-form-item label="偿还贷款本金">
                  <el-input v-model="repaymentPlan.amount" size="small" class="width180"></el-input>
                </el-form-item>
              </el-col>
            </el-row>


            <el-form-item label="是否个人购房贷款">
              <el-radio-group v-model="loanBusinessInformation.whetherPersonalHomeLoan">
                <el-radio  v-for="(vl, index) in WhetherPersonalHomeLoanOptions" :label="vl.VAL_CODE" :key="index">
                  {{vl.VAL_NAME}}
                </el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item label="是否公积金组合贷款">
              <el-radio-group v-model="loanBusinessInformation.whetherProvidentFundCombinationLoan" @change="whetherProvidentFundCombinationLoanChange">
                <el-radio  v-for="(vl, index) in WhetherProvidentFundCombinationLoanOptions" :label="vl.VAL_CODE" :key="index">
                  {{vl.VAL_NAME}}
                </el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item label="其中公积金贷款金额" v-if="whetherProvidentFundCombinationLoanFlag">
              <el-input v-model="loanBusinessInformation.providentFundLoanAmount" size="small" class="width180"></el-input>
            </el-form-item>
            <el-form-item label="是否独家信贷客户">
              <el-radio-group v-model="loanBusinessInformation.whetherExclusiveCreditClient" @change="whetherExclusiveCreditClientChange">
                <el-radio  v-for="(vl, index) in WhetherExclusiveCreditClientOptions" :label="vl.VAL_CODE" :key="index">
                  {{vl.VAL_NAME}}
                </el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item label="开立基本存款账户" v-if="whetherExclusiveCreditClientFlagFlag">
              <el-date-picker
                v-model="loanBusinessInformation.depositAccount"
                type="date"
                placeholder="必须于xx前在我行开立基本存款账户">
              </el-date-picker>
            </el-form-item>
            <el-form-item label="开立一般存款账户" v-if="whetherExclusiveCreditClientNoFlag">
              <el-date-picker
                v-model="loanBusinessInformation.depositAccount"
                type="date"
                placeholder="必须于xx前在我行开立一般存款账户">
              </el-date-picker>
            </el-form-item>
          </el-form>
        </div>
        <br>
        <el-form-item>
          <el-button type="primary" @click="loanBusinessNextStep(6)">下一步</el-button>
        </el-form-item>
      </el-form>
    </div>
    <!--6、个人贷款调查报告表-->
    <div v-if="active==6">
      <el-form :model="personalLoanSurveyReport" label-width="250px" :rules="dataFormRules" ref="personalLoanSurveyReport" :size="size">
        <el-form-item label="借款人健康状况">
          <el-radio-group v-model="personalLoanSurveyReport.borrowerHealthStatus">
            <el-radio  v-for="(vl, index) in BorrowerHealthStatusOptions" :label="vl.VAL_CODE" :key="index">
              {{vl.VAL_NAME}}
            </el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="其他需调查反映的情况">
          <el-input type="textarea" v-model="personalLoanSurveyReport.otherSurveyHappening"></el-input>
        </el-form-item>

        <el-form-item label="借款人是否具有完全民事行为能力">
          <el-radio-group v-model="personalLoanSurveyReport.borrowerWhetherHaveCivilAction">
            <el-radio  v-for="(vl, index) in HorrowerWhetherHaveCivilActionOptions" :label="vl.VAL_CODE" :key="index">
              {{vl.VAL_NAME}}
            </el-radio>
          </el-radio-group>
        </el-form-item>

        <el-form-item label="申贷金额">
          <el-input v-model="personalLoanSurveyReport.amountLoan" size="small" class="width180"></el-input>
        </el-form-item>

        <el-form-item label="自筹资金">
          <el-input v-model="personalLoanSurveyReport.selfFunding" size="small" class="width180"></el-input>
        </el-form-item>

        <el-form-item label="借款期限">
          <el-input v-model="personalLoanSurveyReport.borrowingPeriod" size="small" class="width180"></el-input>
        </el-form-item>

        <el-form-item label="申贷金额是否合理">
          <el-radio-group v-model="personalLoanSurveyReport.loanAmountWhetherReasonable">
            <el-radio  v-for="(vl, index) in LoanAmountWhetherReasonableOptions" :label="vl.VAL_CODE" :key="index">
              {{vl.VAL_NAME}}
            </el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="申贷期限是否合理">
          <el-radio-group v-model="personalLoanSurveyReport.loanTermWhetherReasonable">
            <el-radio  v-for="(vl, index) in LoanTermWhetherReasonableOptions" :label="vl.VAL_CODE" :key="index">
              {{vl.VAL_NAME}}
            </el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="借款用途">
          <el-input v-model="personalLoanSurveyReport.useLoan" size="small" class="width180"></el-input>
        </el-form-item>
        <el-form-item label="第一还款来源是否充足">
          <el-radio-group v-model="personalLoanSurveyReport.repaymentSourceWhetherSufficient">
            <el-radio  v-for="(vl, index) in RepaymentSourceWhetherSufficientOptions" :label="vl.VAL_CODE" :key="index">
              {{vl.VAL_NAME}}
            </el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="借款人偿还能力测算（公式）">
          <el-input type="textarea" v-model="personalLoanSurveyReport.borrowerRepayAbilityEstimate"></el-input>
        </el-form-item>
        <el-form-item label="贷款偿还能力是否与申请贷款额度相符">
          <el-radio-group v-model="personalLoanSurveyReport.whetherAmountMatch">
            <el-radio  v-for="(vl, index) in WhetherAmountAatchOptions" :label="vl.VAL_CODE" :key="index">
              {{vl.VAL_NAME}}
            </el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="有无债务诉讼">
          <el-radio-group v-model="personalLoanSurveyReport.withoutDebtLitigation">
            <el-radio  v-for="(vl, index) in WithoutDebtLitigationOptions" :label="vl.VAL_CODE" :key="index">
              {{vl.VAL_NAME}}
            </el-radio>
          </el-radio-group>
        </el-form-item>
        <br>
        <br>
        <el-form-item>
          <el-button type="primary" @click="personalLoanSurveyReportNextStep(7)">下一步</el-button>
        </el-form-item>
      </el-form>
    </div>
    <!--7、合同信息-->
    <div v-if="active==7">
      <el-form :model="contractInformation" label-width="150px" :rules="dataFormRules" ref="contractInformation" :size="size">
        <el-form-item label="个人借款合同编号">
          <el-input v-model="contractInformation.personalLoanContractNo" size="small" class="width150"></el-input>
        </el-form-item>

        <el-form-item label="抵押担保合同编号">
          <el-input v-model="contractInformation.mortgageGuaranteeContractNo" size="small" class="width180"></el-input>
        </el-form-item>

        <el-form-item label="保证担保合同编号">
          <el-input v-model="contractInformation.guaranteeGuaranteeContractNo" size="small" class="width150"></el-input>
        </el-form-item>


        <el-form-item label="合同签订日">
          <el-date-picker
            v-model="contractInformation.contractSigningDate"
            type="date"
            placeholder="合同签订日">
          </el-date-picker>
        </el-form-item>


        <el-form-item label="借款期限">
          <el-date-picker
            v-model="contractInformation.borrowingStartPeriod"
            type="date"
            placeholder="开始日期">
          </el-date-picker>
          到
          <el-date-picker
            v-model="contractInformation.borrowingEndPeriod"
            type="date"
            placeholder="截至日期">
          </el-date-picker>
        </el-form-item>

        <el-form-item label="放款日期">
          <el-date-picker
            v-model="contractInformation.loanDate"
            type="date"
            placeholder="放款日期">
          </el-date-picker>
        </el-form-item>

        <br>
        <el-form-item>
          <el-button type="primary" @click="contractInformationNextStep(5)">保存</el-button>
        </el-form-item>

      </el-form>
    </div>

  </div>
</template>

<script>
  import KtTable from "@/views/Core/KtTable"
  import KtButton from "@/views/Core/KtButton"
  import { format } from "@/utils/datetime"
  import { getIFrameUrl, getIFramePath } from '@/utils/iframe'
  import api from '@/http/api'
  export default {
    components:{
      KtTable,
      KtButton
    },
    data() {
      return {
        //基础信息验证
        loanBasisFormRules:{
          borrower: [
            { required: true, message: '请输入借款人姓名', trigger: 'blur' }
          ],
          loanType: [
            { required: true, message: '请选择贷款类型', trigger: 'change' }
          ]
        },
        add2Rules:{
          name: [
            { required: true, message: '请输入姓名', trigger: 'blur' }
          ],
          identityNumber: [
            { required: true, message: '请输入身份证号', trigger: 'blur' }
          ],
          maritalStatus: [
            { required: true, message: '请选择婚姻状况', trigger: 'change' }
          ],
          age: [
            { type: 'number',required:false, message: '年龄必须为数字值'}
          ]
        },

        add3Rules:{
          maritalStatus: [
            { type: 'array',required: true, message: '请选择与借款人关系！', trigger: 'change' }
          ],
          name: [
            { required: true, message: '请输入姓名！', trigger: 'blur' }
          ],
          identityNumber: [
            { required: true, message: '请输入身份证号！', trigger: 'blur' }
          ],
          maritalStatus: [
            { required: true, message: '请选择婚姻状况！', trigger: 'change' }
          ]
        },
        //房屋资产弹窗标记
        referenceDialogVisible:false,
        //房屋土地资产列表
        referenceAssetList:[],
        //合同信息
        contractInformation:{
          id:'',
          personalLoanContractNo:'',
          mortgageGuaranteeContractNo:'',
          pawnContractNo:'',
          guaranteeGuaranteeContractNo:'',
          contractSigningDate:'',
          borrowingStartPeriod:'',
          borrowingEndPeriod:'',
          loanDate:'',
          loanBasisId:'',
          lastUpdateBy:sessionStorage.getItem("user")
        },
        //配偶姓名
        maritalStatusFlag:false,
        //个人借款报告
        personalLoanSurveyReport:{
          borrowerName:'',
          maritalStatus:'',
          spouseName:'',
          whetherLocalHouseholdRegistration:'',
          totalProperty:'',
          totalArea:'',
          totalRalue:'',
          totalPropertyRemark:'',
          familyAssets:'',
          householdDebt:'',
          annualHouseholdIncome:'',
          familyExpense:'',
          borrowerHealthStatus:'',
          otherSurveyHappening:'',
          borrowerWhetherHaveCivilAction:'',
          amountLoan:'',
          selfFunding:'',
          borrowingPeriod:'',
          loanAmountWhetherReasonable:'',
          loanTermWhetherReasonable:'',
          useLoan:'',
          repaymentSourceWhetherSufficient:'',
          borrowerRepayAbilityEstimate:'',
          whetherAmountMatch:'',
          withoutDebtLitigation:'',
          loanAethodGuarantee:'',
          loanMethodGuaranteeRemark:'',
          calculated:'',
          loanMethodPledgeGuarantee:'',
          loanMethodPledgeGuaranteeRemark:''
        },
        loanAethodGuaranteeCheckbox:'',
        loanMethodPledgeGuaranteeCheckbox:'',
        //婚姻状况
        PersonalLoanSurveyMaritalOptions:[{
          VAL_CODE: '0',
          VAL_NAME: '未婚',
        },{
          VAL_CODE: '1',
          VAL_NAME: '已婚',
        }],
        //是否本地户籍
        WhetherLocalHouseholdRegistrationOptions:[{
          VAL_CODE: '0',
          VAL_NAME: '否',
        },{
          VAL_CODE: '1',
          VAL_NAME: '是',
        }],
        //借款人健康状况
        BorrowerHealthStatusOptions:[{
          VAL_CODE: '1',
          VAL_NAME: '较差',
        },{
          VAL_CODE: '2',
          VAL_NAME: '一般',
        },{
          VAL_CODE: '3',
          VAL_NAME: '健康',
        }],
        //借款人是否具有完全民事行为能力
        HorrowerWhetherHaveCivilActionOptions:[{
          VAL_CODE: '0',
          VAL_NAME: '否',
        },{
          VAL_CODE: '1',
          VAL_NAME: '是',
        }],
        //申贷金额是否合理
        LoanAmountWhetherReasonableOptions:[{
          VAL_CODE: '0',
          VAL_NAME: '否',
        },{
          VAL_CODE: '1',
          VAL_NAME: '是',
        }],
        //申贷期限是否合理
        LoanTermWhetherReasonableOptions:[{
          VAL_CODE: '0',
          VAL_NAME: '否',
        },{
          VAL_CODE: '1',
          VAL_NAME: '是',
        }],
        //第一还款来源是否充足
        RepaymentSourceWhetherSufficientOptions:[{
          VAL_CODE: '0',
          VAL_NAME: '否',
        },{
          VAL_CODE: '1',
          VAL_NAME: '是',
        }],
        //贷款偿还能力是否与申请贷款额度相符
        WhetherAmountAatchOptions:[{
          VAL_CODE: '0',
          VAL_NAME: '否',
        },{
          VAL_CODE: '1',
          VAL_NAME: '是',
        }],
        //有无债务诉讼
        WithoutDebtLitigationOptions:[{
          VAL_CODE: '0',
          VAL_NAME: '无',
        },{
          VAL_CODE: '1',
          VAL_NAME: '有',
        }],
        //经测算，该保证人是否具有担保能力
        CalculatedOptions:[{
          VAL_CODE: '0',
          VAL_NAME: '否',
        },{
          VAL_CODE: '1',
          VAL_NAME: '是',
        }],
        //还款计划list
        repaymentPlanList:[],
        //还款计划 其他
        repaymentOtherFlag:false,
        //还款计划
        repaymentPeriodFlag:false,
        //其中公积金贷款金额
        whetherProvidentFundCombinationLoanFlag :false,
        //借款人是否为我行独家信贷客户
        whetherExclusiveCreditClientFlagFlag :false,
        //借款人是否为我行独家信贷客户 一般
        whetherExclusiveCreditClientNoFlag :false,
        //交易对手弹窗
        addCounterpartyDialogVisible:false,
        ///交易对手弹窗标题
        operationCounterparty:false,
        counterpartyTableData:[],
        //还款计划
        repaymentFlag:false,
        //还款计划
        repaymentPlan:{
          repaymentTime:'',
          amount:''
        },
        //交易对手信息
        counterpartyInformation:{
          loanNusinessInformationId:'',
          name:'',
          accountNumber:'',
          bank:'',
          amount:''
        },
        //贷款业务信息
        loanBusinessInformation:{
          id:'',
          loanBasisId:'',
          borrowerAccount:'',
          clientNumber:'',
          applicationAmount:'',
          applicationPeriod:'',
          cycleQuota:'',
          interestRate:'',
          adjustmentMethod:'',
          interestRateRise:'',
          applicationRate:'',
          marginRatio:'',
          originalCreditBalance:'',
          useInfo:'',
          description:'',
          repayment:'',
          value:'',
          debitAccountName:'',
          accountNumber:'',
          repaymentPeriod:'',
          whetherPersonalHomeLoan:'',
          whetherProvidentFundCombinationLoan:'',
          providentFundLoanAmount:'',
          whetherExclusiveCreditClient:'',
          depositAccount:'',
          counterpartyInformation:[],
          repaymentPlan:[],
          lastUpdateBy:sessionStorage.getItem("user"),
        },
        //是否申请循环额度
        CycleQuotaOptions:[{
          VAL_CODE: '0',
          VAL_NAME: '否',
        },{
          VAL_CODE: '1',
          VAL_NAME: '是',
        }],
        //利率
        InterestRateOptions:[{
          VAL_CODE: '1',
          VAL_NAME: '浮动利率',
        },{
          VAL_CODE: '2',
          VAL_NAME: '固定利率',
        }],
        //利率调整方式
        AdjustmentMethodOptions:[{
          VAL_CODE: '1',
          VAL_NAME: '立即生效 ',
        },{
          VAL_CODE: '2',
          VAL_NAME: '次年一月一日起生效',
        },{
          VAL_CODE: '3',
          VAL_NAME: '对月对日生效',
        }],
        //利率调整方式
        UseOptions:[{
          VAL_CODE: '1',
          VAL_NAME: '经营 ',
        },{
          VAL_CODE: '2',
          VAL_NAME: '自建房',
        },{
          VAL_CODE: '3',
          VAL_NAME: '购房',
        },{
          VAL_CODE: '4',
          VAL_NAME: '购车',
        },{
          VAL_CODE: '5',
          VAL_NAME: '住房装修',
        },{
          VAL_CODE: '6',
          VAL_NAME: '购买大额耐用消费品',
        },{
          VAL_CODE: '7',
          VAL_NAME: '旅游消费',
        },{
          VAL_CODE: '8',
          VAL_NAME: '留学',
        },{
          VAL_CODE: '9',
          VAL_NAME: '子女教育',
        },{
          VAL_CODE: '10',
          VAL_NAME: '其他',
        }],
        //还款方式
        RepaymentOptions:[{
          VAL_CODE: '1',
          VAL_NAME: '利随本清',
        },{
          VAL_CODE: '2',
          VAL_NAME: '按月结息，到期一次性还本',
        },{
          VAL_CODE: '3',
          VAL_NAME: '按月结息，分期还本',
        },{
          VAL_CODE: '4',
          VAL_NAME: '按季结息，分期还本',
        },{
          VAL_CODE: '5',
          VAL_NAME: '等额本金',
        },{
          VAL_CODE: '6',
          VAL_NAME: '等额本息',
        },{
          VAL_CODE: '7',
          VAL_NAME: '其他',
        }],
        //是否申请个人购房贷款
        WhetherPersonalHomeLoanOptions:[{
          VAL_CODE: '0',
          VAL_NAME: '否',
        },{
          VAL_CODE: '1',
          VAL_NAME: '是',
        }],
        //是否公积金组合贷款
        WhetherProvidentFundCombinationLoanOptions:[{
          VAL_CODE: '0',
          VAL_NAME: '否',
        },{
          VAL_CODE: '1',
          VAL_NAME: '是',
        }],
        //借款人是否为我行独家信贷客户
        WhetherExclusiveCreditClientOptions:[{
          VAL_CODE: '0',
          VAL_NAME: '否',
        },{
          VAL_CODE: '1',
          VAL_NAME: '是',
        }],

        //抵押物弹窗编辑
        addPawnEditDialogVisible:false,
        //选中相关人员数据
        multipleSelection: [],
        //相关人员列表
        assetsTableData:[],
        //抵押物list
        pawnTableData:[],
        //抵押物列表标记
        pawnListFlag:true,
        //抵押物添加
        pawnAddFlag:false,
        //是否租赁
        whetherLeaseFlag:false,
        //抵押物
        addPawnDialogVisible:false,
        operationPawn:false,
        //抵押物对象
        pawn:{
          loanBasisId:'',
          mortgageType:'',
          whetherOwnershipCertificates:'',
          propertyCertificateNumber:'',
          landCertificateNumber:'',
          buildingArea:'',
          collateralName:'',
          landNature:'',
          affiliation:'',
          collateralDeposit:'',
          value:'',
          evaluationCorporation:'',
          financingSituation:'',
          whetherCoowner:'',
          coOwnerName:'',
          whetherLease:'',
          leaseContractName:'',
          lesseeName:'',
          leaseTermStartTime:'',
          leaseTermEndTime:'',
          rentPaymentMethod:'',
          rent:'',
          contractSigningTime:'',
          groups:'',
          pawnPersonnelMapping:[],
          landOccupationArea:'',
        },
        buildingAreaFlag:false,
        landOccupationAreaFlag:false,
        //抵押物类型
        MortgageTypeOptions:[{
          VAL_CODE: '0',
          VAL_NAME: '房屋',
        },{
          VAL_CODE: '1',
          VAL_NAME: '土地',
        }],
        //是否不动产权证
        WhetherOwnershipCertificateseOptions:[{
          VAL_CODE: '0',
          VAL_NAME: '不动产权证',
        },{
          VAL_CODE: '1',
          VAL_NAME: '非不动产权证',
        }],
        //是否不动产权证
        LandNatureOptions:[{
          VAL_CODE: '1',
          VAL_NAME: '出让',
        },{
          VAL_CODE: '2',
          VAL_NAME: '划拨',
        }],
        //评估公司
        EvaluationCorporationOptions:[],
        //房产评估公司
        HousEvaluationCorporationOptions:[{
          VAL_CODE: '广西方中利和房地产评估事务所',
          VAL_NAME: '广西方中利和房地产评估事务所',
        },{
          VAL_CODE: '广西景林房地产评估有限责任公司',
          VAL_NAME: '广西景林房地产评估有限责任公司',
        },{
          VAL_CODE: '广西中实房地产评估顾问有限公司',
          VAL_NAME: '广西中实房地产评估顾问有限公司',
        },{
          VAL_CODE: '广西中银信通房地产评估有限公司',
          VAL_NAME: '广西中银信通房地产评估有限公司',
        }],
        //土地评估公司
        LandEvaluationCorporationOptions:[{
          VAL_CODE: '广西方中土地评估有限公司',
          VAL_NAME: '广西方中土地评估有限公司',
        },{
          VAL_CODE: '广西中实土地评估有限公司',
          VAL_NAME: '广西中实土地评估有限公司',
        }],
        //融资情况
        FinancingSituationOptions:[{
          VAL_CODE: '0',
          VAL_NAME: '无抵押',
        },{
          VAL_CODE: '1',
          VAL_NAME: '有抵押',
        }],
        //租金支付方式
        RentPaymentMethodOptions:[{
          VAL_CODE: '1',
          VAL_NAME: '按月',
        },{
          VAL_CODE: '2',
          VAL_NAME: '按季',
        },{
          VAL_CODE: '3',
          VAL_NAME: '按半年',
        },{
          VAL_CODE: '4',
          VAL_NAME: '按年',
        }],
        //利率标记
        interestRateFlag:false,
        //相关人列表标记默认显示
        listRelevantPeopleFlag:true,
        //相关人添加标记默认隐藏
        addRelevantPeopleFlag:false,
        operationSpouse:false,
        //房屋资产弹窗
        addHousAssetDialogVisible:false,
        //土地资产弹窗
        addLandAssetDialogVisible:false,
        //土地标题
        operationLand:false,
        //汽车资产弹窗
        addCarAssetDialogVisible:false,
        //汽车标题
        operationCar:false,
        //证券资产弹窗
        addSecuritiesAssetDialogVisible:false,
        //证券标题
        operationSecurities:false,
        //其他资产弹窗
        addOtherAssetDialogVisible:false,
        //其他标题
        operationOther:false,

        //配偶 start
        //房屋资产弹窗
        addSpouseHousAssetDialogVisible:false,
        //土地资产弹窗
        addSpouseLandAssetDialogVisible:false,
        //土地标题
        operationSpouseLand:false,
        //汽车资产弹窗
        addSpouseCarAssetDialogVisible:false,
        //汽车标题
        operationSpouseCar:false,
        //证券资产弹窗
        addSpouseSecuritiesAssetDialogVisible:false,
        //证券标题
        operationSpouseSecurities:false,
        //其他资产弹窗
        addSpouseOtherAssetDialogVisible:false,
        //其他标题
        operationSpouseOther:false,
        //配偶 end


        loanBasisId:'80',
        size: 'small',
        dialogImageUrl: '',
        dialogVisible: false,
        dialogImageUrl2: '',
        dialogVisible2: false,
        dataFormRules: {
          title: [
            { required: true, message: '请输入标题', trigger: 'blur' }
          ],
          content: [
            { required: true, message: '请输入内容', trigger: 'blur' }
          ]
        },
        //房屋list
        assetTypeHousesTableData :[],
        //土地list
        landTableData:[],
        //汽车list
        carTableData:[],
        //证券list
        securitiesTableData:[],
        //其他list
        otherTableData:[],

        //配偶 start
        //房屋list
        assetTypeSpouseHousesTableData :[],
        //土地list
        spouseLandTableData:[],
        //汽车list
        spouseCarTableData:[],
        //证券list
        spouseSecuritiesTableData:[],
        //其他list
        spouseOtherTableData:[],
        //配偶 end
        //其他相关人
        oterPersonneltableData:[],
        //其他相关人
        oterPersonneltableDataformationForm:[],
        operationOterPersonnel:false,
        addOterPersonnelAssetDialogVisible:false,

        tableData: [{
          date: '2016-05-03',
          name: '王小虎',
          province: '上海',
          city: '普陀区',
          address: '上海市普陀区金沙江路 1518 弄',
          zip: 200333
        }, {
          date: '2016-05-02',
          name: '王小虎',
          province: '上海',
          city: '普陀区',
          address: '上海市普陀区金沙江路 1518 弄',
          zip: 200333
        }, {
          date: '2016-05-04',
          name: '王小虎',
          province: '上海',
          city: '普陀区',
          address: '上海市普陀区金沙江路 1518 弄',
          zip: 200333
        }, {
          date: '2016-05-01',
          name: '王小虎',
          province: '上海',
          city: '普陀区',
          address: '上海市普陀区金沙江路 1518 弄',
          zip: 200333
        }],
        //婚姻状况
        maritalStatusFlag:false,
        //已婚
        maritalStatusMarriedFlag:false,
        //离异
        maritalStatusDivorcedFlag:false,
        //丧偶
        maritalStatusWidowedFlag:false,
        //其他
        maritalStatusOtherFlag:false,
        //其他资产
        otherFlag : false,
        //证券标记
        securitiesFlag:false,
        //汽车标记
        carFlag:false,
        //房屋标记
        housFlag:false,
        //土地标记
        landFlag:false,

        //其他资产 配偶
        otherSpouseFlag : false,
        //证券标记 配偶
        securitiesSpouseFlag:false,
        //汽车标记 配偶
        carSpouseFlag:false,
        //房屋标记 配偶
        housSpouseFlag:false,
        //土地标记 配偶
        landSpouseFlag:false,

        //步骤选中
        active:0,
        //贷款类型
        LoanTypeOptions:[{
          VAL_CODE: '0',
          VAL_NAME: '新增',
        },{
          VAL_CODE: '1',
          VAL_NAME: '续贷',
        }],
        //申请事项
        ApplicationMattersOptions:[{
          VAL_CODE: '0',
          VAL_NAME: '个人经营性贷款',
        },{
          VAL_CODE: '1',
          VAL_NAME: '信用贷款',
        },{
          VAL_CODE: '2',
          VAL_NAME: '房屋按揭贷款',
        },{
          VAL_CODE: '3',
          VAL_NAME: '个人消费类贷款',
        }],
        //担保方式
        GuaranteeMethodOptions:[{
          VAL_CODE: '保证',
          VAL_NAME: '保证',
        },{
          VAL_CODE: '抵押',
          VAL_NAME: '抵押',
        },{
          VAL_CODE: '质押',
          VAL_NAME: '质押',
        }],
        //性别
        SexOptions:[{
          VAL_CODE: '0',
          VAL_NAME: '男',
        },{
          VAL_CODE: '1',
          VAL_NAME: '女',
        }],
        //常用通信地址
        ContactAddressOptions:[{
          VAL_CODE: '0',
          VAL_NAME: '现居住地址',
        },{
          VAL_CODE: '1',
          VAL_NAME: '单位地址',
        },{
          VAL_CODE: '2',
          VAL_NAME: '其他',
        }],
        //文化程度
        EducationalLevelOptions:[{
          VAL_CODE: '0',
          VAL_NAME: '研究生及以上',
        },{
          VAL_CODE: '1',
          VAL_NAME: '本科',
        },{
          VAL_CODE: '2',
          VAL_NAME: '大专',
        },{
          VAL_CODE: '3',
          VAL_NAME: '中专/高中',
        },{
          VAL_CODE: '4',
          VAL_NAME: '初中',
        },{
          VAL_CODE: '5',
          VAL_NAME: '其他',
        }],
        //文化程度其他标记
        educationalLevelFlag:false,
        //现住房来源
        CurrentHousingSourceOptions:[{
          VAL_CODE: '0',
          VAL_NAME: '自有住房',
        },{
          VAL_CODE: '1',
          VAL_NAME: '贷款自有',
        },{
          VAL_CODE: '2',
          VAL_NAME: '单位宿舍',
        },{
          VAL_CODE: '3',
          VAL_NAME: '与父母同住',
        },{
          VAL_CODE: '4',
          VAL_NAME: '租赁',
        },{
          VAL_CODE: '5',
          VAL_NAME: '其他',
        }],
        //现住房来源 其他标记
        currentHousingSourceFlag:false,
        //资产情况
        AssetSituationOptions:[{
          VAL_CODE: '0',
          VAL_NAME: '无',
        },{
          VAL_CODE: '1',
          VAL_NAME: '有',
        }],
        //资产类型
        AssetTypeOptions:[{
          VAL_CODE: '1',
          VAL_NAME: '房屋',
        },{
          VAL_CODE: '2',
          VAL_NAME: '土地',
        },{
          VAL_CODE: '3',
          VAL_NAME: '汽车',
        },{
          VAL_CODE: '4',
          VAL_NAME: '有价证券',
        },{
          VAL_CODE: '5',
          VAL_NAME: '其他',
        }],
        //与借款人关系
        TypeOptions:[{
          VAL_CODE: '1',
          VAL_NAME: '抵押担保人',
        },{
          VAL_CODE: '2',
          VAL_NAME: '保证担保人',
        }],
        //与借款人关系
        SpouseTypeOptions:[{
          VAL_CODE: '1',
          VAL_NAME: '同时是保证担保人',
        },{
          VAL_CODE: '2',
          VAL_NAME: '同时是抵押担保人',
        }],
        //资产类型标记
        assetTypeFlag:false,
        //资产类型标记 配偶
        assetTypeFlagSpouse:false,
        //是否不动产权证
        WhetherOwnershipCertificatesOptions:[{
          VAL_CODE: '1',
          VAL_NAME: '不动产权证',
        },{
          VAL_CODE: '2',
          VAL_NAME: '非不动产权证',
        }],
        //是否不动产权证 标记
        whetherOwnershipCertificatesFlag:false,
        //不动产权证号 标记
        propertyCertificateNumberFlag:false,
        //非不动产权证 房产证号/土地证号 标记
        deedLandCertificateFlag:false,
        //房产证号
        deedNumberFlag:false,
        //所属地
        AffiliationOptions:[{
          VAL_CODE: '桂林',
          VAL_NAME: '桂林',
        },{
          VAL_CODE: '临桂',
          VAL_NAME: '临桂',
        },{
          VAL_CODE: '临川',
          VAL_NAME: '临川',
        }],
        //融资情况
        FinancingSituationOptions:[{
          VAL_CODE: '0',
          VAL_NAME: '无抵押',
        },{
          VAL_CODE: '1',
          VAL_NAME: '有抵押',
        }],
        //是否有共同人
        WhetherCoownerOptions:[{
          VAL_CODE: '0',
          VAL_NAME: '否',
        },{
          VAL_CODE: '1',
          VAL_NAME: '是',
        }],
        coOwnerNameFlag:false,
        //是否有租赁
        WhetherLeaseOptions:[{
          VAL_CODE: '0',
          VAL_NAME: '否',
        },{
          VAL_CODE: '1',
          VAL_NAME: '是',
        }],
        //婚姻状况
        MaritalStatusOptions:[{
          VAL_CODE: '0',
          VAL_NAME: '未婚',
        },{
          VAL_CODE: '1',
          VAL_NAME: '已婚',
        },{
          VAL_CODE: '2',
          VAL_NAME: '离异未婚',
        },{
          VAL_CODE: '3',
          VAL_NAME: '丧偶未婚',
        },{
          VAL_CODE: '4',
          VAL_NAME: '其他',
        }],
        //离婚方式
        DivorceMethodOptions:[{
          VAL_CODE: '1',
          VAL_NAME: '协议离婚',
        },{
          VAL_CODE: '2',
          VAL_NAME: '诉讼离婚',
        }],

        //申请事项隐藏标记
        applicationMattersFlag:false,
        //担保方式隐藏标记
        guaranteeNethodFlag:false,
        //借口人基础信息
        loanBasisForm: {
          id:'',
          loanType:'',
          applicationMatters:'',
          guaranteeMethod: [],
          borrower: '',
          lastUpdateBy:sessionStorage.getItem("user")
        },
        //相关人员信息
        relatedPersonnelInformationForm:{
          id:'',
          loanBasisId:'',
          //类型
          type:[],
          //姓名
          name:'',
          //年龄
          age:'',
          //性别
          sex:'',
          //户籍所在地
          domicile:'',
          //身份证号码
          identityNumber:'',
          //现居住地址
          currentHomeAddress:'',
          //常用通信地址
          contactAddress:'',
          //本地居住时间
          localResidenceTime:'',
          //电子邮箱
          email:'',
          //联系电话
          contactNumber:'',
          qq:'',
          //微信
          wechat:'',
          //文化程度
          educationalLevel:'',
          //文化程度 其他
          educationalLevelValue:'',
          //现住房来源
          currentHousingSource:'',
          //现住房来源其他值
          currentHousingSourceValue:'',
          //工作单位
          employer:'',
          //职务
          position:'',
          //单位工作年限
          unitWorkingYears:'',
          //所投资或经营企业名称
          companyName:'',
          //持股比例
          shareholdingRatio:'',
          //本行业和相近行业经营年限
          yearsOperation:'',
          //资产情况（0、无）（1、有）
          assetSituation:'',
          //资产类型（1、房屋）（2、土地）（3、汽车）（4、有价证券）（5、其他）
          assetType:[],
          //婚姻状况（0、未婚）（1、已婚）（2、离异未婚）（3、丧偶未婚）（4、其他）
          maritalStatus:'',
          //原配偶姓名
          originalSpouseName:'',
          //离婚方式 （1、协议离婚）（2、协议离婚）
          divorceMethod:'',
          //时间
          divorceTime:'',

          //房屋信息
          assetTypeHouses:[],
          //土地信息
          assetTypeLand:[],
          //汽车信息
          assetTypeCar:[],
          //证券信息
          assetTypeSecurities:[],
          //其他
          assetTypeOther:[],
        },
        //相关人员信息配偶
        relatedPersonnelInformationSpouseForm:{
          id:'',
          loanBasisId:'',
          //类型
          type:[],
          //姓名
          name:'',
          //年龄
          age:'',
          //性别
          sex:'',
          //户籍所在地
          domicile:'',
          //身份证号码
          identityNumber:'',
          //现居住地址
          currentHomeAddress:'',
          //常用通信地址
          contactAddress:'',
          //本地居住时间
          localResidenceTime:'',
          //电子邮箱
          email:'',
          //联系电话
          contactNumber:'',
          qq:'',
          //微信
          wechat:'',
          //文化程度
          educationalLevel:'',
          //文化程度 其他
          educationalLevelValue:'',
          //现住房来源
          currentHousingSource:'',
          //现住房来源其他值
          currentHousingSourceValue:'',
          //工作单位
          employer:'',
          //职务
          position:'',
          //单位工作年限
          unitWorkingYears:'',
          //所投资或经营企业名称
          companyName:'',
          //持股比例
          shareholdingRatio:'',
          //本行业和相近行业经营年限
          yearsOperation:'',
          //资产情况（0、无）（1、有）
          assetSituation:'',
          //资产类型（1、房屋）（2、土地）（3、汽车）（4、有价证券）（5、其他）
          assetType:[],
          //婚姻状况（0、未婚）（1、已婚）（2、离异未婚）（3、丧偶未婚）（4、其他）
          maritalStatus:'',
          //原配偶姓名
          originalSpouseName:'',
          //离婚方式 （1、协议离婚）（2、协议离婚）
          divorceMethod:'',
          //时间
          divorceTime:'',
          //房屋信息
          assetTypeHouses:[],
          //土地信息
          assetTypeLand:[],
          //汽车信息
          assetTypeCar:[],
          //证券信息
          assetTypeSecurities:[],
          //其他
          assetTypeOther:[],
        },
        //其他相关人员信息配偶
        relatedOterPersonnelInformationForm:{
          loanBasisId:'',
          //类型
          type:'',
          //姓名
          name:'',
          //年龄
          age:'',
          //性别
          sex:'',
          //户籍所在地
          domicile:'',
          //身份证号码
          identityNumber:'',
          //现居住地址
          currentHomeAddress:'',
          //常用通信地址
          contactAddress:'',
          //本地居住时间
          localResidenceTime:'',
          //电子邮箱
          email:'',
          //联系电话
          contactNumber:'',
          qq:'',
          //微信
          wechat:'',
          //文化程度
          educationalLevel:'',
          //文化程度 其他
          educationalLevelValue:'',
          //现住房来源
          currentHousingSource:'',
          //现住房来源其他值
          currentHousingSourceValue:'',
          //工作单位
          employer:'',
          //职务
          position:'',
          //单位工作年限
          unitWorkingYears:'',
          //所投资或经营企业名称
          companyName:'',
          //持股比例
          shareholdingRatio:'',
          //本行业和相近行业经营年限
          yearsOperation:'',
          //资产情况（0、无）（1、有）
          assetSituation:'',
          //资产类型（1、房屋）（2、土地）（3、汽车）（4、有价证券）（5、其他）
          assetType:[],
          //婚姻状况（0、未婚）（1、已婚）（2、离异未婚）（3、丧偶未婚）（4、其他）
          maritalStatus:'',
          //原配偶姓名
          originalSpouseName:'',
          //离婚方式 （1、协议离婚）（2、协议离婚）
          divorceMethod:'',
          //时间
          divorceTime:'',

          //房屋信息
          assetTypeHouses:[],
          //土地信息
          assetTypeLand:[],
          //汽车信息
          assetTypeCar:[],
          //证券信息
          assetTypeSecurities:[],
          //其他
          assetTypeOther:[],
        },
        //房屋信息
        assetTypeHouses:{
          rpiId:'',
          //是否不动产权证（1、不动产权证）（2、非不动产权证）
          whetherOwnershipCertificates:'',
          //不动产权证号
          propertyCertificateNumber:'',
          //房产证号
          deed:'',
          //土地证号
          landCertificate:'',
          affiliation:'',
          address:'',
          constructionArea:'',
          value:'',
          financingSituation:'',
          whetherCoOwner:'',
          coOwnerName:'',
          whetherLease:''
        },
        //土地信息
        assetTypeLand:{
          rpiId:'',
          //是否不动产权证（1、不动产权证）（2、非不动产权证）
          whetherOwnershipCertificates:'',
          //不动产权证号
          propertyCertificateNumber:'',
          //房产证号
          deed:'',
          //土地证号
          landCertificate:'',
          affiliation:'',
          address:'',
          constructionArea:'',
          value:'',
          financingSituation:'',
          whetherCoOwner:'',
          coOwnerName:'',
          whetherLease:''
        },
        //汽车信息
        assetTypeCar:{
          rpiId:'',
          brand:'',
          value:'',
          numberPlate:'',
          drivingLicenseNumber:''
        },
        //证券信息
        assetTypeSecurities:{
          rpi_id:'',
          type:'',
          value:''
        },
        //证券下拉列表
        SecuritiesTypeOptions:[{
          VAL_CODE: '1',
          VAL_NAME: '定期存单',
        },{
          VAL_CODE: '2',
          VAL_NAME: '股权',
        },{
          VAL_CODE: '3',
          VAL_NAME: '股金',
        }],
        //其他信息
        assetTypeOther:{
          rpiId:'',
          assetName:'',
          value:''
        },

        //房屋信息
        spouseAssetTypeHouses:{
          rpiId:'',
          //是否不动产权证（1、不动产权证）（2、非不动产权证）
          whetherOwnershipCertificates:'',
          //不动产权证号
          propertyCertificateNumber:'',
          //房产证号
          deed:'',
          //土地证号
          landCertificate:'',
          affiliation:'',
          address:'',
          constructionArea:'',
          value:'',
          financingSituation:'',
          whetherCoOwner:'',
          coOwnerName:'',
          whetherLease:''
        },
        //土地信息
        spouseAssetTypeLand:{
          rpiId:'',
          //是否不动产权证（1、不动产权证）（2、非不动产权证）
          whetherOwnershipCertificates:'',
          //不动产权证号
          propertyCertificateNumber:'',
          //房产证号
          deed:'',
          //土地证号
          landCertificate:'',
          affiliation:'',
          address:'',
          constructionArea:'',
          value:'',
          financingSituation:'',
          whetherCoOwner:'',
          coOwnerName:'',
          whetherLease:''
        },
        //汽车信息
        spouseAssetTypeCar:{
          rpiId:'',
          brand:'',
          value:'',
          numberPlate:'',
          drivingLicenseNumber:''
        },
        //证券信息
        spouseAssetTypeSecurities:{
          rpi_id:'',
          type:'',
          value:''
        },

        //其他信息
        spouseAssetTypeOther:{
          rpiId:'',
          assetName:'',
          value:''
        },

        //家庭收支情况
        householdIncomeForm:{
          loanBasisId:'',
          totalAssets:'',
          totalRevenue:'',
          applicantAnnualIncome:'',
          applicantOperatingIncome:'',
          applicantOtherIncome:'',
          spouseAnnualIncome:'',
          spouseOperatingIncome:'',
          spouseOtherIncome:'',
          totalAnnualExpenditure:'',
          lifeTotalExpenditure:'',
          basicLifeTotalExpenditure:'',
          educationExpenditure:'',
          temporaryExpenditure:'',
          debtTotalExpenditure:'',
          annualLoanExpenditure:'',
          spouseTemporaryExpenditure:'',
          supportPopulation:'',
          foreignGuaranteeLumpSum:'',
          totalLiability:''
        },
        //选中model
        radioData:'',
        //选中赋值
        checkedRadioData:'',
        //基础信息id
        currentStaatus:'0'

    }
    },

    created(){
        let baseLoneId = sessionStorage.getItem('baseLoneId');
        if(baseLoneId){
            this.loanBasisId = baseLoneId;
            let status = sessionStorage.getItem('status');
            this.currentStaatus = status;
            this.active=status;
            //加载数据
            this.getData(status,baseLoneId);

        }
    },

    methods: {
      //根据id获取数据信息type 环境类型 每个环节获取每个环节的数据
      getData(status,baseLoneId){
        //1、第一步 基础信息
        if(status=='0'){
          //1、根据id获取对象信息
          this.getBaseById(baseLoneId);
        }else if(status=='1'){
          //1、贷款业务信息表
          this.getRelatedPersonnelById(baseLoneId);
        }else if(status=='2'){
          //2、贷款业务信息表
          this.getOterPersonnelById(baseLoneId);
        }else if(status=='3'){
          //3、贷款业务信息表
          this.getPawnById(baseLoneId);
        }else if(status=='4'){
          //4、贷款业务信息表
          this.getBusinessById(baseLoneId);
        }else if(status=='6'){
          //6、调查报告 第六步
          this.getSurveyReportById(baseLoneId);
        }else if(status=='7'){
          //7、合同信息
          this.getContractById(baseLoneId);
        }
      },

      //根据id获取结款人信息
      getRelatedPersonnelById(id){
          let dataParams = {
            loanBasisId:id,
            type:'1'
          }
          let params = Object.assign({}, dataParams);
          api.relatedPersonnel.findByBaseIdAndType(params).then((res) => {
            if(res.code=='200'){
              //赋值
              let data = res.data;
              let types =[];
              if(data.type !=null){
                types.push(data.type.toString());
                data.type =types;
              }
              if(data.sex !=null){
                data.sex = data.sex.toString();
              }
              if(data.contactAddress !=null){
                data.contactAddress = data.contactAddress.toString();
              }
              if(data.educationalLevel !=null){
                data.educationalLevel = data.educationalLevel.toString();
                this.educationaLevelChange(data.educationalLevel);
              }
              if(data.currentHousingSource !=null){
                data.currentHousingSource = data.currentHousingSource.toString();
                this.currentHousingSourceChange(data.currentHousingSource);
              }
              if(data.assetSituation !=null){
                data.assetSituation = data.assetSituation.toString();
                this.assetSituationChange(data.assetSituation);
              }
              if(data.maritalStatus !=null){
                data.maritalStatus = data.maritalStatus.toString();
                this.maritalStatusChange(data.maritalStatus);
              }
              let assetTypes =[];
              if(data.assetTypeHouses !=null && data.assetTypeHouses.length>0){
               let assetTypeHousesNew = [];
                for(let index in data.assetTypeHouses){
                    let d = data.assetTypeHouses[index];
                    d.whetherOwnershipCertificatess = this.getWhetherOwnershipCertificatesOptions(d.whetherOwnershipCertificates);
                    assetTypeHousesNew.push(d);
                }
                this.housFlag=true;
                assetTypes.push('1');
                this.assetTypeHousesTableData = assetTypeHousesNew;
              }
              if(data.assetTypeLand !=null && data.assetTypeLand.length>0){
                this.landFlag=true;
                assetTypes.push('2');
                this.landTableData = data.assetTypeLand;
              }
              if(data.assetTypeCar !=null  && data.assetTypeCar.length>0){
                this.carFlag=true;
                assetTypes.push('3');
                this.carTableData = data.assetTypeCar;
              }
              if(data.assetTypeSecurities !=null && data.assetTypeSecurities.length>0){
                this.securitiesFlag=true;
                assetTypes.push('4');
                this.securitiesTableData = data.assetTypeSecurities;
              }
              if(data.assetTypeOther !=null && data.assetTypeOther.length>0){
                this.otherFlag=true;
                assetTypes.push('5');
                this.otherTableData = data.assetTypeOther;
              }
              if(assetTypes !=null){
                data.assetType= assetTypes;
              }
              console.log("data.assetTypeSecurities:",data.assetTypeSecurities);
              console.log("data.assetTypeOther:",data.assetTypeOther);
              console.log("data.assetType:",data.assetType);
              if(data.spouseInfo){
                let spouseInfoType=[];
                if(data.spouseInfo.type !=null){
                  spouseInfoType.push(data.spouseInfo.type.toString());
                  data.spouseInfo.type =spouseInfoType;
                }
                if(data.spouseInfo.sex !=null){
                  data.spouseInfo.sex = data.spouseInfo.sex.toString();
                }
                let assetTypess =[];
                if(data.spouseInfo.assetSituation !=null){
                  data.spouseInfo.assetSituation = data.spouseInfo.assetSituation.toString();
                  this.assetSituationSpouseChange(data.spouseInfo.assetSituation);
                }
                let typess =[];
                if(data.spouseInfo.maritalStatus !=null){
                  data.spouseInfo.maritalStatus = data.spouseInfo.maritalStatus.toString();
                  this.maritalStatusChange(data.spouseInfo.maritalStatus);
                }
                if(data.spouseInfo.assetTypeHouses !=null && data.spouseInfo.assetTypeHouses.length>0){
                  this.housSpouseFlag=true;
                  typess.push('1');
                  let assetTypeHousesNew = [];
                  for(let index in data.spouseInfo.assetTypeHouses){
                    let d = data.assetTypeHouses[index];
                    d.whetherOwnershipCertificatess = this.getWhetherOwnershipCertificatesOptions(d.whetherOwnershipCertificates);
                    assetTypeHousesNew.push(d);
                  }
                  this.housFlag=true;
                  assetTypes.push('1');
                  this.assetTypeSpouseHousesTableData = assetTypeHousesNew;
                }
                if(data.spouseInfo.assetTypeLand !=null && data.spouseInfo.assetTypeLand.length>0){
                  this.landSpouseFlag=true;
                  typess.push('2');
                  this.spouseLandTableData = data.spouseInfo.assetTypeLand;
                }
                if(data.spouseInfo.assetTypeCar !=null && data.spouseInfo.assetTypeCar.length>0){
                  this.carSpouseFlag=true;
                  typess.push('3');
                  this.spouseCarTableData = data.spouseInfo.assetTypeCar;
                }
                if(data.spouseInfo.assetTypeSecurities !=null && data.spouseInfo.assetTypeSecurities.length>0){
                  this.securitiesSpouseFlag=true;
                  typess.push('4');
                  this.spouseSecuritiesTableData = data.spouseInfo.assetTypeSecurities;
                }
                if(data.spouseInfo.assetTypeOther !=null && data.spouseInfo.assetTypeOther.length>0){
                  this.otherSpouseFlag=true;
                  typess.push('5');
                  this.spouseOtherTableData = data.spouseInfo.assetTypeOther;
                }
                if(typess !=null){
                  data.spouseInfo.assetType =typess;
                }
                this.relatedPersonnelInformationForm=data;
                this.relatedPersonnelInformationSpouseForm=data.spouseInfo;
              }
              if(data.householdIncomeForm){
                this.householdIncomeForm=data.householdIncomeForm;
              }
            }
          })
      },

      //根据id查询personal_loan_survey_report  个人贷款调查报告信息表
      getSurveyReportById(id){
        let dataParams = {
          loanBasisId:id
        }
        let params = Object.assign({}, dataParams);
        api.loanSurveyReport.findByBaseId(params).then((res) => {
          if(res.code=='200'){
            //赋值
            this.setPersonalLoanSurveyReport(res.data);
          }else{
            //清空
            this.clearPersonalLoanSurveyReport();
          }
        })
      },

      //6、设置个人调查报告信息
      setPersonalLoanSurveyReport(data){
        console.log("data",data);
        if(data){
          if(data.whetherLocalHouseholdRegistration !=null){
            data.whetherLocalHouseholdRegistration =  data.whetherLocalHouseholdRegistration.toString();
          }
          if(data.borrowerHealthStatus !=null){
            data.borrowerHealthStatus =  data.borrowerHealthStatus.toString();
          }
          if(data.loanAmountWhetherReasonable !=null){
            data.loanAmountWhetherReasonable =  data.loanAmountWhetherReasonable.toString();
          }
          if(data.loanTermWhetherReasonable !=null){
            data.loanTermWhetherReasonable =  data.loanTermWhetherReasonable.toString();
          }
          if(data.withoutDebtLitigation !=null){
            data.withoutDebtLitigation =  data.withoutDebtLitigation.toString();
          }
          if(data.borrowerCredit !=null){
            data.borrowerCredit =  data.borrowerCredit.toString();
          }
          if(data.loanMethodGuarantee !=null){
            data.loanMethodGuarantee =  data.loanMethodGuarantee.toString();
          }
          if(data.calculated !=null){
            data.calculated =  data.calculated.toString();
          }
          if(data.loanMethodPledgeGuarantee !=null){
            data.loanMethodPledgeGuarantee =  data.loanMethodPledgeGuarantee.toString();
          }
          if (data.whetherAmountMatch !=null){
            data.whetherAmountMatch =  data.whetherAmountMatch.toString();
          }
          if (data.borrowerWhetherHaveCivilAction !=null){
            data.borrowerWhetherHaveCivilAction =  data.borrowerWhetherHaveCivilAction.toString();
          }
          if (data.repaymentSourceWhetherSufficient !=null){
            data.repaymentSourceWhetherSufficient =  data.repaymentSourceWhetherSufficient.toString();
          }
        }
        this.personalLoanSurveyReport= data;
      },

      //清空个人借款报告
      clearPersonalLoanSurveyReport(){
        //个人借款报告
        let personalLoanSurveyReport={
          id:this.personalLoanSurveyReport.id,
          borrowerName:'',
          maritalStatus:'',
          spouseName:'',
          whetherLocalHouseholdRegistration:'',
          totalProperty:'',
          totalArea:'',
          totalRalue:'',
          totalPropertyRemark:'',
          familyAssets:'',
          householdDebt:'',
          annualHouseholdIncome:'',
          familyExpense:'',
          borrowerHealthStatus:'',
          otherSurveyHappening:'',
          borrowerWhetherHaveCivilAction:'',
          amountLoan:'',
          selfFunding:'',
          borrowingPeriod:'',
          loanAmountWhetherReasonable:'',
          loanTermWhetherReasonable:'',
          useLoan:'',
          repaymentSourceWhetherSufficient:'',
          borrowerRepayAbilityEstimate:'',
          whetherAmountMatch:'',
          withoutDebtLitigation:'',
          loanAethodGuarantee:'',
          loanMethodGuaranteeRemark:'',
          calculated:'',
          loanMethodPledgeGuarantee:'',
          loanMethodPledgeGuaranteeRemark:'',
          lastUpdateBy:sessionStorage.getItem("user"),
        };
        this.personalLoanSurveyReport= personalLoanSurveyReport;
      },

      //根据id查询信息
      getBaseById(id){
        let dataParams = {
          id:id
        }
        let params = Object.assign({}, dataParams);
        api.loan.getByKeyId(params).then((res) => {
          if(res.code=='200'){
            //赋值
            this.setLoanBasisForm(res.data);
          }else{
            //清空
            this.clearLoanBasisForm();
          }
        })
      },

      //赋值
      setLoanBasisForm(data){
          this.loanBasisForm.id = data.id;
          if(data.loanType !=null){
            this.loanBasisForm.loanType = data.loanType.toString();
            this.loanTypeChage(this.loanBasisForm.loanType);
          }
          //申请事项
          if(data.loanType !=null){
            this.loanBasisForm.applicationMatters = data.applicationMatters.toString();
          }
          //担保方式
          let guaranteeMethod = data.guaranteeMethod;
          if(guaranteeMethod){
            if(guaranteeMethod.indexOf(',') !=-1){
              this.loanBasisForm.guaranteeMethod = guaranteeMethod.split(',');
            }else{
              this.loanBasisForm.guaranteeMethod.push(guaranteeMethod);
            }
          }
          //借款人
          if(data.borrower){
            this.loanBasisForm.borrower=data.borrower;
          }
      },

      //清空基础信息
      clearLoanBasisForm(){
        let loanBasisForm={
            id:this.loanBasisForm.id,
            loanType:'',
            applicationMatters:'',
            guaranteeMethod: [],
            borrower: '',
            lastUpdateBy:sessionStorage.getItem("user"),
        }
        this.loanBasisForm = loanBasisForm;
        this.loanTypeChage(this.loanBasisForm.loanType);
      },


      //根据id查询contract_information 合同信息表
      getContractById(id){
        let dataParams = {
          loanBasisId:id
        }
        let params = Object.assign({}, dataParams);
        api.contractInformation.findByBaseId(params).then((res) => {
          if(res.code=='200'){
            //赋值
            this.setContractInformation(res.data);
          }else{
            //清空
            this.clearContractInformation();
          }
        })
      },

      //7、设置合同数据
      setContractInformation(data){
          this.contractInformation=data;
      },

      //7、清空合同数据
      clearContractInformation(){
        let contractInformation ={
            id:'',
            personalLoanContractNo:'',
            mortgageGuaranteeContractNo:'',
            pawnContractNo:'',
            guaranteeGuaranteeContractNo:'',
            contractSigningDate:'',
            borrowingStartPeriod:'',
            borrowingEndPeriod:'',
            loanDate:'',
            loanBasisId:'',
            lastUpdateBy:sessionStorage.getItem("user")
        };
        this.contractInformation = contractInformation;
      },

      //根据loanBasicId查询
      getBusinessById(id){
        let dataParams = {
          loanBasicId:id
        }
        let params = Object.assign({}, dataParams);
        api.loanBusinessInformation.findByBasisId(params).then((res) => {
          if(res.code=='200'){
            //赋值
            this.setBusinessInformation(res.data);
          }else{
            //清空
            this.clearBusinessInformation();
          }
        })
      },

      //7、设置合同数据
      setBusinessInformation(data){
        if(data.id){
          //获取交易对手信息
          this.getCounterpartyById(data.id);
        }
        if(data.useInfo !=null){
          data.useInfo = data.useInfo.toString();
        }
        if(data.whetherPersonalHomeLoan !=null){
          data.whetherPersonalHomeLoan = data.whetherPersonalHomeLoan.toString();
        }
        if(data.whetherExclusiveCreditClient !=null){
          data.whetherExclusiveCreditClient = data.whetherExclusiveCreditClient.toString();
          this.whetherExclusiveCreditClientChange(data.whetherExclusiveCreditClient);
        }
        if(data.adjustmentMethod !=null){
          data.adjustmentMethod = data.adjustmentMethod.toString();
        }
        if(data.repayment !=null){
            data.repayment = data.repayment.toString();
            this.repaymentChange(data.repayment);
        }
        if(data.interestRate !=null){
          data.interestRate = data.interestRate.toString();
          this.interestRateChange(data.interestRate);
        }
        if(data.cycleQuota !=null){
          data.cycleQuota = data.cycleQuota.toString();
        }
        if(data.whetherProvidentFundCombinationLoan !=null){
          data.whetherProvidentFundCombinationLoan = data.whetherProvidentFundCombinationLoan.toString();
          this.whetherProvidentFundCombinationLoanChange(data.whetherProvidentFundCombinationLoan);
        }
        this.loanBusinessInformation=data;

      },

      //7、清空贷款业务数据
      clearBusinessInformation(){
        let   loanBusinessInformation={
            id:'',
            loanBasisId:'',
            borrowerAccount:'',
            clientNumber:'',
            applicationAmount:'',
            applicationPeriod:'',
            cycleQuota:'',
            interestRate:'',
            adjustmentMethod:'',
            interestRateRise:'',
            applicationRate:'',
            marginRatio:'',
            originalCreditBalance:'',
            useInfo:'',
            description:'',
            repayment:'',
            value:'',
            debitAccountName:'',
            accountNumber:'',
            repaymentPeriod:'',
            whetherPersonalHomeLoan:'',
            whetherProvidentFundCombinationLoan:'',
            providentFundLoanAmount:'',
            whetherExclusiveCreditClient:'',
            depositAccount:'',
            counterpartyInformation:[],
            repaymentPlan:[],
            lastUpdateBy:sessionStorage.getItem("user"),
          };
        this.contractInformation = loanBusinessInformation;
      },

      //根据贷款业务id获取交易对手数据
      getCounterpartyById(id){
        let dataParams = {
          loanBusinessInformationId:id
        }
        let params = Object.assign({}, dataParams);
        api.counterpartyInformation.findByIoanBusinessInformationId(params).then((res) => {
          this.counterpartyTableData=[];
          if(res.code=='200'){
            //赋值
            this.counterpartyTableData=res.data;
          }
        })
      },

      //根据loanBasicId查询
      getPawnById(id){
        let dataParams = {
          loanBasisId:id
        }
        let params = Object.assign({}, dataParams);
        api.pawn.findByLoanBasisId(params).then((res) => {
          this.pawnTableData={};
          if(res.code=='200'){
            //赋值
            this.setPawnTableData(res.data);
           //2 this.pawnTableData=res.data;
          }
        })
      },

      //设置抵押物数据
      setPawnTableData(dataList){
          if(dataList){
              let assetTypeHousesTableDataNew = [];
              for(let index in dataList){
                let dataParams = {};
                let data = dataList[index];
              /*  if(data.mortgageType !=null){
                  data.mortgageTypes = this.getMortgageType(data.mortgageType);
                }
                if(data.landNature !=null){
                  data.landNatures =this.getLandNatures(data.landNature);
                }*/
                dataParams = {
                  mortgageTypes:this.getMortgageType(data.mortgageType),
                  landNatures:this.getLandNatures(data.landNature),
                  collateralName:data.collateralName,
                  collateralDeposit:data.collateralDeposit,
                  value:data.value,
                  pawn:data,
                  loanBasisId:data.loanBasisId
                };
                assetTypeHousesTableDataNew.push(dataParams);
              }
              this.pawnTableData=assetTypeHousesTableDataNew;
          }
      },

      //其他相关人
      getOterPersonnelById(id){
        let dataParams = {
          loanBasisId:id
        }
        let params = Object.assign({}, dataParams);
        api.relatedPersonnel.findRelatedPersonnelList(params).then((res) => {
          this.oterPersonneltableData={};
          if(res.code=='200'){
            //赋值
            this.setRelatedPersonnel(res.data);
          }
        })
      },

      //赋值
      setRelatedPersonnel(dataList){
        this.oterPersonneltableData = dataList;
        return;
        let assetTypeHousesTableData = this.oterPersonneltableData;
        let assetTypeHousesTableDataNew = [];
        if(dataList){
          for(let index in dataList){
              let dataParams = {};
              let relatedPersonnelInformationForm = dataList[index];
            //资产类型数据组装 配偶
            let datas = {
              loanBasisId: this.loanBasisId,
              //类型
              type: this.getType(relatedPersonnelInformationForm.type),
              //姓名
              name: relatedPersonnelInformationForm.name,
              //年龄
              age: relatedPersonnelInformationForm.age,
              //性别
              sex: relatedPersonnelInformationForm.sex,
              //户籍所在地
              domicile: relatedPersonnelInformationForm.domicile,
              //身份证号码
              identityNumber: relatedPersonnelInformationForm.identityNumber,
              //现居住地址
              currentHomeAddress: relatedPersonnelInformationForm.currentHomeAddress,
              //常用通信地址
              contactAddress: relatedPersonnelInformationForm.contactAddress,
              //本地居住时间
              localResidenceTime: relatedPersonnelInformationForm.localResidenceTime,
              //电子邮箱
              email: relatedPersonnelInformationForm.email,
              //联系电话
              contactNumber: relatedPersonnelInformationForm.contactNumber,
              qq: relatedPersonnelInformationForm.qq,
              //微信
              wechat: relatedPersonnelInformationForm.wechat,
              //文化程度
              educationalLevel: relatedPersonnelInformationForm.educationalLevel,
              //文化程度 其他
              educationalLevelValue: relatedPersonnelInformationForm.educationalLevelValue,
              //现住房来源
              currentHousingSource: relatedPersonnelInformationForm.currentHousingSource,
              //现住房来源其他值
              currentHousingSourceValue: relatedPersonnelInformationForm.currentHousingSourceValue,
              //工作单位
              employer: relatedPersonnelInformationForm.employer,
              //职务
              position: relatedPersonnelInformationForm.position,
              //单位工作年限
              unitWorkingYears: relatedPersonnelInformationForm.unitWorkingYears,
              //所投资或经营企业名称
              companyName: relatedPersonnelInformationForm.companyName,
              //持股比例
              shareholdingRatio: relatedPersonnelInformationForm.shareholdingRatio,
              //本行业和相近行业经营年限
              yearsOperation: relatedPersonnelInformationForm.yearsOperation,
              //资产情况（0、无）（1、有）
              assetSituation: relatedPersonnelInformationForm.assetSituation,
              //资产类型（1、房屋）（2、土地）（3、汽车）（4、有价证券）（5、其他）
              // assetType:relatedPersonnelInformationForm.assetType,
              //婚姻状况（0、未婚）（1、已婚）（2、离异未婚）（3、丧偶未婚）（4、其他）
              maritalStatus: relatedPersonnelInformationForm.maritalStatus,
              //原配偶姓名
              originalSpouseName: relatedPersonnelInformationForm.originalSpouseName,
              //离婚方式 （1、协议离婚）（2、协议离婚）
              divorceMethod: relatedPersonnelInformationForm.divorceMethod,
              //时间
              divorceTime: relatedPersonnelInformationForm.divorceTime,
              //房屋
              assetTypeHouses: relatedPersonnelInformationForm.assetTypeHouses,
              //土地信息
              assetTypeLand: relatedPersonnelInformationForm.assetTypeLand,
              //汽车信息
              assetTypeCar: relatedPersonnelInformationForm.assetTypeCar,
              //证券信息
              assetTypeSecurities: relatedPersonnelInformationForm.assetTypeSecurities,
              //其他
              assetTypeOther: relatedPersonnelInformationForm.assetTypeOther,
              //配偶信息
              spouseInfo: this.spouseAppend(),
              //家庭收支情况
              householdIncomeForm: this.householdIncomeForm,
              createBy: sessionStorage.getItem("user")
            };
            dataParams = {
              name: relatedPersonnelInformationForm.name,
              identityNumber: relatedPersonnelInformationForm.identityNumber,
              age: relatedPersonnelInformationForm.age,
              relatedPersonnelInformationForm: datas
            };
            console.log("datas:", datas);
            this.oterPersonneltableDataformationForm.push(datas);
            assetTypeHousesTableDataNew.push(dataParams);
          }
          if (assetTypeHousesTableData) {
            for (let index in assetTypeHousesTableData) {
              assetTypeHousesTableDataNew.push(assetTypeHousesTableData[index]);
            }
          }

          this.oterPersonneltableData=assetTypeHousesTableDataNew;
        }
      },


      /**
       * 抵押物类型显示各自
       */
      mortgageTypeChange(value){
        this.whetherOwnershipCertificatesFlag=false;
        this.propertyCertificateNumberFlag=false;
        this.deedLandCertificateFlag=false;
        this.deedNumberFlag=false;
        this.buildingAreaFlag =false;
        this.landOccupationAreaFlag =false;
        //房屋
        if(value=='0'){
          this.buildingAreaFlag =true;
          this.EvaluationCorporationOptions=this.HousEvaluationCorporationOptions;
          this.whetherOwnershipCertificatesFlag=true;
        }else if(value=='1'){
          this.landOccupationAreaFlag =true;
          this.EvaluationCorporationOptions=this.LandEvaluationCorporationOptions;
          this.pawn.whetherOwnershipCertificates='';
          this.deedLandCertificateFlag=true;
        }
      },

      /**
       * 是否有共有人
       */
      whetherCoownerChange(value){
        this.coOwnerNameFlag=false;
        if(value=='1'){
          this.coOwnerNameFlag=true;
        }
      },

      /**
       * 是否有租赁
       */
      whetherLeaseChange(value){
        this.whetherLeaseFlag=false;
        if(value=='1'){
          this.whetherLeaseFlag=true;
        }
      },

      /**
       * 贷款类型显示 申请事项
       */
      loanTypeChage(value){
        //隐藏
        this.applicationMattersFlagHideAndShow(false);
        if(value=='0'){
          //显示
          this.applicationMattersFlagHideAndShow(true);
        }
      },

      /**
       * 申请事项显示 担保方式
       */
      applicationMattersChange(value){
        //信用贷款隐藏 否则显示
        if(value=='02'){
          //隐藏
          this.guaranteeNethodFlagHideAndShow(false);
          return;
        }
        //显示
        this.guaranteeNethodFlagHideAndShow(true);
      },

      /**
       * 申请事项/担保方式隐藏显示
       */
      applicationMattersFlagHideAndShow(flag){
        //申请事项隐藏标记
        this.applicationMattersFlag=flag;
        //担保方式隐藏标记
        this.guaranteeNethodFlag=flag;
      },

      /**
       * 申请事项隐藏显示
       */
      guaranteeNethodFlagHideAndShow(flag){
        //担保方式隐藏标记
        this.guaranteeNethodFlag=flag;
      },

      /**
       * 1、保存基础信息下一步
       */
      saveBasicSubmit(){
        this.$refs.loanBasisForm.validate((valid) => {
          if (valid) {
            this.$confirm('确认提交吗？', '提示', {}).then(() => {
              let datas = {
                id:this.loanBasisForm.id,
                loanType:this.loanBasisForm.loanType,
                applicationMatters:this.loanBasisForm.applicationMatters,
                guaranteeMethod: this.getGuaranteeMethod(),
                borrower: this.loanBasisForm.borrower,
                lastUpdateBy:sessionStorage.getItem("user")
              };
              let params = Object.assign({}, datas)
              this.$api.loan.save(params).then((res) => {
                this.loanBasisId = '';
                if(res.code == 200) {
                  this.loanBasisId = res.data;
                  //赋值
                  this.secondAssignment();
                  this.active=1;
                  this.$message({ message: '操作成功', type: 'success' })
                } else {
                  this.active=0;
                  this.$message({message: '操作失败, ' + res.msg, type: 'error'})
                }
                this.$refs['loanBasisForm'].resetFields()
              })
            })
          }
        })
      },

      /**
       * 2、第二部赋值
       */
      secondAssignment(){
        this.relatedPersonnelInformationForm.name = this.loanBasisForm.borrower;
      },

      /**
       * 获取资产类型 数据组装
       */
      assetTypeAppend(){
        //资产情况（0、无）（1、有）
        let assetSituation = this.relatedPersonnelInformationForm.assetSituation;
        if(assetSituation){
          if(assetSituation=='1'){
            //组装资产类型数据 房屋 获取房屋对象
            if(this.relatedPersonnelInformationForm.assetType.indexOf('1') !=-1){
              this.relatedPersonnelInformationForm.assetTypeHouses =  this.assetTypeHousesTableData;
            }
            //土地 获取土地对象
            if(this.relatedPersonnelInformationForm.assetType.indexOf('2') !=-1){
              this.relatedPersonnelInformationForm.assetTypeLand =  this.landTableData;
            }
            //汽车 获取汽车对象
            if(this.relatedPersonnelInformationForm.assetType.indexOf('3') !=-1){
              this.relatedPersonnelInformationForm.assetTypeCar =  this.carTableData;
            }
            //有价证券 获取有价证券对象
            if(this.relatedPersonnelInformationForm.assetType.indexOf('4') !=-1){
              this.relatedPersonnelInformationForm.assetTypeSecurities =  this.securitiesTableData;
            }
            //其他 获取其他对象
            if(this.relatedPersonnelInformationForm.assetType.indexOf('5') !=-1){
              this.relatedPersonnelInformationForm.assetTypeOther =  this.otherTableData;
            }
          }
        }
        //配偶
        //资产情况（0、无）（1、有）
        let assetSpouseSituation = this.relatedPersonnelInformationSpouseForm.assetSituation;
        console.log("assetTypeSpouseHousesTableData:",this.assetTypeSpouseHousesTableData);
        if(assetSpouseSituation){
          if(assetSpouseSituation=='1'){
            //组装资产类型数据 房屋 获取房屋对象
            if(this.relatedPersonnelInformationSpouseForm.assetType.indexOf('1') !=-1){
              this.relatedPersonnelInformationSpouseForm.assetTypeHouses =  this.assetTypeSpouseHousesTableData;
            }
            //土地 获取土地对象
            if(this.relatedPersonnelInformationSpouseForm.assetType.indexOf('2') !=-1){
              //this.relatedPersonnelInformationSpouseForm.assetTypeLand =  this.spouseCarTableData;
              this.relatedPersonnelInformationSpouseForm.assetTypeLand =  this.spouseLandTableData;
            }
            //汽车 获取汽车对象
            if(this.relatedPersonnelInformationSpouseForm.assetType.indexOf('3') !=-1){
              /*this.relatedPersonnelInformationSpouseForm.assetTypeCar =  this.spouseSecuritiesTableData;*/
              this.relatedPersonnelInformationSpouseForm.assetTypeCar =  this.spouseCarTableData;
            }
            //有价证券 获取有价证券对象
            if(this.relatedPersonnelInformationSpouseForm.assetType.indexOf('4') !=-1){
              /* this.relatedPersonnelInformationSpouseForm.assetTypeSecurities =  this.securitiesTableData;*/
              this.relatedPersonnelInformationSpouseForm.assetTypeSecurities =  this.spouseSecuritiesTableData;
            }
            //其他 获取其他对象
            if(this.relatedPersonnelInformationSpouseForm.assetType.indexOf('5') !=-1){
              this.relatedPersonnelInformationSpouseForm.assetTypeOther =  this.spouseOtherTableData;
            }
          }
        }
      },

      /**
       * 配偶数据组装
       */
      spouseAppend(){
        //配偶信息
        let relatedPersonnelInformationSpouseForm = this.relatedPersonnelInformationSpouseForm;
        let datas = {
          id:relatedPersonnelInformationSpouseForm.id,
          lastUpdateBy :sessionStorage.getItem("user"),
          loanBasisId:this.loanBasisId,
          //类型
          type:this.getType(this.relatedPersonnelInformationSpouseForm.type),
          //姓名
          name:relatedPersonnelInformationSpouseForm.name,
          //年龄
          age:relatedPersonnelInformationSpouseForm.age,
          //性别
          sex:relatedPersonnelInformationSpouseForm.sex,
          //户籍所在地
          domicile:relatedPersonnelInformationSpouseForm.domicile,
          //身份证号码
          identityNumber:relatedPersonnelInformationSpouseForm.identityNumber,
          //现居住地址
          currentHomeAddress:relatedPersonnelInformationSpouseForm.currentHomeAddress,
          //常用通信地址
          contactAddress:relatedPersonnelInformationSpouseForm.contactAddress,
          //本地居住时间
          localResidenceTime:relatedPersonnelInformationSpouseForm.localResidenceTime,
          //电子邮箱
          email:relatedPersonnelInformationSpouseForm.email,
          //联系电话
          contactNumber:relatedPersonnelInformationSpouseForm.contactNumber,
          qq:relatedPersonnelInformationSpouseForm.qq,
          //微信
          wechat:relatedPersonnelInformationSpouseForm.wechat,
          //文化程度
          educationalLevel:relatedPersonnelInformationSpouseForm.educationalLevel,
          //文化程度 其他
          educationalLevelValue:relatedPersonnelInformationSpouseForm.educationalLevelValue,
          //现住房来源
          currentHousingSource:relatedPersonnelInformationSpouseForm.currentHousingSource,
          //现住房来源其他值
          currentHousingSourceValue:relatedPersonnelInformationSpouseForm.currentHousingSourceValue,
          //工作单位
          employer:relatedPersonnelInformationSpouseForm.employer,
          //职务
          position:relatedPersonnelInformationSpouseForm.position,
          //单位工作年限
          unitWorkingYears:relatedPersonnelInformationSpouseForm.unitWorkingYears,
          //所投资或经营企业名称
          companyName:relatedPersonnelInformationSpouseForm.companyName,
          //持股比例
          shareholdingRatio:relatedPersonnelInformationSpouseForm.shareholdingRatio,
          //本行业和相近行业经营年限
          yearsOperation:relatedPersonnelInformationSpouseForm.yearsOperation,
          //资产情况（0、无）（1、有）
          assetSituation:relatedPersonnelInformationSpouseForm.assetSituation,
          //资产类型（1、房屋）（2、土地）（3、汽车）（4、有价证券）（5、其他）
          // assetType:relatedPersonnelInformationForm.assetType,
          //婚姻状况（0、未婚）（1、已婚）（2、离异未婚）（3、丧偶未婚）（4、其他）
          maritalStatus:'1',
          //原配偶姓名
          originalSpouseName:relatedPersonnelInformationSpouseForm.originalSpouseName,
          //离婚方式 （1、协议离婚）（2、协议离婚）
          divorceMethod:relatedPersonnelInformationSpouseForm.divorceMethod,
          //时间
          divorceTime:relatedPersonnelInformationSpouseForm.divorceTime,
          //房屋
          assetTypeHouses:relatedPersonnelInformationSpouseForm.assetTypeHouses,
          //土地信息
          assetTypeLand:relatedPersonnelInformationSpouseForm.assetTypeLand,
          //汽车信息
          assetTypeCar:relatedPersonnelInformationSpouseForm.assetTypeCar,
          //证券信息
          assetTypeSecurities:relatedPersonnelInformationSpouseForm.assetTypeSecurities,
          //其他
          assetTypeOther:relatedPersonnelInformationSpouseForm.assetTypeOther
        };
        return datas;
      },

      /**
       * 2、保存借款人情况下一步
       */
      saveBorrowerSubumit(type){
        this.$refs.relatedPersonnelInformationForm.validate((valid) => {
          if (valid) {
            this.$confirm('确认提交吗？', '提示', {}).then(() => {
              let relatedPersonnelInformationForm= this.relatedPersonnelInformationForm;
              //配偶信息
              let relatedPersonnelInformationSpouseForm = this.relatedPersonnelInformationSpouseForm;
              //资产类型数据组装
              this.assetTypeAppend();
              //资产类型数据组装 配偶
              console.log("assetTypeHouses:",relatedPersonnelInformationForm.assetTypeHouses);
              let datas = {
                id:relatedPersonnelInformationForm.id,
                loanBasisId:this.loanBasisId,
                //类型
                type:'1',
                //姓名
                name:relatedPersonnelInformationForm.name,
                //年龄
                age:relatedPersonnelInformationForm.age,
                //性别
                sex:relatedPersonnelInformationForm.sex,
                //户籍所在地
                domicile:relatedPersonnelInformationForm.domicile,
                //身份证号码
                identityNumber:relatedPersonnelInformationForm.identityNumber,
                //现居住地址
                currentHomeAddress:relatedPersonnelInformationForm.currentHomeAddress,
                //常用通信地址
                contactAddress:relatedPersonnelInformationForm.contactAddress,
                //本地居住时间
                localResidenceTime:relatedPersonnelInformationForm.localResidenceTime,
                //电子邮箱
                email:relatedPersonnelInformationForm.email,
                //联系电话
                contactNumber:relatedPersonnelInformationForm.contactNumber,
                qq:relatedPersonnelInformationForm.qq,
                //微信
                wechat:relatedPersonnelInformationForm.wechat,
                //文化程度
                educationalLevel:relatedPersonnelInformationForm.educationalLevel,
                //文化程度 其他
                educationalLevelValue:relatedPersonnelInformationForm.educationalLevelValue,
                //现住房来源
                currentHousingSource:relatedPersonnelInformationForm.currentHousingSource,
                //现住房来源其他值
                currentHousingSourceValue:relatedPersonnelInformationForm.currentHousingSourceValue,
                //工作单位
                employer:relatedPersonnelInformationForm.employer,
                //职务
                position:relatedPersonnelInformationForm.position,
                //单位工作年限
                unitWorkingYears:relatedPersonnelInformationForm.unitWorkingYears,
                //所投资或经营企业名称
                companyName:relatedPersonnelInformationForm.companyName,
                //持股比例
                shareholdingRatio:relatedPersonnelInformationForm.shareholdingRatio,
                //本行业和相近行业经营年限
                yearsOperation:relatedPersonnelInformationForm.yearsOperation,
                //资产情况（0、无）（1、有）
                assetSituation:relatedPersonnelInformationForm.assetSituation,
                //资产类型（1、房屋）（2、土地）（3、汽车）（4、有价证券）（5、其他）
                // assetType:relatedPersonnelInformationForm.assetType,
                //婚姻状况（0、未婚）（1、已婚）（2、离异未婚）（3、丧偶未婚）（4、其他）
                maritalStatus:relatedPersonnelInformationForm.maritalStatus,
                //原配偶姓名
                originalSpouseName:relatedPersonnelInformationForm.originalSpouseName,
                //离婚方式 （1、协议离婚）（2、协议离婚）
                divorceMethod:relatedPersonnelInformationForm.divorceMethod,
                //时间
                divorceTime:relatedPersonnelInformationForm.divorceTime,
                //房屋
                assetTypeHouses:relatedPersonnelInformationForm.assetTypeHouses,
                //土地信息
                assetTypeLand:relatedPersonnelInformationForm.assetTypeLand,
                //汽车信息
                assetTypeCar:relatedPersonnelInformationForm.assetTypeCar,
                //证券信息
                assetTypeSecurities:relatedPersonnelInformationForm.assetTypeSecurities,
                //其他
                assetTypeOther:relatedPersonnelInformationForm.assetTypeOther,
                //配偶信息
                spouseInfo : this.spouseAppend(),
                //家庭收支情况
                householdIncomeForm:this.householdIncomeForm,
                lastUpdateBy :sessionStorage.getItem("user")
              };
              console.log("datas:",datas);
              //this.relatedPersonnelInformationForm.loanBasisId = this.loanBasisId;
              // let params = Object.assign({}, this.relatedPersonnelInformationForm);
              this.$api.relatedPersonnel.save(datas).then((res) => {
                if(res.code == 200) {
                  this.maritalStatusFlag=false;
                  this.assetTypeFlag=false;
                  //清空list
                  this.clearTableDataList();
                  this.clearAssetType();
                  this.clearAssetSpouseType();
                  this.clearRelatedPersonnelInformationForm();
                  this.clearRelatedPersonnelInformationSpouseForm();
                  this.householdIncomeFormClear();
                  this.clearTableDataList();
                  this.active=type;
                  //显示列表
                  this.listRelevantPeopleFlag = true;
                  //隐藏添加
                  this.addRelevantPeopleFlag = false;
                  this.$message({ message: '操作成功', type: 'success' })
                } else {
                  this.active=1;
                  this.$message({message: '操作失败, ' + res.msg, type: 'error'})
                }
                this.$refs['relatedPersonnelInformationForm'].resetFields()
              })
            })
          }
        })
      },

      /**
       *  3、其他相关人 下一步
       */
      oterPersonnelNextStep(type){
        this.$refs.relatedOterPersonnelInformationForm.validate((valid) => {
          if (valid) {
            this.$confirm('确认提交吗？', '提示', {}).then(() => {
              let datas = {
                loanBasisId:this.loanBasisId,
                relatedPersonnelInformation:this.oterPersonneltableDataformationForm
              };
              console.log("datas:",datas);
              this.$api.oterRelatedPersonnel.save(datas).then((res) => {
                if(res.code == 200) {
                  //清空 资产类型选中
                  this.clearAssetType();
                  //清空 资产类型选中
                  this.clearAssetSpouseType();
                  this.active=type;
                  this.$message({ message: '操作成功', type: 'success' })
                } else {
                  this.active=1;
                  this.$message({message: '操作失败, ' + res.msg, type: 'error'})
                }
              })
            })
          }
        })
      },


      /**
       * 添加其他相关人
       */
      addOterPersonnelAsset(){
        //隐藏列表
        this.listRelevantPeopleFlag = false;
        //显示添加
        this.addRelevantPeopleFlag = true;
        //清空
        this.clearRelatedPersonnelInformationForm();
      },

      /**
       * 清空 其他相关人
       */
      clearRelatedPersonnelInformationForm(){
        //相关人员信息
        let relatedPersonnelInformationForm={
          loanBasisId:'',
          //类型
          type:[],
          //姓名
          name:'',
          //年龄
          age:'',
          //性别
          sex:'',
          //户籍所在地
          domicile:'',
          //身份证号码
          identityNumber:'',
          //现居住地址
          currentHomeAddress:'',
          //常用通信地址
          contactAddress:'',
          //本地居住时间
          localResidenceTime:'',
          //电子邮箱
          email:'',
          //联系电话
          contactNumber:'',
          qq:'',
          //微信
          wechat:'',
          //文化程度
          educationalLevel:'',
          //文化程度 其他
          educationalLevelValue:'',
          //现住房来源
          currentHousingSource:'',
          //现住房来源其他值
          currentHousingSourceValue:'',
          //工作单位
          employer:'',
          //职务
          position:'',
          //单位工作年限
          unitWorkingYears:'',
          //所投资或经营企业名称
          companyName:'',
          //持股比例
          shareholdingRatio:'',
          //本行业和相近行业经营年限
          yearsOperation:'',
          //资产情况（0、无）（1、有）
          assetSituation:'',
          //资产类型（1、房屋）（2、土地）（3、汽车）（4、有价证券）（5、其他）
          assetType:[],
          //婚姻状况（0、未婚）（1、已婚）（2、离异未婚）（3、丧偶未婚）（4、其他）
          maritalStatus:'',
          //原配偶姓名
          originalSpouseName:'',
          //离婚方式 （1、协议离婚）（2、协议离婚）
          divorceMethod:'',
          //时间
          divorceTime:'',

          //房屋信息
          assetTypeHouses:[],
          //土地信息
          assetTypeLand:[],
          //汽车信息
          assetTypeCar:[],
          //证券信息
          assetTypeSecurities:[],
          //其他
          assetTypeOther:[],
        };
        this.relatedPersonnelInformationForm = relatedPersonnelInformationForm;
      },

      /**
       * 清空 其他相关人
       */
      clearRelatedPersonnelInformationSpouseForm(){
        //相关人员信息
        let relatedPersonnelInformationSpouseForm={
          loanBasisId:'',
          //类型
          type:[],
          //姓名
          name:'',
          //年龄
          age:'',
          //性别
          sex:'',
          //户籍所在地
          domicile:'',
          //身份证号码
          identityNumber:'',
          //现居住地址
          currentHomeAddress:'',
          //常用通信地址
          contactAddress:'',
          //本地居住时间
          localResidenceTime:'',
          //电子邮箱
          email:'',
          //联系电话
          contactNumber:'',
          qq:'',
          //微信
          wechat:'',
          //文化程度
          educationalLevel:'',
          //文化程度 其他
          educationalLevelValue:'',
          //现住房来源
          currentHousingSource:'',
          //现住房来源其他值
          currentHousingSourceValue:'',
          //工作单位
          employer:'',
          //职务
          position:'',
          //单位工作年限
          unitWorkingYears:'',
          //所投资或经营企业名称
          companyName:'',
          //持股比例
          shareholdingRatio:'',
          //本行业和相近行业经营年限
          yearsOperation:'',
          //资产情况（0、无）（1、有）
          assetSituation:'',
          //资产类型（1、房屋）（2、土地）（3、汽车）（4、有价证券）（5、其他）
          assetType:[],
          //婚姻状况（0、未婚）（1、已婚）（2、离异未婚）（3、丧偶未婚）（4、其他）
          maritalStatus:'',
          //原配偶姓名
          originalSpouseName:'',
          //离婚方式 （1、协议离婚）（2、协议离婚）
          divorceMethod:'',
          //时间
          divorceTime:'',
          //房屋信息
          assetTypeHouses:[],
          //土地信息
          assetTypeLand:[],
          //汽车信息
          assetTypeCar:[],
          //证券信息
          assetTypeSecurities:[],
          //其他
          assetTypeOther:[],
        };
        this.relatedPersonnelInformationSpouseForm = relatedPersonnelInformationSpouseForm;
      },

      /**
       * 编辑其他相关人
       */
      handleHousAssetEdit: function (params) {
        console.log("assetTypeHouses:",params);
        this.addOterPersonnelAssetDialogVisible = true;
        this.operationOterPersonnel = false;
        this.assetTypeHouses = Object.assign({}, params)
      },

      /**
       * 删除其他相关人
       */
      removeHousAsset(idx){
        let assetTypeHousesTableData = this.assetTypeHousesTableData;
        let assetTypeHousesTableDataNew = [];
        if(assetTypeHousesTableData){
          for(let index in assetTypeHousesTableData){
            if(idx==Number(index)+1){
            }else{
              assetTypeHousesTableDataNew.push(assetTypeHousesTableData[index]);
            }
          }
          this.assetTypeHousesTableData= assetTypeHousesTableDataNew;
        }
      },


      /**
       * 添加房屋资产
       */
      addHousAsset(){
        this.propertyCertificateNumberFlag=false;
        this.deedNumberFlag=false;
        this.deedLandCertificateFlag = false;
        this.coOwnerNameFlag=false;
        this.clearAssetTypeHouses();
        this.addHousAssetDialogVisible = true;
        this.operation = true;
      },

      /**
       * 编辑房屋资产
       */
      handleHousAssetEdit: function (params) {
        console.log("assetTypeHouses:",params);
        this.addHousAssetDialogVisible = true;
        this.operation = false;
        this.assetTypeHouses = Object.assign({}, params)
      },

      /**
       * 删除房屋资产
       */
      removeHousAsset(idx){
        let assetTypeHousesTableData = this.assetTypeHousesTableData;
        let assetTypeHousesTableDataNew = [];
        if(assetTypeHousesTableData){
          for(let index in assetTypeHousesTableData){
            if(idx==Number(index)+1){
            }else{
              assetTypeHousesTableDataNew.push(assetTypeHousesTableData[index]);
            }
          }
          this.assetTypeHousesTableData= assetTypeHousesTableDataNew;
        }
      },

      /**
       * 添加房屋资产 配偶
       */
      addSpouseHousAsset(){
        this.propertyCertificateNumberFlag=false;
        this.deedNumberFlag=false;
        this.deedLandCertificateFlag = false;
        this.coOwnerNameFlag=false;
        this.clearAssetTypeHouses();
        this.addSpouseHousAssetDialogVisible = true;
        this.operationSpouse = true;
      },

      /**
       * 编辑房屋资产 配偶
       */
      handleSpouseHousAssetEdit: function (params) {
        this.coOwnerNameFlag=false;
        console.log("assetTypeHouses:",params);
        this.addSpouseHousAssetDialogVisible = true;
        this.operationSpouse = false;
        this.assetTypeHouses = Object.assign({}, params)
      },

      /**
       * 删除房屋资产 配偶
       */
      removeSpouseHousAsset(idx){
        let assetTypeHousesTableData = this.assetTypeSpouseHousesTableData;
        let assetTypeHousesTableDataNew = [];
        if(assetTypeHousesTableData){
          for(let index in assetTypeHousesTableData){
            if(idx==Number(index)+1){
            }else{
              assetTypeHousesTableDataNew.push(assetTypeHousesTableData[index]);
            }
          }
          this.assetTypeSpouseHousesTableData= assetTypeHousesTableDataNew;
        }
      },

      /**
       * 添加土地资产
       */
      addLandAsset(){
        this.propertyCertificateNumberFlag=false;
        this.deedNumberFlag=false;
        this.deedLandCertificateFlag = false;
        this.coOwnerNameFlag=false;
        this.clearAssetTypeLand();
        this.addLandAssetDialogVisible = true;
        this.operationLand = true;
      },

      /**
       * 编辑土地资产
       */
      handleLandAssetEdit: function (params) {
        console.log("assetTypeLand:",params);
        this.addLandAssetDialogVisible = true;
        this.operationLand = false;
        this.assetTypeLand = Object.assign({}, params)
      },

      /**
       * 删除土地资产
       */
      removeLandAsset(idx){
        let landTableData = this.landTableData;
        let assetTypeHousesTableDataNew = [];
        if(landTableData){
          for(let index in landTableData){
            if(idx==Number(index)+1){
            }else{
              assetTypeHousesTableDataNew.push(landTableData[index]);
            }
          }
          this.landTableData= assetTypeHousesTableDataNew;
        }
      },

      /**
       * 添加土地资产 配偶
       */
      addSpouseLandAsset(){
        this.propertyCertificateNumberFlag=false;
        this.deedNumberFlag=false;
        this.deedLandCertificateFlag = false;
        this.coOwnerNameFlag=false;
        this.clearAssetTypeLand();
        this.addSpouseLandAssetDialogVisible = true;
        this.operationSpouseLand = true;
      },

      /**
       * 编辑土地资产 配偶
       */
      handleSpouseLandAssetEdit: function (params) {
        console.log("assetTypeLand:",params);
        this.addSpouseLandAssetDialogVisible = true;
        this.operationSpouseLand = false;
        this.assetTypeLand = Object.assign({}, params)
      },

      /**
       * 删除土地资产 配偶
       */
      removeSpouseLandAsset(idx){
        let landTableData = this.spouseLandTableData;
        let assetTypeHousesTableDataNew = [];
        if(landTableData){
          for(let index in landTableData){
            if(idx==Number(index)+1){
            }else{
              assetTypeHousesTableDataNew.push(landTableData[index]);
            }
          }
          this.spouseLandTableData= assetTypeHousesTableDataNew;
        }
      },

      /**
       * 添加汽车资产
       */
      addCarAsset(){
        this.clearAssetTypeCar();
        this.addCarAssetDialogVisible = true;
        this.operationCar = true;
      },

      /**
       * 编辑汽车资产
       */
      handleCarAssetEdit: function (params) {
        console.log("assetTypeCar:",params);
        this.addCarAssetDialogVisible = true;
        this.operationCar = false;
        this.assetTypeCar = Object.assign({}, params)
      },

      /**
       * 删除汽车资产
       */
      removeCarAsset(idx){
        let landTableData = this.carTableData;
        let assetTypeHousesTableDataNew = [];
        if(landTableData){
          for(let index in landTableData){
            if(idx==Number(index)+1){
            }else{
              assetTypeHousesTableDataNew.push(landTableData[index]);
            }
          }
          this.carTableData= assetTypeHousesTableDataNew;
        }
      },

      /**
       * 添加汽车资产 配偶
       */
      addSpouseCarAsset(){
        this.clearAssetTypeCar();
        this.addSpouseCarAssetDialogVisible = true;
        this.operationSpouseCar = true;
      },

      /**
       * 编辑汽车资产 配偶
       */
      handleSpouseCarAssetEdit: function (params) {
        console.log("assetTypeCar:",params);
        this.addSpouseCarAssetDialogVisible = true;
        this.operationSpouseCar = true;
        this.assetTypeCar = Object.assign({}, params)
      },

      /**
       * 删除汽车资产 配偶
       */
      removeSpouseCarAsset(idx){
        let landTableData = this.spouseCarTableData;
        let assetTypeHousesTableDataNew = [];
        if(landTableData){
          for(let index in landTableData){
            if(idx==Number(index)+1){
            }else{
              assetTypeHousesTableDataNew.push(landTableData[index]);
            }
          }
          this.spouseCarTableData= assetTypeHousesTableDataNew;
        }
      },

      /**
       * 添加证券资产
       */
      addSecuritiesAsset(){
        this.clearAssetTypeSecurities();
        this.addSecuritiesAssetDialogVisible = true;
        this.operationSecurities = true;
      },

      /**
       * 编辑证券资产
       */
      handleSecuritiesAssetEdit: function (params) {
        console.log("assetTypeCar:",params);
        this.addSecuritiesAssetDialogVisible = true;
        this.operationSecurities = false;
        this.assetTypeSecurities = Object.assign({}, params)
      },

      /**
       * 删除证券资产
       */
      removeSecuritiesAsset(idx){
        let landTableData = this.securitiesTableData;
        let assetTypeHousesTableDataNew = [];
        if(landTableData){
          for(let index in landTableData){
            if(idx==Number(index)+1){
            }else{
              assetTypeHousesTableDataNew.push(landTableData[index]);
            }
          }
          this.securitiesTableData= assetTypeHousesTableDataNew;
        }
      },

      /**
       * 添加证券资产 配偶
       */
      addSpouseSecuritiesAsset(){
        this.clearAssetTypeSecurities();
        this.addSpouseSecuritiesAssetDialogVisible = true;
        this.operationSpouseSecurities = true;
      },

      /**
       * 编辑证券资产 配偶
       */
      handleSpouseSecuritiesAssetEdit: function (params) {
        console.log("assetTypeCar:",params);
        this.addSpouseSecuritiesAssetDialogVisible = true;
        this.operationSpouseSecurities = false;
        this.assetTypeSecurities = Object.assign({}, params)
      },

      /**
       * 删除证券资产 配偶
       */
      removeSpouseSecuritiesAsset(idx){
        let landTableData = this.spouseSecuritiesTableData;
        let assetTypeHousesTableDataNew = [];
        if(landTableData){
          for(let index in landTableData){
            if(idx==Number(index)+1){
            }else{
              assetTypeHousesTableDataNew.push(landTableData[index]);
            }
          }
          this.spouseSecuritiesTableData= assetTypeHousesTableDataNew;
        }
      },

      /**
       * 添加其他资产
       */
      addOtherAsset(){
        /* spouseAssetTypeHouses
      spouseAssetTypeLand
      spouseAssetTypeCar
      spouseAssetTypeSecurities
      spouseAssetTypeOther*/
        this.addOtherAssetDialogVisible = true;
        this.operationOther = true;
      },

      /**
       * 编辑其他资产
       */
      handleOtherAssetEdit: function (params) {
        console.log("assetTypeOther:",params);
        this.addOtherAssetDialogVisible = true;
        this.operationOther = true;
        this.assetTypeOther = Object.assign({}, params)
      },

      /**
       * 删除其他资产
       */
      removeOtherAsset(idx){
        let landTableData = this.otherTableData;
        let assetTypeHousesTableDataNew = [];
        if(landTableData){
          for(let index in landTableData){
            if(idx==Number(index)+1){
            }else{
              assetTypeHousesTableDataNew.push(landTableData[index]);
            }
          }
          this.otherTableData= assetTypeHousesTableDataNew;
        }
      },

      /**
       * 添加其他相关人
       */
      addOtherAsset(){
        this.addOtherAssetDialogVisible = true;
        this.operationOther = true;
      },

      /**
       * 编辑其他相关人
       */
      handleOtherPersonnelAssetEdit: function (params) {
        console.log("assetTypeOther:",params);
        this.addOtherAssetDialogVisible = true;
        this.operationOther = true;
        this.relatedOterPersonnelInformationForm = Object.assign({}, params)
      },

      /**
       * 删除其他相关人
       */
      removeOtherPersonnelAsset(idx){
        let landTableData = this.oterPersonneltableData;
        let assetTypeHousesTableDataNew = [];
        if(landTableData){
          for(let index in landTableData){
            if(idx==Number(index)+1){
            }else{
              assetTypeHousesTableDataNew.push(landTableData[index]);
            }
          }
          this.oterPersonneltableData= assetTypeHousesTableDataNew;
        }
      },

      /**
       * 添加其他资产 配偶
       */
      addSpouseOtherAsset(){
        //清空 其他相关人
        //this.clearRelatedPersonnelInformationSpouseForm();
        //清空家庭资产
        this.householdIncomeFormClear();
        this.addSpouseOtherAssetDialogVisible = true;
        this.operationSpouseOther = true;
      },

      /**
       * 编辑其他资产 配偶
       */
      handleSpouseOtherAssetEdit: function (params) {
        console.log("assetTypeOther:",params);
        this.addSpouseOtherAssetDialogVisible = true;
        this.operationSpouseOther = true;
        this.assetTypeOther = Object.assign({}, params)
      },

      /**
       * 删除其他资产 配偶
       */
      removeSpouseOtherAsset(idx){
        let landTableData = this.spouseOtherTableData;
        let assetTypeHousesTableDataNew = [];
        if(landTableData){
          for(let index in landTableData){
            if(idx==Number(index)+1){
            }else{
              assetTypeHousesTableDataNew.push(landTableData[index]);
            }
          }
          this.spouseOtherTableData= assetTypeHousesTableDataNew;
        }
      },

      /**
       * 获取资产情况 逗号组装
       */
      getAssetType(){
        let guaranteeMethod = this.loanBasisForm.guaranteeMethod;
        let guaranteeMethodValue = '';
        if(guaranteeMethod){
          let str = guaranteeMethod;
          if(typeof(guaranteeMethod)=='object'){
            for(let key in guaranteeMethod){
              //key是属性,object[key]是值
              guaranteeMethodValue+=guaranteeMethod[key]+',';
            }
          }else{
            let strs = str.split(',');
            for(let key in strs){
              //key是属性,object[key]是值
              guaranteeMethodValue+=strs[key]+',';
            }
          }
          guaranteeMethodValue=guaranteeMethodValue.substring(0,guaranteeMethodValue.length-1)
        }
        return guaranteeMethodValue;
      },

      /**
       * 获取担保方式 逗号组装
       */
      getGuaranteeMethod(){
        let guaranteeMethod = this.loanBasisForm.guaranteeMethod;
        let guaranteeMethodValue = '';
        if(guaranteeMethod){
          let str = guaranteeMethod;
          if(typeof(guaranteeMethod)=='object'){
            for(let key in guaranteeMethod){
              //key是属性,object[key]是值
              guaranteeMethodValue+=guaranteeMethod[key]+',';
            }
          }else{
            let strs = str.split(',');
            for(let key in strs){
              //key是属性,object[key]是值
              guaranteeMethodValue+=strs[key]+',';
            }
          }
          guaranteeMethodValue=guaranteeMethodValue.substring(0,guaranteeMethodValue.length-1)
        }
        return guaranteeMethodValue;
      },

      /**
       * 保存房屋资产
       */
      assetTypeHousesForm(){
        let assetTypeHousesTableData = this.assetTypeHousesTableData;
        let assetTypeHousesTableDataNew = [];
        let assetTypeHouses = this.assetTypeHouses;
        //let dataParams = {};
        if(assetTypeHouses){
          assetTypeHouses.whetherOwnershipCertificatess = this.getWhetherOwnershipCertificatesOptions(assetTypeHouses.whetherOwnershipCertificates);
          /*dataParams = {
            whetherOwnershipCertificatess:this.getWhetherOwnershipCertificatesOptions(assetTypeHouses.whetherOwnershipCertificates),
            propertyCertificateNumber:assetTypeHouses.propertyCertificateNumber,
            deed:assetTypeHouses.deed,
            landCertificate:assetTypeHouses.landCertificate,
            name:assetTypeHouses.name,
            constructionArea:assetTypeHouses.constructionArea,
            assetTypeHouses:assetTypeHouses
          };*/
        }
        if(assetTypeHousesTableData){
          for(let index in assetTypeHousesTableData){
            assetTypeHousesTableDataNew.push(assetTypeHousesTableData[index]);
          }
        }
        assetTypeHousesTableDataNew.push(assetTypeHouses);
        //赋值列表
        this.assetTypeHousesTableData = assetTypeHousesTableDataNew;
        //关闭弹窗
        this.addHousAssetDialogVisible = false;
      },

      /**
       * 保存房屋资产 配偶
       */
      assetTypeSpouseHousesForm(){
        let assetTypeHousesTableData = this.assetTypeSpouseHousesTableData;
        let assetTypeHousesTableDataNew = [];
        let assetTypeHouses = this.spouseAssetTypeHouses;
        console.log("spouseAssetTypeHouses:",assetTypeHouses);
        //let dataParams = {};
        if(assetTypeHouses){
          assetTypeHouses.whetherOwnershipCertificatess = this.getWhetherOwnershipCertificatesOptions(assetTypeHouses.whetherOwnershipCertificates);
          /*  dataParams = {
          whetherOwnershipCertificatess:this.getWhetherOwnershipCertificatesOptions(assetTypeHouses.whetherOwnershipCertificates),
          propertyCertificateNumber:assetTypeHouses.propertyCertificateNumber,
          deed:assetTypeHouses.deed,
          landCertificate:assetTypeHouses.landCertificate,
          name:assetTypeHouses.name,
          constructionArea:assetTypeHouses.constructionArea,
          assetTypeHouses:assetTypeHouses
        };*/
        }
        if(assetTypeHousesTableData){
          for(let index in assetTypeHousesTableData){
            assetTypeHousesTableDataNew.push(assetTypeHousesTableData[index]);
          }
        }
        assetTypeHousesTableDataNew.push(assetTypeHouses);
        //赋值列表
        this.assetTypeSpouseHousesTableData = assetTypeHousesTableDataNew;
        //关闭弹窗
        this.addSpouseHousAssetDialogVisible = false;
        this.clearSpouseAssetTypeHouses();
      },

      /**
       * 是否不动产权证 中文
       */
      getWhetherOwnershipCertificatesOptions(value){
        let name='';
        let whetherOwnershipCertificatesOptions = this.WhetherOwnershipCertificatesOptions;
        for(let index in whetherOwnershipCertificatesOptions){
          let data = whetherOwnershipCertificatesOptions[index];
          if(data.VAL_CODE==value){
            name=data.VAL_NAME;
            break;
          }
        }
        return name;
      },

      /**
       * 保存土地资产
       */
      assetTypeLandForm(){
        let assetTypeHousesTableData = this.landTableData;
        let assetTypeHousesTableDataNew = [];
        let assetTypeLand = this.assetTypeLand;
        /*let dataParams = {};*/
        /* if(assetTypeLand){
        dataParams = {
          landCertificate:assetTypeLand.landCertificate,
          name:assetTypeLand.name,
          address:assetTypeLand.address,
          constructionArea:assetTypeLand.constructionArea,
          assetTypeLand:assetTypeLand
        };
      }*/
        if(assetTypeHousesTableData){
          for(let index in assetTypeHousesTableData){
            assetTypeHousesTableDataNew.push(assetTypeHousesTableData[index]);
          }
        }
        assetTypeHousesTableDataNew.push(assetTypeLand);
        //赋值列表
        this.landTableData = assetTypeHousesTableDataNew;
        //关闭弹窗
        this.addLandAssetDialogVisible = false;
      },

      /**
       * 保存土地资产 配偶
       */
      assetTypeSpouseLandForm(){
        let assetTypeHousesTableData = this.spouseLandTableData;
        let assetTypeHousesTableDataNew = [];
        let assetTypeLand = this.spouseAssetTypeLand;
        console.log("spouseAssetTypeLand:",assetTypeLand);
        /* let dataParams = {};
      if(assetTypeLand){
        dataParams = {
          landCertificate:assetTypeLand.landCertificate,
          name:assetTypeLand.name,
          address:assetTypeLand.address,
          constructionArea:assetTypeLand.constructionArea,
          assetTypeLand:assetTypeLand
        };
      }*/
        if(assetTypeHousesTableData){
          for(let index in assetTypeHousesTableData){
            assetTypeHousesTableDataNew.push(assetTypeHousesTableData[index]);
          }
        }
        assetTypeHousesTableDataNew.push(assetTypeLand);
        //赋值列表
        this.spouseLandTableData = assetTypeHousesTableDataNew;
        //关闭弹窗
        this.addSpouseLandAssetDialogVisible = false;
        this.clearSpouseAssetTypeLand();
      },

      /**
       * 保存汽车资产
       */
      assetTypeCarForm(){
        let assetTypeHousesTableData = this.carTableData;
        let assetTypeHousesTableDataNew = [];
        let assetTypeCar = this.assetTypeCar;
        let dataParams = {};
        if(assetTypeCar){
          dataParams = {
            brand:assetTypeCar.brand,
            value:assetTypeCar.value,
            numberPlate:assetTypeCar.numberPlate,
            drivingLicenseNumber:assetTypeCar.drivingLicenseNumber,
            assetTypeCar:assetTypeCar
          };
        }
        if(assetTypeHousesTableData){
          for(let index in assetTypeHousesTableData){
            assetTypeHousesTableDataNew.push(assetTypeHousesTableData[index]);
          }
        }
        assetTypeHousesTableDataNew.push(dataParams);
        //赋值列表
        this.carTableData = assetTypeHousesTableDataNew;
        //关闭弹窗
        this.addCarAssetDialogVisible = false;
      },

      /**
       * 保存汽车资产 配偶
       */
      assetTypeSpouseCarForm(){
        let assetTypeHousesTableData = this.spouseCarTableData;
        let assetTypeHousesTableDataNew = [];
        let assetTypeCar = this.spouseAssetTypeCar;
        let dataParams = {};
        if(assetTypeCar){
          dataParams = {
            brand:assetTypeCar.brand,
            value:assetTypeCar.value,
            numberPlate:assetTypeCar.numberPlate,
            drivingLicenseNumber:assetTypeCar.drivingLicenseNumber,
            assetTypeCar:assetTypeCar
          };
        }
        if(assetTypeHousesTableData){
          for(let index in assetTypeHousesTableData){
            assetTypeHousesTableDataNew.push(assetTypeHousesTableData[index]);
          }
        }
        assetTypeHousesTableDataNew.push(dataParams);
        //赋值列表
        this.spouseCarTableData = assetTypeHousesTableDataNew;
        //关闭弹窗
        this.addSpouseCarAssetDialogVisible = false;
        this.clearSpouseAssetTypeCar();
      },

      /**
       * 保存证券资产
       */
      assetTypeSecuritiesForm(){
        let assetTypeHousesTableData = this.securitiesTableData;
        let assetTypeHousesTableDataNew = [];
        let assetTypeSecurities = this.assetTypeSecurities;
        let dataParams = {};
        if(assetTypeSecurities){
          dataParams = {
            types:this.getSecuritiesOptions(assetTypeSecurities.type),
            value:assetTypeSecurities.value,
            type:assetTypeSecurities.type,
            createBy :sessionStorage.getItem("user"),
            assetTypeSecurities:assetTypeSecurities
          };
        }
        if(assetTypeHousesTableData){
          for(let index in assetTypeHousesTableData){
            assetTypeHousesTableDataNew.push(assetTypeHousesTableData[index]);
          }
        }
        assetTypeHousesTableDataNew.push(dataParams);
        //赋值列表
        this.securitiesTableData = assetTypeHousesTableDataNew;
        //关闭弹窗
        this.addSecuritiesAssetDialogVisible = false;
      },

      /**
       * 保存证券资产 配偶
       */
      assetTypeSpouseSecuritiesForm(){
        let assetTypeHousesTableData = this.spouseSecuritiesTableData;
        let assetTypeHousesTableDataNew = [];
        let assetTypeSecurities = this.spouseAssetTypeSecurities;
        let dataParams = {};
        if(assetTypeSecurities){
          dataParams = {
            type:this.getSecuritiesOptions(assetTypeSecurities.type),
            value:assetTypeSecurities.value,
            assetTypeSecurities:assetTypeSecurities
          };
        }
        if(assetTypeHousesTableData){
          for(let index in assetTypeHousesTableData){
            assetTypeHousesTableDataNew.push(assetTypeHousesTableData[index]);
          }
        }
        assetTypeHousesTableDataNew.push(dataParams);
        //赋值列表
        this.spouseSecuritiesTableData = assetTypeHousesTableDataNew;
        //关闭弹窗
        this.addSpouseSecuritiesAssetDialogVisible = false;
        this.clearSpouseAssetTypeSecurities();
      },

      /**
       * 证券类型 中文
       */
      getSecuritiesOptions(value){
        let name='';
        let securitiesTypeOptions = this.SecuritiesTypeOptions;
        for(let index in securitiesTypeOptions){
          let data = securitiesTypeOptions[index];
          if(data.VAL_CODE==value){
            name=data.VAL_NAME;
            break;
          }
        }
        return name;
      },

      /**
       * 保存其他资产
       */
      assetTypeOtherForm(){
        let assetTypeHousesTableData = this.otherTableData;
        let assetTypeHousesTableDataNew = [];
        let assetTypeOther = this.assetTypeOther;
        let dataParams = {};
        if(assetTypeOther){
          dataParams = {
            assetName:assetTypeOther.assetName,
            value:assetTypeOther.value,
            assetTypeOther:assetTypeOther
          };
        }
        if(assetTypeHousesTableData){
          for(let index in assetTypeHousesTableData){
            assetTypeHousesTableDataNew.push(assetTypeHousesTableData[index]);
          }
        }
        assetTypeHousesTableDataNew.push(dataParams);
        //赋值列表
        this.otherTableData = assetTypeHousesTableDataNew;
        //关闭弹窗
        this.addOtherAssetDialogVisible = false;
        this.clearAssetTypeOther();
      },

      /**
       * 保存其他资产 配偶
       */
      assetTypeSpouseOtherForm(){
        let assetTypeHousesTableData = this.spouseOtherTableData;
        let assetTypeHousesTableDataNew = [];
        let assetTypeOther = this.spouseAssetTypeOther;
        let dataParams = {};
        if(assetTypeOther){
          dataParams = {
            assetName:assetTypeOther.assetName,
            value:assetTypeOther.value,
            assetTypeOther:assetTypeOther
          };
        }
        if(assetTypeHousesTableData){
          for(let index in assetTypeHousesTableData){
            assetTypeHousesTableDataNew.push(assetTypeHousesTableData[index]);
          }
        }
        /*  console.log("dataParams:",dataParams);
      console.log(" assetTypeHousesTableDataNew:", assetTypeHousesTableDataNew);*/
        assetTypeHousesTableDataNew.push(dataParams);
        //赋值列表
        this.spouseOtherTableData = assetTypeHousesTableDataNew;
        //关闭弹窗
        this.addSpouseOtherAssetDialogVisible = false;
        this.clearSpouseAssetTypeOther();
      },

      assetTypeOterPersonnelForm: function () {
        this.$refs.relatedPersonnelInformationForm.validate((valid) => {
          if (valid) {
            let assetTypeHousesTableData = this.oterPersonneltableData;
            let assetTypeHousesTableDataNew = [];
            let relatedPersonnelInformationForm = this.relatedPersonnelInformationForm;
            let dataParams = {};
            if (relatedPersonnelInformationForm) {
              /*//资产类型数据组装
            this.assetTypeAppend();
            //家庭收支情况
            relatedPersonnelInformationForm.householdIncomeForm = this.householdIncomeForm;
            //类型BORROWER(1, "借款人本人"), BORROWER_COUPLE(2, "借款人配偶"), MORTGAGE_GUARANTOR(3, "抵押担保人"),GUARANTOR(4, "保证担保人"), GUARANTOR_BOTH(5, "抵押担保人、保证担保人");
            relatedPersonnelInformationForm.type=this.getType(this.relatedPersonnelInformationForm.type);
            dataParams = {
              name:relatedPersonnelInformationForm.name,
              identityNumber:relatedPersonnelInformationForm.identityNumber,
              age:relatedPersonnelInformationForm.age,
              relatedPersonnelInformationForm:relatedPersonnelInformationForm
            };*/
              let relatedPersonnelInformationForm = this.relatedPersonnelInformationForm;
              //配偶信息
              let relatedPersonnelInformationSpouseForm = this.relatedPersonnelInformationSpouseForm;
              console.log("relatedPersonnelInformationSpouseForm:", relatedPersonnelInformationSpouseForm);
              //资产类型数据组装
              this.assetTypeAppend();
              //资产类型数据组装 配偶
              let datas = {
                loanBasisId: this.loanBasisId,
                //类型
                type: this.getType(relatedPersonnelInformationForm.type),
                //姓名
                name: relatedPersonnelInformationForm.name,
                //年龄
                age: relatedPersonnelInformationForm.age,
                //性别
                sex: relatedPersonnelInformationForm.sex,
                //户籍所在地
                domicile: relatedPersonnelInformationForm.domicile,
                //身份证号码
                identityNumber: relatedPersonnelInformationForm.identityNumber,
                //现居住地址
                currentHomeAddress: relatedPersonnelInformationForm.currentHomeAddress,
                //常用通信地址
                contactAddress: relatedPersonnelInformationForm.contactAddress,
                //本地居住时间
                localResidenceTime: relatedPersonnelInformationForm.localResidenceTime,
                //电子邮箱
                email: relatedPersonnelInformationForm.email,
                //联系电话
                contactNumber: relatedPersonnelInformationForm.contactNumber,
                qq: relatedPersonnelInformationForm.qq,
                //微信
                wechat: relatedPersonnelInformationForm.wechat,
                //文化程度
                educationalLevel: relatedPersonnelInformationForm.educationalLevel,
                //文化程度 其他
                educationalLevelValue: relatedPersonnelInformationForm.educationalLevelValue,
                //现住房来源
                currentHousingSource: relatedPersonnelInformationForm.currentHousingSource,
                //现住房来源其他值
                currentHousingSourceValue: relatedPersonnelInformationForm.currentHousingSourceValue,
                //工作单位
                employer: relatedPersonnelInformationForm.employer,
                //职务
                position: relatedPersonnelInformationForm.position,
                //单位工作年限
                unitWorkingYears: relatedPersonnelInformationForm.unitWorkingYears,
                //所投资或经营企业名称
                companyName: relatedPersonnelInformationForm.companyName,
                //持股比例
                shareholdingRatio: relatedPersonnelInformationForm.shareholdingRatio,
                //本行业和相近行业经营年限
                yearsOperation: relatedPersonnelInformationForm.yearsOperation,
                //资产情况（0、无）（1、有）
                assetSituation: relatedPersonnelInformationForm.assetSituation,
                //资产类型（1、房屋）（2、土地）（3、汽车）（4、有价证券）（5、其他）
                // assetType:relatedPersonnelInformationForm.assetType,
                //婚姻状况（0、未婚）（1、已婚）（2、离异未婚）（3、丧偶未婚）（4、其他）
                maritalStatus: relatedPersonnelInformationForm.maritalStatus,
                //原配偶姓名
                originalSpouseName: relatedPersonnelInformationForm.originalSpouseName,
                //离婚方式 （1、协议离婚）（2、协议离婚）
                divorceMethod: relatedPersonnelInformationForm.divorceMethod,
                //时间
                divorceTime: relatedPersonnelInformationForm.divorceTime,
                //房屋
                assetTypeHouses: relatedPersonnelInformationForm.assetTypeHouses,
                //土地信息
                assetTypeLand: relatedPersonnelInformationForm.assetTypeLand,
                //汽车信息
                assetTypeCar: relatedPersonnelInformationForm.assetTypeCar,
                //证券信息
                assetTypeSecurities: relatedPersonnelInformationForm.assetTypeSecurities,
                //其他
                assetTypeOther: relatedPersonnelInformationForm.assetTypeOther,
                //配偶信息
                spouseInfo: this.spouseAppend(),
                //家庭收支情况
                householdIncomeForm: this.householdIncomeForm,
                createBy: sessionStorage.getItem("user")
              };
              dataParams = {
                name: relatedPersonnelInformationForm.name,
                identityNumber: relatedPersonnelInformationForm.identityNumber,
                age: relatedPersonnelInformationForm.age,
                relatedPersonnelInformationForm: datas
              };
              console.log("datas:", datas);
              this.oterPersonneltableDataformationForm.push(datas);
            }
            if (assetTypeHousesTableData) {
              for (let index in assetTypeHousesTableData) {
                assetTypeHousesTableDataNew.push(assetTypeHousesTableData[index]);
              }
            }
            assetTypeHousesTableDataNew.push(dataParams);
            //赋值列表
            this.oterPersonneltableData = assetTypeHousesTableDataNew;
            console.log("assetTypeHousesTableDataNew:", assetTypeHousesTableDataNew);
            console.log("oterPersonneltableData:", this.oterPersonneltableData);
            //隐藏添加页面
            this.addRelevantPeopleFlag = false;
            //显示列表
            this.listRelevantPeopleFlag = true;

            this.clearAssetType();
            this.clearAssetSpouseType();
            this.assetTypeFlag = false;
            //婚姻状况
            this.maritalStatusFlag = false;
            //已婚
            this.maritalStatusMarriedFlag = false;
            //离异
            this.maritalStatusDivorcedFlag = false;
            //丧偶
            this.maritalStatusWidowedFlag = false;
            //其他
            this.maritalStatusOtherFlag = false;
            //清空list
            this.clearTableDataList();
            //资产类型
            this.assetTypeFlagSpouse = false;
            //清空 其他相关人
            this.clearRelatedPersonnelInformationSpouseForm();
            //清空家庭资产
            this.householdIncomeFormClear();
          }
        })

      },

      /**
       * 获取其他相关人类型
       * 类型BORROWER(1, "借款人本人"), BORROWER_COUPLE(2, "借款人配偶"), MORTGAGE_GUARANTOR(3, "抵押担保人"),GUARANTOR(4, "保证担保人"), GUARANTOR_BOTH(5, "抵押担保人、保证担保人");
       */
      getType(typValue){
        let typeValue ='';
        let values ='';
        let type = typValue;
        if(type){
          if(typeof(type)=='object'){
            for(let key in type){
              //key是属性,object[key]是值
              values+=type[key]+',';
            }
          }else{
            let strs = type.split(',');
            for(let key in strs){
              //key是属性,object[key]是值
              values+=strs[key]+',';
            }
          }
          if(values !='') {
            if (values.indexOf('1') != -1 && values.indexOf('2') != -1) {
              typeValue = '5';
            } else if (values.indexOf('1') != -1) {
              typeValue = '3';
            } else if (values.indexOf('2') != -1) {
              typeValue = '4';
            }
          }else{
            typeValue = '2';
          }
        }
        return typeValue;
      },

      /**
       * 返回
       */
      previous(){
        this.active=0;
      },

      /**
       * 进度条状态切换
       */
      stepClick(value){
        if(this.currentStaatus<value){
          this.$message({message: '当前订单环节不可以切换,只允许一步一步做下去 ', type: 'error'})
            return ;
        }
        this.active=value;
        this.getData(value,this.loanBasisId);
      },

      /**
       * 文化程度
       */
      educationaLevelChange(value){
        this.educationalLevelFlag=false;
        if(value=='5'){
          this.educationalLevelFlag=true;
        }
      },

      /**
       *  现住房来源
       */
      currentHousingSourceChange(value){
        this.currentHousingSourceFlag=false;
        if(value=='5'){
          this.currentHousingSourceFlag=true;
        }
      },


      /**
       * 资产情况
       * @param value
       */
      assetSituationChange(value){
        this.assetTypeFlag=false;
        this.relatedPersonnelInformationForm.assetType=[];
        if(value=='1'){
          this.assetTypeFlag=true;
        }else{
          //无的时候清空
          this.clearAssetType();
        }
      },

      /**
       * 资产情况 配偶
       * @param value
       */
      assetSituationSpouseChange(value){
        this.relatedPersonnelInformationSpouseForm.assetType=[]
        this.assetTypeFlagSpouse=false;
        if(value=='1'){
          this.assetTypeFlagSpouse=true;
        }else{
          //无的时候清空
          this.clearAssetSpouseType();
        }
      },



      /**
       * 是否不动产权证
       * @param value
       */
      whetherOwnershipCertificatesChange(value){
        this.propertyCertificateNumberFlag=false;
        this.deedLandCertificateFlag=false;
        this.deedNumberFlag=false;
        //不动产权证
        if(value=='1'){
          this.propertyCertificateNumberFlag=true;
          this.pawn.landCertificateNumber = '';
          this.pawn.propertyCertificateNumber = '';
        }else {
          this.pawn.propertyCertificateNumber='';
          this.deedNumberFlag=true;
          this.deedLandCertificateFlag=true;
        }
      },

      /**
       * 是否不动产权证 抵押物
       * @param value
       */
      whetherOwnershipCertificatesPawnChange(value){
        this.propertyCertificateNumberFlag=false;
        this.deedLandCertificateFlag=false;
        this.deedNumberFlag=false;
        //不动产权证
        if(value=='0'){
          this.propertyCertificateNumberFlag=true;
          this.pawn.landCertificateNumber = '';
          this.pawn.propertyCertificateNumber = '';
        }else {
          this.pawn.propertyCertificateNumber='';
          this.deedNumberFlag=true;
          this.deedLandCertificateFlag=true;
        }
      },



      /**
       *  是否有共同人
       */
      whetherCoownerChange(value){
        this.coOwnerNameFlag = false;
        if(value=='1'){
          this.coOwnerNameFlag = true;
        }
      },

      /**
       *  清空 资产类型选中
       * @param data
       */
      clearAssetType(){
        this.housFlag=false;
        this.landFlag=false;
        this.carFlag=false;
        this.securitiesFlag=false;
        this.otherFlag=false;
      },

      /**
       *  清空 资产类型选中
       * @param data
       */
      clearAssetSpouseType(){
        //其他资产 配偶
        this.otherSpouseFlag =false;
        //证券标记 配偶
        this.securitiesSpouseFlag=false;
        //汽车标记 配偶
        this.carSpouseFlag=false;
        //房屋标记 配偶
        this.housSpouseFlag=false;
        //土地标记 配偶
        this.landSpouseFlag=false;
      },

      /**
       * 资产类型选中
       * @param data
       */
      checkedChange(data){
        this.clearAssetType();
        let assetTypeVal = this.relatedPersonnelInformationForm.assetType;
        if(assetTypeVal==''){
          this.housFlag=false;
          return;
        }
        for(let index in assetTypeVal){
          let value= assetTypeVal[index];
          if(value=='1'){//房产
            this.housFlag=true;
          }else if(value=='2'){//土地
            this.landFlag = true;
          }else if(value=='3'){//汽车
            this.carFlag = true;
          }else  if(value=='4'){//证券
            this.securitiesFlag=true;
          }else if(value=='5'){//其他
            this.otherFlag = true
          }
        }
      },

      /**
       * 贷款方式为抵（质）押担保
       * @param data
       */
      loanMethodPledgeGuaranteeChange(value){
        if(value){
          this.personalLoanSurveyReport.loanMethodPledgeGuarantee='1';
        }else{
          this.personalLoanSurveyReport.loanMethodPledgeGuarantee='0';
        }
      },

      /**
       * 贷款方式为保证担保
       * @param data
       */
      loanAethodGuaranteeChange(value){
        if(value){
          this.personalLoanSurveyReport.loanAethodGuarantee='1';
        }else{
          this.personalLoanSurveyReport.loanAethodGuarantee='0';
        }
      },



      /**
       * 资产类型选中配偶
       * @param data
       */
      checkedSpouseChange(data){
        this.housSpouseFlag=false;
        this.landSpouseFlag=false;
        this.carSpouseFlag=false;
        this.securitiesSpouseFlag=false;
        this.otherSpouseFlag=false;
        let assetTypeVal = this.relatedPersonnelInformationSpouseForm.assetType;
        if(assetTypeVal==''){
          this.housSpouseFlag=false;
          return;
        }
        for(let index in assetTypeVal){
          let value= assetTypeVal[index];
          if(value=='1'){//房产
            this.housSpouseFlag=true;
          }else if(value=='2'){//土地
            this.landSpouseFlag = true;
          }else if(value=='3'){//汽车
            this.carSpouseFlag = true;
          }else  if(value=='4'){//证券
            this.securitiesSpouseFlag=true;
          }else if(value=='5'){//其他
            this.otherSpouseFlag = true
          }
        }
      },

      /**
       * 婚姻状况
       * @param value
       */
      maritalStatusChange(value){
        //婚姻状况
        this.maritalStatusFlag = false;
        //已婚
        this.maritalStatusMarriedFlag=false;
        //离异
        this.maritalStatusDivorcedFlag=false;
        //丧偶
        this.maritalStatusWidowedFlag=false;
        //其他
        this.maritalStatusOtherFlag=false;
        if(value=='1' || value=='2' || value=='3' || value=='4'){
          //婚姻状况
          this.maritalStatusFlag = true;
        }
        if(value=='1'){
          this.maritalStatusMarriedFlag=true;
        }else if(value=='2'){
          this.maritalStatusDivorcedFlag=true;
        }else if(value=='3'){
          this.maritalStatusWidowedFlag=true;
        }else if(value=='4'){
          this.maritalStatusOtherFlag=true;
        }

      },

      /**
       *  新增抵押物
       * @param value
       */
      addPawn(){
        this.clearPawn();
        this.pawnListFlag=false;
        this.pawnAddFlag=true;
        this.whetherOwnershipCertificatesFlag=false;
        this.propertyCertificateNumberFlag=false;
        this.deedNumberFlag=false;
        this.deedLandCertificateFlag=false;
        this.coOwnerNameFlag=false;
      },

      /**
       * 修改抵押物
       */
      assetTypePawnFormEdit(index,params){
        let assetTypePawnTableData = this.pawnTableData;
        let assetTypeHousesTableDataNew = [];
        if(assetTypePawnTableData){
          for(let index in assetTypePawnTableData){
            if(idx==Number(index)+1){
              assetTypePawnTableData[index] = params;
            }
          }
          this.pawnTableData= assetTypePawnTableData;
        }
        //抵押物列表标记
        this.addPawnEditDialogVisible = false;
      },

      /**
       * 保存抵押物
       */
      assetTypePawnForm(){
        let assetTypeHousesTableData = this.pawnTableData;
        let assetTypeHousesTableDataNew = [];
        let pawn = this.pawn;
        let dataParams = {};
        pawn.loanBasisId = this.loanBasisId;
        pawn.createBy = sessionStorage.getItem("user");
        if(pawn){
          dataParams = {
            mortgageTypes:this.getMortgageType(pawn.mortgageType),
            landNatures:this.getLandNatures(pawn.landNature),
            collateralName:pawn.collateralName,
            collateralDeposit:pawn.collateralDeposit,
            value:pawn.value,
            pawn:pawn
          };
        }
        console.log("dataParams:",dataParams);
        if(assetTypeHousesTableData){
          for(let index in assetTypeHousesTableData){
            assetTypeHousesTableDataNew.push(assetTypeHousesTableData[index]);
          }
        }
        assetTypeHousesTableDataNew.push(dataParams);
        //赋值列表
        this.pawnTableData = assetTypeHousesTableDataNew;
        //抵押物列表标记
        this.pawnListFlag = true;
        //抵押物添加
        this.pawnAddFlag=false;
      },

      /**
       * 获取抵押物类型
       */
      getMortgageType(value){
        let mortgageTypeValue ='';
        let mortgageTypeOptions = this.MortgageTypeOptions;
        for(let index in mortgageTypeOptions){
          let data = mortgageTypeOptions[index];
          if(data.VAL_CODE==value){
            mortgageTypeValue=data.VAL_NAME;
          }
        }
        return mortgageTypeValue;
      },

      /**
       * 获取抵押物类型
       */
      getLandNatures(value){
        let mortgageTypeValue ='';
        let mortgageTypeOptions = this.LandNatureOptions;
        for(let index in mortgageTypeOptions){
          let data = mortgageTypeOptions[index];
          if(data.VAL_CODE==value){
            mortgageTypeValue=data.VAL_NAME;
          }
        }
        return mortgageTypeValue;
      },

      /**
       * 编辑抵押物
       */
      handlePawnEdit: function (params) {
        console.log("pawn:",params);
        this.addPawnEditDialogVisible = true;
        this.operationPawn = false;
        this.pawn = Object.assign({}, params)
      },

      /**
       * 删除抵押物
       */
      removePawnAsset(idx){
        let assetTypePawnTableData = this.pawnTableData;
        let assetTypeHousesTableDataNew = [];
        if(assetTypePawnTableData){
          for(let index in assetTypePawnTableData){
            if(idx==Number(index)+1){
            }else{
              assetTypeHousesTableDataNew.push(assetTypePawnTableData[index]);
            }
          }
          this.pawnTableData= assetTypeHousesTableDataNew;
        }
      },

      /**
       *  保存抵押物
       */
      savePawnNextStep(type){
        this.$refs.pawn.validate((valid) => {
          if (valid) {
            this.$confirm('确认提交吗？', '提示', {}).then(() => {
              let datas = {
                pawn:this.getPawnParams(),
                loanBasisId:this.loanBasisId
              };
              console.log("datas:",datas);
              let params = Object.assign({}, datas)
              console.log("params:",params);
              this.$api.pawn.save(params).then((res) => {
                if(res.code == 200) {
                  this.active=type;
                  this.$message({ message: '操作成功', type: 'success' })
                } else {
                  this.$message({message: '操作失败, ' + res.msg, type: 'error'})
                }
                this.$refs['pawn'].resetFields()
              })
            })
          }
        })
      },

      /**
       * 抵押物数据拼接
       */
      getPawnParams(){
        let pawnTableDataNew = [];
        let pawnTableData = this.pawnTableData;
        if (pawnTableData){
          for(let index in pawnTableData){
            let data = pawnTableData[index];
            pawnTableDataNew.push(data.pawn);
          }
        }
        return pawnTableDataNew;
      },

      /**
       * 选择资产
       */
      selectAssets(){
        this.addPawnDialogVisible=true;
        this.operationPawn=true;
        let dataParams = {
          loanBasisId:this.loanBasisId
        };
        let params = Object.assign({}, dataParams)
        api.loan.findByBaseIdList(params).then((res) => {
          this.assetsTableData=[];
          if(res.code=='200'){
            this.setAssetsTableData(res.data);
            //this.assetsTableData = res.data;
          }
        })
      },

      /**
       *相关人员数据设置
       */
      setAssetsTableData(dataList){
        if(dataList){
          let assetsTableDataNew = [];
          for(let index in dataList){
            let dataNew ={};
            let data = dataList[index];
            let typeName ='';
            if(data.type=='1'){
              typeName='借款人本人';
            }else if(data.type=='2'){
              typeName='借款人配偶';
            }else if(data.type=='3'){
              typeName='抵押担保人';
            }else if(data.type=='4'){
              typeName='保证担保人';
            }else if(data.type=='5'){
              typeName='抵押担保人、保证担保人';
            }else{
              typeName='无';
            }
            dataNew.borrowerRelationship = typeName;
            let sexName ='';
            if(data.sex =='0'){
              sexName='男';
            }else if(data.sex =='1'){
              sexName='女';
            }else {
              sexName='无';
            }
            dataNew.sexName = sexName;
            let spouse ='无';
            if(!this.isNull(data.spouse)){
              spouse=data.spouse;
            }
            dataNew.spouse = spouse;
            dataNew.name = data.name;
            dataNew.id = data.id;
            assetsTableDataNew.push(dataNew);
          }
          this.assetsTableData = assetsTableDataNew;
        }
      },

      /**
       *相关人员选择
       */
      handleSelectionChange(val){
        this.multipleSelection = val;
      },

      /**
       * 选择
       */
      selectSubmit() {
        this.pawn.pawnPersonnelMapping=[];
        let multipleSelection =  this.multipleSelection;
        let stars ="";
        if(multipleSelection){
          for(let index in multipleSelection){
            let data = multipleSelection[index];
            stars+=data.name+',';
            this.pawn.pawnPersonnelMapping.push({'rpiId':data.id});
          }
        }
        this.pawn.groups = stars;
        //关闭当前窗口
        this.closeAddPawnDialogVisible();
      },

      /**
       * 关闭相关人员
       */
      closeAddPawnDialogVisible(){
        this.addPawnDialogVisible=false;
      },

      /**
       *  新增交易对手
       */
      addCounterparty(){
        this.clearCounterpartyInformation();
        this.addCounterpartyDialogVisible=true;
      },

      /**
       * 编辑交易对手
       */
      handleCounterpartyEdit: function (params) {
        console.log("pawn:",params);
        this.addCounterpartyDialogVisible = true;
        this.operationCounterparty = false;
        this.counterpartyInformation = Object.assign({}, params)
      },

      /**
       * 删除交易对手
       */
      removeCounterpartyAsset(idx){
        let assetTypePawnTableData = this.counterpartyTableData;
        let assetTypeHousesTableDataNew = [];
        if(assetTypePawnTableData){
          for(let index in assetTypePawnTableData){
            if(idx==Number(index)+1){
            }else{
              assetTypeHousesTableDataNew.push(assetTypePawnTableData[index]);
            }
          }
          this.counterpartyTableData= assetTypeHousesTableDataNew;
        }
      },

      /**
       * 保存交易对手信息
       */
      counterpartyFormSave(){
        let counterpartyTableData = this.counterpartyTableData;
        let assetTypeHousesTableDataNew = [];
        let counterpartyInformation = this.counterpartyInformation;
        let dataParams = {};
        if(counterpartyInformation){
          dataParams = {
            name:counterpartyInformation.name,
            accountNumber:counterpartyInformation.accountNumber,
            bank:counterpartyInformation.bank,
            amount:counterpartyInformation.amount
          };
        }
        console.log("dataParams:",dataParams);
        if(counterpartyTableData){
          for(let index in counterpartyTableData){
            assetTypeHousesTableDataNew.push(counterpartyTableData[index]);
          }
        }
        assetTypeHousesTableDataNew.push(dataParams);
        //赋值列表
        this.counterpartyTableData = assetTypeHousesTableDataNew;
        //关闭弹窗
        this.addCounterpartyDialogVisible = false;
      },

      /**
       * 还款方式
       */
      repaymentChange(value){
        this.repaymentFlag=false;
        this.repaymentPeriodFlag=false;
        this.repaymentOtherFlag=false;
        if(value){
          if(value=='3'){
            this.repaymentFlag=true;
          }else if(value=='7'){
            this.repaymentOtherFlag=true;
          }
        }
      },

      /**
       * 是否公积金组合贷款
       */
      whetherProvidentFundCombinationLoanChange(value){
        this.whetherProvidentFundCombinationLoanFlag=false;
        if(value){
          if(value=='1'){
            this.whetherProvidentFundCombinationLoanFlag=true;
          }
        }
      },

      /**
       * 借款人是否为我行独家信贷客户
       */
      whetherExclusiveCreditClientChange(value){
        this.whetherExclusiveCreditClientFlagFlag=false;
        this.whetherExclusiveCreditClientNoFlag = false;
        if(value){
          if(value=='1'){
            this.whetherExclusiveCreditClientFlagFlag=true;
          }else{
            this.whetherExclusiveCreditClientNoFlag = true;
          }
        }
      },

      /**
       * 结款业务下一步
       * @param value
       */
      loanBusinessNextStep(type){
        this.loanBusinessInformation.loanBasisId=this.loanBasisId;
        this.loanBusinessInformation.counterpartyInformation= this.counterpartyTableData;
        this.loanBusinessInformation.repaymentPlan=this.repaymentPlanList;
        //this.loanBusinessInformation.createBy=sessionStorage.getItem("user");
        this.$refs.loanBusinessInformation.validate((valid) => {
          if (valid) {
            this.$confirm('确认提交吗？', '提示', {}).then(() => {
              let params = Object.assign({}, this.loanBusinessInformation)
              console.log("params:",params);
              this.$api.loanBusinessInformation.save(params).then((res) => {
                if(res.code == 200) {
                  this.active=type;
                  this.$message({ message: '操作成功', type: 'success' })
                } else {
                  this.$message({message: '操作失败, ' + res.msg, type: 'error'})
                }
                //this.$refs['loanBusinessInformation'].resetFields()
              })
            })
          }
        })
      },

      /**
       *婚姻状况
       * @param value
       */
      personalLoanSurveyMaritalChange(value){
        this.maritalStatusFlag=false;
        if(value=='1'){
          this.maritalStatusFlag=true;
        }
      },

      /**
       * 个人报告 下一步
       * @param value
       */
      personalLoanSurveyReportNextStep(type){
        this.personalLoanSurveyReport.loanBasisId=this.loanBasisId;;
        this.personalLoanSurveyReport.createBy=sessionStorage.getItem("user");
        this.$refs.personalLoanSurveyReport.validate((valid) => {
          if (valid) {
            this.$confirm('确认提交吗？', '提示', {}).then(() => {
              let params = Object.assign({}, this.personalLoanSurveyReport)
              console.log("params:",params);
              this.$api.personalLoanSurveyReport.save(params).then((res) => {
                if(res.code == 200) {
                  this.active=type;
                  this.$message({ message: '操作成功', type: 'success' })
                } else {
                  this.$message({message: '操作失败, ' + res.msg, type: 'error'})
                }
                this.$refs['personalLoanSurveyReport'].resetFields()
              })
            })
          }
        })
      },

      /**
       * 合同信息 下一步
       * @param type
       */
      contractInformationNextStep(type){
        this.contractInformation.loanBasisId=this.loanBasisId;;
        this.contractInformation.createBy=sessionStorage.getItem("user");
        this.$refs.contractInformation.validate((valid) => {
          if (valid) {
            this.$confirm('确认提交吗？', '提示', {}).then(() => {
              let params = Object.assign({}, this.contractInformation)
              console.log("params:",params);
              this.$api.contractInformation.save(params).then((res) => {
                if(res.code == 200) {
                  let dataPs = {
                    url:'loan/list'
                  }
                  this.$store.commit('menuRouteLoaded', false); // 要求重新加载导航菜单
                  this.$router.push('/loan/list');
                  this.active=0;
                  this.$message({ message: '操作成功', type: 'success' })
                } else {
                  this.$message({message: '操作失败, ' + res.msg, type: 'error'})
                }
                this.$refs['contractInformation'].resetFields()
              })
            })
          }
        })
      },

      //上传
      success(response,file,files){
        console.log("response:",response);
        console.log("file:",file);
        console.log("files:",files);
        if(response.statusCode!=1){
          this.fileList = []
        }
      },

      //清空房屋
      clearAssetTypeHouses(){
        let  assetTypeHouses={
          rpiId:'',
          //是否不动产权证（1、不动产权证）（2、非不动产权证）
          whetherOwnershipCertificates:'',
          //不动产权证号
          propertyCertificateNumber:'',
          //房产证号
          deed:'',
          //土地证号
          landCertificate:'',
          affiliation:'',
          address:'',
          constructionArea:'',
          value:'',
          financingSituation:'',
          whetherCoOwner:'',
          coOwnerName:'',
          whetherLease:''
        };
        this.assetTypeHouses = assetTypeHouses;
      },

      //清空土地
      clearAssetTypeLand(){
        let   assetTypeLand={
          rpiId:'',
          //是否不动产权证（1、不动产权证）（2、非不动产权证）
          whetherOwnershipCertificates:'',
          //不动产权证号
          propertyCertificateNumber:'',
          //房产证号
          deed:'',
          //土地证号
          landCertificate:'',
          affiliation:'',
          address:'',
          constructionArea:'',
          value:'',
          financingSituation:'',
          whetherCoOwner:'',
          coOwnerName:'',
          whetherLease:''
        };
        this.assetTypeLand = assetTypeLand;
      },

      //清空汽车信息
      clearAssetTypeCar(){
        let   assetTypeCar={
          rpiId:'',
          brand:'',
          value:'',
          numberPlate:'',
          drivingLicenseNumber:''
        }
        this.assetTypeCar = assetTypeCar;
      },

      //清空证券信息
      clearAssetTypeSecurities(){
        let   assetTypeSecurities={
          rpiId:'',
          brand:'',
          value:'',
          numberPlate:'',
          drivingLicenseNumber:''
        }
        this.assetTypeSecurities = assetTypeSecurities;
      },

      //清空房屋
      clearSpouseAssetTypeHouses(){
        let  spouseAssetTypeHouses={
          rpiId:'',
          //是否不动产权证（1、不动产权证）（2、非不动产权证）
          whetherOwnershipCertificates:'',
          //不动产权证号
          propertyCertificateNumber:'',
          //房产证号
          deed:'',
          //土地证号
          landCertificate:'',
          affiliation:'',
          address:'',
          constructionArea:'',
          value:'',
          financingSituation:'',
          whetherCoOwner:'',
          coOwnerName:'',
          whetherLease:''
        };
        this.spouseAssetTypeHouses = spouseAssetTypeHouses;
      },

      //清空土地
      clearSpouseAssetTypeLand(){
        let   spouseAssetTypeLand={
          rpiId:'',
          //是否不动产权证（1、不动产权证）（2、非不动产权证）
          whetherOwnershipCertificates:'',
          //不动产权证号
          propertyCertificateNumber:'',
          //房产证号
          deed:'',
          //土地证号
          landCertificate:'',
          affiliation:'',
          address:'',
          constructionArea:'',
          value:'',
          financingSituation:'',
          whetherCoOwner:'',
          coOwnerName:'',
          whetherLease:''
        };
        this.spouseAssetTypeLand = spouseAssetTypeLand;
      },

      //清空汽车信息
      clearSpouseAssetTypeCar(){
        let   spouseAssetTypeCar={
          rpiId:'',
          brand:'',
          value:'',
          numberPlate:'',
          drivingLicenseNumber:''
        }
        this.spouseAssetTypeCar = spouseAssetTypeCar;
      },

      //清空证券信息
      clearSpouseAssetTypeSecurities(){
        let   spouseAssetTypeSecurities={
          rpiId:'',
          brand:'',
          value:'',
          numberPlate:'',
          drivingLicenseNumber:''
        }
        this.spouseAssetTypeSecurities = spouseAssetTypeSecurities;
      },

      //清空其他资产信息
      clearAssetTypeOther(){
        //其他信息
        let  assetTypeOther={
          rpiId:'',
          assetName:'',
          value:''
        };
        this.assetTypeOther = assetTypeOther;
      },



      //清空其他资产信息
      clearSpouseAssetTypeOther(){
        let   spouseAssetTypeOther={
          rpiId:'',
          assetName:'',
          value:''
        }
        this.spouseAssetTypeOther = spouseAssetTypeOther;
      },





      //清空抵押物
      clearPawn(){
        let pawn={
          loanBasisId:'',
          mortgageType:'',
          whetherOwnershipCertificates:'',
          propertyCertificateNumber:'',
          landCertificateNumber:'',
          buildingArea:'',
          collateralName:'',
          landNature:'',
          affiliation:'',
          collateralDeposit:'',
          value:'',
          evaluationCorporation:'',
          financingSituation:'',
          whetherCoowner:'',
          coOwnerName:'',
          whetherLease:'',
          leaseContractName:'',
          lesseeName:'',
          leaseTermStartTime:'',
          leaseTermEndTime:'',
          rentPaymentMethod:'',
          rent:'',
          contractSigningTime:'',
          groups:'',
          pawnPersonnelMapping:[],
          landOccupationArea:'',
        }
        this.pawn = pawn;

      },

      //清空交易对手信息
      clearCounterpartyInformation(){
        let counterpartyInformation={
          loanNusinessInformationId:'',
          name:'',
          accountNumber:'',
          bank:'',
          amount:''
        };
        this.counterpartyInformation = counterpartyInformation;
      },

      /**
       * 下一步
       * @param value
       */
      nextStep(value){
        this.active=value;
      },

      handleRoute (menu) {
        // 如果是嵌套页面，转换成iframe的path
        let path = getIFramePath(menu.url);
        if(!path) {
          path = menu.url
        }
        // 通过菜单URL跳转至指定路由
        this.$router.push("/" + path)
      },

      /**
       * 清空家庭收支情况
       */
      householdIncomeFormClear(){
        let householdIncomeForm={
          loanBasisId:'',
          totalAssets:'',
          totalRevenue:'',
          applicantAnnualIncome:'',
          applicantOperatingIncome:'',
          applicantOtherIncome:'',
          spouseAnnualIncome:'',
          spouseOperatingIncome:'',
          spouseOtherIncome:'',
          totalAnnualExpenditure:'',
          lifeTotalExpenditure:'',
          basicLifeTotalExpenditure:'',
          educationExpenditure:'',
          temporaryExpenditure:'',
          debtTotalExpenditure:'',
          annualLoanExpenditure:'',
          spouseTemporaryExpenditure:'',
          supportPopulation:'',
          foreignGuaranteeLumpSum:'',
          totalLiability:''
        };
        this.householdIncomeForm=householdIncomeForm;
      },

      /**
       * 利率
       */
      interestRateChange(value){
        this.interestRateFlag=true;
        if(value=='2'){
          this.loanBusinessInformation.adjustmentMethod ='';
          this.interestRateFlag=false;
        }
      },

      /**
       * 引用
       */
      referenceDialog(){
        this.radioData='';
        //查询房屋土地资产
        this.referenceAssetList=[];
        let dataParams = {
          loanBasisId:this.loanBasisId
        }
        let params = Object.assign({}, dataParams)
        api.loan.findByLoanBasisIdList(params).then((res) => {
          if(res.code=='200'){
            this.setReferenceAssetList(res.data);
          }
          this.referenceDialogVisible =true;
        })
      },

      /**
       * 设置引用数据
       */
      setReferenceAssetList(dataList){
        if(dataList){
          let referenceAssetTempList = [];
          for(let index in dataList){
            let tempData = {};
            let data = dataList[index];
            tempData.data = data;
            let assetName ='';
            let assetType ='';
            let coowner = '';
            let id='';
            let mortgageType='';
            let addressValue='';
            let whetherOwnershipCertificatesValue ='';
            if(!this.isNull(data.typeHous)){
              assetName=data.namehouses;
              assetType='房屋';
              coowner=data.coownerName;
              id = data.typeHous;
              mortgageType='0';
              addressValue=data.address;
              let whetherOwnershipCertificates = data.whetherOwnershipCertificates;
              if(whetherOwnershipCertificates=='1'){
                whetherOwnershipCertificatesValue ='1';
              }else{
                whetherOwnershipCertificatesValue ='2';
              }
            }
            if(!this.isNull(data.typeLand)){
              assetName=data.nameLand;
              assetType='土地';
              coowner=data.coownerNameLand;
              id = data.typeLand;
              mortgageType='1';
              addressValue=data.addressLand;
            }
            tempData.mortgageType = mortgageType;
            tempData.assetType = assetType;
            tempData.assetName = assetName;
            tempData.name = data.name;
            tempData.coowner = coowner;
            tempData.address =addressValue;
            tempData.whetherOwnershipCertificates =whetherOwnershipCertificatesValue;
            tempData.id=id;
            referenceAssetTempList.push(tempData);
          }
          this.referenceAssetList = referenceAssetTempList;
        }
      },

      /**
       * 是否为空
       */
      isNull(value){
        if(value ==null || value ==''|| value == undefined){
          return true;
        }
        return false
      },

      /**
       * 选择房屋土地资产 进行选中
       */
      selectReference(){
        let checkedRadioData = this.checkedRadioData;
        console.log("checkedRadioData:",checkedRadioData);
        if(checkedRadioData){
          //类型
          let mortgageType = checkedRadioData.mortgageType;
          if(mortgageType){
            let data = checkedRadioData.data;
            this.pawn.mortgageType= mortgageType;
            this.mortgageTypeChange(mortgageType);
            //抵押物名称
            this.pawn.collateralName = checkedRadioData.assetName;
            //面积
            let constructionAreaValue = '';
            //所属地
            let affiliationValue = '';
            //价值
            let values = '';
            //融资情况
            let whetherCoownerValue='';
            //共同人
            let coownerNameValue= '';
            //是否有租赁
            let whetherLeaseLandValue = '';
            if(mortgageType=='0') {
              //房屋 是否不动产权证
              let whetherOwnershipCertificates = checkedRadioData.whetherOwnershipCertificates;
              this.pawn.whetherOwnershipCertificates =whetherOwnershipCertificates;
              this.whetherOwnershipCertificatesChange(whetherOwnershipCertificates);
              //不动产权证号
              let propertyCertificateNumber = data.propertyCertificateNumber;
              if(whetherOwnershipCertificates=='1'){
                if(!this.isNull(propertyCertificateNumber)){
                  this.pawn.propertyCertificateNumber = propertyCertificateNumber;
                }else{
                  this.pawn.propertyCertificateNumber = '';
                }
              }else{
                //房产证号
                let deed = data.deed;
                if(deed){
                  this.pawn.propertyCertificateNumber = deed;
                }else{
                  this.pawn.propertyCertificateNumber = '';
                }
              }

              //土地证号
              let landCertificate = data.landCertificate;
              if(!this.isNull(landCertificate)){
                this.pawn.landCertificateNumber = landCertificate;
              }
              //房屋面积
              let constructionArea = data.constructionArea;
              if(!this.isNull(constructionArea)){
                constructionAreaValue=constructionArea;
              }else{
                constructionAreaValue='';
              }
              //所属地
              let affiliation = data.affiliation;
              if(!this.isNull(affiliation)){
                affiliationValue=affiliation;
              }else{
                affiliationValue='';
              }
              //融资情况 （0、无抵押）（1、有抵押）
              let financingSituation = data.financingSituation;
              if(!this.isNull(financingSituation)){
                this.pawn.financingSituation =financingSituation;
              }
              //价值
              let value = data.value;
              if(!this.isNull(value)){
                values=value;
              }else{
                values='';
              }
              //是否有共有人
              let whetherCoowner = data.whetherCoowner;
              if(!this.isNull(whetherCoowner)){
                whetherCoownerValue=whetherCoowner;
              }else{

              }
              //共有人姓名
              let coownerName = data.coownerName;
              if(!this.isNull(coownerName)){
                coownerNameValue=coownerName;
              }else{
                coownerNameValue='';
              }
              //是否有租赁
              let whetherLease = data.whetherLease;
              if(!this.isNull(whetherLease)){
                whetherLeaseLandValue=whetherLease;
              }
              //房屋建筑面积
              this.pawn.buildingArea=constructionAreaValue;
            }else if(mortgageType=='1'){
              //土地  土地证号
              let landTypeCertificate = data.landTypeCertificate;
              if(!this.isNull(landTypeCertificate)){
                this.pawn.landCertificateNumber = landTypeCertificate;
              }else{
                this.pawn.landCertificateNumber = '';
              }
              //土地面积
              let constructionAreaLand = data.constructionAreaLand;
              if(!this.isNull(constructionAreaLand)){
                constructionAreaValue=constructionAreaLand;
              }else{
                constructionAreaValue='';
              }
              //所属地
              let affiliationLand = data.affiliationLand;
              if(!this.isNull(affiliationLand)){
                affiliationValue=affiliationLand;
              }else{
                affiliationValue='';
              }
              //融资情况 （0、无抵押）（1、有抵押）
              let financingSituationLand = data.financingSituationLand;
              if(!this.isNull(financingSituationLand)){
                this.pawn.financingSituation =financingSituationLand;
              }else{

              }
              //价值
              let valueLand = data.valueLand;
              if(!this.isNull(valueLand)){
                values=valueLand;
              }else{
                values='';
              }
              //是否有共有人
              let whetherCoownerLand = data.whetherCoownerLand;
              if(!this.isNull(whetherCoownerLand)){
                whetherCoownerValue=whetherCoownerLand;
              }else{

              }
              //共有人姓名
              let coownerNameLand = data.coownerNameLand;
              if(!this.isNull(coownerNameLand)){
                coownerNameValue=coownerNameLand;
              }else{
                coownerNameValue=''
              }
              //是否有租赁
              let whetherLeaseLand = data.whetherLeaseLand;
              if(!this.isNull(whetherLeaseLand)){
                whetherLeaseLandValue=whetherLeaseLand;
              }
              //土地建筑面积
              this.pawn.landOccupationArea=constructionAreaValue;
            }
            //所属地
            this.pawn.affiliation = affiliationValue;
            //价值
            this.pawn.value = values;
            //是否有共有人
            this.pawn.whetherCoowner= whetherCoownerValue;
            this.whetherCoownerChange(whetherCoownerValue);
            //共有人姓名
            if(!this.isNull(coownerNameValue)){
              this.pawn.coownerName = coownerNameValue;
            }
            //是否有租赁
            this.pawn.whetherLease = whetherLeaseLandValue;
            this.whetherLeaseChange(whetherLeaseLandValue);
            this.referenceDialogVisible =false;
          }
        }else{
          this.$message({message: '请选择需要引用的数据！', type: 'error'})
        }
      },

      /**
       * 关闭
       */
      referenceDialogClose(){
        this.referenceDialogVisible =false;
      },

      /**
       * 选中
       */
      checkAll(data){
        this.checkedRadioData = data;
      },

      //清空房屋
      clearTableDataList(){
        //清空房屋资产
        this.assetTypeHousesTableData=[];
        //清空土地资产
        this.landTableData=[];
        //清空汽车资产
        this.carTableData=[];
        //清空证券资产
        this.securitiesTableData=[];
        //清空其他资产
        this.otherTableData=[];
        this.assetTypeSpouseHousesTableData=[];
        this.spouseLandTableData=[];
        this.spouseCarTableData=[];
        this.spouseSecuritiesTableData=[];
        this.spouseOtherTableData=[];

        //清空
        this.coOwnerNameFlag=false;
        this.clearSpouseAssetTypeHouses();
        this.clearSpouseAssetTypeLand();
        this.clearSpouseAssetTypeCar();
        this.clearSpouseAssetTypeSecurities();
      },



    },
    mounted() {
    }
  }
</script>

<style scoped>

  <!--文本下拉框-->
  .el-widith-l{
    width:180px!important;
  }
  .el-form-item{
    margin-bottom: 15px!important;
  }
  .el-radio-group{
    width: 660px!important;
  }
  .el-form-item__label{
    width: 150px!important;
  }
  .el-checkbox-group{
    width: 660px!important;
  }
  .checkgroup{
    width: 660px!important;
  }
  .width180{width:180px!important;}
  .width150{width:210px!important;}
  .width350{width:330px!important;}
  .width378{max-width:378px;}
  .height30{height:30px!important;}
  .row-list-ove{
    position: relative;
    height:auto;
    margin-bottom:10px;
    display: flex;
    flex-direction:row;
  }
  .ove-block{
    /*width:auto;*/
    flex:1;
    margin-right:20px;
    display: flex;
    flex-direction:row;
  }
  .ove-title{
    /*width:auto;*/
    flex:0.7;
    /*width:80px;*/
    /*background:#eee;*/
    display: flex;
    flex-direction:row-reverse;
    align-items:center;
  }
  .typeface{
    font-size:12px;
    font-family: Helvetica Neue,"微软雅黑","黑体";
    color:#333;
  }
  .ove-content{
    /*flex:1;*/
    /*background:#888;*/
    margin-left:10px;
    display: flex;
    flex-direction:row;
    align-items:center;
  }
  .redface{
    font-size:12px;
    font-family: Helvetica Neue,"微软雅黑","黑体";
    color:#F44848;
  }
  .top5{margin-top:5px;}
  .el-date-table .el-radio {

  }
  /*进度 样式*/
  .schedule{
    cursor:pointer;
  }

</style>
