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

        <div class="set_box">
            <div class="order_table">
                <el-table :data="list" stripe style="width: 100%">
                    <el-table-column prop="psn" label="款号" min-width="3%">
                    </el-table-column>
                    <el-table-column prop="psnColor" label="产品颜色" min-width="5%">
                    </el-table-column>
                    <el-table-column prop="number" label="订单数" min-width="3%">
                    </el-table-column>
                    <el-table-column prop="materialSn" label="物料编码" min-width="4%">
                    </el-table-column>
                    <el-table-column prop="lbch2Name" label="名称" min-width="5%">
                    </el-table-column>
                    <el-table-column prop="kz" label="克重" min-width="3%">
                    </el-table-column>
                    <el-table-column prop="size" label="布宽" min-width="3%">
                    </el-table-column>
                    <el-table-column prop="colorSn" label="色号" min-width="4%">
                    </el-table-column>
                    <el-table-column prop="color" label="色号名称" min-width="4%">
                    </el-table-column>
                    <el-table-column prop="isCode" label="按码算" min-width="4%">
                    </el-table-column>
                    <el-table-column prop="dosageUnit" label="用量单位" min-width="4%">
                    </el-table-column>
                    <el-table-column prop="amount" label="开发用量" min-width="4%">
                    </el-table-column>
                    <el-table-column prop="dosage" label="大货用量" min-width="4%">
                    </el-table-column>
                    <el-table-column prop="loss" label="生产损耗" min-width="4%">
                    </el-table-column>
                    <el-table-column prop="purchaseUnit" label="采购单位" min-width="4%">
                    </el-table-column>
                    <el-table-column prop="zhxs" label="转换系数" min-width="4%">
                    </el-table-column>
                    <el-table-column prop="demand" label="用量需求数量" min-width="5%">
                    </el-table-column>
                    <el-table-column prop="purchase" label="采购需求数量" min-width="5%">
                    </el-table-column>
                    <el-table-column prop="func" label="领用部门" min-width="4%">
                    </el-table-column>
                    <el-table-column prop="part" label="应用部位" min-width="8%">
                    </el-table-column>
                    <el-table-column prop="" label="规格说明" min-width="4%">
                    </el-table-column>
                    <el-table-column prop="" label="性质" min-width="4%">
                    </el-table-column>
                    <el-table-column prop="" label="类别" min-width="4%">
                    </el-table-column>
                    <el-table-column prop="" label="说明" min-width="4%">
                    </el-table-column>
                </el-table>
            </div>
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
            list: []
        }
    },

    methods: {
        // 查询
        doSearchs() {
            this.$http.post("/TPA/vMrp/search?orderSn=" + this.queryInfo).then(res => {
                if (res.data.code === 0) {
                    this.list = res.data.data.list;
                }
            })
        },

        // 取消
        doCancels() {},

        // 退出
        doOuts() {}
    },

    computed: {
        ...mapState(["collapse"])
    },
}
</script>

<style lang="stylus" scoped>
@import 'css/style.styl'
</style>