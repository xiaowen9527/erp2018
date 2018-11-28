<template>
  <div
    class="container"
    :class="{container_collapse:collapse}"
  >
    <p class="page_title">组织架构</p>
    <div class="btn-box">
      <button
        :disabled='doAdd'
        :class="{button_btn:!doAdd}"
        @click="doAdds"
      >新增</button>
      <button
        :disabled='doSave'
        :class="{button_btn:!doSave}"
        @click="doSaves"
      >保存</button>
      <button
        :disabled='doEdit'
        :class="{button_btn:!doEdit}"
        @click="doEdits"
      >修改</button>
      <button
        :disabled='doOut'
        :class="{button_btn:!doOut}"
        @click="doOuts"
      >退出</button>
      <button
        :disabled='doCancel'
        :class="{button_btn:!doCancel}"
        @click="doCancels"
      >取消</button>
      <button
        class="button_btn"
        @click="refresh"
      >刷新</button>
      <div class="btn_right">
        <button
          :disabled='doImport'
          :class="{button_btn:!doImport}"
          @click="doImports"
        >导入</button>
        <button
          :disabled='doExport'
          :class="{button_btn:!doExport}"
          @click="doExports"
        >导出</button>
        <button
          :disabled='(this.form.status==1||this.form.status==3)'
          :class="{button_btn:(this.form.status==0)}"
          @click="doEffectives"
        >有效</button>
        <button
          :disabled='(this.form.status==0||this.form.status==3)'
          :class="{button_btn:(this.form.status==1)}"
          @click="doInvalids"
        >无效</button>
        <button
          :disabled='doDelete'
          :class="{button_btn:!doDelete}"
          @click="doDeletes"
        >删除</button>
      </div>
    </div>
    <div class="set_box">
      <div class="menu_box">
        <el-menu
          unique-opened
          @select="menuSelected"
          @open="menuSelected"
          background-color="#f2f2f2"
          text-color="#303133"
          active-text-color="#303133"
        >
          <nav-menu :navMenus="navMenus"></nav-menu>
        </el-menu>
      </div>
      <div class="set_info">
        <ul>
          <li>
            <label>编号</label>
            <input
              type="text"
              v-model="form.sn"
              :disabled='addAgain'
            >
          </li>
          <li>
            <label>排序</label>
            <input
              type="number"
              v-model="form.sort"
              :disabled='formOnOff'
              placeholder="只允许输入数字且不能为空"
            >
          </li>
          <li>
            <label>部门名称</label>
            <input
              type="text"
              v-model="form.name"
              :disabled='addAgain'
            >
          </li>
          <li class="company">
            <label>归属公司</label>
            <input
              type="text"
              readonly
              class="companyNum"
              v-model="form.gsSn"
              :disabled='gui'
              placeholder="顶级"
            >
            <input
              type="text"
              readonly
              class="companyName"
              v-model="form.gsName"
              :disabled='gui'
              placeholder="顶级"
            >
            <button
              @click="open_box"
              :disabled='gui'
            >。。。</button>
          </li>
          <li class="company">
            <label>归属部门</label>
            <input
              type="text"
              readonly
              class="companyNum"
              v-model="form.pidSn"
              :disabled='gui'
              placeholder="顶级"
            >
            <input
              type="text"
              readonly
              class="companyName"
              v-model="form.pidName"
              :disabled='gui'
              placeholder="顶级"
            >
            <button
              @click="open_boxs"
              :disabled='gui'
            >。。。</button>
          </li>
          <li class="zt">
            <label>状态</label>
            <el-radio
              label="1"
              v-model="form.status"
              :disabled="doZt"
            >有效</el-radio>
            <el-radio
              label="0"
              v-model="form.status"
              :disabled="doZt"
            >无效</el-radio>
          </li>
          <li class="radio">
            <el-checkbox
              v-model="form.cgzz"
              :disabled="formOnOff"
            >采购组织</el-checkbox>
            <el-checkbox
              v-model="form.xqzz"
              :disabled="formOnOff"
            >销售组织</el-checkbox>
            <el-checkbox
              v-model="form.kczz"
              :disabled="formOnOff"
            >库存组织</el-checkbox>
            <el-checkbox
              v-model="form.sczz"
              :disabled="formOnOff"
            >生产组织</el-checkbox>
            <el-checkbox
              v-model="form.hszz"
              :disabled="formOnOff"
            >核算</el-checkbox>
            <el-checkbox
              v-model="form.zjzz"
              :disabled="formOnOff"
            >资金</el-checkbox>
          </li>
        </ul>

      </div>
    </div>
    <div
      class="pageBox"
      :class="{collapse:collapse}"
    >
      <ul>
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
      </ul>
    </div>

    <el-dialog
      title="归属公司"
      :visible.sync="oldMenu"
    >
      <ul>
        <li v-if="navMenus.length===0">暂无数据</li>
        <li
          v-for="(item,i) in navMenus"
          :key="i"
        >
          <span @click="getCompanyName(item)">{{item.entity.name}}</span>
        </li>
      </ul>
    </el-dialog>
    <el-dialog
      title="归属部门"
      :visible.sync="oldMenus"
    >
      <ul class="srcond_menu">
        <li v-if="lists.length===0">暂无数据</li>
        <li
          v-for="(item,i) in lists"
          :key="i"
        >
          <span @click="getDepartmentName(item)">|--{{item.entity.name}}</span>
          <div
            class="second"
            v-for="(items,i) in item.childs"
            :key="i"
          >
            <p @click="getDepartmentName(items)">|--{{items.entity.name}}</p>
            <div
              class="second"
              v-for="(itemss,i) in items.childs"
              :key="i"
            >
              <p @click="getDepartmentName(itemss)">|--{{itemss.entity.name}}</p>
              <div
                class="second"
                v-for="(itemsss,i) in itemss.childs"
                :key="i"
              >
                <p @click="getDepartmentName(itemsss)">|--{{itemsss.entity.name}}</p>
                <div
                  class="second"
                  v-for="(itemssss,i) in itemsss.childs"
                  :key="i"
                >
                  <p @click="getDepartmentName(itemssss)">|--{{itemssss.entity.name}}</p>
                  <div
                    class="second"
                    v-for="(itemsssss,i) in itemssss.childs"
                    :key="i"
                  >
                    <p @click="getDepartmentName(itemsssss)">|--{{itemsssss.entity.name}}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </li>
      </ul>
    </el-dialog>

    <!-- 导入弹窗 -->
    <el-dialog
      class="importExport"
      title="导入"
      :visible.sync="importbox"
      width="30%"
      :showClose="false"
      :show-file-list="false"
    >
      <a
        class="down"
        href="/TPA/aGsZzjg/downExcel"
      >下载导入模板</a>
      <el-upload
        name="file"
        class="upload-demo"
        ref="upload"
        action=""
        :file-list="fileList"
        :http-request="uploadFile"
        :auto-upload="false"
        accept=".xls,.xlsx,.csv"
      >
        <el-button
          slot="trigger"
          size="small"
          type="primary"
          plain
        >选取文件</el-button>
        <div
          slot="tip"
          class="el-upload__tip"
        >只能上传excel文件</div>
      </el-upload>
      <span
        slot="footer"
        class="dialog-footer"
      >
        <el-button @click="importCancel">取 消</el-button>
        <el-button
          type="primary"
          @click="submitUpload"
          plain
        >确 定</el-button>
      </span>
    </el-dialog>
    <div
      class="importZhe"
      v-if="importZhe"
      v-loading="true"
      element-loading-text="正在上传中..."
      element-loading-spinner="el-icon-loading"
      element-loading-background="rgba(0, 0, 0, 0.8)"
    ></div>
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
  abnormal,
  succ,
  error,
  getOut
} from "../../../assets/js/message.js";
import NavMenu from "./NavMenu";
import qs from "qs";
export default {
  name: "zuzhijiagou",
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

      //选取的当前菜单的index
      selectMenu: "",

      //按钮开关
      doAdd: false,
      doSave: true,
      doEdit: true,
      doImport: false,
      doExport: false,
      doOut: false,
      doCancel: true,
      doDelete: true,
      doZt: true,

      gui: true,
      addAgain: true,

      //表单开关
      formOnOff: true,
      //保存时候是新增还是修改状态 新增true/修改false
      addEdit: true,
      //表单
      form: {
        id: "", //id
        gsSn: "", //归属公司编号
        gsName: "", //归属公司名称
        pidSn: "", //部门编号
        pidName: "", //部门名称
        jbGs: "", //级别归属
        name: "", //部门名称
        sn: "", //部门编号
        lxrGs: "", //联系人
        zdRen: "", //编制人
        addDate: "", //编制日期
        sort: "", //排序
        cgzz: false, //采购组织
        xqzz: false, //销售组织
        kczz: false, //库存组织
        sczz: false, //生产组织
        hszz: false, //核算组织
        zjzz: false, //资金组织
        updateUser: "", //修改人
        updateDate: "", //修改日期
        status: "3"
      },
      //归属公司编号，用来选择归属公司下的归属部门
      gsSn: "",
      //弹出框公司列表
      list: [],
      //弹出框部门列表
      lists: [],
      //公司部门树形列表
      navMenus: [],
      oldMenu: false,
      oldMenus: false
    };
  },
  mounted() {
    this.getNavmenus();
  },
  methods: {
    //导入按纽
    doImports() {
      this.importbox = true;
    },
    //导入取消
    importCancel() {
      this.emptyBtn();
      this.importbox = false;
      this.$refs.upload.clearFiles();
    },
    //文件上传到服务器按钮
    submitUpload() {
      this.$refs.upload.submit();
      this.importZhe = true;
    },
    //自定义上传
    uploadFile(params) {
      const _file = params.file;
      let formData = new FormData();
      formData.append("file", _file);
      this.$ajax
        .post("/TPA/aGsZzjg/importExcel", formData)
        .then(res => {
          console.log(res);
          if (res.status === 200) {
            if (res.data.code === 0) {
              succ(res.data.msg);
              this.getnavMenu();
              this.importCancel();
              this.$refs.upload.clearFiles();
            } else if (res.data.code === 100) {
              this.tipOffON = true;
              this.project = res.data.attachment.name;
              this.Tips = res.data.msg
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
      window.location.href = "/TPA/aGsZzjg/exportExcel";
    },

    //刷新
    refresh() {
      this.emptyform();
      this.emptybtn();
      this.getNavmenus();
      succ("刷新成功");
    },
    //新增按钮
    doAdds() {
      this.emptyBtnTo();
      this.doSave = false;
      this.formOnOff = false;
      this.addEdit = true;
      this.emptyform();
      this.gui = false;
      this.addAgain = false;
    },
    //保存按钮
    doSaves() {
      this.oldMenu = false;
      this.oldMenus = false;
      if (this.addEdit) {
        if (this.form.sn.length === 0) {
          error("部门编号不能为空！");
          this.form.sn = "";
        } else if (this.form.gsSn.length === 0) {
          error("归属公司不能为空！");
          this.form.gsSn = "";
        } else if (this.form.name.length === 0) {
          error("部门名称不能为空！");
          this.form.name = "";
        } else if (this.form.sort.length === 0) {
          error("排序不能为空！");
          this.form.sort = "";
        } else {
          this.form.cgzz = this.elCheckboxs(this.form.cgzz);
          this.form.xqzz = this.elCheckboxs(this.form.xqzz);
          this.form.kczz = this.elCheckboxs(this.form.kczz);
          this.form.sczz = this.elCheckboxs(this.form.sczz);
          this.form.hszz = this.elCheckboxs(this.form.hszz);
          this.form.zjzz = this.elCheckboxs(this.form.zjzz);
          this.$http
            .post("/TPA/aGsZzjg/insert", qs.stringify(this.form))
            .then(res => {
              if (res.data.code === 0) {
                let gsSn = this.form.gsSn;
                let gsName = this.form.gsName;
                let pidSn = this.form.pidSn;
                let pidName = this.form.pidName;
                this.getNavmenus();
                this.emptyform();
                this.form.gsSn = gsSn;
                this.form.gsName = gsName;
                this.form.pidSn = pidSn;
                this.form.pidName = pidName;
                this.doAdd = false;
                succ(res.data.msg);
                this.gui = true;
              } else {
                error(res.data.msg);
              }
            })
            .catch(err => {
              NetworkAnomaly();
            });
        }
      } else {
        if (this.form.sn.length === 0) {
          error("部门编号不能为空！");
        } else if (this.form.gsSn.length === 0) {
          error("归属公司不能为空！");
        } else if (this.form.name.length === 0) {
          error("部门名称不能为空！");
        } else if (this.form.sort.length === 0) {
          error("排序不能为空！");
        } else {
          this.form.cgzz = this.elCheckboxs(this.form.cgzz);
          this.form.xqzz = this.elCheckboxs(this.form.xqzz);
          this.form.kczz = this.elCheckboxs(this.form.kczz);
          this.form.sczz = this.elCheckboxs(this.form.sczz);
          this.form.hszz = this.elCheckboxs(this.form.hszz);
          this.form.zjzz = this.elCheckboxs(this.form.zjzz);
          this.$http
            .post("/TPA/aGsZzjg/update?", qs.stringify(this.form))
            .then(res => {
              if (res.data.code === 0) {
                let status = this.form.status;
                let addUser = this.form.addUser;
                let addDate = this.form.addDate;
                let sn = this.form.sn;
                let name = this.form.name;
                this.form = res.data.data;
                this.form.status = status;
                this.form.addUser = addUser;
                this.form.addDate = addDate;
                this.form.sn = sn;
                this.form.name = name;
                this.form.cgzz = this.elCheckbox(this.form.cgzz);
                this.form.xqzz = this.elCheckbox(this.form.xqzz);
                this.form.kczz = this.elCheckbox(this.form.kczz);
                this.form.sczz = this.elCheckbox(this.form.sczz);
                this.form.hszz = this.elCheckbox(this.form.hszz);
                this.form.zjzz = this.elCheckbox(this.form.zjzz);
                this.getNavmenus();
                this.emptyBtnTo();
                this.doAdd = false;
                this.doEdit = false;
                this.doDelete = false;
                succ(res.data.msg);
                this.formOnOff = true;
                console.log(this.form);
              } else {
                error(res.data.msg);
              }
            })
            .catch(err => {
              NetworkAnomaly();
            });
        }

        this.doCancel = false;
      }
    },
    //修改按钮
    doEdits() {
      this.emptyBtnTo();
      this.doSave = false;
      this.addEdit = false;
      this.formOnOff = false;
      this.doDelete = false;
    },
    //退出按钮
    doOuts() {
      this.$emit("getOut", this.$route.name);
    },
    //取消按钮
    doCancels() {
      this.emptybtn();
      this.emptyform();
      this.form.status = "3";
    },
    //有效
    doEffectives() {
      let params = {
        id: this.form.id,
        status: "1"
      };
      this.$http
        .post("/TPA/aGsZzjg/status", qs.stringify(params))
        .then(res => {
          if (res.data.code === 0) {
            this.form.status = params.status;
            this.emptyBtnTo();
            this.doEdit = false;
            this.doDelete = false;
            this.formOnOff = true;
            this.doAdd = false;
            succ(res.data.msg);
          } else {
            error(res.data.msg);
          }
        })
        .catch(err => {
          NetworkAnomaly();
        });
    },
    //无效
    doInvalids() {
      let params = {
        id: this.form.id,
        status: "0"
      };
      this.$http
        .post("/TPA/aGsZzjg/status", qs.stringify(params))
        .then(res => {
          if (res.data.code === 0) {
            this.form.status = params.status;
            this.emptyBtnTo();
            this.doEdit = false;
            this.doDelete = false;
            this.formOnOff = true;
            this.doAdd = false;
            succ(res.data.msg);
          } else {
            error(res.data.msg);
          }
        })
        .catch(err => {
          NetworkAnomaly();
        });
    },
    //删除
    doDeletes() {
      this.$http
        .post("/TPA/aGsZzjg/delete?id=" + this.form.id)
        .then(res => {
          if (res.data.code === 0) {
            succ(res.data.msg);
            this.getNavmenus();
            this.emptybtn();
            this.emptyform();
            this.formOnOff = true;
          } else {
            error(res.data.msg);
          }
        })
        .catch(err => {
          NetworkAnomaly();
        });
    },
    //选择导航菜单
    menuSelected(index) {
      this.oldMenu = false;
      this.oldMenus = false;
      if (index.length < 10) {
        this.$http
          .post("/TPA/aGsZzjg/get?id=" + index)
          .then(res => {
            if (res.data.code === 0) {
              this.formOnOff = true;
              this.emptyBtnTo();
              this.doEdit = false;
              this.doEffective = false;
              this.doInvalid = false;
              this.doDelete = false;
              this.doAdd = false;

              this.form = res.data.data;
              this.form.cgzz = this.elCheckbox(res.data.data.cgzz);
              this.form.xqzz = this.elCheckbox(res.data.data.xqzz);
              this.form.kczz = this.elCheckbox(res.data.data.kczz);
              this.form.sczz = this.elCheckbox(res.data.data.sczz);
              this.form.hszz = this.elCheckbox(res.data.data.hszz);
              this.form.zjzz = this.elCheckbox(res.data.data.zjzz);

              this.gsSn = this.form.gsSn;

              //遍历公司获取当前的所属公司名
              for (let i = 0; i < this.navMenus.length; i++) {
                if (this.navMenus[i].entity.sn === this.form.gsSn) {
                  this.form.gsName = this.navMenus[i].entity.name;
                }
              }
            } else if (res.data.code === 1 && res.data.msg == "不存在") {
              this.formOnOff = true;
              this.emptyform();
              this.emptybtn();
              this.form.status = "3";
            } else {
              error(res.data.msg);
            }
          })
          .catch(err => {
            NetworkAnomaly();
          });
      }
    },
    //关闭弹出框
    close_box() {
      this.oldMenu = false;
    },
    close_boxs() {
      this.oldMenus = false;
    },
    //打开弹出框
    open_box() {
      this.oldMenu = true;
    },
    open_boxs() {
      if (this.form.gsSn.length === 0) {
        error("请先选择归属公司！");
      } else {
        this.oldMenus = true;
        this.getDepartment();
      }
    },

    //点击归属公司的列表item获取归属公司的编号和名称
    getCompanyName(item) {
      this.form.gsSn = item.entity.sn;
      this.form.gsName = item.entity.name;

      this.gsSn = this.form.gsSn;
      this.form.pidSn = "";
      this.form.pidName = "";
      this.lists = "";
      this.oldMenu = false;
    },
    //获取归属部门列表
    getDepartment() {
      this.$http
        .post("/TPA/aGsZzjg/tree?gsSn=" + this.gsSn)
        .then(res => {
          if (res.data.code === 0) {
            this.lists = res.data.data.childs;
          } else {
            error(res.data.msg);
          }
        })
        .catch(err => {
          NetworkAnomaly();
        });
    },
    //点击归属部门列表item获取归属部门的编号和名称
    getDepartmentName(item) {
      this.form.pidSn = item.entity.sn;
      this.form.pidName = item.entity.name;
      this.oldMenus = false;
    },
    //获取导航
    getNavmenus() {
      this.$http
        .post("/TPA/aGsZzjg/tree")
        .then(res => {
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
    //按钮初始状态
    emptybtn() {
      this.doAdd = false;
      this.doSave = true;
      this.doEdit = true;
      this.doImport = false;
      this.doExport = false;
      this.doCancel = true;
      this.doDelete = true;

      this.formOnOff = true;
      this.gui = true;
      this.addAgain = true;
      this.oldMenu = false;
      this.oldMenus = false;
    },
    //按钮按下
    emptyBtnTo() {
      this.doAdd = true;
      this.doSave = true;
      this.doEdit = true;
      this.doImport = true;
      this.doExport = true;
      this.doCancel = false;
      this.doDelete = true;

      this.gui = true;
      this.oldMenu = false;
      this.oldMenus = false;
      this.addAgain = true;
    },
    //表单初始状态
    emptyform() {
      this.form = {
        id: "", //id
        gsSn: "", //归属公司编号
        gsName: "", //归属公司名称
        pidSn: "", //部门编号
        pidName: "", //部门名称
        jbGs: "", //级别归属
        name: "", //部门名称
        sn: "", //部门编号
        lxrGs: "", //联系人
        zdRen: "", //编制人
        addDate: "", //编制日期
        sort: "", //排序
        cgzz: false, //采购组织
        xqzz: false, //销售组织
        kczz: false, //库存组织
        sczz: false, //生产组织
        hszz: false, //核算组织
        zjzz: false, //资金组织
        updateUser: "", //修改人
        updateDate: "", //修改日期
        status: "3"
      };
    },
    //0/1转化成false/true
    elCheckbox(name) {
      if (name == 1) {
        name = true;
      } else if (name == 0) {
        name = false;
      }
      return name;
    },
    //false/true转化成0/1
    elCheckboxs(name) {
      if (name) {
        name = 1;
      } else {
        name = 0;
      }
      return name;
    }
  },
  watch: {
    tipOffON() {
      if (this.tipOffON === false) {
        console.log(0);
      }
    },
    importbox() {
      if (this.importbox === false) {
        this.$refs.upload.clearFiles();
      }
    }
  },
  computed: {
    ...mapState(["collapse"])
  },
  components: {
    NavMenu
  }
};
</script>

<style lang="stylus" scoped>
.container>>>.el-submenu__title, .container>>>.el-menu-item
  height 3vh
  line-height 3vh
  font-size 1.6vh !important
  font-weight bold
.container>>>th, .order_table>>>.el-table td, .el-table th
  padding 0
.container>>>.el-table .cell
  height 4vh
  line-height 4vh
  text-align center
  font-size 1.6vh
.container>>>.el-dialog
  width 400px
  height 400px
  overflow-x hidden
.container>>>.el-dialog__body
  cursor pointer !important
  line-height 2.5vh
  font-weight bold
  padding 1vh 2vh
.container>>>.el-radio__label
  font-size 1.6vh
.container>>>.el-checkbox__label
  font-size 1.6vh
.menu_box
  width 20%
  overflow auto !important
.set_info
  width 80%
  li
    float left
    width 32%
    margin 1vh 0
    height 3.5vh
    &.radio
      width 70%
      label
        width auto
        padding 0 1vh
        margin 0 0.5vh
    &.company
      width 35%
      label
        width 22%
    label
      width 30%
      display block
      float left
      height 3.5vh
      line-height 3.5vh
      padding-left 1vh
      text-align left
    input
      width 70%
      line-height 3.5vh
      float left
      height 3.5vh
      padding-left 1vh
      border 0.1vh solid #d2d2d2
      &.companyNum
        width 18%
        margin-right 1vh
      &.companyName
        width 36%
        margin-right 1vh
    .el-radio
      margin 0 !important
      width auto
      padding 0 1vh
    button
      width 50px
      height 3.5vh
      border 0.1vh solid #d2d2d2
      background none
      margin-right 0.5vh
      line-height 3.5vh
      text-align center
      border-radius 0.5vh
      cursor pointer
      margin-top 2px
    &.zt
      width 22%
      margin-left 20px
      label
        text-align center
</style>