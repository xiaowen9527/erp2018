<template>
    <div class="container" :class="{container_collapse:collapse}">
        <p class="page_title">基本类别</p>
        <div class="btn-box">
            <button :disabled='doAdd' :class="{button_btn:!doAdd}" @click="doAdds">新增</button>
            <button :disabled='doEdit' :class="{button_btn:!doEdit}" @click="doEdits">修改</button>
            <button :disabled='doImport' :class="{button_btn:!doImport}" @click="doImports">导入</button>
            <button :disabled='doExport' :class="{button_btn:!doExport}" @click="doExports">导出</button>
            <button :disabled='(this.form.status==1||this.form.status==3)' :class="{button_btn:(this.form.status==0)}" @click="doEffectives">有效</button>
            <button :disabled='(this.form.status==0||this.form.status==3)' :class="{button_btn:(this.form.status==1)}" @click="doInvalids">无效</button>
            <button :disabled='doOut' :class="{button_btn:!doOut}" @click="doOuts">退出</button>
            <button :disabled='doDelete' :class="{button_btn:!doDelete}" @click="doDeletes">删除</button>
            <button :disabled='doCancel' :class="{button_btn:!doCancel}" @click="doCancels">取消</button>
            <button  class="button_btn" @click="refresh">刷新</button>
        </div>
        <div class="set_box">
            <div class="menu_box">
                <el-menu unique-opened @select="menuSelected" @open="menuSelected"  background-color="#f2f2f2" text-color="#303133" active-text-color="#303133">
                    <nav-menu :navMenus="this.navMenus"></nav-menu>
                </el-menu>
            </div>
            <div class="set_info">
                <div class="info_form">
                    <ul>
                        <li class="menuLi">
                            <label>类别</label>
                            <input placeholder="顶级" v-model="form.pidSn" :disabled="gui" readonly class="first" @click="open_box">
                            <input placeholder="顶级" v-model="form.pidName" :disabled="gui" readonly @click="open_box">
                            <button :disabled="gui" @click="open_box">。。。</button>
                        </li>
                        <li>
                            <label>名称</label>
                            <input type="text" v-model="form.name" :disabled="addAgain">
                        </li>
                        <li>
                            <label> 编号</label>
                            <input type="text" v-model="form.sn" disabled placeholder="自动生成">
                        </li>
                        <li>
                            <label>简称</label>
                            <input type="text" v-model="form.jc" :disabled="addAgain">
                        </li>
                        <li>
                            <label>排序</label>
                            <input type="number" placeholder="只允许输入数字" v-model="form.sort" :disabled="doSave">
                        </li>
                        <button class="save" :disabled="doSave" :class="{button_btn:!doSave}" @click="addSave">保存</button>

                    </ul>
                </div>
                <div class="order_table">
                    <el-table :data="list" border style="width: 100%">
                        <el-table-column prop="pidName" label="类别" min-width="15%">
                        </el-table-column>
                        <el-table-column prop="sn" label="编号" min-width="15%">
                        </el-table-column>
                        <el-table-column prop="name" label="名称" min-width="15%">
                        </el-table-column>
                        <el-table-column prop="jc" label="简称" min-width="15%">
                        </el-table-column>
                        <el-table-column prop="sort" label="顺序" min-width="15%">
                        </el-table-column>
                        <el-table-column fixed="right" label="操作" min-width="25%">
                            <template slot-scope="scope">
                                <el-button @click="handleEdit(scope.$index, scope.row)" type="text">编辑</el-button>
                                <el-button :disabled="(scope.row.status == 1)" :class="{btn:(scope.row.status == 1)}" @click="effective(scope.$index, scope.row)" type="text">有效</el-button>
                                <el-button :disabled="(scope.row.status == 0)" :class="{btn:(scope.row.status == 0)}" @click="invalid(scope.$index, scope.row)" type="text">无效</el-button>
                            </template>
                        </el-table-column>
                    </el-table>
                </div>
            </div>
        </div>
        <div class="pageBox" :class="{collapse:collapse}">
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
            </ul>
            <el-pagination v-if="pageOnOff" background :page-size="pageSize" :pager-count="5" :total="total" @current-change="currentPage">
            </el-pagination>
        </div>
        <!-- 编辑弹出框 -->
        <el-dialog title="编辑" :visible.sync="editVisible" width="30%">
            <el-form ref="forms" :model="dialog" label-width="100px">
                <el-form-item label="名称">
                    <el-input v-model="dialog.name" disabled></el-input>
                </el-form-item>
                <el-form-item label="编号">
                    <el-input v-model="dialog.sn" disabled></el-input>
                </el-form-item>
                <el-form-item label="简称">
                    <el-input v-model="dialog.jc" disabled></el-input>
                </el-form-item>
                <el-form-item label="顺序">
                    <el-input type="number" v-model="dialog.sort" placeholder="只允许输入数字"></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="editVisible = false">取 消</el-button>
                <el-button type="primary" @click="saveEdit">确 定</el-button>
            </span>
        </el-dialog>
        <el-dialog title="类别" :visible.sync="oldMenu">
            <ul class="srcond_menu">
                <li v-if="navMenus.length===0">暂无数据</li>
                <li v-for="(item,i) in navMenus" :key="i">
                    <span @click="getOldMenu(item)">|--{{item.entity.name}}</span>
                    <!-- <div class="second" v-for="(items,i) in item.childs" :key="i">
                        <p @click="getOldMenu(items)">|--{{items.entity.name}}</p>
                        <div class="second" v-for="(itemss,i) in items.childs" :key="i">
                            <p @click="getOldMenu(itemss)">|--{{itemss.entity.name}}</p>
                            <div class="second" v-for="(itemsss,i) in itemss.childs" :key="i">
                                <p @click="getOldMenu(itemsss)">|--{{itemsss.entity.name}}</p>
                                <div class="second" v-for="(itemssss,i) in itemsss.childs" :key="i">
                                    <p @click="getOldMenu(itemssss)">|--{{itemssss.entity.name}}</p>
                                    <div class="second" v-for="(itemsssss,i) in itemssss.childs" :key="i">
                                        <p @click="getOldMenu(itemsssss)">|--{{itemsssss.entity.name}}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div> -->
                </li>
            </ul>
        </el-dialog>

        <!-- 导入弹窗 -->
        <el-dialog class="importExport" title="导入" :visible.sync="importbox" width="30%" :showClose="false" :show-file-list="false">
            <a class="down" href="/TPA/aLbJb/downExcel">下载导入模板</a>
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
import NavMenu from "./NavMenu";
import qs from "qs";
import {
  NetworkAnomaly,
  abnormal,
  succ,
  error,
  getOut
} from "../../../assets/js/message.js";
export default {
  name: "jibenleibie",
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
      doEdit: true,
      doSave: true,
      doImport: false,
      doExport: false,
      doEffective: false,
      doInvalid: false,
      doOut: false,
      doCancel: true,
      doSave: true,
      doDelete: true,
      oldMenu: false,

      gui: true,
      addAgain: true,

      //分页：当前页码/总数量/每页显示条数
      page: 0,
      total: "",
      pageSize: 10,
      pageOnOff: false,

      //保存时候是新增还是修改状态 新增true/修改false
      addEdit: true,

      //分页查询第一第二级时候的参数
      pageParams: "",
      navMenus: [],
      list: [],
      //新增表单
      form: {
        id: "",
        pidSn: "", //类别标号
        pidName: "", //类别名称
        name: "", //名称
        sn: "", //编号
        sort: "", //排序
        jc: "", //简称
        status: "3"
      },
      menuSearch: false,
      //查询框选择级别开关  1、2true/3false
      howLevel: true,
      //查询框内容
      search: {
        searchName: "",
        searchsnCh: ""
      },
      //编辑弹窗开关
      editVisible: false,
      idx: 0,
      //编辑弹出框数据
      forms: {},
      dialog: {}
    };
  },
  mounted() {
    this.getnavMenu();
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
    },
    //自定义上传
    uploadFile(params) {
      this.importZhe = true;
      const _file = params.file;
      let formData = new FormData();
      formData.append("file", _file);
      this.$ajax
        .post("/TPA/aLbJb/importExcel", formData)
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
      window.location.href = "/TPA/aLbJb/exportExcel";
    },

    //刷新
    refresh() {
      this.emptyBtn();
      this.emptyform();
      this.getnavMenu();
      succ("刷新成功");
      this.list = [];
    },
    //编辑单条数据
    handleEdit(index, row) {
      this.idx = index;
      const item = this.list[index];
      this.forms = item;
      let name = item.name;
      let sort = item.sort;
      let sn = item.sn;
      let jc = item.jc;
      this.dialog = {
        name: name,
        sn: sn,
        jc: jc,
        sort: sort
      };
      this.editVisible = true;
    },
    //新增
    doAdds() {
      this.emptyBtnTo();
      this.emptyform();
      this.doSave = false;
      this.addEdit = true;
      this.gui = false;
      this.addAgain = false;
    },
    //修改
    doEdits() {
      this.emptyBtnTo();
      this.addEdit = false;
      this.doSave = false;
    },
    //保存
    addSave() {
      this.oldMenu = false;
      if (this.form.name.length === 0) {
        error("名称不能为空");
      } else if (this.form.jc.length === 0) {
        error("编号不能为空");
      } else {
        if (this.form.sort.length === 0) {
          this.form.sort = 0;
        }
        if (this.addEdit) {
          this.$http
            .post("/TPA/aLbJb/insert", qs.stringify(this.form))
            .then(res => {
              if (res.data.code === 0) {
                succ(res.data.msg);
                this.getnavMenu();
                this.emptyBtnTo();
                this.form = {};
                this.form.pidSn = res.data.data.pidSn;
                this.form.pidName = res.data.data.pidName;
                this.form.sort = "";
                this.form.status = "3";
                this.doAdd = false;
                this.doSave = false;

                let params = {
                  pidSn: this.form.pidSn,
                  page: 0,
                  count: this.pageSize
                };
                this.pageParams = params;
                if (this.pageParams.pidSn.length === 0) {
                  this.pageParams.pidSn = -1;
                }
                console.log(this.pageParams);
                this.$http
                  .post("/TPA/aLbJb/search", qs.stringify(this.pageParams))
                  .then(res => {
                    if (res.data.code === 0) {
                      this.list = res.data.data.list;
                      this.total = res.data.data.total;
                      if (this.total > this.pageSize) {
                        this.pageOnOff = true;
                      }
                    } else {
                      error(res.data.msg);
                    }
                  })
                  .catch(err => {
                    abnormal();
                  });
              } else {
                error(res.data.msg);
              }
            })
            .catch(err => {
              NetworkAnomaly();
            });
        } else {
          this.$http
            .post("/TPA/aLbJb/update", qs.stringify(this.form))
            .then(res => {
              succ(res.data.msg);
              this.getnavMenu();
              this.emptyBtnTo();
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
              console.log(this.form);
              this.doAdd = false;
              this.doEdit = false;
            })
            .catch(err => {
              NetworkAnomaly();
            });
        }
      }
    },
    //有效
    doEffectives() {
      let params = {
        id: this.form.id,
        status: "1"
      };
      this.$http
        .post("/TPA/aLbJb/status", qs.stringify(params))
        .then(res => {
          if (res.data.code === 0) {
            this.form.status = params.status;
            this.emptyBtnTo();
            this.doEdit = false;
            this.doDelete = false;
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
        .post("/TPA/aLbJb/status", qs.stringify(params))
        .then(res => {
          if (res.data.code === 0) {
            this.form.status = params.status;
            this.emptyBtnTo();
            this.doEdit = false;
            this.doDelete = false;
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
        .post("/TPA/aLbJb/delete?id=" + this.form.id)
        .then(res => {
          if (res.data.code === 0) {
            succ(res.data.msg);
            this.getnavMenu();
            this.emptyBtn();
            this.emptyform();
          } else {
            error(res.data.msg);
          }
        })
        .catch(err => {
          NetworkAnomaly();
        });
    },
    //退出
    doOuts() {
      this.$emit("getOut", this.$route.name);
    },
    //取消
    doCancels() {
      this.emptyBtn();
      this.emptyform();
      this.emptyforms();
      this.doSave = true;
      this.pageOnOff = false;
      this.form.status = "3";
      //   this.emptyform();
    },
    //关闭弹出框
    close_box() {
      this.oldMenu = false;
    },
    //打开弹出框
    open_box() {
      this.oldMenu = true;
    },
    //选择弹出框上级菜单
    getOldMenu(item) {
      this.form.pidSn = item.entity.sn;
      this.form.pidName = item.entity.name;
      console.log(this.form);
      this.oldMenu = false;
    },

    //获取nav
    getnavMenu() {
      this.$http
        .post("/TPA/aLbJb/tree")
        .then(res => {
          console.log(res);

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
    //选择当前导航
    menuSelected(index) {
      this.pageOnOff = false;
      this.doSave = true;
      this.doAdd = false;
      this.addAgain = true;
      this.oldMenu = false;
      let data = index.split(",");
      let params = {
        pidSn: data[0],
        page: 0,
        count: this.pageSize
      };
      this.pageParams = params;
      console.log(this.pageParams);
      this.$http
        .post("/TPA/aLbJb/search", qs.stringify(params))
        .then(res => {
          if (res.data.code === 0) {
            this.list = res.data.data.list;
            this.total = res.data.data.total;
            if (this.total > this.pageSize) {
              this.pageOnOff = true;
            }
            this.emptyBtnTo();
            this.doEdit = false;
            this.doAdd = false;
          } else {
            error(res.data.msg);
          }
        })
        .catch(err => {
          abnormal();
        });

      //查询自身
      this.$http
        .post("/TPA/aLbJb/get?id=" + data[1])
        .then(res => {
          if (res.data.code === 0) {
            this.form = res.data.data;
            this.doDelete = false;
          } else {
            error(res.data.msg);
          }
        })
        .catch(err => {
          abnormal();
        });
    },
    //按钮初始状态
    emptyBtn() {
      this.doAdd = false;
      this.doEdit = true;
      this.doSave = true;
      this.doImport = false;
      this.doExport = false;
      this.doEffective = false;
      this.doInvalid = false;
      this.doCancel = true;
      this.doDelete = true;

      this.gui = true;
      this.addAgain = true;
      this.oldMenu = false;
    },
    //btn按钮按下之后按钮的状态
    emptyBtnTo() {
      this.doAdd = true;
      this.doEdit = true;
      this.doSave = true;
      this.doImport = true;
      this.doExport = true;
      this.doEffective = true;
      this.doInvalid = true;
      this.doCancel = false;

      this.gui = true;

      this.oldMenu = false;
    },
    //表单恢复初始空值状态
    emptyform() {
      this.onOffform = true;
      this.form = {
        id: "",
        pidSn: "", //尺码类别标号
        pidName: "", //尺码类别名称
        name: "", //尺码名称
        sn: "", //尺码编号
        sort: "", //排序
        jc: "", //简称
        status: "3", //状态
        addDate: "", //编制日期
        zdRen: "", //编制人
        updateDate: "", //修改日期
        updateUser: "" //修改人
      };
      this.list = [];
    },
    //清空编辑弹出框数据
    emptyforms() {
      this.forms = {};
    },
    // 保存编辑
    saveEdit() {
      this.forms.name = this.dialog.name;
      this.forms.sort = this.dialog.sort;
      this.forms.sn = this.dialog.sn;
      this.forms.jc = this.dialog.jc;
      if (this.forms.sort.length === 0) {
        this.forms.sort = 0;
      }

      this.$http
        .post("/TPA/aLbJb/update", qs.stringify(this.forms))
        .then(res => {
          if (res.data.code === 0) {
            succ(res.data.msg);
            this.getnavMenu();
            this.editVisible = false;
            this.$set(this.list, this.idx, this.forms);
            this.$http
              .post("/TPA/aLbJb/search", qs.stringify(this.pageParams))
              .then(res => {
                if (res.data.code === 0) {
                  this.list = res.data.data.list;
                  this.total = res.data.data.total;
                  if (this.total > this.pageSize) {
                    this.pageOnOff = true;
                  }
                  this.emptyBtnTo();
                  this.doEdit = false;
                  this.doAdd = false;
                } else {
                  error(res.data.msg);
                }
              })
              .catch(err => {
                abnormal();
              });
          } else {
            error(res.data.msg);
          }
        })
        .catch(err => {
          NetworkAnomaly();
        });
    },
    //有效
    effective(index, row) {
      this.idx = index;
      const item = this.list[index];
      this.forms = item;
      this.forms.status = 1;
      this.$http
        .post("/TPA/aLbJb/status", qs.stringify(this.forms))
        .then(res => {
          if (res.data.code === 0) {
            succ(res.data.msg);
            this.$set(this.list, this.idx, this.forms);
          } else {
            error(res.data.msg);
          }
        })
        .catch(err => {
          NetworkAnomaly();
        });
    },
    //无效
    invalid(index, row) {
      this.idx = index;
      const item = this.list[index];
      this.forms = item;
      this.forms.status = 0;
      this.$http
        .post("/TPA/aLbJb/status", qs.stringify(this.forms))
        .then(res => {
          if (res.status == 200 && res.data.code === 0) {
            succ(res.data.msg);
            this.$set(this.list, this.idx, this.forms);
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
      console.log(this.page);
    }
  },
  watch: {
    page() {
      this.pageParams.page = this.page - 1;
      this.$http
        .post("/TPA/aLbJb/search", qs.stringify(this.pageParams))
        .then(res => {
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
.container>>>th, .order_table>>>.el-table td, .el-table th
  padding 0
.container>>>.el-table .cell
  height 4vh
  line-height 4vh
  text-align center
  font-size 1.6vh
.container>>>.el-table__empty-block
  min-height 3.5vh
.container>>>.el-dialog
  width 400px
  height 400px
  overflow-x hidden
.container>>>.el-dialog__body
  cursor pointer !important
  line-height 2.5vh
  font-weight bold
  padding 1vh 2vh
.menu_box
  width 12%
.set_info
  width 88%
.searchBox
  height 3vh
  margin-left 50px
  width 300px
  float left
  position relative
  input
    width 200px
    height 3vh
    line-height 3vh
    float left
    margin-top 3px
    padding-left 1vh
    border 0.1vh solid #d2d2d2
    border-radius 0.4vh
  button
    padding 0 2.5vh
    height 3vh
    line-height 3vh
    background #ffffff
    font-size 1.2vh
    display block
    text-align center
    margin-left 1vh
    text-decoration underline
    cursor pointer
    border-radius 0.4vh
  .searchList
    width 200px
    height 300px
    border 0.1vh solid #d2d2d2
    position absolute
    top 3.5vh
    left 0
    z-index 999
    background #ffffff
    overflow-x hidden
    .second
      margin-left 2em
      p
        cursor pointer
    .searchFirst
      font-weight 1000
      color #444
      font-size 1.5vh
      cursor pointer
      display block
      width 100%
      line-height 2.5vh
      padding 0 1vh
  .searchSecond
    padding-left 2em
    cursor pointer
    line-height 2.5vh
    height 2.5vh
    display block
    font-weight 600
    font-size 1.4vh
  .searchThird
    padding-left 4em
    cursor pointer
    line-height 2.5vh
    height 2.5vh
    font-size 13px
    display block
    font-weight 400
.info_form
  width 100%
  li
    padding 0 2vh 0 0
    height 3.5vh
    margin 1vh 0
    float left
    width 30%
    &.menuLi
      width 40%
      .first
        width 20%
      input
        width 40%
        float left
    label
      padding 0 1vh
      float left
      line-height 3.5vh
      width 20%
    input
      height 3.5vh
      line-height 3.5vh
      border 0.1vh solid #d2d2d2
      outline none
      margin-left 0.5vh
      padding-left 1vh
      width 75%
      float left
      overflow hidden
    button
      width 50px
      height 3.5vh
      border 0.1vh solid #d2d2d2
      background none
      margin-left 0.5vh
      line-height 3.5vh
      text-align center
      border-radius 0.5vh
      cursor pointer
  .save
    padding 0 2vh
    height 4vh
    line-height 4vh
    border 0.1vh solid #d9d9d9
    background #ffffff
    margin 0.5vh
    font-size 1.2vh
    display block
    float left
    text-align center
    text-decoration underline
    cursor pointer
    border-radius 0.4vh
    &.button_btn
      border 0.1vh solid #409EFF
      font-weight bold
      color #409EFF
      color #409EFF
.order_table
  width 99%
  margin 0.5vh auto 0
  max-height 550px
  border 0.1vh solid #d9d9d9
  overflow hidden
  .el-button
    padding 0.6vh 1vh
    margin-top 0.4vh
    border 0.1vh solid #409eff
    color #409eff
    font-size 1.6vh
    &.btn
      border 0.1vh solid #d2d2d2
      color #d2d2d2
</style>