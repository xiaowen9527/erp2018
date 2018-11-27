<template>
    <div class="container" :class="{container_collapse:collapse}">
        <p class="page_title">标准工序设计</p>
        <div class="btn-box">
            <button :disabled='doAdd' :class="{button_btn:!doAdd}" @click="doAdds">新增</button>
            <button :disabled='doCancel' :class="{button_btn:!doCancel}" @click="doCancels">取消</button>
            <button :disabled='doPrint' :class="{button_btn:!doPrint}">打印</button>
            <button :disabled='doImport' :class="{button_btn:!doImport}" @click="doImports">导入</button>
            <button :disabled='doImport' :class="{button_btn:!doImport}" @click="doExports">导出</button>
            <button @click="doSearchs" class="button_btn">查询</button>
            <input type="text" placeholder="请选择" class="doSearch" v-model="search" readonly @click="doSearchs">
            <button class="button_btn" @click="doOuts">退出</button>
            <div class="btn_right">

                <button  class="button_btn" @click="doExamines">审核</button>
                <button  class="button_btn" @click="doExamineAgains">反审</button>
            </div>
        </div>
        <div class="set_box">
            <div class="set_info">
                <div class="firstForm">
                    <ul class="clearfix">
                        <li class="gui clearfix">
                            <label>设计款号</label>
                            <input type="text" placeholder="请选择(必填)" v-model="firstForm.psn" @click="doPsn" readonly :disabled="firstFormGui">
                            <button  :class="{button_btn:!firstFormGui}" @click="doPsn" :disabled="firstFormGui">。。。</button>
                        </li>
                        <li class="gui clearfix">
                            <label>车间</label>
                            <el-select :disabled="firstFormOn" v-model="workshop" placeholder="请选择(必选)">
                                <el-option v-for="item in this.doWorkshopList" :key="item.name" :label="item.name" :value="item.name">
                                </el-option>
                            </el-select>
                        </li>
                        <li>
                            <label>工艺顺序</label>
                            <input type="number" v-model="firstForm.sort" :disabled="firstFormOn">
                        </li>
                        <li>
                            <label>工艺名称</label>
                            <input type="text" v-model="firstForm.name" :disabled="firstFormOn">
                        </li>
                        <li class="textarea">
                            <label>工艺要求</label>
                            <el-input type="textarea" v-model="firstForm.require" :disabled="firstFormOn"></el-input>
                        </li>
                        <li class="textarea">
                            <label>设备工具</label>
                            <el-input type="textarea" v-model="firstForm.tool" :disabled="firstFormOn"></el-input>
                        </li>
                        <button :disabled="firstFormOn" :class="{button_btn:!firstFormOn}" class="save" @click="firstSave">保存</button>

                    </ul>
                </div>

                <div class="order_table">
                    <el-table :data="list"  border style="width: 100%" @selection-change="handleSelectionChange">
                        <el-table-column type="selection" min-width="5%">
                        </el-table-column>
                        <el-table-column prop="sort" label="工艺顺序" min-width="15%">
                        </el-table-column>
                        <el-table-column prop="workshop" label="车间" min-width="15%">
                        </el-table-column>
                        <el-table-column prop="name" label="工艺名称" min-width="15%">
                        </el-table-column>
                        <el-table-column prop="require" label="工艺要求" min-width="15%">
                        </el-table-column>
                        <el-table-column prop="tool" label="设备工具" min-width="15%">
                        </el-table-column>
                        </el-table-column>
                        <el-table-column fixed="right" label="操作" min-width="20%">
                            <template slot-scope="scope">
                                <el-button :disabled='(scope.row.sh==1)' :class="{btn:(scope.row.sh==0)}" @click="handleEdit(scope.$index, scope.row)" type="text">修改</el-button>
                                <el-button :disabled='(scope.row.sh==1)' :class="{btn:(scope.row.sh==0)}" type="text" @click="tableDelete(scope.$index, scope.row)">删除</el-button>
                                <el-checkbox disabled v-model="scope.row.sh==1">审核</el-checkbox>
                            </template>
                        </el-table-column>
                    </el-table>
                </div>
            </div>

            <div class="pageBox">
                <!-- <ul class="pageData">
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
                    <li>
                        <span>审核人：</span>
                        <span>{{this.firstForm.shUser}}</span>
                    </li>
                    <li>
                        <span>审核日期：</span>
                        <span>{{this.firstForm.shDate}}</span>
                    </li>

                </ul> -->
                <el-pagination v-if="pageOnOff" background :page-size="pageSize" :pager-count="5" :total="total" @current-change="currentPage">
                </el-pagination>
            </div>
        </div>

        <!-- 查询框 -->
        <el-dialog title="请输入您要查询的设计款号" :visible.sync="oldSearch">
            <el-input v-model="search" placeholder="请输入您要查询的设计款号"></el-input>
            <ul class="srcond_menu">
                <p v-if="oldSearchList.length===0">暂无数据</p>
                <li v-for="(item,i) in oldSearchList" :key="i" class="clearfix">
                    <span @click="getItemSearch(item)">{{item.psn}}</span>
                </li>
            </ul>
        </el-dialog>
        <el-dialog title="请输入您要查询的设计款号" :visible.sync="oldPsn">
            <el-input v-model="psn" placeholder="请输入您要查询的设计款号"></el-input>
            <ul class="srcond_menu">
                <p v-if="oldPsnList.length===0">暂无数据</p>
                <li v-for="(item,i) in oldPsnList" :key="i" class="clearfix">
                    <span @click="getItemPsn(item)">{{item.pSn}}</span>
                </li>
            </ul>
        </el-dialog>

        <!-- 编辑弹出框 -->
        <el-dialog title="编辑" :visible.sync="editVisible" width="30%">
            <el-form :model="dialog" label-width="100px">
                <el-form-item label="工艺顺序">
                    <el-input v-model="dialog.sort" type="number"></el-input>
                </el-form-item>                
                <el-form-item label="车间">
                    <el-select v-model="dialog.workshop" placeholder="请选择">
                        <el-option v-for="item in this.doWorkshopList" :key="item.name" :label="item.name" :value="item.name">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="工艺名称">
                    <el-input v-model="dialog.name" type="text"></el-input>
                </el-form-item>
                <el-form-item label="工艺要求">
                    <el-input v-model="dialog.require" type="text"></el-input>
                </el-form-item>
                <el-form-item label="设备工具">
                    <el-input v-model="dialog.tool" type="text"></el-input>
                </el-form-item>

            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="editVisible = false">取 消</el-button>
                <el-button type="primary" @click="saveEdit">确 定</el-button>
            </span>
        </el-dialog>

        <!-- 导入弹窗 -->
        <el-dialog class="importExport" title="导入" :visible.sync="importbox" width="30%" :showClose="false" :show-file-list="false">
            <a class="down" href="/TPA/cStandardOper/downExcel">下载导入模板</a>
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

<!-- console.log(item.id,item.sort,item.workshop,item.name,item.require,item.tool,) -->

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
export default {
    name: "shengchangongxu",
    data() {
        return {
            //按钮disabled
            doAdd: false,
            doCancel: true,
            doImport: false,
            doPrint: true,

            search: "",
            oldSearch: false,
            oldSearchList: [],
            psn: "",
            oldPsn: false,
            oldPsnList: [],

            firstFormNo: true,
            firstFormOn: true,
            firstFormGui: true,

            firstForm: {
                psn: "",
                sort: "",
                workshop: "",
                name: "",
                require: "",
                tool: "",
                sh: "-1", // 审核
                addUser: "",
                addDate: "",
                updateUser: "",
                updateDate: "",
                shUser: "",
                shDate: ""
            },
            //表格数据
            list: [],
            workshop:"",
            doWorkshopList:[],

            //导入弹出开关
            importbox: false,
            importZhe: false, //导入遮罩
            //上传的文件
            fileList: [],

            //编辑弹窗开关
            editVisible: false,
            idx: 0,
            //编辑弹出框数据
            dialog: {},

            multipleSelection:[],           //以选择的table
            statusId:[],                    //审核的数据    [{id:1},{id,2}]

            //分页：当前页码/总数量/每页显示条数
            page: 0,
            total: "",
            pageSize: 10,
            pageOnOff: false,
            //分页排序查询条件
            pageParams: {}
        };
    },
    methods: {
        //按钮初始状态
        emptyBtn() {
            this.doAdd = false;
            this.doCancel = true;
            this.doImport = false;
            this.doExport = false;
            this.doPrint = true;
        },
        //按钮按下状态
        emptyBtnTo() {
            this.doAdd = true;
            this.doCancel = false;
            this.doImport = true;
            this.doExport = true;
            this.doPrint = true;
        },
        //表单1恢复初始空值状态
        emptyFirstForm() {
            this.firstForm = {
                psn: "",
                sort: "",
                workshop: "",
                name: "",
                require: "",
                tool: "",
                sh: "-1", // 审核
                addUser: "",
                addDate: "",
                updateUser: "",
                updateDate: "",
                shUser: "",
                shDate: ""
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
            this.firstFormNo = false;
            this.firstFormOn = false;
            this.firstFormGui = false;
        },

        //新增
        doAdds() {
            this.doCancels();
            this.emptyBtnTo();
            this.noDisabledFirstForm();
            this.getDoWorkshop()
        },
        //取消
        doCancels() {
            this.emptyBtn();
            this.emptyFirstForm();
            this.disabledFirstForm();
            this.pageOnOff = false;

            // this.psn = "";
            // this.oldPsn = false
            this.oldPsnList = [];
            // this.search = "";
            // this.oldSearch = false
            this.oldSearchList = [];

            this.list = [];

            this.fileList = [];
        },
        //first保存
        firstSave() {
            if(this.firstForm.psn){
                this.$http.post('/TPA/cStandardOper/insert',qs.stringify(this.firstForm))
                    .then(res=>{
                        if(res.data.code===0){
                            succ(res.data.msg)
                            this.noDisabledFirstForm()

                            let psn = this.firstForm.psn
                            this.emptyFirstForm()
                            this.firstForm.psn = psn
                            this.workshop = ""

                            this.firstFormGui = true
                            let params = {
                                psn: this.firstForm.psn,
                                page: 0,
                                count: this.pageSize
                            };
                            this.pageParams = params;
                            this.getPageData(this.pageParams);
                        }else{
                            error(res.data.msg)
                        }
                    })
                    .catch(err=>{
                        NetworkAnomaly()
                    })
            }else{
                error('请选择设计款号！')
            }
        },

        //查询
        doSearchs() {
            this.oldSearch = true;
            this.doCancels();
            this.search = "";
        },
        //退出
        doOuts() {
            this.$emit("getOut", this.$route.name);
        },

        //审核
        doExamines() {
            let form = []
            for(let i in this.multipleSelection){
                let obj = {}
                obj.id = this.multipleSelection[i].id
                obj.status = 1
                form.push(obj)
            }
            console.log(form)
            this.$http
                .post("/TPA/cStandardOper/auditing", form)
                .then(res => {
                    if (res.data.code === 0) {
                        succ(res.data.msg);
                        this.getPageData()
                    } else {
                        error(res.data.msg);
                    }
                })
                .catch(err => {
                    NetworkAnomaly();
                });
        },
        //反审
        doExamineAgains() {
            let form = []
            for(let i in this.multipleSelection){
                let obj = {}
                obj.id = this.multipleSelection[i].id
                obj.status = 0
                form.push(obj)
            }
            console.log(form)
            this.$http
                .post("/TPA/cStandardOper/auditing", form)
                .then(res => {
                    if (res.data.code === 0) {
                        succ(res.data.msg);
                        this.getPageData()
                    } else {
                        error(res.data.msg);
                    }
                })
                .catch(err => {
                    NetworkAnomaly();
                });
        },
        //获取设计款号按钮
        doPsn(){
            this.oldPsn = true;
            this.psn = "";            
        },
        //获取车间按钮
        getDoWorkshop(){
            this.$http.post('/TPA/aLbJb/getBySn?sn=026')
                .then(res=>{
                    if(res.data.code===0){
                        this.doWorkshopList = res.data.data
                    }else{
                        error(res.data.msg)
                    }
                })
                .catch(err=>{
                    NetworkAnomaly()
                })
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
            this.importZhe = true;
        },
        //自定义上传
        uploadFile(params) {
            const _file = params.file;
            let formData = new FormData();
            formData.append("file", _file);
                this.$ajax
                    .post("/TPA/cStandardOper/importExcel", formData)
                    .then(res => {
                        console.log(res);
                        if (res.status === 200) {
                            if (res.data.code === 0) {
                                succ(res.data.msg);
                                this.getnavMenu();
                                this.importCancel();
                                this.$refs.upload.clearFiles();
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
        //导出
        doExports() {
            window.location.href = "/TPA/cStandardOper/exportExcel";
        },

        //选择查询的设计编号
        getItemSearch(item) {
            this.emptyBtnTo();
            this.oldSearch = false;
            this.search = ""
            this.disabledFirstForm()

            let params = {
                psn: item.pSn,
                page: 0,
                count: this.pageSize
            };
            this.pageParams = params;
            this.getPageData(this.pageParams);

            // this.oldSearch = false
            // this.search = ""

            // let params = {
            //     psn:this.firstForm.psn,
            //     page:0,
            //     count:this.pageSize
            // }
            // this.pageParams = params
            // this.getPageData(this.pageParams)
        },
        //选择设计编号
        getItemPsn(item) {
            this.firstForm.psn = item.pSn;
            this.emptyBtnTo();
            this.oldPsn = false;
            this.psn = ""
        },

        //编辑单条数据
        handleEdit(index, row) {
            
            this.getDoWorkshop()
            this.idx = index;
            const item = this.list[index];
            
            (this.dialog = {
                id: item.id, //id
                sort: item.sort,
                workshop: item.workshop,
                name: item.name,
                require: item.require,
                tool: item.tool,
            }),
                (this.editVisible = true);
        },
        // 保存编辑
        saveEdit() {
            this.$http
                .post("/TPA/cStandardOper/update", qs.stringify(this.dialog))
                .then(res => {
                    if (res.data.code === 0) {
                        this.$set(this.list, this.idx, this.dialog);
                        this.editVisible = false;
                        succ(res.data.msg);
                        this.getPageData();
                    } else {
                        error(res.data.msg);
                    }
                })
                .catch(err => {
                    NetworkAnomaly();
                });
        },
        //删除表格的单条数据
        tableDelete(index, row) {
            this.idx = index;
            const item = this.list[index];
            this.$http
                .post("/TPA/cStandardOper/delete?id=" + item.id)
                .then(res => {
                    if (res.data.code === 0) {
                        succ(res.data.msg);
                        this.getPageData();
                    } else {
                        error(res.data.msg);
                    }
                })
                .catch(err => {
                    NetworkAnomaly();
                });
        },

        //获取table选择的表格
        handleSelectionChange(val) {
            this.multipleSelection = val;
        },

        //分页
        getPageData() {
            this.$http
                .post(
                    "/TPA/cStandardOper/search",
                    qs.stringify(this.pageParams)
                )
                .then(res => {
                    if (res.data.code === 0) {
                        this.doPrint = false;
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
        }
    },
    computed: {
        ...mapState(["collapse"])
    },
    watch: {
        page() {
            this.pageParams.page = this.page - 1;
            this.getPageData();
        },
        //获取设计编号
        psn() {
            if (this.psn) {
                let search = {
                    pSn: 17 + "|" + this.psn
                };
                let searchStr = JSON.stringify(search);
                this.$http
                    .post("/TPA/cSpda/search?sp=1&search=" + searchStr)
                    .then(res => {
                        if (res.data.code === 0) {
                            this.oldPsnList = res.data.data.list;
                        } else {
                            error(res.data.msg);
                        }
                    })
                    .catch(err => {
                        NetworkAnomaly();
                    });
            } else {
                this.oldPsnList = [];
            }
            this.doAdd = false;
        },
        //获取查询设计编号
        search() {
            if (this.search) {
                let search = {
                    psn: 17 + "|" + this.search
                };
                let searchStr = JSON.stringify(search);
                this.$http
                    .post("/TPA/cStandardOper/search?search=" + searchStr)
                    .then(res => {
                        if (res.data.code === 0) {
                            this.oldSearchList = res.data.data.list;
                        } else {
                            error(res.data.msg);
                        }
                    })
                    .catch(err => {
                        NetworkAnomaly();
                    });
            } else {
                this.oldPsnList = [];
            }
            this.doAdd = false;
        },
        workshop(){
            if(this.workshop){
                this.firstForm.workshop = this.workshop
            }
        },
        oldSearch(){
            if(!this.oldSearch){
                this.search = ""
            }
        },
    }
};
</script>

<style lang="stylus" scoped>
@import './css/style.styl'
.firstForm>>>.el-input--suffix .el-input__inner
    width 100% !important
.firstForm>>>.el-input--suffix, .firstForm>>>.el-input__inner
    height 3.5vh !important
.firstForm>>>.el-input__icon
    line-height 3.5vh

.container>>>.el-dialog
    width 400px
    height 500px
    overflow-x hidden
    .el-select
        width 100%
.container>>>.el-table td, .container>>>.el-table th
    padding 0
.container>>>.el-table .cell
    line-height 4.5vh
    height 4.5vh
    text-align center
    font-size 1.3vh !important
    white-space pre-line !important
.srcond_menu
    li
        &:hover
            background #d2d2d2
        span
            padding-left 2vh
            line-height 3vh

.order_table
    width 86.5vw
    margin-top 2vh
    height 51.5vh
    overflow hidden
    .el-button
        padding .5vh 1vh
        margin-top 0.4vh
        border 0.1vh solid #d2d2d2
        &.btn
            border 0.1vh solid #409eff
            color #409eff                 
</style>