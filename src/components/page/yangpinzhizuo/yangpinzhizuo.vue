<template>
    <div class="container" :class="{container_collapse:collapse}">
        <!-- 页面标题 -->
        <p class="page_title">样品制作交接</p>

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
                <div class="info_form">
                    <ul class="clearfix">
                        <li>
                            <label for="">条码</label>
                            <input type="text" v-model="form.code">
                        </li>
                        <li>
                            <label for="">对接人</label>
                            <input type="text" v-model="form.userSn">
                        </li>
                        <li>
                            <label for="">数量</label>
                            <input type="text" v-model="form.number">
                        </li>
                        <button class="save" @click="handover" :disabled="confirm" :class="{button_btn:!confirm}">交接</button>
                    </ul>
                </div>

                <!-- 表格内容 -->
                <div class="order_table">
                    <el-table :data="list" border style="width: 100%">
                        <el-table-column prop="psn" label="款号" min-width="6%">
                        </el-table-column>
                        <el-table-column prop="color_name" label="颜色" min-width="8%">
                        </el-table-column>
                        <el-table-column prop="size_name" label="尺码" min-width="6%">
                        </el-table-column>
                        <el-table-column prop="number" label="数量" min-width="6%">
                        </el-table-column>
                        <el-table-column prop="sex" label="性别" min-width="6%">
                        </el-table-column>  
                        <el-table-column prop="year" label="年度" min-width="6%">
                        </el-table-column>
                        <el-table-column prop="quarter" label="季度" min-width="6%">
                        </el-table-column>
                        <el-table-column prop="brand" label="品牌" min-width="6%">
                        </el-table-column>
                        <el-table-column prop="channel" label="渠道" min-width="8%">
                        </el-table-column>
                        <el-table-column prop="rd_procedure" label="接收工序" min-width="8%">
                        </el-table-column>
                        <el-table-column prop="dj_user" label="对接人" min-width="6%">
                        </el-table-column>
                        <el-table-column prop="js_user" label="接收人" min-width="6%">
                        </el-table-column>
                        <el-table-column prop="js_date" label="接收日期" min-width="8%">
                        </el-table-column>
                        <el-table-column label="操作" min-width="14%">
                            <template slot-scope="scope">
                                <!-- <el-button :disabled="(scope.row.status == 1)" :class="{btn:(scope.row.status == 1)}" @click="effective(scope.$index, scope.row)" type="text">有效</el-button>
                                <el-button :disabled="(scope.row.status == 0)" :class="{btn:(scope.row.status == 0)}" @click="invalid(scope.$index, scope.row)" type="text">无效</el-button> -->
                                <el-checkbox v-model="scope.row.checked" class="checkBox" @change="effective(scope.$index, scope.row, scope.row.checked)">有效</el-checkbox>
                                <el-checkbox v-model="scope.row.audit" class="checkBox2" @change="auditFun(scope.$index, scope.row, scope.row.audit)">审核</el-checkbox>
                            </template>
                        </el-table-column>
                    </el-table>
                </div>
            </div>
            <!-- 底部页码 -->
            <div class="pageBox">
                <el-pagination @current-change="currentPage" :current-page='page' v-if="pageOnOff" background  :page-size="pageSize" :pager-count="5" :total="total">
                </el-pagination>
            </div>
        </div>
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
  name: "yangpinzzhizuo",
  data() {
    return {
      queryInfo: "", // 查询内容

      navMenus: [], //导航数据
      searchYear: "", //当前当行的年份
      searchYearList: [], //导航年份数组

      // 表单数据
      form: {
        code: "",
        userSn: "",
        number: ""
      },

      list: [], // 表格数据

      confirm: false, // 点击保存/创建修改状态，默认为不禁用

      //分页：当前页码/总数量/每页显示条数
      page: 0,
      total: "",
      pageSize: 10,
      pageOnOff: false,
      //分页查询第一第二级时候的参数
      pageParams: {},

      bottom: {
        addUser: "",
        addDate: "",
        updateUser: "",
        updateDate: ""
      }
    };
  },

  methods: {
    queryFun(queryInfo) {
      this.$http
        .post("/TPA/cYpzz/getByPsn", qs.stringify(queryInfo))
        .then(res => {
          if (res.data.code == 0) {
            // console.log(res);
            if (res.data.data.length != 0) {
              // succ(res.data.msg);
              this.list = res.data.data;

              for (var i in this.list) {
                // 添加checked属性，判断有效状态
                if (this.list[i].status == "1") {
                  this.list[i].checked = true;
                } else {
                  this.list[i].checked = false;
                }

                // 添加audit属性，判断审核状态
                if (this.list[i].sh == "1") {
                  this.list[i].audit = true;
                } else {
                  this.list[i].audit = false;
                }

                // 截取年月日
                if (this.list[i].js_date) {
                  var js_date = this.list[i].js_date.slice(0, 10);
                  this.list[i].js_date = js_date;
                }
              }

              // 获取分页
              // console.log(res.data.attachment.count)
              this.total = res.data.attachment.count;
              if (this.total > this.pageSize) {
                this.pageOnOff = true;
              } else {
                this.pageOnOff = false;
              }
              this.queryInfo = "";

              // 点击有效和审核按钮刷新列表但不提示
              if (queryInfo.msg == "NULL") {
                // 不做弹出提示
              } else {
                succ(res.data.msg);
              }
            } else if (queryInfo.psn.length < 8) {
              // error("该款号暂无数据");

              // 点击的导航没有数据时清空表格
              this.list = [];
            } else {
              // 点击的导航没有数据时清空表格
              this.list = [];
            }
          }
          // console.log(res);
        });
    },

    // 查询按钮
    query() {
      var queryInfo = {
        psn: this.queryInfo,
        page: 0,
        count: this.pageSize
      };
      localStorage.setItem("psn", this.queryInfo);
      this.queryFun(queryInfo);
    },

    // 退出按钮
    doOuts() {
      this.$emit("getOut", this.$route.name);
    },

    // 交接按钮
    handover() {
      if (this.form.number.length == 0) {
        this.form.number = "1";
      }
      this.$http
        .post("/TPA/cYpzz/insert", qs.stringify(this.form))
        .then(res => {
          if (res.data.code == 0) {
            succ(res.data.msg);
            var queryInfo = {
              psn: res.data.data.psn,
              page: 0,
              count: this.pageSize
            };
            this.queryFun(queryInfo);
          } else {
            error(res.data.msg);
          }
          // console.log(res);
        });
    },

    // 有效按钮
    effective(index, row, checked) {
      this.idx = index;
      let item = this.list[index];
      // 改为无效
      if (checked == false) {
        item.status = 0;
        this.$http
          .post("/TPA/cYpzz/status", qs.stringify(item))
          .then(res => {
            if (res.data.code === 0) {
              succ(res.data.msg);
              this.$set(this.list, this.idx, item);
            } else {
              error(res.data.msg);
            }
          })
          .catch(err => {
            NetworkAnomaly();
          });
      } else if (checked == true) {
        // 改为有效
        item.status = "1";
        this.$http
          .post("/TPA/cYpzz/status", qs.stringify(item))
          .then(res => {
            //   console.log(res)
            if (res.data.code === 0) {
              succ(res.data.msg);
              this.$set(this.list, this.idx, item);
            } else {
              error(res.data.msg);
              // 已交接按钮不可变
              item.checked = true;
            }
          })
          .catch(err => {
            NetworkAnomaly();
          });
      }

      var queryInfo = {
        psn: item.psn,
        page: 0,
        count: this.pageSize,
        msg: "NULL"
      };
      this.queryFun(queryInfo);
    },

    // 审核按钮
    auditFun(index, row, audit) {
      this.idx = index;
      let item = this.list[index];
      // 改为未审核
      if (audit == false) {
        item.status = 0;
        this.$http
          .post("/TPA/cYpzz/auditing", qs.stringify(item))
          .then(res => {
            if (res.data.code === 0) {
              succ(res.data.msg);
              this.$set(this.list, this.idx, item);
            } else {
              error(res.data.msg);
            }
          })
          .catch(err => {
            NetworkAnomaly();
          });
      } else if (audit == true) {
        // 改为已审核
        item.status = "1";
        this.$http
          .post("/TPA/cYpzz/auditing", qs.stringify(item))
          .then(res => {
            //   console.log(res)
            if (res.data.code === 0) {
              succ(res.data.msg);
              this.$set(this.list, this.idx, item);
            } else {
              error(res.data.msg);
              // 已审核按钮不可变
              item.audit = true;
            }
          })
          .catch(err => {
            NetworkAnomaly();
          });
      }

      var queryInfo = {
        psn: item.psn,
        page: 0,
        count: this.pageSize,
        msg: "NULL"
      };
      // console.log(queryInfo);
      // 因为数据请求返回的速度有延迟，所以更新列表需要设置一下延迟
      setTimeout(() => {
        this.queryFun(queryInfo);
      }, 500);
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

    // 点击左侧树形导航
    menuSelected(e) {
      this.pageOnOff = false;
      this.page = 0;
      var queryInfo = {
        psn: e,
        page: this.page,
        count: this.pageSize
      };
      localStorage.setItem("psn", e);
      // console.log(e);
      this.queryFun(queryInfo);
    },

    //点击页码
    currentPage(val) {
      let psn = localStorage.getItem("psn");
      var queryInfo = {
        psn: psn,
        page: val - 1,
        count: this.pageSize
      };
      this.queryFun(queryInfo);
    }
  },

  // 监听
  watch: {
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
.checkBox
  float: left
  margin: 0
.checkBox2
  float: left
  margin-left: 10px
.container>>>.el-pagination
  width: 40%
.container>>>.el-pager
  min-width: 50px
.container>>>.el-pagination
  right: 24%
.menu_box
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