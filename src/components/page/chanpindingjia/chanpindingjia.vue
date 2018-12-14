<template>
    <div class="container" :class="{container_collapse:collapse}">
        <!-- 页面标题 -->
        <p class="page_title">产品定价</p>

        <!-- 顶部操作按钮 -->
        <div class="btn-box">
            <button class="save button_btn" @click="newOrderFun">新建单号</button>
            <button :disabled='doExport' :class="{button_btn:!doExport}" @click="doExports">导出</button>
            <button :disabled='doImport' :class="{button_btn:!doImport}" @click="doImports">导入</button>
            <button :disabled='doPrint' :class="{button_btn:!doPrint}" @click="doPrints">打印</button>
            <button class="button_btn" @click="doOuts">退出</button>
            <button @click="doSearchs" class="button_btn">查询</button>
            <div class="btn_right">
                <button class="button_btn" @click="doExamines">审核</button>
                <button class="button_btn" @click="doExamineAgains">反审</button>
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
                            <label>单据编号</label>
                            <input type="text" :value="form.sn" placeholder="自动生成" disabled>
                        </li>
                        <li>
                            <label>款号</label>
                            <input type="text" v-model="form.psn" @click="searchSn" :disabled="formOff">
                        </li>
                        <li>
                            <label>生效日期</label>
                            <el-date-picker format="yyyy 年 MM 月 dd 日" value-format="yyyy-MM-dd" v-model="form.activeDate" type="date" placeholder="选择日期" :disabled="formOff">
                            </el-date-picker>
                        </li>
                    </ul>
                    <ul class="clearfix">
                        <li>
                            <label>价格类型</label>
                            <el-select v-model="form.type" placeholder="请选择" :disabled="formOff">
                                <el-option v-for="item in this.Type" :key="item.name" :label="item.name" :value="item.name">
                                </el-option>
                            </el-select>
                        </li>
                        <li>
                            <label>价格</label>
                            <input type="text" v-model="form.price" :disabled="formOff">
                        </li>
                        <button class="save" @click="doSaves" :class="{button_btn:!formOff}" :disabled="formOff">保存</button>
                        <button class="save" @click="doCancels" :class="{button_btn:!formOff}" :disabled="formOff">取消</button>
                    </ul>
                </div>

                <!-- 表格内容 -->
                <div class="order_table">
                    <el-table :data="list" :span-method="objectSpanMethod" border style="width: 100%" ref="multipleTable" tooltip-effect="dark" @selection-change="handleSelectionChange" @sort-change='sortChange' :default-sort="{prop: 'psn', order: 'ascending'}">
                        <el-table-column type="selection" min-width="6%">
                        </el-table-column>
                        <el-table-column prop="sn" label="单据单号" min-width="12%">
                        </el-table-column>
                        <el-table-column prop="psn" label="款号" min-width="12%" sortable='custom'>
                        </el-table-column>
                        <el-table-column prop="type" label="价格类型" min-width="12%" sortable='custom'>
                        </el-table-column>
                        <el-table-column prop="price" label="价格" min-width="12%">
                        </el-table-column>
                        <el-table-column prop="activeDate" label="生效日期" min-width="12%" sortable='custom'>
                        </el-table-column>
                        <el-table-column prop="addUser" label="编制人" min-width="6%">
                        </el-table-column>
                        <el-table-column fixed="right" label="操作" min-width="18%">
                            <template slot-scope="scope">
                                <el-button :disabled="(scope.row.sh == 1)" :class="{btn:scope.row.sh == 1}" type="text" @click="handleEdit(scope.$index, scope.row)">修改</el-button>
                                <el-button :disabled="(scope.row.sh == 1)" :class="{btn:scope.row.sh == 1}" type="text" @click="tableDelete(scope.$index, scope.row)">删除</el-button>
                                <el-button v-if="(scope.row.sh == 1)" disabled class="btn">已审</el-button>
                                <el-button v-else-if="(scope.row.sh == 0)" disabled class="btn">未审</el-button>
                            </template>
                        </el-table-column>
                    </el-table>
                </div>
            </div>

            <!-- 底部页码 -->
            <div class="pageBox">
                <el-pagination @current-change="currentPage" :current-page='page' v-if="pageOnOff" background :page-size="pageSize" :pager-count="5" :total="total">
                </el-pagination>
            </div>
        </div>

        <!-- 输入查询弹出框 -->
        <el-dialog title="款号" :visible.sync="psnSearch">
            <!-- <el-input v-model="searchXun" placeholder="请输入你要查找的款号"></el-input>
            <ul class="srcond_menu">
                <li v-if="searchList.length===0">暂无数据</li>
                <li class="clearfix" v-for="(item,i) in searchList" :key="i">
                    <span class="search" @click="getSearchItem(item)">|--{{item.pSn}}</span>
                </li>
            </ul> -->

            <el-input v-model="searchXun" placeholder="请输入你要查找的款号"></el-input>
            <el-button @click="searchXunFun">查询</el-button>
            <ul class="srcond_menu">
                <li v-if="searchList.length===0">暂无数据</li>
                <li class="clearfix" v-for="(item,i) in searchList" :key="i">
                    <span class="search" @click="getSearchItem(item)">|--{{item.pSn}}</span>
                </li>
            </ul>
        </el-dialog>

        <!-- 查询按钮弹出框 -->
        <el-dialog title="查询" :visible.sync="searchFormShow" width="30%">
            <el-form :model="searchForm" label-width="100px">
                <el-form-item label="单据单号">
                    <el-input v-model="searchForm.sn"></el-input>
                </el-form-item>
                <el-form-item label="款号">
                    <el-input v-model="searchForm.psn"></el-input>
                </el-form-item>
                <el-form-item label="价格类别">
                    <el-select v-model="searchForm.type" placeholder="请选择">
                        <el-option v-for="item in this.Type" :key="item.name" :label="item.name" :value="item.name">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="价格">
                    <el-input type="number" v-model="searchForm.price"></el-input>
                </el-form-item>
                <el-form-item label="生效日期">
                    <el-date-picker format="yyyy 年 MM 月 dd 日" value-format="yyyy-MM-dd" v-model="searchForm.activeDate" type="date" placeholder="选择日期"> </el-date-picker>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="searchFormShow = false">取 消</el-button>
                <el-button type="primary" @click="saveEdit">确 定</el-button>
            </span>
        </el-dialog>

        <!-- 修改弹窗 -->
        <el-dialog title="修改" :visible.sync="editVisible" width="30%">
            <el-form :model="dialog" label-width="100px">
                <!-- <el-form-item label="单据单号">
                    <el-input v-model="dialog.sn" disabled></el-input>
                </el-form-item>
                <el-form-item label="款号">
                    <el-input v-model="dialog.psn" disabled></el-input>
                </el-form-item>
                <el-form-item label="价格类别">
                    <el-select v-model="dialog.type" placeholder="请选择">
                        <el-option v-for="item in this.Type" :key="item.name" :label="item.name" :value="item.name">
                        </el-option>
                    </el-select>
                </el-form-item> -->
                <el-form-item label="价格">
                    <el-input v-model="dialog.price"></el-input>
                </el-form-item>
                <el-form-item label="生效日期">
                    <el-date-picker format="yyyy 年 MM 月 dd 日" value-format="yyyy-MM-dd" v-model="dialog.activeDate" type="date" placeholder="选择日期"> </el-date-picker>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="editVisible = false">取 消</el-button>
                <el-button type="primary" @click="saveRevise">确 定</el-button>
            </span>
        </el-dialog>

        <!-- 导入弹窗 -->
        <el-dialog class="importExport" title="导入" :visible.sync="importbox" width="30%" :showClose="false" :show-file-list="false">
            <a class="down" href="/TPA/cProductPrice/downExcel">下载导入模板</a>
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
  name: "chanpindingjia",
  data() {
    return {
      // 按钮disable
      doExport: false,
      doImport: false,
      doPrint: true,
      form: {
        psn: "",
        type: "",
        price: "",
        sh: "",
        sn: "",
        activeDate: ""
      },
      // 下拉数据
      Type: [],
      // 审核状态
      checked: true,
      navMenus: [], //导航数据
      // 表格数据
      list: [],
      rowList: [],
      djArr: [],
      khArr: [],
      djPosition: 0,
      khPosition: 0,
      // 输入查询弹出框开关
      psnSearch: false,
      // 模糊查询的值
      searchXun: "",
      // 模糊查询列表
      searchList: [],
      // 查询弹出框
      searchFormShow: false,
      searchForm: {
        psn: "",
        type: "",
        price: "",
        activeDate: ""
      },
      //分页：当前页码/总数量/每页显示条数
      page: 0,
      total: "",
      pageSize: 10,
      pageOnOff: false,
      //分页排序查询条件
      pageParams: {
        orderBy: "type"
      },
      // 修改弹窗内容
      editVisible: false,
      dialog: {},
      // 选择审核内容
      multipleSelection: [],
      // 打印条件
      printParams: [],
      //导入弹出开关
      importbox: false,
      importZhe: false, //导入遮罩
      isCover: false, //默认导入不覆盖
      project: "", //错误文件名
      //上传的文件
      fileList: [],
      Tips: "", //错误提示
      tipOffON: false, //错误文件下载开关

      // 表单禁用/显示
      formOff: true
    };
  },
  methods: {
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
        .post("/TPA/cProductPrice/importExcel", formData)
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
      window.location.href = "/TPA/cProductPrice/exportExcel";
    },

    //打印
    doPrints() {
      // console.log(this.list);
      this.$http
        .post("/TPA/cProductPrice/print", qs.stringify(this.printParams))
        .then(res => {
          if (res.data.code === 0) {
            console.log(res.data.data);
            localStorage.setItem("printList", JSON.stringify(res.data.data));
            if (localStorage.getItem("printList")) {
              window.open("/erp/#/chanpindingjiaPrint");
            }
          }
        })
        .catch(err => {
          NetworkAnomaly();
        });
    },

    // 退出
    doOuts() {
      this.$emit("getOut", this.$route.name);
    },

    // 查询
    doSearchs() {
      this.searchForm = {
        psn: "",
        type: "",
        price: "",
        activeDate: ""
      };
      this.searchFormShow = true;
    },

    // 审核
    doExamines() {
      let idArr = [];
      for (var i in this.multipleSelection) {
        let obj = {};
        obj.id = this.multipleSelection[i].id;
        obj.status = "1";
        idArr.push(obj);
        // idArr.push(this.multipleSelection[i].id)
      }
      if (this.multipleSelection.length != 0) {
        this.$http
          .post("/TPA/cProductPrice/auditing", idArr)
          .then(res => {
            if (res.data.code === 0) {
              // console.log(res);
              this.getPageData();
            }
          })
          .catch(err => {
            NetworkAnomaly();
          });
      } else {
        error("未选中需审核的内容");
      }
    },

    // 反审
    doExamineAgains() {
      let idArr = [];
      for (var i in this.multipleSelection) {
        let obj = {};
        obj.id = this.multipleSelection[i].id;
        obj.status = "0";
        idArr.push(obj);
        // idArr.push(this.multipleSelection[i].id)
      }
      if (this.multipleSelection.length != 0) {
        this.$http
          .post("/TPA/cProductPrice/auditing", idArr)
          .then(res => {
            if (res.data.code === 0) {
              // console.log(res);
              this.getPageData();
            }
          })
          .catch(err => {
            NetworkAnomaly();
          });
      } else {
        error("未选中需反审的内容");
      }
    },

    // 保存
    doSaves() {
      if (this.form.psn.length === 0) {
        error("款号不能为空");
      } else if (this.form.type.length === 0) {
        error("价格类型不能为空");
      } else if (this.form.price.length === 0) {
        error("价格不能为空");
      } else if (this.form.activeDate.length === 0) {
        error("生效日期不能为空");
      } else {
        this.$http
          .post("/TPA/cProductPrice/insert", qs.stringify(this.form))
          .then(res => {
            if (res.data.code === 0) {
              this.pageParams.sn = res.data.data.sn;
              this.page = 1;
              this.pageParams.page = this.page - 1;
              this.pageParams.count = this.pageSize;
              this.getPageData();
              this.getnavMenu();
            } else {
              error(res.data.msg);
            }
          })
          .catch(err => {
            NetworkAnomaly();
          });
      }
    },

    // 取消
    doCancels() {
      this.form = {
        psn: "",
        type: "",
        price: "",
        sh: "",
        sn: "",
        activeDate: ""
      };
      this.formOff = true;
    },

    // 新建单号
    newOrderFun() {
      this.$http.post("/TPA/cProductPrice/insertSn").then(res => {
        if (res.data.code === 0) {
          this.formOff = false;
          this.form = {
            psn: "",
            type: "",
            price: "",
            sh: "",
            sn: res.data.data.sn,
            activeDate: ""
          };
        }
      });
    },

    // 修改
    handleEdit(index, row) {
      this.idx = index;
      const item = this.list[index];
      (this.dialog = {
        id: item.id,
        psn: item.psn,
        type: item.type,
        price: item.price,
        activeDate: item.activeDate
      }),
        (this.editVisible = true);
    },

    // 保存修改
    saveRevise() {
      if (this.dialog.type.length == 0) {
        error("价格类别不能为空");
      } else if (this.dialog.price.length == 0) {
        error("价格不能为空");
      } else if (this.dialog.activeDate.length == 0) {
        error("生效日期不能为空");
      } else {
        this.$http
          .post("/TPA/cProductPrice/update", qs.stringify(this.dialog))
          .then(res => {
            if (res.data.code === 0) {
              this.getPageData();
              this.editVisible = false;
            } else {
              error(res.data.msg);
            }
          })
          .catch(err => {
            NetworkAnomaly();
          });
      }
    },

    // 删除
    tableDelete(index, row) {
      this.idx = index;
      const item = this.list[index];
      this.$http
        .post("/TPA/cProductPrice/delete?status=1&id=" + item.id)
        .then(res => {
          if (res.data.code === 0) {
            this.getPageData();
          } else {
            error(res.data.msg);
          }
        })
        .catch(err => {
          NetworkAnomaly();
        });
    },

    // 获取类型
    getBrand() {
      this.$http
        .post("/TPA/aLbJb/option?sn=027")
        .then(res => {
          if (res.data.code === 0) {
            this.Type = res.data.data;
          } else {
            error(res.data.msg);
          }
        })
        .catch(err => {
          NetworkAnomaly();
        });
    },

    // 获取左侧树形导航数据
    getnavMenu() {
      this.$http
        .post("/TPA/cProductPrice/tree")
        .then(res => {
          // console.log(res);
          if (res.data.code === 0) {
            this.navMenus = res.data.data;
          } else {
            error(res.data.msg);
          }
        })
        .catch(err => {
          NetworkAnomaly();
        });
    },

    // 点击左侧导航
    menuSelected(e) {
      // console.log(e);
      this.searchForm.sn = e;
      this.formOff = false;
      this.doCancels();
      this.form.sn = e;
      this.formOff = false;
      this.saveEdit();
    },

    // 款号查询
    searchSn() {
      this.searchXun = "";
      this.psnSearch = true;
    },

    // 款号弹窗按钮
    searchXunFun() {
      if (this.searchXun.length !== 0) {
        let search = {
          pSn: 17 + "|" + this.searchXun
        };
        let searchStr = JSON.stringify(search);
        this.$http
          .post("/TPA/cSpda/search?sp=1&search=" + searchStr)
          .then(res => {
            this.searchList = res.data.data.list;
            // console.log(res.data.data.list)
          })
          .catch(err => {
            NetworkAnomaly();
          });
      } else {
        this.searchList = [];
      }
    },

    // 选择查询
    getSearchItem(item) {
      this.psnSearch = false;
      this.form.psn = item.pSn;
    },

    // 点击查询弹出框查询按钮
    saveEdit() {
      let params = {};
      if (this.searchForm.sn != "") {
        params.sn = this.searchForm.sn;
        // 添加打印条件
        this.printParams.sn = this.searchForm.sn;
      }
      if (this.searchForm.psn.length != 0) {
        params.psn = this.searchForm.psn;
        // 添加打印条件
        this.printParams.psn = this.searchForm.psn;
      }
      if (this.searchForm.type.length != 0) {
        params.type = this.searchForm.type;
        // 添加打印条件
        this.printParams.type = this.searchForm.type;
      }
      if (this.searchForm.price.length != 0) {
        params.price = this.searchForm.price;
        // 添加打印条件
        this.printParams.price = this.searchForm.price;
      }
      if (this.searchForm.activeDate.length != 0) {
        params.activeDate = this.searchForm.activeDate;
        // 添加打印条件
        this.printParams.activeDate = this.searchForm.activeDate;
      }
      if (
        !params.sn &&
        !params.psn &&
        !params.type &&
        !params.price &&
        !params.activeDate
      ) {
        error("至少输入一个查询条件");
      } else {
        // 查询条件
        params.orderBy = "type";
        this.page = 1;
        params.page = this.page - 1;
        params.count = this.pageSize;
        this.pageParams = params;
        this.searchFormShow = false;
        this.getPageData();
        // 清空查询条件
        this.searchForm = {
          psn: "",
          type: "",
          price: "",
          activeDate: ""
        };
      }
    },

    // 排序
    sortChange(column) {
      if (this.pageParams.orderBy.length !== 0) {
        if (column.prop == "type" && column.order == "ascending") {
          this.pageParams.orderBy = "type";
        } else if (column.prop == "activeDate" && column.order == "ascending") {
          this.pageParams.orderBy = "active_date";
        } else if (column.prop == "psn" && column.order == "ascending") {
          this.pageParams.orderBy = "psn";
        } else {
          this.pageParams.orderBy = "type";
        }
      }
      if (this.list.length !== 0) {
        this.getPageData();
      }
    },

    //获取分页数据
    getPageData() {
      this.$http
        .post(
          "/TPA/cProductPrice/search?delStatus=0",
          qs.stringify(this.pageParams)
        )
        .then(res => {
          if (res.data.code === 0) {
            succ(res.data.msg);
            this.doPrint = false;
            this.list = res.data.data.list;

            // this.page = 1;
            this.pageOnOff = false;

            // 重置表格合并
            this.rowList = [];
            this.djArr = [];
            this.djPosition = 0;
            this.khArr = [];
            this.khPosition = 0;
            this.rowspan();

            if (this.list.length === 0) {
              this.doPrint = true;
            }
            this.total = res.data.data.total;
            if (this.total > this.pageSize) {
              this.pageOnOff = true;
            } else {
              this.pageOnOff = false;
            }
            // 清除表单数据
            this.form.type = "";
            this.form.price = "";
          } else {
            error(res.data.msg);
          }
        })
        .catch(err => {
          NetworkAnomaly();
        });
    },

    //获取当前页码
    currentPage(val) {
      this.page = val;
      this.pageParams.page = this.page - 1;
      this.getPageData();
    },

    // 选择要审核的内容
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },

    rowspan() {
      this.list.forEach((item, index) => {
        if (index === 0) {
          this.djArr.push(1);
          this.djPosition = 0;
          this.khArr.push(1);
          this.khPosition = 0;
        } else {
          if (this.list[index].sn === this.list[index - 1].sn) {
            this.djArr[this.djPosition] += 1;
            this.djArr.push(0);
          } else {
            this.djArr.push(1);
            this.djPosition = index;
          }
          if (
            this.list[index].psn === this.list[index - 1].psn &&
            this.list[index].sn === this.list[index - 1].sn
          ) {
            this.khArr[this.khPosition] += 1;
            this.khArr.push(0);
          } else {
            this.khArr.push(1);
            this.khPosition = index;
          }
        }
      });
    },
    objectSpanMethod({ row, column, rowIndex, columnIndex }) {
      //表格合并行
      if (columnIndex === 1) {
        // 第一列合并单号
        const _row_1 = this.djArr[rowIndex];
        const _col_1 = _row_1 > 0 ? 1 : 0;
        return {
          rowspan: _row_1,
          colspan: _col_1
        };
      }
      if (columnIndex === 2) {
        const _row_2 = this.khArr[rowIndex];
        const _col_2 = _row_2 > 0 ? 1 : 0;
        return {
          rowspan: _row_2,
          colspan: _col_2
        };
      }
    }
  },
  mounted() {
    this.getBrand();
    this.getnavMenu();
  },
  computed: {
    ...mapState(["collapse"])
  },
  watch: {
    page() {
            if (this.page > 0) {
                this.pageParams.page = this.page - 1;
            }
            this.getPageData();
        },
    // page() {
    //   this.currentPage();
    // }
  },

  // 引入组件
  components: {
    NavMenu
  }
};
</script>

<style lang="stylus" scoped>
.container>>> .el-select
  width: 70%
  display: inline-block
  position: relative
.container>>>.el-select>.el-input
  width: 100%
  line-height: 3.5vh
  display: inline-block
.container>>> .el-input__inner
  width: 100% !important
  font-size: 1.6vh
  height: 3.5vh !important
  padding-left: 3.5vh !important
  border-radius: 0
// 日期
.container>>> .el-date-editor.el-input
  width: 70%
  font-size: 1.4vh
.container>>> .el-input__icon
  height: auto
  line-height: 3.5vh
.container>>>.el-date-editor
  float: left
  width: 70%
.container>>>th, .order_table>>>.el-table td, .el-table th
  padding: 0
.container>>>.info_form ul li, .container>>>.el-table .cell
  height: 4vh
  line-height: 4vh
  text-align: center
  font-size: 1.6vh
.container>>>.el-table__empty-block
  min-height: 3.5vh

// 弹出框
.container>>>.el-dialog
  width: 390px 
  height: 460px
  overflow-y: auto
  .el-dialog__headerbtn
    border none
  .el-input
    width 75%
    float left
  button
    height 3.5vh 
    line-height: 3.5vh
    width 60px
    background #ffffff
    margin-left 10px 
    border 1px solid #409EFF
    color #409EFF  
    padding: 0
.container>>>.el-dialog .el-table td
  padding: 0
.container>>>.el-dialog__body
  cursor: pointer !important
  line-height: 2.5vh
  font-weight: bold
  padding: 1vh 2vh
  li
    &:hover
      background: #d2d2d2
    span
      width: 50%
      float: left
      padding-left: 15%
      float: left
      display: block
      line-height: 3vh
      &.search
        width: 33%
        padding-left: 5%
.el-dialog__body .el-form-item
  margin-bottom: 2px
.el-dialog__body .el-form-item .el-form-item__content .el-input
  width: 70%
.menu_box
  width: 13%
.set_info
  width: 87%
.info_form
  width: 100%
  ul
    width: 100%
  li
    height: 3.5vh
    margin: 1vh 0
    float: left
    width: 20%
    label
      float: left
      line-height: 3.5vh
      width: 30%
      text-align: center
    input
      height: 3.5vh
      line-height: 3.5vh
      border: 0.1vh solid #d2d2d2
      outline: none
      padding-left: 1vh
      width: 70%
      float: left
      overflow: hidden
    button
      width: 50px
      height: 3.5vh
      border: 0.1vh solid #d2d2d2
      background: none
      margin-left: 5px
      line-height: 3.5vh
      text-align: center
      border-radius: 5px
      cursor: pointer
  li.date
    width: 30%
  .formQuery
    width: 30%
  .save
    padding: 0 2vh
    height: 3.5vh
    line-height: 3.5vh
    border: 0.1vh solid #d9d9d9
    background: #ffffff
    margin-top: 1.3vh
    margin-left: 1.5vh
    font-size: 1.2vh
    display: block
    float: left
    text-align: center
    text-decoration: underline
    cursor: pointer
    border-radius: 4px
    &.button_btn
      border: 0.1vh solid #409EFF
      font-weight: bold
      color: #409EFF
.btn-box
  min-width: 1200px
// 审核
.checkBox
  width: 5%
  height: 3.5vh
  margin: 1vh 0
  margin-left: 5px
  float: left
  display: flex
  align-items: center
// 表格
.order_table
  width: 99%
  margin: 5px auto 0
  max-height: 550px
  border: 0.1vh solid #d9d9d9
  overflow: hidden
  .el-button
    padding: 0.6vh 2vh
    margin-top: 0.4vh
    border: 0.1vh solid #409eff
    color: #409eff
    font-size: 1.6vh
    &.btn
      border: 0.1vh solid #d2d2d2
      color: #d2d2d2
// 底部
.container>>>.el-pagination
  width: 40%
.container>>>.el-pager
  min-width: 50px
.container>>>.el-pagination
  right: 24%
</style>