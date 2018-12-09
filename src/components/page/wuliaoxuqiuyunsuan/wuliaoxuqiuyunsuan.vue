<template>
    <div class="container" :class="{container_collapse:collapse}">
         <!-- 页面标题 -->
        <p class="page_title">物料需求运算</p>

        <!-- 顶部操作按钮 -->
        <div class="btn-box">
            <label class="label_Info">生产订单</label>
            <input class="queryInfo" type="text" v-model="queryInfo" />
            <button @click="doSearchs" class="button_btn">查询</button>
            <button class="button_btn" @click="doCancels">取消</button>
            <button class="button_btn" @click="doOuts">退出</button>
        </div>

        <div class="order_table">
            <el-table :data="list" stripe style="width: 100%">
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
                <el-table-column prop="isCode" label="按码算" min-width="110px">
                </el-table-column>
                <el-table-column prop="dosageUnit" label="用量单位" min-width="110px">
                </el-table-column>
                <el-table-column prop="amount" label="开发用量" min-width="110px">
                    <template slot-scope="scope">
                        <el-tooltip :content="String(scope.row.amount)" placement="top" :enterable="false">
                            <p>{{ scope.row.amount }}</p>
                        </el-tooltip>
                    </template>
                </el-table-column>
                <el-table-column prop="dosage" label="大货用量" min-width="110px">
                    <template slot-scope="scope">
                        <el-tooltip :content="String(scope.row.dosage)" placement="top" :enterable="false">
                            <p>{{ scope.row.dosage }}</p>
                        </el-tooltip>
                    </template>
                </el-table-column>
                <el-table-column prop="loss" label="生产损耗" min-width="110px">
                </el-table-column>
                <el-table-column prop="purchaseUnit" label="采购单位" min-width="110px">
                </el-table-column>
                <el-table-column prop="zhxs" label="转换系数" min-width="110px">
                </el-table-column>
                <el-table-column prop="demand" label="用量需求数量" min-width="110px">
                    <template slot-scope="scope">
                        <el-tooltip :content="String(scope.row.demand)" placement="top" :enterable="false">
                            <p>{{ scope.row.demand }}</p>
                        </el-tooltip>
                    </template>
                </el-table-column>
                <el-table-column prop="purchase" label="采购需求数量" min-width="110px">
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
                    <template slot-scope="scope">
                        <el-tooltip :content="scope.row.remark" placement="top" :enterable="false">
                            <p>{{ scope.row.remark }}</p>
                        </el-tooltip>
                    </template>
                </el-table-column>
            </el-table>
        </div>


        <div class="pageBox">
            <el-pagination @current-change="currentPage" :current-page='page' v-if="pageOnOff" background :page-size="pageSize" :pager-count="5" :total="total">
            </el-pagination>
        </div>
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
    name: "wuliaoxuqiuyunsuan",
    data() {
        return {
            queryInfo: "",
            list: [],
            page: 0,
            pageSize: 15,
            total: 0,
            pageParams: {},
            pageOnOff: true
        }
    },

    methods: {
        // 查询
        doSearchs() {
            this.page = 0;
            let params = {
                page: this.page,
                count: this.pageSize,
                orderSn: this.queryInfo
            }
            this.pageParams = params;
            this.$http.post("/TPA/vMrp/search", qs.stringify(this.pageParams)).then(res => {
                if (res.data.code === 0) {
                    succ(res.data.msg)
                    this.list = res.data.data.list;

                    this.total = res.data.data.total;
                    if (this.total > this.pageSize) {
                        this.pageOnOff = true;
                    } else {
                        this.pageOnOff = false;
                    }
                } else {
                    error(res.data.msg)
                }
            })
            .catch(err => {
                NetworkAnomaly();
            })
        },

        // 取消
        doCancels() {},

        // 退出
        doOuts() {},

        currentPage(val) {
            this.page = val;
        }
    },

    computed: {
        ...mapState(["collapse"])
    },

    watch: {
        page() {
            if(this.page > 0) {
                let params = {
                    page: this.page - 1,
                    count: this.pageSize,
                    orderSn: this.queryInfo
                }
                this.pageParams = params;
                this.$http.post("/TPA/vMrp/search", qs.stringify(this.pageParams)).then(res => {
                    if (res.data.code === 0) {
                        succ(res.data.msg)
                        this.list = res.data.data.list;

                        this.total = res.data.data.total;
                        if (this.total > this.pageSize) {
                            this.pageOnOff = true;
                        } else {
                            this.pageOnOff = false;
                        }
                    } else {
                        error(res.data.msg)
                    }
                })
            }
        }
    }
}
</script>

<style lang="stylus" scoped>
@import 'css/style.styl'
</style>