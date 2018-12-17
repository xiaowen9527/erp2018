<template>
    <div class="container" :class="{container_collapse:collapse}">
        <p class="page_title">研发分工</p>
        <div class="btn-box">
            <button :disabled='doAdd' :class="{button_btn:!doAdd}" @click="doAdds">新增</button>
            <button :disabled='doCancel' :class="{button_btn:!doCancel}" @click="doCancels">取消</button>
            <button class="button_btn" @click="doSearchs">查询</button>
            <input type="text" placeholder="请选择" class="doSearch" @click="doSearchs" readonly  v-model="search">
            <button class="button_btn" @click="doOuts">退出</button>
            <button class="button_btn" @click="refresh">刷新</button>
            <div class="btn_right">
                <button :disabled='doImport' :class="{button_btn:!doImport}" @click="doImports">导入</button>
                <button :disabled='doImport' :class="{button_btn:!doImport}" @click="doExports">导出</button>
            </div>
        </div>

        <div class="set_box">
            <div class="menu_box">
                <el-menu @open="menuSelected" unique-opened background-color="#f2f2f2" text-color="#303133" active-text-color="#303133">
                    <nav-menu :navMenus="this.navMenus"></nav-menu>
                </el-menu>
            </div>

            <div class="set_info">
                <section class="firstForm">
                    <ul class="clearfix">
                        <li class="gui">
                            <label>人事信息</label>
                            <!-- <input type="text" :disabled="firstFormGui" readonly class="gui_num">
                            <input type="text" :disabled="firstFormGui" readonly>
                            <button :disabled="firstFormGui" :class="{btn:!firstFormGui}" @click="openGui">。。。</button> -->
                            <input type="text" :disabled="firstFormOn" class="gui_num" v-model="firstForm.personSn">
                            <input type="text" :disabled="firstFormOn" v-model="firstForm.personName">
                        </li>
                        <li>
                            <label>研发工号</label>
                            <input type="text" :disabled="firstFormOn" v-model="firstForm.rdSn">
                        </li>
                        <li>
                            <label>姓名</label>
                            <input type="text" :disabled="firstFormOn" v-model="firstForm.rdName">
                        </li>
                        <li>
                            <label>负责工序</label>
                            <el-select :disabled="firstFormOn" v-model="firstForm.rdProcedure" placeholder="请选择">
                                <el-option v-for="item in this.rdProcedure" :key="item.name" :label="item.name" :value="item.name">
                                </el-option>
                            </el-select>
                        </li>
                        <button :disabled="firstFormOn" :class="{btn:!firstFormOn}" @click="firstSave" class="save">保存</button>
                    </ul>
                </section>

                <section class="secondForm">
                    <div class="order_table">
                        <el-table :data="list" border style="width: 100%" @sort-change='sortChange' :default-sort="{prop:'rdSn',order: 'ascending'}">
                            <el-table-column prop="personSn" label="工号" min-width="16%">
                            </el-table-column>
                            <el-table-column prop="personName" label="姓名" min-width="16%">
                            </el-table-column>
                            <el-table-column prop="rdSn" label="研发工号" min-width="16%" sortable='custom'>
                            </el-table-column>
                            <el-table-column prop="rdName" label="姓名" min-width="16%" sortable='custom'>
                            </el-table-column>
                            <el-table-column prop="rdProcedure" label="工序" min-width="16%" sortable='custom'>
                            </el-table-column>
                            <el-table-column label="操作" min-width="20%">
                                <template slot-scope="scope">
                                    <el-button :disabled="(scope.row.status == 1)" :class="{btn:(scope.row.status == 1)}" @click="effective(scope.$index, scope.row)" type="text">有效</el-button>
                                    <el-button :disabled="(scope.row.status == 0)" :class="{btn:(scope.row.status == 0)}" @click="invalid(scope.$index, scope.row)" type="text">无效</el-button>
                                </template>
                            </el-table-column>
                        </el-table>
                    </div>
                </section>
            </div>
        </div>

        <div class="pageBox">
            <ul class="pageData">
                <li>
                    <span>编制人：</span>
                    <span>{{this.firstForm.addUser}}</span>
                </li>
                <li>
                    <span>编制日期：</span>
                    <span>{{this.firstForm.addDate}}</span>
                </li>
                <li>
                    <span>修改人：</span>
                    <span>{{this.firstForm.updateUser}}</span>
                </li>
                <li>
                    <span>修改日期：</span>
                    <span>{{this.firstForm.updateDate}}</span>
                </li>
            </ul>
            <el-pagination v-if="pageOnOff" background :page-size="pageSize" :pager-count="5" :total="total" @current-change="currentPage">
            </el-pagination>
        </div>

        <el-dialog title="人事信息" :visible.sync="oldMenu">
            <ul>
                <li v-if="person.length===0">暂无数据</li>
                <li v-for="(item,i) in person" :key="i">
                    <!-- <span @click="getCompanyName(item)">{{item.entity.name}}</span> -->
                </li>
            </ul>
        </el-dialog>

        <el-dialog title="请输入研发姓名" :visible.sync="oldSearch">
            <el-input v-model="search" placeholder="请输入研发姓名"></el-input>
            <button class="button_btn" @click="vagueSearch">查询</button>
            <ul class="srcond_menu">
                <li v-if="searchList.length===0">暂无数据</li>
                <li class="clearfix" v-for="(item,i) in searchList" :key="i">
                    <!-- <span @click="getSearch(item)">|--{{item.sn}}&nbsp;&nbsp;-&nbsp;&nbsp;{{item.name}}&nbsp;&nbsp;-&nbsp;&nbsp;{{item.typeName}}</span> -->
                    <span @click="getSearch(item)">|--{{item.rdSn}}</span>
                    <span @click="getSearch(item)">{{item.rdName}}</span>
                </li>
            </ul>
        </el-dialog>        

        <!-- 导入弹窗 -->
        <el-dialog class="importExport" title="导入" :visible.sync="importbox" width="30%" :showClose="false" :show-file-list="false">
            <a class="down" href="/TPA/cYffg/downExcel">下载导入模板</a>
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
import qs from "qs";
import {
    NetworkAnomaly,
    succ,
    error,
    getOut
} from "../../../assets/js/message.js";
import NavMenu from "./NavMenu";
export default {
    name: "yanfafengong",
    data() {
        return {
            //按钮disabled
            doAdd: false,
            doCancel: true,
            doImport: false,

            //form的disabled
            firstFormNo: true,
            firstFormOn: true,
            firstFormGui: true,

            //bind值
            search: "", //查询
            oldSearch:false,
            searchList:[],
            navMenus: [], //导航数据

            //下拉数据
            rdProcedure: [], //工序

            oldMenu: false,
            person: [],

            firstForm: {
                personSn: "", //工号
                personName: "", //姓名
                rdSn: "", //研发工号
                rdName: "", //研发姓名
                rdProcedureSn: "", //研发工序编号
                rdProcedure: "", //研发工序
                status: "3",
                addUser: "",
                addDate: "",
                updateUser: "",
                updateDate: ""
            },

            list: [],
            printList: [],

            //编辑弹窗开关
            editVisible: false,
            idx: 0,
            //编辑弹出框数据
            dialog: {},

            //分页：当前页码/总数量/每页显示条数
            page: 0,
            total: "",
            pageSize: 10,
            pageOnOff: false,
            //分页排序查询条件
            pageParams: {
                orderBy: "rd_sn asc"
            },


           //导入弹出开关
            importbox: false,
            importZhe: false, //导入遮罩
            isCover:false,      //默认导入不覆盖
            project:"",         //错误文件名
            //上传的文件
            fileList: [],
            Tips:"",               //错误提示
            tipOffON: false,        //错误文件下载开关

        };
    },
    methods: {
        //按钮初始化
        emptyBtn() {
            this.doAdd = false;
            this.doCancel = true;
            this.doImport = false;
        },
        //按钮按下状态
        emptyBtnTo() {
            this.doAdd = true;
            this.doCancel = false;
            this.doImport = true;
        },
        //表单1恢复初始空值状态
        emptyFirstForm() {
            this.firstForm = {
                personSn: "", //工号
                personName: "", //姓名
                rdSn: "", //研发工号
                rdName: "", //研发姓名
                rdProcedureSn: "", //研发工序编号
                rdProcedure: "", //研发工序
                status: "3",
                addUser: "",
                addDate: "",
                updateUser: "",
                updateDate: ""
            };
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
            this.doCancels();
            this.noDisabledFirstForm();

            this.doCancel = false;
            this.addEdit = true;

            this.getPerson();
            this.getRdProcedure();
        },
        //取消
        doCancels() {
            this.emptyBtn();
            this.emptyFirstForm();
            this.disabledFirstForm();

            this.pageOnOff = false;

            this.list = [];
            this.printList = [];
            this.search = ""
        },
        //刷新
        refresh() {
            this.getnavMenu();
            this.doCancels();
            succ("刷新成功");
        },

        //查询
        doSearchs() {
            this.oldSearch = true
            this.search = ""
            this.searchList = []
        },
        //选择search模糊查询
        getSearch(item) {
            this.search = item.rdName
            let searchSn = item.rdSn
            this.oldSearch = false;
            this.$http
                .post("/TPA/cYffg/getBy?rdSn=" + searchSn)
                .then(res => {
                    if (res.data.code === 0) {
                        this.firstForm = res.data.data[0];
                        this.doCancel = false
                    } else {
                        error(res.data.msg);
                    }
                })
                .catch(err => {
                    error(res.data.mag);
                });
        },

        //退出
        doOuts() {
            this.$emit("getOut", this.$route.name);
        },
        //保存
        firstSave() {
            this.firstForm.rdProcedureSn = this.getSn(
                this.rdProcedure,
                this.firstForm.rdProcedure
            );
            this.$http
                .post("/TPA/cYffg/insert", qs.stringify(this.firstForm))
                .then(res => {
                    if (res.data.code === 0) {
                        succ(res.data.msg);
                        this.getnavMenu();

                        this.pageParams.rdProcedureSn = this.firstForm.rdProcedureSn;
                        this.pageParams.page = 0;
                        this.pageParams.count = this.pageSize;
                        this.getPageData();

                        this.doCancels();
                    } else {
                        error(res.data.msg);
                    }
                })
                .catch(err => {
                    NetworkAnomaly();
                });
        },

        //table有效
        effective(index, row) {
            this.idx = index;
            const item = this.list[index];
            this.forms = item;
            this.forms.status = 1;
            this.$http
                .post("/TPA/cYffg/status", qs.stringify(this.forms))
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
        //table无效
        invalid(index, row) {
            this.idx = index;
            const item = this.list[index];
            this.forms = item;
            this.forms.status = 0;
            this.$http
                .post("/TPA/cYffg/status", qs.stringify(this.forms))
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
                    .post("/TPA/cYffg/importExcel", formData)
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
            window.location.href = "/TPA/cYffg/exportExcel";
        },


        //获取编号
        getSn(data1, data2) {
            let arr = [];
            let sn;
            for (let i = 0; i < data1.length; i++) {
                arr.push(data1[i].name);
            }
            for (let j = 0; j < arr.length; j++) {
                if (arr[j] == data2) {
                    sn = data1[j].sn;
                }
            }
            return sn;
        },

        //导航展开查询table
        menuSelected(index) {

            this.pageOnOff = false;
            this.doCancel = false;
            let data = index.split(",");
            
            let params = {
                rdProcedure: data[0],
                page: 0,
                orderBy: "rd_sn asc",
                count: this.pageSize
            };
            this.pageParams = params;
            this.getPageData();
            this.emptyFirstForm();
            this.disabledFirstForm()
        },

        //获取nav
        getnavMenu() {
            this.$http
                .post("/TPA/cYffg/tree")
                .then(res => {
                    if (res.data.code === 0) {
                        console.log(res);
                        this.navMenus = res.data.data.childs;
                    } else {
                        error(res.data.msg);
                    }
                })
                .catch(err => {
                    NetworkAnomaly();
                });
        },
        //点击上级按钮
        openGui() {
            this.oldMenu = true;
        },
        //获取工序
        getRdProcedure() {
            this.$http
                .post("/TPA/aLbJb/getBySn?sn=020")
                .then(res => {
                    if (res.data.code === 0) {
                        console.log(res);
                        this.rdProcedure = res.data.data;
                    } else {
                        error(res.data.msg);
                    }
                })
                .catch(err => [NetworkAnomaly()]);
        },
        //获取人事信息
        getPerson() {
            console.log(0);
        },
        //顺序
        sortChange(column) {
            console.log(column.prop, column.order);
            if (this.pageParams.orderBy.length !== 0) {
                if (column.prop == "rdSn" && column.order == "descending") {
                    this.pageParams.orderBy = "rd_sn desc";
                } else if (
                    column.prop == "rdSn" &&
                    column.order == "ascending"
                ) {
                    this.pageParams.orderBy = "rd_sn asc";
                } else if (
                    column.prop == "rdName" &&
                    column.order == "descending"
                ) {
                    this.pageParams.orderBy = "rd_name desc";
                } else if (
                    column.prop == "rdName" &&
                    column.order == "ascending"
                ) {
                    this.pageParams.orderBy = "rd_name asc";
                } else if (
                    column.prop == "rdProcedure" &&
                    column.order == "descending"
                ) {
                    this.pageParams.orderBy = "rd_procedure desc";
                } else if (
                    column.prop == "rdProcedure" &&
                    column.order == "ascending"
                ) {
                    this.pageParams.orderBy = "rd_procedure asc";
                } else {
                    this.pageParams.orderBy = "rd_sn asc";
                }
                if (this.list.length !== 0) {
                    this.getPageData();
                }
            }
        },
        //获取分页数据
        getPageData() {
            this.$http
                .post("/TPA/cYffg/search", qs.stringify(this.pageParams))
                .then(res => {
                    if (res.data.code === 0) {
                        this.list = res.data.data.list;
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
        },
        //获取当前页码
        currentPage(val) {
            this.page = val;
        },
        //模糊查询
        vagueSearch(){
            this.searchList = []
            if (this.search) {
                let search = {
                    rdName: 17 + "|" + this.search
                };
                let searchStr = JSON.stringify(search);
                this.$http
                    .post("/TPA/cYffg/search?search=" + searchStr)
                    .then(res => {
                        if(res.data.code===0){
                            if(res.data.data.list.length){
                                this.searchList = res.data.data.list;
                            }else{
                                error('暂无数据')
                                this.searchList = []
                            }
                        }else{
                            error(res.data.msg)
                        }
                    })
                    .catch(err => {
                        NetworkAnomaly();
                    });
            }else{
                error('请输入搜索条件！')              
            }
        },
    },
    mounted() {
        this.getnavMenu();
    },
    watch: {
        page() {
            this.pageParams.page = this.page - 1
            this.getPageData();
        },   
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
@import './css/style.styl'
.container>>>.el-submenu__title, .container>>>.el-menu-item
    height 3vh
    line-height 3vh
    font-size 1.6vh !important
.secondForm>>>th, .order_table>>>.el-table td, .el-table th
    padding 0
.secondForm>>>.el-table .cell
    height 3.5vh
    line-height 3.5vh
    text-align center
    font-size 1.6vh
.secondForm>>>.el-table__empty-block
    min-height 3.5vh
.container>>>.el-dialog
    width 400px
    height 400px
    overflow-x hidden
.container>>>.el-dialog__body
    cursor pointer !important
    line-height 3.5vh
    font-weight bold
    padding 1vh 2vh
    .el-input
        width 80%
        float left
    button
        height 40px 
        width 60px
        background #ffffff
        margin-left 10px  
        border 1px solid #409EFF
        color #409EFF    
.container>>>.el-dialog__body span
    width 50%
    display block
    float left    
.el-select>>>.el-input
    display inline-block    
.srcond_menu
    li
        &:hover
            background #d2d2d2    
.order_table
    width 99%
    margin 5px auto 0
    max-height 45vh
    border 0.1vh solid #d9d9d9
    overflow hidden
    .el-button
        padding 0.6vh 2vh
        margin-top 0.4vh
        border 0.1vh solid #409eff
        color #409eff
        &.btn
            border 0.1vh solid #d2d2d2
            color #d2d2d2
</style>
