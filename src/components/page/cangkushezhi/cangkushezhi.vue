<template>
    <div class="container" :class="{container_collapse:collapse}">
        <!-- 页面标题 -->
        <p class="page_title">仓库设置</p>

        <!-- 顶部操作按钮 -->
        <div class="btn-box">
            <button :class="{button_btn:!doAdd}" :disabled="doAdd" @click="doAdds">新增</button>
            <button :class="{button_btn:!doCancel}" :disabled="doCancel" @click="doCancels">取消</button>
            <button :class="{button_btn:!doImport}" :disabled="doImport" @click="doImports">导入</button>
            <button :class="{button_btn:!doImport}" :disabled="doImport" @click="doExports">导出</button>
            <button class="button_btn" @click="doSearchs">查询</button>
            <input type="text" class="doSearch" readonly placeholder="请选择" @click="doSearchs">
            <button class="button_btn" @click="doOuts">退出</button>
            <button class="button_btn" @click="refresh">刷新</button>
            <div class="btn_right">
                <button class="button_btn" @click="doExamines">审核</button>
                <button class="button_btn" @click="doExamineAgains">反审</button>
            </div>
        </div>

        <div class="set_box">
            <div class="menu_box">
                <el-menu unique-opened @select="menuSelected" background-color="#f2f2f2" text-color="#303133" active-text-color="#303133">
                    <nav-menu :navMenus="this.navMenus"></nav-menu>
                </el-menu>
            </div>

            <div class="set_info">
                <div class="firstForm">
                    <ul class="clearfix">
                        <li class="gui">
                            <label>公司</label>
                            <input type="text" placeholder="必选" v-model="firstForm.gsSn" readonly :disabled="firstFormGui" class="gui_num" @click="handleGsName">
                            <input type="text" placeholder="必选" v-model="firstForm.gsName" readonly :disabled="firstFormGui" @click="handleGsName">
                            <button :disabled="firstFormGui" :class="{btn:!firstFormGui}" @click="handleGsName">。。。</button>
                        </li>
                        <li class="gui">
                            <label>仓库</label>
                            <input type="text" placeholder="必填" v-model="firstForm.sn" :disabled="firstFormGui" class="gui_num">
                            <input type="text" placeholder="必填" v-model="firstForm.name" :disabled="firstFormGui">
                        </li>
                        <li class="date">
                            <label>生效日期</label>
                            <el-date-picker :disabled="firstFormOn" v-model="firstForm.activeDate" type="date" placeholder="选择日期" format="yyyy 年 MM 月 dd 日" value-format="yyyy-MM-dd"> </el-date-picker>
                        </li>
                        <li>
                            <label>库区</label>
                            <input type="text" placeholder="必填" :disabled="firstFormOn" v-model="firstForm.areaName">
                        </li>
                        <li>
                            <label>简称</label>
                            <input type="text" placeholder="必填" :disabled="firstFormOn" v-model="firstForm.jc">
                        </li>
                        <li>
                            <label>列起</label>
                            <input type="text" placeholder="必填" :disabled="firstFormOn" v-model="firstForm.rowStart">
                        </li>
                        <li>
                            <label>列止</label>
                            <input type="text" placeholder="必填" :disabled="firstFormOn" v-model="firstForm.rowEnd">
                        </li>
                        <li>
                            <label>排起</label>
                            <input type="text" placeholder="必填" :disabled="firstFormOn" v-model="firstForm.columnStart">
                        </li>
                        <li>
                            <label>排止</label>
                            <input type="text" placeholder="必填" :disabled="firstFormOn" v-model="firstForm.columnEnd">
                        </li>
                        <li>
                            <label>层起</label>
                            <input type="text" placeholder="必填" :disabled="firstFormOn" v-model="firstForm.layerStart">
                        </li>
                        <li>
                            <label>层止</label>
                            <input type="text" placeholder="必填" :disabled="firstFormOn" v-model="firstForm.layerEnd">
                        </li>
                        <button :disabled="firstFormOn" :class="{btn:!firstFormOn}" class="save" @click="dosave">保存</button>
                    </ul>
                </div>

                <!-- 表格内容 -->
                <div class="order_table">
                    <el-table :data="list" stripe height="50vh" style="width: 100%">
                        <el-table-column prop="name" label="仓库" min-width="12%">
                            <template slot-scope="scope">
                                <el-tooltip :content="scope.row.name" placement="top" :enterable="false">
                                    <p>{{ scope.row.name }}</p>
                                </el-tooltip>
                            </template>
                        </el-table-column>
                        <el-table-column prop="areaName" label="库区" min-width="12%">
                            <template slot-scope="scope">
                                <el-tooltip :content="scope.row.areaName" placement="top" :enterable="false">
                                    <p>{{ scope.row.areaName }}</p>
                                </el-tooltip>
                            </template>
                        </el-table-column>
                        <el-table-column prop="jc" label="简称" min-width="8%">
                        </el-table-column>
                        <el-table-column prop="rowStart" label="列起数" min-width="8%">
                        </el-table-column>
                        <el-table-column prop="rowEnd" label="列止数" min-width="8%">
                        </el-table-column>
                        <el-table-column prop="columnStart" label="排起数" min-width="8%">
                        </el-table-column>
                        <el-table-column prop="columnEnd" label="排止数" min-width="8%">
                        </el-table-column>
                        <el-table-column prop="layerStart" label="层起数" min-width="8%">
                        </el-table-column>
                        <el-table-column prop="layerEnd" label="层止数" min-width="8%">
                        </el-table-column>
                        <el-table-column fixed="right" label="操作" min-width="20%">
                            <template slot-scope="scope">
                                <el-button :disabled='(scope.row.sh==1)' :class="{btn:(scope.row.sh==0)}" @click="handleEdit(scope.$index, scope.row)" type="text">修改</el-button>
                                <el-button :disabled="(scope.row.status == 1||scope.row.sh == 1)" :class="{btn:(scope.row.status == 0&&scope.row.sh == 0)}" @click="effective(scope.$index, scope.row)" type="text">有效</el-button>
                                <el-button :disabled="(scope.row.status == 0||scope.row.sh == 1)" :class="{btn:(scope.row.status == 1&&scope.row.sh == 0)}" @click="invalid(scope.$index, scope.row)" type="text">无效</el-button>

                            </template>
                        </el-table-column>
                    </el-table>
                </div>
            </div>
        </div>

        <div class="pageBox" :class="{collapse:collapse}">
            <el-pagination v-if="pageOnOff" background :page-size="pageSize" :pager-count="5" :total="total" @current-change="currentPage">
            </el-pagination>
        </div>

        <!-- 公司 -->
        <el-dialog title="公司" :visible.sync="oldGsName">
            <ul class="srcond_menu">
                <li v-if="oldGsNameList.length===0">暂无数据</li>
                <li v-for="(item,i) in oldGsNameList" :key="i">
                    <span @click="getItemGsName(item)">|--{{item.name}}</span>
                </li>
            </ul>
        </el-dialog>

        <!-- 查询框 -->
        <el-dialog title="查询公司" :visible.sync="oldSearch">
            <el-input v-model="search" placeholder="公司"></el-input>
            <button class="button_btn" @click="vagueSearch">查询</button>            
            <ul class="srcond_menu">
                <p v-if="oldSearchList.length===0">暂无数据</p>
                <li v-for="(item,i) in oldSearchList" :key="i" class="clearfix">
                    <span @click="getItemSearch(item)">{{item.gsName}}</span>
                </li>
            </ul>
        </el-dialog>

        <!-- 编辑弹出框 -->
        <el-dialog title="编辑" class="edit" :visible.sync="editVisible" width="30%">
            <el-form :model="dialog" label-width="100px">
                <el-form-item label="列起">
                    <el-input v-model="dialog.rowStart" type="number"></el-input>
                </el-form-item>
                <el-form-item label="止">
                    <el-input v-model="dialog.rowEnd" type="number"></el-input>
                </el-form-item>
                <el-form-item label="排起">
                    <el-input v-model="dialog.columnStart" type="number"></el-input>
                </el-form-item>
                <el-form-item label="止">
                    <el-input v-model="dialog.columnEnd" type="number"></el-input>
                </el-form-item>
                <el-form-item label="层起">
                    <el-input v-model="dialog.layerStart" type="number"></el-input>
                </el-form-item>
                <el-form-item label="止">
                    <el-input v-model="dialog.layerEnd" type="number"></el-input>
                </el-form-item>

            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="editVisible = false">取 消</el-button>
                <el-button type="primary" @click="saveEdit">确 定</el-button>
            </span>
        </el-dialog>

        <!-- 导入弹窗 -->
        <el-dialog class="importExport" title="导入" :visible.sync="importbox" width="30%" :showClose="false" :show-file-list="false">
            <a class="down" href="/TPA/aRepertory/downExcel">下载导入模板</a>
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

            //form的disabled
            firstFormNo: true,
            firstFormOn: true,
            firstFormGui: true,

            search: "",
            oldSearch: false, //查询框开关
            oldSearchList: [], //查询框列表
            gsName: "",
            oldGsName: false, //公司开关
            oldGsNameList: [], //公司列表

            navMenus: [], //导航数据

            firstForm: {
                activeDate: "", //生效日期
                gsSn: "", //公司编号
                gsName: "", //公司名称
                sn: "", //仓库编号
                name: "", //仓库名称
                areaSn: "", //库区编码
                areaName: "", //库区名称
                jc: "",
                rowStart: "", //列起
                rowEnd: "", //列止
                columnStart: "", //排起
                columnEnd: "", //排止
                layerStart: "", //层起
                layerEnd: "", //层止
                addDate: "", //编制日期
                addUser: "", //编制人
                status: "-1", //有效状态
                updateUser: "", //修改用户
                updateDate: "", //修改时间
                sh: "-1", //审核
                shUser: "", //审核人
                shDate: "", //审核日期
                gsSn: "" //
            },
            list: [],

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
                activeDate: "", //生效日期
                gsSn: "", //公司编号
                gsName: "", //公司名称
                sn: "", //仓库编号
                name: "", //仓库名称
                areaSn: "", //库区编码
                areaName: "", //库区名称
                jc: "",
                rowStart: "", //列起
                rowEnd: "", //列止
                columnStart: "", //排起
                columnEnd: "", //排止
                layerStart: "", //层起
                layerEnd: "", //层止
                addDate: "", //编制日期
                addUser: "", //编制人
                status: "-1", //有效状态
                updateUser: "", //修改用户
                updateDate: "", //修改时间
                gsSn: "", //
                sh: "-1"
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
            this.emptyBtnTo();
            this.noDisabledFirstForm();

            this.getGsName(); //获取公司列表
        },
        // 保存
        dosave() {
            let terms =
                this.firstForm.gsSn ||
                this.firstForm.gsName ||
                this.firstForm.sn ||
                this.firstForm.name ||
                this.firstForm.areaName ||
                this.firstForm.jc ||
                this.firstForm.rowStart ||
                this.firstForm.rowEnd ||
                this.firstForm.columnStart ||
                this.firstForm.columnEnd ||
                this.firstForm.layerStart ||
                this.firstForm.layerEnd ||
                this.firstForm.activeDate;

            console.log(this.firstForm);

            if (!terms) {
                error("请完善表单必填项！");
            } else {
                this.$http
                    .post("/TPA/aRepertory/insert", qs.stringify(this.firstForm))
                    .then(res => {
                        if (res.data.code === 0) {
                            succ(res.data.msg);
                            this.getnavMenus();
                            let gsSn = this.firstForm.gsSn;
                            let gsName = this.firstForm.gsName;
                            let sn = this.firstForm.sn;
                            let name = this.firstForm.name;

                            this.emptyFirstForm();
                            this.firstForm.gsSn = gsSn;
                            this.firstForm.gsName = gsName;
                            this.firstForm.sn = sn;
                            this.firstForm.name = name;
                            this.firstFormGui = true;

                            this.getPageData(this.firstForm.gsName)
                        } else {
                            error(res.data.msg);
                        }
                    })
                    .catch(err => {
                        NetworkAnomaly();
                    });
                this.oldGsNameList = [];
            }
        },
        //取消
        doCancels() {
            this.emptyBtn();
            this.emptyFirstForm();
            this.disabledFirstForm();

            this.list = [];
            this.search = "";
            this.oldSearch = false; //查询框开关
            this.oldSearchList = []; //查询框列表
            this.gsName = "";
            this.oldGsName = false; //公司开关
            this.oldGsNameList = []; //公司列表
        },
        //修改
        doEdits() {},
        //点击查询按钮
        doSearchs() {
            this.search = "";
            this.oldSearch = true;
            this.oldSearchList = [];
        },
        //刷新
        refresh() {
            this.getnavMenus();
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
                .post("/TPA/aRepertory/importExcel", formData)
                .then(res => {
                    console.log(res);
                    if (res.status === 200) {
                        if (res.data.code === 0) {
                            succ(res.data.msg);
                            this.getnavMenus();
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
            window.location.href = "/TPA/aRepertory/exportExcel";
        },

        //点击公司开关
        handleGsName() {
            this.oldGsName = true;
            this.gsName = "";
        },
        //获取公司列表
        getGsName() {
            this.$http
                .post("/TPA/aRepertory/getBy")
                .then(res => {
                    if (res.data.code === 0) {
                        this.oldGsNameList = res.data.data;
                    } else {
                        error(res.data.msg);
                    }
                })
                .catch(err => {
                    NetworkAnomaly();
                });
        },
        //选择公司
        getItemGsName(item) {
            this.oldGsName = false;

        },
        //选择查询
        getItemSearch(item) {
            this.oldSearch = false
            console.log(item);
            
            this.getPageData(item.gsName)
            this.doCancels()           
        },

        //获取导航
        getnavMenus() {
            this.$http
                .post("/TPA/aRepertory/tree")
                .then(res => {
                    if (res.data.code === 0) {
                        this.navMenus = res.data.data;
                    } else {
                        error(res.data.msg);
                    }
                })
                .catch(err => {
                    NetworkAnomaly();
                });
        },
        //导航展开查询table
        menuSelected(index) {
            this.doCancels()
            this.getPageData(index);
            this.emptyBtnTo();
            this.doAdd = false;
        },
        //审核
        doExamines() {
            this.$http
                .post("/TPA/aRepertory/auditing?status=1&gsSn=" + this.list[0].gsSn)
                .then(res => {
                    if (res.data.code === 0) {
                        succ(res.data.msg);
                        this.getPageData(this.list[0].gsName);
                    } else {
                        error(res.data.msg);
                    }
                })
                .catch(err => {
                    NetworkAnomaly();
                });
        },
        //反审核
        doExamineAgains() {
            this.$http
                .post("/TPA/aRepertory/auditing?status=0&gsSn=" + this.list[0].gsSn)
                .then(res => {
                    if (res.data.code === 0) {
                        succ(res.data.msg);
                        this.getPageData(this.list[0].gsName);
                    } else {
                        error(res.data.msg);
                    }
                })
                .catch(err => {
                    NetworkAnomaly();
                });
        },

        //分页-查询列表
        getPageData(name) {
            this.$http
                .post("/TPA/aRepertory/search?gsName=" + name)
                .then(res => {
                    if (res.data.code === 0) {
                        this.list = res.data.data.list;
                    } else {
                        error(res.data.msg);
                    }
                })
                .catch(err => {
                    NetworkAnomaly();
                });
        },
        //编辑单条数据
        handleEdit(index, row) {
            this.idx = index;
            const item = this.list[index];
            this.dialog = {
                id: item.id, //id
                rowStart: item.rowStart,
                rowEnd: item.rowEnd,
                columnStart: item.columnStart,
                columnEnd: item.columnEnd,
                layerStart: item.layerStart,
                layerEnd: item.layerEnd,
                gsName: item.gsName
            };
            this.editVisible = true;
        },
        // 保存编辑
        saveEdit() {
            this.$http
                .post("/TPA/aRepertory/update", qs.stringify(this.dialog))
                .then(res => {
                    if (res.data.code === 0) {
                        this.$set(this.list, this.idx, this.dialog);
                        this.editVisible = false;
                        succ(res.data.msg);
                        this.getPageData(this.dialog.gsName);
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
            item.status = 1;
            this.$http
                .post("/TPA/aRepertory/status", qs.stringify(item))
                .then(res => {
                    if (res.data.code === 0) {
                        console.log(0)
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
                .post("/TPA/aRepertory/status", qs.stringify(item))
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
        //获取页码
        currentPage(val) {
            this.page = val;
        },

        //模糊查询
        vagueSearch(){
            this.oldSearchList = []
            if(this.search){
                let search = {
                    gsName: 17 + "|" + this.search
                };
                let searchStr = JSON.stringify(search);  
                this.$http
                    .post("/TPA/aRepertory/search?search=" + searchStr)
                    .then(res => {
                        if(res.data.code===0){
                            if(res.data.data.list.length>0){
                                this.oldSearchList = res.data.data.list;
                            }else{
                                error('暂无数据') 
                                this.oldSearchList = []           
                            }
                        }else{
                            errorres.data.msg()
                        }
                    })
                    .catch(err => {
                        NetworkAnomaly();
                    });                    
            }else{
                error('请输入搜索条件！')                
            }
        }
    },
    mounted() {
        this.getnavMenus();
    },
    watch: {
        //错误文件下载框消失的时候把消除上传记录
        importbox() {
            if (!this.importbox) {
                this.$refs.upload.clearFiles();
            }
        },

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
@import './css/style.styl'
</style>

