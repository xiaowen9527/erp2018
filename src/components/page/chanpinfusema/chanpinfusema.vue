<template>
    <div class="container" :class="{container_collapse:collapse}">
        <p class="page_title">产品复色码</p>
        <div class="btn-box">
            <input type="text" placeholder="请输入查询款号" class="doSearch" v-model="search" readonly @click="doSearchs">
            <button class="button_btn" @click="doSearchs">查询</button>
            <button class="button_btn" @click="doOuts">退出</button>
            <button :disabled='doCancel' :class="{button_btn:!doCancel}" @click="doCancels">取消</button>
            <button class="button_btn" @click="refresh">刷新</button>
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
            <div class="set_info clearfix">
                <div class="table">
                    <section class="firstForm">
                        <ul class="clearfix">
                            <li>
                                <label>尺码</label>
                                <input :disabled="firstFormGui" type="text" readonly placeholder="请选择" @click="doSize" v-model="size.name">
                                <button :disabled="firstFormGui" :class="{btn:!firstFormGui}" @click="doSize">选择</button>
                                <button  class="btn" @click="doImports">导入</button>
                            </li>
                        </ul>
                        <div class="order_table">
                            <el-table :data="TableSizeList" border style="width: 100%" height="29.5vh">
                                <el-table-column prop="psn" label="款号" min-width="20%">
                                </el-table-column>
                                <el-table-column prop="pidName" label="尺码类型" min-width="20%">
                                </el-table-column>
                                <el-table-column prop="sizeSn" label="尺码编号" min-width="20%">
                                </el-table-column>
                                <el-table-column prop="sizeName" label="尺码名称" min-width="19.5%">
                                </el-table-column>
                                <el-table-column label="操作" min-width="20.5%">
                                    <template slot-scope="scope">
                                        <el-button :disabled="(scope.row.status == 1)" :class="{btn:(scope.row.status == 1)}" @click="effectiveSize(scope.$index, scope.row)" type="text">有效</el-button>
                                        <el-button :disabled="(scope.row.status == 0)" :class="{btn:(scope.row.status == 0)}" @click="invalidSize(scope.$index, scope.row)" type="text">无效</el-button>
                                    </template>
                                </el-table-column>
                            </el-table>
                        </div>
                    </section>
                    <section class="firstForm">
                        <ul class="clearfix">
                            <li>
                                <label>颜色</label>
                                <input :disabled="secondFormGui" type="text" readonly placeholder="请选择" @click="doColor" v-model="color.name">
                                <button :disabled="secondFormGui" :class="{btn:!secondFormGui}" @click="doColor">选择</button>
                                <button :disabled="!secondSave" :class="{btn:secondSave}" @click="doSecondSave">保存</button>
                                <button  class="btn" @click="dodesigns">导入</button>
                            </li>
                        </ul>
                        <div class="order_table">
                            <el-table :data="TableColorList" border style="width: 100%" height="29.5vh">
                                <el-table-column prop="psn" label="款号" min-width="20%">
                                </el-table-column>
                                <el-table-column prop="pidName" label="颜色类型" min-width="20%">
                                </el-table-column>
                                <el-table-column prop="colorSn" label="颜色编号" min-width="20%">
                                </el-table-column>
                                <el-table-column prop="colorName" label="颜色名称" min-width="19.5%">
                                </el-table-column>
                                <el-table-column label="操作" min-width="20.5%">
                                    <template slot-scope="scope">
                                        <el-button :disabled="(scope.row.status == 1)" :class="{btn:(scope.row.status == 1)}" @click="effectiveColor(scope.$index, scope.row)" type="text">有效</el-button>
                                        <el-button :disabled="(scope.row.status == 0)" :class="{btn:(scope.row.status == 0)}" @click="invalidColor(scope.$index, scope.row)" type="text">无效</el-button>
                                    </template>
                                </el-table-column>
                            </el-table>
                        </div>
                    </section>
                </div>
                <div class="banner">
                    <!-- <swiper>
                        <swiper-slide v-if="!img.length"><img src="./css/imgNone.jpg" alt="暂无图片"></swiper-slide>    
                    </swiper> -->
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
        <div class="pageBox" :class="{collapse:collapse}">
            <ul>
                <li>
                    <span>编制人：</span>
                    <span>{{this.lastTime.addUser}}</span>
                </li>
                <li>
                    <span>编制日期：</span>
                    <span>{{this.lastTime.addDate}}</span>
                </li>
                <!-- <li>
                    <span>修改人：</span>
                    <span>{{this.lastTime.updateUser}}</span>
                </li>
                <li>
                    <span>修改日期：</span>
                    <span>{{this.lastTime.updateDate}}</span>
                </li> -->
            </ul>
        </div>
        <el-dialog title="查询" :visible.sync="oldSearch">
            <el-input v-model="searchXun" placeholder="请输入你要查找的款号"></el-input>
            <ul class="srcond_menu">
                <li v-if="searchList.length===0">暂无数据</li>
                <li class="clearfix" v-for="(item,i) in searchList" :key="i">
                    <span class="search" @click="getSearchItem(item)">|--{{item.psn}}</span>
                </li>
            </ul>
        </el-dialog>

        <el-dialog title="尺码" :visible.sync="oldSize">
            <el-input v-model="searchSize" placeholder="请输入你要查找的尺码"></el-input>
            <el-table ref="multipleTable" border height="300px" :data="sizeList" tooltip-effect="dark" style="width: 100%;margin-top:10px" @selection-change="handleSelectionChange">
                <el-table-column type="selection"  min-width="20%">
                </el-table-column>
                <el-table-column prop="sn" label="编号" min-width="35%">
                </el-table-column>
                <el-table-column prop="name" label="尺码" min-width="35%">
                </el-table-column>
            </el-table>
            <el-button type="primary" @click="doFirstSave" class="fr" style="margin-top:10px">保存</el-button>       
        </el-dialog>

        <el-dialog title="颜色" :visible.sync="oldColor">
            <el-input v-model="searchColor" placeholder="请输入你要查找的颜色"></el-input>
            <ul class="srcond_menu">
                <li v-if="colorList.length===0">暂无数据</li>
                <li class="clearfix" v-for="(item,i) in colorList" :key="i">
                    <span @click="getColorItem(item)">|--{{item.name}}</span>
                    <span @click="getColorItem(item)">{{item.sn}}</span>
                </li>
            </ul>
        </el-dialog>

        <!-- 导入弹窗 -->
        <el-dialog class="importExport" title="导入尺码" :visible.sync="importbox" width="30%" :showClose="false" :show-file-list="false">
            <a class="down" href="/TPA/cStandardOper/downExcel">下载导入模板</a>
            <el-upload name="file" class="upload-demo" ref="upload" action="" :file-list="fileList" :http-request="uploadFile" :auto-upload="false" accept=".xls,.xlsx,.csv">
                <el-button slot="trigger" size="small" type="primary" plain>选取文件</el-button>
                <div slot="tip" class="el-upload__tip">只能上传excel文件</div>
            </el-upload>
            <span slot="footer" class="dialog-footer">
                <el-button @click="importCancel">取 消</el-button>
                <el-button type="primary" @click="submitUpload" plain>确 定</el-button>
            </span>
        </el-dialog>
        
        <div class="importZhe" v-if="importZhe" v-loading="true" element-loading-text="正在上传中..." element-loading-spinner="el-icon-loading" element-loading-background="rgba(0, 0, 0, 0.8)"></div>

        <el-dialog class="importExport" title="导入颜色" :visible.sync="designbox" width="30%" :showClose="false" :show-file-list="false">
            <el-upload name="file" class="upload-demo" ref="designq" action="" :file-list="designfileList" :http-request="designUploadFile" :auto-upload="false" accept=".xls,.xlsx,.csv">
                <el-button slot="trigger" size="small" type="primary" plain>选取文件</el-button>
                <div slot="tip" class="el-upload__tip">只能上传excel文件</div>
            </el-upload>
            <span slot="footer" class="dialog-footer">
                <el-button @click="designCancel">取 消</el-button>
                <el-button type="primary" @click="designUpload" plain>确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
import { swiper, swiperSlide } from "vue-awesome-swiper";
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
    name: "chanpinfusema",
    data() {
        return {
            swiperOption: {
                spaceBetween: 30,
                autoplay: true,
                delay: 1000,
                loop: true,
                navigation: {
                    nextEl: ".swiper-button-next",
                    prevEl: ".swiper-button-prev"
                }
            },

            lastTime: {
                addUser: "",
                addDate: "",
                updateUser: "",
                updateDate: ""
            },

            doCancel: true,

            //form的disabled
            firstFormGui: true,
            secondFormGui: true,
            secondFormOn: true,

            firstSave: false,
            secondSave: false,

            //bind值
            navMenus: [], //导航数据
            searchYear: "", //当前当行的年份
            searchYearList: [], //导航年份数组
            img: [],

            search: "",
            color: {
                name: ""
            },
            size: [],
            
            //模糊查询框的值
            searchXun: "",
            searchSize: "",
            searchColor: "",
            //模糊查询框列表
            searchList: [],
            sizeList: [],
            colorList: [],
            //模糊查询框开关
            oldSearch: false,
            oldSize: false,
            oldColor: false,

            //table列表
            TableSizeList: [],
            TableColorList: [],

            firstForm: {
                firstFormSize: ""
            },
            secondForm: {
                firstFormColor: ""
            },
            idx: "",

            
            //导入弹出开关
            importbox: false,
            importZhe: false, //导入遮罩
            //上传的文件
            fileList: [],   
            designbox: false,
            designfileList:[],         
        };
    },
    methods: {
        //表单1恢复初始空值状态
        emptyFirstForm() {
            this.firstForm = {
                firstFormSize: ""
            };
        },
        //表单2恢复初始空值状态
        emptySecondForm() {
            this.secondForm = {
                firstFormColor: ""
            };
        },
        //禁用表单first
        disabledFirstForm() {
            this.firstFormOnGui = true;
        },
        //禁用表单Second
        disabledSecondForm() {
            this.secondFormGui = true;
        },
        //开放表单first
        noDisabledFirstForm() {
            this.firstFormGui = false;
        },
        //开放表单Second
        noDisabledSecondForm() {
            this.secondFormGui = false;
        },

        //取消
        doCancels() {
            this.emptyFirstForm();
            this.emptySecondForm();
            this.disabledFirstForm();
            this.disabledSecondForm();

            this.search = "";
            this.color = "";
            this.size = [];
            //模糊查询框的值
            this.searchXun = "";
            this.searchSize = "";
            this.searchColor = "";
            //模糊查询框列表
            this.searchList = [];
            this.sizeList = [];
            this.colorList = [];
            //table列表
            this.TableSizeList = [];
            this.TableColorList = [];

            this.img = [];
        },
        doFirstSave() {
            this.oldSize = false;
            this.searchSize = "";

            // this.size.psn = this.search;
            // this.size.yscmType = this.size.type;
            // this.size.sizeSn = this.size.sn;
            // this.size.sizeName = this.size.name;  
            for(let i in this.size){
                this.size[i].psn = this.search
                this.size[i].yscmType = this.size[i].type
                this.size[i].sizeSn = this.size[i].sn
                this.size[i].sizeName = this.size[i].name
            }
            this.$http
                .post("/TPA/cSpdaB/insert",this.size)
                .then(res => {
                    if (res.data.code === 0) {
                        succ(res.data.msg);
                        this.size = [];
                        this.getSizeList(this.search);
                    } else {
                        error(res.data.msg);
                    }
                })
                .catch(res => {
                    NetworkAnomaly();
                });
        },
        doSecondSave() {
            this.color.psn = this.search;
            this.color.colorSn = this.color.sn;
            this.color.colorName = this.color.name;
            this.$http
                .post("/TPA/cSpdaA/insert", qs.stringify(this.color))
                .then(res => {
                    if (res.data.code === 0) {
                        succ(res.data.msg);
                        this.color.name = "";
                        this.getColorList(this.color.psn);
                    } else {
                        error(res.data.msg);
                    }
                    console.log(this.color);
                })
                .catch(res => {
                    NetworkAnomaly();
                });
        },
        //刷新
        refresh() {
            this.doCancels();
            this.getDateYear();
        },

        //点击查询按钮
        doSearchs() {
            this.oldSearch = true;
            this.searchXun = "";
        },
        //点击尺码按钮
        doSize() {
            this.oldSize = true;
        },
        //点击颜色按钮
        doColor() {
            this.oldColor = true;
        },

        //选择查询
        getSearchItem(item) {
            this.oldSearch = false;
            this.doCancel = false;
            this.search = item.psn;

            //获取当前单号的尺码列表
            this.getSizeList(item.psn);

            //获取当前单号的颜色列表
            this.getColorList(item.psn);

            this.getLastTime(item.psn);
            this.getImages(item.psn);
        },
        //获取当前勾选则size
        handleSelectionChange(val){
            this.size = val;
            this.firstSave = true; 
        },        
        //选择颜色
        getColorItem(item) {
            this.oldColor = false;
            this.color = item;
            this.secondSave = true;
            this.searchColor = "";
        },
        //退出
        doOuts() {
            this.$emit("getOut", this.$route.name);
        },

        //导入按纽
        doImports() {
            this.importbox = true;
        },
        //导入取消
        importCancel() {
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
                    .post("/TPA/cStandardOper/importExcel", formData)
                    .then(res => {
                        console.log(res);
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

        //导入颜色
        dodesigns() {
            this.designbox = true;
        },
        //导入颜色取消
        designCancel() {
            this.designbox = false;
            this.$refs.designq.clearFiles();
        },
        //文件上传到服务器按钮
        designUpload() {
            this.$refs.designq.submit();
        },
        //自定义上传
        designUploadFile(params) {
            const _file = params.file;
            let formData = new FormData();
            formData.append("file", _file);
            this.$ajax
                .post("/TPA/cSpda/loadDesign?id=" + this.firstForm.id, formData)
                .then(res => {
                    if (res.status === 200) {
                        console.log(res);
                        if (res.data.code === 0) {
                            succ(res.data.msg);
                            this.designCancel();
                            this.$refs.designq.clearFiles();
                            this.designbox = false;
                            this.design.push(imgUrl + res.data.data);
                        } else {
                            console.log("1");
                            error(res.data.msg);
                        }
                    } else {
                        console.log("2");
                        NetworkAnomaly();
                    }
                    this.importZhe = false;
                })
                .catch(err => {
                    NetworkAnomaly();
                    this.importZhe = false;
                });
        },


        //获取尺码
        getSizeList(name) {
            if (parseInt(name)) {
                this.$http
                    .post("/TPA/cSpdaB/search?psn=" + name)
                    .then(res => {
                        if (res.data.code === 0) {
                            this.TableSizeList = res.data.data.list;
                            this.noDisabledFirstForm();
                            this.noDisabledSecondForm();
                        } else {
                            error(res.data.msg);
                        }
                    })
                    .catch(err => {
                        NetworkAnomaly();
                    });
            }
        },
        getColorList(name) {
            if (parseInt(name)) {
                this.$http
                    .post("/TPA/cSpdaA/search?psn=" + name)
                    .then(res => {
                        if (res.data.code === 0) {
                            this.TableColorList = res.data.data.list;
                            this.noDisabledSecondForm();
                        } else {
                            error(res.data.msg);
                        }
                    })
                    .catch(err => {
                        NetworkAnomaly();
                    });
            }
        },
        getImages(name) {
            if (parseInt(name)) {
                this.$http
                    .post("/TPA/cSpdaA/getBy?psn=" + name)
                    .then(res => {
                        if (res.data.code === 0) {
                            let data = res.data.data;
                            for (let i in data) {
                                data[i] = imgUrl + data[i];
                            }
                            this.img = data;
                            console.log(this.img);
                        } else {
                            error(res.data.msg);
                        }
                    })
                    .catch(err => {
                        NetworkAnomaly();
                    });
            }
        },


        menuSelected(index) {
            if (parseInt(index)) {
                //获取当前单号的尺码列表
                this.getSizeList(index);
                //获取当前单号的颜色列表
                this.getColorList(index);
                this.getImages(index);
                this.getLastTime(index);
                this.search = index;
                this.doCancel = false;
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
        //获取导航
        getnavMenu() {
            this.$http
                .post("/TPA/psn/tree?sp=1&year=" + this.searchYear)
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
        //有效
        effectiveSize(index, row) {
            this.idx = index;
            let item = this.TableSizeList[index];
            item.status = 1;
            this.$http
                .post("/TPA/cSpdaB/status", qs.stringify(item))
                .then(res => {
                    if (res.data.code === 0) {
                        succ(res.data.msg);
                        console.log(res);
                        this.$set(this.TableSizeList, this.idx, item);
                    } else {
                        error(res.data.msg);
                    }
                })
                .catch(err => {
                    NetworkAnomaly();
                });
        },
        effectiveColor(index, row) {
            this.idx = index;
            let item = this.TableColorList[index];
            item.status = 1;
            this.$http
                .post("/TPA/cSpdaA/status", qs.stringify(item))
                .then(res => {
                    if (res.data.code === 0) {
                        succ(res.data.msg);
                        console.log(res);
                        this.$set(this.TableColorList, this.idx, item);
                    } else {
                        error(res.data.msg);
                    }
                })
                .catch(err => {
                    NetworkAnomaly();
                });
        },
        //无效
        invalidSize(index, row) {
            this.idx = index;
            let item = this.TableSizeList[index];
            item.status = 0;
            this.$http
                .post("/TPA/cSpdaB/status", qs.stringify(item))
                .then(res => {
                    if (res.data.code === 0) {
                        succ(res.data.msg);
                        console.log(res);
                        this.$set(this.TableSizeList, this.idx, item);
                    } else {
                        error(res.data.msg);
                    }
                })
                .catch(err => {
                    NetworkAnomaly();
                });
        },
        invalidColor(index, row) {
            this.idx = index;
            let item = this.TableColorList[index];
            item.status = 0;
            this.$http
                .post("/TPA/cSpdaA/status", qs.stringify(item))
                .then(res => {
                    if (res.data.code === 0) {
                        succ(res.data.msg);
                        console.log(res);
                        this.$set(this.TableColorList, this.idx, item);
                    } else {
                        error(res.data.msg);
                    }
                })
                .catch(err => {
                    NetworkAnomaly();
                });
        },
        getLastTime(name) {
            this.$http
                .post("/TPA/cSpdaA/getLastUpdate?psn=" + name)
                .then(res => {
                    if (res.data.code === 0) {
                        this.lastTime = res.data.data;
                    } else {
                        error(res.data.msg);
                    }
                })
                .catch(err => {
                    NetworkAnomaly();
                });
        }
        //获取颜色的最新修改时间修改人/编制人、编制时间
    },
    mounted() {
        this.getYear();
        this.getDateYear();
        this.getnavMenu();
    },
    computed: {
        ...mapState(["collapse"])
    },
    components: {
        NavMenu,
        swiper,
        swiperSlide
    },
    watch: {
        searchXun() {
            if (this.searchXun.length !== 0) {
                let search = {
                    psn: 17 + "|" + this.searchXun
                };
                let searchStr = JSON.stringify(search);
                this.$http
                    .post("/TPA/psn/search?sp=1&search=" + searchStr)
                    .then(res => {
                        this.searchList = res.data.data.list;
                    })
                    .catch(err => {
                        NetworkAnomaly();
                    });
            } else {
                this.searchList = [];
            }
        },
        searchSize() {
            if (this.searchSize.length !== 0) {
                let search = {
                    pidSn: "9|1",
                    name: 17 + "|" + this.searchSize
                };
                let searchStr = JSON.stringify(search);
                this.$http
                    .post(
                        "/TPA/aYscm/searchSize?status=1&&delStatus=0&search=" +
                            searchStr
                    )
                    .then(res => {
                        if (res.data.code === 0) {
                            this.sizeList = res.data.data.list;
                        } else {
                            error(res.data.msg);
                        }
                    })
                    .catch(err => {
                        NetworkAnomaly();
                    });
            } else {
                this.sizeList = [];
            }
        },
        searchColor() {
            if (this.searchColor.length !== 0) {
                let search = {
                    pidSn: "9|1",
                    name: 17 + "|" + this.searchColor
                };
                let searchStr = JSON.stringify(search);
                this.$http
                    .post(
                        "/TPA/aYscm/searchColor?status=1&&delStatus=0&search=" +
                            searchStr
                    )
                    .then(res => {
                        if (res.data.code === 0) {
                            this.colorList = res.data.data.list;
                        } else {
                            error(res.data.msg);
                        }
                    })
                    .catch(err => {
                        NetworkAnomaly();
                    });
            } else {
                this.colorList = [];
            }
        },
        searchYear() {
            this.getnavMenu();
        }
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
    font-size 1.6vh
.container>>>.el-table__empty-block
    min-height 3.5vh
.container>>>.el-dialog
    width 500px !important
    height 500px
    overflow-x hidden
.container>>>.el-dialog .el-table td
    padding 0    
.container>>>.el-dialog__body
    cursor pointer !important
    line-height 2.5vh
    font-weight bold
    padding 1vh 2vh
    li
        &:hover
            background #d2d2d2
        span
            width 50%
            float left
            padding-left 15%
            float left
            dispaly block
            line-height 3vh
            &.search
                width 33%
                padding-left 5%
.container>>>.el-select>.el-input
    display inline-block
.container>>> .el-date-editor.el-input
    width 60%
    font-size 1.4vh
.container>>> .el-input__icon
    height auto
</style>
