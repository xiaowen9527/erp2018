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
                            <el-date-picker format="yyyy 年 MM 月 dd 日" value-format="yyyy-MM-dd" v-model="form.activeDate" type="date" placeholder="必填" :disabled="formOff">
                            </el-date-picker>
                        </li>
                        <li class="menuLi">
                            <label>客户</label>
                            <input type="text" class="first" placeholder="必填" v-model="form.clientSn" :disabled="formOff" @click="customerFun">
                            <input type="text" v-model="form.clientName" :disabled="formOff" @click="customerFun">
                            <button :disabled="formOff" @click="customerFun">。。。</button>
                        </li>
                        <li>
                            <label>属性</label>
                            <el-select v-model="form.property" placeholder="必选" :disabled="formOff">
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
                            <input type="text" placeholder="必填" v-model="form.address" :disabled="formOff">
                        </li>
                        <li>
                            <label>交货日期</label>
                            <el-date-picker format="yyyy 年 MM 月 dd 日" value-format="yyyy-MM-dd" v-model="form.deliveryDate" type="date" placeholder="必填" :disabled="formOff">
                            </el-date-picker>
                        </li>
                        <li>
                            <label>订单号</label>
                            <input type="text" v-model="form.sn" disabled placeholder="自动生成">
                        </li>
                        <li>
                            <label>来源号</label>
                            <input type="text" :disabled="formOff" v-model="form.originSn">
                        </li>
                        <li>
                            <label>品牌</label>
                            <el-select v-model="form.brand" placeholder="必选" :disabled="formOff">
                                <el-option v-for="item in this.brand" :key="item.name" :label="item.name" :value="item.name">
                                </el-option>
                            </el-select>
                        </li>
                    </ul>
                    <ul class="clearfix">
                        <li>
                            <label>价格性质</label>
                            <el-select v-model="form.priceNature" placeholder="必选" :disabled="formOff">
                                <el-option v-for="item in this.priceNature" :key="item.name" :label="item.name" :value="item.name">
                                </el-option>
                            </el-select>
                        </li>
                        <li>
                            <label>价格类型</label>
                            <el-select v-model="form.priceType" placeholder="必选" :disabled="formOff">
                                <el-option v-for="item in this.priceType" :key="item.name" :label="item.name" :value="item.name">
                                </el-option>
                            </el-select>
                        </li>
                        <li>
                            <label>币别</label>
                            <el-select v-model="form.currency" placeholder="必选" :disabled="formOff">
                                <el-option v-for="item in this.currency" :key="item.name" :label="item.name" :value="item.name">
                                </el-option>
                            </el-select>
                        </li>
                        <li>
                            <label>结算方式</label>
                            <el-select v-model="form.balanceMode" placeholder="必选" :disabled="formOff">
                                <el-option v-for="item in this.balanceMode" :key="item.name" :label="item.name" :value="item.name">
                                </el-option>
                            </el-select>
                        </li>
                        <li>
                            <label>备注</label>
                            <input type="text" :disabled="formOff" v-model="form.remark">
                        </li>
                        <button class="save" @click="doSaves" :class="{button_btn:!formOff}" :disabled="formOff">保存</button>
                    </ul>
                    <ul class="clearfix">
                        <li>
                            <label for="">款号</label>
                            <input type="text" v-model="spdaPsn" @click="searchspdaPsnFun" :disabled="spdaPsnOff">
                        </li>
                        <button class="save" :disabled="spdaPsnOff" @click="openSaves" :class="{button_btn:!spdaPsnOff}">查询</button>
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

        <!-- 底部页码 -->
        <div class="pageBox">
            <ul class="pageData">
                <li>
                    <span>编制人：</span>
                    <span>{{this.form.addUser}}</span>
                </li>
                <li>
                    <span>编制日期：</span>
                    <span>{{this.form.addDate}}</span>
                </li>
                <li>
                    <span>修改人：</span>
                    <span>{{this.form.updateUser}}</span>
                </li>
                <li>
                    <span>修改日期：</span>
                    <span>{{this.form.updateDate}}</span>
                </li>
                <li>
                    <span>审核人：</span>
                    <span>{{this.form.shUser}}</span>
                </li>
                <li>
                    <span>审核日期：</span>
                    <span>{{this.form.shDate}}</span>
                </li>
            </ul>
            <!-- <el-pagination @current-change="currentPage" :current-page='page' v-if="pageOnOff" background :page-size="pageSize" :pager-count="5" :total="total">
            </el-pagination> -->
        </div>

        <!-- 获取客户信息弹窗 -->
        <el-dialog title="客户信息" :visible.sync="customerOff">
            <el-input v-model="customerInfo" placeholder="客户编号 / 客户名称"></el-input>
            <ul class="srcond_menu">
                <li v-if="customerList.length===0">暂无数据</li>
                <li class="clearfix" v-for="(item,i) in customerList" :key="i">
                    <span class="search" @click="getSearchItem(item)">|--{{item.sn}}-{{item.name}}</span>
                </li>
            </ul>
        </el-dialog>

        <!-- 款号弹窗 -->
        <el-dialog title="款号" :visible.sync="spdaPsnSearchOff">
            <el-input v-model="searchSpdaPsn" placeholder="请输入你要查找的款号"></el-input>
            <ul class="srcond_menu">
                <li v-if="searchSpdaPsnList.length===0">暂无数据</li>
                <li class="clearfix" v-for="(item,i) in searchSpdaPsnList" :key="i">
                    <span class="search" @click="getspdaPsnItem(item)">|--{{item.psn}}</span>
                </li>
            </ul>
        </el-dialog>

        <!-- 添加数量弹窗 -->
        <el-dialog title="保存" :visible.sync="saveOff">
            <el-table :data="saveList" @cell-click="test">
                <el-table-column prop="spdaPsn" label="款号"></el-table-column>
                <el-table-column prop="color" label="颜色">
                    <template slot-scope="scope">
                            <input class="changeInput" v-model="scope.row.color" type="text"/>
                        </template>
                </el-table-column>
                <div v-for="(item, index) in this.sizeList" :key="index">
                    <el-table-column :prop="item" :label="item">
                        <!-- <template slot-scope="scope">
                            <input class="changeInput" v-model="scope.row.item" type="text"/>
                        </template> -->
                    </el-table-column>
                </div>
            </el-table>
            <!-- <table>
                <thead>
                    <tr>
                        <td>款号</td>
                        <td>颜色</td>
                        <td v-for="item in sizeList" :key="item">{{item}}</td>
                    </tr>
                    <tr></tr>
                </thead>
                <tbody>
                    <tr v-for="(item, index) in this.saveList" :key="index">
                        <block v-for="(name, i) in sizeList" :key="i">
                            <td v-for="(size, j) in item" :key="j">
                                <input :v-if="size == name" :value="size" />
                            </td>
                        </block>
                    </tr>
                </tbody>
            </table> -->
        </el-dialog>

        <!-- 导入弹窗 -->
        <el-dialog class="importExport" title="导入" :visible.sync="importbox" width="30%" :showClose="false" :show-file-list="false">
            <a class="down" href="/TPA/dSellOrder/downExcel">下载导入模板</a>
            <el-upload name="file" class="upload-demo" ref="upload" action="" :file-list="fileList" :http-request="uploadFile" :auto-upload="false" accept=".xls,.xlsx,.csv">
                <el-button slot="trigger" size="small" type="primary" plain>选取文件</el-button>
                <div slot="tip" class="el-upload__tip">只能上传excel文件</div>
            </el-upload>
            <span slot="footer" class="dialog-footer">
                <el-button @click="importCancel">取 消</el-button>
                <el-button type="primary" @click="submitUpload" plain>确 定</el-button>
            </span>
        </el-dialog>
        <div class="importZhe" v-if="importZhe" v-loading="true" element-loading-text="正在上传中..." element-loading-spinner="el-icon-loading" element-loading-background="rgba(0, 0, 0, 0.8)"></div>
        <!-- 下载错误文件 -->
        <el-dialog title="错误提示" :visible.sync="tipOffON">
            <ul class="srcond_menu">
                <li>
                    <el-alert :title="Tips" type="error"></el-alert>
                    <span style="margin-top:5vh">是否下载错误提示文件</span>
                </li>
                <span slot="footer" class="dialog-footer">
                    <el-button @click="tipOffON = importbox = false">取 消</el-button>
                    <el-button type="primary" @click="importErr">下载</el-button>
                </span>
            </ul>
        </el-dialog>
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
          remark: "", // 备注

          addUser: "", // 编制人
          addDate: "", // 编制日期
          updateUser: "", // 修改人
          updateDate: "", // 修改日期
          shUser: "", // 审核人
          shDate: "" // 审核日期
      },
      spdaPsn: "b11110003", // 款号
      formOff: true, // 表单禁用、开启
      spdaPsnOff: false, // 款号禁用、开启
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
      list: [], // 表格内容
      customerInfo: "", // 客户弹窗查询内容
      customerOff: false, // 客户弹窗开关
      customerList: [], // 客户弹窗列表 
      
      spdaPsnSearchOff: false, // 款号弹出框开关
      searchSpdaPsn: "", // 模糊查询的值
      searchSpdaPsnList: [], // 模糊查询列表

      saveOff: false, // 保存弹窗开关

      //导入弹出开关
      importbox: false,
      importZhe: false, //导入遮罩
      isCover: false, //默认导入不覆盖
      project: "", //错误文件名
      //上传的文件
      fileList: [],
      Tips: "", //错误提示
      tipOffON: false, //错误文件下载开关

      saveList: [], // 保存时款号颜色尺码列表
      sizeList: [], // 尺码组
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
        this.psnOff = true;
        this.form = {
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
            remark: "", // 备注

            addUser: "", // 编制人
            addDate: "", // 编制日期
            updateUser: "", // 修改人
            updateDate: "", // 修改日期
            shUser: "", // 审核人
            shDate: "" // 审核日期
        }
    },

    // 修改
    doChanges() {},

    //导入按纽
    doImports() {
      this.importbox = true;
    },
    //导入取消
    importCancel() {
      this.importbox = false;
      this.$refs.upload.clearFiles();
    },
    //文件上传到服务器按钮
    submitUpload() {
      this.$refs.upload.submit();
    },
    //自定义上传
    uploadFile(params) {
      this.importZhe = true;
      const _file = params.file;
      let formData = new FormData();
      formData.append("file", _file);
      this.$ajax
        .post("/TPA/dSellOrder/importExcel", formData)
        .then(res => {
          // console.log(res);
          if (res.status === 200) {
            if (res.data.code === 0) {
              succ(res.data.msg);
              this.getnavMenu();
              this.importCancel();
              this.$refs.upload.clearFiles();
            } else if (res.data.code === 100) {
              this.tipOffON = true;
              this.project = res.data.attachment.name;
              this.Tips = res.data.msg;
            } else {
              error(res.data.msg);
            }
          } else {
            NetworkAnomaly();
          }
          this.importZhe = false;
        })
        .catch(err => {
          NetworkAnomaly();
          this.importZhe = false;
        });
    },
    //下载错误文件按钮
    importErr() {
      let errUrl = "/TPA/aImportExcel/exportMsg?name=" + this.project;
      // console.log(errUrl)
      window.location.href = errUrl;
      setTimeout(() => {
        this.tipOffON = false;
        this.importCancel();
      }, 500);
    },
    //导出
    doExports() {
      window.location.href = "/TPA/dSellOrder/exportExcel";
    },

    // 打印
    doPrints() {},

    // 查询
    doSearchs() {},

    // 退出
    doOuts() {},

    // 审核
    doExamines() {

    },

    // 反审核
    doExamineAgains() {},

    // 终止
    doStops() {
        this.$http.post("/TPA/dSellOrderA/stop?status=1&id=").then(res => {

        })
        .catch(err => {
            NetworkAnomaly();
        })
    },

    // 反终止
    NotStops() {
        this.$http.post("/TPA/dSellOrderA/stop?status=0&id=").then(res => {

        })
        .catch(err => {
            NetworkAnomaly();
        })
    },

    // 关单
    closeOrders() {
        this.$http.post("/TPA/dSellOrderA/close?status=1&id=").then(res => {

        })
        .catch(err => {
            NetworkAnomaly();
        })
    },

    // 开单
    doOrders() {
        this.$http.post("/TPA/dSellOrderA/close?status=0&id=").then(res => {

        })
        .catch(err => {
            NetworkAnomaly();
        })
    },

    // 获取左侧树形导航数据
    getnavMenu() {
        this.$http.post("/TPA/dSellOrder/tree").then(res => {
            // console.log(res)
        })
    },

    // 获取所有下拉选择的数据
    getChoose() {
        // 仓库选择
        this.$http.post("/TPA/aRepertory/option").then(res => {
            // console.log(res)
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

    // 点击弹出客户弹窗
    customerFun() {
        this.customerOff = true;
    },

     // 客户弹窗选择
    getSearchItem(item) {
      this.customerInfo = "";
      this.customerOff = false;
      this.form.clientSn = item.sn;
      this.form.clientName = item.name;
    },

    // 表单保存
    doSaves() {
        let terms = this.form.activeDate && this.form.clientSn && this.form.priceType && this.form.address 
        && this.form.deliveryDate && this.form.brand && this.form.priceNature && this.form.priceType
        && this.form.currency && this.form.balanceMode;
        if(terms) {
            this.$http.post("/TPA/dSellOrder/insert", qs.stringify(this.form)).then(res => {
                this.form.sn = res.data.data.sn;
                this.spdaPsnOff = false;
            })
        } else {
            error("请填写所有必填项");
        }
        this.formOff = true;
    },

    // 打开款号查询弹窗
    searchspdaPsnFun() {
        this.spdaPsnSearchOff = true;
    },

    // 款号查询弹窗选择
    getspdaPsnItem(item) {
        this.searchSpdaPsn = "";
        this.spdaPsnSearchOff = false;
        this.spdaPsn = item.psn;
    },

    // 打开保存弹窗
    openSaves() {
        if(this.spdaPsn) {
            this.$http.post("/TPA/dSellOrder/order?psn=" + this.spdaPsn).then(res => {
                // 将所有尺码拿出来
                let Arr = [];
                for(let i in res.data.data[0]) {
                    if(i != "color") {
                        Arr.push(i);
                    }
                }
                this.sizeList = Arr;

                // 给每一个数据加上款号
                let Res = res.data.data;
                for (let i = 0; i < Res.length; i++) {
                    Res[i].spdaPsn = this.spdaPsn;
                }
                console.log(Res)
                this.saveList = Res;

                this.saveOff = true;
            })
            .catch(err => {
                NetworkAnomaly();
            })
        } else {
            error("请先填写款号")
        }
    },

    // 双击当前行
    chooseRow(e) {
        console.log(e)
    },

    // 双击单元格
    test(row, column, cell, event) {
        console.log(row)
        console.log(column)
        console.log(cell)
        console.log(event)
    }
  },

  mounted() {
    this.getnavMenu();
    this.getChoose();
  },

  watch: {
    customerInfo() {
      if (this.customerInfo.length !== 0) {
        this.$http.post("/TPA/aKsDa/option?nature=客户&name=" + this.customerInfo).then(res => {
            this.customerList = res.data.data;
          })
          .catch(err => {
            NetworkAnomaly();
          });
      } else {
        this.customerList = [];
      }
    },

    searchSpdaPsn() {
        if (this.searchSpdaPsn.length !== 0) {
        this.$http
          .post("/TPA/cSpda/option?psn=" + this.searchSpdaPsn)
          .then(res => {
            this.searchSpdaPsnList = res.data.data;
            // console.log(res)
          })
          .catch(err => {
            NetworkAnomaly();
          });
        } else {
            this.searchSpdaPsnList = [];
        }
    }
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
