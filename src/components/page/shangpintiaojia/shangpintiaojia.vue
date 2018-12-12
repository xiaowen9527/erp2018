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
            <button @click="doSearchs" class="button_btn">查询</button>
            <input type="text" class="queryInfo" v-model="queryInfo"/>
            <button class="button_btn" @click="doOuts">退出</button>
            <div class="btn_right">
                <button class="button_btn" @click="doExamines">审核</button>
                <button class="button_btn" @click="doExamineAgains">反审</button>
            </div>
        </div>

        <div class="set_info">
            <!-- 表单内容 -->
            <div class="info_form">
                <ul class="clearfix">
                    <li>
                        <label>生效日期</label>
                        <el-date-picker format="yyyy 年 MM 月 dd 日" value-format="yyyy-MM-dd" v-model="form.activeDate" type="date" placeholder="选择日期" :disabled="firstFormOff">
                        </el-date-picker>
                    </li>
                    <li>
                        <label>截止日期</label>
                        <el-date-picker format="yyyy 年 MM 月 dd 日" value-format="yyyy-MM-dd" v-model="form.stopDate" type="date" placeholder="选择日期" :disabled="firstFormOff">
                        </el-date-picker>
                    </li>
                    <li>
                        <label>调价单号</label>
                        <input type="text" :value="form.sn" placeholder="自动生成" disabled>
                    </li>
                    <li class="menuLi">
                        <label>客户</label>
                        <input type="text" class="first" placeholder="必填" v-model="form.clientSn" :disabled="firstFormOff" @click="customerFun">
                        <input type="text" v-model="form.clientName" :disabled="firstFormOff" @click="customerFun">
                        <button :disabled="firstFormOff" @click="customerFun">。。。</button>
                    </li>
                </ul>
                <ul class="clearfix">
                    <li>
                        <label>款号</label>
                        <input type="text" v-model="form.psn" @click="searchSn" :disabled="secondFormOff">
                    </li>
                    <li>
                        <label>价格类型</label>
                        <el-select v-model="form.priceType" placeholder="请选择" :disabled="secondFormOff">
                            <el-option v-for="item in this.Type" :key="item.name" :label="item.name" :value="item.name">
                            </el-option>
                        </el-select>
                    </li>
                    <li>
                        <label>价格</label>
                        <input type="text" v-model="form.price" :disabled="secondFormOff">
                    </li>
                    <button class="save" @click="doSaves" :class="{button_btn:!secondFormOff}" :disabled="secondFormOff">保存</button>
                </ul>
            </div>

            <!-- 表格内容 -->
            <div class="order_table">
                <el-table :data="list" stripe border index style="width: 100%" ref="multipleTable" tooltip-effect="dark" @sort-change='sortChange' :default-sort="{prop: 'psn', order: 'ascending'}">
                    <el-table-column prop="sn" label="调价单号" min-width="11%">
                    </el-table-column>
                    <el-table-column prop="clientSn" label="客户编号" min-width="9%">
                    </el-table-column>
                    <el-table-column prop="clientName" label="客户名称" min-width="9%">
                      <template slot-scope="scope">
                        <el-tooltip :content="scope.row.clientName" placement="top" :enterable="false">
                            <p>{{ scope.row.clientName }}</p>
                        </el-tooltip>
                      </template>
                    </el-table-column>
                    <el-table-column prop="psn" label="款号" min-width="9%" sortable='custom'>
                    </el-table-column>
                    <el-table-column prop="priceType" label="价格类型" min-width="9%" sortable='custom'>
                    </el-table-column>
                    <el-table-column prop="price" label="价格" min-width="9%">
                    </el-table-column>
                    <el-table-column prop="activeDate" label="生效日期" min-width="9%" sortable='custom'>
                    </el-table-column>
                    <el-table-column prop="stopDate" label="截止日期" min-width="9%" sortable='custom'>
                    </el-table-column>
                    <el-table-column prop="addUser" label="编制人" min-width="9%">
                    </el-table-column>
                    <el-table-column fixed="right" label="操作" min-width="26%">
                        <template slot-scope="scope">
                            <el-button :disabled="(scope.row.sh == 1)" :class="{btn:scope.row.sh == 1}" type="text" @click="handleEdit(scope.$index, scope.row)">修改</el-button>
                            <el-button :disabled="(scope.row.sh == 1)" :class="{btn:scope.row.sh == 1}" type="text" @click="tableDelete(scope.$index, scope.row)">删除</el-button>
                            <el-button :disabled="(scope.row.sh == 1)" :class="{btn:scope.row.sh == 1}" type="text" @click="tableDelete(scope.$index, scope.row)">审核</el-button>
                            <el-button :disabled="(scope.row.sh == 0)" :class="{btn:scope.row.sh == 0}" type="text" @click="tableDelete(scope.$index, scope.row)">反审</el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </div>

            <!-- 底部页码 -->
            <div class="pageBox">
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

        <!-- 获取客户信息弹窗 -->
        <el-dialog title="客户信息" :visible.sync="customerOff">
            <el-input v-model="customerInfo" placeholder="客户编号 / 客户名称"></el-input>
            <el-button @click="customerInfoFun">查询</el-button>
            <ul class="srcond_menu">
                <li v-if="customerList.length===0">暂无数据</li>
                <li class="clearfix" v-for="(item,i) in customerList" :key="i">
                    <span class="search" @click="getSearchItem(item)">|--{{item.sn}}-{{item.name}}</span>
                </li>
            </ul>
        </el-dialog>

        <!-- 修改弹窗 -->
        <el-dialog title="修改" :visible.sync="editVisible" width="30%">
            <el-form :model="dialog" label-width="100px">
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
      form: {
          activeDate: "",
          stopDate: "",
          sn: "",
          clientSn: "",
          clientName: "",
          psn: "",
          priceType: "",
          price: ""
      },
      firstFormOff: true, // 第一个保存开关
      secondFormOff: true, // 第二个保存开关
      Type: [],
      list: [],
      // rowList: [],
      // djArr: [],
      // khArr: [],
      // djPosition: 0,
      // khPosition: 0,
      //分页：当前页码/总数量/每页显示条数
      page: 0,
      total: "",
      pageSize: 2,
      pageOnOff: false,
      //分页排序查询条件
      pageParams: {
        orderBy: "type"
      },
      // 客户弹窗内容
      customerOff: false,
      customerInfo: "",
      customerList: [],
      // 修改弹窗内容
      editVisible: false,
      dialog: {},
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
        this.secondFormOff = false;
    },

    // 取消
    doCancels() {
        this.form = {
            activeDate: "",
            sn: "",
            clientSn: "",
            clientName: "",
            psn: "",
            priceType: "",
            price: ""
        }
        this.list = [];
        this.firstFormOff = true;
        this.secondFormOff = true;
    },

    // 查询
    doSearchs() {
      if (this.queryInfo != "") {
        this.page = 1;
        let params = {
          name: this.queryInfo,
          page: this.page - 1,
          count: this.pageSize
        }
        this.pageParams = params;
        this.getPageData();
      } else {
        error("请输入查询内容");
      }
    },

    // 款号查询
    searchSn() {
    },

    // 退出
    doOuts() {
        this.$emit("getOut", this.$route.name);
    },

    // 审核
    doExamines() {},

    // 反审
    doExamineAgains() {},

    // 打开获取客户信息弹窗
    customerFun() {
      this.customerInfo = "";
      this.customerOff = true;
      this.customerList = [];
    },

    // 点击获取客户信息弹窗查询
    customerInfoFun() {
      if (this.customerInfo != "") {
        this.$http.post("/TPA/aKsDa/option?name=" + this.customerInfo).then(res => {
          if (res.data.code === 0) {
            this.customerList = res.data.data;
          } else {
            error(res.data.msg);
          }
        })
        .catch(err => {
          NetworkAnomaly();
        })
      } else {
        error("请输入查询内容");
      }
    },

    // 客户弹窗选择
    getSearchItem(item) {
        this.customerOff = false;
        this.form.clientSn = item.sn;
        this.form.clientName = item.name;
    },

    // 保存
    doSaves() {
      if (this.form.activeDate.length === 0) {
        error("生效日期不能为空");
      } else if (this.form.stopDate.length === 0) {
        error("截止日期不能为空");
      } else if (this.form.clientSn.length === 0) {
        error("客户不能为空");
      } else if (this.form.psn.length === 0) {
        error("款号不能为空");
      } else if (this.form.priceType.length === 0) {
        error("价格类型不能为空");
      } else if (this.form.price.length === 0) {
        error("价格不能为空");
      } else {
        this.$http
          .post("/TPA/dAdjustPrice/insert", qs.stringify(this.form))
          .then(res => {
            if (res.data.code === 0) {
              console.log(res)
              this.form.sn = res.data.data.sn;
              this.firstFormOff = true;
              this.page = 1;
              let params = {
                name: this.form.sn,
                page: this.page - 1,
                count: this.pageSize,
                orderBy: "price_type"
              }
              this.pageParams = params;
              this.getPageData();
            } else {
              error(res.data.msg);
            }
          })
          .catch(err => {
            NetworkAnomaly();
          });
      }
    },

    // 修改
    handleEdit(index, row) {
      this.idx = index;
      const item = this.list[index];
      this.dialog = {
        id: item.id,
        psn: item.psn,
        type: item.type,
        price: item.price,
        activeDate: item.activeDate
      },
      this.editVisible = true;
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
    
    // 分页
    getPageData() {
      this.$http.post("/TPA/dAdjustPrice/getPage", qs.stringify(this.pageParams)).then(res => {
        if (res.data.code === 0) {
          succ(res.data.msg);
          this.list = res.data.data;
          this.total = res.data.attachment.total;
          if(this.total > this.pageSize) {
            this.pageOnOff = true;
          } else {
            this.pageOnOff = false;
          }
        } else {
          error(res.data.msg)
        }
      })
      .catch(err => {
        NetworkAnomaly();
      })
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
  },

  watch: {
    page() {
      if (this.page > 0) {
        this.pageParams.page = this.page - 1;
        this.getPageData();
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
