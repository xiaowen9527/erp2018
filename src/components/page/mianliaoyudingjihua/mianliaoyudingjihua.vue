<template>
    <div class="container" :class="{container_collapse:collapse}">
        <p class="page_title">面料预定计划</p>
        <div class="btn-box">
            <button :disabled='doAdd' :class="{button_btn:!doAdd}" @click="doAdds">新增</button>
            <button :disabled='doCancel' :class="{button_btn:!doCancel}" @click="doCancels">取消</button>
            <button :disabled='doEdit' :class="{button_btn:!doEdit}" @click="doEdits">修改</button>
            <button :disabled='doDelete' :class="{button_btn:!doDelete}" @click="doDeletes">删除</button>
            <button class="button_btn" @click="doSearchs">查询</button>
            <input type="text" placeholder="请输入查询内容" class="doSearch" v-model="search">
            <button class="button_btn" @click="doOuts">退出</button>
            <button class="button_btn" @click="refresh">刷新</button>
            <div class="btn_right">
                <button :disabled='doPrint' :class="{button_btn:!doPrint}" @click="doPrints">打印</button>
                <button :disabled='doExport' :class="{button_btn:!doExport}" @click="doExports">导出</button>
                <button :disabled='(firstForm.sh==1||firstForm.sh==-1)' :class="{button_btn:(firstForm.sh==0)}" @click="doExamines">审核</button>
                <button :disabled='(firstForm.sh==0||firstForm.sh==-1)' :class="{button_btn:(firstForm.sh==1)}" @click="doExamineAgains">反审</button>

            </div>
        </div>

        <div class="set_box">
            <div class="menu_box">
                <el-menu @select="menuSelected" unique-opened background-color="#f2f2f2" text-color="#303133" active-text-color="#303133">
                    <NavMenu :navMenus="this.navMenus"/>
                </el-menu>
                <SearchYearMonth />
            </div>
            <div class="set_info">

                <section class="firstForm">
                    <ul class="clearfix">
                        <li class="gui">
                            <label>供应商</label>
                            <input :disabled="firstFormOn" v-model="firstForm.aKsDaSn" class="guiNum" readonly type="text" placeholder="请选择" @click="oldMenu = true">
                            <input :disabled="firstFormOn" v-model="firstForm.aKsDaName" class="guiName" readonly type="text" placeholder="请选择" @click="oldMenu = true">
                            <button :disabled="firstFormOn" @click="oldMenu = true">。。。</button>
                        </li>

                        <li>
                            <label>单号</label>
                            <input disabled v-model="firstForm.sn" type="text" placeholder="自动生成">
                        </li>
                        <li>
                            <label class="name">业务日期</label>
                            <el-date-picker format="yyyy 年 MM 月 dd 日" value-format="yyyy-MM-dd" :disabled="firstFormOn" v-model="firstForm.date" type="date" placeholder="选择日期"> </el-date-picker>

                        </li>
                        <li>
                            <label class="name">年度</label>
                            <!-- <input :disabled="firstFormOn" v-model="firstForm.year" type="text"> -->
                            <el-select :disabled="firstFormOn" v-model="firstForm.year" placeholder="请选择">
                                <el-option v-for="item in this.year" :key="item.name" :label="item.name" :value="item.name">
                                </el-option>
                            </el-select>                            
                        </li>

                        <button :disabled="firstFormOn" :class="{button_btn:!firstFormOn,save:true}" @click="firstSave" class="save">保存</button>

                    </ul>
                </section>

                <section class="secondForm clearfix">
                    <p>编号/名称/色号/供色/布宽/采购单位/克重 <button :disabled="secondFormGui" :class="{button_btn:!secondFormGui}" @click="getTabel">。。。</button></p>
                    <div class="secondFromTable">
                        <el-table :data="secondFormList" border style="width: 100%">
                            <el-table-column prop="sn" label="编号" min-width="15%">
                            </el-table-column>
                            <el-table-column prop="name" label="名称" min-width="15%">
                            </el-table-column>
                            <el-table-column prop="yscmSn" label="色号" min-width="15%">
                            </el-table-column>
                            <el-table-column prop="gysYsSn" label="供方色系" min-width="15%">
                            </el-table-column>
                            <el-table-column prop="size" label="布宽" min-width="14%">
                            </el-table-column>
                            <el-table-column prop="cgUnit" label="采购单位" min-width="13%">
                            </el-table-column>
                            <el-table-column prop="kz" label="克重" min-width="13%">
                            </el-table-column>
                        </el-table>
                    </div>
                    <ul class="secondFormForm clearfix">
                        <li>
                            <label>品牌</label>
                            <el-select :disabled="secondFormOn" v-model="secondForm.brandName" placeholder="请选择">
                                <el-option v-for="item in this.brand" :key="item.name" :label="item.name" :value="item.name">
                                </el-option>
                            </el-select>
                        </li>
                        <li>
                            <label>季度</label>
                            <el-select :disabled="secondFormOn" v-model="secondForm.quarter" placeholder="请选择">
                                <el-option v-for="item in this.quarter" :key="item.name" :label="item.name" :value="item.name">
                                </el-option>
                            </el-select>
                        </li>
                        <li class="last">
                            <label>工艺</label>
                            <input type="text" v-model="secondForm.technics" :disabled="secondFormOn" placeholder="必填">
                        </li>

                        <li>
                            <label>数量</label>
                            <input type="number" v-model="secondForm.amount" :disabled="secondFormOn" placeholder="必填">
                        </li>
                        <li>
                            <label>单价</label>
                            <input type="number" v-model="secondForm.price" :disabled="secondFormOn" placeholder="必填">
                        </li>
                        <button :disabled="secondFormOn" :class="{button_btn:!secondFormOn,save:true}" @click="secondSave" class="save">保存</button>
                    </ul>
                    <div class="order_table">
                        <el-table :data="list" height="45vh" border style="width: 100%" @sort-change='sortChange' :default-sort="{prop: 'master_sn', order: 'ascending'}">
                            <el-table-column prop="materialSn" label="物料编号" min-width="8%" sortable='custom'>
                            </el-table-column>
                            <el-table-column label="名称" min-width="7%">
                                <template slot-scope="scope">
                                   <span>{{scope.row.materialName}}-{{scope.row.matType}}</span>
                                </template>                                  
                            </el-table-column>
                            <el-table-column  prop="yscmSn" label="色号" min-width="7%" sortable='custom'>
                                <template slot-scope="scope">
                                   <span>{{scope.row.yscmSn}}-{{scope.row.yscmName}}</span>
                                </template>                            
                            </el-table-column>
                            <el-table-column prop="gysYsSn" label="供方色号" min-width="8%" sortable='custom'>
                            </el-table-column>
                            <el-table-column prop="size" label="布宽" min-width="6%">
                            </el-table-column>
                            <el-table-column prop="cgUnit" label="采购单位" min-width="6%">
                            </el-table-column>
                            <el-table-column prop="kz" label="克重" min-width="6%">
                            </el-table-column>
                            <el-table-column prop="quarter" label="季度" min-width="6%">
                            </el-table-column>
                            <el-table-column prop="brandName" label="品牌" min-width="6%">
                            </el-table-column>
                            <el-table-column prop="technics" label="工艺" min-width="8%">
                            </el-table-column>
                            <el-table-column prop="amount" label="采购数量" min-width="6%">
                            </el-table-column>
                            <el-table-column prop="price" label="单价" min-width="6%">
                            </el-table-column>
                            <el-table-column prop="money" label="金额" min-width="6%">
                            </el-table-column>
                            <el-table-column fixed="right" label="操作" min-width="14%">
                                <template slot-scope="scope">
                                    <el-button  :disabled='(firstForm.sh==1||firstForm.sh==-1)' :class="{btn:(firstForm.sh==0)}" @click="handleEdit(scope.$index, scope.row)" type="text">修改</el-button>
                                    <el-button :disabled='(firstForm.sh==1||firstForm.sh==-1)' :class="{btn:(firstForm.sh==0)}" type="text" @click="tableDelete(scope.$index, scope.row)">删除</el-button>
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

        <el-dialog class="dangan" title="请输入您要查询的面料档案" :visible.sync="secondTableBtn">
            <el-input v-model="searchSecondTable" placeholder="请输入您要查询的面料档案"></el-input>
            <ul class="srcond_menu">
                <li v-if="searchSecondTableList.length===0">暂无数据</li>
                <p v-if="searchSecondTableList.length>0" style="margin-bottom:1vh" class="clearfix">
                    <span>编号</span>
                    <span>名称</span>
                    <span>归属</span>
                    <span>采购单位</span>
                    <span>布宽</span>
                    <span>克重</span>
                    <span>花形/说明</span>
                    <span>色号</span>
                    <span>色号名称</span>
                    <span>供商色号</span>
                </p>
                <li v-for="(item,i) in searchSecondTableList" :key="i" @click="getOldColor(item)" class="clearfix">
                    <span>{{item.sn}}</span>
                    <span>{{item.name}}</span>
                    <span>{{item.typeName}}</span>
                    <span>{{item.cgUnit}}</span>
                    <span>{{item.size}}</span>
                    <span>{{item.kz}}</span>
                    <span>{{item.pattern}}</span>
                    <span>{{item.yscmSn}}</span>
                    <span>{{item.yscmName}}</span>
                    <span>{{item.gysYsSn}}</span>
                </li>
            </ul>
        </el-dialog>

        <el-dialog title="供应商" :visible.sync="oldMenu">
            <ul class="srcond_menu" ref="gysaaa">
                <li v-if="gys.length===0">暂无数据</li>
                <li v-for="(item,i) in gys" :key="i">
                    <span class="oldMenu" @click="getOldMenu(item)">|--{{item.name}}</span>
                </li>
            </ul>
        </el-dialog>
        <!-- 编辑弹出框 -->
        <el-dialog title="编辑" :visible.sync="editVisible" width="30%">
            <el-form :model="dialog" label-width="100px">
                <el-form-item label="品牌">
                    <el-select v-model="dialog.brandName" placeholder="请选择">
                        <el-option v-for="item in this.brand" :key="item.name" :label="item.name" :value="item.name">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="季度">
                    <el-select v-model="dialog.quarter" placeholder="请选择">
                        <el-option v-for="item in this.quarter" :key="item.name" :label="item.name" :value="item.name">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="工艺">
                    <el-input v-model="dialog.technics" type="text"></el-input>
                </el-form-item>
                <el-form-item label="数量">
                    <el-input v-model="dialog.amount" type="number"></el-input>
                </el-form-item>
                <el-form-item label="单价">
                    <el-input v-model="dialog.price" type="number"></el-input>
                </el-form-item>

            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="editVisible = false">取 消</el-button>
                <el-button type="primary" @click="saveEdit">确 定</el-button>
            </span>
        </el-dialog>

    </div>
</template>

<script>
import "@/assets/js/import.js"; //导入请求超时拦截
import { mapState } from "vuex";
import {
    NetworkAnomaly,
    abnormal,
    succ,
    error,
    getOut
} from "../../../assets/js/message.js";
import NavMenu from "./NavMenu";
import SearchYearMonth from "../../pageCommon/searchYearMonth";
import qs from "qs";
export default {
    name: "mianliaoyudingjihua",
    data() {
        return {
            //按钮disabled
            doAdd: false,
            doCancel: true,
            doEdit: true,
            doDelete: true,
            doExport: false,
            doPrint:true,

            //form的disabled
            firstFormNo: true,
            firstFormOn: true,
            firstFormGui: true,
            secondFormNo: true,
            secondFormOn: true,
            secondFormGui: true,

            //bind值
            search: "", //查询
            navMenus: [], //导航数据
            // yearMonth:"",   //导航年月
            // pickerBeginDateBefore: {    //禁止选择超过当前时间的年月
            //     disabledDate(time) {
            //         return time.getTime() > Date.now();
            //     }
            // },  
                    
            oldMenu: false,
            oldTable: false,
            addEdit: true, //新增修改开关

            secondTableBtn: false, //table查询框开关
            searchSecondTable: "", //table查询框的值
            searchSecondTableList: [], //table查询值列表
            secondFormList: [], //table列表





            firstForm: {
                sn: "", //单号
                date: "", //业务日期
                aKsDaSn: "", //供应商编号
                aKsDaName: "", //供应商名称
                year: "", //年度
                sh: "-1" ,// 审核
                addUser: "",
                addDate: "",
                updateUser: "",
                updateDate: "",
                shUser: "",
                shDate: "",

            },

            gys: [], //供应商数据
            //下拉数据
            year:[],    //年度
            quarter: [], //季度
            brand: [], //品牌

            secondForm: {
                masterId: "", //主表的id
                brandName: "", //品牌名称
                brandSn: "", //品牌编号
                cWldaAId: "", //颜色面料Id
                amount: "", //数量
                price: "", //  单价
                quarter: "", //季度
                quarterSn: "", //季度编号
                technics: "", //工艺
                price: ""
            },
            list: [],
            printList:[],

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
    methods: {
        //按钮初始状态
        emptyBtn() {
            this.doAdd = false;
            this.doCancel = true;
            this.doEdit = true;
            this.doDelete = true;
            this.doExport = false;
        },
        //按钮按下状态
        emptyBtnTo() {
            this.doAdd = true;
            this.doCancel = false;
            this.doEdit = true;
            this.doDelete = true;
            this.doExport = true;
        },
        //表单1恢复初始空值状态
        emptyFirstForm() {
            this.firstForm = {
                sn: "", //单号
                date: "", //业务日期
                aKsDaSn: "", //供应商编号
                aKsDaName: "", //供应商名称
                year: "", //年度
                status: "3", //状态
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
                masterId: "", //主表的id
                brandName: "", //品牌名称
                brandSn: "", //品牌编号
                cWldaAId: "", //颜色面料Id
                amount: "", //数量
                price: "", //  单价
                quarter: "", //季度
                quarterSn: "", //季度编号
                technics: "", //工艺
                price: ""
            };
            this.secondFormList = []
        },
        //禁用表单first
        disabledFirstForm() {
            this.firstFormNo = true;
            this.firstFormOn = true;
            this.firstFormOnGui = true;
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

            this.addEdit = true;

            this.getGys();
            this.getYear()

            //获取表单的下拉
            // this.getYl();
            // this.getCg();
            // this.getBk();
            // this.getKz();
        },
        //取消
        doCancels() {
            this.emptyBtn();
            this.emptyFirstForm();
            this.emptySecondForm();
            this.disabledFirstForm();
            this.disabledSecondForm();
            this.list = [];
            this.pageOnOff = false;
            this.doPrint = true
            this.secondFormList = [];
        },
        //修改
        doEdits() {
            this.emptyBtnTo();
            this.noDisabledFirstForm();
            this.disabledSecondForm();
            this.emptySecondForm();
            this.getYear()
            this.addEdit = false;
            this.doAdd = false;
            this.noDisabledFirstForm;
        },
        //删除
        doDeletes() {
            this.$http
                .post("/TPA/cMlydjh/delete?id=" + this.firstForm.id)
                .then(res => {
                    if (res.data.code === 0) {
                        this.getnavMenu();
                        this.doCancels();
                        succ(res.data.code);
                    } else {
                        error(res.data.msg);
                    }
                })
                .catch(err => {
                    NetworkAnomaly();
                });
        },
        //first保存
        firstSave() {
            if (
                this.firstForm.aKsDaSn.length === 0 ||
                this.firstForm.aKsDaName.length === 0
            ) {
                error("供应商不能为空");
                this.firstForm.aKsDaSn = ""
                this.firstForm.aKsDaName=""
            } else if (this.firstForm.date.length === 0) {
                error("业务日期不能为空");
                this.firstForm.date = ""
            } else if (this.firstForm.year.length === 0) {
                error("年度不能为空");
                this.firstForm.year = ""
            } else {
                if (this.addEdit) {
                    this.$http
                        .post(
                            "/TPA/cMlydjh/insert",
                            qs.stringify(this.firstForm)
                        )
                        .then(res => {
                            if (res.data.code === 0) {
                                this.firstForm = res.data.data;
                                this.secondForm.masterId = this.firstForm.id;
                                this.getnavMenu();
                                this.disabledFirstForm();
                                this.secondFormGui = false;
                                this.doAdd = false;
                                this.doEdit = false;
                                this.doDelete = false;
                                succ(res.data.msg);
                            } else {
                                error(res.data.msg);
                            }
                        })
                        .catch(err => {
                            NetworkAnomaly();
                        });
                } else {
                    this.$http
                        .post(
                            "/TPA/cMlydjh/update",
                            qs.stringify(this.firstForm)
                        )
                        .then(res => {
                            if (res.data.code === 0) {
                                this.firstForm = res.data.data;
                                this.getnavMenu();
                                this.disabledFirstForm();
                                this.doEdit = false;
                                this.doDelete = false;
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
            this.secondForm.quarterSn = this.getSn(
                this.quarter,
                this.secondForm.quarter
            );
            this.secondForm.brandSn = this.getSn(
                this.brand,
                this.secondForm.brandName
            );
            console.log(this.secondForm)
            if (this.secondForm.amount.length === 0) {
                error("数量不能为空！");
            } else if (this.secondForm.price.length === 0) {
                error("单价不能为空！");
            } else {
                this.$http
                    .post("/TPA/cmlydjhA/insert", qs.stringify(this.secondForm))
                    .then(res => {
                        if (res.data.code === 0) {
                            succ(res.data.msg);
                            let masterId = this.secondForm.masterId;
                            let cWldaAId = this.secondForm.cWldaAId;
                            this.emptySecondForm();
                            this.secondFormOn = true
                            this.secondForm.masterId = masterId;
                            this.secondForm.cWldaAId = cWldaAId;
                            let params = {
                                masterSn: this.firstForm.sn,
                                orderBy: "master_sn asc",
                                page: 0,
                                count: this.pageSize
                            };
                            this.pageParams = params;
                            this.getPageData();
                            this.secondFormGui = false;
                        } else {
                            error(res.data.msg);
                        }
                    })
                    .catch(err => {
                        NetworkAnomaly();
                    });
            }
        },
        //获取编号（季度/品牌）
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
        //查询
        doSearchs() {
            if (this.search.length === 0) {
                error("查询条件为空");
                this.search = ""
            } else {
                this.$http
                    .post("/TPA/cMlydjh/getBy?sn=" + this.search)
                    .then(res => {
                        if (res.data.code === 0) {
                            this.emptyBtnTo()
                            this.doCancel = false
                            this.doEdit = false
                            this.doDelete = false
                            this.doAdd = false
                            this.search = "";
                            this.firstForm = res.data.data[0];
                            let params = {
                                masterSn: this.firstForm.sn,
                                orderBy: "master_sn asc",
                                page: 0,
                                count: this.pageSize
                            };
                            this.pageParams = params;
                            this.getPageData();
                            this.secondFormGui = false;
                        } else {
                            error(res.data.msg);
                        }
                    })
                    .catch(err => {
                        NetworkAnomaly();
                    });
            }
        },
        //退出
        doOuts() {
            this.$emit("getOut", this.$route.name);
        },
        //刷新
        refresh() {
            this.getnavMenu();
            this.list = [];
            this.secondFormList = [];
            this.doCancels();
            this.$store.dispatch("refresh", 1);
            succ("刷新成功");
        },

        //导出
        doExports() {
            window.location.href = "/TPA/cMlydjh/exportExcel";
        },

        //打印
        doPrints() {
            let params = {
                masterSn: this.firstForm.sn,
                orderBy: "master_sn asc",
            };
            this.$http
                .post(
                    "/TPA/cmlydjhA/search?delStatus=0",
                    qs.stringify(params)
                )
                .then(res => {
                    if (res.data.code === 0) {
                        this.printList = res.data.data.list;
                        localStorage.setItem("pageTit", JSON.stringify(this.firstForm));
                        localStorage.setItem("printList", JSON.stringify(this.printList));
                        
                        // window.open("/#/mianliaoyudingjihuaPrint");
                    } else {
                        error(res.data.msg);
                    }
                })
                .catch(err => {
                    NetworkAnomaly();
                });
            // localStorage.setItem("pageTit", JSON.stringify(this.firstForm));

            window.open("/erp/#/mianliaoyudingjihuaPrint");
            this.printList = []
        },
        //审核
        doExamines() {
            let params = {
                id: this.firstForm.id,
                status: "1"
            };
            this.$http
                .post("/TPA/cMlydjh/auditing", qs.stringify(params))
                .then(res => {
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
            this.$http
                .post("/TPA/cMlydjh/auditing", qs.stringify(params))
                .then(res => {
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

        //获取nav
        getnavMenu() {
            let search = {
                addDate: 16 + "|" + this.searchym
            };
            let searchStr = JSON.stringify(search);
            this.$http
                .post("/TPA/cMlydjh/search?delStatus=0&search="+searchStr)
                .then(res => {
                    if (res.data.code === 0) {
                        this.navMenus = res.data.data.list;
                    } else {
                        error(res.data.msg);
                    }
                })
                .catch(err => {
                    NetworkAnomaly();
                });
        },
        //点击second的table的按钮
        getTabel() {
            this.secondTableBtn = true;
            this.searchSecondTable = ""; //table查询框的值
            this.searchSecondTableList = []; //table查询值列表
            this.secondFormList = []; //table列表
        },
        //获取供应商
        getGys() {
            this.$http
                .post("/TPA/aKsDa/search?status=1&delStatus=0&type=供应商")
                .then(res => {
                    if (res.status === 200 && res.data.code === 0) {
                        this.gys = res.data.data.list;
                    }
                })
                .catch(err => {
                    NetworkAnomaly();
                });
        },
        //选择供应商
        getOldMenu(item) {
            // console.log(this.$refs.gysaaa.scrollTop,this.$refs.gysaaa.scrollHeight,this.$refs.gysaaa.clientHeight)
            this.firstForm.aKsDaSn = item.sn;
            this.firstForm.aKsDaName = item.name;
            this.oldMenu = false;
        },
        //菜单点击查询
        menuSelected(index) {
            this.disabledFirstForm();
            this.pageOnOff = false;
            let data = index.split(",");

            //查询自身
            this.$http
                .post("/TPA/cMlydjh/get?id=" + data[1])
                .then(res => {
                    if (res.data.code === 0) {
                        this.firstForm = res.data.data;
                        this.secondForm.masterId = this.firstForm.id;
                        this.emptyBtnTo();
                        this.doAdd = false;
                        this.doEdit = false;
                        this.doDelete = false;
                        this.secondFormGui = false;

                        //查询表格数据
                        if (this.pageParams.orderBy.length === 0) {
                            let params = {
                                masterSn: this.firstForm.sn,
                                orderBy: "master_sn asc",
                                page: 0,
                                count: this.pageSize
                            };
                            this.pageParams = params;
                        } else {
                            this.pageParams.masterSn = this.firstForm.sn;
                            this.pageParams.page = 0;
                            this.pageParams.count = this.pageSize;
                        }
                        this.getPageData();
                        this.secondFormGui = false;
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
        //获取分页数据
        getPageData() {
            this.$http
                .post(
                    "/TPA/cmlydjhA/search?delStatus=0",
                    qs.stringify(this.pageParams)
                )
                .then(res => {
                    if (res.data.code === 0) {
                        this.doPrint = false
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

        //选择颜色并获取当前编号的资料
        getOldColor(item) {
            this.secondForm.cWldaAId = item.id;
            this.secondFormList.push(item);
            this.secondTableBtn = false;
            console.log(this.secondFormList)
        },
        //获取年度
        getYear(){
            this.$http.post('/TPA/aLbJb/getBySn?sn=001')
            .then(res=>{
                if (res.data.code === 0) {
                        this.year = res.data.data;
                    } else {
                        error(res.data.msg);
                    }
            })
            .catch(err=>{
                NetworkAnomaly();
            })
        },
        //获取品牌
        getBrand() {
            this.$http
                .post("/TPA/aLbJb/getBySn?sn=003")
                .then(res => {
                    if (res.data.code == 0) {
                        this.brand = res.data.data;
                    } else {
                        error(res.data.msg);
                    }
                })
                .catch(err => {
                    NetworkAnomaly();
                });
        },
        //获取季度
        getQuarter() {
            this.$http
                .post("/TPA/aLbJb/getBySn?sn=002")
                .then(res => {
                    if (res.data.code == 0) {
                        this.quarter = res.data.data;
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
            console.log(column.prop)
            if (this.pageParams.orderBy.length !== 0) {
                if (column.prop == "materialSn" && column.order == "descending") {
                    this.pageParams.orderBy = "material_sn desc";
                } else if (
                    column.prop == "materialSn" &&
                    column.order == "ascending"
                ) {
                    this.pageParams.orderBy = "material_sn asc";
                } else if (
                    column.prop == "yscmSn" &&
                    column.order == "descending"
                ) {
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
                    this.pageParams.orderBy = "master_sn asc";
                }
                if (this.list.length !== 0) {
                    this.getPageData();
                }
            }
        },
        //编辑单条数据
        handleEdit(index, row) {
            this.getBrand();
            this.getQuarter();
            this.idx = index;
            const item = this.list[index];
            (this.dialog = {
                id: item.id, //id
                quarter: item.quarter,
                quarterSn: item.quarterSn,
                brandName: item.brandName,
                brandSn: item.brandSn,
                technics: item.technics,
                amount: item.amount,
                price: item.price
            }),
                (this.editVisible = true);
                console.log(item)
        },
        // 保存编辑
        saveEdit() {
            this.dialog.quarterSn = this.getSn(
                this.quarter,
                this.dialog.quarter
            );
            this.dialog.brandSn = this.getSn(this.brand, this.dialog.brandName);
            if (this.dialog.amount.length === 0) {
                error("数量不能为空");
            } else if (this.dialog.price.length === 0) {
                error("单价不能为空");
            } else {
                this.$http
                    .post("/TPA/cmlydjhA/update", qs.stringify(this.dialog))
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
            }
        },
        //删除表格的单条数据
        tableDelete(index, row) {
            this.idx = index;
            const item = this.list[index];
            this.$http
                .post("/TPA/cmlydjhA/delete?id=" + item.id)
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
        //查询颜色
        getSearchTable() {

            this.$http
                .post("/TPA/cWldaA/getByName?name=" + this.searchSecondTable)
                .then(res => {
                    if (res.data.code === 0) {
                        this.searchSecondTableList = res.data.data;
                    } else {
                        error(res.data.msg);
                    }
                })
                .catch(err => {
                    NetworkAnomaly();
                });
        },
        //模糊查询颜色
        vagueSearchSecondTable(){
            if(this.searchSecondTable){
                this.$http
                    .post("/TPA/cWldaA/getByName?name=" + this.searchSecondTable)
                    .then(res => {
                        if (res.data.code === 0) {
                            if(res.data.data.length>0){
                                this.searchSecondTableList = res.data.data;
                            }else{
                                error('暂无数据')   
                                this.searchSecondTableList = []                               
                            }
                        } else {
                            error(res.data.msg);
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
        this.getnavMenu();
    },
    watch: {
        page() {
            this.pageParams.page = this.page - 1;
            this.getPageData();
        },
        //模糊搜索框
        searchSecondTable() {
            if(this.searchSecondTable){
                this.getSearchTable();
            }else{
               this.searchSecondTableList = [];
            }
        },
        //table数据变化
        secondFormList() {
            if (this.secondFormList.length !== 0) {
                this.getBrand();
                this.getQuarter();
                this.noDisabledSecondForm();
            }
        },
        //监测导航年月
        searchym(){
            if(this.searchym){
                this.getnavMenu();
            }
        }
    },
    computed: {
        ...mapState(["collapse","searchym"])
    },
    components: {
        NavMenu,SearchYearMonth
    }
};
</script>

<style lang="stylus" scoped>
.container>>>.el-submenu__title, .container>>>.el-menu-item
    height 3vh
    line-height 3vh
    font-size 1.6vh !important
.secondForm>>>th, .order_table>>>.el-table td, .el-table th, .secondFromTable>>>.el-table td, .el-table th
    padding 0
.secondForm>>>.el-submenu__title, .container>>>.el-menu-item
    height 3vh
    line-height 3vh
    font-size 1.6vh !important
.secondForm>>>.el-table .cell
    text-align center
    font-size 1.3vh
    white-space: pre-line !important
.secondFromTable>>>.el-table .cell
    height 3.5vh
    line-height 3.5vh
    text-align center
    font-size 1.3vh !important
    white-space: pre-line !important
.secondForm>>>.el-table__empty-block
    min-height 3.5vh
.container>>>.el-dialog
    width 500px
    height 500px
    overflow-x hidden
.container>>>.dangan .el-dialog
        width 1000px !important
.container>>>.el-dialog__body
    cursor pointer !important
    line-height 3.5vh
    font-weight bold
    padding 1vh 2vh
.container>>>.el-dialog__body .el-select
    width 100%
.container>>>.el-dialog__body .el-input__inner
    width 100%
.container>>>.el-dialog__body .el-select .el-input .el-input__inner
    width 100%
    height 4vh !important
    line-height 4vh
.container>>>.el-date-editor.el-input
    width 60%
// 导航日期选择器
// .container>>>.searchYearMonth .el-date-editor.el-input,.container>>>.searchYearMonth .el-input__inner
//     width 100%   
//     height 3.5vh
//     line-height 3.5vh 
//     font-size 1.2vh
//     margin .4vh 0
// .container>>>.searchYearMonth .el-input__inner
//     width 100%
//     padding 0 .5vh 0 3vh

.container>>>.el-select>.el-input
    height 3vh
.container>>>.secondForm .el-input__inner
    border-radius 0
    border 1px solid #d2d2d2
.container>>>.firstForm .el-input__inner
    width 100% !important
    font-size 1.6vh
    padding-left 3vh !important
.container>>>.el-dialog__body>>>.el-input__inner
    padding-left 0 !important
.container>>>.el-input__icon
    width 1vh
    line-height 3.5vh
    font-size 1.2vh
.btn-box
    min-width 1100px    
.menu_box
    width 12%
    overflow hidden

.set_box .menu_box ul
    height 71vh 
    overflow-y auto
.srcond_menu p
        width 100%
        margin 0 !important
        height 3vh
        span
            display: block;
            width: 10%;
            text-align: center;
            line-height 3vh
            float left
.srcond_menu li
    &:hover
        background #d2d2d2
    span
        width 10%
        float left
        text-align center
        line-height 3.5vh
        font-size 1.4vh
        &.oldMenu
            width 100%
            text-align left
.set_info
    width 87.5%
    margin-right .5%
    .firstForm
        min-width 1100px
        ul
            li
                width 30%
                &.gui
                    label
                        width 12%
            button
                &.save
                    margin 1vh !important
    .secondForm
        min-width 1100px !important
        p
            font-size 1.2vh
            padding 0.4vh 2vh
            button
                width 5vh
                height 3vh
                border 0.1vh solid #d2d2d2
                background none
                line-height 3vh
                text-align center
                border-radius 5px
                cursor pointer
                margin-left 2vh
                &.button_btn
                    border 0.1vh solid #409eff
                    font-weight bold
                    color #409eff
        .secondFromTable
            width 40.5vw
            float left
            margin-left 0.5%
            margin-bottom 5px
        .secondFormForm
            width 35vw
            float left
            min-width 450px
            li
                height 3vh !important
                width 33%
                margin 0.2vh 0
                label
                    width 40%
                    dispaly block
                    float left
                    line-height 3vh
                input, .el-select
                    width 60%
                    float left
                    dispaly block
                    height 3vh
                    line-height 3vh
.container>>>.el-select .el-input__icon
    height 3vh
    line-height 3vh
    font-size 1.4vh
.container>>>.el-select .el-input .el-input__inner
    width 100%
    height 3vh !important
    line-height 3vh
    font-size 1.4vh
.set_box .set_info .secondForm .save
    height 3vh
    line-height 3vh
    margin-top 0.4vh
    margin-left 7.5vh
.order_table
    width 75.5vw
    margin-left .5%
    height 45vh
    border 0.1vh solid #d9d9d9
    overflow hidden
    .el-button
        padding .5vh 2vh
        margin-top 0.4vh
        border 0.1vh solid #d2d2d2
        &.btn
            border 0.1vh solid #409eff
            color #409eff
</style>
