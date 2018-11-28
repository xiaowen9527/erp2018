<template>
    <div class="container" :class="{container_collapse:collapse}">
        <!-- 页面标题 -->
        <p class="page_title">样衣借调</p>

        <!-- 顶部导航栏 -->
        <div class="btn-box">
            <button class="button_btn" @click="query">查询</button>
            <input class="queryInfo" type="text" v-model="queryInfo" />
            <button class="button_btn" @click="doOuts">退出</button>
        </div>

        <div class="set_box">
            <!-- 左侧导航栏 -->
            <div class="menu_box">
                <el-menu @select="menuSelected" unique-opened background-color="#f2f2f2" text-color="#303133" active-text-color="#303133">
                    <nav-menu :navMenus="this.navMenus"></nav-menu>
                </el-menu>
                <el-select v-model="searchYear" placeholder="默认当前年份" class="searchYear">
                    <el-option v-for="item in this.searchYearList" :key="item.name" :label="item.name" :value="item.name">
                    </el-option>
                </el-select>
            </div>

            <!-- 右侧主体内容 -->
            <div class="set_info">
                <!-- 表单内容 -->
                <div class="info_form">
                  <ul class="clearfix">
                        <li class="date">
                            <label class="name">日期</label>
                            <el-date-picker format="yyyy 年 MM 月 dd 日" value-format="yyyy-MM-dd" :disabled="confirm" v-model="form.date" type="date" placeholder="选择日期"> </el-date-picker>
                        </li>

                        <li>
                            <label>借衣人</label>
                            <input type="text" :disabled="confirm" v-model="form.user">
                        </li>

                        <li>
                            <label>说明</label>
                            <input type="text" :disabled="confirm" v-model="form.resume">
                        </li>
                    </ul>
                    <ul class="clearfix">
                        <li class="">
                            <label>请扫条码</label>
                            <input type="text" v-model="form.code">
                        </li>
                        <button class="save button_btn" @click="formQuery">查询</button>
                        <li>
                            <label>款号</label>
                            <input type="text" disabled v-model="form.psn">
                        </li>
                        <li>
                            <label>颜色</label>
                            <input type="text" disabled v-model="form.color">
                        </li>
                        <li>
                            <label>尺码</label>
                            <input type="text" disabled v-model="form.size">
                        </li>

                        <button class="save button_btn" @click="doSaves">保存</button>
                        <button class="save button_btn" @click="doNews">创建</button>
                    </ul>
                    <ul v-if="returnBtn" class="clearfix">
                      <button :disabled="(returnDisabled)" @click="returnFun" :class="(returnDisabled ? 'NoReturn' : 'return')">批量还</button>
                    </ul>
                    
                </div>

                <!-- 表格内容 -->
                <div class="order_table">
                    <el-table :data="list" border ref="multipleTable" tooltip-effect="dark" style="width: 100%" @selection-change="handleSelectionChange">
                        <!-- <el-table-column prop="psn" label="还" min-width="5%">
                        </el-table-column> -->
                        <el-table-column v-if="returnBtn" type="selection" min-width="5%">
                        </el-table-column>
                        <el-table-column prop="psn" label="款号" min-width="12%">
                        </el-table-column>
                        <el-table-column prop="colorName" label="颜色" min-width="10%">
                        </el-table-column>
                        <el-table-column prop="sizeName" label="尺码" min-width="10%">
                        </el-table-column>  
                        <el-table-column prop="zrUser" label="借衣人" min-width="12%">
                        </el-table-column>
                        <el-table-column prop="date" label="借衣时间" min-width="12%">
                        </el-table-column>
                        <el-table-column prop="stillUser" label="还衣人" min-width="12%">
                        </el-table-column>
                        <el-table-column prop="stillDate" label="还衣时间" min-width="12%">
                        </el-table-column>
                        <el-table-column label="操作" min-width="15%">
                            <template slot-scope="scope">
                            <!-- <el-button :disabled="(scope.row.stillUser != ''&&scope.row.stillDate != '')" @click="handleEdit(scope.$index, scope.row)" :class="{btn:(scope.row.stillUser != ''&&scope.row.stillDate != '')}" type="text">还</el-button> -->
                            <el-button :disabled="(scope.row.status == 1)" :class="{btn:(scope.row.status == 1)}" @click="effective(scope.$index, scope.row)" type="text">有效</el-button>
                            <el-button :disabled="(scope.row.status == 0)" :class="{btn:(scope.row.status == 0)}" @click="invalid(scope.$index, scope.row)" type="text">无效</el-button>
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
                    </ul>
                    <el-pagination @current-change="currentPage" :current-page='page' v-if="pageOnOff" background  :page-size="pageSize" :pager-count="5" :total="total">
                    </el-pagination>
                </div>
        </div>

        <!-- 修改弹出框 -->
        <el-dialog title="修改" :visible.sync="editVisible" width="30%">
            <el-form :model="dialog" label-width="100px">
                <el-form-item label="还衣人">
                    <el-input v-model="dialog.stillUser"></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="editVisible = false">取 消</el-button>
                <el-button type="primary" @click="saveEdit">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
import { mapState } from "vuex";
import qs from "qs";
import {
  NetworkAnomaly,
  succ,
  error,
  getOut
} from "../../../assets/js/message.js";
import NavMenu from "./NavMenu";
export default {
  name: "yangyijiediao",
  data() {
    return {
      queryInfo: "", // 查询内容
      navMenus: [], //导航数据
      searchYear: "", //当前当行的年份
      searchYearList: [], //导航年份数组

      // 表单数据
      form: {
        id: "",
        // type: "", // 类型
        // typeSn: "", // 类型编号
        code: "", // 条码
        psn: "", // 款号
        color: "", // 颜色
        size: "", // 尺码
        date: "", // 日期
        user: "", // 责任人
        resume: "", // 说明
        stillUser: "", // 还衣人
        stillDate: "" // 还衣时间
      },

      // 归还按钮
      returnBtn: false,
      // 归还按钮默认禁用
      returnDisabled: true,
      // 选择归还样品
      multipleSelection: [],

      bottom: {
        addUser: "",
        addDate: "",
        updateUser: "",
        updateDate: ""
      },

      // type: [], // 类型数组
      confirm: false, // 点击查询/保存/创建修改状态，默认为不禁用
      list: [], // 表格数据

      editVisible: false,
      idx: "",
      dialog: {
        id: [],
        stillUser: ""
      },

      //分页：当前页码/总数量/每页显示条数
      page: 0,
      total: "",
      pageSize: 10,
      pageOnOff: false,
      //分页查询第一第二级时候的参数
      pageParams: {}
    };
  },

  methods: {
    // 清空表单数据
    clearForm() {
      this.form = {
        id: "",
        // type: "", // 类型
        // typeSn: "", // 类型编号
        code: "", // 条码
        psn: "", // 款号
        color: "", // 颜色
        size: "", // 尺码
        date: "", // 日期
        user: "", // 责任人
        resume: "", // 说明
        stillUser: "", // 还衣人
        stillDate: "" // 还衣时间
      };
    },

    // 查询表格数据
    queryFun(queryInfo, TYPE) {
      this.$http.post("/TPA/cYpjc/getBy?psn=" + queryInfo).then(res => {
        if (res.data.code === 0) {
          // 判断点击的导航是否为数字
          var reg = /^[0-9]+.?[0-9]*$/;
          if (res.data.data.length == 0 && reg.test(queryInfo)) {
            // error("该款号暂无数据");
          } else if (res.data.data.length != 0 && reg.test(queryInfo)) {
            this.queryInfo = "";
            succ(res.data.msg);

            // 清空表单中的条码、款号、颜色、尺码数据
            if (TYPE == "save") {
              this.form.code = "";
              this.form.psn = "";
              this.form.color = "";
              this.form.size = "";
            }
          }
          //分页查询第一第二级时候的参数
          let pageParams = {
            psn: queryInfo,
            page: 0,
            count: this.pageSize
          };
          this.pageParams = pageParams;
          this.getPageData(this.pageParams);
        } else {
          error(res.data.msg);
        }
      });
    },

    // 查询按钮
    query() {
      this.queryFun(this.queryInfo);
      localStorage.setItem("psn", this.queryInfo);
      this.clearForm();
    },

    // 退出按钮
    doOuts() {
      this.$emit("getOut", this.$route.name);
    },

    // 获取左侧树形导航数据
    getnavMenu() {
      this.$http
        .post("/TPA/psn/tree?sp=1&year=" + this.searchYear)
        .then(res => {
          // console.log(res);
          if (res.data.code === 0) {
            this.navMenus = res.data.data.childs;
          } else {
            error(res.data.msg);
          }
        })
        .catch(err => {
          NetworkAnomaly();
        });
    },

    //年度
    getYear() {
      this.$http
        .post("/TPA/aLbJb/getBySn?sn=001")
        .then(res => {
          // console.log(res);
          if (res.data.code === 0) {
            this.searchYearList = res.data.data;
          } else {
            error(res.data.msg);
          }
        })
        .catch(err => {
          NetworkAnomaly();
        });
    },

    //获取当前的年
    getDateYear() {
      var myDate = new Date();
      let year = myDate.getFullYear();
      this.searchYear = year;
    },

    // 点击form保存按钮
    doSaves() {
      if (this.form.date.length == 0) {
        error("日期不能为空");
        this.list = [];
      } else if (this.form.user.length == 0) {
        error("借衣人不能为空");
        this.list = [];
      } else if (this.form.code.length == 0) {
        error("条码不能为空");
        this.list = [];
      } else if (this.form.psn.length == 0) {
        error("款号不能为空");
        this.list = [];
      } else {
        this.$http
          .post("/TPA/cYpjc/insert", qs.stringify(this.form))
          .then(res => {
            if (res.data.code === 0) {
              succ(res.data.msg);
              // 设置传入类型
              let TYPE = "save";
              this.queryFun(res.data.data.psn, TYPE);
              this.bottom = res.data.data;
            } else {
              error(res.data.msg);
            }
          });
        this.confirm = true;
      }
    },

    // 点击创建
    doNews() {
      // 表单数据
      this.form = {
        id: "",
        // type: "", // 类型
        // typeSn: "", // 类型编号
        code: "", // 条码
        psn: "", // 款号
        color: "", // 颜色
        size: "", // 尺码
        date: "", // 日期
        user: "", // 责任人
        resume: "", // 说明
        stillUser: "", // 还衣人
        stillDate: "" // 还衣时间
      };
      this.confirm = false;
      this.returnBtn = false;
    },

    // 表单查询
    formQuery() {
      if (this.form.code.length === 0) {
        error("条码不能为空");
        this.form.psn = "";
        this.form.color = "";
        this.form.size = "";
      } else {
        this.$http
          .post("/TPA/cYpjc/getByCode", qs.stringify(this.form))
          .then(res => {
            if (res.data.code == 0) {
              succ(res.data.msg);
              this.form.psn = res.data.data[0].psn;
              this.form.color = res.data.data[0].color;
              this.form.size = res.data.data[0].size;
              this.form.code = res.data.data[0].sku;
            } else {
              error(res.data.msg);
              this.form.psn = "";
              this.form.color = "";
              this.form.size = "";
            }
          });
      }
    },

    // 点击左侧树形导航
    menuSelected(e) {
      this.page = 0;
      this.pageOnOff = false;
      this.queryFun(e);
    },

    // 保存还衣信息
    saveEdit() {
      if (this.dialog.stillUser.length == 0) {
        error("还衣人不能为空");
      } else {
        let params = []
        for(let i in this.dialog.id){
          let obj = {}
          obj.id = this.dialog.id[i]
          obj.stillUser = this.dialog.stillUser
          params.push(obj)
        }

        this.$http
          .post("/TPA/cYpjc/update", params)
          .then(res => {
            let psn = localStorage.getItem("psn");
            this.queryFun(psn);
          });
        this.editVisible = false;
      }
    },

    //table有效
    effective(index, row) {
      this.idx = index;
      let item = this.list[index];
      item.status = "1";
      this.$http
        .post("/TPA/cYpjc/status", qs.stringify(item))
        .then(res => {
          if (res.data.code === 0) {
            succ(res.data.msg);
            this.$set(this.list, this.idx, item);
            this.bottom = res.data.data;
            // console.log(res);
          } else {
            error(res.data.msg);
          }
        })
        .catch(err => {
          NetworkAnomaly();
        });
    },

    //table无效
    invalid(index, row) {
      this.idx = index;
      let item = this.list[index];
      item.status = 0;
      this.$http
        .post("/TPA/cYpjc/status", qs.stringify(item))
        .then(res => {
          if (res.data.code === 0) {
            succ(res.data.msg);
            this.$set(this.list, this.idx, item);
            this.bottom = res.data.data;
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
    },

    // 选择要还的样品
    handleSelectionChange(val) {
      this.multipleSelection = val;
      // console.log(this.multipleSelection);
      if (this.multipleSelection.length != 0) {
        this.returnDisabled = false;
      } else {
        this.returnDisabled = true;
      }
    },

    // 批量还
    returnFun() {
      let idArr = [];
      for (var i in this.multipleSelection) {
        // console.log(this.multipleSelection[i].id)
        idArr.push(this.multipleSelection[i].id);
      }
      this.editVisible = true;
      this.dialog.id = idArr;
    },

    //获取分页数据
    getPageData(pageParams) {
      // console.log(pageParams);
      this.$http
        .post("/TPA/cYpjc/search", qs.stringify(pageParams))
        .then(res => {
          // console.log(res)
          if (res.data.code === 0) {
            this.list = res.data.data.list;
            if (this.list.length != 0) {
              this.returnBtn = true;
            } else {
              this.returnBtn = false;
            }
            // this.list = res.data.data;
            for (var i in this.list) {
              // 如果没有stillUser这个参数则手动添加
              if (!this.list[i].stillUser) {
                this.list[i].stillUser = "";
              }

              // 如果有stillDate这个参数则截取年月日
              if (this.list[i].stillDate) {
                var stillDate = this.list[i].stillDate.slice(0, 10);
                this.list[i].stillDate = stillDate;
                // console.log(this.list);
              }
            }

            // console.log(res);
            this.total = res.data.data.total;
            if (this.total > this.pageSize) {
              this.pageOnOff = true;
            } else {
              this.pageOnOff = false;
            }
          } else {
            error(res.data.msg);
          }
        })
        .catch(err => {
          NetworkAnomaly();
        });
    }
  },

  // 监听当前页码
  watch: {
    page() {
      if (this.page !== 0) {
        this.pageParams.page = this.page - 1;
      }
      this.$http
        .post("/TPA/cYpjc/search", qs.stringify(this.pageParams))
        .then(res => {
          // console.log(res);
          console.log(2)
          if (res.data.code === 0) {
            this.list = res.data.data.list;
            this.total = res.data.data.total;
          } else {
            errorres.data.msg;
          }
        })
        .catch(err => {
          NetworkAnomaly();
        });
    },
    searchYear() {
      this.getnavMenu();
    }
  },

  // 接收vuex的值
  computed: {
    ...mapState(["collapse"])
  },

  // 页面载入时加载
  mounted() {
    this.getnavMenu();
    this.getYear();
    this.getDateYear();
    // this.getType();
  },

  // 引入组件
  components: {
    NavMenu
  }
};
</script>

<style lang="stylus" scoped>
.container>>>.el-submenu__title, .container>>>.el-menu-item
  height: 3vh
  line-height: 3vh
  font-size: 1.6vh !important
.container>>>th, .order_table>>>.el-table td, .el-table th
  padding: 0
.container>>>.info_form ul li, .container>>>.el-table .cell
  height: 4vh
  line-height: 4vh
  text-align: center
  font-size: 1.6vh
.container>>>.el-table__empty-block
  min-height: 3.5vh
.container>>>.el-dialog
  width: 400px
  height: 400px
  overflow-x: hidden
.container>>>.el-select
  width: 70%
  height: 3.5vh
  line-height: 3.5vh
  float: left
.container>>>.el-input__inner
  height: 3.5vh !important
  line-height: 3.5vh
.container>>>.el-input__icon
  line-height: 3.5vh
// 日期
.container>>>.el-date-editor
  float: left
  width: 70%
// 查询内容
.queryInfo
  padding: 0 2vh
  height: 3.5vh
  line-height: 3.5vh
  border: 0.1vh solid #d9d9d9
  background: #ffffff
  margin: 0.3vh 0.3vh
  font-size: 1.4vh
  display: block
  float: left
  cursor: pointer
  border-radius: 4px
.menu_box
  width: 15%
.set_info
  width: 85%
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
      width: 25%
      text-align: center
    input
      height: 3.5vh
      line-height: 3.5vh
      border: 0.1vh solid #d2d2d2
      outline: none
      padding-left: 1vh
      width: 75%
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
    height: 4vh
    line-height: 4vh
    border: 0.1vh solid #d9d9d9
    background: #ffffff
    margin-top: 0.8vh
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
.container>>>.el-pagination
  width: 40%
// 归还按钮
.return
  padding: 0 2vh
  height: 4vh
  line-height: 4vh
  background: #ffffff
  margin-top: 0.8vh
  margin-right: 10vh
  font-size: 1.2vh
  display: block
  float: right
  text-align: center
  text-decoration: underline
  cursor: pointer
  border-radius: 4px
  border: 0.1vh solid #409EFF
  font-weight: bold
  color: #409EFF
// 归还按钮禁用
.NoReturn
  padding: 0 2vh
  height: 4vh
  line-height: 4vh
  background: #ffffff
  margin-top: 0.8vh
  margin-right: 10vh
  font-size: 1.2vh
  display: block
  float: right
  text-align: center
  text-decoration: underline
  cursor: pointer
  border-radius: 4px
  border: 0.1vh solid #d9d9d9
  font-weight: bold
  color: #d9d9d9
.menu_box
  width: 15%
  position: relative
  .searchYear
    position: absolute
    top: 0
    width: 100%
  .el-menu
    position: absolute
    top: 4vh
    width: 100%
</style>