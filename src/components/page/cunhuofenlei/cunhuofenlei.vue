<template>
    <div class="container" :class="{container_collapse:collapse}">
        <p class="page_title">存货分类</p>
        <div class="btn-box">
            <button :disabled='doAdd' :class="{button_btn:!doAdd}" @click="doAdds">新增</button>
            
            <button :disabled='doEdit' :class="{button_btn:!doEdit}" @click="doEdits">修改</button>
            <button :disabled='doImport' :class="{button_btn:!doImport}" @click="doImports">导入</button>
            <button :disabled='doExport' :class="{button_btn:!doExport}" @click="doExports">导出</button>
            <button :disabled='(this.form.status==1||this.form.status==3)' :class="{button_btn:(this.form.status==0)}" @click="doEffectives">有效</button>
            <button :disabled='(this.form.status==0||this.form.status==3)' :class="{button_btn:(this.form.status==1)}" @click="doInvalids">无效</button>
            <button :disabled='doDelete' :class="{button_btn:!doDelete}" @click="doDeletes">删除</button>

            <button :disabled='doGetOut' :class="{button_btn:!doGetOut}" @click="loginout">退出</button>
            <button :disabled='doCancel' :class="{button_btn:!doCancel}" @click="Out">取消</button>
            <button  class="button_btn" @click="refresh">刷新</button>
        </div>
        <div class="set_box">
            <div class="menu_box">
                <el-menu unique-opened @select="menuSelected" @open="menuSelected" background-color="#f2f2f2" text-color="#303133" active-text-color="#303133">
                    <nav-menu :navMenus="this.navMenus"></nav-menu>
                </el-menu>
            </div>
            <div class="set_info">
                <div class="info_form">
                    <ul>
                        <li class="menuLi">
                            <label>上级</label>
                            <input v-model="form.pidSn" type="text" class="menuLiNum" readonly :disabled='menuBtn' placeholder="顶级" @click="open_box">
                            <input v-model="form.pidName" type="text" readonly :disabled='menuBtn' placeholder="顶级" @click="open_box">
                            <button :disabled='menuBtn' @click="open_box">。。。</button>
                        </li>
                        <li>
                            <label>编号</label>
                            <input v-model="form.sn" type="text" class="menuNum" disabled placeholder="自动生成">
                        </li>
                        <li>
                            <label>类别名称</label>
                            <input v-model="form.name" type="text" :disabled="menuClass">
                        </li>
                        <li>
                            <label>来源编码</label>
                            <input v-model="form.checkCode" type="text" :disabled="menuSort">
                        </li>
                        <li>
                            <label>简称</label>
                            <input v-model="form.jc" type="text" :disabled="menuSort">
                        </li>
                        <li>
                            <label>接出编码</label>
                            <input v-model="form.thirdPartySn" type="text" :disabled="menuSort">
                        </li>
                        <li>
                            <label>排序</label>
                            <input v-model="form.sort" type="number" class="menuSort"  placeholder="排序" :disabled='menuSort'>
                        </li>
                            <button class="save" @click="AddSave" :disabled='doSave' :class="{button_btn:!doSave}">保存</button>
                    </ul>
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
        <el-dialog title="上级" :visible.sync="oldMenu">
            <ul class="srcond_menu">
                <li v-if="navMenus.length===0">暂无数据</li>
                <li v-for="(item,i) in navMenus" :key="i">
                    <span @click="getDepartmentName(item)">|--{{item.entity.name}}</span>
                    <div class="second" v-for="(items,i) in item.childs" :key="i">
                        <p @click="getDepartmentName(items)">|--{{items.entity.name}}</p>
                        <div class="second" v-for="(itemss,i) in items.childs" :key="i">
                            <p @click="getDepartmentName(itemss)">|--{{itemss.entity.name}}</p>
                            <div class="second" v-for="(itemsss,i) in itemss.childs" :key="i">
                                <p @click="getDepartmentName(itemsss)">|--{{itemsss.entity.name}}</p>
                                <div class="second" v-for="(itemssss,i) in itemsss.childs" :key="i">
                                    <p @click="getDepartmentName(itemssss)">|--{{itemssss.entity.name}}</p>
                                    <div class="second" v-for="(itemsssss,i) in itemssss.childs" :key="i">
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
        <el-dialog class="importExport" title="导入" :visible.sync="importbox" width="30%" :showClose="false" :show-file-list="false">
            <a class="down" href="/TPA/aLbCh/downExcel">下载导入模板</a>
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
import '@/assets/js/import.js' //导入请求超时拦截
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
  name: "cunhuofenlei",
  data() {
    return {
        //导入弹出开关
        importbox: false,
        importZhe: false, //导入遮罩
        isCover:false,      //默认导入不覆盖
        project:"",         //错误文件名
        //上传的文件
        fileList: [],
        Tips:"",               //错误提示
        tipOffON: false,        //错误文件下载开关

      //选取的当前菜单的index
      selectMenu: "",

      //按钮开关
      doAdd: false,
      doEdit: true,
      doImport: false,
      doExport: false,
      doGetOut: false,
      doCancel: true,
      doSave: true,
      doDelete: true,

      //form onoff
      menuBtn: true,
      menuClass: true,
      menuSort: true,

      //保存时候是新增还是修改状态 新增true/修改false
      addEdit: true,

      //分页查询
      pageParams: {},

      //上级菜单弹出窗开关
      oldMenu: false,

      //导航
      navMenus: [],
      //分页：当前页码/总数量/每页显示条数
      page: 0,
      total: "",
      pageSize: 2,
      pageOnOff: false,

      //编辑弹窗开关
      editVisible: false,
      idx: 0,
      //新增form
      form: {
        id: "",
        name: "",
        pidSn: "",
        pidName: "",
        sort: "",
        checkCode:"",           //检码
        jc:"",                  //简称
        thirdPartySn:"",        //第三方编号
        sn: "",
        status: "3"
      },
      //编辑的单条数据
     
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
                    .post("/TPA/aLbCh/importExcel", formData)
                    .then(res => {
                        console.log(res);
                        if (res.status === 200) {
                            if (res.data.code === 0) {
                                succ(res.data.msg);
                                this.getnavMenu();
                                this.importCancel();
                                this.$refs.upload.clearFiles();
                            }else if(res.data.code === 100){
                                this.tipOffON = true;
                                this.project = res.data.attachment.name
                                this.Tips = res.data.msg
                            }else{
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
            let errUrl = '/TPA/aImportExcel/exportMsg?name=' + this.project
            // console.log(errUrl)
            window.location.href = errUrl;
            setTimeout(()=>{
                this.tipOffON = false;
                this.importCancel();
            },500)
        },        
        //导出
        doExports() {
            window.location.href = "/TPA/aLbCh/exportExcel";
        },
        
    
    //刷新
    refresh(){
        
        this.emptyBtn()
        this.emptyform()
        this.disabledform()
        this.getnavMenu()
        succ('刷新成功')
    },      
    //保存
    AddSave() {
      this.oldMenu = false;
      if(this.form.jc.length === 0){
        error("简称不能为空！");
        this.form.jc = ""
      }else if (this.form.name.length === 0) {
        error("类别名称不能为空！");
        this.form.name = ""
      }else {
          if(this.form.sort.length===0){
              this.form.sort = 0
          }
        if (this.addEdit) {
          this.$http
            .post("/TPA/aLbCh/insert/", qs.stringify(this.form))
            .then(res => {
              if (res.data.code === 0) {
                  console.log(res)
                succ(res.data.msg);
                this.form = res.data.data;
                this.getnavMenu();
                this.emptyBtnTo();
                this.doEdit = false;
                this.doDelete = false;
                this.menuBtn = true
                this.form.name = ""
                this.form.sort = ""
                this.form.checkCode = ""
                this.form.jc = ""
                this.form.thirdPartySn = ""
                this.form.sn = ""
                this.form.status = "3"
                this.doAdd = false
              } else {
                error(res.data.msg);
              }
            })
            .catch(error => {
              NetworkAnomaly();
            });
        } else {
          this.$http
            .post("/TPA/aLbCh/update/", qs.stringify(this.form))
            .then(res => {
              if (res.data.code === 0) {
                succ(res.data.msg);
                let status = this.form.status;
                let addUser = this.form.addUser
                let addDate = this.form.addDate
                let sn = this.form.sn
                let name = this.form.name
                this.form = res.data.data;
                this.form.status = status;
                this.form.addUser = addUser
                this.form.addDate = addDate
                this.form.sn = sn
                this.form.name = name
                this.getnavMenu();
                this.emptyBtnTo();
                this.disabledform();
                this.doEdit = false;
                this.doAdd = false
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
    //关闭弹出框
    close_box() {
      this.oldMenu = false;
    },
    //打开弹出框
    open_box() {
      this.oldMenu = true;
    },
    //退出
    loginout() {
      this.$emit("getOut", this.$route.name);
    },
    //新增
    doAdds() {
      this.emptyBtnTo();
      this.addEdit = true;
      this.doCancel = false;
      this.menuBtn = false;
      this.menuClass = false;
      this.menuSort = false;
      this.doSave = false;
      this.emptyform();
    },
    //修改
    doEdits() {
      this.emptyBtnTo();
      this.addEdit = false;
      this.doCancel = false;
      this.menuClass = true;
      this.menuSort = false;
      this.doDelete = false;
      this.doSave = false;
      this.doAdd = false
    },
    //取消
    Out() {
      this.emptyBtn();
      this.emptyform();
      this.emptyforms();
      this.disabledform();
      this.page = 0;
      this.pageOnOff = false;
      this.forms = {};
      this.form = {};
      this.form.status = "3";
      
    },

    //有效
    doEffectives() {
      let params = {
        id: this.form.id,
        status: "1"
      };
      this.$http
        .post("/TPA/aLbCh/status/", qs.stringify(params))
        .then(res => {
          if (res.data.code === 0) {
            this.form.status = params.status;
            this.emptyBtnTo();
            this.doEdit = false;
            this.doDelete = false;
            this.doAdd = false
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
        .post("/TPA/aLbCh/status", qs.stringify(params))
        .then(res => {
          if (res.data.code === 0) {
            this.form.status = params.status;
            this.emptyBtnTo();
            this.doEdit = false;
            this.doDelete = false;
            this.doAdd = false
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
        .post("/TPA/aLbCh/delete/?id=" + this.form.id)
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
    //获取全部菜单
    getnavMenu() {
      this.$http
        .post("/TPA/aLbCh/tree/")
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
    //选择当前导航
    menuSelected(index) {
      this.pageOnOff = false;
      this.oldMenu = false;
      this.disabledform();
      let data = index.split(",");   
      //查询自身
      this.$http
        .post("/TPA/aLbCh/get/?id=" + data[1])
        .then(res => {
          if (res.data.code === 0) {
            this.form = res.data.data;
            this.doDelete = false;
            this.doImport = true;
            this.doExport = true;
            this.doCancel = false;
            this.doEdit = false; 
            this.doAdd = false           
            console.log(this.form);
          } else {
            error(res.data.msg);
          }
        })
        .catch(err => {
          abnormal();
        });
    },
    //点击选择上级
    getDepartmentName(item) {
      this.form.pidSn = item.entity.sn;
      this.form.pidName = item.entity.name;
      this.oldMenu = false;
    },
    //按钮初始化
    emptyBtn() {
      this.doAdd = false;
      this.doImport = false;
      this.doExport = false;
      this.doCancel = true;
      this.doSave = true;
      this.doEdit = true;
      this.doDelete = true;

      this.oldMenu = false;
    },
    //按钮按下
    emptyBtnTo() {
      this.doAdd = true;
      this.doEdit = true;
      this.doImport = true;
      this.doExport = true;
      this.doCancel = false;
      this.doDelete = true;

      this.oldMenu = false;
    },
    //表单恢复初始空值状态
    emptyform() {
      this.form = {
        id: "",
        name: "",
        pidSn: "",
        pidName: "",
        sort: "",
        checkCode:"",           //检码
        jc:"",                  //简称
        thirdPartySn:"",        //第三方编号
        sn: "",
        status: "3"
      }
    },
    //清空编辑弹出框数据
    emptyforms() {
      this.forms = {};
    },
    //禁用表单
    disabledform() {
      this.menuBtn = true;
      this.menuClass = true;
      this.menuSort = true;
      this.doSave = true;
    },
    
  },
  watch: {
    tipOffON(){
        if(this.tipOffON === false){
            console.log(0);
        }
    },
    importbox(){
        if(this.importbox===false){
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
    width 20%
.set_info
    width 80%
.searchBox
    height 3vh
    margin-left 5vh
    width 300px
    float left
    position relative
    input
        width 20vh
        height 3vh
        line-height 3vh
        float left
        margin-top 3px
        padding-left 1vh
        border .1vh solid #d2d2d2
        border-radius .4vh
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
        border-radius .4vh
    .searchList
        width 20vh
        height 300px
        border .1vh solid #d2d2d2
        position absolute
        top 3.5vh
        left 0
        z-index 999
        background #ffffff
        overflow-x hidden
.second
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
.order_table
    width 100%
    margin-top .5vh
    max-height 55vh
    border .1vh solid #d9d9d9
    overflow scroll
    overflow-x hidden
    .el-button
        padding .8vh 2vh
        margin-top .4vh
        border .1vh solid #409eff
        color #409eff
        &.btn
            border .1vh solid #d2d2d2
            color #d2d2d2
.info_form
    width 100%
    li
        padding 0 2vh 0 0
        height 3.5vh
        margin 1vh 0
        float left
        &.menuLi
            width 100%
        input
            height 3.5vh
            line-height 3.5vh
            border .1vh solid #d2d2d2
            outline none
            margin-left .5vh
            padding-left 1vh
            width 20vh
            float left
            overflow hidden
            &.menuLiNum
                width 10vh
            &.menuNum
                width 12vh
            &.menuSort
                width 9vh
        button
            width 5vh
            height 3.5vh
            border .1vh solid #d2d2d2
            background none
            margin-left .5vh
            line-height 3.5vh
            text-align center
            border-radius .5vh
            cursor pointer
        label
            padding 0 1vh
            float left
            line-height 3.5vh
            width 11vh
    .save
        padding 0 2vh
        height 4vh
        line-height 4vh
        border .1vh solid #d9d9d9
        background #ffffff
        margin .5vh
        font-size 1.2vh
        display block
        float left
        text-align center
        text-decoration underline
        cursor pointer
        border-radius .4vh
        &.button_btn
            border .1vh solid #409EFF
            font-weight bold
            color #409EFF

</style>
