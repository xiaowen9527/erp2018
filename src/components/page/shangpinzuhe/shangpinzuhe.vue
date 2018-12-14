<template>
    <div class="container" :class="{container_collapse:collapse}">
        <!-- 页面标题 -->
        <p class="page_title">商品组合</p>

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
                        <li class="date">
                            <label>生效日期</label>
                            <el-date-picker :disabled="firstFormOn" v-model="firstForm.activeDate" type="date" placeholder="选择日期" format="yyyy 年 MM 月 dd 日" value-format="yyyy-MM-dd"> </el-date-picker>
                        </li>
                        <li>
                            <label>虚拟款号</label>
                            <input type="text" placeholder="必选" :disabled="firstFormOn" readonly v-model="firstForm.fictPsn" @click="doFictColors">
                        </li>
                        <li class="input">
                            <el-select class="size" v-model="firstForm.fictColor" :disabled="firstFormOn" placeholder="必选">
                                <el-option v-for="item in color" :key="item.color" :label="item.color" :value="item.color"> </el-option>
                            </el-select>
                        </li>
                        <li class="input">
                            <el-select class="size" v-model="firstForm.fictSize" :disabled="firstFormOn" placeholder="必选">
                                <el-option v-for="item in size" :key="item.size" :label="item.size" :value="item.size"> </el-option>
                            </el-select>
                        </li>
                        <button :disabled="firstFormOn" :class="{btn:!firstFormOn}" class="save" @click="firstSave">保存</button>
                    </ul>
                </div>
                <div class="firstForm secondForm">
                    <ul class="clearfix">
                        <li>
                            <label>设计款号</label>
                            <input type="text" placeholder="必选" :disabled="secondFormOn" readonly v-model="secondForm.psn" @click="doSns">
                        </li>
                        <li class="input">
                            <el-select class="size" v-model="secondForm.color" :disabled="secondFormOn" placeholder="必选">
                                <el-option v-for="item in color" :key="item.color" :label="item.color" :value="item.color"> </el-option>
                            </el-select>
                        </li>
                        <li class="input">
                            <el-select class="size" v-model="secondForm.size" :disabled="secondFormOn" placeholder="必选">
                                <el-option v-for="item in size" :key="item.size" :label="item.size" :value="item.size"> </el-option>
                            </el-select>
                        </li>
                        <li>
                            <label>数量</label>
                            <input type="number" placeholder="必填" :disabled="secondFormOn" v-model="secondForm.number">
                        </li>
                        <button :disabled="secondFormOn" :class="{btn:!secondFormOn}" class="save" @click="secondSave">保存</button>
                    </ul>
                    <!-- 表格内容 -->
                    <div class="order_table">
                        <el-table :data="list" stripe style="width: 100%">
                            <el-table-column prop="activeDate" label="生效日期" min-width="11%">
                            </el-table-column>
                            <el-table-column prop="fictPsn" label="虚拟款号" min-width="11%">
                            </el-table-column>
                            <el-table-column prop="fictColor" label="颜色" min-width="11%">
                            </el-table-column>
                            <el-table-column prop="fictSize" label="尺码" min-width="11%">
                            </el-table-column>
                            <el-table-column prop="psn" label="子款号" min-width="11%">
                            </el-table-column>
                            <el-table-column prop="color" label="颜色" min-width="11%">
                            </el-table-column>
                            <el-table-column prop="size" label="尺码" min-width="11%">
                            </el-table-column>
                            <el-table-column prop="number" label="数量" min-width="11%">
                            </el-table-column>
                            <el-table-column fixed="right" label="操作" min-width="12%">
                                <template slot-scope="scope">
                                    <el-button :disabled='scope.row.sh==1' :class="{btn:scope.row.sh==0}" @click="handleEdit(scope.$index, scope.row)" type="text">修改</el-button>
                                    <el-button :disabled="scope.row.sh == 1" :class="{btn:scope.row.sh == 0}" @click="tableDelete(scope.$index, scope.row)" type="text">删除</el-button>
                                </template>
                            </el-table-column>
                        </el-table>
                    </div>
                </div>

            </div>
        </div>

        <div class="pageBox" :class="{collapse:collapse}">
            <el-pagination v-if="pageOnOff" background :page-size="pageSize" :pager-count="5" :total="total" @current-change="currentPage">
            </el-pagination>
        </div>

        <!-- 查询框 -->
        <el-dialog title="查询" :visible.sync="oldSearch">
            <el-input v-model="search" placeholder="虚拟款号"></el-input>
            <button class="button_btn" @click="vagueSearch">查询</button>
            <ul class="srcond_menu">
                <p v-if="oldSearchList.length===0">暂无数据</p>
                <li v-for="(item,i) in oldSearchList" :key="i" class="clearfix">
                    <span @click="getItemSearch(item)">{{item.fictPsn}}</span>
                </li>
            </ul>
        </el-dialog>

        <!-- 查询虚拟款号 -->
        <el-dialog title="查询" :visible.sync="oldFictColor">
            <el-input v-model="fictColor" placeholder="虚拟款号"></el-input>
            <button class="button_btn" @click="vagueFictColor">查询</button>
            <ul class="srcond_menu">
                <p v-if="oldFictColorList.length===0">暂无数据</p>
                <li v-for="(item,i) in oldFictColorList" :key="i" class="clearfix">
                    <span @click="geiItemFictColor(item)">{{item.psn}}</span>
                </li>
            </ul>
        </el-dialog>
        <!-- 查询款号 -->
        <el-dialog title="查询" :visible.sync="oldSn">
            <el-input v-model="sn" placeholder="款号"></el-input>
            <button class="button_btn" @click="vagueSn">查询</button>
            <ul class="srcond_menu">
                <p v-if="oldSnList.length===0">暂无数据</p>
                <li v-for="(item,i) in oldSnList" :key="i" class="clearfix">
                    <span @click="getItemSn(item)">{{item.psn}}</span>
                </li>
            </ul>
        </el-dialog>
        <!-- 修改时查询款号 -->
        <el-dialog title="查询" :visible.sync="oldDialogSn">
            <el-input v-model="dialogSn" placeholder="款号"></el-input>
            <button class="button_btn" @click="vagueDialogSn">查询</button>
            <ul class="srcond_menu">
                <p v-if="oldDialogSnList.length===0">暂无数据</p>
                <li v-for="(item,i) in oldDialogSnList" :key="i" class="clearfix">
                    <span @click="getItemDialogSn(item)">{{item.psn}}</span>
                </li>
            </ul>
        </el-dialog>

        <!-- 编辑弹出框 -->
        <el-dialog title="编辑" class="edit" :visible.sync="editVisible" width="30%">
            <el-form :model="dialog" label-width="100px">
                <el-form-item label="生效日期">
                    <el-date-picker v-model="dialog.activeDate" type="date" placeholder="选择日期" format="yyyy 年 MM 月 dd 日" value-format="yyyy-MM-dd"> </el-date-picker>
                </el-form-item>
                <el-form-item label="颜色" style="height:4.5vh">
                    <el-select v-model="dialog.color" placeholder="必选" style="width:88%">
                        <el-option v-for="item in color" :key="item.color" :label="item.color" :value="item.color"> </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="尺码" style="height:4.5vh">
                    <el-select v-model="dialog.size" placeholder="必选" style="width:88%">
                        <el-option v-for="item in size" :key="item.size" :label="item.size" :value="item.size"> </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="数量">
                    <el-input v-model="dialog.number" type="number"></el-input>
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
                <el-button slot="trigger" size="small" type="primary" plain>选取</el-button>
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
            doEdit: true,

            //form的disabled
            firstFormNo: true,
            firstFormOn: true,
            firstFormGui: true,
            secondFormNo: true,
            secondFormOn: true,
            secondFormGui: true,

            search: "",
            oldSearch: false, //查询框开关
            oldSearchList: [], //查询框列表
            fictColor: "",
            oldFictColor: false,
            oldFictColorList: [],
            sn: "",
            oldSn: false,
            oldSnList: [],

            dialogSn: "",
            oldDialogSn: false,
            oldDialogSnList: [],

            navMenus: [], //导航数据

            firstForm: {
                activeDate: "", //生效日期
                fictPsn: "", //虚拟款号
                fictColor: "", //虚拟颜色
                fictSize: "", //虚拟尺码
                sh: "-1",
                addDate: "",
                addUser: "",
                shDate: "",
                shUser: "",
                updatehDate: "",
                updateUser: ""
            },
            secondForm: {
                psn: "", //设计款号
                color: "", //颜色
                size: "",
                number: "" //数量
            },
            list: [],
            color: [], //颜色列表
            size: [], //尺码列表

            //编辑弹窗开关
            editVisible: false,
            idx: 0,
            //编辑弹出框数据
            dialog: {},

            //分页：当前页码/总数量/每页显示条数
            page: 0,
            total: "",
            pageSize: 15,
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
            this.firstForm = {
                activeDate: "", //生效日期
                fictPsn: "", //虚拟款号
                fictColor: "", //虚拟颜色
                fictSize: "", //虚拟尺码
                sh: "-1",
                addDate: "",
                addUser: "",
                shDate: "",
                shUser: "",
                updatehDate: "",
                updateUser: ""
            };
        },
        //表单1恢复初始空值状态
        emptySecondForm() {
            this.secondForm = {
                psn: "", //设计款号
                color: "", //颜色
                size: "",
                number: "" //数量
            };
        },
        //禁用表单first
        disabledFirstForm() {
            this.firstFormNo = true;
            this.firstFormOn = true;
            this.firstFormGui = true;
        },
        //禁用表单second
        disabledSecondForm() {
            this.secondFormNo = true;
            this.secondFormOn = true;
            this.secondFormGui = true;
        },
        //开放表单first
        noDisabledFirstForm() {
            this.firstFormNo = true;
            this.firstFormOn = false;
            this.firstFormGui = false;
        },
        //开放表单second
        noDisabledSecondForm() {
            this.secondFormNo = true;
            this.secondFormOn = false;
            this.secondFormGui = false;
        },

        //新增
        doAdds() {
            this.doCancels();
            this.emptyBtnTo();
            this.noDisabledFirstForm();
        },

        //
        firstSave() {
            // let terms = !this.firstForm.activeDate||!this.firstForm.fictPsn||!this.firstForm.fictColor||!this.fictSize
            let terms =
                !this.firstForm.activeDate ||
                !this.firstForm.fictPsn ||
                !this.firstForm.fictColor ||
                !this.firstForm.fictSize;
            console.log(terms == true);

            if (terms) {
                error("请完善表单必填项");
            } else {
                this.disabledFirstForm();
                this.emptySecondForm();
                this.noDisabledSecondForm();
            }
        },
        //
        secondSave() {
            let form = Object.assign(this.firstForm, this.secondForm);
            this.$http
                .post("/TPA/dGroupGoods/insert", qs.stringify(form))
                .then(res => {
                    if (res.data.code === 0) {
                        succ(res.data.msg)
                        this.emptySecondForm();
                        this.noDisabledSecondForm();
                        
                        this.pageOnOff = false
                        let params = {
                            psn: this.firstForm.fictPsn,
                            page: 0,
                            count: this.pageSize
                        };
                        this.pageParams = params;                        
                        this.getPageData(this.pageParams);

                        this.getnavMenus()
                    } else {
                        error(res.data.msg);
                    }
                })
                .catch(err => {
                    NetworkAnomaly();
                });
        },
        //取消
        doCancels() {
            this.emptyBtn();
            this.emptyFirstForm();
            this.emptySecondForm()
            this.disabledFirstForm();
            this.disabledSecondForm()

            this.list = [];
            this.search = "";
            this.oldSearch = false; //查询框开关
            this.oldSearchList = []; //查询框列表
        },

        //点击虚拟款号输入框
        doFictColors() {
            this.fictColor = "";
            this.oldFictColor = true;
            this.oldFictColorList = [];
        },
        //点击款号输入框
        doSns() {
            this.sn = "";
            this.oldSn = true;
            this.oldSnList = [];
        },
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

        //选择查询
        getItemSearch(item) {
            this.pageOnOff = false;
            this.oldSearch = false;
            let params = {
                psn: item.fictPsn,
                page: 0,
                count: this.pageSize
            };
            this.pageParams = params;
            this.doCancels();
            this.getPageData(this.pageParams);
        },
        //选择虚拟款号
        geiItemFictColor(item) {
            this.firstForm.fictPsn = item.psn;
            this.oldFictColor = false;

            this.getColor(item.psn);
            this.getSize(item.psn);
        },
        //选择款号
        getItemSn(item) {
            this.secondForm.psn = item.psn;
            this.oldSn = false;
        },
        //修改时选择款号
        getItemDialogSn(item) {
            this.dialog.psn = item.psn;
            this.oldDialogSn = false;
        },
        //获取颜色列表
        getColor(sn) {
            this.$http
                .post("/TPA/cSpdaA/option?psn=" + sn)
                .then(res => {
                    if (res.data.code === 0) {
                        this.color = res.data.data;
                    } else {
                        error(res.data.msg);
                    }
                })
                .catch(err => {
                    NetworkAnomaly();
                });
        },
        //获取尺码列表
        getSize(sn) {
            this.$http
                .post("/TPA/cSpdaB/option?psn=" + sn)
                .then(res => {
                    if (res.data.code === 0) {
                        this.size = res.data.data;
                    } else {
                        error(res.data.msg);
                    }
                })
                .catch(err => {
                    NetworkAnomaly();
                });
        },
        //获取导航
        getnavMenus() {
            this.$http
                .post("/TPA/dGroupGoods/tree")
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
            this.doCancels();
            this.noDisabledSecondForm()
            this.pageOnOff = false;
            this.oldSearch = false;
            let params = {
                psn: index,
                page: 0,
                count: this.pageSize
            };
            this.pageParams = params;
            this.getPageData(this.pageParams);
            this.emptyBtnTo();
            this.doAdd = false;
        },
        //审核
        doExamines() {
            this.$http
                .post(
                    "/TPA/dGroupGoods/auditing?status=1&psn=" +
                        this.firstForm.fictPsn
                )
                .then(res => {
                    if (res.data.code === 0) {
                        succ(res.data.msg);
                        this.getPageData(this.pageParams);
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
                .post(
                    "/TPA/dGroupGoods/auditing?status=0&psn=" +
                        this.firstForm.fictPsn
                )
                .then(res => {
                    if (res.data.code === 0) {
                        succ(res.data.msg);
                        this.getPageData(this.pageParams);
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
                .post("/TPA/dGroupGoods/getByPsn", qs.stringify(name))
                .then(res => {
                    if (res.data.code === 0) {
                        this.list = res.data.data.list;
                        this.total = res.data.data.total;
                        
                        this.firstForm = res.data.attachment

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
        //编辑单条数据
        handleEdit(index, row) {
            this.idx = index;
            const item = this.list[index];
            this.getColor(item.fictPsn);
            this.getSize(item.fictPsn);

            this.dialog = {
                id: item.id, //id
                activeDate: item.activeDate,
                color: item.color,
                size: item.size,
                number: item.number
            };

            this.editVisible = true;
        },
        // 保存编辑
        saveEdit() {
            this.$http
                .post("/TPA/dGroupGoods/update", qs.stringify(this.dialog))
                .then(res => {
                    if (res.data.code === 0) {
                        this.$set(this.list, this.idx, this.dialog);
                        this.editVisible = false;
                        succ(res.data.msg);
                        this.getPageData(this.pageParams);
                    } else {
                        error(res.data.msg);
                    }
                })
                .catch(err => {
                    NetworkAnomaly();
                });
        },
        //删除
        tableDelete(index, row) {
            this.idx = index;
            const item = this.list[index];

            console.log(this.pageParams);
            
            this.$http.post("/TPA/dGroupGoods/delete?id=" + item.id)
                .then(res => {
                    if (res.data.code === 0) {
                        succ(res.data.msg);
                        // this.getPageData(this.pageParams);
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

        //模糊搜索
        vagueSearch() {
            if (this.search) {
                this.$http
                    .post("/TPA/dGroupGoods/option?psn=" + this.search)
                    .then(res => {
                        if (res.data.code === 0) {
                            console.log(res);
                            if (res.data.data.length > 0) {
                                this.oldSearchList = res.data.data;
                            } else {
                                error("暂无数据");
                                this.oldSearchList = [];
                            }
                        } else {
                            error(res.data.msg);
                        }
                    })
                    .catch(err => {
                        NetworkAnomaly();
                    });
            } else {
                error("请输入搜索条件！");
            }
        },
        //模糊查询虚拟款号
        vagueFictColor() {
            if (this.fictColor) {
                this.$http
                    .post("/TPA/cSpda/option?psnXz=1&psn=" + this.fictColor)
                    .then(res => {
                        if (res.data.code === 0) {
                            if (res.data.data.length > 0) {
                                this.oldFictColorList = res.data.data;
                            } else {
                                error("暂无数据");
                                this.oldFictColorList = [];
                            }
                        } else {
                            error(res.data.msg);
                        }
                    })
                    .catch(err => {
                        NetworkAnomaly();
                    });
            } else {
                error("请输入搜索条件！");
            }
        },
        //模糊搜索款号
        vagueSn() {
            if (this.sn) {
                this.$http
                    .post("/TPA/cSpda/option?psnXz=0&psn=" + this.sn)
                    .then(res => {
                        if (res.data.code === 0) {
                            if (res.data.data.length > 0) {
                                this.oldSnList = res.data.data;
                            } else {
                                error("暂无数据");
                                this.oldSnList = [];
                            }
                        } else {
                            error(res.data.msg);
                        }
                    })
                    .catch(err => {
                        NetworkAnomaly();
                    });
            } else {
                error("请输入搜索条件！");
            }
        },
        //修改时模糊搜索款号
        vagueDialogSn() {
            if (this.dialogSn) {
                this.$http
                    .post("/TPA/cSpda/option?psnXz=0&psn=" + this.dialogSn)
                    .then(res => {
                        if (res.data.code === 0) {
                            if (res.data.data.length > 0) {
                                this.oldDialogSnList = res.data.data;
                            } else {
                                error("暂无数据");
                                this.oldDialogSnList = [];
                            }
                        } else {
                            error(res.data.msg);
                        }
                    })
                    .catch(err => {
                        NetworkAnomaly();
                    });
            } else {
                error("请输入搜索条件！");
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
        page() {
            this.pageParams.page = this.page - 1;
            this.getPageData(this.pageParams);
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
@import './css/style.styl'
</style>

