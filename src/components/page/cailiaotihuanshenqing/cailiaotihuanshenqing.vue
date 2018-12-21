<template>
    <div class="container">
        <!-- 页面标题 -->
        <p class="page_title">材料替换申请</p>

         <!-- 顶部操作按钮 -->
        <div class="btn-box">
            <button class="button_btn" @click="doNews">新增</button>
            <button class="button_btn" @click="doCancels">取消</button>
            <button class="button_btn" @click="doExports">导出</button>
            <button class="button_btn" @click="doImports">导入</button>
            <button @click="doUpdates" class="save" :class="{button_btn: (secondForm.masterSn) && (firstForm.sh == 0)}" :disabled="(!secondForm.masterSn || firstForm.sh != 0)">修改</button>
            <button @click="doRefreshs" class="button_btn">刷新</button>
            <button @click="doSearchs" class="button_btn">查询</button>
            <input type="text" class="queryInfo" @click="searchSn" v-model="queryInfo"/>
            <button class="button_btn" @click="doOuts">退出</button>
            <div class="btn_right">
                <button class="save" :class="{button_btn:firstForm.sh == 0}" :disabled="(firstForm.sh != 0)" @click="doExamines">审核</button>
                <button class="save" :class="{button_btn:firstForm.sh == 1}" :disabled="(firstForm.sh != 1)" @click="doExamineAgains">反审</button>
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
                            <el-date-picker :disabled="!firstFormOff" v-model="firstForm.date" format="yyyy 年 MM 月 dd 日" value-format="yyyy-MM-dd" type="date" placeholder="必填">
                            </el-date-picker>
                        </li>
                        <li>
                            <label for="">单号</label>
                            <input type="text" disabled placeholder="自动生成" v-model="secondForm.masterSn" />
                        </li>
                        <li>
                            <label for="">说明</label>
                            <input :disabled="!remarkOff" type="text" v-model="firstForm.remark" />
                        </li>
                        <button :disabled="!remarkOff" class="save" :class="{button_btn: remarkOff}" @click="firstSaves">保存</button>
                    </ul>
                    <ul class="clearfix">
                        <li>
                            <label>类型</label>
                            <el-select v-model="secondForm.type" placeholder="必选" :disabled="!secondFormOff">
                                <el-option v-for="item in this.type" :key="item.name" :label="item.name" :value="item.name">
                                </el-option>
                            </el-select>
                        </li>
                        <li>
                            <label>仓库</label>
                            <el-select v-model="secondForm.repertory" placeholder="请选择" :disabled="!secondFormOff">
                                <el-option v-for="item in this.repertory" :key="item.name" :label="item.name" :value="item.name">
                                </el-option>
                            </el-select>
                        </li>
                        <li class="menuLi">
                            <label>物料编码</label>
                            <input :disabled="!secondFormOff" type="text" class="first" placeholder="必填" v-model="secondForm.matSn" @click="materialFun">
                            <input :disabled="!secondFormOff" type="text" v-model="secondForm.matName" @click="materialFun">
                            <button :disabled="!secondFormOff" @click="materialFun">。。。</button>
                        </li>
                        <li>
                            <label for="">规格说明</label>
                            <input :disabled="!secondFormOff" type="text" v-model="secondForm.remark" />
                        </li>
                    </ul>
                    <ul>
                        <li>
                            <label>色号</label>
                            <el-select v-model="secondForm.matColorSn" @change="selectMatColorSn" placeholder="必选" :disabled="!secondFormOff">
                                <el-option v-for="item in this.matColorSn" :key="item.yscmSn" :label="item.yscmSn" :value="item.yscmSn">
                                </el-option>
                            </el-select>
                        </li>
                        <li>
                            <label>颜色</label>
                            <input type="text" disabled v-model="secondForm.matColor" />
                        </li>
                        <li class="small_li">
                            <label>克重</label>
                            <input disabled type="text" v-model="secondForm.kz" />
                        </li>
                        <li class="small_li">
                            <label>布宽</label>
                            <input disabled type="text" v-model="secondForm.size">
                        </li>
                        <li class="small_li">
                            <label>用量单位</label>
                            <input disabled type="text" v-model="secondForm.dosageUnit">
                        </li>
                        <li class="small_li">
                            <label>转换系数</label>
                            <input disabled type="text" v-model="secondForm.zhxs">
                        </li>
                        <li class="small_li">
                            <label>采购单位</label>
                            <input disabled type="text" v-model="secondForm.purchaseUnit">
                        </li>
                    </ul>
                    <ul class="clearfix">
                        <li class="medium_li">
                            <label>用量单位价格</label>
                            <input :disabled="!secondFormOff" placeholder="必填" type="text" v-model="secondForm.dosagePrice">
                        </li>
                        <li class="medium_li">
                            <label>用量单位数量</label>
                            <input :disabled="!secondFormOff" placeholder="必填" type="text" v-model="secondForm.dosageNumber">
                        </li>
                        <li class="medium_li">
                            <label>采购单位价格</label>
                            <input :disabled="!secondFormOff" placeholder="必填" type="text" v-model="secondForm.purchasePrice">
                        </li>
                        <li class="medium_li">
                            <label>采购单位数量</label>
                            <input :disabled="!secondFormOff" placeholder="必填" type="text" v-model="secondForm.purchaseNumber">
                        </li>
                        <button :disabled="!secondFormOff" :class="{button_btn: secondFormOff}" @click="secondSaves" class="save">保存</button>
                    </ul>
                </div>

                <!-- 表格内容 -->
                <div class="order_table">
                    <el-table :data="list" stripe index height="44.5vh">
                        <el-table-column type="index" label="编号" min-width="50px" fixed="left"></el-table-column>
                        <el-table-column prop="type" label="类型" min-width="80px"></el-table-column>
                        <el-table-column prop="repertory" label="仓库" min-width="80px"></el-table-column>
                        <el-table-column prop="matSn" label="物料编码" min-width="80px"></el-table-column>
                        <el-table-column prop="matName" label="物料名称" min-width="80px">
                             <template slot-scope="scope">
                                <el-tooltip :content="scope.row.matName" placement="top" :enterable="false">
                                    <p>{{ scope.row.matName }}</p>
                                </el-tooltip>
                            </template>
                        </el-table-column>
                        <el-table-column prop="matColorSn" label="色号" min-width="80px"></el-table-column>
                        <el-table-column prop="matColor" label="颜色" min-width="80px"></el-table-column>
                        <el-table-column prop="kz" label="克重" min-width="80px"></el-table-column>
                        <el-table-column prop="size" label="布宽" min-width="80px"></el-table-column>
                        <el-table-column prop="remark" label="规格说明" min-width="80px">
                            <template slot-scope="scope">
                                <el-tooltip :content="scope.row.remark" placement="top" :enterable="false">
                                    <p>{{ scope.row.remark }}</p>
                                </el-tooltip>
                            </template>
                        </el-table-column>
                        <el-table-column prop="purchaseUnit" label="采购单位" min-width="80px"></el-table-column>
                        <el-table-column prop="dosageUnit" label="用量单位" min-width="80px"></el-table-column>
                        <el-table-column prop="zhxs" label="转换系数" min-width="80px"></el-table-column>
                        <el-table-column prop="dosagePrice" label="用量单位价格" min-width="100px"></el-table-column>
                        <el-table-column prop="dosageNumber" label="用量单位数量" min-width="100px"></el-table-column>
                        <el-table-column prop="purchasePrice" label="采购单位价格" min-width="100px"></el-table-column>
                        <el-table-column prop="purchaseNumber" label="采购单位数量" min-width="100px"></el-table-column>
                        <el-table-column label="操作" min-width="140px" fixed="right">
                            <template slot-scope="scope">
                                <el-button :class="{btn:firstForm.sh != 0}" :disabled="(firstForm.sh != 0)" type="text" @click="handleEdit(scope.$index, scope.row)">修改</el-button>
                                <el-button :class="{btn:firstForm.sh != 0}" :disabled="(firstForm.sh != 0)" type="text" @click="tableDelete(scope.$index, scope.row)">删除</el-button>
                            </template>
                        </el-table-column>
                    </el-table>
                </div>
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

        <!-- 模糊查询订单号 -->
        <vagueSearch v-if="masterSnOff" :onoff="masterSnOff" :tip="masterSnTip" :url="masterSnUrl" v-on:listenOnOff="listenMasterSn" v-on:listenItem="listenMasterSnItem"/>

        <!-- 模糊查询物料编码 -->
        <vagueSearch v-if="materialOff" :onoff="materialOff" :tip="materialTip" :url="materialUrl" v-on:listenOnOff="listenMaterial" v-on:listenItem="listenMaterialItem"/>

        <!-- 修改弹窗 -->
        <el-dialog title="修改" :visible.sync="editVisible" width="30%">
            <el-form :model="dialog" label-width="100px">
                <el-form-item label="用量单位价格">
                    <el-input v-model="dialog.dosagePrice"></el-input>
                </el-form-item>
                <el-form-item label="用量单位数量">
                    <el-input v-model="dialog.dosageNumber"></el-input>
                </el-form-item>
                <el-form-item label="采购单位价格">
                    <el-input v-model="dialog.purchasePrice"></el-input>
                </el-form-item>
                <el-form-item label="采购单位数量">
                    <el-input v-model="dialog.purchaseNumber"></el-input>
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
import vagueSearch from "@/components/pageCommon/vagueSearch"; //模糊查询组件
import {
  NetworkAnomaly,
  succ,
  error,
  getOut
} from "../../../assets/js/message.js";
import qs from "qs";
import NavMenu from "./NavMenu";
export default {
  name: "cailiaotihuanshenqing",
  data() {
    return {
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

      navMenus: [], //导航数据

      firstForm: {
        date: "",
        remark: "",
        sh: ""
      },
      secondForm: {
        id: "",
        masterSn: "",
        type: "",
        repertory: "",
        matSn: "",
        matName: "",
        remark: "",
        matColorSn: "",
        matColor: "",
        kz: "",
        size: "",
        dosageUnit: "",
        zhxs: "",
        purchaseUnit: "",
        dosagePrice: "",
        dosageNumber: "",
        purchasePrice: "",
        purchaseNumber: ""
      },
      firstFormOff: false,
      secondFormOff: false,
      remarkOff: false,
      type: [{ name: "转出" }, { name: "转入" }],
      repertory: [],
      matColorSn: [],

      // 订单号模糊查询
      masterSnOff: false,
      masterSnTip: "请输入订单号",
      masterSnUrl: "/TPA/eMatReplace/getSn?name=",

      // 物料编码模糊查询
      materialOff: false,
      materialTip: "请输入查询条件",
      materialUrl: "/TPA/cWlda/getSn?name=",

      list: [],

      // 修改弹窗内容
      editVisible: false,
      dialog: {},

      // 底部内容
      bottom: {},
      page: 1,
      pageSize: 10,
      total: "",
      pageOnOff: false,
      pageParams: {}
    };
  },

  methods: {
    // 新增
    doNews() {
      this.doCancels();
      this.firstFormOff = true;
      this.remarkOff = true;
    },

    // 取消
    doCancels() {
      this.firstForm = {
        sh: "",
        date: "",
        remark: ""
      };
      this.secondForm = {
        id: "",
        masterSn: "",
        type: "",
        repertory: "",
        matSn: "",
        matName: "",
        remark: "",
        matColorSn: "",
        matColor: "",
        kz: "",
        size: "",
        dosageUnit: "",
        zhxs: "",
        purchaseUnit: "",
        dosagePrice: "",
        dosageNumber: "",
        purchasePrice: "",
        purchaseNumber: ""
      };
      this.firstFormOff = false;
      this.secondFormOff = false;
      this.remarkOff = false;
      this.list = [];
      this.pageOnOff = false;
    },

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
        .post("/TPA/eMatReplace/importExcel", formData)
        .then(res => {
          // console.log(res);
          if (res.status === 200) {
            if (res.data.code === 0) {
              succ(res.data.msg);
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
      window.location.href = "/TPA/eMatReplace/exportExcel";
    },

    // 修改
    doUpdates() {
      this.remarkOff = true;
      this.secondFormOff = true;
    },

    // 刷新
    doRefreshs() {
      this.doCancels();
      this.getnavMenu();
    },

    // 查询
    doSearchs() {
      this.getFirstForm(this.queryInfo);
      this.queryInfo = "";
    },

    searchSn() {
      this.masterSnOff = true;
    },

    listenMasterSn(data) {
      this.masterSnOff = data;
    },

    // 接收模糊查询数据
    listenMasterSnItem(data) {
      if (data.length > 0) {
        this.queryInfo = data[0];
      }
    },

    // 退出
    doOuts() {
      this.$emit("getOut", this.$route.name);
    },

    // 审核
    doExamines() {
      this.$http
        .post("/TPA/eMatReplace/auditing?status=1&id=" + this.secondForm.id)
        .then(res => {
          if (res.data.code === 0) {
            this.getFirstForm(res.data.data.sn);
            this.firstFormOff = false;
            this.remarkOff = false;
            this.secondFormOff = false;
          } else {
            error(res.data.msg);
          }
        })
        .catch(err => {
          NetworkAnomaly();
        });
    },

    // 反审
    doExamineAgains() {
      this.$http
        .post("/TPA/eMatReplace/auditing?status=0&id=" + this.secondForm.id)
        .then(res => {
          if (res.data.code === 0) {
            this.getFirstForm(res.data.data.sn);
          } else {
            error(res.data.msg);
          }
        })
        .catch(err => {
          NetworkAnomaly();
        });
    },

    getnavMenu() {
      this.$http.post("/TPA/eMatReplace/tree").then(res => {
        this.navMenus = res.data.data;
      });
    },

    // 左侧导航点击
    menuSelected(e) {
      this.getFirstForm(e);
    },

    // 获取表单一数据
    getFirstForm(val) {
      this.$http
        .post("/TPA/eMatReplace/getBy?sn=" + val)
        .then(res => {
          if (res.data.code === 0) {
            this.secondForm.masterSn = res.data.data[0].sn;
            this.secondForm.id = res.data.data[0].id;
            this.firstForm.date = res.data.data[0].date;
            this.firstForm.remark = res.data.data[0].remark;
            this.firstForm.sh = res.data.data[0].sh;

            this.page = 1;
            let params = {
                masterSn: res.data.data[0].sn,
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
        });
    },

    // 保存
    firstSaves() {
      let params = this.firstForm;
      params.id = this.secondForm.id;
      if (this.secondForm.masterSn) {
        this.$http
          .post("/TPA/eMatReplace/update", qs.stringify(params))
          .then(res => {
            if (res.data.code === 0) {
              this.firstFormOff = false;
              this.remarkOff = false;
            }
          });
      } else {
        if (this.firstForm.date == "") {
          error("订单日期不能为空");
        } else {
          this.$http
            .post("/TPA/eMatReplace/insert", qs.stringify(this.firstForm))
            .then(res => {
              if (res.data.code === 0) {
                this.firstFormOff = false;
                this.remarkOff = false;
                this.secondFormOff = true;
                this.secondForm.masterSn = res.data.data.sn;
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

    secondSaves() {
      let a = this.secondForm;
      if (
        a.masterSn &&
        a.type &&
        a.matSn &&
        a.matColorSn &&
        a.dosagePrice &&
        a.dosageNumber &&
        a.purchasePrice &&
        a.purchaseNumber
      ) {
        this.$http
          .post("/TPA/eMatReplaceA/insert", qs.stringify(this.secondForm))
          .then(res => {
            if (res.data.code === 0) {
              this.page = 1;
              let params = {
                page: this.page - 1,
                count: this.pageSize,
                masterSn: res.data.data.masterSn
              };

              let masterSn = this.secondForm.masterSn;
              let id = this.secondForm.id;

              // 清空表单二
              this.secondForm = {
                masterSn: masterSn,
                id: id,
                type: "",
                repertory: "",
                matSn: "",
                matName: "",
                remark: "",
                matColorSn: "",
                matColor: "",
                kz: "",
                size: "",
                dosageUnit: "",
                zhxs: "",
                purchaseUnit: "",
                dosagePrice: "",
                dosageNumber: "",
                purchasePrice: "",
                purchaseNumber: ""
              };

              this.pageParams = params;
              this.getPageData();
            }
          })
          .catch(err => {
            NetworkAnomaly();
          });
      } else {
        error("请填写所有必填项");
      }
    },

    // 物料选择
    materialFun() {
      this.materialOff = true;
    },

    // 接收模糊查询开关
    listenMaterial(data) {
      this.materialOff = data;
    },

    // 接收模糊查询数据
    listenMaterialItem(data) {
      if (data.length > 0) {
        this.secondForm.matSn = data[0];
        this.secondForm.matName = data[1];

        if (data[0] && data[1]) {
          this.$http
            .post("/TPA/cWlda/search?sn=" + data[0] + "&name=" + data[1])
            .then(res => {
              if (res.data.code === 0) {
                this.secondForm.size = res.data.data.list[0].size;
                this.secondForm.kz = res.data.data.list[0].kz;
                this.secondForm.zhxs = res.data.data.list[0].zhxs;
                this.secondForm.dosageUnit = res.data.data.list[0].ylUnit;
                this.secondForm.purchaseUnit = res.data.data.list[0].cgUnit;

                this.$http
                  .post("/TPA/cWldaA/getBy?masterSn=" + data[0])
                  .then(res => {
                    if (res.data.code === 0) {
                      this.secondForm.matColorSn = "";
                      this.secondForm.matColor = "";
                      this.matColorSn = res.data.data;
                    } else {
                      error(res.data.msg);
                    }
                  })
                  .catch(err => {
                    NetworkAnomaly();
                  });
              }
            });
        }
      }
    },

    // 根据色号对应颜色
    selectMatColorSn(e) {
      for (var i in this.matColorSn) {
        if (e == this.matColorSn[i].yscmSn) {
          this.secondForm.matColor = this.matColorSn[i].yscmName;
          return;
        }
      }
    },

    // 修改
    handleEdit(index, row) {
      this.idx = index;
      const item = this.list[index];
      (this.dialog = {
        id: item.id,
        dosagePrice: item.dosagePrice,
        dosageNumber: item.dosageNumber,
        purchasePrice: item.purchasePrice,
        purchaseNumber: item.purchaseNumber
      }),
        (this.editVisible = true);
    },

    // 保存修改
    saveRevise() {
      this.$http
        .post("/TPA/eMatReplaceA/update", qs.stringify(this.dialog))
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
    },

    // 删除
    tableDelete(index, row) {
      this.idx = index;
      const item = this.list[index];
      this.$http
        .post("/TPA/eMatReplaceA/delete?id=" + item.id)
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

    // 获取当前页码
    currentPage(val) {
      this.page = val;
    },

    getPageData() {
      this.$http
        .post("/TPA/eMatReplaceA/search", qs.stringify(this.pageParams))
        .then(res => {
          if (res.data.code === 0) {
            this.list = res.data.data.list;
            succ(res.data.msg);

            this.total = res.data.data.total;
            if (this.total > this.pageSize) {
              this.pageOnOff = true;
            } else {
              this.pageOnOff = false;
            }
          } else {
            this.list = [];
            error(res.data.msg);
          }
        })
        .catch(err => {
          NetworkAnomaly();
        });
    }
  },

  mounted() {
    this.getnavMenu();
  },

  watch: {
    page() {
      if (this.page > 0) {
        this.pageParams.page = this.page - 1;
      }
      this.getPageData();
    }
  },

  components: {
    NavMenu,
    vagueSearch
  }
};
</script>

<style lang="stylus" scoped>
@import 'css/style.styl'
</style>