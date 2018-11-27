<template>
    <div class="container" :class="{container_collapse:collapse}">
        <p class="page_title">物料规格</p>
        <div class="btn-box">
            <button :disabled='doAdd' :class="{button_btn:!doAdd}" @click="doAdds">新增</button>
            <button :disabled='doImport' :class="{button_btn:!doImport}" @click="doImports">导入</button>
            <button :disabled='doImport' :class="{button_btn:!doImport}" @click="doExports">导出</button>            
            <button :disabled='doCancel' :class="{button_btn:!doCancel}" @click="doCancels">取消</button>
            <button class="button_btn" @click="doSearchs" >查询</button>
            <input type="text"  class="doSearch" v-model="search" readonly @click="doSearchs" placeholder="请选择">
            <button class="button_btn" @click="doOuts">退出</button>
            <button class="button_btn" @click="refresh">刷新</button>
        </div>

        <div class="set_box">
            <div class="menu_box">
                <el-menu @select="menuSelected" unique-opened background-color="#f2f2f2" text-color="#303133" active-text-color="#303133">
                    <nav-menu :navMenus="this.navMenus"></nav-menu>
                </el-menu>
            </div>
            <div class="set_info">
                <div class="firstForm">
                    <ul class="clearfix">
                        <li class="gui">
                            <label>归属</label>
                            <input type="text" placeholder="顶级" v-model="firstForm.typeSn" readonly :disabled="firstFormGui" class="gui_num" @click="openGui">
                            <input type="text" placeholder="顶级" v-model="firstForm.type" readonly :disabled="firstFormGui" @click="openGui">
                            <button :disabled="firstFormGui" :class="{btn:!firstFormGui}" @click="openGui">。。。</button>
                        </li>
                        <li>
                            <label>编号</label>
                            <input type="text" disabled v-model="firstForm.sn">
                        </li>
                        <li>
                            <label>物料规格名称</label>
                            <input type="text" :disabled="firstFormOn"   v-model="firstForm.name" placeholder="请输入">
                        </li>
                        <button :disabled="firstFormOn" :class="{btn:!firstFormOn}" @click="firstSave"  class="save">保存</button>
                    </ul>
                </div>

                <div class="secondForm">
                    <div class="order_table">
                        <el-table :data="list" height="46.5vh" border style="width: 100%">
                            <el-table-column prop="name" label="物料规格名称" min-width="50%">
                            </el-table-column>
                            <el-table-column label="操作" min-width="50%">
                                <template slot-scope="scope">
                                    <el-button :disabled="(scope.row.status == 1)" :class="{btn:(scope.row.status == 1)}" @click="effective(scope.$index, scope.row)" type="text">有效</el-button>
                                    <el-button :disabled="(scope.row.status == 0)" :class="{btn:(scope.row.status == 0)}" @click="invalid(scope.$index, scope.row)" type="text">无效</el-button>
                                </template>
                            </el-table-column>
                        </el-table>
                    </div>
                </div>
            </div>
        </div>

        <div class="pageBox" v-if="pageOnOff">
            <ul class="pageData">
                <!-- <li>
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
                </li> -->
            </ul>
            <el-pagination v-if="pageOnOff" background :page-size="pageSize" :pager-count="5" :total="total" @current-change="currentPage">
            </el-pagination>
        </div>   


        <el-dialog title="归属" :visible.sync="oldMenu">
            <ul class="srcond_menu">
                <li v-if="navMenus.length===0">暂无数据</li>
                <li v-for="(item,i) in navMenus" :key="i">
                    <span>|--{{item.entity.name}}</span>
                    <div class="second" v-for="(items,i) in item.childs" :key="i">
                        <p>|--{{items.entity.name}}</p>
                        <div class="second" v-for="(itemss,i) in items.childs" :key="i">
                            <p>|--{{itemss.entity.name}}</p>
                            <div class="second" v-for="(itemsss,i) in itemss.childs" :key="i">
                                <p @click="getOldMenu(itemsss)">|--{{itemsss.entity.name}}</p>                                
                            </div>
                        </div>
                    </div>
                </li>
            </ul>
        </el-dialog>

        <el-dialog title="查询" :visible.sync="oldSearch">
            <el-input v-model="search" placeholder="请输入您要查询的物料规格名称"></el-input>
            <ul class="srcond_menu">
                <li v-if="searchList.length===0">暂无数据</li>
                <li class="clearfix" v-for="(item,i) in searchList" :key="i">
                    <span class="search" @click="getSearchItem(item)">|--{{item.name}}</span>
                </li>
            </ul>
        </el-dialog>       

        <!-- 导入弹窗 -->
        <el-dialog class="importExport" title="导入" :visible.sync="importbox" width="30%" :showClose="false" :show-file-list="false">
            <a class="down" href="/TPA/cSpecification/downExcel">下载导入模板</a>
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
        <el-dialog title="导入提示" :visible.sync="tipOffON">
            <ul class="srcond_menu">
                <li>
                    <span>是否下载错误提示文件</span>
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
import NavMenu from "@/components/pageCommon/NavMenu";
export default {
    name: "wuliaoguige",
    data() {
        return {
            //按钮disabled
            doAdd: false,
            doCancel: true,
            doImport: false,
            doSearch:true,

            //form的disabled
            firstFormNo: true,
            firstFormOn: true,
            firstFormGui: true,   
            
            //bind值
            search: "", //查询
            //模糊查询框开关
            oldSearch: false,      
            //模糊查询框列表
            searchList: [],

            navMenus: [], //导航数据

            oldMenu: false,
            oldList:[],
            
            firstForm:{
                sn:"",
                name:"",
                type:"",
                typeSn:"",
                addUser:"",
                addDate:"",
                updateUser:"",
                updateDate:"",
            },
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
            isCover:false,      //默认导入不覆盖
            project:"",         //错误文件名
            //上传的文件
            fileList: [],
            Tips:"",               //错误提示
            tipOffON: false,        //错误文件下载开关
           
        };
    },
    mounted() {
        this.getnavMenu()
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
                sn:"",
                name:"",
                type:"",
                typeSn:"",
                addUser:"",
                addDate:"",
                updateUser:"",
                updateDate:"",
            }
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
        },
        //取消
        doCancels() {
            this.emptyBtn();
            this.emptyFirstForm();
            this.disabledFirstForm();

            this.search = ""

            this.oldMenu = false;
            this.oldList = []

            this.list = [];
            this.pageOnOff = false
        },
        //刷新
        refresh() {
            this.getnavMenu();
            this.doCancels();
            succ("刷新成功");
        },

        //点击查询按钮
        doSearchs() {
            this.oldSearch = true;
            this.search = ""
            this.searchList = []
        },
        //选择查询
		getSearchItem(item){
            this.oldSearch = false
            this.doCancel = false
            this.search = item.name  
            this.firstForm = item
        },
        //搜索
        getSearch(name){
            let search = {
                name: 17 + "|" + name
            };
            let searchStr = JSON.stringify(search);                
            this.$http.post('/TPA/cSpecification/search?search='+searchStr)
            .then(res=>{
                if(res.data.code===0){
                    this.searchList = res.data.data.list
                }
            })
            .catch(err=>{
                NetworkAnomaly()
            })
        },                
        //退出
        doOuts() {
            this.$emit("getOut", this.$route.name);
        },  
        //保存
        firstSave() {
            this.$http
                .post("/TPA/cSpecification/insert", qs.stringify(this.firstForm))
                .then(res => {
                    if (res.data.code === 0) {
                        succ(res.data.msg);
                        this.firstForm.sn = ""
                        this.firstForm.name = ""
                        let params = {
                            typeSn: this.firstForm.typeSn,
                            page: 0,
                            count: this.pageSize
                        };
                        this.pageParams = params;
                        this.getPageData();
                        this.emptyBtn()
                        this.disabledFirstForm()
                        this.firstFormOn = false
                        this.doAdd = false
                        this.doCancel = false
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
            this.importZhe = true;
        },
        //自定义上传
        uploadFile(params) {
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
                            }else if(res.data.code === 100){
                                this.tipOffON = true;
                                this.project = res.data.attachment.name
                                console.log(this.project)
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
            window.location.href = "/TPA/cSpecification/exportExcel";
        },
        
        
        //导航展开查询table
        menuSelected(index) {
            this.pageOnOff = false;
            this.doCancel = false;
            let data = index.split(",");
            
            this.disabledFirstForm()
            this.getItem(data[1])
            let params = {
                typeSn: data[0],
                page: 0,
                count: this.pageSize
            };
            this.pageParams = params;
            this.getPageData();
            this.emptyFirstForm();
        },
        //查询自身
        getItem(id){
            this.$http.post('/TPA/aLbCh/get?id='+id)
                .then(res=>{
                    if(res.data.code===0){
                        this.firstForm = res.data.data
                        this.firstForm.type = res.data.data.pidName
                        this.firstForm.typeSn = res.data.data.pidSn
                    }else{
                        error(res.data.msg)
                    }
                })
                .catch(err=>{
                    NetworkAnomaly()
                })
        },
        //获取nav
        getnavMenu() {
            this.$http
                .post("/TPA/cSpecification/tree")
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
        getOldMenu(item){
           this.firstForm.type = item.entity.name
           this.firstForm.typeSn = item.entity.sn
           this.oldMenu = false
        },  
        
        //table有效
        effective(index, row) {
            this.idx = index;
            const item = this.list[index];
            item.status = 1;
            this.$http
                .post("/TPA/cSpecification/status", qs.stringify(item))
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
            const item = this.list[index];
            item.status = 0;
            this.$http
                .post("/TPA/cSpecification/status", qs.stringify(item))
                .then(res => {
                    if (res.status == 200 && res.data.code === 0) {
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
        //获取分页数据
        getPageData() {
            this.$http
                .post("/TPA/cSpecification/search", qs.stringify(this.pageParams))
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

        //获取页码
        currentPage(val){
            this.page = val
        },  
         
    },
    computed: {
        ...mapState(["collapse"])
    },
    components: {
        NavMenu
    },
    watch: {
        //翻页
        page() {
            this.pageParams.page = this.page - 1;
            this.getPageData();
        },    
        //查询    
        search(){
            if(this.search.length!==0){
                this.getSearch(this.search)
            }
        },
        //错误文件下载框消失的时候把消除上传记录
        importbox(){
            if(!this.importbox){
                this.$refs.upload.clearFiles();
            }
        }

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
    height 4vh
    line-height 4vh
    text-align center
    font-size 1.6vh
.secondForm>>>.el-table__empty-block
    min-height 4vh
.container>>>.el-dialog
    width 400px
    height 400px
    overflow-x hidden
.container>>>.el-dialog__body
    cursor pointer !important
    line-height 4vh
    font-weight bold
    padding 1vh 2vh
.el-select>>>.el-input
    display inline-block
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
