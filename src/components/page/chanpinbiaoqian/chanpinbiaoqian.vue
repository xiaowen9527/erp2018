<template>
    <div class="container" :class="{container_collapse:collapse}">
        <p class="page_title">产品标签</p>
        <div class="btn-box">
            <input type="text" placeholder="请输入查询单号" class="doSearch" v-model="search">
            <button :disabled="doSearch" :class="{button_btn:!doSearch}" @click="doSearchs">查询</button>
            <button class="button_btn" @click="doOuts">退出</button>
            <button :disabled="doCancel" :class="{button_btn:!doCancel}" @click="doCancels">取消</button>
            <button class="button_btn" @click="refresh">刷新</button>

            <button :disabled="doSave" :class="{button_btn:!doSave}" @click="doSaves">保存</button>
        </div>
        <div class="set_box">
            <div class="menu_box">
                <el-menu @select="menuSelected" unique-opened background-color="#f2f2f2" text-color="#303133" active-text-color="#303133">
                    <nav-menu :navMenus="this.navMenus"></nav-menu>
                </el-menu>
                <el-select v-model="searchYear" placeholder="默认当前年份" class="searchYear">
                    <el-option v-for="item in this.searchYearList" :key="item.name" :label="item.name" :value="item.name">
                    </el-option>
                </el-select>                
            </div>

            <div class="set_info">
                <div class="firstForm">
                    <div class="order_table">
                        <el-table :data="list" border style="width: 100%" height="26vh">
                            <el-table-column prop="pSn" label="款号" min-width="8%">
                            </el-table-column>
                            <el-table-column prop="colorName" label="颜色" min-width="8%">
                            </el-table-column>
                            <el-table-column prop="sex" label="性别" min-width="7%">
                            </el-table-column>
                            <el-table-column prop="year" label="年度" min-width="8%">
                            </el-table-column>
                            <el-table-column prop="quarter" label="季度" min-width="7%">
                            </el-table-column>
                            <el-table-column prop="brand" label="品牌" min-width="8%">
                            </el-table-column>
                            <el-table-column prop="clbch3Name" label="面料" min-width="10%">
                            </el-table-column>
                            <el-table-column prop="plksName" label="品类" min-width="8%">
                            </el-table-column>
                            <el-table-column prop="crowd" label="人群" min-width="7%">
                            </el-table-column>
                            <el-table-column prop="age" label="年龄段" min-width="8%">
                            </el-table-column>
                            <el-table-column prop="price" label="价格段" min-width="10%">
                            </el-table-column>
                            <el-table-column prop="channel" label="渠道" min-width="7%">
                            </el-table-column>
                        </el-table>
                    </div>
                </div>
                <div class="main clearfix">
                    <div class="left">
                        <ul class="clearfix">
                            <li v-for="(item,index) in listItem" :key="index">
                                <label>{{item.entity.name}}</label>
                                <template>
                                    <el-checkbox-group v-model="checkList">
                                        <el-checkbox :disabled="docheck" v-for="(check,i) in item.childs" :key="i" :label="item.entity.sn+'#'+check.entity.sn">{{check.entity.name}}</el-checkbox>
                                    </el-checkbox-group>
                                </template>
                            </li>
                        </ul>
                    </div>
                    <div class="right">
                        <!-- <swiper v-if="!img.length">
                            <swiper-slide>
                                <img src="./css/imgNone.jpg" alt="暂无图片" width="100%">
                            </swiper-slide>
                        </swiper>                         -->
                        <swiper :options="swiperOption" v-if="img.length">
                            <swiper-slide v-for="(item,i) in img" :key="i">
                                <img :src="item" @click="detailImage(item)">
                            </swiper-slide>
                            <div class="swiper-pagination" slot="pagination"></div>
                            <div class="swiper-button-prev" slot="button-prev"></div>
                            <div class="swiper-button-next" slot="button-next"></div>
                        </swiper>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { swiper, swiperSlide } from "vue-awesome-swiper";
import axios from "axios";
import { mapState } from "vuex";
import {
    NetworkAnomaly,
    abnormal,
    succ,
    error,
    getOut,
    imgUrl
} from "../../../assets/js/message.js";
import NavMenu from "./NavMenu";
import qs from "qs";
export default {
    name: "chanpinbiaoqian",
    data() {
        return {
            swiperOption: {
                spaceBetween: 30,
                autoplay:true,
                delay:1000,
                loop: true,
                navigation: {
                    nextEl: ".swiper-button-next",
                    prevEl: ".swiper-button-prev"
                }
            },

            doSave: true,
            doSearch: true,
            doCancel: true,
            docheck: true,
            //bind值
            search: "", //查询
            navMenus: [], //导航数据
            searchYear: "", //当前当行的年份
            searchYearList: [], //导航年份数组            
            list: [],
            img: [],

            psn: "",

            listItem: [],
            chenckedList: {},
            checkList: [],

            form: [],
            
        };
    },
    methods: {
        //查询
        doSearchs() {
            this.list = []
            this.getPageData(this.search);
            this.getImages(this.search)
        },
        //退出
        doOuts() {
            this.$emit("getOut", this.$route.name);
        },
        doCancels() {
            this.listItem = [];
            this.checkList = [];
            this.list = [];
            this.doSave = true;

            this.getnavMenu();
            this.getList();
            this.img = []
        },
        doSaves() {
            this.form = [];
            let data = {};
            for (let i in this.checkList) {
                data = {
                    sn: this.checkList[i].split("#")[1],
                    pidSn: this.checkList[i].split("#")[0],
                    psn: this.psn
                };
                this.form.push(data);
            }

            let checkSn = [];
            let checkName = [];

            //获取所有标签的sn和name
            for (let i in this.listItem) {
                for (let j in this.listItem[i]) {
                    for (let k in this.listItem[i][j]) {
                        for (let l in this.listItem[i][j][k]) {
                            if (this.listItem[i][j][k][l].sn) {
                                checkSn.push(this.listItem[i][j][k][l].sn);
                                checkName.push(this.listItem[i][j][k][l].name);
                            }
                        }
                    }
                }
            }

            //根据form的sn设置name的值
            for (let i = 0; i < this.form.length; i++) {
                for (let j = 0; j < checkSn.length; j++) {
                    if (checkSn[j] == this.form[i].sn) {
                        this.form[i].name = checkName[j];
                    }
                }
            }

            this.$http
                .post("/TPA/cCpbq/insert", this.form)
                .then(res => {
                    if (res.data.code === 0) {
                        succ(res.data.msg);
                    } else {
                        error(res.data.msg);
                    }
                })
                .catch(err => {
                    NetworkAnomaly();
                });
        },
        //刷新
        refresh() {
            this.doCancels()
            this.getDateYear();
        },        

        menuSelected(index) {
            this.list = []
            if(index.length>7){
                this.getPageData(index);
                this.getImages(index)
            }
        },
        //打开大图
        detailImage(item) {
            let url = item.split("/");
            window.open(
                "http://" +
                    url[2] +
                    "/" +
                    "images" +
                    "/" +
                    url[4] +
                    "/" +
                    url[5]
            );
        },
        getnavMenu() {
            this.$http
                .post("/TPA/psn/tree?sp=1&year="+this.searchYear)
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
        //年度
        getYear() {
            this.$http
                .post("/TPA/aLbJb/getBySn?sn=001")
                .then(res => {
                    if (res.data.code === 0) {
                        this.searchYearList = res.data.data;
                    } else {
                        error(res.data.msg);
                    }
                })
                .catch(err => {
                    NetworkAnomaly();
                });
        },
        //获取当前的年
        getDateYear() {
            var myDate = new Date();
            let year = myDate.getFullYear();
            this.searchYear = year;
        },        
        //获取数据
        getPageData(name) {
            this.checkList = [];
            if (parseInt(name)) {
                this.$http
                    .post("/TPA/cCpbq/getBy?psn=" + name)
                    .then(res => {
                        if (res.data.code === 0) {
                            this.doSave = false;
                            this.doCancel = false;
                            this.list = res.data.data;
                            this.psn = name;
                            this.docheck = false;
                            console.log(this.psn);

                            let checked = res.data.attachment.bp;
                            for (let i in checked) {
                                for (let j in checked[i]) {
                                    this.checkList.push(checked[i][j]);
                                }
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
        //获取当前款号图片
        getImages(name){
            this.$http.post('/TPA/cSpdaA/getBy?psn='+name)
                .then(res=>{
                   if(res.data.code===0){
                       if(res.data.data.length>0){
                           for(let i in res.data.data){
                               res.data.data[i] = imgUrl + res.data.data[i]
                           }
                       }
                       this.img = res.data.data

                   }else{
                       error(res.data.msg)
                   }
                })
                .catch(err=>{
                    NetworkAnomaly()
                })
        },
        //获取标签列表
        getList() {
            this.$http
                .post("/TPA/cCpbq/list")
                .then(res => {
                    this.listItem = res.data.data.childs;
                })
                .catch(err => {
                    NetworkAnomaly();
                });
        }
    },
    mounted() {
        this.getYear();
        this.getDateYear();        
        this.getnavMenu();
        this.getList();
    },
    watch: {
        search() {
            if (this.search.length > 0) {
                this.doSearch = false;
            } else {
                this.doSearch = true;
            }
        },
        searchYear() {
            this.getnavMenu();
        }        
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
@import './css/style.styl'
.container>>>.el-submenu__title, .container>>>.el-menu-item
    height 3vh
    line-height 3vh
    font-size 1.6vh !important
.container>>>th, .order_table>>>.el-table td, .el-table th
    padding 0
.container>>>.el-table .cell
    height 3.5vh
    line-height 3.5vh
    text-align center
    font-size 1.4vh
    white-space: pre-line !important 
.container>>>.el-table__empty-block
    min-height 3.5vh
</style>
