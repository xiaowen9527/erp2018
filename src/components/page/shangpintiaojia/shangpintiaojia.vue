<template>
    <div class="container">
         <!-- 页面标题 -->
        <p class="page_title">商品调价</p>

         <!-- 顶部操作按钮 -->
        <div class="btn-box">
            <button class="button_btn" @click="doNews">新增</button>
            <button class="button_btn" @click="doCancels">取消</button>
            <button :disabled='doExport' :class="{button_btn:!doExport}" @click="doExports">导出</button>
            <button :disabled='doImport' :class="{button_btn:!doImport}" @click="doImports">导入</button>
            <button @click="doUpdates" class="save" :class="{button_btn: (secondForm.masterSn) && (firstForm.sh == 0)}" :disabled="(!secondForm.masterSn || firstForm.sh != 0)">修改</button>
            <button @click="doSearchs" class="button_btn">查询</button>
            <input type="text" class="queryInfo" @click="searchSnFun" v-model="queryInfo"/>
            <button class="button_btn" @click="doOuts">退出</button>
            <div class="btn_right">
                <button class="save" :class="{button_btn:firstForm.sh == 0}" :disabled="(firstForm.sh != 0)" @click="doExamines">审核</button>
                <button class="save" :class="{button_btn:firstForm.sh == 1}" :disabled="(firstForm.sh != 1)" @click="doExamineAgains">反审</button>
            </div>
        </div>

        <div class="set_info">
            <!-- 表单内容 -->
            <div class="info_form">
                <ul class="clearfix">
                    <li>
                        <label>生效日期</label>
                        <el-date-picker format="yyyy 年 MM 月 dd 日" value-format="yyyy-MM-dd" v-model="firstForm.activeDate" type="date" placeholder="选择日期" :disabled="firstFormOff">
                        </el-date-picker>
                    </li>
                    <li>
                        <label>截止日期</label>
                        <el-date-picker format="yyyy 年 MM 月 dd 日" value-format="yyyy-MM-dd" v-model="firstForm.stopDate" type="date" placeholder="选择日期" :disabled="firstFormOff">
                        </el-date-picker>
                    </li>
                    <li>
                        <label>调价单号</label>
                        <input type="text" :value="secondForm.masterSn" placeholder="自动生成" disabled>
                    </li>
                </ul>
                <div class="customer">
                  <button class="save" :class="{customer_btn: !firstFormOff}" :disabled="firstFormOff" @click="customerFun">添加客户</button>
                  <div class="customer_box">
                    <el-tag v-for="tag in customerTag" :key="tag.customer" :closable="!firstFormOff" :disable-transitions="true" @close="handleClose(tag)">
                      {{tag.customer}}
                    </el-tag>
                  </div>
                  <button class="save" :disabled="firstFormOff" :class="{customer_btn: !firstFormOff}" @click="doSaves1">保存</button>
                </div>
                <ul class="clearfix">
                    <li>
                        <label>款号</label>
                        <input type="text" v-model="secondForm.psn" :disabled="secondFormOff">
                    </li>
                    <li>
                        <label>价格类型</label>
                        <el-select v-model="secondForm.priceType" placeholder="请选择" :disabled="secondFormOff">
                            <el-option v-for="item in this.Type" :key="item.name" :label="item.name" :value="item.name">
                            </el-option>
                        </el-select>
                    </li>
                    <li>
                        <label>价格</label>
                        <input type="text" v-model="secondForm.price" :disabled="secondFormOff">
                    </li>
                    <button class="save" @click="doSaves2" :class="{button_btn:!secondFormOff}" :disabled="secondFormOff">保存</button>
                </ul>
            </div>

            <!-- 表格内容 -->
            <div class="order_table client_table fl">
              <el-table :data="clientList" stripe border height="298px">
                  <el-table-column prop="sn" label="客户">
                  </el-table-column>
              </el-table>
            </div>

            <div class="order_table fl" style="width: 78%">
                <el-table :data="list" stripe border index style="width: 100%" ref="multipleTable" tooltip-effect="dark" @sort-change='sortChange' :span-method="objectSpanMethod" :default-sort="{prop: 'psn', order: 'ascending'}">
                    <el-table-column prop="sn" label="调价单号" min-width="12.5%">
                    </el-table-column>
                    <el-table-column prop="psn" label="款号" min-width="12.5%" sortable='custom'>
                    </el-table-column>
                    <el-table-column prop="priceType" label="价格类型" min-width="12.5%" sortable='custom'>
                    </el-table-column>
                    <el-table-column prop="price" label="价格" min-width="12.5%">
                    </el-table-column>
                    <el-table-column prop="activeDate" label="生效日期" min-width="12.5%" sortable='custom'>
                    </el-table-column>
                    <el-table-column prop="stopDate" label="截止日期" min-width="12.5%">
                    </el-table-column>
                    <el-table-column prop="addUser" label="编制人" min-width="10%">
                    </el-table-column>
                    <el-table-column fixed="right" label="操作" min-width="15%">
                        <template slot-scope="scope">
                            <el-button :disabled="(scope.row.sh == 1)" :class="{btn:scope.row.sh == 1}" type="text" @click="handleEdit(scope.$index, scope.row)">修改</el-button>
                            <el-button :disabled="(scope.row.sh == 1)" :class="{btn:scope.row.sh == 1}" type="text" @click="tableDelete(scope.$index, scope.row)">删除</el-button>
                            <!-- <el-button :disabled="(scope.row.sh == 1)" :class="{btn:scope.row.sh == 1}" type="text" @click="tableDelete(scope.$index, scope.row)">审核</el-button>
                            <el-button :disabled="(scope.row.sh == 0)" :class="{btn:scope.row.sh == 0}" type="text" @click="tableDelete(scope.$index, scope.row)">反审</el-button> -->
                        </template>
                    </el-table-column>
                </el-table>
            </div>

            <!-- 底部页码 -->
            <div class="pageBox">
              <ul class="pageData">
                <li>
                    <span>编制人：</span>
                    <span>{{this.bottom.addUser}}</span>
                </li>
                <li>
                    <span>编制日期：</span>
                    <span>{{this.bottom.addDate}}</span>
                </li>
                <li>
                    <span>修改人：</span>
                    <span>{{this.bottom.updateUser}}</span>
                </li>
                <li>
                    <span>修改日期：</span>
                    <span>{{this.bottom.updateDate}}</span>
                </li>
                <li>
                    <span>审核人：</span>
                    <span>{{this.bottom.shUser}}</span>
                </li>
                <li>
                    <span>审核日期：</span>
                    <span>{{this.bottom.shDate}}</span>
                </li>
              </ul>
              <el-pagination @current-change="currentPage" :current-page='page' v-if="pageOnOff" background :page-size="pageSize" :pager-count="5" :total="total">
              </el-pagination>
            </div>
        </div>

        <!-- 导入弹窗 -->
        <el-dialog class="importExport" title="导入" :visible.sync="importbox" width="30%" :showClose="false" :show-file-list="false">
            <a class="down" href="/TPA/dAdjustPrice/downExcel">下载导入模板</a>
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

        <!-- 单号弹窗 -->
        <el-dialog title="调价单号" :visible.sync="SearchSnOff">
            <el-input v-model="searchSn" placeholder="请输入你要查找的调价单号"></el-input>
            <ul class="srcond_menu">
                <li v-if="searchSnList.length===0">暂无数据</li>
                <li class="clearfix" v-for="(item,i) in searchSnList" :key="i">
                    <span class="search" @click="getspdaPsnItem(item)">|--{{item.sn}}</span>
                </li>
            </ul>
        </el-dialog>

        <!-- 获取客户信息弹窗 -->
        <el-dialog title="客户信息" :visible.sync="customerOff">
            <el-input v-model="customerInfo" placeholder="客户编号 / 客户名称"></el-input>
            <!-- <el-button @click="customerInfoFun">查询</el-button> -->
            <div class="customer_mask">
              <el-table :data="customerList" stripe @selection-change="handleSelectionChange">
                <el-table-column type="selection" min-width="10%"></el-table-column>
                <el-table-column label="客户编号及名称" prop="customer" min-width="90%"></el-table-column>
            </el-table>
            </div>
            <button class="addCustomer" @click="addCustomer">添加</button>
        </el-dialog>

        <!-- 修改弹窗 -->
        <el-dialog title="修改" :visible.sync="editVisible" width="30%">
            <el-form :model="dialog" label-width="100px">
                <el-form-item label="价格">
                    <el-input v-model="dialog.price"></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="editVisible = false">取 消</el-button>
                <el-button type="primary" @click="saveRevise">确 定</el-button>
            </span>
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
// import NavMenu from "./NavMenu";
export default {
  name: "shangpintiaojia",
  data() {
    return {
      doExport: false,
      doImport: false,
      //导入弹出开关
      importbox: false,
      importZhe: false, //导入遮罩
      isCover: false, //默认导入不覆盖
      project: "", //错误文件名
      //上传的文件
      fileList: [],
      Tips: "", //错误提示
      tipOffON: false, //错误文件下载开关
      queryInfo: "",
      firstForm: {
        activeDate: "",
        stopDate: "",
        sn: "",
        client: [],
        sh: ""
      },
      secondForm: {
        masterSn: "",
        psn: "",
        priceType: "",
        price: ""
      },
      firstFormOff: true, // 第一个保存开关
      secondFormOff: true, // 第二个保存开关
      Type: [],
      list: [],
      clientList: [],
      rowList: [],
      djArr: [],
      khArr: [],
      djPosition: 0,
      khPosition: 0,
      //分页：当前页码/总数量/每页显示条数
      page: 0,
      total: "",
      pageSize: 10,
      pageOnOff: false,
      //分页排序查询条件
      pageParams: {
        orderBy: "price_type"
      },
      // 客户弹窗内容
      customerOff: false,
      customerInfo: "",
      customerList: [],
      multipleSelection: [], // 多选内容
      customerTag: [], // 显示已添加的客户
      // 修改弹窗内容
      editVisible: false,
      dialog: {},

      // 单号模糊查询
      SearchSnOff: false,
      searchSnList: [],
      searchSn: "",

      bottom: {}
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
        .post("/TPA/dAdjustPrice/importExcel", formData)
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
      window.location.href = "/TPA/dAdjustPrice/exportExcel";
    },

    // 新增
    doNews() {
      this.doCancels();
      this.firstFormOff = false;
    },

    // 取消
    doCancels() {
      this.firstForm = {
        activeDate: "",
        stopDate: "",
        sn: "",
        sh: "",
        client: []
      };
      this.secondForm = {
        masterSn: "",
        psn: "",
        priceType: "",
        price: ""
      };
      this.list = [];
      this.clientList = [];
      this.customerTag = [];
      this.queryInfo = "";
      this.pageOnOff = false;
      this.firstFormOff = true;
      this.secondFormOff = true;
    },

    // 表单修改
    doUpdates() {
      this.firstFormOff = false;
      this.secondFormOff = false;
    },

    // 查询
    doSearchs() {
      if (this.queryInfo != "") {
        this.searchForm(this.queryInfo);
        this.queryInfo = "";
      } else {
        error("请输入查询内容");
      }
    },

    // 查询表单内容
    searchForm(sn) {
      this.$http.post("/TPA/dAdjustPrice/getBy?sn=" + sn).then(res => {
        if (res.data.code === 0) {
          this.firstForm = res.data.data[0];
          this.secondForm.masterSn = res.data.data[0].sn;

          this.bottom = res.data.data[0]

          let Arr = res.data.data[0].client.split(",");
          this.customerTag = [];
          for (var i = 0; i < Arr.length - 1; i++) {
             let obj = {};
              obj.customer = Arr[i];
              this.customerTag.push(obj);
          }

          this.page = 1;
          let params = {
            orderBy: "price_type",
            name: sn,
            page: this.page - 1,
            count: this.pageSize
          };
          this.pageParams = params;
          this.getPageData();
        } else {
          error(res.data.msg);
        }
      })
      .catch(err => {
        NetworkAnomaly();
      })
    },

    // 打开款号查询弹窗
    searchSnFun() {
      this.SearchSnOff = true;
      this.searchSn = "";
      this.searchSnList = [];
    },

    // 款号查询弹窗选择
    getspdaPsnItem(item) {
      this.SearchSnOff = false;
      this.queryInfo = item.sn;
    },

    // 退出
    doOuts() {
      this.$emit("getOut", this.$route.name);
    },

    // 审核
    doExamines() {
      this.$http.post("/TPA/dAdjustPrice/auditing?status=1&id=" + this.firstForm.id).then(res => {
        if(res.data.code === 0) {
          this.searchForm(res.data.data.sn);
          this.firstFormOff = true;
          this.secondFormOff = true;
        } else {
          error(res.data.msg);
        }
      })
      .catch(err => {
        NetworkAnomaly();
      })
    },

    // 反审
    doExamineAgains() {
      this.$http.post("/TPA/dAdjustPrice/auditing?status=0&id=" + this.firstForm.id).then(res => {
        if(res.data.code === 0) {
          this.searchForm(res.data.data.sn);
        } else {
          error(res.data.msg);
        }
      })
      .catch(err => {
        NetworkAnomaly();
      })
    },

    // 打开获取客户信息弹窗
    customerFun() {
      this.customerInfo = "";
      this.customerOff = true;
      this.customerList = [];
    },

    // 点击获取客户信息弹窗查询
    // customerInfoFun() {
    //   if (this.customerInfo != "") {
    //     this.$http
    //       .post("/TPA/aKsDa/option?name=" + this.customerInfo)
    //       .then(res => {
    //         if (res.data.code === 0) {
    //           // this.customerList = res.data.data;
    //           this.customerList = [];
    //           for (var i in res.data.data) {
    //             let obj = {};
    //             obj.customer =
    //               res.data.data[i].sn + "_" + res.data.data[i].name;
    //             this.customerList.push(obj);
    //           }
    //         } else {
    //           error(res.data.msg);
    //         }
    //       })
    //       .catch(err => {
    //         NetworkAnomaly();
    //       });
    //   } else {
    //     error("请输入查询内容");
    //   }
    // },

    // 选择要添加的客户
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },

    // 添加客户
    addCustomer() {
      for (var i in this.multipleSelection) {
        this.customerTag.push(this.multipleSelection[i]);
      }
      this.customerOff = false;
    },

    // 删除客户
    handleClose(tag) {
      this.customerTag.splice(this.customerTag.indexOf(tag), 1);
    },

    // 保存
    doSaves1() {
      let customerTag = "";
      for (var i in this.customerTag) {
        customerTag += this.customerTag[i].customer + ",";
      }
      this.firstForm.client = customerTag;

      if (this.secondForm.masterSn) {
        this.$http.post("/TPA/dAdjustPrice/update", qs.stringify(this.firstForm)).then(res => {
          if (res.data.code === 0) {
            this.searchForm(this.secondForm.masterSn)
          } else {
            error(res.data.msg)
          }
        })
        .catch(err => {
          NetworkAnomaly();
        })
      } else {
        if (this.firstForm.activeDate.length === 0) {
          error("生效日期不能为空");
        } else if (this.firstForm.stopDate.length === 0) {
          error("截止日期不能为空");
        } else if (this.firstForm.client.length === 0) {
          error("客户不能为空");
        } else {
          this.$http
            .post("/TPA/dAdjustPrice/insert", qs.stringify(this.firstForm))
            .then(res => {
              if (res.data.code === 0) {
                this.secondForm.masterSn = res.data.data.sn;
                this.firstFormOff = true;
                this.secondFormOff = false;
              } else {
                error(res.data.msg);
              }
            })
            .catch(err => {
              NetworkAnomaly();
            });
        }
      }
    },

    // 保存
    doSaves2() {
      if (this.secondForm.psn.length === 0) {
        error("款号不能为空");
      } else if (this.secondForm.priceType.length === 0) {
        error("价格类型不能为空");
      } else if (this.secondForm.price.length === 0) {
        error("价格不能为空");
      } else {
        this.$http
          .post("/TPA/dAdjustPriceA/insert", qs.stringify(this.secondForm))
          .then(res => {
            if (res.data.code === 0) {
              this.searchForm(res.data.data.masterSn)
              this.secondForm.priceType = "";
              this.secondForm.price = "";
            } else {
              error(res.data.msg)
            }
          });
      }
    },

    // 修改
    handleEdit(index, row) {
      this.idx = index;
      const item = this.list[index];
      this.dialog = {
        id: item.id,
        price: item.price,
      },
      this.editVisible = true;
    },

    // 保存修改
    saveRevise() {
      if (this.dialog.price.length == 0) {
        error("价格不能为空");
      } else {
        this.$http
          .post("/TPA/dAdjustPriceA/update", qs.stringify(this.dialog))
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
        .post("/TPA/dAdjustPriceA/delete?id=" + item.id)
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

    // 分页
    getPageData() {
      this.$http
        .post("/TPA/dAdjustPrice/getPage", qs.stringify(this.pageParams))
        .then(res => {
          if (res.data.code === 0) {
            succ(res.data.msg);
            this.list = res.data.data;

            let clientList = res.data.attachment.sn;
            let Arr = [];
            for (var i in clientList) {
              let obj = {};
              obj.sn = clientList[i];
              Arr.push(obj);
            }
            this.clientList = Arr;

            // 重置表格合并
            this.rowList = [];
            this.djArr = [];
            this.djPosition = 0;
            this.khArr = [];
            this.khPosition = 0;
            this.rowspan();

            this.total = res.data.attachment.total;
            if (this.total > this.pageSize) {
              this.pageOnOff = true;
            } else {
              this.pageOnOff = false;
            }
          } else {
            error(res.data.msg);
            this.list = [];
            this.clientList = [];
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

    // 排序
    sortChange(column) {
      if (this.pageParams.orderBy.length !== 0) {
        if (column.prop == "price_type" && column.order == "ascending") {
          this.pageParams.orderBy = "price_type";
        } else if (column.prop == "activeDate" && column.order == "ascending") {
          this.pageParams.orderBy = "active_date";
        } else if (column.prop == "psn" && column.order == "ascending") {
          this.pageParams.orderBy = "psn";
        } else {
          this.pageParams.orderBy = "price_type";
        }
      }
      if (this.list.length !== 0) {
        this.getPageData();
      }
    },

    // 获取当前页码
    currentPage(val) {
      this.page = val;
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
          if (this.list[index].psn === this.list[index - 1].psn) {
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
      if (columnIndex === 0) {
        // 第一列合并单号
        const _row_0 = this.djArr[rowIndex];
        const _col_0 = _row_0 > 0 ? 1 : 0;
        return {
          rowspan: _row_0,
          colspan: _col_0
        };
      }
      if (columnIndex === 1) {
        const _row_1 = this.khArr[rowIndex];
        const _col_1 = _row_1 > 0 ? 1 : 0;
        return {
          rowspan: _row_1,
          colspan: _col_1
        };
      }
    }
  },

  mounted() {
    this.getBrand();
  },

  watch: {
    page() {
      if (this.page > 0) {
        this.pageParams.page = this.page - 1;
        this.getPageData();
      }
    },

    searchSn() {
      if (this.searchSn.length !== 0) {
        this.$http
          .post("/TPA/dAdjustPrice/getSn?name=" + this.searchSn)
          .then(res => {
            if (res.data.code === 0) {
              this.searchSnList = res.data.data;
            } else {
              error(res.data.msg);
              this.searchSnList = [];
            }
          })
          .catch(err => {
            NetworkAnomaly();
          });
      } else {
        this.searchSnList = [];
      }
    },

    customerInfo() {
      if (this.customerInfo != "") {
        this.$http
          .post("/TPA/aKsDa/option?name=" + this.customerInfo)
          .then(res => {
            if (res.data.code === 0) {
              // this.customerList = res.data.data;
              this.customerList = [];
              for (var i in res.data.data) {
                let obj = {};
                obj.customer = res.data.data[i].sn + "_" + res.data.data[i].name;
                this.customerList.push(obj);
              }
            } else {
              error(res.data.msg);
              this.customerList = [];
            }
          })
          .catch(err => {
            NetworkAnomaly();
          });
      } else {
        this.customerList = [];
      }
    }
  },

  computed: {
    ...mapState(["collapse"])
  }
};
</script>

<style lang="stylus" scoped>
@import 'css/style.styl'
</style>
