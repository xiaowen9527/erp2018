<template>
    <div class="container" :class="{container_collapse:collapse}">
        <p class="page_title">商品企划</p>
        <div class="btn-box">
            <button :disabled='doAdd' :class="{button_btn:!doAdd}" @click="doAdds">新增</button>
            <button :disabled='doCancel' :class="{button_btn:!doCancel}" @click="doCancels">取消</button>
            <button :disabled='doEdit' :class="{button_btn:!doEdit}" @click="doEdits">修改</button>
            <button :disabled='doDelete' :class="{button_btn:!doDelete}" @click="doDeletes">删除</button>
            <button class="button_btn" @click="doSearchs">查询</button>
            <input type="text" placeholder="请输入您要查询的企划单号" class="doSearch" v-model="search">
            <button class="button_btn" @click="doOuts">退出</button>
            <button class="button_btn" @click="refresh">刷新</button>
            <div class="btn_right">
                <button :disabled='doPrint' :class="{button_btn:!doPrint}" @click="doPrints">打印</button>
                <button :disabled='doImport' :class="{button_btn:!doImport}" @click="doImports">导入</button>
                <button :disabled='doImport' :class="{button_btn:!doImport}" @click="doExports">导出</button>
                <button :disabled='(firstForm.sh==1||firstForm.sh==-1)' :class="{button_btn:(firstForm.sh==0)}" @click="doExamines">审核</button>
                <button :disabled='(firstForm.sh==0||firstForm.sh==-1)' :class="{button_btn:(firstForm.sh==1)}" @click="doExamineAgains">反审</button>
                <button :disabled='(firstForm.sp==1||firstForm.sp==-1)' :class="{button_btn:(firstForm.sp==0)}" @click="doApprovals">审批</button>
                <button :disabled='(firstForm.sp==0||firstForm.sp==-1)' :class="{button_btn:(firstForm.sp==1)}" @click="doApprovalAgains">反审批</button>

            </div>
        </div>

        <div class="set_box">
            <div class="menu_box">
                <el-menu @select="menuSelected" @open="menuSelected" unique-opened background-color="#f2f2f2" text-color="#303133" active-text-color="#303133">
                    <nav-menu :navMenus="this.navMenus"></nav-menu>
                </el-menu>
                <el-select v-model="searchYear" placeholder="默认当前年份" class="searchYear">
                    <el-option v-for="item in this.searchYearList" :key="item.name" :label="item.name" :value="item.name">
                    </el-option>
                </el-select>            
            </div>

            <div class="set_info">
                <section class="firstForm">
                    <ul class="clearfix">
                        <li>
                            <label>单号</label>
                            <input type="text" disabled placeholder="自动生成" v-model="firstForm.sn">
                        </li>
                        <li>
                            <label class="name">业务日期</label>
                            <el-date-picker format="yyyy 年 MM 月 dd 日" value-format="yyyy-MM-dd" :disabled="firstFormOn" v-model="firstForm.date" type="date" placeholder="选择日期"> </el-date-picker>
                        </li>
                        <li>
                            <label>品牌</label>
                            <el-select :disabled="firstFormOn" v-model="firstForm.brand" placeholder="请选择">
                                <el-option v-for="item in this.brand" :key="item.name" :label="item.name" :value="item.name">
                                </el-option>
                            </el-select>
                        </li>
                        <li>
                            <label>年度</label>
                            <el-select :disabled="firstFormOn" v-model="firstForm.year" placeholder="请选择">
                                <el-option v-for="item in this.year" :key="item.name" :label="item.name" :value="item.name">
                                </el-option>
                            </el-select>
                        </li>
                        <li>
                            <label>季度</label>
                            <el-select :disabled="firstFormOn" v-model="firstForm.quarter" placeholder="请选择">
                                <el-option v-for="item in this.quarter" :key="item.name" :label="item.name" :value="item.name">
                                </el-option>
                            </el-select>
                        </li>
                        <li>
                            <label>渠道</label>
                            <el-select :disabled="firstFormOn" v-model="firstForm.channel" placeholder="请选择">
                                <el-option v-for="item in this.channel" :key="item.name" :label="item.name" :value="item.name">
                                </el-option>
                            </el-select>
                        </li>
                        <button :disabled="firstFormOn" :class="{btn:!firstFormOn}" @click="firstSave" class="save">保存</button>
                    </ul>
                </section>

                <section class="secondForm">
                    <ul>
                        <li class="category">
                            <label>品类</label>
                            <input type="text" :disabled="secondFormOn" class="category_num" readonly v-model="secondForm.lbch1Sn">
                            <input type="text" :disabled="secondFormOn" readonly v-model="secondForm.lbch1Name">
                            <input type="text" :disabled="secondFormOn" class="category_num" readonly v-model="secondForm.lbch2Sn">
                            <input type="text" :disabled="secondFormOn" readonly v-model="secondForm.lbch2Name">
                            <button :disabled="secondFormOn" :class="{btn:!secondFormOn}" @click="openCategory">。。。</button>
                        </li>
                        <li class="cloth">
                            <label>面料类别</label>
                            <input type="text" :disabled="secondFormOn" class="cloth_num" readonly v-model="secondForm.lbch3">
                            <input type="text" :disabled="secondFormOn" readonly v-model="secondForm.lbch3Name">
                            <button :disabled="secondFormOn" :class="{btn:!secondFormOn}" @click="openCloth">。。。</button>
                        </li>
                        <li class="old">
                            <label>年龄段</label>
                            <input type="text" :disabled="secondFormOn" v-model="secondForm.age">
                            <label class="old2">岁</label>
                        </li>
                        <li>
                            <label>性别</label>
                            <el-select :disabled="secondFormOn" v-model="secondForm.sex" placeholder="请选择">
                                <el-option v-for="item in this.sex" :key="item.name" :label="item.name" :value="item.name">
                                </el-option>
                            </el-select>
                        </li>
                        <li>
                            <label>人群</label>
                            <el-select :disabled="secondFormOn" v-model="secondForm.crowd" placeholder="请选择">
                                <el-option v-for="item in this.crowd" :key="item.name" :label="item.name" :value="item.name">
                                </el-option>
                            </el-select>
                        </li>   
                        <li class="yuan">
                            <label>价格区间</label>
                            <input type="text"  :disabled="secondFormOn" placeholder="请输入" v-model="secondForm.price">
                            <label class="yuan2">元</label>
                        </li>
                        <li class="boduan">
                            <label>预计上货时间</label>
                            <el-date-picker format="yyyy 年 MM 月 dd 日" value-format="yyyy-MM-dd" :disabled="secondFormOn" v-model="secondForm.loadTime" type="date" placeholder="选择日期"> </el-date-picker>
                        </li>
                        <li>
                            <label>款数</label>
                            <input type="number"  :disabled="secondFormOn" placeholder="请输入" v-model="secondForm.amount">
                        </li>                                                                                               
                            <button :disabled="secondFormOn" :class="{btn:!secondFormOn}" @click="secondSave" class="save">保存</button>                                                               
                    </ul>

                    <div class="order_table">
                        <el-table :data="list" border style="width: 100%" @sort-change='sortChange' :default-sort="{prop: 'master_sn', order: 'ascending'}">
                            <el-table-column prop="billSn" label="编号" min-width="9%" sortable='custom'>
                            </el-table-column>
                            <el-table-column prop="lbch2Name" label="产品类别" min-width="9%" sortable='custom'>
                            </el-table-column>
                            <el-table-column prop="lbch3" label="面料类别" min-width="9%" sortable='custom'>
                            </el-table-column>
                            <el-table-column prop="sex" label="性别" min-width="9%" sortable='custom'>
                            </el-table-column>
                            <el-table-column prop="crowd" label="人群" min-width="9%">
                            </el-table-column>
                            <el-table-column prop="price" label="价值区间" min-width="9%" sortable='custom'>
                            </el-table-column>
                            <el-table-column prop="age" label="年龄段" min-width="9%" sortable='custom'>
                            </el-table-column>
                            <el-table-column prop="loadTime" label="上货时间" min-width="9%" sortable='custom'>
                            </el-table-column>
                            <el-table-column prop="amount" label="款数" min-width="9%">
                            </el-table-column>
                            <el-table-column label="操作" min-width="19%">
                                <template slot-scope="scope">
                                    <el-button :disabled='(firstForm.sh==1||firstForm.sh==-1)' @click="handleEdit(scope.$index, scope.row)" :class="{btn:firstForm.sh==1}" type="text">修改</el-button>
                                    <el-button :disabled="(firstForm.sh==1||firstForm.sh==-1)" :class="{btn:firstForm.sh==1}" @click="tableDelete(scope.$index, scope.row)" type="text">删除</el-button>
                                </template>
                            </el-table-column>
                        </el-table>
                    </div>

                </section>
            </div>
        </div>

        <div class="pageBox">
            <ul class="pageData">
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
                <li>
                    <span>审批人：</span>
                    <span>{{this.firstForm.spUser}}</span>
                </li>
                <li>
                    <span>审批日期：</span>
                    <span>{{this.firstForm.spDate}}</span>
                </li>
            </ul>
            <el-pagination v-if="pageOnOff" background :page-size="pageSize" :pager-count="5" :total="total" @current-change="currentPage">
            </el-pagination>
        </div>

        <el-dialog title="品类" :visible.sync="oldCategory">
            <ul class="srcond_menu">
                <li v-if="category.length===0">暂无数据</li>
                <li v-for="(item,i) in category" :key="i">
                    <span>|--{{item.entity.name}}</span>
                    <div class="second" v-for="(items,i) in item.childs" :key="i">
                        <p @click="clickCategory(items)">|--{{items.entity.name}}</p>
                    </div>
                </li>
            </ul>
        </el-dialog>
        <el-dialog title="面料" :visible.sync="oldCloth">   
            <ul class="srcond_menu">
                <li v-if="cloth.length===0">暂无数据</li>
                <li v-for="(item,i) in cloth" :key="i">
                    <span>|--{{item.entity.name}}</span>
                    <div class="second" v-for="(items,i) in item.childs" :key="i">
                        <p @click="clickCloth(items)">|--{{items.entity.name}}</p>
                    </div>
                </li>
            </ul>
        </el-dialog>     

        <!-- 编辑弹出框 -->
        <el-dialog title="编辑" :visible.sync="editVisible" width="30%" class="edit">
            <el-form :model="dialog" label-width="100px">
                <el-form-item label="品类">
                            <input type="text"  class="category_inp" readonly v-model="dialog.lbch1Sn"  @click="openCategory">
                            <input type="text"  class="category_num"  readonly v-model="dialog.lbch1Name"  @click="openCategory">
                            <input type="text"  class="category_num" readonly v-model="dialog.lbch2Sn"  @click="openCategory">
                            <input type="text"  class="category_inp"  readonly v-model="dialog.lbch2Name"  @click="openCategory">
                            <button  class="btn" @click="openCategory">。。。</button>
                </el-form-item>
                <el-form-item label="面料">
                            <input type="text"  class="cloth_num" readonly v-model="dialog.lbch3" @click="openCloth">
                            <input type="text"  class="cloth_inp"  readonly v-model="dialog.lbch3Name" @click="openCloth">
                            <button  class="btn" @click="openCloth">。。。</button>
                </el-form-item>
                <el-form-item label="性别">
                            <el-select  v-model="dialog.sex" placeholder="请选择">
                                <el-option v-for="item in this.sex" :key="item.name" :label="item.name" :value="item.name">
                                </el-option>
                            </el-select>
                </el-form-item>
                <el-form-item label="人群">
                            <el-select  v-model="dialog.crowd" placeholder="请选择">
                                <el-option v-for="item in this.crowd" :key="item.name" :label="item.name" :value="item.name">
                                </el-option>
                            </el-select>
                </el-form-item>
                <el-form-item label="价值区间">
                    <input type="text" placeholder="请输入" v-model="dialog.price">
                </el-form-item>
                <el-form-item label="年龄段">
                    <input type="text" placeholder="请输入" v-model="dialog.age">
                </el-form-item>
                <el-form-item label="上货时间">
                    <el-date-picker format="yyyy 年 MM 月 dd 日" value-format="yyyy-MM-dd" v-model="dialog.loadTime" type="date" placeholder="选择日期"> </el-date-picker>
                </el-form-item>
                <el-form-item label="款数">
                    <input type="text" placeholder="请输入" v-model="dialog.amount">
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="editVisible = false">取 消</el-button>
                <el-button type="primary" @click="saveEdit">确 定</el-button>
            </span>
        </el-dialog>           

        <!-- 导入弹窗 -->
        <el-dialog class="importExport" title="导入" :visible.sync="importbox" width="30%" :showClose="false" :show-file-list="false">
            <a class="down" href="/TPA/cSpqh/downExcel">下载导入模板</a>
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
        <!-- 下载错误文件 -->
        <el-dialog title="错误提示" :visible.sync="tipOffON">
            <ul class="srcond_menu">
                <li>
                    <el-alert :title="Tips" type="error"></el-alert>
                    <span style="margin-top:5vh">是否下载错误提示文件</span>
                </li>
                <span slot="footer" class="dialog-footer">
                    <el-button @click="tipOffON = importbox = false">取 消</el-button>
                    <el-button type="primary" @click="importErr">下载</el-button>
                </span>
            </ul>
        </el-dialog>      


    </div>
</template>

<script>
import "@/assets/js/import.js"; //导入请求超时拦截
import { mapState } from "vuex";
import {
    NetworkAnomaly,
    abnormal,
    succ,
    error,
    getOut
} from "../../../assets/js/message.js";
import NavMenu from "./NavMenu";
import qs from "qs";
export default {
    name: "shangpinqihua",
    data() {
        return {
            //按钮disabled
            doAdd: false,
            doCancel: true,
            doEdit: true,
            doDelete: true,
            doImport: false,
            doPrint:true,

            //form的disabled
            firstFormNo: true,
            firstFormOn: true,
            firstFormGui: true,
            secondFormNo: true,
            secondFormOn: true,
            secondFormGui: true,

            //bind值
            search: "", //查询
            navMenus: [], //导航数据
            searchYear:"",          //当前当行的年份
            searchYearList:[],      //导航年份数组

            oldCategory: false,
            oldCloth:false,
            addEdit: true, //新增修改开关

            firstForm: {
                sn: "", //单号
                date: "", //日期
                brand: "", //品牌名称
                brandSn: "", //品牌编号
                year: "", //年度
                yearSn:"",
                quarter: "", //季度
                quarterSn: "", //季度编号
                channel: "", //渠道
                channelSn: "", //渠道编号
                sh: "-1", //审核
                sp: "-1", //审批
                addUser: "",
                addDate: "",
                updateUser: "",
                updateDate: "",
                shUser: "",
                shDate: "",
                spUser: "",
                spDate: "",
            },
            secondForm: {
                masterId: "", //主表的id
                lbch1Sn: "", //一级品类编号
                lbch1Name: "", //一级品类名称
                lbch2Sn: "", //二级品类编号
                lbch2Name: "", //二级品类名称
                sex: "", //性别
                sexSn:"",
                lbch3: "", //面料类别编号
                lbch3Name: "", //面料类别名称
                crowd: "", //人群类别
                crowdSn: "", //人群类别编号
                price: "", //价格区间
                age: "", //年龄段
                loadTime: "", //上货时间
                amount: "" //款数
            },

            //下拉数据
            year: [], //年度
            channel: [], //渠道
            quarter: [], //季度
            brand: [], //品牌
            sex: [], //性别
            crowd: [], //人群

            category: [], //品类
            cloth: [], //面料

            list: [],
            printList: [],

            //编辑弹窗开关
            editVisible: false,
            idx: 0,
            //编辑弹出框数据
            dialog: {},

            //分页：当前页码/总数量/每页显示条数
            page: 0,
            total: "",
            pageSize: 10,
            pageOnOff: false,
            //分页排序查询条件
            pageParams: {
                orderBy: "bill_sn asc"
            },

           //导入弹出开关
            importbox: false,
            importZhe: false, //导入遮罩
            isCover:false,      //默认导入不覆盖
            project:"",         //错误文件名
            //上传的文件
            fileList: [],
            Tips:"",               //错误提示
            tipOffON: false,        //错误文件下载开关       
        };
    },
    methods: {
        //按钮初始化
        emptyBtn() {
            this.doAdd = false;
            this.doCancel = true;
            this.doEdit = true;
            this.doDelete = true;
            this.doImport = false;
            this.doPrint = true;
        },
        //按钮按下状态
        emptyBtnTo() {
            this.doAdd = true;
            this.doCancel = false;
            this.doEdit = true;
            this.doDelete = true;
            this.doImport = true;
        },
        //表单1恢复初始空值状态
        emptyFirstForm() {
            this.firstForm = {
                sn: "", //单号
                date: "", //日期
                brand: "", //品牌名称
                brandSn: "", //品牌编号
                year: "", //年度
                yearSn:"",
                quarter: "", //季度
                quarterSn: "", //季度编号
                channel: "", //渠道
                channelSn: "", //渠道编号
                sh: "-1", //审核
                sp: "-1", //审批
                updateUser: "",
                updateDate: "",
                shUser: "",
                shDate: "",
                spUser: "",
                spDate: "",                
            };
        },
        //表单2恢复初始空值状态
        emptySecondForm() {
            this.secondForm = {
                masterId: "", //主表的id
                lbch1Sn: "", //一级品类编号
                lbch1Name: "", //一级品类名称
                lbch2Sn: "", //二级品类编号
                lbch2Name: "", //二级品类名称
                sex: "", //性别
                sexSn:"",
                lbch3: "", //面料类别编号
                lbch3Name: "", //面料类别名称
                crowd: "", //人群类别
                crowdSn: "", //人群类别编号
                price: "", //价格区间
                age: "", //年龄段
                loadTime: "", //上货时间
                amount: "" //款数
            }
        },
        //禁用表单first
        disabledFirstForm() {
            this.firstFormNo = true;
            this.firstFormOn = true;
            this.firstFormOnGui = true;
        },
        //禁用表单Second
        disabledSecondForm() {
            this.secondFormNo = true;
            this.secondFormOn = true;
            this.secondFormGui = true;
        },
        //开放表单first
        noDisabledFirstForm() {
            this.firstFormNo = true;
            this.firstFormOn = false;
            this.firstFormGui = false;
        },
        //开放表单Second
        noDisabledSecondForm() {
            this.secondFormNo = false;
            this.secondFormOn = false;
            this.secondFormGui = false;
        },

        //新增
        doAdds() {
            let year = this.year
            this.doCancels();
            this.year = year
            this.noDisabledFirstForm();
            


            this.getBrand();
            this.getQuarter();
            this.getChannel();

            this.doCancel = false;
            this.addEdit = true
            this.doAdd = true

        },
        //取消
        doCancels() {
            this.emptyBtn();
            this.emptyFirstForm();
            this.emptySecondForm();
            this.disabledFirstForm();
            this.disabledSecondForm();

            this.doPrint = true;
            this.pageOnOff = false;

            this.year = []; //年度
            this.channel = []; //渠道
            this.quarter = []; //季度
            this.brand = []; //品牌
            this.sex = []; //性别
            this.crowd = []; //人群

            this.list = [];
            this.printList = [];

            this.search = ""
        },
        //修改
        doEdits() {
            this.emptyBtnTo()
            this.doAdd = false
            this.doCancel = false
            this.addEdit = false
            this.noDisabledFirstForm()
            this.disabledSecondForm()  
            this.emptySecondForm() 

            this.getYear();
            this.getBrand();
            this.getQuarter();
            this.getChannel();
        },
        //删除
        doDeletes() {
            this.$http.post('/TPA/cSpqh/delete?id='+this.firstForm.id)
                .then(res=>{
                    if(res.data.code===0){
                        succ(res.data.msg)
                        this.doCancels()
                        this.getnavMenu()
                    }else{
                        error(res.data.msg)
                    }
                })
                .catch(err=>{
                     NetworkAnomaly();
                })
        },
        //first保存
        firstSave() {
            console.log(this.addEdit)
            if(this.addEdit){
                this.firstForm.brandSn = this.getSn(
                    this.brand,
                    this.firstForm.brand
                );             
                this.firstForm.quarterSn = this.getSn(
                    this.quarter,
                    this.firstForm.quarter
                );             
                this.firstForm.channelSn = this.getSn(
                    this.channel,
                    this.firstForm.channel
                ); 
                this.firstForm.yearSn = this.getSn(
                    this.year,
                    this.firstForm.year
                ); 
                let terms = this.firstForm.date.length===0||this.firstForm.brand.length===0||this.firstForm.brandSn.length===0||        this.firstForm.year.length===0||this.firstForm.quarter.length===0||this.firstForm.channel.length===0
                if(terms){
                    error('所有的表单项不能为空！')
                }else{
                    this.$http
                        .post("/TPA/cSpqh/insert", qs.stringify(this.firstForm))
                        .then(res => {
                            if (res.data.code === 0) {
                                succ(res.data.msg)
                                this.emptyBtnTo();
                                this.doDelete = false;
                                this.doEdit = false;
                                this.doAdd = false;  
                                this.getnavMenu()           

                                this.firstForm = res.data.data;
                                this.secondForm.masterId = this.firstForm.id
                                this.disabledFirstForm();
                                this.noDisabledSecondForm();

                                this.getCategory()
                                this.getCloth()
                                this.getSex()
                                this.getCrowd()
                            }else{
                                error(res.data.msg)
                            }
                        })
                        .catch(err=>{
                            NetworkAnomaly();
                        })
                }     
            }else{
                this.$http.post('/TPA/cSpqh/update',qs.stringify(this.firstForm))
                    .then(res => {
                        if (res.data.code === 0) {
                            this.emptyBtnTo();
                            this.doDelete = false;
                            this.doEdit = false;
                            this.doAdd = false;  
                            this.getnavMenu()           

                            this.firstForm = res.data.data;
                            this.secondForm.masterId = this.firstForm.id
                            this.disabledFirstForm();
                            this.noDisabledSecondForm();

                            this.getCategory()
                            this.getCloth()
                            this.getSex()
                            this.getCrowd()
                        }else{
                            error(res.data.msg)
                        }
                    })
                    .catch(err=>{
                        NetworkAnomaly();
                    })   
            }
    
            
        },
        //secondSave保存
        secondSave() {
            this.secondForm.crowdSn = this.getSn(
                this.crowd,
                this.secondForm.crowd
            );    
            this.secondForm.sexSn = this.getSn(
                this.sex,
                this.secondForm.sex
            );    
            let terms = this.secondForm.masterId.length===0||this.secondForm.lbch1Sn.length===0 ||this.secondForm.lbch1Name.length===0 ||this.secondForm.lbch2Sn.length===0 ||this.secondForm.lbch2Name.length===0 ||this.secondForm.sex.length===0 ||this.secondForm.lbch3.length===0 ||this.secondForm.lbch3Name.length===0 ||this.secondForm.crowd.length===0||this.secondForm.crowdSn.length===0||this.secondForm.price.length===0||this.secondForm.age.length===0||this.secondForm.loadTime.length===0 ||this.secondForm.amount.length===0    
            if(terms){
                error('所有的表单项不能为空！')
            }else{
                this.$http.post('/TPA/cSpqhA/insert',qs.stringify(this.secondForm))
                    .then(res=>{
                        console.log(res)
                        if(res.data.code===0){
                            succ(res.data.msg)
                            this.getnavMenu()
                            let masterId = this.secondForm.masterId
                            this.emptySecondForm()
                            this.secondForm.masterId = masterId
                            this.pageOnOff = false;

                            //查询表格数据
                            let params = {
                                masterSn: this.firstForm.sn,
                                orderBy: "age asc",
                                page: 0,
                                count: this.pageSize
                            };
                            this.pageParams = params;
                            this.getPageData();                          
                        }else{
                            error(res.data.msg)
                        }
                    })
                    .catch(err=>{
                        NetworkAnomaly();
                    })
            } 
        },
        //查询
        doSearchs() {
            if(this.search.length===0){
                error('请输入查询单号')
            }else{
                this.$http.post('/TPA/cSpqh/getBy?sn='+this.search)
                    .then(res=>{
                        if(res.data.code===0){
                            this.firstForm = res.data.data[0]
                            this.emptyBtnTo();
                            this.doDelete = false;
                            this.doEdit = false;
                            this.doAdd = false; 
                            this.pageOnOff = false;

                            //查询表格数据
                            let params = {
                                masterSn: this.firstForm.sn,
                                orderBy: "bill_sn asc",
                                page: 0,
                                count: this.pageSize
                            };
                            this.pageParams = params;
                            this.getPageData();                             
                        }else{
                            error(res.data.msg)
                        }
                    })
                    .catch(err=>{
                        NetworkAnomaly();
                    })
            }
        },
        //退出
        doOuts() {
            this.$emit("getOut", this.$route.name);
        },
        //刷新
        refresh() {
            this.getDateYear() 
            this.doCancels();
            succ("刷新成功");
        },
        //打印
        doPrints() {
            let params = {
                masterSn: this.firstForm.sn,
                orderBy: "age asc",
            };
            this.$http
                .post(
                    "/TPA/cSpqhA/search?delStatus=0",
                    qs.stringify(params)
                )
                .then(res => {
                    console.log(res)
                    if (res.data.code === 0) {
                        this.printList = res.data.data.list;
                        localStorage.setItem("pageTit", JSON.stringify(this.firstForm));
                        localStorage.setItem("printList", JSON.stringify(this.printList));
                    } else {
                        error(res.data.msg);
                    }
                })
                .catch(err => {
                    NetworkAnomaly();
                });
            // localStorage.setItem("pageTit", JSON.stringify(this.firstForm));

            window.open("/erp/#/shangpinqihuaPrint");
            this.printList = []
        },
        //审核
        doExamines() {
            this.$http.post('/TPA/cSpqh/auditing?status=1&id='+this.firstForm.id)
                .then(res=>{
                    if(res.data.code===0){
                        succ(res.data.msg)
                        this.firstForm = res.data.data
                    }else{
                        error(res.data.msg)
                    }
                })
                .catch(err=>{
                    NetworkAnomaly();
                })
        },
        //反审
        doExamineAgains() {
            this.$http.post('/TPA/cSpqh/auditing?status=0&id='+this.firstForm.id)
                .then(res=>{
                    if(res.data.code===0){
                        succ(res.data.msg)
                        this.firstForm = res.data.data
                    }else{
                        error(res.data.msg)
                    }
                })
                .catch(err=>{
                    NetworkAnomaly();
                })
        },
        //审批
        doApprovals() {
            this.$http.post('/TPA/cSpqh/approve?status=1&id='+this.firstForm.id)
                .then(res=>{
                    if(res.data.code===0){
                        succ(res.data.msg)
                        this.firstForm = res.data.data
                    }else{
                        error(res.data.msg)
                    }
                })
                .catch(err=>{
                    NetworkAnomaly();
                })
        },
        //反审批
        doApprovalAgains() {
            this.$http.post('/TPA/cSpqh/approve?status=0&id='+this.firstForm.id)
                .then(res=>{
                    if(res.data.code===0){
                        succ(res.data.msg)
                        this.firstForm = res.data.data
                    }else{
                        error(res.data.msg)
                    }
                })
                .catch(err=>{
                    NetworkAnomaly();
                })
        },


        //导入按纽
        doImports() {
            this.importbox = true;
        },
        //导入取消
        importCancel() {
            this.emptyBtn();
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
                    .post("/TPA/cSpqh/importExcel", formData)
                    .then(res => {
                        console.log(res);
                        if (res.status === 200) {
                            if (res.data.code === 0) {
                                succ(res.data.msg);
                                this.getnavMenu();
                                this.importCancel();
                                this.$refs.upload.clearFiles();
                            }else if(res.data.code === 100){
                                this.tipOffON = true;
                                this.project = res.data.attachment.name
                                this.Tips = res.data.msg
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
        //下载错误文件按钮
        importErr() {
            let errUrl = '/TPA/aImportExcel/exportMsg?name=' + this.project
            // console.log(errUrl)
            window.location.href = errUrl;
            setTimeout(()=>{
                this.tipOffON = false;
                this.importCancel();
            },500)
        },        
        //导出
        doExports() {
            window.location.href = "/TPA/cSpqh/exportExcel";
        },     



        //获取下拉函数
        //品牌
        getBrand() {
            this.$http
                .post("/TPA/aLbJb/getBySn?sn=003")
                .then(res => {
                    if (res.data.code === 0) {
                        this.brand = res.data.data;
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
                        this.year = res.data.data;
                        this.searchYearList = res.data.data
                    } else {
                        error(res.data.msg);
                    }
                })
                .catch(err => {
                    NetworkAnomaly();
                });
        },
        //季度
        getQuarter() {
            this.$http
                .post("/TPA/aLbJb/getBySn?sn=002")
                .then(res => {
                    if (res.data.code === 0) {
                        this.quarter = res.data.data;
                    } else {
                        error(res.data.msg);
                    }
                })
                .catch(err => {
                    NetworkAnomaly();
                });
        },
        //渠道
        getChannel() {
            this.$http
                .post("/TPA/aLbJb/getBySn?sn=022")
                .then(res => {
                    if (res.data.code === 0) {
                        this.channel = res.data.data;
                    } else {
                        error(res.data.msg);
                    }
                })
                .catch(err => {
                    NetworkAnomaly();
                });
        },
        //性别
        getSex() {
            this.$http
                .post("/TPA/aLbJb/getBySn?sn=004")
                .then(res => {
                    if (res.data.code === 0) {
                        this.sex = res.data.data;
                    } else {
                        error(res.data.msg);
                    }
                })
                .catch(err => {
                    NetworkAnomaly();
                });
        },
        //人群
        getCrowd() {
            this.$http
                .post("/TPA/aLbJb/getBySn?sn=021")
                .then(res => {
                    if (res.data.code === 0) {
                        this.crowd = res.data.data;
                    } else {
                        error(res.data.msg);
                    }
                })
                .catch(err => {
                    NetworkAnomaly();
                });
        },
        //获取品类
        getCategory() {
            this.$http
                .post("/TPA/aLbCh/stock")
                .then(res => {
                    if (res.data.code === 0) {
                        this.category = res.data.data.childs;
                    } else {
                        error(res.data.msg);
                    }
                })
                .catch(err => {
                    NetworkAnomaly();
                });
        },
        //获取面料
        getCloth() {
            this.$http
                .post("/TPA/cWlda/tree?pidSn=2-1")
                .then(res => {
                    if (res.data.code === 0) {
                        this.cloth = res.data.data.childs;
                    } else {
                        error(res.data.msg);
                    }
                })
                .catch(err => {
                    NetworkAnomaly();
                });
        },
        //获取编号
        getSn(data1, data2) {
            let arr = [];
            let sn;
            for (let i = 0; i < data1.length; i++) {
                arr.push(data1[i].name);
            }
            for (let j = 0; j < arr.length; j++) {
                if (arr[j] == data2) {
                    sn = data1[j].sn;
                }
            }
            return sn;
        },
        //品类弹窗
        openCategory(){
            this.oldCategory = true
        },
        //选择品类
        clickCategory(item){
            if(this.editVisible){
                this.dialog.lbch1Sn = item.entity.pidSn
                this.dialog.lbch1Name = item.entity.pidName
                this.dialog.lbch2Sn = item.entity.sn
                this.dialog.lbch2Name = item.entity.name
            }else{
                this.secondForm.lbch1Sn = item.entity.pidSn
                this.secondForm.lbch1Name = item.entity.pidName
                this.secondForm.lbch2Sn = item.entity.sn
                this.secondForm.lbch2Name = item.entity.name
            }
           this.oldCategory = false
        },
        //面料弹窗
        openCloth(){
            this.oldCloth = true
        },
        clickCloth(item){
            if(this.editVisible){
                this.dialog.lbch3 = item.entity.sn
                this.dialog.lbch3Name = item.entity.name
            }else{
                this.secondForm.lbch3 = item.entity.sn
                this.secondForm.lbch3Name = item.entity.name
            }
            
            this.oldCloth = false
        },

        //获取nav
        getnavMenu() {
            this.$http
                .post("/TPA/cSpqh/tree?year="+this.searchYear)
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
        //点击菜单导航
        menuSelected(index) {
            
            let data = index.split(",");
            if(data[1].length<10){
                this.$http.post('/TPA/cSpqh/get?id='+data[1])
                    .then(res=>{
                        if(res.data.code===0){
                            this.emptyBtnTo()
                            this.doAdd = false
                            this.doEdit = false
                            this.doDelete = false
                            this.emptySecondForm()

                            this.pageOnOff = false;
                            this.firstForm = res.data.data
                            this.disabledFirstForm()
                            this.noDisabledSecondForm()
                            this.secondForm.masterId = this.firstForm.id
                            this.getCategory()
                            this.getCloth()
                            this.getSex()
                            this.getCrowd()   
                            
                            
                            //查询表格数据
                            if (this.pageParams.orderBy.length === 0) {
                                let params = {
                                    masterSn: this.firstForm.sn,
                                    orderBy: "bill_sn asc",
                                    page: 0,
                                    count: this.pageSize
                                };
                                this.pageParams = params;
                            } else {
                                this.pageParams.masterSn = this.firstForm.sn;
                                this.pageParams.page = 0;
                                this.pageParams.count = this.pageSize;
                            }
                            this.getPageData();                   
                        }else if(res.data.code===1&&res.data.msg=="获取失败"){
                            
                        }else{
                            error(res.data.msg)
                        }
                    })
                    .catch(err => {
                        NetworkAnomaly();
                    });
            }
        },
        //获取分页数据
        getPageData() {
            this.$http
                .post(
                    "/TPA/cSpqhA/search?delStatus=0",
                    qs.stringify(this.pageParams)
                )
                .then(res => {
                    if (res.data.code === 0) {
                        console.log(res)
                        this.doPrint = false
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
                });
        },    
        //获取当前页码
        currentPage(val) {
            this.page = val;
        },            
        //排序
        sortChange(column){
            console.log(column.prop,column.order)
            if (this.pageParams.orderBy.length !== 0) {
                if(column.prop == "billSn" && column.order == "descending"){
                    this.pageParams.orderBy = "bill_sn desc";
                }else if(column.prop == "billSn" && column.order == "ascending"){
                    this.pageParams.orderBy = "bill_sn asc";
                }else if(column.prop == "age" && column.order == "descending"){
                    this.pageParams.orderBy = "age desc";
                }else if(column.prop == "age" && column.order == "ascending"){
                    this.pageParams.orderBy = "age asc";
                }else if(column.prop == "price" && column.order == "descending"){
                     this.pageParams.orderBy = "price desc";
                }else if(column.prop == "price" && column.order == "ascending"){
                    this.pageParams.orderBy = "price asc";
                }else if(column.prop == "loadTime" && column.order == "descending"){
                     this.pageParams.orderBy = "loadTime desc";
                }else if(column.prop == "loadTime" && column.order == "ascending"){
                    this.pageParams.orderBy = "loadTime asc";
                }else if(column.prop == "sex" && column.order == "descending"){
                     this.pageParams.orderBy = "sex desc";
                }else if(column.prop == "sex" && column.order == "ascending"){
                    this.pageParams.orderBy = "sex asc";
                }else if(column.prop == "lbch3" && column.order == "descending"){
                     this.pageParams.orderBy = "lbch3 desc";
                }else if(column.prop == "lbch3" && column.order == "ascending"){
                    this.pageParams.orderBy = "lbch3 asc";
                }else if(column.prop == "lbch2Name" && column.order == "descending"){
                     this.pageParams.orderBy = "lbch2_name desc";
                }else if(column.prop == "lbch2Name" && column.order == "ascending"){
                    this.pageParams.orderBy = "lbch2_name asc";
                }else{
                    this.pageParams.orderBy = "bill_sn asc";
                }
                if (this.list.length !== 0) {
                    this.getPageData();
                }
            }            
        },
        //编辑单条数据
        handleEdit(index, row) {
            this.idx = index;
            const item = this.list[index];
            this.dialog = {
                id: item.id, //id
                lbch1Sn:item.lbch1Sn,
                lbch1Name:item.lbch1Name,
                lbch2Sn:item.lbch2Sn,
                lbch2Name:item.lbch2Name,
                sex:item.sex,
                lbch3:item.lbch3,
                lbch3Name:item.lbch3Name,
                crowd:item.crowd,
                crowdSn:item.crowdSn,
                price:item.price,
                age:item.age,
                loadTime:item.loadTime,
                amount:item.amount
            },
            this.editVisible = true;
            console.log(item);
        },
        // 保存编辑
        saveEdit() {
            this.$http.post('/TPA/cSpqhA/update',qs.stringify(this.dialog))
                .then(res=>{
                    if(res.data.code===0){
                        this.$set(this.list, this.idx, this.dialog);
                        this.editVisible = false;
                        succ(res.data.msg);
                        this.getPageData();
                    }else{
                        error(res.data.msg);
                    }
                })
                .catch(err=>{
                    NetworkAnomaly();
                })
        }, 
        //删除表格的单条数据
        tableDelete(index, row) {
            this.idx = index;
            const item = this.list[index];
            console.log(item);
            this.$http
                .post("/TPA/cSpqhA/delete?id=" + item.id)
                .then(res => {
                    if (res.data.code === 0) {
                        succ(res.data.msg);
                        this.getPageData();
                    } else {
                        error(res.data.msg);
                    }
                })
                .catch(err => {
                    NetworkAnomaly();
                });
        }, 
        //获取当前的年
        getDateYear(){
            var myDate = new Date()
            let year = myDate.getFullYear()
            this.searchYear = year
        },                              
    },
    mounted() {
        this.getYear();
        this.getDateYear()        
        this.getnavMenu();
    },
    watch: {
        page() {
            if(this.page!==0){this.pageParams.page = this.page - 1;}
            this.getPageData();
        }, 
        searchYear(){
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
    height 4vh
    line-height 4vh
    text-align center
    font-size 1.6vh
.container>>>.el-table__empty-block
    min-height 3.5vh
.container>>>.el-dialog
    width 500px !important
    height 500px
    overflow-x hidden
.container>>>.el-dialog__body
    cursor pointer !important
    line-height 2.5vh
    font-weight bold
    padding 1vh 2vh
    
.container>>>.el-select>.el-input
    display: inline-block;
.container>>> .el-input__inner
    width 100% !important
    font-size 1.6vh
    height 3.5vh !important
    padding-left 3vh !important
    border-radius:0
.container>>> .el-date-editor.el-input
    width 60%
    font-size 1.4vh
.container>>> .el-input__icon
    height auto
    line-height 3.5vh
.order_table
    width 99%
    margin 5px auto 0
    max-height 45vh
    border 0.1vh solid #d9d9d9
    overflow hidden
    .el-button
        padding .6vh 2vh
        margin-top 0.4vh
        border 0.1vh solid #409eff
        color #409eff
        &.btn
            border 0.1vh solid #d2d2d2
            color #d2d2d2    
</style>
