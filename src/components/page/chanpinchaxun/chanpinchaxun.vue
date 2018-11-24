<template>
    <div class="container" :class="{container_collapse:collapse}">
        <p class="page_title">产品查询</p>
        <div class="set_box">
            <div class="set_info">
                <section class="firstForm">
                    <ul class="clearfix">
                        <li>
                            <label>年度</label>
                            <el-select v-model="firstForm.year" placeholder="请选择">
                                <el-option v-for="item in yearList" :key="item.name" :label="item.name" :value="item.name">
                                </el-option>
                            </el-select>
                        </li>
                        <li>
                            <label>季度</label>
                            <el-select v-model="firstForm.quarter" placeholder="请选择">
                                <el-option v-for="item in quarterList" :key="item.name" :label="item.name" :value="item.name">
                                </el-option>
                            </el-select>
                        </li>
                        <li>
                            <label>品牌</label>
                            <el-select v-model="firstForm.brand" placeholder="请选择">
                                <el-option v-for="item in brandList" :key="item.name" :label="item.name" :value="item.name">
                                </el-option>
                            </el-select>
                        </li>
                        <li>
                            <label>渠道</label>
                            <el-select v-model="firstForm.channel" placeholder="请选择">
                                <el-option v-for="item in channelList" :key="item.name" :label="item.name" :value="item.name">
                                </el-option>
                            </el-select>
                        </li>
                        <li>
                            <label>产品类别</label>
                            <el-select v-model="firstForm.crowd" placeholder="请选择">
                                <el-option v-for="item in crowdList" :key="item.name" :label="item.name" :value="item.name">
                                </el-option>
                            </el-select>
                        </li>
                    </ul>
                    <ul class="custom clearfix">
                        <li>
                            <label>条件1</label>
                            <el-select v-model="firstTerm" placeholder="请选择">
                                <el-option v-for="item in this.termList" :key="item.name" :label="item.name" :value="item.val">
                                </el-option>
                            </el-select>
                            <span>=</span>
                            <input type="text" v-model="firstTermVal" :disabled="!firstTerm">
                        </li>
                        <li>
                            <label>条件2</label>
                            <el-select v-model="secondTerm" placeholder="请选择">
                                <el-option v-for="item in this.termList" :key="item.name" :label="item.name" :value="item.val">
                                </el-option>
                            </el-select>
                            <span>=</span>
                            <input type="text" v-model="secondTermVal" :disabled="!secondTerm">
                        </li>
                        <li>
                            <label>条件3</label>
                            <el-select v-model="thirdTerm" placeholder="请选择">
                                <el-option v-for="item in this.termList" :key="item.name" :label="item.name" :value="item.val">
                                </el-option>
                            </el-select>
                            <span>=</span>
                            <input type="text" v-model="thirdTermVal" :disabled="!thirdTerm">
                        </li>
                        <button class="save" @click="doSearch">查询</button>
                        <button class="save" @click="doCandels">清除</button>
                    </ul>
                </section>

                <div class="order_table">
                    <el-table :data="list" border style="width: 100%">
                        <el-table-column type="index" width="50" label="编号" min-width="5%">
                        </el-table-column>
                        <el-table-column prop="brand" label="品牌" min-width="9.5%">
                        </el-table-column>
                        <el-table-column prop="year" label="年度" min-width="9.5%">
                        </el-table-column>
                        <el-table-column prop="quarter" label="季度" min-width="9.5%">
                        </el-table-column>
                        <el-table-column prop="channel" label="渠道" min-width="9.5%">
                        </el-table-column>
                        <el-table-column prop="age" label="年龄段" min-width="9.5%">
                        </el-table-column>
                        <el-table-column prop="crowd" label="产品类别" min-width="9.5%">
                        </el-table-column>
                        <el-table-column prop="sex" label="性别" min-width="9.5%">
                        </el-table-column>
                        <el-table-column prop="lbch2name" label="二级品类名称" min-width="9.5%">
                        </el-table-column>
                        <el-table-column prop="lbch1name" label="一级品类名称" min-width="9.5%">
                        </el-table-column>
                        <el-table-column prop="lbch3name" label="面料类别名称" min-width="9.5%">
                        </el-table-column>
                    </el-table>
                </div>

            </div>
        </div>
        <div class="pageBox">
                <!-- <ul class="pageData">
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

                </ul> -->
            <el-pagination v-if="pageOnOff" background :page-size="pageSize" :pager-count="5" :total="total" @current-change="currentPage">
            </el-pagination>
        </div>
    </div>
</template>

<script>
import { mapState } from "vuex";
import {
    NetworkAnomaly,
    succ,
    error,
    getOut
} from "../../../assets/js/message.js";
import qs from "qs";
export default {
    name: "chanpinchaxun",
    data() {
        return {
            yearList: [],
            brandList: [],
            quarterList: [],
            channelList: [],
            crowdList: [],
            firstForm: {
                year: "",
                quarter: "",
                brand: "",
                channel: ""
            },
            list: [],

            //自定义条件
            firstTerm: "",
            secondTerm: "",
            thirdTerm: "",
            //自定义条件值
            firstTermVal: "",
            secondTermVal: "",
            thirdTermVal: "",
            //自定义条件列表
            termList: [
                {
                    name: "品牌",
                    val: "brand"
                },
                {
                    name: "品牌编号",
                    val: "brandSn"
                },
                {
                    name: "年度",
                    val: "year"
                },
                {
                    name: "季度",
                    val: "quarter"
                },
                {
                    name: "季度编号",
                    val: "quarterSn"
                },
                {
                    name: "渠道",
                    val: "channel"
                },
                {
                    name: "渠道编号",
                    val: "channels"
                },
                {
                    name: "年龄段",
                    val: "age"
                },
                {
                    name: "价格段",
                    val: "price"
                },
                {
                    name: "产品类别",
                    val: "crowd"
                },
                {
                    name: "性别",
                    val: "sex"
                },
                {
                    name: "二级品类名称",
                    val: "lbch2Name"
                },
                {
                    name: "一级品类名称",
                    val: "lbch1Name"
                },
                {
                    name: "面料类别名称",
                    val: "lbch3Name"
                }
            ],

            //分页：当前页码/总数量/每页显示条数
            page: 0,
            total: "",
            pageSize: 10,
            pageOnOff: false,
            //分页查询条件
            pageParams: {}
        };
    },
    mounted() {
        this.getYear()
        this.getBrand();
        this.getQuarter();
        this.getChannel();
        this.getCrowd();
    },
    methods: {
        //取消
        doCandels() {
            this.firstForm = {
                year: "",
                quarter: "",
                brand: "",
                channel: ""
            };
            //自定义条件
            this.firstTerm = "";
            this.secondTerm = "";
            this.thirdTerm = "";
            //自定义条件值
            this.firstTermVal = "";
            this.secondTermVal = "";
            this.thirdTermVal = "";
        },
        //查询
        doSearch() {
            // this.doCandels()
            this.getIf(this.firstTermVal, this.firstTerm);
            this.getIf(this.secondTermVal, this.secondTerm);
            this.getIf(this.thirdTermVal, this.thirdTerm);

            let onoff = 0;
            //遍历firstForm的值不为空打开开关
            for (let i in this.firstForm) {
                if (this.firstForm[i]) {
                    onoff = 1;
                }
            }
            //如果onoff等于true则firstForm的值至少有一个不为空
            if (onoff) {
                let form = {};
                for (let i in this.firstForm) {
                    if (this.firstForm[i]) {
                        form[i] = this.firstForm[i];
                    }
                }

                this.pageOnOff = false;
                form.page = 0;
                form.count = this.pageSize;
                this.pageParams = form
                this.getPageData(this.pageParams);
            } else {
                error("至少需要一个查询条件");
            }
        },
        //获取年份
        getYear() {
            this.$http.post("/TPA/aLbJb/getBySn?sn=001").then(res => {
                if (res.data.code === 0) {
                    this.yearList = res.data.data;
                } else {
                    error(res.data.msg);
                }
            });
        },
        //获取品牌
        getBrand() {
            this.$http.post("/TPA/aLbJb/getBySn?sn=003").then(res => {
                if (res.data.code === 0) {
                    this.brandList = res.data.data;
                } else {
                    error(res.data.msg);
                }
            });
        },
        //获取季度
        getQuarter() {
            this.$http.post("/TPA/aLbJb/getBySn?sn=002").then(res => {
                if (res.data.code === 0) {
                    this.quarterList = res.data.data;
                } else {
                    error(res.data.msg);
                }
            });
        },
        //获取渠道
        getChannel() {
            this.$http.post("/TPA/aLbJb/getBySn?sn=022").then(res => {
                if (res.data.code === 0) {
                    this.channelList = res.data.data;
                } else {
                    error(res.data.msg);
                }
            });
        },
        //获取类型
        getCrowd() {
            this.$http.post("/TPA/aLbJb/getBySn?sn=014").then(res => {
                if (res.data.code === 0) {
                    this.crowdList = res.data.data;
                } else {
                    error(res.data.msg);
                }
            });
        },
        //判断数据是否为空，不为空加入表单
        getIf(data1, data2, i) {
            if (data1) {
                let name;
                for (let j in this.firstForm) {
                    if (this.firstForm[j] == data2) {
                    } else {
                        this.firstForm[data2] = data1;
                    }
                }
            }
        },

        //分页
        getPageData(data) {
            this.list = []
            this.$http
                .post("/TPA/psn/search?sp=1", qs.stringify(data))
                .then(res => {
                    if (res.data.code === 0) {
                        this.list = res.data.data.list;
                         console.log(this.list)
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
    }
};
</script>

<style lang="stylus" scoped>
@import './css/style.styl'
.firstForm>>>.el-input--suffix .el-input__inner
    width 100% !important
.firstForm>>>.el-input--suffix, .secondForm>>>.el-input__inner
    height 3.5vh !important
.firstForm>>>.el-input__icon
    line-height 3.5vh
.container>>>.el-table td, .container>>>.el-table th
    padding 0    
.container>>>.el-table .cell
    line-height 4.5vh
    text-align center
    font-size 1.3vh !important
    white-space: pre-line !important
</style>
