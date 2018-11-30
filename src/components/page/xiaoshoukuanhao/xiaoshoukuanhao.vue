<template>
    <div class="container" :class="{container_collapse:collapse}">
        <!-- 页面标题 -->
        <p class="page_title">销售款号</p>

        <!-- 顶部操作按钮 -->
        <div class="btn-box">
            <button class="button_btn" @click="doAdds">新增</button>
            <button class="button_btn" @click="doCancels">取消</button>
            <button class="button_btn" @click="doChanges">修改</button>
            <button class="button_btn" @click="doImports">导入</button>
            <button class="button_btn" @click="doExports">导出</button>
            <button @click="doSearchs" class="button_btn">查询</button>
            <input class="queryInfo" placeholder="客户编号 / 名称 / 性质" type="text" v-model="queryInfo" />
            <button class="button_btn" @click="doOuts">退出</button>
        </div>

        <div class="set_box">
            <!-- 左侧导航栏 -->
            <div class="menu_box">
                <el-menu @select="menuSelected" unique-opened background-color="#f2f2f2" text-color="#303133" active-text-color="#303133">
                    <nav-menu :navMenus="this.navMenus"></nav-menu>
                </el-menu>
            </div>

            <div class="set_info">
                <!-- 表单内容 -->
                <div class="info_form">
                    <ul class="clerfix">
                        <li>
                            <label>生效日期</label>
                            <el-date-picker format="yyyy 年 MM 月 dd 日" value-format="yyyy-MM-dd" v-model="form.activeDate" type="date" placeholder="选择日期" :disabled="formOff">
                            </el-date-picker>
                        </li>
                        <li class="menuLi">
                            <label>客户</label>
                            <input type="text" class="first" v-model="form.customer" :disabled="formOff">
                            <input type="text" v-model="form.customer" :disabled="formOff">
                            <button :disabled="formOff">。。。</button>
                        </li>
                        <li>
                            <label>款号</label>
                            <input type="text" v-model="form.psn" :disabled="formOff">
                        </li>
                        <button class="save" @click="doSaves" :class="{button_btn:!formOff}" :disabled="formOff">保存</button>
                    </ul>
                </div>

                <!-- 表格内容 -->
                <div class="order_table">
                    <el-table :data="list" stripe style="width: 100%">
                        <el-table-column prop="activeDate" label="生效日期" min-width="10%">
                        </el-table-column>
                        <el-table-column prop="customer" label="客户" min-width="10%">
                        </el-table-column>
                        <el-table-column prop="psn" label="款号" min-width="10%">
                        </el-table-column>
                        <el-table-column prop="customerPsn" label="客户款号" min-width="10%">
                        </el-table-column>
                        <el-table-column prop="msg1" label="信息1" min-width="10%">
                        </el-table-column>
                        <el-table-column prop="msg2" label="信息2" min-width="10%">
                        </el-table-column>
                        <el-table-column prop="msg3" label="信息3" min-width="10%">
                        </el-table-column>
                        <el-table-column fixed="right" label="操作" min-width="30%">
                            <template slot-scope="scope">
                                <el-button class="btn">修改</el-button>
                                <el-button class="btn">删除</el-button>
                                <el-button class="btn">审核</el-button>
                                <el-button class="btn">反审</el-button>
                            </template>
                        </el-table-column>
                    </el-table>
                </div>
            </div>
            
            <!-- 底部页码 -->
            <div class="pageBox">
                <!-- <el-pagination @current-change="currentPage" :current-page='page' v-if="pageOnOff" background :page-size="pageSize" :pager-count="5" :total="total">
                </el-pagination> -->
            </div>
        </div>
    </div>
</template>

<script>
import "@/assets/js/import.js"; //导入请求超时拦截
import { mapState } from "vuex";

import {
  NetworkAnomaly,
  succ,
  error,
  getOut
} from "../../../assets/js/message.js";
import qs from "qs";
import NavMenu from "./NavMenu";
export default {
  name: "xiaoshoukuanhao",
  data() {
    return {
      queryInfo: "", // 顶部查询内容
      navMenus: [], // 左侧导航栏数据
      form: {
          activeDate: "",
          customer: "",
          psn: ""
      },
      formOff: true, // 表单禁用、开启
      list: [
          {
              "activeDate": "20188-11-30"
          },
          {
              "activeDate": "20188-11-30"
          },
          {
              "activeDate": "20188-11-30"
          },
          {
              "activeDate": "20188-11-30"
          },
          {
              "activeDate": "20188-11-30"
          }
      ], // 表格内容
    };
  },

  methods: {
    // 新增
    doAdds() {
        this.formOff = false;
    },

    // 取消
    doCancels() {
        this.formOff = true;
    },

    // 修改
    doChanges() {},

    // 导入
    doImports() {},

    // 导出
    doExports() {},

    // 查询
    doSearchs() {},

    // 退出
    doOuts() {},

    // 获取左侧树形导航数据
    getnavMenu() {
        this.$http.post("/TPA/dSellPsn/list").then(res => {
            console.log(res)
        })
    },

    // 点击左侧导航
    menuSelected() {},

    // 表单保存
    doSaves() {
        this.formOff = true;
    }
  },

  mounted() {
    this.getnavMenu();
  },

  computed: {
    ...mapState(["collapse"])
  },

  // 引入组件
  components: {
    NavMenu
  }
};
</script>

<style lang="stylus" scoped>
@import 'style.styl'
</style>


