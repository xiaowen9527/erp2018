<template>
    <div class="container" :class="{container_collapse:collapse}">
        <!-- 页面标题 -->
        <p class="page_title">销售款号</p>

        <!-- 顶部操作按钮 -->
        <div class="btn-box">
            <button class="button_btn" @click="doAdds">新增</button>
            <button class="button_btn" @click="doCancels">取消</button>
            <button class="button_btn" @click="doImports">导入</button>
            <button class="button_btn" @click="doExports">导出</button>
            <button @click="doSearchs" class="button_btn">查询</button>
            <input class="queryInfo" placeholder="客户编号 / 客户名称" type="text" v-model="queryInfo" />
            <button class="button_btn" @click="doOuts">退出</button>
        </div>

        <div class="set_box">
            <!-- 左侧导航栏 -->
            <div class="menu_box">
                <el-menu @select="menuSelected" unique-opened background-color="#f2f2f2" text-color="#303133" active-text-color="#303133">
                    <nav-menu :navMenus="this.navMenus"></nav-menu>
                </el-menu>
            </div>

            <div class="set_info">
                <!-- 表单内容 -->
                <div class="info_form">
                    <ul class="clerfix">
                        <li class="menuLi">
                            <label>客户</label>
                            <input type="text" class="first" v-model="form.clientSn" :disabled="formOff" @click="customerFun">
                            <input type="text" v-model="form.clientName" :disabled="formOff" @click="customerFun">
                            <button :disabled="formOff" @click="customerFun">。。。</button>
                        </li>
                        <li>
                            <label>生效日期</label>
                            <el-date-picker format="yyyy 年 MM 月 dd 日" value-format="yyyy-MM-dd" v-model="form.activeDate" type="date" placeholder="选择日期" :disabled="formOff">
                            </el-date-picker>
                        </li>
                        <li>
                            <label>款号</label>
                            <input type="text" v-model="form.spdaPsn" :disabled="formOff">
                        </li>
                        <button class="save" @click="doSaves" :class="{button_btn:!formOff}" :disabled="formOff">保存</button>
                    </ul>
                </div>

                <!-- 表格内容 -->
                <div class="order_table">
                    <el-table :data="list" stripe style="width: 100%">
                        <el-table-column prop="activeDate" label="生效日期" min-width="10%">
                        </el-table-column>
                        <el-table-column prop="clientName" label="客户" min-width="10%">
                            <template slot-scope="scope">
                                <el-tooltip :content="scope.row.clientName" placement="top" :enterable="false">
                                    <p>{{ scope.row.clientName }}</p>
                                </el-tooltip>
                            </template>
                        </el-table-column>
                        <el-table-column prop="spdaPsn" label="款号" min-width="10%">
                        </el-table-column>
                        <el-table-column prop="psn" label="客户款号" min-width="10%">
                        </el-table-column>
                        <el-table-column prop="msg1" label="信息1" min-width="10%">
                            <template slot-scope="scope">
                                <el-tooltip :content="scope.row.msg1" placement="top" :enterable="false">
                                    <p>{{ scope.row.msg1 }}</p>
                                </el-tooltip>
                            </template>
                        </el-table-column>
                        <el-table-column prop="msg2" label="信息2" min-width="10%">
                            <template slot-scope="scope">
                                <el-tooltip :content="scope.row.msg2" placement="top" :enterable="false">
                                    <p>{{ scope.row.msg2 }}</p>
                                </el-tooltip>
                            </template>
                        </el-table-column>
                        <el-table-column prop="msg3" label="信息3" min-width="10%">
                            <template slot-scope="scope">
                                <el-tooltip :content="scope.row.msg3" placement="top" :enterable="false">
                                    <p>{{ scope.row.msg3 }}</p>
                                </el-tooltip>
                            </template>
                        </el-table-column>
                        <el-table-column fixed="right" label="操作" min-width="30%">
                            <template slot-scope="scope">
                                <el-button :disabled="(scope.row.sh == 1)" :class="{btn:scope.row.sh == 1}" @click="handleEdit(scope.$index, scope.row)">修改</el-button>
                                <el-button :disabled="(scope.row.sh == 1)" :class="{btn:scope.row.sh == 1}" @click="tableDelete(scope.$index, scope.row)">删除</el-button>
                                <el-button :disabled="(scope.row.sh == 1)" :class="{btn:scope.row.sh == 1}" @click="doExamines(scope.$index, scope.row)">审核</el-button>
                                <el-button :disabled="(scope.row.sh == 0)" :class="{btn:scope.row.sh == 0}" @click="doExamineAgains(scope.$index, scope.row)">反审</el-button>
                            </template>
                        </el-table-column>
                    </el-table>
                </div>
            </div>

            <!-- 底部页码 -->
            <div class="pageBox">
                <el-pagination @current-change="currentPage" :current-page='page' v-if="pageOnOff" background :page-size="pageSize" :pager-count="5" :total="total">
                </el-pagination>
            </div>
        </div>

        <!-- 获取客户信息弹窗 -->
        <!-- <el-dialog title="客户信息" :visible.sync="customerOff">
            <el-input v-model="customerInfo" placeholder="客户编号 / 客户名称"></el-input>
            <ul class="srcond_menu">
                <li v-if="customerList.length===0">暂无数据</li>
                <li class="clearfix" v-for="(item,i) in customerList" :key="i">
                    <span class="search" @click="getSearchItem(item)">|--{{item.sn}}-{{item.name}}</span>
                </li>
            </ul>
        </el-dialog> -->

        <!-- 修改弹窗 -->
        <el-dialog title="修改" :visible.sync="handleEditOff">
            <el-form :model="dialog" label-width="100px">
                <el-form-item label="生效日期">
                    <el-date-picker format="yyyy 年 MM 月 dd 日" value-format="yyyy-MM-dd" v-model="dialog.activeDate" type="date" placeholder="选择日期"> </el-date-picker>
                </el-form-item>
                <el-form-item label="客户款号">
                    <el-input v-model="dialog.psn"></el-input>
                </el-form-item>
                <el-form-item label="信息1">
                    <el-input v-model="dialog.msg1" placeholder="最多输入110个字符" maxlength="110" type="textarea" :rows="2"></el-input>
                </el-form-item>
                <el-form-item label="信息2">
                    <el-input v-model="dialog.msg2" placeholder="最多输入110个字符" maxlength="110" type="textarea" :rows="2"></el-input>
                </el-form-item>
                <el-form-item label="信息3">
                    <el-input v-model="dialog.msg3" placeholder="最多输入110个字符" maxlength="110" type="textarea" :rows="2"></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="handleEditOff = false">取 消</el-button>
                <el-button type="primary" @click="saveEdit">确 定</el-button>
            </span>
        </el-dialog>

        <!-- 导入弹窗 -->
        <el-dialog class="importExport" title="导入" :visible.sync="importbox" width="30%" :showClose="false" :show-file-list="false">
            <a class="down" href="/TPA/dSellPsn/downExcel">下载导入模板</a>
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

        <vagueSearch v-if="oldONoFF" :url="vagueSearchUrl"  :display="displaySearch" v-on:listenOnOff="listenToOnOff" v-on:listenItem="listenToItem"/>

    </div>
</template>

<script>
import "@/assets/js/import.js"; //导入请求超时拦截
import { mapState } from "vuex";
import vagueSearch from "@/components/pageCommon/vagueSearch";

import {
    NetworkAnomaly,
    succ,
    error,
    getOut
} from "../../../assets/js/message.js";
import qs from "qs";
import NavMenu from "./NavMenu";
export default {
    name: "xiaoshoukuanhao",
    data() {
        return {
            oldONoFF:true,
            vagueSearchUrl:"/TPA/aKsDa/option?nature=客户&name=",
            displaySearch:['sn','name'],            

            queryInfo: "", // 顶部查询内容
            navMenus: [], // 左侧导航栏数据
            form: {
                activeDate: "",
                clientSn: "",
                clientName: "",
                spdaPsn: ""
            },
            formOff: true, // 表单禁用、开启
            list: [], // 表格内容
            customerInfo: "", // 客户弹窗查询内容
            customerOff: false, // 客户弹窗开关
            handleEditOff: false, // 修改弹窗开关
            customerList: [], // 客户弹窗列表
            dialog: {}, // 弹窗内容
            //导入弹出开关
            importbox: false,
            importZhe: false, //导入遮罩
            isCover: false, //默认导入不覆盖
            project: "", //错误文件名
            //上传的文件
            fileList: [],
            Tips: "", //错误提示
            tipOffON: false, //错误文件下载开关
            //分页：当前页码/总数量/每页显示条数
            page: 0,
            total: "",
            pageSize: 10,
            pageOnOff: false,
            pageParams: {}
        };
    },

    methods: {
        listenToOnOff(data){
            this.oldONoFF = data
        },  
        listenToItem(data){
            this.form.clientSn = data[0]
            this.form.clientName = data[1]        
        },              
        // 新增
        doAdds() {
            this.formOff = false;
            this.form = {
                activeDate: "",
                clientSn: "",
                clientName: "",
                spdaPsn: ""
            };
        },

        // 取消
        doCancels() {
            this.formOff = true;
            this.form = {
                activeDate: "",
                clientSn: "",
                clientName: "",
                spdaPsn: ""
            };
        },

        //导入按纽
        doImports() {
            this.importbox = true;
        },
        //导入取消
        importCancel() {
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
                .post("/TPA/dSellPsn/importExcel", formData)
                .then(res => {
                    // console.log(res);
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
            window.location.href = "/TPA/dSellPsn/exportExcel";
        },

        searchFun(params) {
            this.$http
                .post("/TPA/dSellPsn/getPage", qs.stringify(params))
                .then(res => {
                    if (res.data.code === 0) {
                        succ(res.data.msg);
                        this.list = res.data.data;

                        this.total = res.data.attachment.total;
                        console.log(this.total);
                        if (this.total > this.pageSize) {
                            this.pageOnOff = true;
                        } else {
                            this.pageOnOff = false;
                        }
                    }
                })
                .catch(err => {
                    NetworkAnomaly();
                });
        },

        // 查询
        doSearchs() {
            let params = {
                page: this.page,
                count: this.pageSize,
                name: this.queryInfo
            };
            this.pageParams = params;
            this.searchFun(this.pageParams);
        },

        // 退出
        doOuts() {
            this.$emit("getOut", this.$route.name);
        },

        // 获取左侧树形导航数据
        getnavMenu() {
            this.$http
                .post("/TPA/dSellPsn/list")
                .then(res => {
                    if (res.data.code === 0) {
                        this.navMenus = res.data.data;
                    }
                })
                .catch(err => {
                    NetworkAnomaly();
                });
        },

        // 点击左侧导航
        menuSelected(index) {
            let params = {
                page: this.page,
                count: this.pageSize,
                name: index
            };
            this.pageParams = params;
            this.searchFun(this.pageParams);
        },

        // 点击弹出客户弹窗
        customerFun() {
            this.customerOff = true;
            this.customerInfo = ""
            this.customerList = []           
        },

        // 客户弹窗选择
        getSearchItem(item) {
            this.customerInfo = "";
            this.customerList = [];
            this.customerOff = false;
            this.form.clientSn = item.sn;
            this.form.clientName = item.name;
        },

        // 表单保存
        doSaves() {
            if (
                this.form.activeDate &&
                this.form.clientSn &&
                this.form.clientName &&
                this.form.spdaPsn
            ) {
                this.$http
                    .post("/TPA/dSellPsn/insert", qs.stringify(this.form))
                    .then(res => {
                        console.log(res);
                        this.form.spdaPsn = "";
                        let params = {
                            page: this.page,
                            count: this.pageSize,
                            name: res.data.data.clientSn
                        };
                        this.pageParams = params;
                        this.searchFun(this.pageParams);
                    })
                    .catch(err => {
                        NetworkAnomaly();
                    });
            } else {
                error("请将所有信息填写完整");
            }
        },

        // 修改按钮
        handleEdit(index, row) {
            this.idx = index;
            const item = this.list[index];
            this.dialog = {
                id: item.id,
                activeDate: item.activeDate,
                clientSn: item.clientSn,
                clientName: item.clientName,
                spdaPsn: item.spdaPsn,
                psn: item.psn,
                msg1: item.msg1,
                msg2: item.msg2,
                msg3: item.msg3
            };
            this.handleEditOff = true;
        },

        // 修改保存按钮
        saveEdit() {
            this.$http
                .post("/TPA/dSellPsn/update", qs.stringify(this.dialog))
                .then(res => {
                    if (res.data.code === 0) {
                        this.pageParams.name = this.dialog.clientSn;
                        this.searchFun(this.pageParams);
                    }
                });
            this.handleEditOff = false;
        },

        // 删除按钮
        tableDelete(index, row) {
            this.idx = index;
            const item = this.list[index];
            this.$http
                .post("/TPA/dSellPsn/delete?id=" + item.id)
                .then(res => {
                    if (res.data.code === 0) {
                        this.pageParams.name = item.clientSn;
                        this.searchFun(this.pageParams);
                    }
                })
                .catch(err => {
                    NetworkAnomaly();
                });
        },

        // 审核按钮
        doExamines(index, row) {
            this.idx = index;
            const item = this.list[index];
            this.$http
                .post("/TPA/dSellPsn/auditing?status=1&id=" + item.id)
                .then(res => {
                    if (res.data.code === 0) {
                        this.pageParams.name = item.clientSn;
                        this.searchFun(this.pageParams);
                    }
                })
                .catch(err => {
                    NetworkAnomaly();
                });
        },

        // 反审按钮
        doExamineAgains(index, row) {
            this.idx = index;
            const item = this.list[index];
            console.log(item)
            this.$http
                .post("/TPA/dSellPsn/auditing?status=0&id=" + item.id)
                .then(res => {
                    if (res.data.code === 0) {
                        this.pageParams.name = item.clientSn;
                        this.searchFun(this.pageParams);
                    }
                })
                .catch(err => {
                    NetworkAnomaly();
                });
        },

        // 获取当前页码
        currentPage(val) {
            this.pageParams.page = val - 1;
            this.searchFun(this.pageParams);
        },

    },

    mounted() {
        this.getnavMenu();
    },

    computed: {
        ...mapState(["collapse"])
    },
    watch:{
        //模糊查询
        //模糊查询客户
        customerInfo(){
            if (this.customerInfo) {
                this.$http
                    .post("/TPA/aKsDa/option?nature=客户&name=" + this.customerInfo).then(res => {
                        if (res.data.code === 0) {
                            this.customerList = res.data.data;
                        } else {
                            error(res.data.msg);
                            this.customerList = [];
                        }
                    })
                    .catch(err => {
                        NetworkAnomaly();
                    });
            } else {
                this.customerList = []
            }
        }
    },

    // 引入组件
    components: {
        NavMenu,vagueSearch
    }
};
</script>

<style lang="stylus" scoped>
@import 'style.styl'
</style>


