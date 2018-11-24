<template>
    <div class="container" :class="{container_collapse:collapse}">
        <p class="page_title">物料清单</p>
        <div class="btn-box">
            <button :disabled='doAdd' :class="{button_btn:!doAdd}" @click="doAdds">新增</button>
            <button :disabled='doCancel' :class="{button_btn:!doCancel}" @click="doCancels">取消</button>
            <button :disabled='doPrint' :class="{button_btn:!doPrint}">打印</button>
            <button :disabled='doImport' :class="{button_btn:!doImport}" >导入</button>
            <button  @click="doSearchs" class="button_btn">查询</button>
            <input type="text" placeholder="请选择" class="doSearch" readonly @click="doSearchs">
            <button class="button_btn" @click="doOuts">退出</button>
            <div class="btn_right">

                <button :disabled='(firstForm.sh==1||firstForm.sh==-1)' :class="{button_btn:(firstForm.sh==0)}" @click="doExamines">审核</button>
                <button :disabled='(firstForm.sh==0||firstForm.sh==-1)' :class="{button_btn:(firstForm.sh==1)}" @click="doExamineAgains">反审</button>
            </div>
        </div>
        <div class="set_box">
            <div class="set_info">
                <section class="firstForm">
                    <ul class="clearfix">
                        <li class="gui clearfix">
                            <label>设计款号</label>
                            <input type="text" placeholder="请选择(必填)" readonly :disabled="firstFormOn" @click="handlePsn" v-model="firstForm.psn">
                            <button :class="{gui_btn:!firstFormGui}" :disabled="firstFormOn" @click="handlePsn">。。。</button>
                            <button :disabled="firstFormOn" :class="{button_btn:!firstFormGui}" class="save" @click="firstSave">保存</button>
                        </li>
                    </ul>
                </section>

                <section class="secondForm">
                    <ul class="clearfix">
                        <li class="gui">
                            <label>物料编号</label>
                            <input :disabled="secondFormNo" readonly  @click="oldMaterial = true" placeholder="请选择(必选)" v-model="secondForm.materialSn" class="guiNum"  type="text" >
                            <input :disabled="secondFormNo" readonly  @click="oldMaterial = true" v-model="secondForm.materialName" class="guiName"  type="text" >
                            <button :class="{gui_btn:!secondFormGui}" :disabled="secondFormGui" @click="oldMaterial = true">。。。</button>
                        </li>
                        <li>
                            <label>开发用量</label>
                            <input type="text" v-model="secondForm.amount" :disabled="secondFormOn" placeholder="必填">
                        </li>
                        <li>
                            <label>性质</label>
                                <el-select :disabled="secondFormOn" v-model="secondForm.nature" placeholder="请选择(必选)">
                                    <el-option v-for="item in this.natureList" :key="item.name" :label="item.name" :value="item.name">
                                    </el-option>
                                </el-select>
                        </li>
                        <li>
                            <label>成品编码</label>
                            <input type="text" v-model="secondForm.productSn" :disabled="secondFormOn" placeholder="必填">
                        </li>
                        <li>
                            <label>领用部门</label>
                            <input type="text" v-model="secondForm.func" readonly :disabled="secondFormOn" placeholder="请选择(必选)" @click="oldFunc = true">
                        </li>                          
                        <li>
                            <label>应用部位</label>
                            <input type="text" v-model="secondForm.part" :disabled="secondFormOn" placeholder="必填">
                        </li>
                        <li>
                            <label>生产损耗</label>
                            <input type="text" v-model="secondForm.loss" :disabled="secondFormOn" placeholder="必填">
                        </li>                     
                        <li>
                            <label>大量货用量</label>
                            <input type="text" v-model="secondForm.dosage" :disabled="secondFormOn" placeholder="必填">
                        </li>                     
                        <li>
                            <label>用量单位</label>
                            <el-select :disabled="secondFormOn" v-model="secondForm.dosageUnit" placeholder="请选择(必选)">
                                <el-option v-for="item in this.dosageUnit" :key="item.name" :label="item.name" :value="item.name">
                                </el-option>
                            </el-select>                            
                        </li>                     
                        <li class="explain">
                            <label>说明</label>
                            <input type="text" v-model="secondForm.explain" :disabled="secondFormOn" placeholder="必填">
                        </li>

                        <button :disabled="secondFormOn" :class="{button_btn:!secondFormOn}" @click="secondSave" class="save">保存</button>
                    </ul>

                    <div class="main clearfix">
                        <div class="fl">
                            <div class="order_table fl_table">
                                <el-table :data="list" border style="width: 100%">
                                    <el-table-column prop="materialSn" label="物料编码" min-width="7.5%">
                                    </el-table-column>
                                    <el-table-column prop="materialName" label="名称" min-width="7.5%">
                                    </el-table-column>
                                    <el-table-column prop="kz" label="克重" min-width="7.5%">
                                    </el-table-column>
                                    <el-table-column prop="size" label="布宽" min-width="7.5%">
                                    </el-table-column>
                                    <el-table-column prop="dosageUnit" label="用量单位" min-width="7.5%">
                                    </el-table-column>
                                    <el-table-column prop="dosage" label="用量" min-width="7.5%">
                                    </el-table-column>
                                    <el-table-column prop="purchaseUnit" label="采购单位" min-width="7.5%">
                                    </el-table-column>
                                    <el-table-column prop="func" label="领用部门" min-width="7.5%">
                                    </el-table-column>
                                    <el-table-column prop="part" label="应用部位" min-width="7.5%">
                                    </el-table-column>
                                    <el-table-column prop="explain" label="规格说明" min-width="7.5%">
                                    </el-table-column>
                                    <el-table-column prop="nature" label="性质" min-width="7.5%">
                                    </el-table-column>
                                    <el-table-column label="操作" min-width="10%">
                                        <template slot-scope="scope">
                                            <el-button :disabled='(firstForm.sh==1||firstForm.sh==-1)' :class="{btn:firstForm.sh==0}" type="text">修改</el-button>
                                            <el-button :disabled='(firstForm.sh==1||firstForm.sh==-1)'  :class="{btn:firstForm.sh==0}" type="text">删除</el-button>
                                        </template>
                                    </el-table-column>
                                </el-table>
                            </div>                            
                        </div>                        
                        <div class="fr">
                            <ul class="clearfix">
                                <li v-for="(item,i) in DesignColor" :key="i">
                                    <P>{{item.colorSn}}-{{item.colorName}}</P>
                                    <div class="order_table">
                                        <el-table :data="list" height="48.1vh" border style="width: 100%">
                                            <el-table-column prop="sn" label="编号名称" min-width="50%">
                                            </el-table-column>
                                            <el-table-column label="操作" min-width="50%">
                                                <template slot-scope="scope">
                                                    <el-button :disabled='(firstForm.sh==1||firstForm.sh==-1)' :class="{btn:firstForm.sh==0}" type="text">添加</el-button>
                                                    <el-button :disabled='(firstForm.sh==1||firstForm.sh==-1)' :class="{btn:firstForm.sh==0}" type="text">删除</el-button>
                                                </template>
                                            </el-table-column>
                                        </el-table>
                                    </div>                                     
                                </li>
                         
                            </ul>
                        </div>
                    </div>

                </section>                
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

        <!-- 查询框 -->
        <el-dialog title="请输入您要查询的设计款号" :visible.sync="oldSearch">
            <el-input v-model="search" placeholder="请输入您要查询的设计款号"></el-input>
            <ul class="srcond_menu">
                <p v-if="oldSearchList.length===0">暂无数据</p>
                <li v-for="(item,i) in oldSearchList" :key="i" class="clearfix">
                    <span @click="getItemSearch(item)">{{item.pSn}}</span>
                </li>
            </ul>
        </el-dialog>               
        <el-dialog title="请输入您要查询的设计款号" :visible.sync="oldPsn">
            <el-input v-model="pSn" placeholder="请输入您要查询的设计款号"></el-input>
            <ul class="srcond_menu">
                <p v-if="oldPsnList.length===0">暂无数据</p>
                <li v-for="(item,i) in oldPsnList" :key="i" class="clearfix">
                    <span @click="getItemPsn(item)">{{item.pSn}}</span>
                </li>
            </ul>
        </el-dialog>               
        <el-dialog title="请输入您要查询的物料名称编号" :visible.sync="oldMaterial">
            <el-input v-model="material" placeholder="请输入您要查询的物料名称编号"></el-input>
            <ul class="srcond_menu">
                <p v-if="oldMaterialList.length===0">暂无数据</p>
                <li v-for="(item,i) in oldMaterialList" :key="i" class="clearfix">
                    <span class="material" @click="getItemMaterial(item)">{{item.nameSn}}</span>
                    <span class="material" @click="getItemMaterial(item)">{{item.name}}</span>
                </li>
            </ul>
        </el-dialog>               
        <el-dialog title="请选择领用部门的生产职能" :visible.sync="oldFunc">
            <ul class="srcond_menu">
                <p v-if="oldFuncList.length===0">暂无数据</p>
                <li v-for="(item,i) in oldFuncList" :key="i" class="clearfix">
                    <span @click="getItemFunc(item)">{{item.name}}</span>
                </li>
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
export default {
    name: "wuliaoqingdan",
    data() {
        return {
            //按钮disabled
            doAdd: false,
            doCancel: true,
            doImport: false,
            doPrint:true,

            search:"",
            oldSearch:false,
            oldSearchList:[],
    
            pSn:"",                 //设计款号查询框
            oldPsn:false,           //设计款号查询框开关
            oldPsnList:[],          //设计款号查询框列表
            material:"",
            oldMaterial:false,         //颜色查询框开关
            oldMaterialList:[],        //颜色查询框列表
            oldFunc:false,   //部门开关
            oldFuncList:[],
            dosageUnit:[],

            DesignColor:[],         //款号下的所有产品颜色

            //form的disabled
            firstFormNo: true,
            firstFormOn: true,
            firstFormGui: true,
            secondFormNo: true,
            secondFormOn: true,
            secondFormGui: true,            

            search: "", //查询      
            firstForm:{
                psn:"",

                sh: "-1", // 审核
                addUser: "",
                addDate: "",
                updateUser: "",
                updateDate: "",
                shUser: "",
                shDate: ""
            },
            secondForm:{
                psn:"",
                materialSn:"",          //物料编号
                materialName:"",           //物料名称
                amount:"",                  //开发用量
                nature:"",                  //性质编号
                productSn:"",                //成品编号
                func:"",                    //领用部门名称
                part:"",                    //应用部位
                loss:"",                    //生产损耗
                dosage:"",                      //大量货用量
                dosageUnit:"",
                dosageUnitSn:"",
                explain:""                  //说明
            },
            natureList:[],              //性质列表

            //表格数据
            list: [],
            
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
            this.doPrint = true
        },
        //按钮按下状态
        emptyBtnTo() {
            this.doAdd = true;
            this.doCancel = false;
            this.doImport = true;
            this.doExport = true;
            this.doPrint = true
        },
        //表单1恢复初始空值状态
        emptyFirstForm() {
            this.firstForm = {
                psn:"",

                sh: "-1", // 审核
                addUser: "",
                addDate: "",
                updateUser: "",
                updateDate: "",
                shUser: "",
                shDate: ""
            }
        },
        //表单2恢复初始空值状态
        emptySecondForm() {
            this.secondForm = {
                psn:"",
                materialSn:"",          //物料编号
                materialName:"",           //物料名称
                amount:"",                  //开发用量
                nature:"",                  //性质编号
                productSn:"",                //成品编号
                func:"",                    //领用部门名称
                part:"",                    //应用部位
                loss:"",                    //生产损耗
                dosage:"",                      //大量货用量
                dosageUnit:"",
                dosageUnitSn:"",
                explain:""                  //说明
            }
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
            this.noDisabledFirstForm();
        },
        //取消
        doCancels() {
            this.emptyBtn();
            this.emptyFirstForm();
            this.emptySecondForm();
            this.disabledFirstForm();
            this.disabledSecondForm();
            this.pageOnOff = false    
            
            this.pSn = ""
            this.search = ""
            this.oldSearchList = []

            this.list = []
            this.natureList = []
            this.chanpinColor = []
            this.oldFuncList = []
            this.oldMaterialList = []
            this.fileList = []
            this.dosageUnit = []
            this.DesignColor = []
        },
        //first保存
        firstSave() {
            let term = this.firstForm.psn.length == 0
            if(!term){
                this.$http.post('/TPA/cMatBill/insert?psn='+this.firstForm.psn)
                    .then(res=>{
                        if(res.data.code===0){
                            succ(res.data.msg)
                            this.disabledFirstForm()
                            this.noDisabledSecondForm()
                            this.getNatureList()
                            this.getFunc()  
                            this.getDosageUnit()  
                            this.secondForm.psn = this.firstForm.psn  

                            //查询物料列表
                            let search = {
                                pSn: 17 + "|" + this.firstForm.psn
                            };
                            let searchStr = JSON.stringify(search);            
                            let params = {
                                search: searchStr,
                                page: 0,
                                count: this.pageSize
                            };
                            this.pageParams = params;
                            this.getPageData();    
                            
                            this.getDesignColor(this.firstForm.psn)
                        }else{
                            error(res.data.msg)
                        }
                    })
                    .catch(err=>{
                        NetworkAnomaly()
                    })
            }else{
                error('请完善必填输入框！')
            }

        },
        //secondSave保存
        secondSave() {
            this.secondForm.psn = this.firstForm.psn
            if(this.secondForm.dosageUnit){
                for(let i in this.dosageUnit){
                    if(this.secondForm.dosageUnit === this.dosageUnit[i].name){
                       this.secondForm.dosageUnitSn = this.dosageUnit[i].sn
                    }
                }
            }
          
            let term = !this.secondForm.psn||!this.secondForm.materialSn||!this.secondForm.materialName||!this.secondForm.amount||!this.secondForm.nature||!this.secondForm.productSn||!this.secondForm.func||!this.secondForm.part||!this.secondForm.loss||!this.secondForm.dosage||!this.secondForm.dosageUnit||!this.secondForm.dosageUnitSn||!this.secondForm.explain||!this.secondForm.dosage
            
            if(!term){
                this.$http.post('/TPA/cMatBillA/insert',qs.stringify(this.secondForm))
                        .then(res=>{
                            if(res.data.code===0){
                                succ(res.data.msg)
                                this.emptySecondForm()
                                this.getPageData(); 
                            }else{
                                error(res.data.msg)
                            }
                            this.emptySecondForm()
                        })
                        .catch(err=>{
                            NetworkAnomaly()
                        })
            }else{
                error('请完善表单必填项')
            }
            console.log(this.secondForm)
            console.log(this.firstForm.psn )
             

        },

        //查询
        doSearchs() {
            this.oldSearch = true
            this.doCancels()
        },
        //退出
        doOuts() {
            this.$emit("getOut", this.$route.name);
        },

        //审核
        doExamines() {
            let params = {
                id: this.firstForm.id,
                status: "1"
            };
            this.$http
                .post("/TPA/cMatBill/auditing", qs.stringify(params))
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
                .post("/TPA/cMatBill/auditing", qs.stringify(params))
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
                    .post("/TPA/cWlda/importExcel", formData)
                    .then(res => {
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
            window.location.href = "/TPA/cWlda/exportExcel";
        },

        handlePsn(){
            this.oldPsn = true
            this.doCancels()
        },
        
        //选择查询的设计编号
        getItemSearch(item){
            this.doCancels()                      
            this.emptyBtnTo()            

            this.firstForm = item
            this.firstForm.psn = item.pSn
            this.oldSearch = false
            this.search = ""

            //查询物料列表
            let search = {
                pSn: 17 + "|" + this.firstForm.psn
            };
            let searchStr = JSON.stringify(search);            
            let params = {
                search: searchStr,
                page: 0,
                count: this.pageSize
            };
            this.pageParams = params;
            this.getPageData();

            this.getDesignColor(this.firstForm.psn)

        },
        //选择设计编号
        getItemPsn(item){
            this.firstForm = item
            this.firstForm.psn = item.pSn
            this.oldPsn = false
            this.pSn = ""

            this.emptyBtnTo()
            this.emptySecondForm()
            this.disabledSecondForm()
        },
        //选择生产只能（领用部门）
        getItemFunc(item){
            this.secondForm.func = item.name
            this.oldFunc = false
        },
        //选择物料
        getItemMaterial(item){
            this.secondForm.materialSn = item.nameSn
            this.secondForm.materialName = item.name
            this.oldMaterial = false
            this.material = ""
        },

        //获取生产职能（领用部门）
        getFunc(){
            this.$http.post('/TPA/aLbJb/getBySn?sn=026')
                .then(res=>{
                    if(res.data.code===0){
                        this.oldFuncList = res.data.data
                    }else{
                        error(res.data.msg)
                    }
                })
                .catch(err=>{
                    NetworkAnomaly()
                })
        },
        //获取性质
        getNatureList(){
            this.$http.post('/TPA/aLbJb/getBySn?sn=025')
                .then(res=>{
                    if(res.data.code===0){
                        this.natureList = res.data.data
                    }else{
                        error(res.data.msg)
                    }
                })
                .catch(err=>{
                    NetworkAnomaly()
                })
        },
        //获取用量单位
        getDosageUnit(){
            this.$http.post('/TPA/aLbJb/getBySn?sn=006')
                .then(res=>{
                    if(res.data.code===0){
                        this.dosageUnit = res.data.data
                    }else{
                        error(res.data.msg)
                    }
                })
                .catch(err=>{
                    NetworkAnomaly()
                })
        },
        //查询当前设计款号下的所有产品颜色
        getDesignColor(psn){
            this.$http.post('/TPA/cMatBillB/getBy?psn='+psn)
                .then(res=>{
                    if(res.data.code===0){
                        this.DesignColor = res.data.data
                    }else{
                        error(res.data.msg)
                    }
                })
                .catch(err=>[
                    NetworkAnomaly()
                ])
        },
        //分页
        getPageData (){
            this.$http
                .post(
                    "/TPA/cMatBillA/search",
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
        currentPage(val){
            this.page = val
        }
    },
    computed: {
        ...mapState(["collapse"])
    },
    watch:{
        page() {
            this.pageParams.page = this.page - 1;
            this.getPageData();
        },        
        //获取设计编号
        search(){
            if(this.search){
                let search = {
                    pSn: 17 + "|" + this.search
                };
                let searchStr = JSON.stringify(search);
                this.$http
                    .post("/TPA/cSpda/search?sp=1&search=" + searchStr)
                    .then(res => {
                       if(res.data.code===0){
                           this.oldSearchList = res.data.data.list
                       }else{
                           error(res.data.msg)
                       }
                    })
                    .catch(err => {
                        NetworkAnomaly();
                    });                
            }else{
                this.oldPsnList = []
            }
            this.doAdd = false
        },
        //获取设计编号
        pSn(){
            if(this.pSn){
                let search = {
                    pSn: 17 + "|" + this.pSn
                };
                let searchStr = JSON.stringify(search);
                this.$http
                    .post("/TPA/cSpda/search?sp=1&search=" + searchStr)
                    .then(res => {
                       if(res.data.code===0){
                           this.oldPsnList = res.data.data.list
                       }else{
                           error(res.data.msg)
                       }
                    })
                    .catch(err => {
                        NetworkAnomaly();
                    });                
            }else{
                this.oldPsnList = []
            }
            this.doAdd = false
        },
        //获取物料
        material(){
            if(this.material){
                let search = {
                    nameSn: 17 + "|" + this.material
                };
                let searchStr = JSON.stringify(search);
                this.$http
                    .post("/TPA/cWlda/search?sh=1&search=" + searchStr)
                    .then(res => {
                       if(res.data.code===0){
                           this.oldMaterialList = res.data.data.list
                       }else{
                           error(res.data.msg)
                       }
                    })
                    .catch(err => {
                        NetworkAnomaly();
                    });                
            }else{
                this.oldMaterialList = []
            }            
        },
    }
};
</script>

<style lang="stylus" scoped>
@import './css/style.styl'
//table    
.secondForm>>>th, .order_table>>>.el-table td, .el-table th
    padding 0
    font-szie 1vh
.secondForm>>>.el-table .cell
    line-height 4vh
    text-align center
    font-size 1.4vh 
    white-space:pre-wrap
.secondForm>>>.fl_table .el-table th .cell
    line-height 7.2vh
    text-align center
    font-size 1.4vh 
    white-space:pre-wrap
//下拉框
.secondForm>>>.el-input--suffix .el-input__inner
    width: 100% !important   
.secondForm>>>.el-input--suffix,.secondForm>>>.el-input__inner
    height 3.5vh !important
.secondForm>>>.el-input__icon
    line-height 3.5vh

.container>>>.el-dialog
    width 500px
    height 500px
.srcond_menu
    li  
        &:hover
            background #d2d2d2
        span
            padding-left 2vh
            line-height 3vh
            &.material
                width 50%
                float left
                padding-left 10%
</style>
