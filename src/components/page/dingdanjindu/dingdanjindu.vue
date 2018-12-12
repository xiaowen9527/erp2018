<template>
    <div class="container" :class="{container_collapse:collapse}">
        <p class="page_title">订单进度</p>
        <div class="btn-box">
            <button @click="doSearchs" class="button_btn">查询</button>
            <button class="button_btn" @click="doOuts">退出</button>
        </div>


        <div class="main clearfix">
            <!-- 表格内容 -->
            <div class="order_table">
                <span>销售订单</span>
                <el-table :data="psnList" stripe style="width: 100%" index>
                    <el-table-column prop="sn" label="销售单号" min-width="20%">
                        <template slot-scope="scope">
                            <el-tooltip :content="scope.row.sn" placement="top" :enterable="false">
                                <p>{{ scope.row.sn }}</p>
                            </el-tooltip>
                        </template>                        
                    </el-table-column>
                    <el-table-column prop="number" label="订数" min-width="15%">
                        <template slot-scope="scope">
                            <el-tooltip :content="String(scope.row.number)" placement="top" :enterable="false">
                                <p>{{ scope.row.number }}</p>
                            </el-tooltip>
                        </template>                            
                    </el-table-column>
                    <el-table-column prop="closeNumber" label="入数" min-width="15%">
                        <template slot-scope="scope">
                            <el-tooltip :content="String(scope.row.closeNumber)" placement="top" :enterable="false">
                                <p>{{ scope.row.closeNumber }}</p>
                            </el-tooltip>
                        </template>                         
                    </el-table-column>
                    <el-table-column prop="number2" label="欠数" min-width="15%">
                        <template slot-scope="scope">
                            <el-tooltip :content="String(scope.row.number2)" placement="top" :enterable="false">
                                <p>{{ scope.row.number2 }}</p>
                            </el-tooltip>
                        </template>                           
                    </el-table-column>
                    <el-table-column fixed="right" label="操作" min-width="20%">
                        <template slot-scope="scope">
                            <el-button :disabled='(scope.row.closeStatus==1)' :class="{btn:(scope.row.closeStatus==0)}" type="text" @click="tablePsnClose(scope.$index, scope.row)">关单</el-button>                          
                            <el-button :disabled='(scope.row.closeStatus==0)' :class="{btn:(scope.row.closeStatus==1)}" type="text" @click="tablePsnOpen(scope.$index, scope.row)">开单</el-button>                          
                        </template>
                    </el-table-column>
                </el-table>
            </div>

            <!-- 表格内容 -->
            <div class="order_table">
                <span>生产订单</span>
                <el-table :data="materList" stripe style="width: 100%" index @cell-dblclick="tableDbclick">
                    <el-table-column prop="sn" label="生产单号" min-width="20%">
                        <template slot-scope="scope">
                            <el-tooltip :content="scope.row.sn" placement="top" :enterable="false">
                                <p>{{ scope.row.sn }}</p>
                            </el-tooltip>
                        </template>                        
                    </el-table-column>
                    <el-table-column prop="number" label="订数" min-width="15%">
                        <template slot-scope="scope">
                            <el-tooltip :content="String(scope.row.number)" placement="top" :enterable="false">
                                <p>{{ scope.row.number }}</p>
                            </el-tooltip>
                        </template>                         
                    </el-table-column>
                    <el-table-column prop="closeNumber" label="入数" min-width="15%">
                        <template slot-scope="scope">
                            <el-tooltip :content="String(scope.row.closeNumber)" placement="top" :enterable="false">
                                <p>{{ scope.row.closeNumber }}</p>
                            </el-tooltip>
                        </template>                          
                    </el-table-column>
                    <el-table-column prop="number2" label="欠数" min-width="15%">
                        <template slot-scope="scope">
                            <el-tooltip :content="String(scope.row.number2)" placement="top" :enterable="false">
                                <p>{{ scope.row.number2 }}</p>
                            </el-tooltip>
                        </template>                           
                    </el-table-column>
                    <el-table-column fixed="right" label="操作" min-width="20%">
                        <template slot-scope="scope">
                            <el-button :disabled='(scope.row.closeStatus==1)' :class="{btn:(scope.row.closeStatus==0)}" type="text" @click="tableMaterClose(scope.$index, scope.row)">关单</el-button>                          
                            <el-button :disabled='(scope.row.closeStatus==0)' :class="{btn:(scope.row.closeStatus==1)}" type="text" @click="tableMaterOPen(scope.$index, scope.row)">开单</el-button>                          
                        </template>
                    </el-table-column>
                </el-table>
            </div>
            
            <!-- 表格内容 -->
            <div class="order_table">
                <span>款号</span>
                <el-table :data="snList" stripe style="width: 100%" index>
                    <el-table-column prop="psn" label="款号" min-width="20%">
                    </el-table-column>
                    <el-table-column prop="color" label="颜色" min-width="20%">
                    </el-table-column>
                    <el-table-column prop="number" label="订数" min-width="20%">
                    </el-table-column>
                    <el-table-column prop="closeNumber" label="入数" min-width="20%">
                    </el-table-column>
                    <el-table-column prop="number2" label="欠数" min-width="20%">
                    </el-table-column>
                </el-table>
            </div>            
        </div>
        
        <!-- 底部页码 -->
        <div class="pageBox">
            <!-- <el-pagination @current-change="currentPage" :current-page='page' v-if="pageOnOff" background :page-size="pageSize" :pager-count="5" :total="total">
            </el-pagination> -->
        </div>

        <!-- 查询框 -->
        <el-dialog title="查询生产订单号" :visible.sync="oldSearch">
            <el-input v-model="search" placeholder="生产订单号"></el-input>
            <button class="button_btn" @click="vagueSearch">查询</button>
            <ul class="srcond_menu">
                <p v-if="searchList.length===0"></p>
                <li v-for="(item,i) in searchList" :key="i" class="clearfix">
                    <span @click="getItemSearch(item)">{{item.name}}</span>
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
    name: "dingdanjindu",
    data() {
        return {
            psnList: [],                //销售订单列表
            materList: [],                 //生产订单列表
            snList:[],                      //款号列表


            oldSearch: false,
            search: "",
            searchList: [],


            idx: 0,
        };
    },
    methods: {
        //查询
        doSearchs() {
            this.oldSearch = true;
            this.search = "";
            this.searchList = [];
        },
        //退出
        doOuts() {
            this.$emit("getOut", this.$route.name);
        },

        //获取销售订单
        getPsn(){
            this.$http.post('/TPA/schedule/sell')
                .then(res=>{
                    if(res.data.code===0){
                        this.psnList = res.data.data
                    }else{
                        error(res.data.msg)
                    }
                })
                .catch(err=>{
                    NetworkAnomaly()
                })
        },
        //获取生产订单
        getMater(){
            this.$http.post('/TPA/schedule/product')
                .then(res=>{
                    if(res.data.code===0){
                        this.materList = res.data.data
                    }else{
                        error(res.data.msg)
                    }
                })
                .catch(err=>{
                    NetworkAnomaly()
                })
        },
        //获取款号



        //销售单号关单
        tablePsnClose(index,row){
            this.idx = index;
            const item = this.psnList[index];
            console.log(item);
            
            this.$http.post('/TPA/schedule/closeSell?status=1&sn='+item.sn)
                .then(res=>{
                    if (res.data.code === 0) {
                        this.$set(this.psnList, this.idx, item);
                        succ(res.data.msg);
                        this.getPsn()
                    } else {
                        error(res.data.msg);
                    }
                })  
                .catch(err=>{
                    NetworkAnomaly()
                }) 
        },
        //销售单号开单
        tablePsnOpen(index,row){
            this.idx = index;
            const item = this.psnList[index];
            this.$http.post('/TPA/schedule/closeSell?status=0&sn='+item.sn)
                .then(res=>{
                    if (res.data.code === 0) {
                        this.$set(this.psnList, this.idx, item);
                        succ(res.data.msg);
                        this.getPsn()
                    } else {
                        error(res.data.msg);
                    }
                })  
                .catch(err=>{
                    NetworkAnomaly()
                }) 
        },
        //生产订单关单
        tableMaterClose(index,row){
            this.idx = index;
            const item = this.materList[index];
            console.log(item);
            
            this.$http.post('/TPA/schedule/closeProduct?status=1&sn='+item.sn)
                .then(res=>{
                    if (res.data.code === 0) {
                        
                        this.$set(this.materList, this.idx, item);
                        succ(res.data.msg);
                        this.getMater()
                    } else {
                        error(res.data.msg);
                    }
                })  
                .catch(err=>{
                    NetworkAnomaly()
                }) 
        },
        //生产订单开单
        tableMaterOPen(index,row){
            this.idx = index;
            const item = this.materList[index];
            this.$http.post('/TPA/schedule/closeProduct?status=0&sn='+item.sn)
                .then(res=>{
                    if (res.data.code === 0) {
                        
                        this.$set(this.materList, this.idx, item);
                        succ(res.data.msg);
                        this.getMater()
                    } else {
                        error(res.data.msg);
                    }
                })  
                .catch(err=>{
                    NetworkAnomaly()
                }) 
        },

        //生产订单table单元格双击
        tableDbclick(row){
            this.snList = []
            this.$http.post('/TPA/schedule/psn?sn='+row.sn)
                .then(res=>{
                    if(res.data.code===0){
                        if(res.data.data.length>0){
                            this.snList = res.data.data
                        }else{
                            error('暂无数据')
                        }
                    }
                })
                .catch(err=>{
                    NetworkAnomaly()
                })
        },        

        //模糊搜索
        vagueSearch(){
            if (this.search) {
            } else {
                error('请输入搜索条件!')
            }
        }
    },
    mounted() {
        this.getPsn()
        this.getMater()
    },
    watch: {

    },
    computed: {
        ...mapState(["collapse"])
    }
};
</script>

<style lang="stylus" scoped>
@import './css/style.styl'
</style>
