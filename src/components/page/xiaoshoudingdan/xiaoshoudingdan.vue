<template>
    <div class="container" :class="{container_collapse:collapse}">
        <!-- 页面标题 -->
        <p class="page_title">销售订单</p>

        <!-- 顶部操作按钮 -->
        <div class="btn-box">
            <button class="button_btn" @click="doAdds">新增</button>
            <button class="button_btn" @click="doCancels">取消</button>
            <button class="btn" :class="{button_btn: form.sh == 0 && form.stopStatus == 0 && form.closeStatus == 0}" :disabled="(form.sh != 0 || form.stopStatus != 0 || form.closeStatus != 0)" @click="doChanges">修改</button>
            <button class="button_btn" @click="doImports">导入</button>
            <button class="button_btn" @click="doPrints">打印</button>
            <button class="button_btn" @click="doExports">导出</button>
            <button @click="doSearchs" class="button_btn">查询</button>
            <input class="queryInfo" type="text" v-model="queryInfo" />
            <button class="button_btn" @click="doOuts">退出</button>
            <button class="button_btn" @click="doRefreshs">刷新</button>

            <div class="btn_right">
                <button class="btn" :class="{button_btn: form.sh == 0 && form.stopStatus == 0 && form.closeStatus == 0}" :disabled="(form.sh != 0 || form.stopStatus != 0 || form.closeStatus != 0)" @click="doDeletes">删除订单</button>
                <button class="btn" :class="{button_btn: form.sh == 0}" :disabled="(form.sh != 0 || form.stopStatus != 0 || form.closeStatus != 0)" @click="doExamines">审核</button>
                <button class="btn" :class="{button_btn: form.sh == 1}" :disabled="(form.sh != 1 || form.stopStatus != 0 || form.closeStatus != 0)" @click="doExamineAgains">反审核</button>
                <button class="btn" :class="{button_btn: form.stopStatus == 0}" :disabled="(form.stopStatus != 0 || form.closeStatus != 0)" @click="doStops">终止</button>
                <button class="btn" :class="{button_btn: form.stopStatus == 1}" :disabled="(form.stopStatus != 1 || form.closeStatus != 0)" @click="NotStops">启用</button>
                <button class="btn" :class="{button_btn: form.closeStatus == 1}" :disabled="form.closeStatus != 1" @click="doOrders">开单</button>
                <button class="btn" :class="{button_btn: form.closeStatus == 0}" :disabled="form.closeStatus != 0" @click="closeOrders">关单</button>
            </div>
        </div>

        <div class="set_box">
            <!-- 左侧导航栏 -->
            <div class="menu_box">
                <el-menu @select="menuSelected" unique-opened background-color="#f2f2f2" text-color="#303133" active-text-color="#303133">
                    <nav-menu :navMenus="this.navMenus"></nav-menu>
                </el-menu>
            </div>

            <div class="set_info">
                <!-- 表单内容 -->
                <div class="info_form">
                    <ul class="clearfix">
                        <li>
                            <label>订单日期</label>
                            <el-date-picker format="yyyy 年 MM 月 dd 日" value-format="yyyy-MM-dd" v-model="form.date" type="date" placeholder="必填" :disabled="formOff">
                            </el-date-picker>
                        </li>
                        <li class="menuLi">
                            <label>客户</label>
                            <input type="text" class="first" placeholder="必填" v-model="form.clientSn" :disabled="formOff" @click="customerFun">
                            <input type="text" v-model="form.clientName" :disabled="formOff" @click="customerFun">
                            <button :disabled="formOff" @click="customerFun">。。。</button>
                        </li>
                        <li>
                            <label>属性</label>
                            <el-select v-model="form.property" placeholder="必选" :disabled="formOff">
                                <el-option v-for="item in this.property" :key="item.name" :label="item.name" :value="item.name">
                                </el-option>
                            </el-select>
                        </li>
                        <li>
                            <label>仓库</label>
                            <el-select v-model="form.repertory" placeholder="请选择" :disabled="formOff">
                                <el-option v-for="item in this.repertory" :key="item.name" :label="item.name" :value="item.name">
                                </el-option>
                            </el-select>
                        </li>
                    </ul>
                    <ul class="clearfix">
                        <li>
                            <label>交货地址</label>
                            <input type="text" placeholder="必填" v-model="form.deliveryAddress" :disabled="formChange">
                        </li>
                        <li>
                            <label>交货日期</label>
                            <el-date-picker format="yyyy 年 MM 月 dd 日" value-format="yyyy-MM-dd" v-model="form.deliveryDate" type="date" placeholder="必填" :disabled="formChange">
                            </el-date-picker>
                        </li>
                        <li>
                            <label>订单号</label>
                            <input type="text" v-model="form.sn" disabled placeholder="自动生成">
                        </li>
                        <li>
                            <label>来源号</label>
                            <input type="text" :disabled="formChange" v-model="form.originSn">
                        </li>
                        <li>
                            <label>品牌</label>
                            <el-select v-model="form.brand" placeholder="必选" :disabled="formChange">
                                <el-option v-for="item in this.brand" :key="item.name" :label="item.name" :value="item.name">
                                </el-option>
                            </el-select>
                        </li>
                    </ul>
                    <ul class="clearfix">
                        <li>
                            <label>价格性质</label>
                            <el-select v-model="form.priceNature" placeholder="必选" :disabled="formOff">
                                <el-option v-for="item in this.priceNature" :key="item.name" :label="item.name" :value="item.name">
                                </el-option>
                            </el-select>
                        </li>
                        <li>
                            <label>价格类型</label>
                            <el-select v-model="form.priceType" placeholder="必选" :disabled="formOff">
                                <el-option v-for="item in this.priceType" :key="item.name" :label="item.name" :value="item.name">
                                </el-option>
                            </el-select>
                        </li>
                        <li>
                            <label>币别</label>
                            <el-select v-model="form.currency" placeholder="必选" :disabled="formChange">
                                <el-option v-for="item in this.currency" :key="item.name" :label="item.name" :value="item.name">
                                </el-option>
                            </el-select>
                        </li>
                        <li>
                            <label>结算方式</label>
                            <el-select v-model="form.balanceMode" placeholder="必选" :disabled="formChange">
                                <el-option v-for="item in this.balanceMode" :key="item.name" :label="item.name" :value="item.name">
                                </el-option>
                            </el-select>
                        </li>
                        <li>
                            <label>备注</label>
                            <input type="text" :disabled="formChange" v-model="form.remark">
                        </li>
                        <button class="save" @click="doSaves" :class="{button_btn:!formChange}" :disabled="formChange">保存</button>
                    </ul>
                    <ul class="clearfix">
                        <li>
                            <label for="">款号</label>
                            <input type="text" v-model="spdaPsn" :disabled="spdaPsnOff">
                        </li>
                        <button class="save" :disabled="spdaPsnOff" @click="openSaves" :class="{button_btn:!spdaPsnOff}">新增</button>
                    </ul>
                </div>

                <!-- 表格内容 -->
                <div class="order_table">
                    <!-- <div class="changeTable clearfix">
                        <button class="changeTable_btn">主要信息</button>
                        <button class="changeTable_btn">附加信息</button>
                    </div> -->
                    <el-table :data="list" :span-method="objectSpanMethod" stripe style="width: 100%" index @row-dblclick="chooseRow">
                        <el-table-column prop="lbch1Name" label="品类" min-width="8%">
                        </el-table-column>
                        <el-table-column prop="lbch2Name" label="名称" min-width="8%">
                        </el-table-column>
                        <el-table-column prop="psn" label="款号" min-width="8%">
                        </el-table-column>
                        <el-table-column prop="color" label="颜色" min-width="8%">
                        </el-table-column>
                        <el-table-column prop="size" label="尺码" min-width="5%">
                            <!-- <template slot-scope="scope">
                                <el-button :disabled="(scope.row.sh == 1)" :class="{btn:scope.row.sh == 1}" @click="handleEdit(scope.$index, scope.row)">查看/修改</el-button>
                            </template> -->
                        </el-table-column>
                        <el-table-column prop="number" label="数量" min-width="6%">
                        </el-table-column>
                        <el-table-column prop="discount" label="折扣" min-width="5%">
                        </el-table-column>
                        <el-table-column prop="standarPrice" label="标准价" min-width="8%">
                        </el-table-column>
                        <el-table-column prop="balancePrice" label="结算价" min-width="8%">
                        </el-table-column>
                        <el-table-column prop="price" label="结算金额" min-width="8%">
                        </el-table-column>
                        <el-table-column fixed="right" label="操作" min-width="28%">
                            <template slot-scope="scope">
                                <el-button :class="{btn: form.sh == 1 || form.stopStatus == 1 || form.closeStatus == 1 || scope.row.stop_status == 1 || scope.row.close_status == 1}" :disabled="(form.sh == 1 || form.stopStatus == 1 || form.closeStatus == 1 || scope.row.stop_status == 1 || scope.row.close_status == 1)" @click="tableUpdate(scope.$index, scope.row)">修改</el-button>
                                <el-button :class="{btn: form.sh == 1 || form.stopStatus == 1 || form.closeStatus == 1 || scope.row.stop_status == 1 || scope.row.close_status == 1}" :disabled="(form.sh == 1 || form.stopStatus == 1 || form.closeStatus == 1 || scope.row.stop_status == 1 || scope.row.close_status == 1)" @click="tableDelete(scope.$index, scope.row)">删除</el-button>
                                <el-button :class="{btn: form.sh == 1 || form.stopStatus == 1 || form.closeStatus == 1 || scope.row.close_status == 1}" :disabled="(form.sh == 1 || form.stopStatus == 1 || form.closeStatus == 1 || scope.row.close_status == 1)" v-if="scope.row.stop_status == 0" @click="tableStop(scope.$index, scope.row)">终止</el-button>
                                <el-button :class="{btn: form.sh == 1 || form.stopStatus == 1 || form.closeStatus == 1 || scope.row.close_status == 1}" :disabled="(form.sh == 1 || form.stopStatus == 1 || form.closeStatus == 1 || scope.row.close_status == 1)" v-else-if="scope.row.stop_status == 1" @click="tableStart(scope.$index, scope.row)">启用</el-button>
                                <el-button :class="{btn: form.sh == 1 || form.stopStatus == 1 || form.closeStatus == 1}" :disabled="(form.sh == 1 || form.stopStatus == 1 || form.closeStatus == 1)" v-if="scope.row.close_status == 0" @click="tableClose(scope.$index, scope.row)">关款</el-button>
                                <el-button :class="{btn: form.sh == 1 || form.stopStatus == 1 || form.closeStatus == 1}" :disabled="(form.sh == 1 || form.stopStatus == 1 || form.closeStatus == 1)" v-else-if="scope.row.close_status == 1" @click="tableOpen(scope.$index, scope.row)">开款</el-button>
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
                    <span>{{this.form.addUser}}</span>
                </li>
                <li>
                    <span>编制日期：</span>
                    <span>{{this.form.addDate}}</span>
                </li>
                <li>
                    <span>修改人：</span>
                    <span>{{this.form.updateUser}}</span>
                </li>
                <li>
                    <span>修改日期：</span>
                    <span>{{this.form.updateDate}}</span>
                </li>
                <li>
                    <span>审核人：</span>
                    <span>{{this.form.shUser}}</span>
                </li>
                <li>
                    <span>审核日期：</span>
                    <span>{{this.form.shDate}}</span>
                </li>
            </ul>
            <el-pagination @current-change="currentPage" :current-page='page' v-if="pageOnOff" background :page-size="pageSize" :pager-count="5" :total="total">
            </el-pagination>
        </div>

        <!-- 获取客户信息弹窗 -->
        <el-dialog title="客户信息" :visible.sync="customerOff">
            <el-input v-model="customerInfo" placeholder="客户编号 / 客户名称"></el-input>
            <ul class="srcond_menu">
                <li v-if="customerList.length===0">暂无数据</li>
                <li class="clearfix" v-for="(item,i) in customerList" :key="i">
                    <span class="search" @click="getSearchItem(item)">|--{{item.sn}}-{{item.name}}</span>
                </li>
            </ul>
        </el-dialog>

        <!-- 款号弹窗 -->
        <el-dialog title="款号" :visible.sync="spdaPsnSearchOff">
            <el-input v-model="searchSpdaPsn" placeholder="请输入你要查找的款号"></el-input>
            <el-button @click="searchSpdaPsnFun">查询</el-button>
            <ul class="srcond_menu">
                <li v-if="searchSpdaPsnList.length===0">暂无数据</li>
                <li class="clearfix" v-for="(item,i) in searchSpdaPsnList" :key="i">
                    <span class="search" @click="getspdaPsnItem(item)">|--{{item.psn}}</span>
                </li>
            </ul>
        </el-dialog>

        <!-- 添加数量弹窗 -->
        <el-dialog title="保存" :visible.sync="saveOff" class="tableDialog">
            <el-table :data="tableBody">
                <el-table-column :label="tit" v-for="(tit, key) in tableTit" :key="key" width="150px">
                    <template slot-scope="scope">
                        <input class="changeInput" :disabled="(tableBody[scope.$index][key] == tableBody[scope.$index][0]) || 
                        (tableBody[scope.$index][key] == tableBody[scope.$index][1]) || (!Number(tableBody[scope.$index][key]+1))" type="text" v-model="tableBody[scope.$index][key]" />
                    </template>
                </el-table-column>
            </el-table>
            <span slot="footer" class="dialog-footer">
                <ul class="clearfix footerUL">
                    <li class="fl">
                        <label for="">折扣</label>
                        <input type="text" @input="getMoney" v-model="discount">
                    </li>
                    <li class="fl">
                        <label for="">标准价</label>
                        <input type="text" disabled v-model="standarPrice">
                    </li>
                     <li class="fl">
                        <label for="">结算价</label>
                        <input type="text" disabled v-model="money">
                    </li>
                </ul>
                <el-button @click="savesCencel">取 消</el-button>
                <el-button type="primary" @click="savesCommit" plain>保 存</el-button>
            </span> 
        </el-dialog>

        <!-- 修改弹窗 -->
        <el-dialog title="修改" :visible.sync="editVisible" class="tableDialog">
            <el-table :data="updateBody">
                <el-table-column :label="tit" v-for="(tit, key) in updateTit" :key="key"  width="150px">
                    <template slot-scope="scope">
                        <input class="changeInput" :disabled="(updateBody[scope.$index][key] == updateBody[scope.$index][0]) || 
                        (updateBody[scope.$index][key] == updateBody[scope.$index][1]) || (!Number(updateBody[scope.$index][key]+1))" type="text" v-model="updateBody[scope.$index][key]" />
                    </template>
                </el-table-column>
            </el-table>
            <span slot="footer" class="dialog-footer">
                <ul class="clearfix footerUL">
                    <li class="fl">
                        <label for="">折扣</label>
                        <input type="text" @input="getMoney" v-model="discount">
                    </li>
                    <li class="fl">
                        <label for="">标准价</label>
                        <input type="text" disabled v-model="standarPrice">
                    </li>
                     <li class="fl">
                        <label for="">结算价</label>
                        <input type="text" disabled v-model="money">
                    </li>
                </ul>
                <el-button @click="editVisible=false">取 消</el-button>
                <el-button type="primary" @click="saveRevise" plain>确 定</el-button>
            </span> 
        </el-dialog>

        <!-- 双击显示更多信息弹窗 -->
        <el-dialog title="附加信息" :visible.sync="moreInfoOff">
            <el-form :model="moreInfo" label-width="100px">
                <el-form-item label="性别">
                    <el-input v-model="moreInfo.sex" disabled></el-input>
                </el-form-item>
                <el-form-item label="年龄">
                    <el-input v-model="moreInfo.age" disabled></el-input>
                </el-form-item>
                <el-form-item label="品牌">
                    <el-input v-model="moreInfo.brand" disabled></el-input>
                </el-form-item>
                <el-form-item label="年份">
                    <el-input v-model="moreInfo.year" disabled></el-input>
                </el-form-item>
                <el-form-item label="季度">
                    <el-input v-model="moreInfo.quarter" disabled></el-input>
                </el-form-item>
                <el-form-item label="面料">
                    <el-input v-model="moreInfo.lbch3Name" disabled></el-input>
                </el-form-item>
            </el-form>
        </el-dialog>

        <!-- 导入弹窗 -->
        <el-dialog class="importExport" title="导入" :visible.sync="importbox" width="30%" :showClose="false" :show-file-list="false">
            <a class="down" href="/TPA/dSellOrder/downExcel">下载导入模板</a>
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
    succ,
    error,
    getOut
} from "../../../assets/js/message.js";
import qs from "qs";
import NavMenu from "./NavMenu";
export default {
    name: "xiaoshoudingdan",
    data() {
        return {
            queryInfo: "", // 顶部查询内容
            navMenus: [], // 左侧导航栏数据
            form: {
                date: "", // 订单日期
                clientSn: "", // 客户编号
                clientName: "", // 客户名称
                property: "", // 属性
                repertory: "", // 仓库
                deliveryAddress: "", // 交货地址
                deliveryDate: "", // 交货日期
                sn: "", // 订单号
                originSn: "", // 来源号
                brand: "", // 品牌
                priceNature: "", // 价格性质
                priceType: "", // 价格类型
                currency: "", // 币别
                balanceMode: "", // 结算方式
                remark: "", // 备注
                sh: "-3", // 审核/反审
                stopStatus: "-3", // 终止/开启
                closeStatus: "", // 关单/开单

                addUser: "", // 编制人
                addDate: "", // 编制日期
                updateUser: "", // 修改人
                updateDate: "", // 修改日期
                shUser: "", // 审核人
                shDate: "" // 审核日期
            },
            spdaPsn: "", // 款号
            formOff: true, // 表单禁用、开启
            formChange: true, // 表单修改内容
            spdaPsnOff: true, // 款号禁用、开启
            // 属性选择
            property: [{ name: "销售" }, { name: "退货" }],
            repertory: [], // 仓库选择
            brand: [], // 品牌选择
            priceNature: [], // 价格性质选择
            priceType: [], // 价格类型选择
            currency: [], // 币别选择
            balanceMode: [], // 结算方式选择
            
            list: [], // 表格内容
            rowList: [],
            khArr: [],
            khPosition: 0,
            plArr: [],
            plPosition: 0,
            nameArr: [],
            namePosition: 0,

            customerInfo: "", // 客户弹窗查询内容
            customerOff: false, // 客户弹窗开关
            customerList: [], // 客户弹窗列表

            spdaPsnSearchOff: false, // 款号弹出框开关
            searchSpdaPsn: "", // 模糊查询的值
            searchSpdaPsnList: [], // 模糊查询列表

            tableTit: [], // 保存弹窗表头
            tableBody: [], // 保存弹窗表格内容
            saveOff: false, // 保存弹窗开关
            standarPrice: "", // 结算价
            discount: "", // 折扣
            money: "", // 结算金额

            updateTit: [], // 保存弹窗表头
            updateBody: [], // 保存弹窗表格内容
            editVisible: false, // 修改弹窗显示/隐藏

            moreInfoOff: false, // 更多信息显示/隐藏
            moreInfo: [], // 更多信息内容

            //导入弹出开关
            importbox: false,
            importZhe: false, //导入遮罩
            isCover: false, //默认导入不覆盖
            project: "", //错误文件名
            //上传的文件
            fileList: [],
            Tips: "", //错误提示
            tipOffON: false, //错误文件下载开关

            saveList: [], // 保存时款号颜色尺码列表
            sizeList: [], // 尺码组

            //分页：当前页码/总数量/每页显示条数
            page: 0,
            total: "",
            pageSize: 10,
            pageOnOff: false,
            pageParams: {}
        };
    },

    methods: {
        getDate() {},
        // 新增
        doAdds() {
            this.doCancels();
            this.formOff = false;
            this.formChange = false;
            this.spdaPsnOff = true;
        },

        // 取消
        doCancels() {
            this.formOff = true;
            this.formChange = true;
            this.spdaPsnOff = true;
            this.form = {
                id: "",
                date: "", // 订单日期
                clientSn: "", // 客户编号
                clientName: "", // 客户名称
                property: "", // 属性
                repertory: "", // 仓库
                deliveryAddress: "", // 交货地址
                deliveryDate: "", // 交货日期
                sn: "", // 订单号
                originSn: "", // 来源号
                brand: "", // 品牌
                priceNature: "", // 价格性质
                priceType: "", // 价格类型
                currency: "", // 币别
                balanceMode: "", // 结算方式
                remark: "", // 备注
                sh: "-3", // 审核/反审
                stopStatus: "-3", // 终止/开启
                closeStatus: "", // 关单/开单

                addUser: "", // 编制人
                addDate: "", // 编制日期
                updateUser: "", // 修改人
                updateDate: "", // 修改日期
                shUser: "", // 审核人
                shDate: "" // 审核日期
            };
            this.spdaPsn = "";
            this.list = [];
            this.pageOnOff = false;
        },

        // 修改
        doChanges() {
            this.formOff = true;
            this.formChange = false;
            this.spdaPsnOff = false;
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
        },
        //自定义上传
        uploadFile(params) {
            this.importZhe = true;
            const _file = params.file;
            let formData = new FormData();
            formData.append("file", _file);
            this.$ajax
                .post("/TPA/dSellOrder/importExcel", formData)
                .then(res => {
                    // console.log(res);
                    if (res.status === 200) {
                        if (res.data.code === 0) {
                            succ(res.data.msg);
                            this.getnavMenu();
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
            // console.log(errUrl)
            window.location.href = errUrl;
            setTimeout(() => {
                this.tipOffON = false;
                this.importCancel();
            }, 500);
        },
        //导出
        doExports() {
            window.location.href = "/TPA/dSellOrder/exportExcel";
        },

        // 打印
        doPrints() {},

        // 查询方法 查询、分页都用这个
        searchFun(params) {
            this.$http.post("/TPA/dSellOrderA/search", qs.stringify(params)).then(res => {
                if (res.data.code === 0) {
                    this.list = res.data.data;
                    this.pageOnOff = false;

                    // 重置表格合并
                    this.rowList = [];
                    this.khArr = [];
                    this.khPosition = 0;
                    this.plArr = [];
                    this.plPosition = 0;
                    this.nameArr = [];
                    this.namePosition = 0;
                    this.rowspan();

                    this.total = res.data.attachment.total;
                    if (this.total > this.pageSize) {
                        this.pageOnOff = true;
                    } else {
                        this.pageOnOff = false;
                    }

                    succ(res.data.msg);
                } else {
                    error(res.data.msg);
                }
            })
            .catch(err => {
                NetworkAnomaly();
            })
        },

        // 查询
        doSearchs() {
            if (this.queryInfo != "") {
                this.page = 1;
                let params = {
                    sn: this.queryInfo,
                    page: this.page - 1,
                    count: this.pageSize
                }
                this.pageParams = params;
                this.searchFun(this.pageParams);
                // 根据订单号获取表单数据
                this.$http.post("/TPA/dSellOrder/getBySn?sn=" + this.queryInfo).then(res => {
                    if(res.data.code === 0) {
                        this.form = res.data.data;

                        // 根据客户编号获取导航数据
                        this.$http.post("/TPA/dSellOrder/tree?name=" + res.data.data.clientSn).then(res => {
                            if (res.data.code === 0) {
                                this.navMenus = res.data.data;
                            } else {
                                error(res.data.msg);
                            }
                        })
                        .catch(err => {
                            NetworkAnomaly();
                        })

                    } else {
                        error(res.data.msg);
                    }
                })
                .catch(err => {
                    NetworkAnomaly();
                })
            }
        },

        // 退出
        doOuts() {
            this.$emit("getOut", this.$route.name);
        },

        // 刷新
        doRefreshs() {
            this.queryInfo = "";
            this.doCancels();
            this.getnavMenu();
        },

        // 删除订单
        doDeletes() {
            this.$http.post("/TPA/dSellOrder/delete?status=1&id=" + this.form.id).then(res => {
                if (res.data.code === 0) {
                    this.$http.post("/TPA/dSellOrder/getBySn?sn=" + this.pageParams.sn).then(res => {
                        this.form = res.data.data;

                        this.doRefreshs();
                    })
                } else {
                    error(res.data.msg)
                }
            })
            .catch(err => {
                NetworkAnomaly();
            });
        },

        // 审核
        doExamines() {
            this.$http.post("/TPA/dSellOrder/auditing?status=1&id=" + this.form.id).then(res => {
                if (res.data.code === 0) {
                    this.$http.post("/TPA/dSellOrder/getBySn?sn=" + this.pageParams.sn).then(res => {
                        this.form = res.data.data;
                    })
                } else {
                    error(res.data.msg)
                }
            })
            .catch(err => {
                NetworkAnomaly();
            });
        },

        // 反审核
        doExamineAgains() {
            this.$http.post("/TPA/dSellOrder/auditing?status=0&id=" + this.form.id).then(res => {
                if (res.data.code === 0) {
                    this.$http.post("/TPA/dSellOrder/getBySn?sn=" + this.pageParams.sn).then(res => {
                        this.form = res.data.data;
                    })
                } else {
                    error(res.data.msg)
                }
            })
            .catch(err => {
                NetworkAnomaly();
            });
        },

        // 终止
        doStops() {
            this.$http.post("/TPA/dSellOrder/stop?status=1&id=" + this.form.id).then(res => {
                if (res.data.code === 0) {
                    this.$http.post("/TPA/dSellOrder/getBySn?sn=" + this.pageParams.sn).then(res => {
                        this.form = res.data.data;
                    })
                } else {
                    error(res.data.msg)
                }
            })
            .catch(err => {
                NetworkAnomaly();
            });
        },

        // 反终止
        NotStops() {
            this.$http.post("/TPA/dSellOrder/stop?status=0&id=" + this.form.id).then(res => {
                if (res.data.code === 0) {
                    this.$http.post("/TPA/dSellOrder/getBySn?sn=" + this.pageParams.sn).then(res => {
                        this.form = res.data.data;
                    })
                } else {
                    error(res.data.msg)
                }
            })
            .catch(err => {
                NetworkAnomaly();
            });
        },

        // 开单
        doOrders() {
            this.$http.post("/TPA/dSellOrder/close?status=0&id=" + this.form.id).then(res => {
                if (res.data.code === 0) {
                    this.$http.post("/TPA/dSellOrder/getBySn?sn=" + this.pageParams.sn).then(res => {
                        this.form = res.data.data;
                    })
                } else {
                    error(res.data.msg)
                }
            })
            .catch(err => {
                NetworkAnomaly();
            });
        },

        // 关单
        closeOrders() {
            this.$http.post("/TPA/dSellOrder/close?status=1&id=" + this.form.id).then(res => {
                if (res.data.code === 0) {
                    this.$http.post("/TPA/dSellOrder/getBySn?sn=" + this.pageParams.sn).then(res => {
                        this.form = res.data.data;
                    })
                } else {
                    error(res.data.msg)
                }
            })
            .catch(err => {
                NetworkAnomaly();
            });
        },

        // 获取左侧树形导航数据
        getnavMenu() {
            this.$http.post("/TPA/dSellOrder/tree").then(res => {
                if (res.data.code === 0) {
                    this.navMenus = res.data.data;
                }
            });
        },

        // 获取所有下拉选择的数据
        getChoose() {
            // 仓库选择
            this.$http
                .post("/TPA/aRepertory/option")
                .then(res => {
                    // console.log(res)
                    if (res.data.code === 0) {
                        this.repertory = res.data.data;
                    }
                })
                .catch(err => {
                    NetworkAnomaly();
                });

            // 品牌选择
            this.$http
                .post("/TPA/aLbJb/getBySn?sn=003")
                .then(res => {
                    if (res.data.code === 0) {
                        this.brand = res.data.data;
                    }
                })
                .catch(err => {
                    NetworkAnomaly();
                });

            // 价格性质选择
            this.$http
                .post("/TPA/aLbJb/getBySn?sn=027")
                .then(res => {
                    if (res.data.code === 0) {
                        this.priceNature = res.data.data;
                    }
                })
                .catch(err => {
                    NetworkAnomaly();
                });

            // 价格类型选择
            this.$http
                .post("/TPA/aLbJb/getBySn?sn=005")
                .then(res => {
                    if (res.data.code === 0) {
                        this.priceType = res.data.data;
                    }
                })
                .catch(err => {
                    NetworkAnomaly();
                });

            // 币别选择
            this.$http
                .post("/TPA/aLbJb/getBySn?sn=029")
                .then(res => {
                    if (res.data.code === 0) {
                        this.currency = res.data.data;
                    }
                })
                .catch(err => {
                    NetworkAnomaly();
                });

            // 结算方式选择
            this.$http
                .post("/TPA/aLbJb/getBySn?sn=028")
                .then(res => {
                    if (res.data.code === 0) {
                        this.balanceMode = res.data.data;
                    }
                })
                .catch(err => {
                    NetworkAnomaly();
                });
        },

        // 点击左侧导航
        menuSelected(e) {
            this.doCancels();
            this.page = 1;
            let params = {
                page: this.page - 1,
                count: this.pageSize,
                sn: e
            }
            this.pageParams = params;
            this.searchFun(this.pageParams);
            console.log(this.page)
            this.$http.post("/TPA/dSellOrder/getBySn?sn=" + e).then(res => {
                this.form = res.data.data;
            })
        },

        // 点击弹出客户弹窗
        customerFun() {
            this.customerInfo = "";
            this.customerOff = true;
            this.customerList = [];
        },



        // 客户弹窗选择
        getSearchItem(item) {
            this.customerInfo = "";
            this.customerOff = false;
            this.form.clientSn = item.sn;
            this.form.clientName = item.name;
        },

        // 表单保存
        doSaves() {
            let terms =
                this.form.date &&
                this.form.clientSn &&
                this.form.priceType &&
                this.form.deliveryAddress &&
                this.form.deliveryDate &&
                this.form.brand &&
                this.form.priceNature &&
                this.form.priceType &&
                this.form.currency &&
                this.form.balanceMode;
            if (terms) {
                if (this.form.sn != "") {
                    this.$http.post("/TPA/dSellOrder/insert", qs.stringify(this.form)).then(res => {
                        // let sn = this.form.sn;
                        // this.form = res.data.data;
                        // this.form.sn = sn;

                        this.spdaPsnOff = false;
                        this.formOff = true;
                        this.formChange = true;
                    });
                } else {
                    this.$http.post("/TPA/dSellOrder/insert", qs.stringify(this.form)).then(res => {
                        this.form.sn = res.data.data.sn;
                        this.spdaPsnOff = false;
                        this.formOff = true;
                        this.formChange = true;

                        this.getnavMenu();
                        this.$http.post("/TPA/dSellOrder/getBySn?sn=" + res.data.data.sn).then(res => {
                            this.form = res.data.data;
                        })
                    });
                }
                
            } else {
                error("请填写所有必填项");
            }
        },

        // 打开款号查询弹窗
        searchspdaPsnFun() {
            this.spdaPsnSearchOff = true;
            this.searchSpdaPsn = "";
            this.searchSpdaPsnList = [];
        },

        // 款号弹窗模糊查询
        searchSpdaPsnFun() {
            if (this.searchSpdaPsn.length !== 0) {
                this.$http.post("/TPA/cSpda/option?psn=" + this.searchSpdaPsn).then(res => {
                        if (res.data.code === 0) {
                            this.searchSpdaPsnList = res.data.data;
                        } else {
                            error(res.data.msg);
                            this.customerList = [];
                        }
                    })
                    .catch(err => {
                        NetworkAnomaly();
                    });
            } else {
                error("请输入要查询的款号")
            }
        },

        // 款号查询弹窗选择
        getspdaPsnItem(item) {
            this.spdaPsnSearchOff = false;
            this.spdaPsn = item.psn;
        },

        // 打开保存弹窗
        openSaves() {
            if (this.spdaPsn) {
                this.$http.post("/TPA/dSellOrder/order?psn=" + this.spdaPsn + "&id=" + this.form.id).then(res => {
                       if(res.data.code === 0) {
                            this.tableTit = res.data.attachment.head;
                            this.tableBody = res.data.data;
                            this.standarPrice = res.data.attachment.standarPrice;
                            this.discount = res.data.attachment.discount;
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

        // 计算结算金额
        getMoney() {
            this.money = Number(this.discount) * Number(this.standarPrice);
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
            let B = [];
            for(let i in Arrs){
                if (Number(lists[i]+1)) {
                    Arrs[i].number = lists[i]
                    Arrs[i].size = sizeLists[i]
                    Arrs[i].masterSn =this.form.sn,
                    Arrs[i].psn = this.spdaPsn,
                    Arrs[i].standarPrice = this.standarPrice;
                    Arrs[i].discount = this.discount;
                    Arrs[i].remark = this.form.remark
                    B.push(Arrs[i])
                }
            }
            if(this.discount.length){
                this.$http.post("/TPA/dSellOrderA/insert", B).then(res => {
                    if (res.data.code === 0) {
                        this.saveOff = false;
                        this.page = 1;
                        let params = {
                            page: this.page - 1,
                            count: this.pageSize,
                            sn: this.form.sn
                        }
                        this.pageParams = params;
                        this.searchFun(this.pageParams);
                    } else {
                        error(res.data.msg);
                    }
                })
                .catch(err => {
                    NetworkAnomaly();
                })
            }else{
                error('折扣不能为空！')
            }

        },

        // 打开表格修改
        tableUpdate(index, row) {
            this.idx = index;
            const item = this.list[index];
            console.log(item.psn)
            localStorage.setItem("psn", item.psn);

            this.$http.post("/TPA/dSellOrder/order?psn=" + item.psn + "&id=" + this.form.id).then(res => {
                   if(res.data.code === 0) {
                        this.updateTit = res.data.attachment.head;
                        this.updateBody = res.data.data;
                        this.standarPrice = res.data.attachment.standarPrice;
                        this.discount = res.data.attachment.discount;
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
                for(let j=2;j<this.updateBody[i].length;j++){
                    lists.push(this.updateBody[i][j])
                }
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
            let B = [];
            for(let i in Arrs){
                if (Number(lists[i]+1)) {
                    Arrs[i].number = lists[i]
                    Arrs[i].size = sizeLists[i]
                    Arrs[i].masterSn =this.form.sn,
                    Arrs[i].psn = psn,
                    Arrs[i].standarPrice = this.standarPrice;
                    Arrs[i].discount = this.discount;
                    Arrs[i].remark = this.form.remark
                    B.push(Arrs[i])
                }
            }

            this.$http.post("/TPA/dSellOrderA/update", B).then(res => {
                if (res.data.code === 0) {
                    this.editVisible = false;
                    this.page = 1;
                    let params = {
                        page: this.page - 1,
                        count: this.pageSize,
                        sn: this.form.sn
                    }
                    this.pageParams = params;
                    this.searchFun(this.pageParams);
                } else {
                    error(res.data.msg)
                }
            })
            .catch(err => {
                NetworkAnomaly();
            })
        },

        // 表格删除
        tableDelete(index, row) {
            this.idx = index;
            const item = this.list[index];
            this.$http.post("/TPA/dSellOrderA/delete?id=" + item.id).then(res => {
                if (res.data.code === 0) {
                    this.searchFun(this.pageParams);
                } else {
                    error(res.data.msg)
                }
            })
            .catch(err => {
                NetworkAnomaly();
            })
        },

        // 终止
        tableStop(index, row) {
            this.idx = index;
            const item = this.list[index];
            this.$http.post("/TPA/dSellOrderA/stop?status=1&id=" + item.id).then(res => {
                if (res.data.code === 0) {
                    this.searchFun(this.pageParams);
                } else {
                    error(res.data.msg)
                }
            })
            .catch(err => {
                NetworkAnomaly();
            })
        },

        // 启用
        tableStart(index, row) {
            this.idx = index;
            const item = this.list[index];
            this.$http.post("/TPA/dSellOrderA/stop?status=0&id=" + item.id).then(res => {
                if (res.data.code === 0) {
                    this.searchFun(this.pageParams);
                } else {
                    error(res.data.msg)
                }
            })
            .catch(err => {
                NetworkAnomaly();
            })
        },

        // 关单
        tableClose(index, row) {
            this.idx = index;
            const item = this.list[index];
            this.$http.post("/TPA/dSellOrderA/close?status=1&id=" + item.id).then(res => {
                if (res.data.code === 0) {
                    this.searchFun(this.pageParams);
                } else {
                    error(res.data.msg)
                }
            })
            .catch(err => {
                NetworkAnomaly();
            })
        },

        // 开单
        tableOpen(index, row) {
            this.idx = index;
            const item = this.list[index];
            this.$http.post("/TPA/dSellOrderA/close?status=0&id=" + item.id).then(res => {
                if (res.data.code === 0) {
                    this.searchFun(this.pageParams);
                } else {
                    error(res.data.msg)
                }
            })
            .catch(err => {
                NetworkAnomaly();
            })
        },

        // 双击当前行
        chooseRow(e) {
            this.$http.post("/TPA/dSellOrderA/getByPsn?psn=" + e.psn).then(res => {
                if (res.data.code === 0) {
                    this.moreInfo = res.data.data;
                    this.moreInfoOff = true;
                }
            })
        },

        // 获取当前页码
        currentPage(val) {
            this.page = val;
            // this.pageParams.page = val;
            // this.searchFun(this.pageParams);
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
        this.getnavMenu();
        this.getChoose();
        this.getDate();
    },

    watch: {
        page() {
            if (this.page > 0) {
                this.pageParams.page = this.page - 1;
            }
            this.searchFun(this.pageParams);
        },
        //模糊查询客户
        customerInfo(){
            if (this.customerInfo) {
                this.$http
                    .post("/TPA/aKsDa/option?nature=客户&name=" + this.customerInfo).then(res => {
                        if (res.data.code === 0) {
                            this.customerList = res.data.data;
                        } else {
                            error(res.data.msg);
                            this.customerList = [];
                        }
                    })
                    .catch(err => {
                        NetworkAnomaly();
                    });
            } else {
                this.customerList = []
            }
        }

    },

    computed: {
        ...mapState(["collapse"])
    },

    // 引入组件
    components: {
        NavMenu
    }
};
</script>

<style lang="stylus" scoped>
@import 'css/style.styl'
</style>
