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

                <button :disabled="multipleSelection.length==0"  :class="{button_btn:multipleSelection.length>0}" @click="doExamines">审核</button>
                <button  :disabled="multipleSelection.length==0" :class="{button_btn:multipleSelection.length>0}" @click="doExamineAgains">反审</button>
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
                    <el-input v-model="dialog.require" type="textarea"></el-input>
                </el-form-item>
                <el-form-item label="设备工具">
                    <el-input v-model="dialog.tool" type="textarea"></el-input>
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
        <!-- topNav模糊搜索 -->
        <vagueSearch v-if="oldSearch" :onoff="oldSearch" :tip="oldSearchTip" :url="vagueSearchUrl" v-on:listenOnOff="listenToOnOff" v-on:listenItem="listenToItem"/>
        <!-- topNav模糊搜索设计款号 -->
        <vagueSearch v-if="oldPsn" :onoff="oldPsn" :tip="oldPsnTip" :url="vaguePsnUrl" v-on:listenOnOff="listenToPsn" v-on:listenItem="listenToPsnItem"/>


    </div>
</template>

<script>
import "@/assets/js/import.js"; //导入请求超时拦截
import { mapState } from "vuex";
import {
    NetworkAnomaly,             //网络错误
    succ,                       //成功
    error,                      //失败
    getOut,                     //退出
    terms                       //条件判断是否为空
} from "../../../assets/js/message.js";
import vagueSearch from "@/components/pageCommon/vagueSearch";  //模糊查询组件
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

            search:"",
            oldSearch:false,                                        //头部模糊搜索组件开关
            oldSearchTip:"请输入您要查询的设计款号",
            vagueSearchUrl:"/TPA/cSpda/option?psnXz=1&psn=",              //搜索接口地址

            oldPsn: false,
            oldPsnTip:"请输入您要查询的设计款号",
            vaguePsnUrl:"/TPA/cSpda/option?psnXz=1&psn=",              //搜索接口地址

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
            isCover:false,      //默认导入不覆盖
            project:"",         //错误文件名
            //上传的文件
            fileList: [],
            Tips:"",               //错误提示
            tipOffON: false,        //错误文件下载开关

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
            let terms = this.firstForm.psn==false||this.firstForm.workshop==false||this.firstForm.name==false||this.firstForm.sort==false||this.firstForm.require==false||this.firstForm.tool==false
            
            if(!terms){
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
                error('请完善表单必填项')
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
                        this.getPageData(this.pageParams)
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
                        this.getPageData(this.pageParams)
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
        },
        //自定义上传
        uploadFile(params) {
            this.importZhe = true;
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
            window.location.href = "/TPA/cStandardOper/exportExcel";
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
        },
        
        //接收模糊查询开关
        listenToOnOff(data){
            this.oldSearch = data
        },
        //接收模糊查询数据
        listenToItem(data){
            if(data.length>0){
                this.emptyBtnTo();
                this.search = ""
                this.disabledFirstForm()

                let params = {
                    psn: data[0],
                    page: 0,
                    count: this.pageSize
                };
                this.pageParams = params;
                this.getPageData(this.pageParams);
            }
                     
        },   
        //接收模糊查询设计款号开关
        listenToPsn(data){
            this.oldPsn = data
        },
        //接收模糊查询设计款号数据
        listenToPsnItem(data){
            if(data.length>0){
                this.firstForm.psn = data[0];
                this.emptyBtnTo();                
            }
                     
        },   

    },
    computed: {
        ...mapState(["collapse"])
    },
    watch: {
        page() {
            this.pageParams.page = this.page - 1;
            this.getPageData();
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
    },
    components: {
        vagueSearch
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
    width 500px
    height 550px
    overflow-x hidden
    .el-dialog__headerbtn
        border none
      
    .el-select
        width 100%
.container>>>.el-table td, .container>>>.el-table th
    padding 0
.container>>>.el-table .cell
    line-height 4.5vh
    height 4.5vh
    white-space: nowrap !important
    text-overflow:ellipsis !important
    overflow:hidden !important
    text-align center
    font-size 1.3vh !important
    // white-space pre-line !important
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