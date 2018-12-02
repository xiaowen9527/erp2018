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
            <button class="button_btn" @click="doPrints">打印</button>
            <button class="button_btn" @click="doExports">导出</button>
            <button @click="doSearchs" class="button_btn">查询</button>
            <input class="queryInfo" type="text" v-model="queryInfo" />
            <button class="button_btn" @click="doOuts">退出</button>

            <div class="btn_right">
                <button class="button_btn" @click="doExamines">审核</button>
                <button class="button_btn" @click="doExamineAgains">反审核</button>
                <button class="button_btn" @click="doStops">终止</button>
                <button class="button_btn" @click="NotStops">启用</button>
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
                            <el-select v-model="form.property" placeholder="请选择" :disabled="formOff">
                                <el-option v-for="item in this.property" :key="item.name" :label="item.name" :value="item.name">
                                </el-option>
                            </el-select>
                        </li>
                        <li>
                            <label>仓库</label>
                            <el-select v-model="form.repertory" placeholder="请选择" :disabled="formOff">
                                <el-option v-for="item in this.repertory" :key="item.name" :label="item.name" :value="item.name">
                                </el-option>
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
                            <input type="text" disabled placeholder="自动生成">
                        </li>
                        <li>
                            <label>来源号</label>
                            <input type="text" :disabled="formOff">
                        </li>
                        <li>
                            <label>品牌</label>
                            <el-select v-model="form.brand" placeholder="请选择" :disabled="formOff">
                                <el-option v-for="item in this.brand" :key="item.name" :label="item.name" :value="item.name">
                                </el-option>
                            </el-select>
                        </li>
                    </ul>
                    <ul class="clearfix">
                        <li>
                            <label>价格性质</label>
                            <el-select v-model="form.priceNature" placeholder="请选择" :disabled="formOff">
                                <el-option v-for="item in this.priceNature" :key="item.name" :label="item.name" :value="item.name">
                                </el-option>
                            </el-select>
                        </li>
                        <li>
                            <label>价格类型</label>
                            <el-select v-model="form.priceType" placeholder="请选择" :disabled="formOff">
                                <el-option v-for="item in this.priceType" :key="item.name" :label="item.name" :value="item.name">
                                </el-option>
                            </el-select>
                        </li>
                        <li>
                            <label>币别</label>
                            <el-select v-model="form.currency" placeholder="请选择" :disabled="formOff">
                                <el-option v-for="item in this.currency" :key="item.name" :label="item.name" :value="item.name">
                                </el-option>
                            </el-select>
                        </li>
                        <li>
                            <label>结算方式</label>
                            <el-select v-model="form.balanceMode" placeholder="请选择" :disabled="formOff">
                                <el-option v-for="item in this.balanceMode" :key="item.name" :label="item.name" :value="item.name">
                                </el-option>
                            </el-select>
                        </li>
                        <li>
                            <label>备注</label>
                            <input type="text" :disabled="formOff">
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

                <!-- 表格内容 -->
                <div class="order_table">
                    <!-- <div class="changeTable clearfix">
                        <button class="changeTable_btn">主要信息</button>
                        <button class="changeTable_btn">附加信息</button>
                    </div> -->
                    <el-table :data="list" stripe style="width: 100%" index @row-dblclick="chooseRow">
                        <el-table-column prop="activeDate" label="品类" min-width="7.5%">
                        </el-table-column>
                        <el-table-column prop="clientName" label="名称" min-width="7.5%">
                        </el-table-column>
                        <el-table-column prop="spdaPsn" label="款号" min-width="7.5%">
                        </el-table-column>
                        <el-table-column prop="psn" label="颜色" min-width="7.5%">
                        </el-table-column>
                        <el-table-column prop="msg1" label="尺码" min-width="10%">
                            <template slot-scope="scope">
                                <el-button :disabled="(scope.row.sh == 1)" :class="{btn:scope.row.sh == 1}" @click="handleEdit(scope.$index, scope.row)">查看/修改</el-button>
                            </template>
                        </el-table-column>
                        <el-table-column prop="msg2" label="数量" min-width="7.5%">
                        </el-table-column>
                        <el-table-column prop="msg3" label="标准价" min-width="7.5%">
                        </el-table-column>
                        <el-table-column prop="msg3" label="结算价" min-width="7.5%">
                        </el-table-column>
                        <el-table-column prop="msg3" label="结算金额" min-width="7.5%">
                        </el-table-column>
                        <el-table-column fixed="right" label="操作" min-width="24%">
                            <template slot-scope="scope">
                                <el-button :disabled="(scope.row.sh == 1)" :class="{btn:scope.row.sh == 1}" @click="handleEdit(scope.$index, scope.row)">修改</el-button>
                                <el-button :disabled="(scope.row.sh == 1)" :class="{btn:scope.row.sh == 1}" @click="tableDelete(scope.$index, scope.row)">删除</el-button>
                                <el-button :disabled="(scope.row.sh == 1)" :class="{btn:scope.row.sh == 1}" @click="doExamines(scope.$index, scope.row)">终止</el-button>
                                <!-- <el-button :disabled="(scope.row.sh == 0)" :class="{btn:scope.row.sh == 0}" @click="doExamineAgains(scope.$index, scope.row)">反审</el-button> -->
                                <el-button :disabled="(scope.row.sh == 0)" :class="{btn:scope.row.sh == 0}" @click="doExamineAgains(scope.$index, scope.row)">关款</el-button>
                            </template>
                        </el-table-column>
                    </el-table>
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
          activeDate: "", // 订单日期
          clientSn: "", // 客户编号
          clientName: "", // 客户名称
          property: "", // 属性
          repertory: "", // 仓库
          address: "", // 交货地址
          deliveryDate: "", // 交货日期
          sn: "", // 订单号
          originSn: "", // 来源号
          brand: "", // 品牌
          priceNature: "", // 价格性质
          priceType: "", // 价格类型
          currency: "", // 币别
          balanceMode: "", // 结算方式
          remark: "" // 备注
      },
      formOff: true, // 表单禁用、开启
      // 属性选择
      property: [
          {name: "销售"},
          {name: "退货"}
      ],
      repertory: [], // 仓库选择
      brand: [], // 品牌选择
      priceNature: [], // 价格性质选择
      priceType: [], // 价格类型选择
      currency: [], // 币别选择
      balanceMode: [], // 结算方式选择
      list: [
          {activeDate: "2018-12-1"},
          {activeDate: "2018-12-1"},
          {activeDate: "2018-12-1"},
          {activeDate: "2018-12-1"}          
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

    // 打印
    doPrints() {},

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

    // 获取所有下拉选择的数据
    getChoose() {
        // 仓库选择
        this.$http.post("/TPA/aRepertory/option").then(res => {
            console.log(res)
            if(res.data.code === 0) {
                this.repertory = res.data.data;
            }
        })
        .catch(err => {
          NetworkAnomaly();
        });

        // 品牌选择
        this.$http.post("/TPA/aLbJb/getBySn?sn=003").then(res => {
            if(res.data.code === 0) {
                this.brand = res.data.data;
            }
        })
        .catch(err => {
          NetworkAnomaly();
        });

        // 价格性质选择
        this.$http.post("/TPA/aLbJb/getBySn?sn=027").then(res => {
            if(res.data.code === 0) {
                this.priceNature = res.data.data;
            }
        })
        .catch(err => {
          NetworkAnomaly();
        });

        // 价格类型选择
        this.$http.post("/TPA/aLbJb/getBySn?sn=005").then(res => {
            if(res.data.code === 0) {
                this.priceType = res.data.data;
            }
        })
        .catch(err => {
          NetworkAnomaly();
        });

        // 币别选择
        this.$http.post("/TPA/aLbJb/getBySn?sn=029").then(res => {
            if(res.data.code === 0) {
                this.currency = res.data.data;
            }
        })
        .catch(err => {
          NetworkAnomaly();
        });

        // 结算方式选择
        this.$http.post("/TPA/aLbJb/getBySn?sn=028").then(res => {
            if(res.data.code === 0) {
                this.balanceMode = res.data.data;
            }
        })
        .catch(err => {
          NetworkAnomaly();
        });
    },

    // 点击左侧导航
    menuSelected() {},

    // 表单保存
    doSaves() {
        this.formOff = true;
    },

    // 双击当前行
    chooseRow(e) {
        console.log(e)
    }
  },

  mounted() {
    this.getnavMenu();
    this.getChoose();
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
