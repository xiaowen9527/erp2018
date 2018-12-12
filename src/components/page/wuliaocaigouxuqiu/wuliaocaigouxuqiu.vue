<template>
    <div class="container" :class="{container_collapse:collapse}">
        <!-- 页面标题 -->
        <p class="page_title">物料采购需求</p>

        <!-- 顶部操作按钮 -->
        <div class="btn-box">
            <label class="label_Info">生产订单</label>
            <input class="queryInfo" type="text" v-model="snInfo" />
            <label class="label_Info">款号</label>
            <input class="queryInfo" type="text" @click="psnSearchs" v-model="psnInfo" />
            <!-- <button @click="doAdds" class="button_btn">添加</button> -->
            <!-- <button @click="doNews" class="button_btn">创建</button> -->
            <button @click="allSearchs" class="button_btn">汇总查询</button>
            <button @click="detailSearchs" class="button_btn">明细查询</button>
            <button class="button_btn" @click="doCancels">取消</button>
            <button class="button_btn" @click="doOuts">退出</button>
        </div>

        <div class="order_table">
            <el-table :data="list" stripe style="width: 100%" index>
                <el-table-column type="index" width="80px" label="顺序" fixed="left">
                </el-table-column>
                <el-table-column prop="psn" label="款号" min-width="110px">
                </el-table-column>
                <el-table-column prop="psnColor" label="产品颜色" min-width="110px">
                    <template slot-scope="scope">
                        <el-tooltip :content="scope.row.psnColor" placement="top" :enterable="false">
                            <p>{{ scope.row.psnColor }}</p>
                        </el-tooltip>
                    </template>
                </el-table-column>
                <el-table-column prop="number" label="订单数" min-width="110px">
                    <template slot-scope="scope">
                        <el-tooltip :content="String(scope.row.number)" placement="top" :enterable="false">
                            <p>{{ scope.row.number }}</p>
                        </el-tooltip>
                    </template>
                </el-table-column>
                <el-table-column prop="materialSn" label="物料编码" min-width="110px">
                    <template slot-scope="scope">
                        <el-tooltip :content="String(scope.row.materialSn)" placement="top" :enterable="false">
                            <p>{{ scope.row.materialSn }}</p>
                        </el-tooltip>
                    </template>
                </el-table-column>
                <el-table-column prop="lbch2Name" label="名称" min-width="110px">
                    <template slot-scope="scope">
                        <el-tooltip :content="scope.row.lbch2Name" placement="top" :enterable="false">
                            <p>{{ scope.row.lbch2Name }}</p>
                        </el-tooltip>
                    </template>
                </el-table-column>
                <el-table-column prop="kz" label="克重" min-width="110px">
                </el-table-column>
                <el-table-column prop="size" label="布宽" min-width="110px">
                </el-table-column>
                <el-table-column prop="colorSn" label="色号" min-width="110px">
                </el-table-column>
                <el-table-column prop="color" label="色号名称" min-width="110px">
                    <template slot-scope="scope">
                        <el-tooltip :content="scope.row.colorSn" placement="top" :enterable="false">
                            <p>{{ scope.row.colorSn }}</p>
                        </el-tooltip>
                    </template>
                </el-table-column>
                <!-- <el-table-column prop="isCode" label="按码算" min-width="4%">
                </el-table-column> -->
                <el-table-column prop="dosageUnit" label="用量单位" min-width="110px">
                </el-table-column>
                <el-table-column prop="amount" label="开发用量" min-width="110px">
                    <template slot-scope="scope">
                        <el-tooltip :content="String(scope.row.amount)" placement="top" :enterable="false">
                            <p>{{ scope.row.amount }}</p>
                        </el-tooltip>
                    </template>
                </el-table-column>
                <el-table-column prop="amount" label="生产损耗" min-width="110px">
                </el-table-column>
                <!-- <el-table-column prop="dosage" label="大货用量" min-width="4%">
                </el-table-column> -->
                <el-table-column prop="purchaseUnit" label="采购单位" min-width="110px">
                </el-table-column>
                <el-table-column prop="zhxs" label="转换系数" min-width="110px">
                </el-table-column>
                <el-table-column prop="demand" label="库存扣减量" min-width="110px">
                    <template slot-scope="scope">
                        <el-tooltip :content="String(scope.row.demand)" placement="top" :enterable="false">
                            <p>{{ scope.row.demand }}</p>
                        </el-tooltip>
                    </template>
                </el-table-column>
                <el-table-column prop="purchase" label="采购扣减数量" min-width="110px">
                    <template slot-scope="scope">
                        <el-tooltip :content="String(scope.row.purchase)" placement="top" :enterable="false">
                            <p>{{ scope.row.purchase }}</p>
                        </el-tooltip>
                    </template>
                </el-table-column>
                <el-table-column prop="func" label="领用部门" min-width="110px">
                    <template slot-scope="scope">
                        <el-tooltip :content="scope.row.func" placement="top" :enterable="false">
                            <p>{{ scope.row.func }}</p>
                        </el-tooltip>
                    </template>
                </el-table-column>
                <el-table-column prop="part" label="应用部位" min-width="110px">
                    <template slot-scope="scope">
                        <el-tooltip :content="scope.row.part" placement="top" :enterable="false">
                            <p>{{ scope.row.part }}</p>
                        </el-tooltip>
                    </template>
                </el-table-column>
                <el-table-column prop="pattern" label="规格说明" min-width="110px">
                    <template slot-scope="scope">
                        <el-tooltip :content="scope.row.pattern" placement="top" :enterable="false">
                            <p>{{ scope.row.pattern }}</p>
                        </el-tooltip>
                    </template>
                </el-table-column>
                <el-table-column prop="nature" label="性质" min-width="110px">
                </el-table-column>
                <el-table-column prop="type" label="类别" min-width="110px">
                </el-table-column>
                <el-table-column prop="remark" label="说明" min-width="110px">
                </el-table-column>
                <!-- <el-table-column fixed="right" label="操作" width="200px">
                    <template slot-scope="scope">
                        <el-button :disabled='(scope.row.sh==1)' :class="{btn:(scope.row.sh==0)}" type="text" @click="handleEdit(scope.$index, scope.row)">修改</el-button>
                        <el-button :disabled='(scope.row.sh==1)' :class="{btn:(scope.row.sh==0)}" type="text" @click="tableDelete(scope.$index, scope.row)">删除</el-button>
                    </template>
                </el-table-column> -->
            </el-table>
        </div>

        <div class="pageBox">
            <el-pagination @current-change="currentPage" :current-page='page' v-if="pageOnOff" background :page-size="pageSize" :pager-count="5" :total="total">
            </el-pagination>
        </div>

         <!-- 搜索生产单号 -->
        <el-dialog title="请输入生产订单号进行搜索" :visible.sync="oldSearch">
            <el-input v-model="search" placeholder="生产订单号"></el-input>
            <button class="button_btn" @click="accurateSearch">查询</button>
            <ul class="srcond_menu">
                <li v-if="searchList.length===0">暂无数据</li>
                <li class="clearfix" v-for="(item,i) in searchList" :key="i">
                    <span @click="getItemSearch(item)">|--{{item.psn}}</span>
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
    name: "wuliaocaigouxuqiu",
    data() {
        return {
            psnInfo: "",
            snInfo: "",
            list:[],
            searchList: [],
            search: "",
            oldSearch: false,
            page: 0,
            pageSize: 15,
            total: 0,
            pageParams: {},
            pageOnOff: false,

            allOrDeatil: false, // 翻页控制汇总或明细
        }
    },

    methods: {
        // 款号查询
        psnSearchs() {
            this.oldSearch = true
            this.search = this.snInfo;
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
                                this.searchList = [];
                            }
                        }else{
                            error(res.data.msg)
                        }
                    })
                    .catch(err=>{
                        NetworkAnomaly()
                    })
            }else{
                error('请输入生产订单号！')
            }
        },

        //选择搜索
        getItemSearch(item) {
            this.oldSearch = false
            this.psnInfo = item.psn      
        },

        // 汇总查询
        allSearchs() {
            this.page = 1;
            let params = {
                page: this.page - 1,
                count: this.pageSize,
                sn: this.snInfo,
                psn: this.psnInfo
            }
            this.allOrDeatil = false;
            this.pageParams = params;
            this.$http.post("/TPA/vMrpDetail/collect", qs.stringify(this.pageParams)).then(res => {
                if(res.data.code === 0) {
                    succ(res.data.msg)
                    this.list = res.data.data;

                    this.total = res.data.attachment.total;
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
            })
        },

        // 明细查询
        detailSearchs() {
            this.page = 1;
            if (this.psnInfo) {
                var params = {
                    page: this.page - 1,
                    count: this.pageSize,
                    sn: this.snInfo,
                    psn: this.psnInfo
                }
            } else {
                var params = {
                    page: this.page - 1,
                    count: this.pageSize,
                    sn: this.snInfo
                }
            }
            this.allOrDeatil = true;
            this.pageParams = params;
            this.$http.post("/TPA/vMrpDetail/search", qs.stringify(this.pageParams)).then(res => {
                if(res.data.code === 0) {
                    succ(res.data.msg)
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
            })
        },


        // 取消
        doCancels() {
            this.list = [];
            this.snInfo = "";
            this.psnInfo = "";
            this.pageOnOff = false;
        },

        // 退出
        doOuts() {
            this.$emit("getOut", this.$route.name);
        },

        currentPage(val) {
            this.page = val;
        }
    },

    watch: {
        page() {
            if(this.page > 0) {
                if (this.psnInfo) {
                var params = {
                    page: this.page - 1,
                    count: this.pageSize,
                    sn: this.snInfo,
                    psn: this.psnInfo
                }
                } else {
                    var params = {
                        page: this.page - 1,
                        count: this.pageSize,
                        sn: this.snInfo
                    }
                }
                this.pageParams = params;
                if (this.allOrDeatil == false) {
                    this.$http.post("/TPA/vMrpDetail/collect", qs.stringify(this.pageParams)).then(res => {
                        if(res.data.code === 0) {
                            succ(res.data.msg)
                            this.list = res.data.data;

                            this.total = res.data.attachment.total;
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
                    })
                } else {
                    this.$http.post("/TPA/vMrpDetail/search", qs.stringify(this.pageParams)).then(res => {
                        if(res.data.code === 0) {
                            succ(res.data.msg)
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
                    })
                }
            }
        }
    },

    computed: {
        ...mapState(["collapse"])
    },
}
</script>

<style lang="stylus" scoped>
@import 'css/style.styl'
</style>