<template>
    <div class="container" :class="{container_collapse:collapse}">
        <p class="page_title">物料档案</p>
        <div class="btn-box">
            <button :disabled='doAdd' :class="{button_btn:!doAdd}" @click="doAdds">新增</button>
            <button :disabled='doCancel' :class="{button_btn:!doCancel}" @click="doCancels">取消</button>
            <button :disabled='(firstForm.sh==1||firstForm.sh=="-1")' :class="{button_btn:firstForm.sh==0}" @click="doEdits">修改</button>
            <button @click="doSearchs" class="button_btn">查询</button>
            <input type="text" placeholder="请选择" class="doSearch" @click="doSearchs" readonly v-model="search">
            <button class="button_btn" @click="doOuts">退出</button>
            <button class="button_btn" @click="refresh">刷新</button>
            <div class="btn_right">
                <button :disabled='doImport' :class="{button_btn:!doImport}" @click="doImports">导入</button>
                <button :disabled='doExport' :class="{button_btn:!doExport}" @click="doExports">导出</button>
                <button :disabled='(firstForm.sh==1||firstForm.sh==-1)' :class="{button_btn:(firstForm.sh==0)}" @click="doExamines">审核</button>
                <button :disabled='(firstForm.sh==0||firstForm.sh==-1)' :class="{button_btn:(firstForm.sh==1)}" @click="doExamineAgains">反审</button>
            </div>
        </div>
    
        <div class="set_box">
            <div class="menu_box">
                <el-menu @select="menuSelected" unique-opened background-color="#f2f2f2" text-color="#303133" active-text-color="#303133">
                    <nav-menu :navMenus="this.navMenus"></nav-menu>
                </el-menu>
            </div>
            <div class="set_info">
                <div class="left">
                    <div class="orderList">
                        <el-table :data="tableList" border style="width: 100%" height="18vh">
                            <el-table-column prop="sn" label="编号" min-width="15%">
                            </el-table-column>
                            <el-table-column prop="name" label="名称" min-width="15%">
                            </el-table-column>
                            <el-table-column prop="pattern" label="花形或说明" min-width="15%" class="explain">
                            </el-table-column>
                            <el-table-column prop="typeName" label="一级" min-width="15%" class="explain">
                            </el-table-column>
                            <el-table-column prop="fatherName" label="二级" min-width="15%" class="explain">
                            </el-table-column>
                            <el-table-column prop="grandFather" label="三级" min-width="15%" class="explain">
                            </el-table-column>
                            <el-table-column label="操作" min-width="10%">
                                <template slot-scope="scope">
                                        <el-button @click="checkChilds(scope.$index, scope.row)" class="btn" type="text">查看</el-button>
                                </template>
                            </el-table-column>
                        </el-table>
                    </div>
                </div>
                <div class="right">
                    <section class="firstForm">
                        <ul class="clearfix">
                            <li class="gui">
                                <label>归属</label>
                                <input disabled v-model="firstForm.typeSn" class="guiNum" readonly type="text">
                                <input disabled v-model="firstForm.typeName" class="guiName" readonly type="text">
                            </li>                            
                            <li>
                                <label class="name">材质+名称+规格</label>
                                <input :disabled="firstFormNo" placeholder="请选择" readonly v-model="firstForm.name" type="text" @click="open_box">
                            </li>
                            <li>
                                <label>系统编号</label>
                                <input disabled v-model="firstForm.sn" type="text" placeholder="自动生成">
                            </li>
                            <li>
                                <label>来源编号</label>
                                <input :disabled="firstFormOn" v-model="firstForm.thirdPartySn" type="text" placeholder="自动生成">
                            </li>
                            <li>
                                <label>接出编号</label>
                                <input disabled v-model="firstForm.contactSn" type="text" placeholder="自动生成">
                            </li>

                            <li>
                                <label>用量单位</label>
                                <el-select :disabled="firstFormOn" v-model="firstForm.ylUnit" placeholder="请选择">
                                    <el-option v-for="item in this.yl" :key="item.name" :label="item.name" :value="item.name">
                                    </el-option>
                                </el-select>
                            </li>
                            <li>
                                <label>采购单位</label>
                                <el-select :disabled="firstFormOn" v-model="firstForm.cgUnit" placeholder="请选择">
                                    <el-option v-for="item in this.cg" :key="item.name" :label="item.name" :value="item.name">
                                    </el-option>
                                </el-select>
                            </li>
                            <li>
                                <label>布宽</label>
                                <input :disabled="firstFormOn" v-model="firstForm.size" class="half" type="number">
                                <el-select class="half" :disabled="firstFormOn" v-model="firstForm.sizeUnit" placeholder="请选择">
                                    <el-option v-for="item in this.bk" :key="item.name" :label="item.name" :value="item.name">
                                    </el-option>
                                </el-select>
                            </li>
                            <li>
                                <label>克重</label>
                                <input :disabled="firstFormOn" v-model="firstForm.kz" class="half" type="number">
                                <el-select class="half" :disabled="firstFormOn" v-model="firstForm.kzUnit" placeholder="请选择">
                                    <el-option v-for="item in this.kz" :key="item.name" :label="item.name" :value="item.name">
                                    </el-option>
                                </el-select>
                            </li>
                            <li>
                                <label>转换系数</label>
                                <input :disabled="firstFormOn" v-model="firstForm.zhxs" type="text">
                            </li>                            
                            <li class="hua">
                                <label>花形或说明</label>
                                <input :disabled="firstFormOn" v-model="firstForm.pattern" type="text">
                            </li>

                            <button :disabled="firstFormOn" :class="{button_btn:!firstFormOn}" @click="firstSave" class="save">保存</button>

                        </ul>
                    </section>

                    <section class="secondForm">
                        <ul class="clearfix">
                            <li class="gui">
                                <label>色号及名称</label>
                                <input v-model="secondForm.yscmSn" class="guiNum" disabled  type="text" placeholder="自动生成" >
                                <input :disabled="secondFormOn" v-model="secondForm.yscmName" class="guiName"  type="text" >
                            </li>
                            <li>
                                <label>供应商色号</label>
                                <input :disabled="secondFormOn" v-model="secondForm.gysYsSn" type="text">
                            </li>
                            <li class="secondSave">
                                <button :disabled="secondFormOn" :class="{button_btn:!secondFormOn}" @click="secondSave" class="save">保存</button>
                            </li>
                        </ul>
                        <div class="order_table">
                            <el-table :data="list" height="26.5vh" border style="width: 100%" @sort-change='sortChange' :default-sort="{prop: 'gysYsSn', order: 'ascending'}">
                                <el-table-column prop="sn" label="编号" min-width="20%">
                                </el-table-column>
                                <el-table-column prop="yscmSn" label="色号" sortable='custom' min-width="20%">
                                </el-table-column>
                                <el-table-column prop="yscmName" label="名称" min-width="20%">
                                </el-table-column>
                                <el-table-column prop="gysYsSn" label="供应商色号" :sortable='true' min-width="20%">
                                </el-table-column>
                                <el-table-column label="操作" min-width="20%">
                                    <template slot-scope="scope">
                                        <!-- <el-button :disabled='(firstForm.sh==1||firstForm.sh==-1)' @click="handleEdit(scope.$index, scope.row)" :class="{btn:firstForm.sh==0}" type="text">修改</el-button> -->
                                        
                                        <el-button :disabled="(scope.row.status == 1)" :class="{btn:(scope.row.status == 0)}" @click="effective(scope.$index, scope.row)" type="text">有效</el-button>
                                        
                                        <el-button :disabled="(scope.row.status == 0)" :class="{btn:(scope.row.status == 1)}" @click="invalid(scope.$index, scope.row)" type="text">无效</el-button>
                                    </template>
                                </el-table-column>
                            </el-table>
                        </div>
                    </section>
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
                <li>
                    <span>审核人：</span>
                    <span>{{this.firstForm.shUser}}</span>
                </li>
                <li>
                    <span>审核日期：</span>
                    <span>{{this.firstForm.shDate}}</span>
                </li>
            </ul>
            <el-pagination v-if="pageOnOff" background :page-size="pageSize" :pager-count="5" :total="total" @current-change="currentPage">
            </el-pagination>
        </div>

        <el-dialog title="材质+名称+规格" :visible.sync="oldMenu">
            <el-input v-model="name" placeholder="请输入你要查找的物料规格名称"></el-input>
            <button class="button_btn" @click="vagueGetOld">查询</button>
            <ul class="srcond_menu">
                <li v-for="(item,i) in nameList" :key="i">
                    <span @click="getOldMenu(item)">|--{{item.name}}&nbsp;&nbsp;-&nbsp;&nbsp;{{item.type}}</span>
                </li>
            </ul>
        </el-dialog>
        <el-dialog title="请输入面料档案编号" :visible.sync="oldSearch">
            <el-input v-model="search" placeholder="请输入面料档案编号"></el-input>
            <button class="button_btn" @click="vagueSearch">查询</button>
            <ul class="srcond_menu">
                <li v-if="searchList.length===0">暂无数据</li>
                <li v-for="(item,i) in searchList" :key="i">
                    <span @click="getSearch(item)">|--{{item.sn}}&nbsp;&nbsp;-&nbsp;&nbsp;{{item.name}}&nbsp;&nbsp;-&nbsp;&nbsp;{{item.typeName}}</span>
                </li>
            </ul>
        </el-dialog>

        <!-- 导入弹窗 -->
        <el-dialog class="importExport" title="导入" :visible.sync="importbox" width="30%" :showClose="false" :show-file-list="false">
            <a class="down" href="/TPA/cWlda/downExcel">下载导入模板</a>
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

        <!-- 编辑弹出框 -->
        <!-- <el-dialog title="编辑" :visible.sync="editVisible" width="30%">
            <el-form :model="dialog" label-width="100px">
                <el-form-item label="编号">
                    <el-input v-model="dialog.sn" disabled></el-input>
                </el-form-item>
                <el-form-item label="色号">
                    <el-input v-model="dialog.yscmSn" disabled></el-input>
                </el-form-item>
                <el-form-item label="名称">
                    <el-input v-model="dialog.yscmName" disabled></el-input>
                </el-form-item>
                <el-form-item label="供应商色号">
                    <el-input v-model="dialog.gysYsSn"></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="editVisible = false">取 消</el-button>
                <el-button type="primary" @click="saveEdit">确 定</el-button>
            </span>
        </el-dialog> -->

    </div>
</template>

<script>
import "@/assets/js/import.js"; //导入请求超时拦截
import { mapState } from "vuex";
import NavMenu from "./NavMenu";
import {
    NetworkAnomaly,
    succ,
    error,
    getOut
} from "../../../assets/js/message.js";
import qs from "qs";
export default {
    name: "mianliaokaifadangan",
    data() {
        return {
            //按钮disabled
            doAdd: false,
            doCancel: true,
            doImport: false,
            doExport: false,
            oldMenu: false,
            oldColor: false,
            addEdit: true, //新增修改开关
            //form的disabled
            firstFormNo: true,
            firstFormOn: true,
            firstFormGui: true,
            secondFormNo: true,
            secondFormOn: true,
            secondFormGui: true,
            //bind值
            oldSearch: false,
            search: "", //查询
            searchList: [],
            navMenus: [], //导航数据
            tableList: [],
            name: "",
            nameList: [], //名称规格材质  弹出数组
            firstForm: {
                typeSn: "", //归属编号
                typeName: "", //归属名称
                sn: "", //编号
                contactSn: "", //编号
                thirdPartySn: "", //编号
                name: "", //名称
                nameSn: "",
                ylUnit: "", //用量单位
                ylUnitSn: "", //用量单位编号
                cgUnit: "", //采购单位
                cgUnitSn: "", //采购单位编号
                size: "", //布宽
                sizeUnit: "", //布宽单位
                sizeUnitSn: "", //布宽单位编号
                kz: "", //克重
                kzUnit: "", //克重单位
                kzUnitSn: "", //克重单位编号
                zhxs: "", //转换系数
                pattern: "", //花边/说明
                sh: "-1", // 审核
                addUser: "",
                addDate: "",
                updateUser: "",
                updateDate: "",
                shUser: "",
                shDate: ""
            },
            secondForm: {
                masterSn: "", //编号
                yscmSn: "", //颜色编号
                yscmName: "", //颜色名称
                gysYsSn: "", //供应商色号
                status: "3" //状态
            },
            //表单下拉数据
            yl: [], //用量单位
            cg: [], //采购单位
            bk: [], //布宽单位
            kz: [], //克重单位
            //色号和名称
            //表格数据
            list: [],

            //导入弹出开关
            importbox: false,
            importZhe: false, //导入遮罩
            isCover: false, //默认导入不覆盖
            project: "", //错误文件名
            //上传的文件
            fileList: [],
            Tips: "", //错误提示
            tipOffON: false, //错误文件下载开关


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
                orderBy: ""
            }
        };
    },
    mounted() {
        this.getnavMenu();
    },
    methods: {
        //按钮初始状态
        emptyBtn() {
            this.doAdd = false;
            this.doCancel = true;
            this.doImport = false;
            this.doExport = false;
        },
        //按钮按下状态
        emptyBtnTo() {
            this.doAdd = true;
            this.doCancel = false;
            this.doImport = true;
            this.doExport = true;
        },
        //表单1恢复初始空值状态
        emptyFirstForm() {
            this.firstForm = {
                typeSn: "", //归属编号
                typeName: "", //归属名称
                sn: "", //编号
                contactSn: "", //编号
                thirdPartySn: "", //编号
                name: "", //名称
                nameSn: "",
                ylUnit: "", //用量单位
                cgUnit: "", //采购单位
                size: "", //布宽
                sizeUnit: "", //布宽单位
                kz: "", //克重
                zhxs: "", //转换系数
                pattern: "", //花边/说明
                sh: "-1", // 审核
                addUser: "",
                addDate: "",
                updateUser: "",
                updateDate: "",
                shUser: "",
                shDate: ""
            };
        },
        //表单2恢复初始空值状态
        emptySecondForm() {
            this.secondForm = {
                sn: "", //编号
                yscmSn: "", //颜色编号
                yscmName: "", //颜色名称
                gysYsSn: "", //供应商色号
                status: "" //状态
            };
        },
        //禁用表单first
        disabledFirstForm() {
            this.firstFormNo = true;
            this.firstFormOn = true;
            this.firstFormGui = true;
        },
        //禁用表单Second
        disabledSecondForm() {
            this.secondFormNo = true;
            this.secondFormOn = true;
            this.secondFormGui = true;
        },
        //开放表单first
        noDisabledFirstForm() {
            this.firstFormNo = false;
            this.firstFormOn = false;
            this.firstFormGui = false;
        },
        //开放表单Second
        noDisabledSecondForm() {
            this.secondFormNo = false;
            this.secondFormOn = false;
            this.secondFormGui = false;
        },
        //新增
        doAdds() {
            this.doCancels();
            this.emptyBtnTo();
            this.firstFormOn = false;
            this.firstFormNo = false;
            this.noDisabledFirstForm();
            this.addEdit = true;
            //获取表单的下拉
            this.getYl();
            this.getCg();
            this.getBk();
            this.getKz();
        },
        //取消
        doCancels() {
            this.emptyBtn();
            this.emptyFirstForm();
            this.emptySecondForm();
            this.disabledFirstForm();
            this.disabledSecondForm();
            this.list = [];
            this.search = "";
            this.pageOnOff = false;
            this.tableList = [];
        },
        //修改
        doEdits() {
            this.emptyBtnTo();
            this.addEdit = false;
            this.doAdd = false;
            this.firstFormOn = false;
            let sh = this.firstForm.sh;
            this.firstForm.sh = "-1";
            this.disabledSecondForm();
            //获取表单的下拉
            this.getYl();
            this.getCg();
            this.getBk();
            this.getKz();
        },
        //first保存
        firstSave() {
            if (
                this.firstForm.typeSn.length === 0 ||
                this.firstForm.typeName.length === 0
            ) {
                error("请选择归属");
            } else if (this.firstForm.name.length === 0) {
                error("请输入名称");
            } else {
                if (this.addEdit) {
                    this.$http
                        .post("/TPA/cWlda/insert", qs.stringify(this.firstForm))
                        .then(res => {
                            if (res.data.code === 0) {
                                this.firstForm = res.data.data;
                                this.getnavMenu();
                                this.disabledFirstForm();
                                this.noDisabledSecondForm();
                                this.doAdd = false;
                                succ(res.data.msg);

                                //当前父级的列表
                                this.$http
                                    .post("/TPA/cWlda/getBy?sn=" + this.firstForm.typeSn)
                                    .then(res => {
                                        if (res.data.code === 0) {
                                            this.tableList = res.data.data;
                                            this.list = [];
                                        } else {
                                            // error(res.data.msg);
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
                } else {
                    this.$http
                        .post("/TPA/cWlda/update", qs.stringify(this.firstForm))
                        .then(res => {
                            if (res.data.code === 0) {
                                this.firstForm.sh = "0";
                                this.disabledFirstForm();
                                this.noDisabledSecondForm();
                                this.getGysColorGys();
                                succ(res.data.msg);
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
        //secondSave保存
        secondSave() {
            this.$http
                .post("/TPA/cWldaA/insert", qs.stringify(this.secondForm))
                .then(res => {
                    if (res.data.code === 0) {
                        succ(res.data.msg);
                        this.emptySecondForm();
                        this.secondForm.masterSn = this.firstForm.sn;
                        let params = {
                            masterSn: this.firstForm.sn,
                            orderBy: "gys_ys_sn asc",
                            page: 0,
                            count: this.pageSize
                        };
                        this.pageParams = params;
                        console.log(this.pageParams);
                        this.getGysColorGys();
                    } else {
                        error(res.data.msg);
                    }
                })
                .catch(err => {
                    NetworkAnomaly();
                });
        },

        //查询
        doSearchs() {
            this.oldSearch = true
            this.search = ""
            this.searchList = []
        },
        //退出
        doOuts() {
            this.$emit("getOut", this.$route.name);
        },
        //刷新
        refresh() {
            this.getnavMenu();
            this.doCancels();
            succ("刷新成功");
        },
        //审核
        doExamines() {
            let params = {
                id: this.firstForm.id,
                status: "1"
            };
            console.log(params);
            this.$http
                .post("/TPA/cWlda/auditing", qs.stringify(params))
                .then(res => {
                    console.log(res);
                    if (res.data.code === 0) {
                        this.firstForm.sh = params.status;
                        succ(res.data.msg);
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
            let params = {
                id: this.firstForm.id,
                status: "0"
            };
            console.log(params);
            this.$http
                .post("/TPA/cWlda/auditing", qs.stringify(params))
                .then(res => {
                    console.log(res);
                    if (res.data.code === 0) {
                        this.firstForm.sh = params.status;
                        succ(res.data.msg);
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
                .post("/TPA/cWlda/importExcel", formData)
                .then(res => {
                    console.log(res);
                    if (res.status === 200) {
                        if (res.data.code === 0) {
                            succ(res.data.msg);
                            this.getnavMenu();
                            this.importCancel();
                            this.$refs.upload.clearFiles();
                        } else if (res.data.code === 100) {
                            this.tipOffON = true;
                            this.project = res.data.attachment.name
                            this.Tips = res.data.msg
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
            let errUrl = '/TPA/aImportExcel/exportMsg?name=' + this.project
            // console.log(errUrl)
            window.location.href = errUrl;
            setTimeout(() => {
                this.tipOffON = false;
                this.importCancel();
            }, 500)
        },
        //导出
        doExports() {
            window.location.href = "/TPA/cWlda/exportExcel";
        },


        //获取用量单位
        getYl() {
            this.$http
                .post("/TPA/aLbJb/getBySn?sn=006")
                .then(res => {
                    if (res.data.code === 0) {
                        this.yl = res.data.data;
                    } else {
                        error(res.data.msg);
                    }
                })
                .catch(err => {
                    NetworkAnomaly();
                });
        },
        //获取采购单位
        getCg() {
            this.$http
                .post("/TPA/aLbJb/getBySn?sn=006")
                .then(res => {
                    if (res.data.code === 0) {
                        this.cg = res.data.data;
                    } else {
                        error(res.data.msg);
                    }
                })
                .catch(err => {
                    NetworkAnomaly();
                });
        },
        //获取布宽单位
        getBk() {
            this.$http
                .post("/TPA/aLbJb/getBySn?sn=006")
                .then(res => {
                    if (res.data.code === 0) {
                        this.bk = res.data.data;
                    } else {
                        error(res.data.msg);
                    }
                })
                .catch(err => {
                    NetworkAnomaly();
                });
        },
        //获取克重单位
        getKz() {
            this.$http
                .post("/TPA/aLbJb/getBySn?sn=016")
                .then(res => {
                    if (res.data.code === 0) {
                        this.kz = res.data.data;
                    } else {
                        error(res.data.msg);
                    }
                })
                .catch(err => {
                    NetworkAnomaly();
                });
        },
        //菜单查询子级
        menuSelected(index) {
            this.emptyFirstForm();
            this.disabledFirstForm();
            this.pageOnOff = false;
            this.doAdd = false;
            this.doCancel = false;
            this.tableList = []
            let data = index.split(",");
            console.log(data[0]);
            //查询自身
            this.$http
                .post("/TPA/cWlda/getBy?sn=" + data[0])
                .then(res => {
                    if (res.data.code === 0) {
                        this.tableList = res.data.data;
                        this.list = [];
                    } else {
                        // error(res.data.msg);
                    }
                })
                .catch(err => {
                    NetworkAnomaly();
                });
        },
        //查询当前数据的详细
        checkChilds(index, row) {
            console.log(index, row);
            //查询自身
            this.$http
                .post("/TPA/cWlda/get?id=" + row.id)
                .then(res => {
                    if (res.data.code === 0) {
                        this.firstForm = res.data.data;
                        console.log(res);
                        this.emptyBtnTo();
                        this.doAdd = false;
                        //查询表格数据
                        if (this.pageParams.orderBy.length === 0) {
                            let params = {
                                masterSn: this.firstForm.sn,
                                orderBy: "gys_ys_sn asc",
                                page: 0,
                                count: this.pageSize
                            };

                            this.pageParams = params;
                        } else {
                            this.pageParams.masterSn = this.firstForm.sn;
                            this.pageParams.page = 0;
                            this.pageParams.count = this.pageSize;
                        }
                        console.log(this.pageParams);
                        this.getGysColorGys();
                        this.noDisabledSecondForm();
                    } else if (
                        res.data.code === 1 &&
                        res.data.msg == "不存在"
                    ) {
                        console.log("父级");
                    } else {
                        error(res.data.msg);
                    }
                })
                .catch(err => {
                    NetworkAnomaly();
                });
        },

        //获取nav
        getnavMenu() {
            this.$http
                .post("/TPA/cSpecification/tree")
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

        //点击 材质+名称+规格
        open_box() {
            this.oldMenu = true;
            this.name = ""
            this.nameList = ""
        },


        //选择 材质+名称+规格
        getOldMenu(item) {
            this.firstForm.typeSn = item.typeSn;
            this.firstForm.typeName = item.type;
            this.firstForm.nameSn = item.sn
            this.firstForm.name = item.name
            this.oldMenu = false;
            console.log(this.firstForm)
        },
        //选择search模糊查询
        getSearch(item) {
            this.search = item.sn
            this.oldSearch = false;
            this.$http
                .post("/TPA/cWlda/getBySn?sn=" + this.search)
                .then(res => {
                    if (res.data.code === 0) {
                        this.doCancels();
                        this.search = "";
                        this.firstForm = res.data.data[0];
                        //查询表格数据
                        let params = {
                            masterSn: this.firstForm.sn,
                            orderBy: "gys_ys_sn asc",
                            page: 0,
                            count: this.pageSize
                        };
                        this.pageParams = params;
                        this.getGysColorGys();
                        this.noDisabledSecondForm();
                    } else {
                        error(res.data.msg);
                        this.search = ""
                    }
                })
                .catch(err => {
                    NetworkAnomaly();
                });
        },

        //获取供应商色号
        getGysColorGys() {
            console.log(this.pageParams);
            this.$http
                .post("/TPA/cWldaA/search", qs.stringify(this.pageParams))
                .then(res => {
                    if (res.data.code === 0) {
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
        },

        //获取当前页码
        currentPage(val) {
            this.page = val;
        },
        
        //table有效
        effective(index, row) {
            this.idx = index;
            const item = this.list[index];
            let params = {
                id: item.id,
                status: 1
            }
            this.$http
                .post("/TPA/cWldaA/status", qs.stringify(params))
                .then(res => {
                    if (res.data.code === 0) {
                        succ(res.data.msg);
                        item.status = params.status
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
            let params = {
                id: item.id,
                status: 0
            }
            this.$http
                .post("/TPA/cWldaA/status", qs.stringify(params))
                .then(res => {
                    if (res.status == 200 && res.data.code === 0) {
                        succ(res.data.msg);
                        item.status = params.status
                        this.$set(this.list, this.idx, item);
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
                if (column.prop == "yscmSn" && column.order == "descending") {
                    this.pageParams.orderBy = "yscm_sn desc";
                } else if (
                    column.prop == "yscmSn" &&
                    column.order == "ascending"
                ) {
                    this.pageParams.orderBy = "yscm_sn asc";
                } else if (
                    column.prop == "gysYsSn" &&
                    column.order == "descending"
                ) {
                    this.pageParams.orderBy = "gys_ys_sn desc";
                } else if (
                    column.prop == "gysYsSn" &&
                    column.order == "ascending"
                ) {
                    this.pageParams.orderBy = "gys_ys_sn asc";
                } else {
                    this.pageParams.orderBy = "gys_ys_sn asc";
                }
                if (this.list.length !== 0) {
                    this.getGysColorGys();
                }
            }
        },
        //模糊查询
        vagueSearch(){
            this.searchList = []
            if (this.search) {
                let search = {
                    sn: 17 + "|" + this.search
                };
                let searchStr = JSON.stringify(search);
                this.$http
                    .post("/TPA/cWlda/search?search=" + searchStr)
                    .then(res => {
                        if(res.data.code===0){
                            if(res.data.data.list.length>0){
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
        //获取 材质+名称+规格
        vagueGetOld() {
            this.nameList = []
            if(this.name){
                let search = {
                    name: 17 + "|" + name
                };
                let searchStr = JSON.stringify(search);
                this.$http.post('/TPA/cSpecification/search?status=1&search=' + searchStr)
                    .then(res => {
                        if (res.data.code === 0) {
                            if(res.data.data.list.length>0){
                                this.nameList = res.data.data.list
                            }else{
                                error('暂无数据')  
                                this.nameList = []                        
                            }
                            
                        } else {
                            error(res.data.msg)
                        }
                    })
                    .catch(err => {
                        NetworkAnomaly()
                    })
            }else{
                let obj = {name:"暂无数据"}
                this.searchList.push(obj)                        
            }

        },
    },
    watch: {
        page() {
            this.pageParams.page = this.page - 1;
            this.$http
                .post("/TPA/cWldaA/search", qs.stringify(this.pageParams))
                .then(res => {
                    console.log(res);
                    if (res.data.code === 0) {
                        this.list = res.data.data.list;
                        this.total = res.data.data.total;
                    } else {
                        error(res.data.msg);
                    }
                })
                .catch(err => {
                    NetworkAnomaly();
                });
        },
        firstForm() {
            this.secondForm.masterSn = this.firstForm.sn;
            if (this.firstForm.sn) {
                this.doCancel = false;
            }
        },
        list() {
            for (let i = 0; i < this.list.length; i++) {
                this.list[i].sn = this.firstForm.sn;
            }
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
.container>>>.set_box .set_info .firstForm ul li .el-select .el-input__inner
    height 2.5vh !important
    line-height 2.5vh
.container>>>.set_box .set_info .firstForm ul li .el-select
    height 2.5vh
    line-height 2.5vh
.container>>>.el-submenu__title, .silder>>>.el-menu-item
    height 3vh
    line-height 3vh
    font-size 1.6vh !important
.secondForm>>>th, .order_table>>>.el-table td, .el-table th
    padding 0
.secondForm>>>.el-table .cell
    height 2.8vh
    line-height 2.8vh
    text-align center
    font-size 1.6vh
.orderList>>>.el-table .cell
    height 3vh
    line-height 3vh
    text-align center
    font-size 1.6vh
    white-space nowrap
.orderList>>>th, .orderList>>>.el-table td, .el-table th
    padding 0
.secondForm>>>.el-table__empty-block
    min-height 2.5vh
.orderList>>>.el-table__empty-block
    min-height 2.5vh
.container>>>.el-dialog
    width 500px
    height 500px
    overflow-x hidden
    .el-input
        width 80%
        float left
    button
        height 40px 
        width 75px
        background #ffffff
        margin-left 10px
    li
        &.color
            &:hover
                background #d2d2d2 !important
        span
            &.color
                width 50%
                padding-left 10%
                float left
.container>>>.el-dialog__body
    cursor pointer !important
    line-height 3.5vh
    font-weight bold
    padding 1vh 2vh
.el-select>>>.el-input
    display inline-block
.menu_box
    width 15%
.set_info
    width 85%
    overflow hidden
.btn-box
    min-width 1060px
.dialogB
    padding 0 2vh
    height 3vh
    line-height 3vh
    border 1px solid #ebeef5
    font-weight bold
    color #d2d2d2
    background #fff
    border-radius 4px
.dialogBtn
    border 1px solid #ebeef5
    color #409eff
.left
    width 99.5%
    float left
    height 18vh
    margin-top 1vh
    .orderList
        .el-button
            padding 0.6vh 1.2vh
            margin-top 0.2vh
            border 1px solid #ebeef5
            color #d9d9d9
            font-size 1.2vh
            &.btn
                border 1px solid #409eff
                color #409eff
.right
    width 99.5%
    float left
    .order_table
        height 26.5vh
        font-size 1.2vh
        border none
.set_box .set_info .firstForm ul li
    height 2.5vh
    line-height 2.5vh
.set_box .set_info .firstForm ul li.gui input.guiNum
    width 15%
.set_box .set_info .firstForm
    min-width 900px
    ul
        width 100%
        min-width 50vh
        .save
            margin-left 2vh
        li
            width 33%
            &.gui
                width 33%
                label
                    width 30%
                input.guiNum
                    width 25%
                .guiName
                    width 42%
                button
                    width 5vh
            &.hua
                width 45%
                input
                    width 80%
                label
                    width 20%
            input
                height 2.5vh
                line-height 2.5vh
                    &.guiNum
                        width 15%
            button
                height 2.5vh
                line-height 2.5vh
            label
                &.name
                    font-size 1.6vh
.set_box .set_info ul
    min-width 50vh
.set_box .set_info .secondForm
    min-width 50vh
    height auto
    padding-bottom 0.5vh
    border 1px solid #ebeef5
    li
        width 35%
        height 2.5vh
        line-height 2.5vh
        &.secondSave
            width 15%
        &.gui
            width 50%
        input
            height 2.5vh
            line-height 2.5vh
        button
            height 2.5vh
            line-height 2.5vh
// 表格
.button_btn
    border 0.1vh solid #409eff !important
    font-weight bold
    color #409eff
.order_table
    width 99%
    margin 5px auto 0
    max-height 45vh
    border 1px solid #ebeef5
    overflow hidden
    .el-button
        padding 0.4vh 1.2vh
        margin-top 0.2vh
        border 1px solid #ebeef5
        color #d9d9d9
        font-size 1.2vh
        &.btn
            border 1px solid #409eff
            color #409eff
.srcond_menu
    li
        &:hover
            background #d2d2d2            
</style>