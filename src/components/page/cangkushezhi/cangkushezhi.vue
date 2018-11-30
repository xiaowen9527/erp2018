<template>
    <div class="container" :class="{container_collapse:collapse}">
        <!-- 页面标题 -->
        <p class="page_title">仓库设置</p>

        <!-- 顶部操作按钮 -->
        <div class="btn-box">
            <button :class="{button_btn:!doAdd}" :disabled="doAdd" @click="doAdds">新增</button>   
            <button :class="{button_btn:!doCancel}" :disabled="doCancel" @click="doCancels">取消</button>   
            <button :class="{button_btn:!doEdit}" :disabled="doEdit" @click="doEdits">修改</button>   
            <button :class="{button_btn:!doImport}" :disabled="doImport" @click="doImports">导入</button>   
            <button :class="{button_btn:!doImport}" :disabled="doImport" @click="importCancel">导出</button>   
            <button class="button_btn">查询</button>   
            <input type="text"  class="doSearch"  readonly placeholder="请选择">
            <button class="button_btn" @click="doOuts">退出</button>   
        </div>

        <div class="set_box">

            <div class="menu_box">
                <!-- <el-menu unique-opened background-color="#f2f2f2" text-color="#303133" active-text-color="#303133">
                    <nav-menu :navMenus="this.navMenus"></nav-menu>
                </el-menu> -->
            </div>

            <div class="set_info">
                <div class="firstForm">
                    <ul class="clearfix">
                        <li class="gui">
                            <label>公司</label>
                            <input type="text" placeholder="顶级" v-model="firstForm.typeSn" readonly :disabled="firstFormGui" class="gui_num">
                            <input type="text" placeholder="顶级" v-model="firstForm.type" readonly :disabled="firstFormGui">
                            <button :disabled="firstFormGui" :class="{btn:!firstFormGui}">。。。</button>
                        </li>
                        <li class="gui">
                            <label>仓库</label>
                            <input type="text" placeholder="顶级" v-model="firstForm.typeSn" readonly :disabled="firstFormOn" class="gui_num">
                            <input type="text" placeholder="顶级" v-model="firstForm.type" readonly :disabled="firstFormOn">
                        </li>
                        <li>
                            <label>库区</label>
                            <input type="text"  :disabled="firstFormOn" v-model="firstForm.sn">
                        </li>
                        <li>
                            <label>库位</label>
                            <input type="text"  :disabled="firstFormOn" v-model="firstForm.sn">
                        </li>
                        <li>
                            <label>列起</label>
                            <input type="text"  :disabled="firstFormOn" v-model="firstForm.sn">
                        </li>
                        <li>
                            <label>止</label>
                            <input type="text"  :disabled="firstFormOn" v-model="firstForm.sn">
                        </li>
                        <li>
                            <label>排起</label>
                            <input type="text"  :disabled="firstFormOn" v-model="firstForm.sn">
                        </li>
                        <li>
                            <label>止</label>
                            <input type="text"  :disabled="firstFormOn" v-model="firstForm.sn">
                        </li>
                        <li>
                            <label>层起</label>
                            <input type="text"  :disabled="firstFormOn" v-model="firstForm.sn">
                        </li>
                        <li>
                            <label>止</label>
                            <input type="text"  :disabled="firstFormOn" v-model="firstForm.sn">
                        </li>
                        <button :disabled="firstFormOn" :class="{btn:!firstFormOn}"  class="save">保存</button>                        
                    </ul>
                </div>

                <!-- 表格内容 -->
                <div class="order_table">
                    <el-table :data="list" stripe style="width: 100%">
                        <el-table-column prop="activeDate" label="仓库" min-width="12%">
                        </el-table-column>
                        <el-table-column prop="activeDate" label="库区" min-width="12%">
                        </el-table-column>
                        <el-table-column prop="activeDate" label="库位" min-width="8%">
                        </el-table-column>
                        <el-table-column prop="activeDate" label="列起数" min-width="8%">
                        </el-table-column>
                        <el-table-column prop="activeDate" label="列止数" min-width="8%">
                        </el-table-column>
                        <el-table-column prop="activeDate" label="行起数" min-width="8%">
                        </el-table-column>
                        <el-table-column prop="activeDate" label="行止数" min-width="8%">
                        </el-table-column>
                        <el-table-column prop="activeDate" label="层起数" min-width="8%">
                        </el-table-column>
                        <el-table-column prop="activeDate" label="层止数" min-width="8%">
                        </el-table-column>
                        <el-table-column fixed="right" label="操作" min-width="20%">
                            <template slot-scope="scope">
                                <el-button class="btn">修改</el-button>
                                <el-button class="btn">删除</el-button>
                                <el-button class="btn">已审</el-button>
                                <el-button class="btn">未审</el-button>
                            </template>
                        </el-table-column>
                    </el-table>
                </div>                
            </div>

        </div>
        <div class="pageBox" :class="{collapse:collapse}">
            <ul class="pageData">
                <!-- <li>
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
                </li> -->
            </ul>
            <el-pagination v-if="pageOnOff" background :page-size="pageSize" :pager-count="5" :total="total" @current-change="currentPage">
            </el-pagination>
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
  name: "cangkushezhi",
  data() {
    return {
      //按钮disabled
      doAdd: false,
      doCancel: true,
      doImport: false,
      doEdit: true,

      //form的disabled
      firstFormNo: true,
      firstFormOn: true,
      firstFormGui: true,

      oldSearch: false,
      oldSearchList: [],

      firstForm: {},
      list: [],

      //分页：当前页码/总数量/每页显示条数
      page: 0,
      total: "",
      pageSize: 10,
      pageOnOff: false,
      //分页排序查询条件
      pageParams: {},

      //导入弹出开关
      importbox: false,
      importZhe: false, //导入遮罩
      isCover: false, //默认导入不覆盖
      project: "", //错误文件名
      //上传的文件
      fileList: [],
      Tips: "", //错误提示
      tipOffON: false //错误文件下载开关

    };
  },
  methods: {
    //按钮初始化
    emptyBtn() {
      this.doAdd = false;
      this.doCancel = true;
      this.doImport = false;
      this.doEdit = true;
    },
    //按钮按下状态
    emptyBtnTo() {
      this.doAdd = true;
      this.doCancel = false;
      this.doImport = true;
      this.doEdit = true;
    },
    //表单1恢复初始空值状态
    emptyFirstForm() {
      this.firstForm = {};
    },
    //禁用表单first
    disabledFirstForm() {
      this.firstFormNo = true;
      this.firstFormOn = true;
      this.firstFormGui = true;
    },
    //开放表单first
    noDisabledFirstForm() {
      this.firstFormNo = true;
      this.firstFormOn = false;
      this.firstFormGui = false;
    },

    //新增
    doAdds() {
        this.doCancels()
        this.emptyBtnTo()
        this.noDisabledFirstForm()
    },
    //取消
    doCancels() {
        this.emptyBtn()
        this.emptyFirstForm()
        this.disabledFirstForm()

    },
    //修改
    doEdits() {},
    //点击查询按钮
    doSearchs() {},
    //刷新
    refresh() {
      this.getnavMenu();
      this.doCancels();
      succ("刷新成功");
    },
    //退出
    doOuts() {
      this.$emit("getOut", this.$route.name);
    },












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
        .post("/TPA/cSpecification/importExcel", formData)
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
      window.location.href = "/TPA/cSpecification/exportExcel";
    },
    

    //获取页码
    currentPage(val) {
      this.page = val;
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
@import './css/style.styl';
</style>

