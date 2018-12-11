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
                <el-table :data="snList" stripe style="width: 100%" index>
                    <el-table-column prop="name" label="销售单号" min-width="20%">
                    <template slot-scope="scope">
                        <el-tooltip :content="scope.row.name" placement="top" :enterable="false">
                            <p>{{ scope.row.name }}</p>
                        </el-tooltip>
                    </template>                        
                    </el-table-column>
                    <el-table-column prop="clientName" label="订数" min-width="15%">
                    </el-table-column>
                    <el-table-column prop="spdaPsn" label="入数" min-width="15%">
                    </el-table-column>
                    <el-table-column prop="psn" label="欠数" min-width="15%">
                    </el-table-column>
                    <el-table-column fixed="right" label="操作" min-width="20%">
                        <template slot-scope="scope">
                        </template>
                    </el-table-column>
                </el-table>
            </div>

            <!-- 表格内容 -->
            <div class="order_table">
                <el-table :data="snList" stripe style="width: 100%" index>
                    <el-table-column prop="name" label="生产单号" min-width="20%">
                    </el-table-column>
                    <el-table-column prop="clientName" label="订数" min-width="15%">
                    </el-table-column>
                    <el-table-column prop="spdaPsn" label="入数" min-width="15%">
                    </el-table-column>
                    <el-table-column prop="psn" label="欠数" min-width="15%">
                    </el-table-column>
                    <el-table-column fixed="right" label="操作" min-width="20%">
                        <template slot-scope="scope">
                        </template>
                    </el-table-column>
                </el-table>
            </div>
            
            <!-- 表格内容 -->
            <div class="order_table">
                <el-table :data="snList" stripe style="width: 100%" index>
                    <el-table-column prop="name" label="款号" min-width="20%">
                    </el-table-column>
                    <el-table-column prop="clientName" label="颜色" min-width="15%">
                    </el-table-column>
                    <el-table-column prop="clientName" label="订数" min-width="15%">
                    </el-table-column>
                    <el-table-column prop="spdaPsn" label="入数" min-width="15%">
                    </el-table-column>
                    <el-table-column prop="psn" label="欠数" min-width="15%">
                    </el-table-column>
                    <el-table-column fixed="right" label="操作" min-width="20%">
                        <template slot-scope="scope">
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
            psnList: [
                {}
            ],
            snList: [
                {name:"aaaaaaaaaaaaaaaaaaaaaaa"},
                {name:"aaaaaaaaaaaaaaaaaaaaaaa"},
                {name:"aaaaaaaaaaaaaaaaaaaaaaa"},
                {name:"aaaaaaaaaaaaaaaaaaaaaaa"},
                {name:"aaaaaaaaaaaaaaaaaaaaaaa"},
                {name:"aaaaaaaaaaaaaaaaaaaaaaa"},
            ],

            oldSearch: false,
            search: "",
            searchList: []
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

        //模糊搜索
        vagueSearch(){
            if (this.search) {
            } else {
                error('请输入搜索条件!')
            }
        }
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
