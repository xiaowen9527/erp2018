<template>
    <div class="container" :class="{container_collapse:collapse}">
        <p class="page_title">品类款式定义</p>
        <div class="btn-box">
            <button :disabled='doAdd' :class="{button_btn:!doAdd}" @click="doAdds">新增</button>
            <button :disabled='doEdit' :class="{button_btn:!doEdit}" @click="doEdits">修改</button>
            <button :disabled='doCancel' :class="{button_btn:!doCancel}" @click="doCancels">取消</button>
            <button class="button_btn" @click="refresh">刷新</button>
            <button class="button_btn" @click="doOuts">退出</button>
            <button :disabled='doImport' :class="{button_btn:!doImport}" @click="doImports">导入</button>
            <button :disabled='doExport' :class="{button_btn:!doExport}" @click="doExports">导出</button>
        </div>
        <div class="set_box">
            <div class="menu_box">
                <el-menu @select="menuSelected" @open="menuSelected" unique-opened background-color="#f2f2f2" text-color="#303133" active-text-color="#303133">
                    <nav-menu :navMenus="this.navMenus"></nav-menu>
                </el-menu>
            </div>
            <div class="set_info">
                <div class="firstForm clearfix">
                    <ul>
                        <li class="gui">
                            <label>品类</label>
                            <input placeholder="顶级"  type="text" class="guiNum" v-model="firstForm.pidSn" :disabled="firstFormGui">
                            <input placeholder="顶级" type="text" v-model="firstForm.pidName" :disabled="firstFormGui">
                            <button :disabled="firstFormGui" @click="oldMenu=true">。。。</button>
                        </li>
                        <li>
                            <label>编号</label>
                            <input type="text" v-model="firstForm.sn" :disabled="firstFormNo">
                        </li>
                        <li>
                            <label>名称</label>
                            <input type="text" v-model="firstForm.name" :disabled="firstFormNo">
                        </li>
                        <li>
                            <label>简称</label>
                            <input type="text" v-model="firstForm.jc" :disabled="firstFormNo">
                        </li>
                        <li>
                            <label>排序</label>
                            <input type="number" v-model="firstForm.sort" :disabled="firstFormOn">
                        </li>
                        <li>
                            <button class="save" @click="doSavue" :disabled="firstFormOn" :class="{button_btn:!firstFormOn}">保存</button>
                        </li>
                    </ul>
                </div>

                <div class="secondForm">
                    <div class="order_table">
                        <el-table :data="list" border style="width: 100%" @sort-change='sortChange' :default-sort="{prop: 'sort', order: 'ascending'}">
                            <el-table-column prop="pidSn" label="类别编号" min-width="15%">
                            </el-table-column>
                            <el-table-column prop="pidName" label="类别" min-width="15%">
                            </el-table-column>
                            <el-table-column prop="sn" label="编号" min-width="10%" sortable='custom'>
                            </el-table-column>
                            <el-table-column prop="name" label="名称" min-width="15%">
                            </el-table-column>
                            <el-table-column prop="jc" label="简称" min-width="10%" sortable='custom'>
                            </el-table-column>
                            <el-table-column prop="sort" label="顺序" min-width="10%" sortable='custom'>
                            </el-table-column>
                            <el-table-column label="操作" min-width="25%">
                                <template slot-scope="scope">
                                    <el-button @click="handleEdit(scope.$index, scope.row)" type="text">修改</el-button>
                                    <el-button :disabled="(scope.row.status == 1)" :class="{btn:(scope.row.status == 1)}" @click="effective(scope.$index, scope.row)" type="text">有效</el-button>
                                    <el-button :disabled="(scope.row.status == 0)" :class="{btn:(scope.row.status == 0)}" @click="invalid(scope.$index, scope.row)" type="text">无效</el-button>
                                </template>
                            </el-table-column>
                        </el-table>
                    </div>
                </div>
            </div>
        </div>
        <div class="pageBox" :class="{collapse:collapse}">
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
            <el-pagination @current-change="currentPage" :current-page='page' v-if="pageOnOff" background :page-size="pageSize" :pager-count="5" :total="total">
            </el-pagination>
        </div>

        <el-dialog title="品类" :visible.sync="oldMenu">
            <ul class="srcond_menu">
                <li v-if="navMenus.length===0">暂无数据</li>
                <li v-for="(item,i) in navMenus" :key="i">
                    <span @click="getOldMenu(item)">|--{{item.entity.name}}</span>
                </li>
            </ul>
        </el-dialog>
        <!-- 编辑弹出框 -->
        <el-dialog title="修改" :visible.sync="editVisible" width="30%">
            <el-form :model="dialog" label-width="100px">
                <el-form-item label="类别编号">
                    <el-input v-model="dialog.pidSn" disabled></el-input>
                </el-form-item>
                <el-form-item label="类别">
                    <el-input v-model="dialog.pidName" disabled></el-input>
                </el-form-item>
                <el-form-item label="编号">
                    <el-input v-model="dialog.sn" disabled></el-input>
                </el-form-item>
                <el-form-item label="名称">
                    <el-input v-model="dialog.name" disabled></el-input>
                </el-form-item>
                <el-form-item label="简称">
                    <el-input v-model="dialog.jc" disabled></el-input>
                </el-form-item>
                <el-form-item label="顺序">
                    <el-input type="number" v-model="dialog.sort"></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="editVisible = false">取 消</el-button>
                <el-button type="primary" @click="saveEdit">确 定</el-button>
            </span>
        </el-dialog>

        <!-- 导入弹窗 -->
        <el-dialog class="importExport" title="导入" :visible.sync="importbox" width="30%" :showClose="false" :show-file-list="false">
            <a class="down" href="/TPA/cPlks/downExcel">下载导入模板</a>
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
    name: "pinleikuanshidingyi",
    data() {
        return {
            //按钮开关
            doAdd: false,
            doSave: true,
            doEdit: true,
            doImport: false,
            doExport: false,
            doCancel: true,

            oldMenu: false,

            //保存新增状态开关  新增true/修改false
            addEdit: true,

            navMenus: [], //导航数据
            list: [],

            editVisible: false,
            idx: "",
            dialog: {},
         

            firstForm: {
                pidSn: "", //品类归属编号
                pidName: "", //品类归属名称
                sn: "", //编号
                name: "", //名称
                jc: "", //简称
                sort: "", //排序
                addUser:"",
                addDate:"",
                updateUser:"",
                updateDate:""
            },

            //form的disabled
            firstFormNo: true,
            firstFormOn: true,
            firstFormGui: true,

            //分页：当前页码/总数量/每页显示条数
            page: 0,
            total: "",
            pageSize:10,
            pageOnOff: false,
            //分页查询第一第二级时候的参数
            pageParams: {
                orderBy: ""
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

            //选取的当前菜单的index
            selectMenu: ""

        };
    },
    mounted() {
        this.getnavMenu();
    },
    methods: {
        //按钮初始状态
        emptyBtn() {
            this.doAdd = false;
            this.doSave = true;
            this.doEdit = true;
            this.doImport = false;
            this.doExport = false;
            this.doCancel = true;
        },
        //按钮按下状态
        emptyBtnTo() {
            this.doAdd = true;
            this.doSave = true;
            this.doEdit = true;
            this.doImport = true;
            this.doExport = true;
            this.doCancel = false;
        },
        //开放表单first
        noDisabledFirstForm() {
            this.firstFormNo = false;
            this.firstFormOn = false;
            this.firstFormGui = false;
        },
        //禁用表单first
        disabledFirstForm() {
            this.firstFormNo = true;
            this.firstFormOn = true;
            this.firstFormGui = true;
        },
        //表单1恢复初始空值状态
        emptyFirstForm() {
            this.firstForm = {
                pidSn: "", //品类归属编号
                pidName: "", //品类归属名称
                sn: "", //编号
                name: "", //名称
                jc: "", //简称
                sort: "" //排序
            };
        },

        //新增
        doAdds() {
            this.doCancels()
            this.emptyBtnTo();
            this.doCancel = false
            this.noDisabledFirstForm();
            this.emptyFirstForm();
            this.addEdit = true;
        },
        //保存
        doSavue() {
            if (this.firstForm.sn.length === 0) {
                error("编号不能为空");
            } else if (this.firstForm.name.length === 0) {
                error("名称不能为空");
            } else if (this.firstForm.jc.length === 0) {
                error("简称不能为空");
            } else {
                if(this.firstForm.sort.length === 0){this.firstForm.sort=0} 
                if (this.addEdit) {
                    this.$http
                        .post("/TPA/cPlks/insert", qs.stringify(this.firstForm))
                        .then(res => {
                            if (res.data.code === 0) {
                                this.emptyFirstForm();
                                this.firstForm.pidSn = res.data.data.pidSn;
                                this.firstForm.pidName = res.data.data.pidName;
                                this.firstForm.sort = ""
                                this.firstFormGui = true;
                                this.getnavMenu();
                                this.doAdd = false;
                                this.doCancel = false
                                succ(res.data.msg);

                                let params = {
                                    pidSn: this.firstForm.pidSn,
                                    page: 0,
                                    orderBy: "sort asc",
                                    count: this.pageSize
                                };

                                this.pageParams = params;
                                if(this.pageParams.pidSn.length === 0){this.pageParams.pidSn=-1}
                                this.getPageData();

                            } else {
                                error(res.data.msg);
                            }
                        })
                        .catch(err => {
                            NetworkAnomaly();
                        });
                } else {
                    this.$http.post('/TPA/cPlks/update', qs.stringify(this.firstForm))
                    .then(res=>{
                        if(res.data.code===0){
                            this.firstForm.sort = res.data.data.sort
                            this.doEdit = false
                            this.disabledFirstForm()
                            this.getnavMenu()
                            succ(res.data.msg)
                        }else{
                            error(res.data.msg)
                        }
                    })
                    .catch(err=>{
                        NetworkAnomaly()
                    })
                }
            }
        },
        //修改
        doEdits() {
            this.emptyBtnTo()
            this.doAdd = false
            this.addEdit = false
            this.firstFormOn = false
        },
        //退出
        doOuts() {
            this.$emit("getOut", this.$route.name);
        },
        //取消
        doCancels() {
            this.emptyBtn();
            this.disabledFirstForm();
            this.emptyFirstForm();
            this.list = [];
            this.pageOnOff = false
        },
        //刷新
        refresh() {
            this.doCancels();
            this.getnavMenu();
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
                    .post("/TPA/cPlks/importExcel", formData)
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
            window.location.href = "/TPA/cPlks/exportExcel";
        }, 

        //获取导航数据
        getnavMenu() {
            this.$http
                .post("/TPA/cPlks/tree")
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
        //选择归属品类弹出窗内容
        getOldMenu(item) {
            this.firstForm.pidSn = item.entity.sn;
            this.firstForm.pidName = item.entity.name;
            this.oldMenu = false;
        },
        //点击菜单查询
        menuSelected(index) {
            this.emptyBtnTo();
            this.doEdit = false;
            this.doCancel = false;
            this.doAdd = false
            this.disabledFirstForm();
            let data = index.split(",");
            this.$http
                .post("/TPA/cPlks/get?id=" + data[1])
                .then(res => {
                    if (res.data.code === 0) {
                        this.firstForm = res.data.data;
                    } else {
                        error(res.data.msg);
                    }
                })
                .catch(err => {
                    NetworkAnomaly();
                });
            
    
            let params = {
                pidSn: data[0],
                page: 0,
                orderBy: "sort asc",
                count: this.pageSize
            };
            this.page = 0
            this.pageParams = params;
            this.getPageData()
        },

        //编辑单条数据
        handleEdit(index, row) {
            this.idx = index;
            const item = this.list[index];
            console.log(item);

            this.dialog = {
                id: item.id,
                pidSn: item.pidSn, //品类归属编号
                pidName: item.pidName, //品类归属名称
                sn: item.sn, //编号
                name: item.name, //名称
                jc: item.jc, //简称
                sort: item.sort //排序
            };
            this.editVisible = true;
        },
        //保存单条编辑的数据
        saveEdit() {
            if(this.dialog.sort.length === 0){this.dialog.sort=0} 
            this.$http
                .post("/TPA/cPlks/update", qs.stringify(this.dialog))
                .then(res => {
                    if (res.data.code === 0) {
                        succ(res.data.msg);
                        this.$set(this.list, this.idx, this.dialog);
                        this.getnavMenu();
                        this.editVisible = false;

                        //重新请求table数据（按照编辑之后的顺序）
                        this.$http
                            .post(
                                "/TPA/cPlks/search",
                                qs.stringify(this.pageParams)
                            )
                            .then(res => {
                                if (res.data.code === 0) {
                                    console.log(res);
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
                                NetworkAnomaly();
                            });
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
            let item = this.list[index];
            item.status = "1"
            this.$http
                .post("/TPA/cPlks/status", qs.stringify(item))
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
        },
        //table无效
        invalid(index, row) {
            this.idx = index;
            let item = this.list[index];
            item.status = 0
            this.$http
                .post("/TPA/cPlks/status", qs.stringify(item))
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
        },
        //获取当前页码
        currentPage(val) {
            this.page = val;
        }, 
        //获取分页数据
        getPageData() {    
            console.log(this.pageParams)       
            this.$http
                .post(
                    "/TPA/cPlks/search",
                    qs.stringify(this.pageParams)
                )
                .then(res => {
                    if (res.data.code === 0) {
                        this.list = res.data.data.list;
                        console.log(this.list)
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
        //排序
        sortChange(column) {
            if (this.pageParams.orderBy.length !== 0) {
                if (column.prop == "sort" && column.order == "descending") {
                    this.pageParams.orderBy = "sort desc";
                } else if (
                    column.prop == "sort" &&
                    column.order == "ascending"
                ) {
                    this.pageParams.orderBy = "sort asc";
                } else if (
                    column.prop == "sn" &&
                    column.order == "descending"
                ) {
                    this.pageParams.orderBy = "sn desc";
                } else if (
                    column.prop == "sn" &&
                    column.order == "ascending"
                ) {
                    this.pageParams.orderBy = "sn asc";
                } else if (
                    column.prop == "jc" &&
                    column.order == "descending"
                ) {
                    this.pageParams.orderBy = "jc desc";
                } else if (
                    column.prop == "jc" &&
                    column.order == "ascending"
                ){
                    this.pageParams.orderBy = "jc asc";
                }else{
                    this.pageParams.orderBy = "sort asc";
                }
                if (this.list.length !== 0) {
                    this.getPageData();
                }
            }
            
        },                   
    },
    watch: {
        page() {
            if(this.page!==0){this.pageParams.page = this.page - 1;}
            this.$http
                .post("/TPA/cPlks/search", qs.stringify(this.pageParams))
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
.container>>>.el-submenu__title, .silder>>>.el-menu-item
    height 3vh
    line-height 3vh
    font-size 1.6vh
.secondForm>>>th, .order_table>>>.el-table td, .el-table th
    padding 0
.secondForm>>>.el-table .cell
    height 4vh
    line-height 4vh
    text-align center
    font-size 1.6vh
.secondForm>>>.el-table__empty-block
    min-height 35px
.container>>>.el-dialog
    width 500px
    height 500px
    overflow-x hidden
.container>>>.el-dialog__body
    cursor pointer !important
    line-height 2.5vh
    font-weight bold
    padding 0px 20px
.set_box     
    .menu_box
        width 12%
    .set_info
        width 88%
        .firstForm
            ul
                li
                    width 20%
                    &.gui
                        width 100%
.order_table
    width 99%
    margin 5px auto 0
    max-height 550px
    border 1px solid #d9d9d9
    overflow hidden
    .el-button
        padding .6vh 2vh
        margin-top .4vh
        font-size 1.6vh
        border 1px solid #409eff
        color #409eff
        &.btn
            border 1px solid #d2d2d2
            color #d2d2d2

</style>
