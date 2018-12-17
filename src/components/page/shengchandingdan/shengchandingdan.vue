<template>
    <div class="container" :class="{container_collapse:collapse}">
        <!-- 页面标题 -->
        <p class="page_title">生产订单</p>
        <!-- 顶部操作按钮 -->
        <div class="btn-box">
            <button :class="{button_btn:!doAdd}" :disabled="doAdd" @click="doAdds">新增</button>
            <button :class="{button_btn:firstForm.sh == 0}" :disabled="(firstForm.sh == '-1' || firstForm.sh == 1)" @click="doEdits">修改</button>
            <button :class="{button_btn:!doCancel}" :disabled="doCancel" @click="doCancels">取消</button>
            <button :class="{button_btn:!doDelete}" :disabled="doDelete" @click="doDeletes" >删除</button>
            <!-- <button :class="{button_btn:!doImport}" :disabled="doImport" @click="doImports">导入</button> -->
            <button :class="{button_btn:!doImport}" :disabled="doImport" @click="doExports">导出</button>
            <button class="button_btn" @click="handleSearch">查询</button>
            <input type="text" class="doSearch" readonly placeholder="请选择" @click="handleSearch">
            <button class="button_btn" @click="doOuts">退出</button>
            <button class="button_btn" @click="refresh">刷新</button>
            <div class="btn_right">
                <button :disabled="(firstForm.sh==1||firstForm.sh=='-1'||firstForm.stopStatus==1||firstForm.closeStatus==1)" :class="{button_btn:firstForm.sh==0&&firstForm.stopStatus==0&&firstForm.closeStatus==0}" @click="doExamines">审核</button>
                <button :disabled="(firstForm.sh==0||firstForm.sh=='-1'||firstForm.stopStatus==1||firstForm.closeStatus==1)" :class="{button_btn:firstForm.sh==1&&firstForm.stopStatus==0&&firstForm.closeStatus==0}" @click="doExamineAgains">反审</button>

                <button :disabled="(firstForm.stopStatus==1||firstForm.stopStatus=='-1'||firstForm.closeStatus==1)" :class="{button_btn:firstForm.stopStatus==0&&firstForm.closeStatus==0}" @click="stop">终止</button>
                <button :disabled="(firstForm.stopStatus==0||firstForm.stopStatus=='-1'||firstForm.closeStatus==1)" :class="{button_btn:firstForm.stopStatus==1&&firstForm.closeStatus==0}" @click="stopBack">启用</button>

                <button :disabled="(firstForm.closeStatus==1||firstForm.closeStatus=='-1'||firstForm.stopStatus==1)" :class="{button_btn:firstForm.closeStatus==0&&firstForm.stopStatus==0}" @click="close">关单</button>
                <button :disabled="(firstForm.closeStatus==0||firstForm.closeStatus=='-1'||firstForm.stopStatus==1)" :class="{button_btn:firstForm.closeStatus==1&&firstForm.stopStatus==0}" @click="closeBack">开单</button>
            </div>
        </div>

        <div class="set_box">
            <!-- 左侧导航栏 -->
            <div class="menu_box">
                <el-menu unique-opened @select="menuSelected" background-color="#f2f2f2" text-color="#303133" active-text-color="#303133">
                    <nav-menu :navMenus="this.navMenus"></nav-menu>
                </el-menu>
            </div>

            <div class="set_info">
                <div class="firstForm">
                    <ul class="clearfix">
                        <li class="gui">
                            <label>销售单号</label>
                            <input type="text" placeholder="必选" v-model="firstForm.sellSn" readonly :disabled="firstFormGui" @click="handleSellSn">
                            <button :disabled="firstFormGui" :class="{btn:!firstFormGui}" @click="handleSellSn">查询</button>
                        </li>
                        <li class="gui">
                            <label>客户</label>
                            <input type="text" v-model="firstForm.clientSn" readonly disabled class="gui_num">
                            <input type="text" v-model="firstForm.clientName" readonly disabled class="gui_input">
                        </li>

                        <li class="date">
                            <label>交货日期</label>
                            <input type="text" v-model="firstForm.deliveryDate" readonly disabled class="gui_input">
                        </li>
                        <li>
                            <label>仓库</label>
                            <input type="text" v-model="firstForm.repertory" readonly disabled class="gui_input">
                        </li>
                        <li>
                            <label>生产单号</label>
                            <input type="text" v-model="firstForm.sn" readonly disabled placeholder="自动生成">
                        </li>
                        <li>
                            <label>品牌</label>
                            <input type="text" v-model="firstForm.brand" readonly disabled class="gui_input">
                        </li>                        
                        <li class="date">
                            <label>订单日期</label>
                            <el-date-picker :disabled="firstFormNo" v-model="firstForm.date" type="date" placeholder="必选" format="yyyy 年 MM 月 dd 日" value-format="yyyy-MM-dd"> </el-date-picker>
                        </li>                      
                        <li class="date">
                            <label>入库日期</label>
                            <el-date-picker :disabled="firstFormNo" v-model="firstForm.inDate" type="date" placeholder="必选" format="yyyy 年 MM 月 dd 日" value-format="yyyy-MM-dd"> </el-date-picker>
                        </li>

                        <li>
                            <label>生产单位</label>
                            <el-select class="size" v-model="firstForm.productUnit" :disabled="firstFormOn" placeholder="必选">
                                <el-option v-for="item in productUnit" :key="item.name" :label="item.name" :value="item.name"> </el-option>
                            </el-select>
                        </li>
                        <li>
                            <label>备注</label>
                            <el-input type="textarea" v-model="firstForm.remark" placeholder="最大200字符" maxlength="200" :disabled="firstFormOn" class="gui_input"></el-input>
                        </li>
                        <li>
                            <label>来源单号</label>
                            <input type="text" v-model="firstForm.originSn" :disabled="firstFormNo" class="gui_input">
                        </li>
                        <button :disabled="firstFormOn" :class="{btn:!firstFormOn}" class="save" @click="firstFormSave">保存</button>                                               
                    </ul>
                    <div class="psn">
                        <ul class="clearfix">
                            <li>
                                <label>款号</label>
                                <input type="text" placeholder="请点击选择款号" v-model="secondForm.psn" readonly :disabled="secondFormGui" @click="handlePsn">
                            </li>
                            <button :disabled="secondFormOn" :class="{btn:!secondFormOn}" class="save" @click="openSaves">新增</button>
                            <button :disabled="secondFormNo" :class="{btn:!secondFormNo}" class="save" @click="secondImport">导入</button>
                        </ul>
                    </div>                    
                </div>

                <!-- 表格内容 -->
                <div class="order_table">
                    <el-table :data="list" stripe style="width: 100%" index @cell-dblclick="tableDbclick" :span-method="objectSpanMethod">
                        <el-table-column prop="lbch1Name" label="品类" min-width="12.5%">
                        </el-table-column>
                        <el-table-column prop="lbch2Name" label="名称" min-width="12.5%">
                        </el-table-column>
                        <el-table-column prop="psn" label="款号" min-width="12.5%">
                        </el-table-column>
                        <el-table-column prop="color" label="颜色" min-width="12.5%">
                        </el-table-column>
                        <el-table-column prop="size" label="尺码" min-width="12.5%">
                        </el-table-column>
                        <el-table-column prop="number" label="数量" min-width="12.5%">
                        </el-table-column>
                        <el-table-column fixed="right" label="操作" min-width="22%">
                            <template slot-scope="scope">
                                <el-button :disabled="(firstForm.sh == 1||scope.row.stopStatus==1||scope.row.closeStatus==1)" :class="{btn:(firstForm.sh==0&&firstForm.closeStatus == 0&&firstForm.sh == 0&&scope.row.stopStatus==0&&scope.row.closeStatus==0)}" @click="tableUpdate(scope.$index, scope.row)">修改</el-button>

                                <el-button :disabled="(firstForm.sh == 1||scope.row.stopStatus==1||scope.row.closeStatus==1)" :class="{btn:firstForm.sh == 0&&firstForm.closeStatus == 0&&firstForm.sh == 0&&scope.row.stopStatus==0&&scope.row.closeStatus==0}" @click="tableDelete(scope.$index, scope.row)">删除</el-button>

                                <el-button v-if="scope.row.stopStatus==0" :disabled="(scope.row.closeStatus==1)" :class="{btn:scope.row.closeStatus==0}" @click="tableStop(scope.$index, scope.row)">终止</el-button>
                                <el-button v-else :disabled="(scope.row.closeStatus==1)" :class="{btn:scope.row.closeStatus==0}" @click="tableStopBack(scope.$index, scope.row)">启用</el-button>

                               <el-button v-if="scope.row.closeStatus==0" :disabled="(scope.row.stopStatus==1)" :class="{btn:firstForm.closeStatus == 0&&firstForm.stopStatus == 0&&scope.row.stopStatus==0}" @click="tableClose(scope.$index, scope.row)">关款</el-button>
                                <el-button v-else :disabled="(scope.row.stopStatus==1)" :class="{btn:scope.row.stopStatus==0}" @click="tableCloseBack(scope.$index, scope.row)">开款</el-button>
                            </template>
                        </el-table-column>
                    </el-table>
                </div>

            </div>      

        </div>

        <!-- 底部页码 -->
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
            </ul>
            <el-pagination @current-change="currentPage" :current-page='page' v-if="pageOnOff" background :page-size="pageSize" :pager-count="5" :total="total">
            </el-pagination>
        </div>

        <!-- 模糊搜索生产单号 -->
        <el-dialog title="生产单号" :visible.sync="oldSearch">
            <el-input v-model="search" placeholder="生产单号"></el-input>
            <ul class="srcond_menu">
                <li v-if="searchList.length===0">暂无数据</li>
                <li class="clearfix" v-for="(item,i) in searchList" :key="i">
                    <span @click="getItemSearch(item)">|--{{item.sn}}</span>
                </li>
            </ul>
        </el-dialog>  

        <!-- 销售单号 -->
        <el-dialog title="销售单号" :visible.sync="oldSellSn">
            <el-input v-model="sellSn" placeholder="销售单号"></el-input>           
            <ul class="srcond_menu">
                <li v-if="sellSnList.length===0">暂无数据</li>
                <li class="clearfix" v-for="(item,i) in sellSnList" :key="i">
                    <span @click="getItemSellSn(item)">|--{{item.sn}}</span>
                </li>
            </ul>
        </el-dialog>  

        <!-- 查询款号 -->
        <el-dialog title="查询款号" :visible.sync="oldPsn">
            <el-input v-model="psn" placeholder="款号"></el-input>        
            <ul class="srcond_menu">
                <li v-if="psnList.length===0">暂无数据</li>
                <li class="clearfix" v-for="(item,i) in psnList" :key="i">
                    <span @click="getItemPsn(item)">|--{{item.psn}}</span>
                </li>
            </ul>
        </el-dialog>     

        <!-- 添加数量弹窗 -->
        <el-dialog title="添加数量" :visible.sync="saveOff" class="addNUm">
            <el-table :data="tableBody" class="addNumTable">
                <el-table-column :label="tit" v-for="(tit, key) in tableTit" :key="key" min-width="120px">
                    <template slot-scope="scope">
                        <input class="changeInput" :disabled="(tableBody[scope.$index][key] == tableBody[scope.$index][0]) || 
                        (tableBody[scope.$index][key] == tableBody[scope.$index][1]) || (!Number(tableBody[scope.$index][key]))" type="text" v-model="tableBody[scope.$index][key]" />
                    </template>
                </el-table-column>
            </el-table>
            <span slot="footer" class="dialog-footer">
                <el-button @click="savesCencel">取 消</el-button>
                <el-button type="primary" @click="savesCommit" plain>保 存</el-button>
            </span> 
        </el-dialog> 

        <!-- 导入款号 -->
        <el-dialog title="导入款号" :visible.sync="importPsn" class="importAddNUm">
            <el-table :data="importPsnList" stripe style="width: 100%" index class="addNumTable" @selection-change="handleSelectionChange">
                <el-table-column type="selection" label="名称" width="55">
                </el-table-column>
                <el-table-column prop="lbch2Name" label="名称" min-width="120px">
                </el-table-column>
                <el-table-column prop="psn" label="款号" min-width="120px">
                </el-table-column>
                <el-table-column prop="colorName" label="颜色" min-width="120px">
                    <template slot-scope="scope">
                        <el-tooltip :content="scope.row.colorName" placement="top" :enterable="false">
                            <p>{{ scope.row.colorName}}</p>
                        </el-tooltip>
                    </template>                    
                </el-table-column>
                <el-table-column prop="size" label="尺码" min-width="120px">
                    <template slot-scope="scope">
                        <el-button size="small" @click="handleSee(scope.$index, scope.row)">查 看</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <span slot="footer" class="dialog-footer">
            <el-pagination @current-change="currentImportPage" :current-page='importPage' v-if="importPageOnOff" background :page-size="importPageSize" :pager-count="5" :total="importTotal">
            </el-pagination>                
                <el-button @click="importPsn = false">取 消</el-button>
                <el-button type="primary" @click="savesImportPsn" plain>确 定</el-button>
            </span>
        </el-dialog>   

        <!-- 导入查看详细尺码 -->
        <el-dialog title="查看详细尺码" :visible.sync="oldSee" width="30%" class="oldSee">
            <p v-for="(item,i) in seeList" :key="i">
                <label>尺码:</label>
                <label>{{item}}</label>
            </p>
            <span slot="footer" class="dialog-footer">
                <el-button type="primary" @click="oldSee = false">确 定</el-button>
            </span>
        </el-dialog>                

        <!-- 修改弹窗 -->
        <el-dialog title="修改" :visible.sync="editVisible" class="addNUm">
            <el-table :data="updateBody" class="addNumTable">
                <el-table-column :label="tit" v-for="(tit, key) in updateTit" :key="key" min-width="120px">
                    <template slot-scope="scope">
                        <input class="changeInput" :disabled="(updateBody[scope.$index][key] == updateBody[scope.$index][0]) || 
                        (updateBody[scope.$index][key] == updateBody[scope.$index][1]) || (!Number(updateBody[scope.$index][key]+1))" type="text" v-model="updateBody[scope.$index][key]" />
                    </template>
                </el-table-column>
            </el-table>
            <span slot="footer" class="dialog-footer">
                <el-button @click="editVisible=false">取 消</el-button>
                <el-button type="primary" @click="saveRevise" plain>确 定</el-button>
            </span>             
        </el-dialog>                

        <!-- table双击弹出 -->
        <el-dialog title="查看详细信息" :visible.sync="oldLook" width="30%" class="look">
            <el-form :model="lookObj" label-width="100px">
                <el-form-item label="品牌">
                    <el-input v-model="lookObj.brand" disabled type="text"></el-input>
                </el-form-item>               
                <el-form-item label="年度">
                    <el-input v-model="lookObj.year" disabled type="text"></el-input>
                </el-form-item>               
                <el-form-item label="季度">
                    <el-input v-model="lookObj.quarter" disabled type="text"></el-input>
                </el-form-item>               
                <el-form-item label="性别">
                    <el-input v-model="lookObj.sex" disabled type="text"></el-input>
                </el-form-item>               
                <el-form-item label="单位">
                    <el-input v-model="lookObj.unit" disabled type="text"></el-input>
                </el-form-item>               
                <el-form-item label="面料">
                    <el-input v-model="lookObj.lbch3Name" disabled type="text"></el-input>
                </el-form-item>                             
                <el-form-item label="款式">
                    <el-input v-model="lookObj.plksName" disabled type="text"></el-input>
                </el-form-item>                             
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button type="primary" @click="oldLook = false">确 定</el-button>
            </span>
        </el-dialog>    

        <!-- 导入弹窗 -->
        <el-dialog class="importExport" title="导入" :visible.sync="importbox" width="30%" :showClose="false" :show-file-list="false">
            <a class="down" href="/TPA/aRepertory/downExcel">下载导入模板</a>
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
        <vagueSearch v-if="oldONoFF" :url="vagueSearchUrl"  :display="displaySearch" v-on:listenOnOff="listenToOnOff"/>
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
import vagueSearch from "@/components/pageCommon/vagueSearch";
export default {
    data() {
        return {
            oldONoFF:true,
            vagueSearchUrl:"/TPA/dProductOrder/getSn?name=",
            displaySearch:['sn'],

            //按钮disabled
            doAdd: false,
            doCancel: true,
            doImport: false,
            doEdit: true,
            doDelete:true,

            //form的disabled
            firstFormNo: true,
            firstFormOn: true,
            firstFormGui: true,

            secondFormNo: true,
            secondFormOn: true,
            secondFormGui: true,

            search:"",
            oldSearch:false,
            searchList:[],
            sellSn:"",                      //查询销售单号
            oldSellSn:false,                //查询销售单号开关
            sellSnList:[],                  //查询销售单号列表
            psn:"",                         //款号
            oldPsn:false,                   //款号开关
            psnList:[],                     //款号列表

            addEdit:true,                  //保存修改状态开关


            tableTit: [],                   // 保存弹窗表头
            tableBody: [],                  // 保存弹窗表格内容
            saveOff: false,                 // 保存弹窗开关   

            importPsn:false,                //导入款号开关
            importPsnList:[],               //导入款号列表
            multipleSelection:[],           //导入表格选择集合
            
            oldSee:false,                   //尺码查看开关
            seeList:[],                     //尺码查看列表
                     
            oldLook:false,                  //双击弹出窗开关
            lookIndex:0,                    //双击弹出窗下标
            lookObj:{},                     //双击弹出框数据    
            
            updateTit: [],                  // 保存弹窗表头
            updateBody: [],                 // 保存弹窗表格内容
            editVisible: false,             // 修改弹窗显示/隐藏
            idx: 0,            

            navMenus:[],

            brand:[],                       //品牌列表
            productUnit:[],                 //生产单位列表

            clientSn:"",                    //客户编号（拥有查询该客户的最近生产订单）
            oldClientSn:false,              //是否存在客户编号开关
            firstForm: {
                sellSn:"",                  //销售订单号
                clientSn:"",                //客户编号
                clientName:"",              //客户名称
                deliveryDate:"",            //交货日期
                date:"",                    //订单日期
                brand:"",                   //品牌
                sn:"",                      //生产订单号
                inDate:"",                  //入库日期
                productUnitSn:"",           //生产单位编码
                productUnit:"",             //生产单位
                repertory:"",               //仓库
                originSn:"",                //来源单号
                remark:"",                  //备注
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
            secondForm: {
                psn: "" //款号
            },

            list: [], // 表格内容

            //表格合并所用
            rowList: [],
            khArr: [],
            khPosition: 0,
            plArr: [],
            plPosition: 0,
            nameArr: [],
            namePosition: 0,           

            //导入分页：当前页码/总数量/每页显示条数
            importPage: 0,
            importTotal: "",
            importPageSize: 10,
            importPageOnOff: false,
            importPageParams: {}, 
            //分页：当前页码/总数量/每页显示条数
            page: 0,
            total: "",
            pageSize: 10,
            pageOnOff: false,
            //分页排序查询条件
            pageParams: {},            

            //导入弹出开关
            importbox: false,
            importZhe: false,                   //导入遮罩
            isCover: false,                     //默认导入不覆盖
            project: "",                        //错误文件名
            //上传的文件
            fileList: [],
            Tips: "",                           //错误提示
            tipOffON: false                     //错误文件下载开关
        };
    },
    methods: {
        listenToOnOff(data){
            this.oldONoFF = data
        },
        //按钮初始化
        emptyBtn() {
            this.doAdd = false;
            this.doCancel = true;
            this.doImport = false;
            this.doEdit = true;
            this.doDelete = true
        },
        //按钮按下状态
        emptyBtnTo() {
            this.doAdd = true;
            this.doCancel = false;
            this.doImport = true;
            this.doEdit = true;
            this.doDelete = true
        },
        //表单1恢复初始空值状态
        emptyFirstForm() {
            this.firstForm = {
                sellSn:"",              //销售订单号
                clientSn:"",            //客户编号
                clientName:"",          //客户名称
                deliveryDate:"",        //交货日期
                date:"",                //订单日期
                brand:"",               //品牌
                sn:"",                  //生产订单号
                inDate:"",              //入库日期
                productUnitSn:"",       //生产单位编码
                productUnit:"",         //生产单位
                repertory:"",           //仓库
                originSn:"",           //来源单号
                remark:"",              //备注
                sh:"-1",                //审核
                stopStatus:"-1",         //终止
                closeStatus:"-1",        //关单
                addDate: "", //编制日期
                addUser: "", //编制人
                updateUser: "", //修改用户
                updateDate: "", //修改时间
                shUser: "", //审核人
                shDate: "", //审核日期                                                
            }
        },
        //清空secondForm
        emptySecondForm() {
            this.secondForm = {
                psn: "" //款号
            };
        },
        //禁用表单first
        disabledFirstForm() {
            this.firstFormNo = true;
            this.firstFormOn = true;
            this.firstFormGui = true;
        },
        //禁用表单second
        disabledSecondForm() {
            this.secondFormNo = true
            this.secondFormOn = true
            this.secondFormGui = true
        },
        //开放表单firstForm
        noDisabledFirstForm() {
            this.firstFormNo = false
            this.firstFormOn = false
            this.firstFormGui = false
        },
        //开放表单secondForm
        noDisabledSecondForm() {
            this.secondFormNo = false;
            this.secondFormOn = true;
            this.secondFormGui = false;
        },

        //取消
        doCancels() {

            this.emptyBtn();
            this.emptyFirstForm();
            this.emptySecondForm();
            this.disabledFirstForm();
            this.disabledSecondForm()

            this.list = [];
            this.pageOnOff = false

            if(this.oldClientSn){this.getnavMenus()}
            this.oldClientSn = false
            
        },
        //修改订单
        doEdits(){
            this.firstFormOn = false
            this.getProductUnit()           //获取生产单位
        },

        //新增
        doAdds() {
            this.addEdit = true
            this.doCancels();
            this.emptyBtnTo();
            this.noDisabledFirstForm()

            this.getProductUnit()           //获取生产单位

            

            this.pageOnOff = false;
        },
        //删除生产订单
        doDeletes(){
            this.$http.post('/TPA/dProductOrder/delete?id='+this.firstForm.id)
                .then(res=>{
                    if(res.data.code===0){
                        this.doCancels()
                        succ(res.data.msg)
                        this.getnavMenus()
                    }else{
                        error(res.data.msg)   
                    }
                })
                .catch(err=>{
                    NetworkAnomaly()
                })
        },

        //刷新
        refresh() {
            if(!this.oldClientSn){this.getnavMenus()}
            this.doCancels();
            
            succ("刷新成功");
        },
        //退出
        doOuts() {
            this.$emit("getOut", this.$route.name);
        },    

        //保存
        firstFormSave(){
            // 获取生产单位编号
            for(let i in this.productUnit){
                if(this.firstForm.productUnit == this.productUnit[i].name){
                    this.firstForm.productUnitSn = this.productUnit[i].sn
                }
            }    
            //判断条件集合        
            let terms =
                this.firstForm.sellSn ||
                this.firstForm.clientSn ||
                this.firstForm.clientName ||
                this.firstForm.deliveryDate ||
                this.firstForm.date ||
                this.firstForm.brand ||
                this.firstForm.sn ||
                this.firstForm.inDate ||
                this.firstForm.productUnitSn ||
                this.firstForm.productUnit
            
            if (!terms) {
                error("请完善表单必填项！");
            } else {
                if(this.addEdit){
                    this.$http
                        .post(
                            "/TPA/dProductOrder/insert",
                            qs.stringify(this.firstForm)
                        )
                        .then(res => {
                            if (res.data.code === 0) {
                                this.firstForm = res.data.data
                                succ(res.data.msg)
                                this.disabledFirstForm()
                                this.noDisabledSecondForm()
                                this.getnavMenus()

                                this.doDelete = false
                            } else {
                                error(res.data.msg);
                            }
                        })
                        .catch(err => {
                            NetworkAnomaly();
                        });
                    this.oldGsNameList = [];
                }else{
                    this.$http
                        .post(
                            "/TPA/dProductOrder/update",
                            qs.stringify(this.firstForm)
                        )
                        .then(res => {
                            if (res.data.code === 0) {
                                this.firstForm = res.data.data
                                succ(res.data.msg)
                                this.disabledFirstForm()
                                this.noDisabledSecondForm()
                                this.getnavMenus()

                                this.doDelete = false
                            } else {
                                error(res.data.msg);
                            }
                        })
                        .catch(err => {
                            NetworkAnomaly();
                        });
                    this.oldGsNameList = [];
                }

            }                
        },
        // 打开保存弹窗
        openSaves() {
            if (this.secondForm.psn) {
                this.$http.post("/TPA/dProductOrderA/getList?psn=" + this.secondForm.psn + "&id=" + this.firstForm.id).then(res => {
                       if(res.data.code === 0) {
                           console.log(res);
                           
                            this.tableTit = res.data.attachment.header;
                            this.tableBody = res.data.data;
                            this.saveOff = true;
                       } else {
                           error(res.data.msg);
                       }
                    })
                    .catch(err => {
                        NetworkAnomaly();
                    });
            } else {
                error("请先填写款号");
            }
        },
        // 保存弹窗取消
        savesCencel() {
            this.saveOff = false;
        },
        // 保存弹窗确认
        savesCommit() {
            //获取所有尺码的数量
            let lists = []
            for(let i in this.tableBody){
                for(let j=2;j<this.tableBody[i].length;j++)
                    lists.push(this.tableBody[i][j])
            }
            
            //把款号跟颜色拿出来遍历成数组
            let Arrs = []
            for(let i in this.tableBody){
                for(let j=2;j<this.tableBody[i].length;j++){
                    let obj = {}
                    // obj.sn = this.tableBody[i][0]
                    obj.color = this.tableBody[i][1]
                    Arrs.push(obj)
                }
            }

            // 获取表头尺码名称
            let sizeLists = []
            for(let i in this.tableBody){
                for(let j=2;j<this.tableTit.length;j++){
                    sizeLists.push(this.tableTit[j])
                }      
            }
            
            //把每个尺码的数量加到数组里，并把其他字段加上
            let B = []
            for(let i in Arrs){
                if (Number(lists[i]+1)) {
                    Arrs[i].number = lists[i]
                    Arrs[i].size = sizeLists[i]
                    Arrs[i].masterSn =this.firstForm.sn,
                    Arrs[i].psn =this.secondForm.psn,
                    Arrs[i].remark = this.firstForm.remark                  
                    B.push(Arrs[i])
                }
            }
            
            
            this.$http.post("/TPA/dProductOrderA/insert", B).then(res => {
                if (res.data.code === 0) {
                    this.saveOff = false;
                    succ(res.data.msg)
                    //分页
                    this.pageOnOff = false;
                    this.page = 0
                    let params = {
                        masterSn: this.firstForm.sn,
                        count: this.pageSize,
                        page: 0,
                        delStatus:0
                    };
                    this.pageParams = params;
                    this.getPageData(this.pageParams)
                }else{
                    error(res.data.msg);
                }
            })
        },
        // 打开表格修改
        tableUpdate(index, row) {
            this.idx = index;
            const item = this.list[index];
            localStorage.setItem("psn", item.psn);

            this.$http.post("/TPA/dProductOrderA/getList?psn=" + item.psn + "&id=" + this.firstForm.id)
                .then(res => {
                    if(res.data.code === 0) {
                        console.log(res);
                        
                    this.updateTit = res.data.attachment.header;
                    this.updateBody = res.data.data;
                    this.editVisible = true;
                    } else {
                        error(res.data.msg);
                    }
                })
                .catch(err => {
                    NetworkAnomaly();
                });
        },
        // 表格修改确认
        saveRevise() {
            let psn = localStorage.getItem("psn");
            localStorage.clear();

            //获取所有尺码的数量
            let lists = []
            for(let i in this.updateBody){
                for(let j=2;j<this.updateBody[i].length;j++)
                    lists.push(this.updateBody[i][j])
            }
            
            //把款号跟颜色拿出来遍历成数组
            let Arrs = []
            for(let i in this.updateBody){
                for(let j=2;j<this.updateBody[i].length;j++){
                    let obj = {}
                    // obj.sn = this.tableBody[i][0]
                    obj.color = this.updateBody[i][1]
                    Arrs.push(obj)
                }
            }

            // 获取表头尺码名称
            let sizeLists = []
            for(let i in this.updateBody){
                for(let j=2;j<this.updateTit.length;j++){
                    sizeLists.push(this.updateTit[j])
                }      
            }
            
            //把每个尺码的数量加到数组里，并把其他字段加上
            let B = []
            for(let i in Arrs){
                if (Number(lists[i]+1)) {
                    Arrs[i].number = lists[i]
                    Arrs[i].size = sizeLists[i]
                    Arrs[i].masterSn =this.firstForm.sn,
                    Arrs[i].psn =psn,
                    B.push(Arrs[i])
                }
            }
            
            this.$http.post("/TPA/dProductOrderA/insert", B).then(res => {
                if (res.data.code === 0) {
                    this.editVisible = false;
                    //分页
                    this.pageOnOff = false;
                    this.page = 0
                    let params = {
                        masterSn: this.firstForm.sn,
                        count: this.pageSize,
                        page: 0,
                        delStatus:0
                    };
                    this.pageParams = params;
                    this.getPageData(this.pageParams)
                }
            })
        },     

        //导入按钮
        secondImport(){
            // 分页
            this.importPageOnOff = false;
            this.importPage = 0
            let params = {
                masterSn: this.firstForm.sellSn,
                count: this.importPageSize,
                page: 0,
            };
            this.importPageParams = params;
            this.getImportPageDate(this.importPageParams)
            this.importPsn = true
        },
        //导入数据分页
        getImportPageDate(params){
            this.$http
                .post("/TPA/dProductOrderA/getBy",qs.stringify(params))
                .then(res => {
                    if (res.data.code === 0) {
                        this.importPsnList = res.data.data;
                        
                        this.importPageOnOff = false
                        this.importTotal = res.data.attachment.total;

                        if (this.importTotal > this.importPageSize) {
                            this.importPageOnOff = true;
                        } else {
                            this.importPageOnOff = false;
                        }                        
                    } else {
                        error(res.data.msg);
                    }
                })
                .catch(err => {
                    NetworkAnomaly();
                });
        },
        //统计导入表格多选集合
        handleSelectionChange(val) {
            this.multipleSelection = val;
        },
        //查看详细尺码   
        handleSee(index,row){
            const item = this.importPsnList[index];   
            let params = {
                sellSn:this.firstForm.sellSn,
                psn:item.psn,
                colorName:item.colorName
            } 

                    
            this.$http.post('/TPA/dProductOrderA/getSize',qs.stringify(params))
                .then(res=>{
                    if(res.data.code===0){
                        this.seeList = res.data.data
                        this.oldSee = true
                    }else{
                        error(res.data.msg)
                    }
                })
                .catch(err=>{
                    NetworkAnomaly()
                })
            
        },     
        //保存导入
        savesImportPsn(){
            if(this.multipleSelection.length>0){
                for(let i in this.multipleSelection){
                    this.multipleSelection[i].masterSn = this.firstForm.sn
                    this.multipleSelection[i].sellSn = this.firstForm.sellSn
                    this.multipleSelection[i].color = this.multipleSelection[i].colorName
                }
                
                this.$http.post('/TPA/dProductOrderA/insertImport',this.multipleSelection)
                    .then(res=>{
                        if(res.data.code===0){
                            succ(res.data.msg)
                            //分页
                            this.pageOnOff = false;
                            this.page = 0
                            let params = {
                                masterSn: this.firstForm.sn,
                                count: this.pageSize,
                                page: 0,
                                delStatus:0
                            };
                            this.pageParams = params;
                            this.getPageData(this.pageParams)
                            this.importPsn = false
                        }else{
                            error(res.data.msg)
                        }
                    })
                    .catch(err=>{
                        NetworkAnomaly()
                    })
            }else{
                error('请选择导入内容！')
            }
        },

        //点击头部搜索
        handleSearch(){
            // this.search = ""
            // this.oldSearch = true
            // this.searchList = []
            this.oldONoFF = true

            
        },
        //选择搜索的生产订单
        getItemSearch(item){
            this.doCancels()
            this.emptyBtnTo();
            this.doAdd = false;
            this.doDelete = false
            this.noDisabledSecondForm()

            this.oldSearch = false

            this.pageOnOff = false;
            this.page = 1
            let params = {
                masterSn: item.sn,
                count: this.pageSize,
                page: 0,
                delStatus:0
            };
            this.pageParams = params;

            this.getPageData(this.pageParams);   
            this.oldClientSn = true
            this.getSellSn(item.sn)
            
        },
        //点击销售单号查询按钮
        handleSellSn(){
            this.oldSellSn = true
            this.sellSn = ""
            this.sellSnList = []
        },
        //选择销售单号
        getItemSellSn(item){
            console.log(item);
            this.getDetailSn(item.sn)
            
            this.oldSellSn = false
        },
        //获取生产订单详情
        getDetailSn(sn){
            this.$http.post('/TPA/dSellOrder/getBySn?sn='+sn)
                .then(res=>{
                    if(res.data.code===0){
                        this.firstForm = res.data.data
                        this.firstForm.date = ''
                    }else{
                        error(res.data.msg)
                    }
                })  
                .catch(err=>{
                    NetworkAnomaly()
                })
        },
        //点击款号输入框
        handlePsn(){
            this.psn = ""
            this.oldPsn = true
            this.psnList = []
        },
        //选择款号
        getItemPsn(item){
            this.secondForm.psn = item.psn
            this.oldPsn = false
            this.secondFormOn = false
            this.secondFormNo = true
        },
        //获取生产单位
        getProductUnit(){   
            this.$http.post('/TPA/aGsZzjg/search?sczz=1')
                .then(res=>{
                    if(res.data.code===0){
                        this.productUnit = res.data.data.list
                    }else{
                        error(res.data.msg)
                    }
                })                
        },

        //获取导航(如何客户款号有值this.clientSn，就查询该客户下的最新20条生产订单)
        getnavMenus() {
            this.$http
                .post("/TPA/dProductOrder/list?page=0&count=20")
                .then(res => {
                    if (res.data.code === 0) {
                        this.navMenus = res.data.data;
                    } else {
                        error(res.data.msg);
                    }
                })
                .catch(err => {
                    NetworkAnomaly();
                });

        },
        //导航展开查询table
        menuSelected(index) {
            this.doCancels()
            this.emptyBtnTo();
            this.doAdd = false;
            this.doDelete = false
            this.noDisabledSecondForm()
            

            //分页
            this.pageOnOff = false;
            this.page = 0
            let params = {
                masterSn: index,
                count: this.pageSize,
                page: 0,
                delStatus:0
            };
            this.pageParams = params;
            this.getPageData(this.pageParams)
            //根据生产单号查询销售单号
            this.getSellSn(index)
            
        },

        //审核
        doExamines() {
            this.$http
                .post("/TPA/dProductOrder/auditing?status=1&id=" + this.firstForm.id)
                .then(res => {
                    if (res.data.code === 0) {
                        succ(res.data.msg);
                        this.getSellSn(this.firstForm.sn)
                        this.getPageData(this.pageParams)
                    } else {
                        error(res.data.msg);
                    }
                })
                .catch(err => {
                    NetworkAnomaly();
                });
        },
        //反审核
        doExamineAgains() {
            this.$http
                .post("/TPA/dProductOrder/auditing?status=0&id=" + this.firstForm.id)
                .then(res => {
                    if (res.data.code === 0) {
                        succ(res.data.msg);
                        this.getSellSn(this.firstForm.sn)
                        this.getPageData(this.pageParams)
                    } else {
                        error(res.data.msg);
                    }
                })
                .catch(err => {
                    NetworkAnomaly();
                });
        },
        //终止
        stop(){
            this.$http
                .post("/TPA/dProductOrder/stop?status=1&id=" + this.firstForm.id)
                .then(res => {
                    if (res.data.code === 0) {
                        succ(res.data.msg);
                        this.getSellSn(this.firstForm.sn)
                        this.getPageData(this.pageParams)
                    } else {
                        error(res.data.msg);
                    }
                })
                .catch(err => {
                    NetworkAnomaly();
                });
        },
        //启用
        stopBack(){
            this.$http
                .post("/TPA/dProductOrder/stop?status=0&id=" + this.firstForm.id)
                .then(res => {
                    if (res.data.code === 0) {
                        succ(res.data.msg);
                        this.getSellSn(this.firstForm.sn)
                        this.getPageData(this.pageParams)
                    } else {
                        error(res.data.msg);
                    }
                })
                .catch(err => {
                    NetworkAnomaly();
                });
        },
        //关单
        close(){
            this.$http
                .post("/TPA/dProductOrder/close?status=1&id=" + this.firstForm.id)
                .then(res => {
                    if (res.data.code === 0) {
                        succ(res.data.msg);
                        this.getSellSn(this.firstForm.sn)
                        this.getPageData(this.pageParams)
                    } else {
                        error(res.data.msg);
                    }
                })
                .catch(err => {
                    NetworkAnomaly();
                });
        },
        //开单
        closeBack(){
            this.$http
                .post("/TPA/dProductOrder/close?status=0&id=" + this.firstForm.id)
                .then(res => {
                    if (res.data.code === 0) {
                        succ(res.data.msg);
                        this.getSellSn(this.firstForm.sn)
                        this.getPageData(this.pageParams)
                    } else {
                        error(res.data.msg);
                    }
                })
                .catch(err => {
                    NetworkAnomaly();
                });
        },

        //通过生产单号查询对应的销售单号
        getSellSn(sn){
            this.$http.post('/TPA/dProductOrder/search?sn='+sn)
                .then(res=>{
                    if(res.data.code===0){
                        this.firstForm = res.data.data.list[0]
                        this.clientSn = this.firstForm.clientSn
                        
                        //查询当前客户底下的最新20个订单
                        if(this.oldClientSn){
                            this.$http
                                .post("/TPA/dProductOrder/list?page=0&count=20&sn="+this.clientSn)
                                .then(res => {
                                    if (res.data.code === 0) {
                                        this.navMenus = res.data.data;
                                    } else {
                                        error(res.data.msg);
                                    }
                                })
                                .catch(err => {
                                    NetworkAnomaly();
                                });                            
                        }
                    }else{
                        error(res.data.msg)
                    }
                })
                .catch(err=>{
                    NetworkAnomaly()
                })
                
        },
        //分页-查询列表
        getPageData(params) {
            this.$http
                .post("/TPA/dProductOrderA/getByMasterSn",qs.stringify(params))
                .then(res => {
                    if (res.data.code === 0) {
                        this.list = res.data.data;
                        
                        // 重置表格合并
                        this.rowList = [];
                        this.khArr = [];
                        this.khPosition = 0;
                        this.rowspan();

                        this.pageOnOff = false
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
                });
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
        },
        //自定义上传
        uploadFile(params) {
            this.importZhe = true;
            const _file = params.file;
            let formData = new FormData();
            formData.append("file", _file);
            this.$ajax
                .post("/TPA/aRepertory/importExcel", formData)
                .then(res => {
                    if (res.status === 200) {
                        if (res.data.code === 0) {
                            succ(res.data.msg);
                            this.getnavMenus();
                            this.importCancel();
                            this.$refs.upload.clearFiles();
                        } else if (res.data.code === 100) {
                            this.tipOffON = true;
                            this.project = res.data.attachment.name;
                            this.Tips = res.data.msg;
                        } else {
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
            let errUrl = "/TPA/aImportExcel/exportMsg?name=" + this.project;
            window.location.href = errUrl;
            setTimeout(() => {
                this.tipOffON = false;
                this.importCancel();
            }, 500);
        },
        //导出
        doExports() {
            window.location.href = "/TPA/dProductOrder/exportExcel";
        },

        //获取页码
        currentPage(val) {
            this.page = val;
        },
        //获取导入页码
        currentImportPage(val){
            this.importPage = val
            console.log(this.importPage);
            
        },
        //table单元格双击
        tableDbclick(row){
            this.$http.post('/TPA/dProductOrderA/getByPsn?psn='+row.psn)
                .then(res=>{
                    if(res.data.code===0){
                        this.lookObj = res.data.data[0]
                        this.oldLook = true
                    }else{
                        error(res.data.msg)
                    }
                })
                .catch(err=>{
                    NetworkAnomaly()
                })            
        },
        //table删除
        tableDelete(index, row){
            this.idx = index;
            const item = this.list[index];
            
            this.$http
                .post("/TPA/dProductOrderA/delete?id="+item.id)
                .then(res => {
                    if (res.data.code === 0) {
                        this.$set(this.list, this.idx, item);
                        this.getPageData(this.pageParams)
                        succ(res.data.msg);
                    } else {
                        error(res.data.msg);
                    }
                })
                .catch(err => {
                    NetworkAnomaly();
                });            
        },
        //table终止
        tableStop(index, row){
            this.idx = index;
            const item = this.list[index];
                     
            this.$http.post('/TPA/dProductOrderA/stop?status=1&id='+item.id)
                .then(res=>{
                    if (res.data.code === 0) {
                        this.$set(this.list, this.idx, item);
                        this.getPageData(this.pageParams)
                        succ(res.data.msg);
                    } else {
                        error(res.data.msg);
                    }
                })  
                .catch(err=>{
                    NetworkAnomaly()
                })
        },
        //table反终止
        tableStopBack(index, row){
            this.idx = index;
            const item = this.list[index];
                     
            this.$http.post('/TPA/dProductOrderA/stop?status=0&id='+item.id)
                .then(res=>{
                    if (res.data.code === 0) {
                        this.$set(this.list, this.idx, item);
                        this.getPageData(this.pageParams)
                        succ(res.data.msg);
                    } else {
                        error(res.data.msg);
                    }
                })  
                .catch(err=>{
                    NetworkAnomaly()
                })
        },
        //table关款
        tableClose(index, row){
            this.idx = index;
            const item = this.list[index];
                     
            this.$http.post('/TPA/dProductOrderA/close?status=1&id='+item.id)
                .then(res=>{
                    if (res.data.code === 0) {
                        this.$set(this.list, this.idx, item);
                        this.getPageData(this.pageParams)
                        succ(res.data.msg);
                    } else {
                        error(res.data.msg);
                    }
                })  
                .catch(err=>{
                    NetworkAnomaly()
                })
        },
        //table开款
        tableCloseBack(index, row){
            this.idx = index;
            const item = this.list[index];
                     
            this.$http.post('/TPA/dProductOrderA/close?status=0&id='+item.id)
                .then(res=>{
                    if (res.data.code === 0) {
                        this.$set(this.list, this.idx, item);
                        this.getPageData(this.pageParams)
                        succ(res.data.msg);
                    } else {
                        error(res.data.msg);
                    }
                })  
                .catch(err=>{
                    NetworkAnomaly()
                })            
        },

        // 表格合并
        rowspan() {
            this.list.forEach((item, index) => {
                if (index === 0) {
                    this.khArr.push(1);
                    this.khPosition = 0;
                    this.plArr.push(1);
                    this.plPosition = 0;
                    this.nameArr.push(1);
                    this.namePosition = 0;
                } else {
                    // 合并品类
                    if (this.list[index].lbch1Name === this.list[index - 1].lbch1Name && this.list[index].lbch2Name === this.list[index - 1].lbch2Name && this.list[index].psn === this.list[index - 1].psn) {
                        this.plArr[this.plPosition] += 1;
                        this.plArr.push(0);
                         this.nameArr[this.namePosition] += 1;
                        this.nameArr.push(0);
                        this.khArr[this.khPosition] += 1;
                        this.khArr.push(0);
                    } else {
                        this.plArr.push(1);
                        this.plPosition = index;
                        this.nameArr.push(1);
                        this.namePosition = index;
                        this.khArr.push(1);
                        this.khPosition = index;
                    }
                }
            });
        },
        objectSpanMethod({ row, column, rowIndex, columnIndex }) {
            // 合并品类
            if (columnIndex === 0) {
                const _row_0 = this.khArr[rowIndex];
                const _col_0 = _row_0 > 0 ? 1 : 0;
                return {
                rowspan: _row_0,
                colspan: _col_0
                };
            }

            // 合并名称
            if (columnIndex === 1) {
                const _row_1 = this.khArr[rowIndex];
                const _col_1 = _row_1 > 0 ? 1 : 0;
                return {
                rowspan: _row_1,
                colspan: _col_1
                };
            }

            // 合并款号
            if (columnIndex === 2) {
                const _row_2 = this.khArr[rowIndex];
                const _col_2 = _row_2 > 0 ? 1 : 0;
                return {
                rowspan: _row_2,
                colspan: _col_2
                };
            }
        }   
    },
    mounted() {
        this.getnavMenus()
    },
    computed: {
        ...mapState(["collapse"])
    },
    watch:{
        page() {
            if(this.page>0){ this.pageParams.page = this.page - 1;}
            this.getPageData(this.pageParams);
        },  
        importPage(){
            if(this.importPage>0){ this.importPageParams.page = this.importPage - 1;}
            this.getImportPageDate(this.importPageParams);            
        },
        //模糊查询款号
        psn(){
            if(this.psn){
                this.$http.post("/TPA/dSellOrderA/option?sn=" + this.firstForm.sellSn + "&name=" + this.psn)
                    .then(res=>{
                        if(res.data.code===0){
                            if(res.data.data.length>0){
                                this.psnList = res.data.data
                            }else{
                                error("暂无数据");
                                this.psnList = [];
                            }
                        }else{
                            error(res.data.msg)
                        }
                    })
                    .catch(err=>{
                        NetworkAnomaly()
                    })

            }else{
                this.secondForm.psn = ""
                this.psnList = []
                this.noDisabledSecondForm()
            }            
        },
     
        //模糊查询销售单号
        sellSn(){
            this.$http.post("/TPA/dSellOrder/option?name="+this.sellSn)
                .then(res=>{
                    if(res.data.code===0){
                        console.log(res.data.data);
                        
                        if(res.data.data.length>0){
                            this.sellSnList = res.data.data
                        }else{  
                            // error('暂无数据')
                            // this.sellSnList = []
                        }
                    }else{
                        error(res.data.msg)
                    }
                })
                .catch(err=>{
                    NetworkAnomaly()
                })            
        },
        //模糊查询生产订单
        search(){
            if(this.search){
                this.$http.post("/TPA/dProductOrder/getSn?name=" + this.search)
                    .then(res=>{
                        if(res.data.code===0){
                            if(res.data.data.length>0){
                                this.searchList = res.data.data
                            }else{
                                error("暂无数据");
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
               this.searchList = []
            } 
        },        
    },
    // 引入组件
    components: {
        NavMenu,vagueSearch
    }
};
</script>

<style lang="stylus" scoped>
@import 'css/style.styl'
</style>
