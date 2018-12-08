<template>
    <div class="container" :class="{container_collapse:collapse}">
        <!-- 页面标题 -->
        <p class="page_title">物料需求调整</p>
        <div class="btn-box">
            <label>款号</label>
            <input type="text" class="doSearch" readonly v-model="psn" placeholder="请选择" @click="handleSearch">
            <label>生产单号</label>
            <input type="text" class="doSearch" v-model="orderSn" readonly placeholder="请选择" @click="handleSearch">
            <button :disabled="doAdd" :class="{button_btn:!doAdd}" @click="doAdds">添加</button>
            <button class="button_btn" @click="doOuts">退出</button>
            <button :class="{button_btn:!doCancel}" :disabled="doCancel" @click="doCancels">取消</button>
        </div>

        <!-- 表格内容 -->
        <div class="order_table">
            <el-table :data="list" stripe style="width: 100%" index>
                <el-table-column type="index" width="80px" label="顺序" fixed="left">
                </el-table-column>
               <el-table-column prop="psn" label="款号" width="110px">
                    <template slot-scope="scope">
                        <el-tooltip :content="scope.row.psn" placement="top" :enterable="false">
                            <p>{{ scope.row.psn }}</p>
                        </el-tooltip>
                    </template>
                </el-table-column>
                <el-table-column prop="psnColor" label="产品颜色" width="110px">
                    <template slot-scope="scope">
                        <el-tooltip :content="scope.row.psnColor" placement="top" :enterable="false">
                            <p>{{ scope.row.psnColor }}</p>
                        </el-tooltip>
                    </template>
                </el-table-column>
                <el-table-column prop="number" label="订单数" width="110px">
                    <template slot-scope="scope">
                        <el-tooltip :content="String(scope.row.number)" placement="top" :enterable="false">
                            <p>{{ scope.row.number }}</p>
                        </el-tooltip>
                    </template>
                </el-table-column>
                <el-table-column prop="materialSn" label="物料编码" width="110px">
                    <template slot-scope="scope">
                        <el-tooltip :content="String(scope.row.materialSn)" placement="top" :enterable="false">
                            <p>{{ scope.row.materialSn }}</p>
                        </el-tooltip>
                    </template>
                </el-table-column>
                <el-table-column prop="materialName" label="名称" width="110px">
                    <template slot-scope="scope">
                        <el-tooltip :content="scope.row.materialName" placement="top" :enterable="false">
                            <p>{{ scope.row.materialName }}</p>
                        </el-tooltip>
                    </template>
                </el-table-column>
                <el-table-column prop="kz" label="克重" width="110px">
                </el-table-column>
                <el-table-column prop="size" label="布宽" width="110px">
                </el-table-column>
                <el-table-column prop="colorSn" label="色号" width="110px">
                </el-table-column>
                <el-table-column prop="color" label="色号名称" width="110px">
                    <template slot-scope="scope">
                        <el-tooltip :content="scope.row.color" placement="top" :enterable="false">
                            <p>{{ scope.row.color }}</p>
                        </el-tooltip>
                    </template>
                </el-table-column>
                <el-table-column prop="dosage" label="用量单位" width="110px">
                    <template slot-scope="scope">
                        <el-tooltip :content="String(scope.row.dosage)" placement="top" :enterable="false">
                            <p>{{ scope.row.dosage }}</p>
                        </el-tooltip>
                    </template>                    
                </el-table-column>
                <el-table-column prop="amount" label="开发用量" width="110px">
                    <template slot-scope="scope">
                        <el-tooltip :content="String(scope.row.amount)" placement="top" :enterable="false">
                            <p>{{ scope.row.amount }}</p>
                        </el-tooltip>
                    </template>
                </el-table-column>
                <el-table-column prop="loss" label="生产损耗" width="110px">>
                </el-table-column>
                <el-table-column prop="purchaseUnit" label="采购单位" width="110px">
                </el-table-column>
                <el-table-column prop="zhxs" label="转换系数" width="110px">
                </el-table-column>
                <el-table-column prop="demand" label="用量需求量" width="110px">
                    <template slot-scope="scope">
                        <el-tooltip :content="String(scope.row.demand)" placement="top" :enterable="false">
                            <p>{{ scope.row.demand }}</p>
                        </el-tooltip>
                    </template>
                </el-table-column>
                <el-table-column prop="purchase" label="采购需求量" width="110px">
                    <template slot-scope="scope">
                        <el-tooltip :content="String(scope.row.purchase)" placement="top" :enterable="false">
                            <p>{{ scope.row.purchase }}</p>
                        </el-tooltip>
                    </template>
                </el-table-column>
                <el-table-column prop="func" label="领用部门" width="110px">
                    <template slot-scope="scope">
                        <el-tooltip :content="scope.row.func" placement="top" :enterable="false">
                            <p>{{ scope.row.func }}</p>
                        </el-tooltip>
                    </template>
                </el-table-column>
                <el-table-column prop="part" label="应用部位" width="110px">
                    <template slot-scope="scope">
                        <el-tooltip :content="scope.row.part" placement="top" :enterable="false">
                            <p>{{ scope.row.part }}</p>
                        </el-tooltip>
                    </template>
                </el-table-column>
                <el-table-column prop="pattern" label="规格说明" width="110px">
                    <template slot-scope="scope">
                        <el-tooltip :content="scope.row.pattern" placement="top" :enterable="false">
                            <p>{{ scope.row.pattern }}</p>
                        </el-tooltip>
                    </template>
                </el-table-column>
                <el-table-column prop="nature" label="性质" width="110px">
                </el-table-column>
                <el-table-column prop="type" label="类别" width="110px">
                </el-table-column>
                <el-table-column prop="remark" label="说明" width="110px">
                    <template slot-scope="scope">
                        <el-tooltip :content="scope.row.remark" placement="top" :enterable="false">
                            <p>{{ scope.row.remark }}</p>
                        </el-tooltip>
                    </template>
                </el-table-column>
                <el-table-column fixed="right" label="操作" width="200px">
                    <template slot-scope="scope">
                        <el-button :disabled='(scope.row.sh==1)' :class="{btn:(scope.row.sh==0)}" type="text" @click="handleEdit(scope.$index, scope.row)">修改</el-button>

                        <el-button v-if="scope.row.sh==0"  class="btn" type="text" @click="tableSh(scope.$index, scope.row)">审核</el-button>
                        <el-button v-else class="btn" type="text" @click="tableShBack(scope.$index, scope.row)">反审</el-button>

                        <el-button :disabled='(scope.row.sh==1)' :class="{btn:(scope.row.sh==0)}" type="text" @click="tableDelete(scope.$index, scope.row)">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </div>

        <!-- 底部页码 -->
        <div class="pageBox">
            <el-pagination @current-change="currentPage" :current-page='page' v-if="pageOnOff" background :page-size="pageSize" :pager-count="5" :total="total">
            </el-pagination>
        </div>

        <!-- 搜索生产单号 -->
        <el-dialog title="搜索生产单号下的款号" :visible.sync="oldSearch">
            <el-input v-model="search" placeholder="生产单号"></el-input>
            <button class="button_btn" @click="accurateSearch">查询</button>
            <ul class="srcond_menu">
                <li v-if="searchList.length===0">暂无数据</li>
                <li class="clearfix" v-for="(item,i) in searchList" :key="i">
                    <span @click="getItemSearch(item)">|--{{item.psn}}</span>
                </li>
            </ul>
        </el-dialog>

        <!-- 添加-->
        <el-dialog title="物料列表" :visible.sync="oldMateria" class="oldmenu">
            <el-table :data="materiaList" stripe index border style="width: 100%"  >
                <el-table-column type="index" width="80px" label="顺序" fixed="left">
                </el-table-column>                
                <el-table-column prop="psn" label="款号" width="110px">
                    <template slot-scope="scope">
                        <el-tooltip :content="scope.row.psn" placement="top" :enterable="false">
                            <p>{{ scope.row.psn }}</p>
                        </el-tooltip>
                    </template>
                </el-table-column>
                <el-table-column prop="psnColor" label="产品颜色" width="110px">
                    <template slot-scope="scope">
                        <el-tooltip :content="scope.row.psnColor" placement="top" :enterable="false">
                            <p>{{ scope.row.psnColor }}</p>
                        </el-tooltip>
                    </template>
                </el-table-column>
                <el-table-column prop="number" label="订单数" width="110px">
                    <template slot-scope="scope">
                        <el-tooltip :content="String(scope.row.number)" placement="top" :enterable="false">
                            <p>{{ scope.row.number }}</p>
                        </el-tooltip>
                    </template>
                </el-table-column>
                <el-table-column prop="materialSn" label="物料编码" width="110px">
                    <template slot-scope="scope">
                        <el-tooltip :content="String(scope.row.materialSn)" placement="top" :enterable="false">
                            <p>{{ scope.row.materialSn }}</p>
                        </el-tooltip>
                    </template>
                </el-table-column>
                <el-table-column prop="lbch2Name" label="名称" width="110px">
                    <template slot-scope="scope">
                        <el-tooltip :content="scope.row.lbch2Name" placement="top" :enterable="false">
                            <p>{{ scope.row.lbch2Name }}</p>
                        </el-tooltip>
                    </template>
                </el-table-column>
                <el-table-column prop="kz" label="克重" width="110px">
                </el-table-column>
                <el-table-column prop="size" label="布宽" width="110px">
                </el-table-column>
                <el-table-column prop="colorSn" label="色号" width="110px">
                </el-table-column>
                <el-table-column prop="color" label="色号名称" width="110px">
                    <template slot-scope="scope">
                        <el-tooltip :content="scope.row.color" placement="top" :enterable="false">
                            <p>{{ scope.row.color }}</p>
                        </el-tooltip>
                    </template>
                </el-table-column>
                <el-table-column prop="dosage" label="用量单位" width="110px">
                    <template slot-scope="scope">
                        <el-tooltip :content="String(scope.row.dosage)" placement="top" :enterable="false">
                            <p>{{ scope.row.dosage }}</p>
                        </el-tooltip>
                    </template>                    
                </el-table-column>
                <el-table-column prop="amount" label="开发用量" width="110px">
                    <template slot-scope="scope">
                        <el-tooltip :content="String(scope.row.amount)" placement="top" :enterable="false">
                            <p>{{ scope.row.amount }}</p>
                        </el-tooltip>
                    </template>
                </el-table-column>
                <el-table-column prop="loss" label="生产损耗" width="110px">>
                </el-table-column>
                <el-table-column prop="purchaseUnit" label="采购单位" width="110px">
                </el-table-column>
                <el-table-column prop="zhxs" label="转换系数" width="110px">
                </el-table-column>
                <el-table-column prop="demand" label="用量需求量" width="110px">
                    <template slot-scope="scope">
                        <el-tooltip :content="String(scope.row.demand)" placement="top" :enterable="false">
                            <p>{{ scope.row.demand }}</p>
                        </el-tooltip>
                    </template>
                </el-table-column>
                <el-table-column prop="purchase" label="采购需求量" width="110px">
                    <template slot-scope="scope">
                        <el-tooltip :content="String(scope.row.purchase)" placement="top" :enterable="false">
                            <p>{{ scope.row.purchase }}</p>
                        </el-tooltip>
                    </template>
                </el-table-column>
                <el-table-column prop="func" label="领用部门" width="110px">
                    <template slot-scope="scope">
                        <el-tooltip :content="scope.row.func" placement="top" :enterable="false">
                            <p>{{ scope.row.func }}</p>
                        </el-tooltip>
                    </template>
                </el-table-column>
                <el-table-column prop="part" label="应用部位" width="110px">
                    <template slot-scope="scope">
                        <el-tooltip :content="scope.row.part" placement="top" :enterable="false">
                            <p>{{ scope.row.part }}</p>
                        </el-tooltip>
                    </template>
                </el-table-column>
                <el-table-column prop="pattern" label="规格说明" width="110px">
                    <template slot-scope="scope">
                        <el-tooltip :content="scope.row.pattern" placement="top" :enterable="false">
                            <p>{{ scope.row.pattern }}</p>
                        </el-tooltip>
                    </template>
                </el-table-column>
                <el-table-column prop="nature" label="性质" width="110px">
                </el-table-column>
                <el-table-column prop="type" label="类别" width="110px">
                </el-table-column>
                <el-table-column prop="remark" label="说明" width="110px">
                    <template slot-scope="scope">
                        <el-tooltip :content="scope.row.remark" placement="top" :enterable="false">
                            <p>{{ scope.row.remark }}</p>
                        </el-tooltip>
                    </template>
                </el-table-column>
                <el-table-column prop="remark" label="操作" width="80px" fixed="right">
                    <template slot-scope="scope">
                        <el-button :disabled='(scope.row.sh==1)' :class="{btn:(scope.row.sh==0)}" type="text" @click="tableAdd(scope.row)">添加</el-button>                       
                    </template>
                </el-table-column>
            </el-table>
            <span slot="footer" class="dialog-footer">
            <el-pagination @current-change="materiaCurrentPage" :current-page='materialpage' v-if="materialpageOnOff" background :page-size="materialpageSize" :pager-count="5" :total="materiaTotal">
            </el-pagination>                
                <el-button type="primary" @click="oldMateria = false" plain>确 定</el-button>
            </span>
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
export default {
    name: "wuliaoxuqiutiaozheng",
    data() {
        return {
            doCancel: true,
            doAdd: true,

            psn: "",
            orderSn: "",
            list: [],

            search: "",
            oldSearch: false,
            searchList: [],

            oldMateria: false,
            materiaList: [],

            editVisible: false, //编辑弹窗开关
            idx: 0,
            dialog: {}, //编辑弹出框数据

            //分页：当前页码/总数量/每页显示条数
            page: 0,
            total: "",
            pageSize: 15,
            pageOnOff: false,
            //分页排序查询条件
            pageParams: {},                

            //物料列表分页
            materialpage: 0,
            materiaTotal: "",
            materialpageSize: 10,
            materialpageOnOff: false,   
            //物料列表分页查询条件
            materialpageParams: {},                         
        };
    },
    methods: {
        //退出
        doOuts() {
            this.$emit("getOut", this.$route.name);
        },
        //取消
        doCancels() {
            this.list = [];
            this.psn = "";
            this.orderSn = "";
        },
        //添加
        doAdds(){

            // 物料分页
            this.materialpageOnOff = false;
            this.materialpage = 0
            let materialparams = {
                orderSn: this.orderSn,
                psn:this.psn,
                count: this.materialpageSize,
                page: 0,
            };
            this.materialpageParams = materialparams;
            this.getmaterialpageData(this.materialpageParams)      

            
        },
        //物料分页
        getmaterialpageData(params){
            this.$http.post("/TPA/vMrp/getBy",qs.stringify(params))
                .then(res => {
                    if (res.data.code === 0) {
                        this.oldMateria = true
                        this.materiaList = []                        
                        
                        if(res.data.data.list.length>0){
                            this.materiaList = res.data.data.list;
                        }else{
                            error('暂无数据！')
                        }
                        
                        this.materialpageOnOff = false
                        this.materiaTotal = res.data.data.total

                        if (this.materiaTotal > this.materialpageSize) {
                            this.materialpageOnOff = true;
                        } else {
                            this.materialpageOnOff = false;
                        }                        
                    } else {
                        error(res.data.msg);
                    }
                })
                .catch(err => {
                    NetworkAnomaly();
                });
        },        

        //点击搜索
        handleSearch(){
            this.oldSearch = true
            this.search = ""
            this.searchList = []
        },
        //精准查询生产单号
        accurateSearch(){
            if(this.search){
                this.$http.post('/TPA/dProductOrderA/search1?masterSn='+this.search)
                    .then(res=>{
                        if(res.data.code===0){
                            if(res.data.data.list.length>0){
                                this.searchList = res.data.data.list
                            }else{
                                error('暂无数据')
                            }
                        }else{
                            error(res.data.msg)
                        }
                    })
                    .catch(err=>{
                        NetworkAnomaly()
                    })
            }else{
                error('请输入生产单号！')
            }
        },
        //选择搜索
        getItemSearch(item) {
            this.oldSearch = false
            this.psn = item.psn
            this.orderSn = item.masterSn

            //分页
            this.pageOnOff = false;
            this.page = 0
            let params = {
                orderSn: this.orderSn,
                psn:this.psn,   
                count: this.pageSize,
                page: 0,
            };
            this.pageParams = params;
            this.getPageData(this.pageParams)            
        },

        //添加物料列表
        tableAdd(row){
            this.$http.post('/TPA/eMatDemand/insert',qs.stringify(row))
                .then(res=>{
                    if(res.data.code===0){
                        succ(res.data.msg)
                        this.getmaterialpageData(this.materialpageParams)   
                        this.getPageData(this.pageParams)
                    }else{
                        error(res.data.msg)
                    }
                })
                .catch(err=>{
                    NetworkAnomaly()
                })
            
            // this.$http.post('/TPA/dProductOrderA/getByPsn?psn='+row.psn)
            //     .then(res=>{
            //         if(res.data.code===0){
            //             this.lookObj = res.data.data[0]
            //             this.oldLook = true
            //         }else{
            //             error(res.data.msg)
            //         }
            //     })
            //     .catch(err=>{
            //         NetworkAnomaly()
            //     })            
        },

        //修改
        handleEdit(index, row) {},
        //审核
        tableSh(index, row) {
            this.idx = index;
            const item = this.list[index];
            let form = {
                id:item.id,
                status:1
            }
            
            this.$http
                .post("/TPA/eMatDemand/auditing", qs.stringify(form))
                .then(res => {
                    if (res.data.code === 0) {
                        succ(res.data.msg);
                        this.$set(this.list, this.idx, res.data.data);
                    } else {
                        error(res.data.msg);
                    }
                })
                .catch(err => {
                    NetworkAnomaly();
                });            
        },
        //反审
        tableShBack(index, row) {
            this.idx = index;
            const item = this.list[index];
            let form = {
                id:item.id,
                status:0
            }
            
            this.$http
                .post("/TPA/eMatDemand/auditing", qs.stringify(form))
                .then(res => {
                    if (res.data.code === 0) {
                        succ(res.data.msg);
                        this.$set(this.list, this.idx, res.data.data);
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
            
            this.$http
                .post("/TPA/eMatDemand/delete?id="+row.id)
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

        //获取当前页码
        currentPage(val) {
            this.page = val;
        },
        materiaCurrentPage(val) {
            this.materialpage = val;
        },
        //分页-查询列表
        getPageData(params) {
            this.$http
                .post("/TPA/eMatDemand/search", qs.stringify(params))
                .then(res => {
                    if (res.data.code === 0) {
                        if(res.data.data.list.length>0){
                            this.list = res.data.data.list;
                        }else{
                            error('暂无数据！')
                        }
                        this.pageOnOff = false;
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
        }
    },
    computed: {
        ...mapState(["collapse"])
    },
    watch: {
        page() {
            this.pageParams.page = this.page - 1;
            this.getPageData(this.pageParams);
        },
        materialpage(){
            this.materialpageParams.page = this.materialpage - 1;
            this.getmaterialpageData(this.materialpageParams);            
        },
        orderSn() {
            if (this.psn && this.orderSn) {
                this.doAdd = false;
                this.doCancel = false
            } else {
                this.doAdd = true;
            }
        },
        search(){
            if(!this.search){
                this.psn = ""
                this.orderSn = ""
                this.list = []
            }
        }
    }
};
</script>

<style lang="stylus" scoped>
@import 'css/style.styl'
</style>
