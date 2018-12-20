<template>
    <div class="container" :class="{container_collapse:collapse}">
        <!-- 页面标题 -->
        <p class="page_title">材料采购来货质检</p>
        <!-- 顶部操作按钮 -->
        <div class="btn-box">
            <button :class="{button_btn:!doAdd}" :disabled="doAdd">新增</button>
            <button :class="{button_btn:firstForm.sh == 0}" :disabled="(firstForm.sh == '-1' || firstForm.sh == 1)">修改</button>
            <button :class="{button_btn:!doCancel}" :disabled="doCancel">取消</button>
            <button :class="{button_btn:!doImport}" :disabled="doImport">导入</button>
            <button :class="{button_btn:!doImport}" :disabled="doImport">导出</button>
            <button class="button_btn">查询</button>
            <input type="text" class="doSearch" readonly placeholder="请选择">
            <button class="button_btn" @click="doOuts">退出</button>
            <button class="button_btn">刷新</button>
            <div class="btn_right">
                <button :disabled="(firstForm.sh==1||firstForm.sh=='-1'||firstForm.stopStatus==1||firstForm.closeStatus==1)" :class="{button_btn:firstForm.sh==0&&firstForm.stopStatus==0&&firstForm.closeStatus==0}">审核</button>
                <button :disabled="(firstForm.sh==0||firstForm.sh=='-1'||firstForm.stopStatus==1||firstForm.closeStatus==1)" :class="{button_btn:firstForm.sh==1&&firstForm.stopStatus==0&&firstForm.closeStatus==0}" >反审</button>

                <button :disabled="(firstForm.stopStatus==1||firstForm.stopStatus=='-1'||firstForm.closeStatus==1)" :class="{button_btn:firstForm.stopStatus==0&&firstForm.closeStatus==0}">终止</button>
                <button :disabled="(firstForm.stopStatus==0||firstForm.stopStatus=='-1'||firstForm.closeStatus==1)" :class="{button_btn:firstForm.stopStatus==1&&firstForm.closeStatus==0}" >启用</button>

                <button :disabled="(firstForm.closeStatus==1||firstForm.closeStatus=='-1'||firstForm.stopStatus==1)" :class="{button_btn:firstForm.closeStatus==0&&firstForm.stopStatus==0}">关单</button>
                <button :disabled="(firstForm.closeStatus==0||firstForm.closeStatus=='-1'||firstForm.stopStatus==1)" :class="{button_btn:firstForm.closeStatus==1&&firstForm.stopStatus==0}">开单</button>
            </div>
        </div>

        <div class="set_box">
            <!-- 左侧导航栏 -->
            <div class="menu_box">
                <el-menu unique-opened @select="menuSelected" background-color="#f2f2f2" text-color="#303133" active-text-color="#303133">
                    <!-- <nav-menu :navMenus="this.navMenus"></nav-menu> -->
                </el-menu>
            </div>   
            <div class="set_info">
                <div class="firstForm">
                    <ul class="clearfix">
                        <li>
                            <label>入库日期</label>
                            <el-date-picker :disabled="firstFormNo" v-model="firstForm.date" type="date" placeholder="必选" format="yyyy 年 MM 月 dd 日" value-format="yyyy-MM-dd"> </el-date-picker>
                        </li>  
                        <li class="gui">
                            <label>采购单号</label>
                            <input type="text" :disabled="firstFormNo" v-model="firstForm.orderSn" readonly  class="gui_inputs" placeholder="必选">
                            <button :disabled="firstFormNo" :class="{btn:!firstFormNo}" class="save">。。。</button> 
                        </li> 
                        <li class="gui">
                            <label>供应商</label>
                            <input type="text" v-model="firstForm.supplierSn" readonly disabled class="gui_num">
                            <input type="text" v-model="firstForm.supplierName" readonly disabled class="gui_input">
                        </li>     
                        <li class="gui">
                            <label>质检号</label>
                            <input type="text" :disabled="firstFormNo" v-model="firstForm.checkSn" readonly  class="gui_inputs" placeholder="必选">
                            <button :disabled="firstFormNo" :class="{btn:!firstFormNo}" class="save">。。。</button> 
                        </li> 
                        <li>
                            <label>类别</label>
                            <input type="text" :disabled="firstFormNo" v-model="firstForm.type" disabled readonly>
                        </li>                                             
                        <li>
                            <label>入库单号</label>
                            <input type="text" :disabled="firstFormNo" v-model="firstForm.sn" disabled readonly placeholder="自动生成">
                        </li>    
                        <li>
                            <label>仓库</label>
                            <el-select v-model="firstForm.repertory" :disabled="firstFormOn" placeholder="必选">
                                <el-option v-for="item in repertoryList" :key="item.name" :label="item.name" :value="item.name"> </el-option>
                            </el-select>
                        </li>     
                        <li>
                            <label>说明</label>
                            <el-input type="textarea" v-model="firstForm.remark" placeholder="最大200字符" maxlength="200" :disabled="firstFormOn" class="gui_input"></el-input>
                        </li>                                                                                    
                    </ul>    
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
            </ul>
            <el-pagination @current-change="currentPage" :current-page='page' v-if="pageOnOff" background :page-size="pageSize" :pager-count="5" :total="total">
            </el-pagination> -->
        </div>
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
import NavMenu from "./NavMenu";
import vagueSearch from "@/components/pageCommon/vagueSearch"; //模糊查询组件
export default {
    name: "cailiaocaigouzhijianruku",
    data() {
        return {
            //按钮disabled
            doAdd: false,
            doCancel: true,
            doImport: false,
            doEdit: true,
            
            //form的disabled
            firstFormNo: true,
            firstFormOn: true,
            firstFormGui: true,

            secondFormNo: true,
            secondFormOn: true,
            secondFormGui: true,

            navMenus:[],

            firstForm: {
                date:"",                //检验日期
                supplierSn:"",          //供应商编号
                supplierName:"",        //供应商名称
                orderSn:"",             //采购订单号
                repertory:"",           //仓库
                sn:"",                  //入库单号
                checkSn:"",             //检验单号
                type:"质检入库",                //类别
                remark:"",                  //说明

                sh:"-1",                    //审核
                stopStatus:"-1",            //终止
                closeStatus:"-1",           //关单
                addDate: "",                //编制日期
                addUser: "",                //编制人
                updateUser: "",             //修改用户
                updateDate: "",             //修改时间
                shUser: "",                 //审核人
                shDate: "",                 //审核日期                                                
            },   
            repertoryList:[],               //仓库列表 
            secondForm:{
                matSn:"",               //物料编号
                matName:"",             //物料名称

            },

            list: [], // 表格内容

            editVisible: false,             // 修改弹窗显示/隐藏
            idx: 0,    
            dialog:{},
            
            //分页：当前页码/总数量/每页显示条数
            page: 0,
            total: "",
            pageSize: 10,
            pageOnOff: false,
            //分页排序查询条件
            pageParams: {},    
            
            //导入弹出开关
            importbox: false,
            importZhe: false, //导入遮罩
            project: "", //错误文件名
            //上传的文件
            fileList: [],
            Tips: "", //错误提示
            tipOffON: false, //错误文件下载开关            
            
            

        };
    },
    methods:{
        //退出
        doOuts() {
            this.$emit("getOut", this.$route.name);
        },    


        //导航展开查询table
        menuSelected(index) {

            
        },
    },
    computed: {
        ...mapState(["collapse"])
    },
    // 引入组件
    components: {
        NavMenu,
        vagueSearch
    }
};
</script>

<style lang="stylus" scoped>
@import 'css/style.styl'
</style>