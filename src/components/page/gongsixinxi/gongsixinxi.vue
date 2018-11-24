<template>
    <div class="container" :class="{container_collapse:collapse}">
        <p class="page_title">公司信息</p>
        <div class="btn-box">
            <button :disabled="doAdd" :class="{button_btn:!doAdd}" @click="doAdds">新增</button>
            <button :disabled="doSave" :class="{button_btn:!doSave}" @click="doSaves">保存</button>
            <button :disabled="doEdit" :class="{button_btn:!doEdit}" @click="doEdits">修改</button>
            <button :disabled="doOut" :class="{button_btn:!doOut}" @click="doOuts">退出</button>
            <button :disabled="doCancel" :class="{button_btn:!doCancel}" @click="doCancels">取消</button>
            <button  class="button_btn" @click="refresh">刷新</button>
            <div class="btn_right">
                <button :disabled="doImport" :class="{button_btn:!doImport}" @click="doImports">导入</button>
                <button :disabled="doExport" :class="{button_btn:!doExport}" @click="doExports">导出</button>
                <button :disabled="(this.form.status==1||this.form.status==3)" :class="{button_btn:(this.form.status==0)}" @click="doEffectives">有效</button>
                <button :disabled="(this.form.status==0||this.form.status==3)" :class="{button_btn:(this.form.status==1)}" @click="doInvalids">无效</button>
                <button :disabled="doDelete" :class="{button_btn:!doDelete}" @click="doDeletes">删除</button>
            </div>
        </div>
        <div class="set_box">
            <div class="menu_box">
                <el-menu @select="menuSelected" unique-opened @open="menuSelected" background-color="#f2f2f2" text-color="#303133" active-text-color="#303133">
                    <nav-menu :navMenus="this.navMenus"></nav-menu>
                </el-menu>
            </div>
            <div class="set_info">
                <ul>
                    <li>
                        <label>编号</label>
                        <i>*</i>
                        <input type="text" v-model="form.sn" :disabled="formNo">
                    </li>
                    <li>
                        <label>公司名称</label>
                        <i>*</i>
                        <input type="text" v-model="form.name" :disabled="formNo">
                    </li>
                    <li>
                        <label>级别</label>
                        <i>*</i>
                        <input type="text" v-model="form.level" :disabled="formOnOff">
                    </li>
                    <li>
                        <label>类别</label>
                        <i>*</i>
                        <input type="text" v-model="form.type" :disabled="formOnOff" @click="handleType" readonly placeholder="请选择">
                    </li>
                    <li>
                        <label>地理区域</label>
                        <i>*</i>
                        <input type="text" v-model="form.qrDl" :disabled="formOnOff" @click="handleQrDl" readonly placeholder="请选择">
                    </li>
                    <li>
                        <label>纳税号</label>
                        <i>*</i>    
                        <input type="text" v-model="form.nsh" :disabled="formOnOff">
                    </li>
                    <li>
                        <label>公司性质</label>
                        <i>*</i>
                        <input type="text" v-model="form.nature" :disabled="formOnOff" @click="handleNature" readonly placeholder="请选择">
                    </li>                    
                    <li>
                        <label>联系人</label>
                        <input type="text" v-model="form.lxr" :disabled="formOnOff">
                    </li>
                    <li>
                        <label>传真</label>
                        <input type="text" v-model="form.fax" :disabled="formOnOff">
                    </li>
                    <li>
                        <label>电话</label>
                        <input type="text" v-model="form.tel" :disabled="formOnOff">
                    </li>
                    <li>
                        <label>网址</label>
                        <input type="text" v-model="form.wz" :disabled="formOnOff">
                    </li>

                    <li class="company">
                        <label class="companyLabel">归属公司</label>
                        <button :disabled="formNo" @click="open_box">。。。</button>
                        <input type="text" readonly class="companyName" v-model="form.pidName" :disabled="gui" placeholder="顶级">
                        <input type="text" readonly class="companyNum" v-model="form.pidSn" :disabled="gui" placeholder="顶级">
                    </li>
                    <li class="dz">
                        <label>地址</label>
                        <input type="text" v-model="form.dz" :disabled="formOnOff">
                    </li>
                    <li class="last">
                        <label>状态</label>
                        <el-radio label="1" v-model="form.status" :disabled="formZt">有效</el-radio>
                        <el-radio label="0" v-model="form.status" :disabled="formZt">无效</el-radio>
                    </li>
                </ul>
            </div>
        </div>
        <div class="pageBox" :class="{collapse:collapse}">
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
            <el-pagination v-if="page" background :page-size="pageSize" :pager-count="5" :total="total" @current-change="currentPage">
            </el-pagination>
        </div>

        <el-dialog title="归属公司" :visible.sync="oldMenu">
            <ul class="srcond_menu">
                <li v-if="navMenus.length===0">暂无数据</li>
                <li v-for="(item,i) in navMenus" :key="i">
                    <span @click="getCompanyName(item)">|--{{item.entity.name}}</span>
                    <div class="second" v-for="(items,i) in item.childs" :key="i">
                        <p @click="getCompanyName(items)">|--{{items.entity.name}}</p>
                        <div class="second" v-for="(itemss,i) in items.childs" :key="i">
                            <p @click="getCompanyName(itemss)">|--{{itemss.entity.name}}</p>
                            <div class="second" v-for="(itemsss,i) in itemss.childs" :key="i">
                                <p @click="getCompanyName(itemsss)">|--{{itemsss.entity.name}}</p>
                                <div class="second" v-for="(itemssss,i) in itemsss.childs" :key="i">
                                    <p @click="getCompanyName(itemssss)">|--{{itemssss.entity.name}}</p>
                                    <div class="second" v-for="(itemsssss,i) in itemssss.childs" :key="i">
                                        <p @click="getCompanyName(itemsssss)">|--{{itemsssss.entity.name}}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </li>
            </ul>
        </el-dialog>
        <el-dialog title="公司类别" :visible.sync="typeStatus">
            <ul class="srcond_menu">
                <li v-if="typeList.length===0">暂无数据</li>
                <li v-for="(item,i) in typeList" :key="i">
                    <span @click="getType(item)">{{item.name}}</span>
                </li>
            </ul>
        </el-dialog>
        <el-dialog title="公司性质" :visible.sync="natureStatus">
            <ul class="srcond_menu">
                <li v-if="NatureList.length===0">暂无数据</li>
                <li v-for="(item,i) in NatureList" :key="i">
                    <span @click="getNature(item)">{{item.name}}</span>
                </li>
            </ul>
        </el-dialog>
        <el-dialog title="公司区域" :visible.sync="qrdlStatus">
            <ul class="srcond_menu">
                <li v-if="QrdlList.length===0">暂无数据</li>
                <li v-for="(item,i) in QrdlList" :key="i">
                    <span @click="getQrDl(item)">{{item.name}}</span>
                </li>
            </ul>
        </el-dialog>

        <el-dialog class="importExport" title="导入" :visible.sync="importbox" width="30%" :showClose="false" :show-file-list="false">
            <a class="down" href="/TPA/aGsJbxx/downExcel">下载导入模板</a>
            <el-upload name="file" class="upload-demo" ref="upload" action="" :file-list="fileList" :http-request="uploadFile"  :auto-upload="false" accept=".xls,.xlsx,.csv">
                <el-button slot="trigger" size="small" type="primary" plain>选取文件</el-button>
                <div slot="tip" class="el-upload__tip">只能上传excel文件</div>
            </el-upload>
            <span slot="footer" class="dialog-footer">
                <el-button @click="importCancel">取 消</el-button>
                <el-button type="primary" @click="submitUpload" plain>确 定</el-button>
            </span>
        </el-dialog>        
        <el-dialog title="导入提示" :visible.sync="tipOffON">
            <ul class="srcond_menu">
                <li v-for="(item,i) in Tips" :key="i">
                    <span>{{item.msg}}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;第{{item.line}}行</span>
                </li>
                <span slot="footer" class="dialog-footer">
                    <el-button @click="tipOffON = importbox = false">取 消</el-button>
                    <el-button type="primary" @click="importFuGai" plain>覆盖</el-button>
                </span>
            </ul>
        </el-dialog>
        <div class="importZhe" v-if="importZhe" v-loading="true" element-loading-text="正在上传中..." element-loading-spinner="el-icon-loading" element-loading-background="rgba(0, 0, 0, 0.8)"></div>   

    </div>
</template>

<script>
import '@/assets/js/import.js' //导入请求超时拦截
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
  name: "gongsixinxi",
  data() {
    return {
      doAdd: false,
      doSave: true,
      doEdit: true,
      doImport: false,
      doExport: false,
      doOut: false,
      doCancel: true,
      doDelete: true,

      gui: true,

      //导入弹出开关
      importbox: false,
      importZhe:false,

      //   menuSearch: false,
      //   //查询框内容
      //   search: {
      //     searchName: "",
      //     searchbhCh: ""
      //   },

      dialogVisible: false,

      oldMenu: false,

      //保存新增状态开关  新增true/修改false
      addEdit: true,
      //分页：当前页码/总数量/每页显示条数
      page: 0,
      total: "",
      pageSize: 2,
      pageOnOff: false, //分页显示开关

      form: {
        updateUser: "", //修改人
        updateDate: "", //修改日期
        zdRen: "", //编制人
        addDate: "", //编制日期

        id: "", //id
        level: "", //公司级别
        sn: "", //编号
        name: "", //公司名称
        pidSn: "", //归属公司编号
        pidName: "", //归属公司名称
        dz: "", //地址
        lxr: "", //联系人
        qrDl: "", //地址区域
        tel: "", //电话
        fax: "", //传真
        wz: "", //网址
        nsh: "", //纳税号
        type: "", //公司类别
        nature: "", //公司性质
        status: "3", //状态
        delZt: false //删除
      },
      //上传的文件
      fileList: [],
      //表单状态
      formOnOff: true,
      formNo: true,
      formZt: true,

      oldMenu: false,

      //导入时重复的数据  
      Tips:[],
      tipOffON:false,
      fugai:false,

      navMenus: [],
      NavMenu: [],

      //焦点状态和数组
      typeStatus: false,
      natureStatus: false,
      qrdlStatus: false,
      typeList: [],
      NatureList:[],
      QrdlList:[]
    };
  },
  methods: {

    
    //刷新
    refresh(){
        
        this.emptybtn()
        this.emptyform()
        this.emptyformCancels()
        this.getNavmenus()
        succ('刷新成功')
    },      
    //新增按钮
    doAdds() {
      this.emptyBtnTo();
      this.emptyformTo();
      this.emptyformCancels();
      this.addEdit = true;
      this.doSave = false;
      this.formNo = false;
      this.gui = false;
    },
    //保存
    doSaves() {
      this.oldMenu = false;
      if (this.form.sn.length === 0) {
        error("编号不能为空！");
        return false;
      } else if (this.form.name.length === 0) {
        error("公司名称不能为空！");
        return false;
      } else if (this.form.level.length === 0) {
        error("公司级别不能为空！");
        return false;
      } else if (this.form.type.length === 0) {
        error("公司类别不能为空！");
        return false;
      } else if (this.form.qrDl.length === 0) {
        error("公司区域不能为空！");
        return false;
      } else if (this.form.nsh.length === 0) {
        error("纳税号不能为空！");
        return false;
      } else if (this.form.nature.length === 0) {
        error("公司性质不能为空！");
        return false;
      } else {
        if (this.addEdit) {
          this.$http
            .post("/TPA/aGsJbxx/insert", qs.stringify(this.form))
            .then(res => {
              if (res.data.code === 0) {
                succ(res.data.msg);
                this.getNavmenus(); //重新获取导航
                let pidSn = this.form.pidSn;
                let pidName = this.form.pidName;
                this.form = {};
                this.form.pidSn = pidSn;
                this.form.pidName = pidName;
                this.gui = true;
                this.form.status = "3";
                this.doAdd = false
              } else {
                error(res.data.msg);
              }
            })
            .catch(err => {
              NetworkAnomaly();
            });
        } else {
          this.$http
            .post("/TPA/aGsJbxx/update", qs.stringify(this.form))
            .then(res => {
              if (res.data.code === 0) {
                succ(res.data.msg);
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
                this.getNavmenus(); //重新获取导航
                this.emptybtn(); //重置按钮
                this.emptyform(); //禁用表单
                this.doEdit = false;
                this.doCancel = false;
                console.log(this.form);
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
    //修改按钮
    doEdits() {
      this.addEdit = false;
      this.emptyformTo();
      this.doEdit = true;
      this.doSave = false;
      this.doAdd = true;
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
      this.emptyformCancels();
      this.doInput = false;
      this.addEdit = true;
      this.oldMenu = false;
      this.form.status = "3";
      
    },


    //导入按纽
    doImports() {
      this.importbox = true;
    },
    //导入取消/导入确定
    importCancel() {
      this.emptybtn();
      this.importbox = false;
      this.$refs.upload.clearFiles();
    },
    //文件上传到服务器按钮
    submitUpload() {
      this.$refs.upload.submit();
      this.importbox = false;
    },
    //自定义上传
    uploadFile(params){
        console.log(params);
        const _file = params.file;
        let formData = new FormData();
        formData.append("file", _file);
        console.log(this.fugai);
        //是否覆盖
        if(this.fugai){
            this.$ajax.post('/TPA/aGsJbxx/importExcel?isCover=true',formData)
                .then(res=>{
                    console.log(res);
                if(res.status===200){
                    if(res.data.code===0){
                            succ(res.data.msg)
                            this.getNavmenus()
                            this.importCancel()
                            this.$refs.upload.clearFiles();
                            this.tipOffON = false   
                    }else{
                        error(res.data.msg)
                    }
                }else{
                    NetworkAnomaly()
                }
                this.importZhe = false
                })
                .catch(err=>{
                NetworkAnomaly()
                this.importZhe = false
                })
        }else{
            this.$ajax.post('/TPA/aGsJbxx/importExcel?isCover=false',formData)
                .then(res=>{
                if(res.status===200){
                    if(res.data.code===0){
                            succ(res.data.msg)
                            this.getNavmenus()
                            this.importCancel()
                            this.$refs.upload.clearFiles();
                    }else if(res.data.code===3){
                        this.tipOffON = true
                        this.Tips = res.data.data
                    }else{
                        error(res.data.msg)
                    }
                }else{
                    NetworkAnomaly()
                }
                this.importZhe = false
                })
                .catch(err=>{
                NetworkAnomaly()
                this.importZhe = false
                })
        }
        this.fugai = false

    },
    importFuGai(){
        this.fugai = true
        this.submitUpload()
    },
    //导出按钮
    doExports() {
      window.location.href =
        "/TPA/aGsJbxx/exportExcel";
    },


    //有效按钮
    doEffectives() {
      let params = {
        id: this.form.id,
        status: "1"
      };
      this.$http
        .post("/TPA/aGsJbxx/status", qs.stringify(params))
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
    //无效按钮
    doInvalids() {
      let params = {
        id: this.form.id,
        status: "0"
      };
      this.$http
        .post("/TPA/aGsJbxx/status", qs.stringify(params))
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
    //删除按钮
    doDeletes() {
      this.$http
        .post("/TPA/aGsJbxx/delete?id=" + this.form.id)
        .then(res => {
          if (res.data.code === 0) {
            succ(res.data.msg);
            this.getNavmenus();
            this.emptybtn();
            this.emptyform();
            this.emptyformCancels();
            this.formOnOff = true;
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
      (this.doAdd = false),
        (this.doSave = true),
        (this.doEdit = true),
        (this.doImport = false),
        (this.doExport = false),
        (this.doOut = false),
        (this.doCancel = true),
        (this.doDelete = true);
      this.oldMenu = false;
      this.gui = true;
    },
    //禁用所有表单
    emptyform() {
      this.formOnOff = true;
      this.formNo = true;
    },
    //开放所有表单
    emptyformTo() {
      this.formOnOff = false;
    },
    //按钮按下状态
    emptyBtnTo() {
      (this.doAdd = true),
        (this.doSave = true),
        (this.doEdit = true),
        (this.doImport = true),
        (this.doExport = true),
        (this.doCancel = false),
        (this.doDelete = true);
      this.oldMenu = false;
      this.gui = true;
    },
    //清空表单内容
    emptyformCancels() {
      this.form = {
        updateUser: "", //修改人
        updateDate: "", //修改日期
        zdRen: "", //编制人
        addDate: "", //编制日期
        id: "", //id
        level: "", //公司级别
        sn: "", //编号
        name: "", //公司名称
        pidSn: "", //归属公司编号
        pidName: "", //归属公司名称
        dz: "", //地址
        lxr: "", //联系人
        qrDl: "", //地址区域
        tel: "", //电话
        fax: "", //传真
        wz: "", //网址
        nsh: "", //纳税号
        type: "", //公司类别
        nature: "", //公司性质
        status: "3", //状态
        delZt: false //删除
      };
    },
    //获取导航数据
    getNavmenus() {
      this.$http
        .post("/TPA/aGsJbxx/tree")
        .then(res => {
          if (res.data.code === 0) {
            this.navMenus = res.data.data.childs;
            this.navMenu = res.data.data;
          } else {
            error(res.data.msg);
          }
        })
        .catch(err => {
          NetworkAnomaly();
        });
    },
    //导航点击获取当前公司信息
    menuSelected(index) {
      this.oldMenu = false;
      this.$http("/TPA/aGsJbxx/get?id=" + index)
        .then(res => {
          if (res.data.code === 0) {
            console.log(res);

            this.form = res.data.data;
            this.form.delZt = this.elCheckbox(res.data.data.delZt);
            this.emptyBtnTo();
            this.emptyform();
            this.search = {};
            this.doEdit = false;
            this.doAdd = false;
            this.doDelete = false;
            this.doExport = true;
          } else {
            error(res.data.msg);
          }
        })
        .catch(err => {
          NetworkAnomaly();
        });
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
    },
    //选择归属公司
    getCompanyName(item) {
      console.log(item);
      this.form.pidSn = item.entity.sn; //归属公司编号
      this.form.pidName = item.entity.name; //归属公司名称
      console.log(this.form);
      this.oldMenu = false;
    },
    //获取公司类别
        handleType() {
      this.$http
        .post("/TPA/aLbJb/getBySn?sn=012")
        .then(res => {
          if (res.data.code === 0) {
            console.log(res);
            this.typeList = res.data.data;
            this.typeStatus = true;
          } else {
            error(res.data.msg);
          }
        })
        .catch(err => {
          error(res.msg);
        });
    },
    //选择类型
    getType(item) {
      this.form.type = item.name;
      this.typeStatus = false;
    },
    //获取公司性质
    handleNature(){
      this.$http
        .post("/TPA/aLbJb/getBySn?sn=011")
        .then(res => {
          if (res.data.code === 0) {
            console.log(res);
            this.NatureList = res.data.data;
            this.natureStatus = true;
          } else {
            error(res.data.msg);
          }
        })
        .catch(err => {
          error(res.msg);
        });        
    },
    //选择性质
    getNature(item) {
      this.form.nature = item.name;
      this.natureStatus = false;
    },    
    //获取公司区域
    handleQrDl(){
      this.$http
        .post("/TPA/aLbJb/getBySn?sn=013")
        .then(res => {
          if (res.data.code === 0) {
            console.log(res);
            this.QrdlList = res.data.data;
            console.log(this.QrdlList);
            
            this.qrdlStatus = true;
          } else {
            error(res.data.msg);
          }
        })
        .catch(err => {
          error(res.msg);
        });        
    },
    //选择区域
    getQrDl(item) {
      this.form.qrDl = item.name;
      this.qrdlStatus = false;
    }, 
    //打开弹出框
    open_box() {
      this.oldMenu = true;
    },
    //关闭弹出框
    close_box() {
      this.oldMenu = false;
      this.typeStatus = false;
    },       
  },
  computed: {
    ...mapState(["collapse"])
  },
  mounted() {
    this.getNavmenus();
    
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
  components: {
    NavMenu
  }
};
</script>

<style lang="stylus" scoped>
.container>>>.el-submenu__title, .silder>>>.el-menu-item
    height 3vh
    line-height 3vh
    font-size 1.6vh !important
.container>>>th, .order_table>>>.el-table td, .el-table th
    padding 0
.secondForm>>>.el-table .cell
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
.set_box 
    .menu_box
        width 25%
        ul
            height 72vh
.set_info
    width 75%
    li
        float left
        width 33%
        margin 1vh 0
        height 3.5vh
        position relative
        .inputList
            width 70%
            min-height 400px
            position absolute
            top 3.5vh
            right 0
            border .1vh solid #ccc
            background #fff
            z-index 9999
            .oldMenu_box_close
                font-size 20px
                position absolute
                top -1vh
                right -1vh
                z-index 999999
                background #ffffff
                cursor pointer
            .srcond_menu
                width 100%
                height auto
                height 400px
                overflow-x hidden
                padding 1vh 20px
                li
                    width 100%
                    height 3.5vh
                    line-height 3.5vh
                    margin 0
                    span
                        cursor pointer
        label
            display block
            float left
            line-height 3.5vh
            padding 0 0 0 3vh

        i
            font-size 2.5vh
            color red
            line-height 4.5vh
            float left 
            display block
        
        input
            width 60%
            line-height 3.5vh
            float right
            padding-left 1vh
            height 3.5vh
            border .1vh solid #d2d2d2
            &.companyNum
                width 15%
                margin-right 1vh
            &.companyName
                width 45%
                margin-right 1vh
        &.company
            width 50%
        button
            width 50px
            height 3.5vh
            border .1vh solid #d2d2d2
            background none
            margin-right 5px
            line-height 3.5vh
            text-align center
            border-radius 5px
            cursor pointer
            margin-top 2px
            float right
        &.dz
            width 45%
            label
                width 18%
            input
                width 80%
        &.last
            width 100%
            label
                width 40px
                text-align center
                &.el-checkbox
                    width 100px
                    text-align left
                &.el-radio
                    width 80px
                    text-align left
                    margin 0
</style>
