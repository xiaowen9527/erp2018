<template>
    <div class="container" :class="{container_collapse:collapse}">
        <!-- 页面标题 -->
        <p class="page_title">销售订单</p>

        <!-- 顶部操作按钮 -->
        <div class="btn-box">
            <button class="button_btn" @click="doAdds">新增</button>
            <button class="button_btn" @click="doCancels">取消</button>
            <button class="button_btn" @click="doChanges">修改</button>
            <button class="button_btn" @click="doImports">导入</button>
            <button class="button_btn" @click="doExports">导出</button>
            <button @click="doSearchs" class="button_btn">查询</button>
            <input class="queryInfo" type="text" v-model="queryInfo" />
            <button class="button_btn" @click="doOuts">退出</button>

            <div class="btn_right">
                <button class="button_btn" @click="doExamines">审核</button>
                <button class="button_btn" @click="doExamineAgains">反审核</button>
                <button class="button_btn" @click="doStops">终止</button>
                <button class="button_btn" @click="NotStops">反终止</button>
                <button class="button_btn" @click="closeOrders">关单</button>
                <button class="button_btn" @click="doOrders">开单</button>
            </div>
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
                    <ul class="clearfix">
                        <li>
                            <label>订单日期</label>
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
                            <label>属性</label>
                            <el-select v-model="form.type" placeholder="请选择" :disabled="formOff">
                                <!-- <el-option v-for="item in this.Type" :key="item.name" :label="item.name" :value="item.name">
                                </el-option> -->
                            </el-select>
                        </li>
                        <li>
                            <label>仓库</label>
                            <el-select v-model="form.type" placeholder="请选择" :disabled="formOff">
                                <!-- <el-option v-for="item in this.Type" :key="item.name" :label="item.name" :value="item.name">
                                </el-option> -->
                            </el-select>
                        </li>
                    </ul>
                    <ul class="clearfix">
                        <li>
                            <label>交货地址</label>
                            <input type="text" v-model="form.psn" :disabled="formOff">
                        </li>
                        <li>
                            <label>交货日期</label>
                            <el-date-picker format="yyyy 年 MM 月 dd 日" value-format="yyyy-MM-dd" v-model="form.activeDate" type="date" placeholder="选择日期" :disabled="formOff">
                            </el-date-picker>
                        </li>
                        <li>
                            <label>订单号</label>
                            <input type="text" :disabled="formOff">
                        </li>
                        <li>
                            <label>来源号</label>
                            <input type="text" :disabled="formOff">
                        </li>
                        <li>
                            <label>品牌</label>
                            <el-select v-model="form.type" placeholder="请选择" :disabled="formOff">
                                <!-- <el-option v-for="item in this.Type" :key="item.name" :label="item.name" :value="item.name">
                                </el-option> -->
                            </el-select>
                        </li>
                    </ul>
                    <ul class="clearfix">
                        <li>
                            <label>价格性质</label>
                            <el-select v-model="form.type" placeholder="请选择" :disabled="formOff">
                                <!-- <el-option v-for="item in this.Type" :key="item.name" :label="item.name" :value="item.name">
                                </el-option> -->
                            </el-select>
                        </li>
                        <li>
                            <label>价格类型</label>
                            <el-select v-model="form.type" placeholder="请选择" :disabled="formOff">
                                <!-- <el-option v-for="item in this.Type" :key="item.name" :label="item.name" :value="item.name">
                                </el-option> -->
                            </el-select>
                        </li>
                        <li>
                            <label>币别</label>
                            <el-select v-model="form.type" placeholder="请选择" :disabled="formOff">
                                <!-- <el-option v-for="item in this.Type" :key="item.name" :label="item.name" :value="item.name">
                                </el-option> -->
                            </el-select>
                        </li>
                        <li>
                            <label>结算方式</label>
                            <el-select v-model="form.type" placeholder="请选择" :disabled="formOff">
                                <!-- <el-option v-for="item in this.Type" :key="item.name" :label="item.name" :value="item.name">
                                </el-option> -->
                            </el-select>
                        </li>
                        <button class="save" @click="doSaves" :class="{button_btn:!formOff}" :disabled="formOff">保存</button>
                    </ul>
                    <ul class="clearfix">
                        <li>
                            <label for="">款号</label>
                            <input type="text" disabled>
                        </li>
                        <button class="save" disabled="disabled">查询</button>
                    </ul>
                </div>
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
  name: "xiaoshoudingdan",
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
      list: [], // 表格内容
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

    // 审核
    doExamines() {},

    // 反审核
    doExamineAgains() {},

    // 终止
    doStops() {},

    // 反终止
    NotStops() {},

    // 关单
    closeOrders() {},

    // 开单
    doOrders() {},

    // 获取左侧树形导航数据
    getnavMenu() {
        // this.$http.post("/TPA/dSellPsn/list").then(res => {
        //     console.log(res)
        // })
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
@import 'css/style.styl'
</style>
