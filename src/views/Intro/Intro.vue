<template>
  <!--  <div class="page-container" style="width:99%;margin-top:15px;">
     <el-carousel :interval="3000" type="card" height="450px" class="carousel">
        <el-carousel-item class="carousel-item-intro">
          <h2>项目介绍</h2>
          <ul>
            <li>基于 Spring Boot、Spring Cloud、Vue、Element 的 Java EE 快速开发平台</li>
            <li>旨在提供一套简洁易用的解决方案，帮助用户有效降低项目开发难度和成本</li>
            <li>博客提供项目开发过程同步系列教程文章，手把手的教你如何开发同类系统</li>
          </ul>
          <div><img src="@/assets/logo_kitty_blue.png" style="width:200px;height:120px;padding-top:15px;" /></div>
        </el-carousel-item>
        <el-carousel-item class="carousel-item-func">
          <h2>功能计划</h2>
          <ul>
            <li>✔ 系统登录：系统用户登录，系统登录认证（token方式）</li>
            <li>✔ 用户管理：新建用户，修改用户，删除用户，查询用户</li>
            <li>✔ 机构管理：新建机构，修改机构，删除机构，查询机构</li>
            <li>✔ 角色管理：新建角色，修改角色，删除角色，查询角色</li>
            <li>✔ 菜单管理：新建菜单，修改菜单，删除菜单，查询菜单</li>
            <li>✔ 系统日志：记录用户操作日志，查看系统执行日志记录</li>
            <li>✔ 数据监控：定制Druid信息，提供简洁有效的SQL监控</li>
            <li>✔ 聚合文档：定制在线文档，提供简洁美观的API文档</li>
            <li>✔ 备份还原：系统备份还原，一键恢复系统初始化数据</li>
            <li>✔ 主题切换：支持主题切换，自定主题颜色，一键换肤</li>
            <li>✔ 服务治理：集成Spring Cloud，实现全方位服务治理</li>
            <li>✔ 服务监控：集成Spring Boot Admin，实现微服务监控</li>
            <li>...</li>
          </ul>
        </el-carousel-item>
        <el-carousel-item class="carousel-item-env">
          <h2>开发环境</h2>
          <ul>
            <li>IDE : eclipse 4.6.x。     JDK : JDK 1.8.x。</li>
            <li>Maven : Maven 3.5.x。   MySQL: MySQL 5.7.x。</li>
            <li>IDE : VS Code 1.27。    Webpack：webpack 3.2.x。</li>
            <li>NODE: Node 8.9.x。      NPM : NPM 6.4.x。</li>
          </ul>
          <h2>技术选型</h2>
          <ul>
            <li>核心框架：Spring Boot 2.x。  服务治理：Spring Cloud。</li>
            <li>视图框架：Spring MVC 5.x。   持久层框架：MyBatis 3.x。</li>
            <li>数据库连接池：Druid 1.x。    安全框架：Shiro 1.4.x。</li>
            <li>前端框架：Vue.js 2.x。       页面组件：Element 2.x。</li>
            <li>状态管理：Vuex.js 2.x。      后台交互：axios 0.18.x。</li>
            <li>...</li>
          </ul>
        </el-carousel-item>
      </el-carousel>


   </div>-->


  <div>
    <el-row :gutter="20">
      <el-col :span="8">
        <div class="card kjfs">
          <p class="title"><i class="fa fa-th-large fa-lg"></i>快捷方式</p>
          <ul>
            <li>
              <router-link to="/addArticle" class="kjfs kjfs-bluee"><span><i
                class="el-icon-tickets fa-2x"></i></span><span>发表文章</span></router-link>
            </li>
            <li>
              <router-link to="/dragTabe" class="kjfs kjfs-pinkk"><span><i
                class="fa fa-hand-stop-o fa-2x"></i></span><span>拖拽排序</span></router-link>
            </li>
            <li>
              <router-link to="/pagePermissions" class="kjfs kjfs-yelloww"><span><i
                class="fa fa-universal-access fa-2x"></i></span><span>权限测试</span></router-link>
            </li>
          </ul>
          <ul>
            <li>
              <router-link to="/upload" class="kjfs kjfs-grennn"><span><i
                class="fa fa-cloud-upload fa-2x"></i></span><span>文件上传</span></router-link>
            </li>
            <li>
              <router-link to="/navClassifies" class="kjfs kjfs-purplee"><span><i
                class="fa el-icon-menu fa-2x"></i></span><span>前台菜单</span></router-link>
            </li>
            <li>
              <router-link to="/markdown" class="kjfs kjfs-lightBluee"><span><i
                class="fa fa-file-code-o fa-2x"></i></span><span>编辑器</span></router-link>
            </li>
          </ul>
        </div>
      </el-col>
      <el-col :span="8">
        <div class="card dbsx">
          <p class="title"><i class="fa fa-file-text-o"></i>待办事项</p>
          <ul>
            <li>
              <router-link to="#"><span>待审评论</span><span class="num">66</span></router-link>
            </li>
            <li>
              <router-link to="#"><span>待审帖子</span><span class="num">66</span></router-link>
            </li>
          </ul>
          <ul>
            <li>
              <router-link to="#"><span>待审商品</span><span class="num">66</span></router-link>
            </li>
            <li>
              <router-link to="#"><span>代发货</span><span class="num">66</span></router-link>
            </li>
          </ul>
        </div>
      </el-col>
      <el-col :span="8">
        <div class="card bbxx">
          <p class="title"><i class="fa fa-server"></i>版本信息</p>
          <div class="table">
            <p><span class="tit">当前版本</span>v1.0.0</p>
            <p><span class="tit">基于框架</span>vue2.0全家桶 + element-ui</p>
            <p><span class="tit">主要特色</span>单页面 / 响应式 / 无限级菜单 / 权限管理 / 极简</p>
            <p><span class="tit">获取渠道</span>
              <span class="gitbox">
                  <a target="_blank" href="https://github.com/Nirongxu/vue-xuAdmin.git"><el-button type="primary"
                                                                                                   icon="el-icon-download"
                                                                                                   size="small">github</el-button></a>
                  <a target="_blank" href="https://gitee.com/nirongxu/xu-webplatform.git"><el-button type="primary"
                                                                                                     icon="el-icon-download"
                                                                                                     size="small">码云</el-button></a>
                </span>
            </p>
          </div>
        </div>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="24">
        <el-table
          :data="tableData"
          stripe
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
    <el-row>
      <el-col :span="24">
        <el-table
          :data="tableData"
          stripe
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
    methods: {},
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

<style scoped>
</style>
