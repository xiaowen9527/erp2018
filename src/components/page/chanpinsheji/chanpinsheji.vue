<template>
    <div class="container" :class="{container_collapse:collapse}">
        <p class="page_title">产品设计</p>
        <div class="btn-box">
            <button :disabled='doAdd' :class="{button_btn:!doAdd}" @click="doAdds">新增</button>
            <button :disabled='doCancel' :class="{button_btn:!doCancel}" @click="doCancels">取消</button>
            <button :disabled='doEdit' :class="{button_btn:!doEdit}" @click="doEdits">修改</button>
            <button :disabled="(this.firstForm.status==1||this.firstForm.status==3||this.firstForm.sh==1||this.firstForm.sh=='-1')" :class="{button_btn:(this.firstForm.status==0)}" @click="doEffectives">有效</button>
            <button :disabled="(this.firstForm.status==0||this.firstForm.status==3||this.firstForm.sh==1||this.firstForm.sh=='-1')" :class="{button_btn:(this.firstForm.status==1)}" @click="doInvalids">无效</button>
            <button class="button_btn" @click="doSearchs">查询</button>
            <input type="text" placeholder="请输入需要查询的设计款号" class="doSearch" v-model="search">
            <button class="button_btn" @click="doOuts">退出</button>
            <button class="button_btn" @click="refresh">刷新</button>
            <div class="btn_right">
                <button :disabled='doEdit' :class="{button_btn:!doEdit}" @click="doPrints">打印</button>
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
                <el-menu @select="menuSelected" unique-opened background-color="#f2f2f2" text-color="#303133" active-text-color="#303133">
                    <nav-menu :navMenus="navMenus"></nav-menu>
                </el-menu>
                <el-select v-model="searchYear" placeholder="默认当前年份" class="searchYear">
                    <el-option v-for="item in this.searchYearList" :key="item.name" :label="item.name" :value="item.name">
                    </el-option>
                </el-select>                 
            </div>
            <div class="set_info">
                <div class="firstForm">
                    <ul class="clearfix">
                        <li class="searchQihua">
                            <label>企划需求</label>
                            <input type="text" placeholder="请选择" @click="getQihua" readonly :disabled="firstFormOn" v-model="firstForm.sn">
                            <button :disabled="firstFormOn" :class="{button_btn:!firstFormOn,button:true}" @click="getQihua">查询</button>
                        </li>
                        <li>
                            <label>日期</label>
                            <input type="text" disabled v-model="firstForm.date">
                        </li>
                        <li>
                            <label>品牌</label>
                            <input type="text" disabled v-model="firstForm.brand">
                        </li>
                        <li>
                            <label>年度</label>
                            <input type="text" disabled v-model="firstForm.year">
                        </li>
                        <li>
                            <label>季度</label>
                            <input type="text" disabled v-model="firstForm.quarter">
                        </li>
                        <li>
                            <label>渠道</label>
                            <input type="text" disabled v-model="firstForm.channel">
                        </li>
                        <li>
                            <label>性别</label>
                            <input type="text" disabled v-model="firstForm.sex">
                        </li>
                        <li>
                            <label>预计上货时间</label>
                            <input type="text" disabled v-model="firstForm.loadTime">
                        </li>
                        <li>
                            <label>款数</label>
                            <input type="text" disabled v-model="firstForm.amount">
                        </li>
                        <li class="qujian">
                            <label>价格区间</label>
                            <input type="text" disabled v-model="firstForm.price">
                            <label class="qujianLabel">元</label>
                        </li>
                        <li class="qujian">
                            <label>年龄段</label>
                            <input type="text" disabled v-model="firstForm.age">
                            <label class="qujianLabel">岁</label>
                        </li>

                        <li class="leibie">
                            <label>面料类别</label>
                            <input type="text" disabled class="leibie_num" v-model="firstForm.lbch3">
                            <input type="text" disabled v-model="firstForm.lbch3Name">
                        </li>
                        <li class="leibie">
                            <label>产品类别</label>
                            <input type="text" disabled class="leibie_num" v-model="firstForm.lbch2Sn">
                            <input type="text" disabled v-model="firstForm.lbch2Name">
                        </li>
                    </ul>
                    <ul class="clearfix">
                        <li class="open">
                            <label>款式</label>
                            <input type="text" :disabled="secondFormOn" class="open_num" readonly v-model="firstForm.plksSn" @click="getStyleBtn">
                            <input type="text" readonly :disabled="secondFormOn" v-model="firstForm.plksName" @click="getStyleBtn">
                            <button :disabled="secondFormOn" :class="{button_btn:!secondFormOn,button:true}" @click="getStyleBtn">。。。</button>
                        </li>
                        <li class="open">
                            <label>颜色</label>
                            <input type="text" readonly :disabled="secondFormOn" class="open_num" v-model="firstForm.colorSn" @click="getColorBtn">
                            <input type="text" readonly :disabled="secondFormOn" v-model="firstForm.colorName" @click="getColorBtn">
                            <button :disabled="secondFormOn" :class="{button_btn:!secondFormOn,button:true}" @click="getColorBtn">。。。</button>
                        </li>
                        <li class="open">
                            <label>尺码</label>
                            <input type="text" readonly :disabled="secondFormOn" class="open_num" v-model="firstForm.sizeSn" @click="getSizeBtn">
                            <input type="text" readonly :disabled="secondFormOn" v-model="firstForm.sizeName" @click="getSizeBtn">
                            <button :disabled="secondFormOn" :class="{button_btn:!secondFormOn,button:true}" @click="getSizeBtn">。。。</button>
                        </li>
                        <li class="wide">
                            <label>设计师</label>
                            <el-select :disabled="secondFormOn" v-model="firstForm.designer" placeholder="请选择">
                                <el-option v-for="item in this.designer" :key="item.rdName" :label="item.rdName" :value="item.rdName">
                                </el-option>
                            </el-select>
                        </li>
                        <li class="wide">
                            <label>设计款号</label>
                            <input class="wideinp" v-model="firstForm.pSn" type="text" disabled placeholder="自动生成">
                        </li>
                        <el-checkbox-group v-model="firstForm.psnXz" :disabled="secondFormOn" class="checkbox">
                            <el-checkbox label="虚拟款号"></el-checkbox>
                        </el-checkbox-group>
                        <el-checkbox-group v-model="firstForm.qr" :disabled="secondFormOn" class="checkbox">
                            <el-checkbox label="大货"></el-checkbox>
                        </el-checkbox-group>
                        <button style="margin-top:.5vh;margin-left:1vh" :disabled="secondFormOn" :class="{button_btn:!secondFormOn}" @click="secondSave" class="button">保存</button>
                        <li class="upload">
                            <button style="margin-top:.5vh;margin-left:1vh" :disabled="pic" :class="{button_btn:!pic}" @click="dodesigns" class="button">上传设计图</button>
                            <button style="margin-top:.5vh;margin-left:1vh" :disabled="pic" :class="{button_btn:!pic}" @click="dosamples" class="button">上传样衣图</button>
                            <button style="margin-top:.5vh;margin-left:1vh" :disabled="pic" :class="{button_btn:!pic}" @click="domaterials" class="button">上传面料图</button>
                        </li>

                    </ul>
                </div>
                <el-tabs tab-position="left" style="height: 200px;height:auto;margin-top:0.5vh" v-if="!pic">
                    <el-tab-pane label="设计图">
                        <ul class="clearfix imgBox">
                            <li v-for="(item,i) in design" :key="i">
                                <img :src="item">
                                <div class="zhezhao"> </div>
                                <i class="el-icon-error" @click="deleteDesign(item)"></i>
                                <i class="el-icon-view detail" @click="detailDesign(item)"></i>
                            </li>
                        </ul>
                    </el-tab-pane>
                    <el-tab-pane label="样衣图">
                        <ul class="clearfix imgBox">
                            <li v-for="(item,i) in sample" :key="i">
                                <img :src="item">
                                <div class="zhezhao"> </div>
                                <i class="el-icon-error" @click="deleteSample(item)"></i>
                                <i class="el-icon-view detail" @click="detailSample(item)"></i>
                            </li>
                        </ul>
                    </el-tab-pane>
                    <el-tab-pane label="面料图">
                        <ul class="clearfix imgBox">
                            <li v-for="(item,i) in material" :key="i">
                                <img :src="item">
                                <div class="zhezhao"> </div>
                                <i class="el-icon-error" @click="deleteMaterial(item)"></i>
                                <i class="el-icon-view detail" @click="detailMaterial(item)"></i>
                            </li>
                        </ul>
                    </el-tab-pane>
                </el-tabs>
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
        </div>

        <el-dialog title="企划需求" :visible.sync="oldMenu">
            <el-input v-model="searchSecondTable" placeholder="请输入你要查找的企划需求"></el-input>
            <ul class="qihua_menu">
                <li v-if="list.length===0">暂无数据</li>
                <li v-for="(item,i) in list" :key="i" @click="getQihuaItem(item)" class="clearfix">
                    <span>{{item.code}}</span>
                    <span>{{item.lbch2Name}}</span>
                    <span>{{item.crowd}}</span>
                </li>
            </ul>
        </el-dialog>
        <el-dialog title="款式" :visible.sync="oldStyle">
            <ul class="srcond_menu">
                <li v-if="style.length===0">暂无数据</li>
                <li v-for="(item,i) in style" :key="i">
                    <span>|--{{item.entity.name}}</span>
                    <div class="second" v-for="(items,i) in item.childs" :key="i">
                        <p @click="getStyleItem(items)">|--{{items.entity.name}}</p>
                    </div>
                </li>
            </ul>
        </el-dialog>

        <el-dialog title="颜色" :visible.sync="oldColor" class="mohu">
            <el-input v-model="searchColor" placeholder="请输入你要查找的颜色"></el-input>
            <ul class="srcond_menu">
                <li v-if="color.length===0">暂无数据</li>
                <li class="clearfix" v-for="(item,i) in color" :key="i">
                    <span @click="getColorItem(item)">|--{{item.name}}</span>
                    <span @click="getColorItem(item)">{{item.sn}}</span>
                </li>
            </ul>
        </el-dialog>

        <el-dialog title="尺码" :visible.sync="oldSize" class="mohu">
            <el-input v-model="searchSize" placeholder="请输入你要查找的尺码"></el-input>
            <ul class="srcond_menu">
                <li v-if="size.length===0">暂无数据</li>
                <li class="clearfix" v-for="(item,i) in size" :key="i">
                    <span @click="getSizeItem(item)">|--{{item.name}}</span>
                    <span @click="getSizeItem(item)">{{item.sn}}</span>
                </li>
            </ul>
        </el-dialog>


        <el-dialog class="importExport" title="设计图上传" :visible.sync="designbox" width="30%" :showClose="false" :show-file-list="false">
            <el-upload name="file" class="upload-demo" ref="designq" action="" :file-list="designfileList" :http-request="designUploadFile" :auto-upload="false" accept=".jpg,.jpeg,.png">
                <el-button slot="trigger" size="small" type="primary" plain>选取文件</el-button>
                <div slot="tip" class="el-upload__tip">只能上传图片</div>
            </el-upload>
            <span slot="footer" class="dialog-footer">
                <el-button @click="designCancel">取 消</el-button>
                <el-button type="primary" @click="designUpload" plain>确 定</el-button>
            </span>
        </el-dialog>
        <el-dialog class="importExport" title="样衣图上传" :visible.sync="samplebox" width="30%" :showClose="false" :show-file-list="false">
            <el-upload name="file" class="upload-demo" ref="sampleq" action="" :file-list="samplefileList" :http-request="sampleUploadFile" :auto-upload="false" accept=".jpg,.jpeg,.png">
                <el-button slot="trigger" size="small" type="primary" plain>选取文件</el-button>
                <div slot="tip" class="el-upload__tip">只能上传图片</div>
            </el-upload>
            <span slot="footer" class="dialog-footer">
                <el-button @click="sampleCancel">取 消</el-button>
                <el-button type="primary" @click="sampleUpload" plain>确 定</el-button>
            </span>
        </el-dialog>
        <el-dialog class="importExport" title="面料图上传" :visible.sync="materialbox" width="30%" :showClose="false" :show-file-list="false">
            <el-upload name="file" class="upload-demo" ref="materialq" action="" :file-list="materialfileList" :http-request="materialUploadFile" :auto-upload="false" accept=".jpg,.jpeg,.png">
                <el-button slot="trigger" size="small" type="primary" plain>选取文件</el-button>
                <div slot="tip" class="el-upload__tip">只能上传图片</div>
            </el-upload>
            <span slot="footer" class="dialog-footer">
                <el-button @click="materialCancel">取 消</el-button>
                <el-button type="primary" @click="materialUpload" plain>确 定</el-button>
            </span>
        </el-dialog>

        <!-- 导入弹窗 -->
        <el-dialog class="importExport" title="导入" :visible.sync="importbox" width="30%" :showClose="false" :show-file-list="false">
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
    getOut,
    imgUrl
} from "../../../assets/js/message.js";
import NavMenu from "./NavMenu";
import qs from "qs";
export default {
    name: "chanpinsheji",
    data() {
        return {

            //按钮disabled
            doAdd: false,
            doCancel: true,
            doEdit: true,
            doImport: false,
            //form的disabled
            firstFormNo: true,
            firstFormOn: true,
            firstFormGui: true,
            secondFormNo: true,
            secondFormOn: true,
            secondFormGui: true,
            pic: true,
            //bind值
            search: "", //查询
            navMenus: [], //导航数据
            searchYear:"",          //当前当行的年份
            searchYearList:[],      //导航年份数组            
            firstForm: {
                sn: "", //单号
                date: "", //日期
                brand: "", //品牌名称
                year: "", //年度
                quarter: "", //季度
                channel: "", //渠道
                sex: "",
                loadTime: "",
                amount: "",
                price: "",
                age: "",
                lbch1Name: "",
                lbch1Sn: "",
                lbch3: "", //面料类别编号
                lbch3Name: "", //面料类别名称
                lbch2Sn: "", //二级品类编号
                lbch2Name: "", //二级品类名称
                sh: "-1", //审核
                sp: "-1", //审批
                status: "3",
                addUser: "",
                addDate: "",
                updateUser: "",
                updateDate: "",
                shUser: "",
                shDate: "",
                spUser: "",
                spDate: "",
                layoutId: "", //企划项Id
                pSn: "", //款号
                psnXz: false, //款号性质
                plksSn: "", //款式编号
                plksName: "", //款式名称
                colorSn: "", //色号
                colorName: "", //色号名称
                colorPidName: "",
                sizeSn: "",
                sizeName: "",
                sizePidName: "",
                designer: "", //设计师
                designerSn: "", //设计师工号
                qr: false //大货
            },
            oldMenu: false,
            oldColor: false,
            oldStyle: false,
            oldSize: false,
            list: [],
            searchColor: "",
            searchSize: "",
            color: [],
            style: [],
            size: [],

            printList: [],
            imgArr:[],
            designer: [],
            searchSecondTable: "",

            designbox: false,
            samplebox: false,
            materialbox: false,
            //图片
            design: [],
            sample: [],
            material: [],

            designfileList:[],
            samplefileList:[],
            materialfileList:[],            

            //导入弹出开关
            importbox: false,
            importZhe: false, //导入遮罩
            //上传的文件
            fileList: [],

        };
    },
    methods: {
        //按钮初始化
        emptyBtn() {
            this.doAdd = false;
            this.doCancel = true;
            this.doEdit = true;
        },
        //按钮按下状态
        emptyBtnTo() {
            this.doAdd = true;
            this.doCancel = false;
            this.doEdit = true;
            this.doDelete = true;
        },
        //表单1恢复初始空值状态
        emptyFirstForm() {
            this.firstForm = {
                sn: "", //单号
                date: "", //日期
                brand: "", //品牌名称
                year: "", //年度
                quarter: "", //季度
                channel: "", //渠道
                sex: "",
                loadTime: "",
                amount: "",
                price: "",
                age: "",
                lbch1Name: "",
                lbch1Sn: "",
                lbch3: "", //面料类别编号
                lbch3Name: "", //面料类别名称
                lbch2Sn: "", //二级品类编号
                lbch2Name: "", //二级品类名称
                sh: "-1", //审核
                sp: "-1", //审批
                status: "3",
                addUser: "",
                addDate: "",
                updateUser: "",
                updateDate: "",
                shUser: "",
                shDate: "",
                spUser: "",
                spDate: "",
                layoutId: "", //企划项Id
                pSn: "", //款号
                psnXz: false, //款号性质
                qr: false, //大货
                plksSn: "", //款式编号
                plksName: "", //款式名称
                colorSn: "", //色号
                colorName: "", //色号名称
                colorPidName: "",
                sizeSn: "",
                sizeName: "",
                sizePidName: "",
                designer: "", //设计师
                designerSn: "" //设计师工号
            };
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
            this.doCancels();
            this.noDisabledFirstForm();
            this.doCancel = false;
            this.addEdit = true;
        },
        //取消
        doCancels() {
            this.emptyBtn();
            this.emptyFirstForm();
            this.disabledFirstForm();
            this.disabledSecondForm();
            this.doPrint = true;
            this.pageOnOff = false;
            this.list = [];
            this.printList = [];
            this.designer = [];

            this.pic = true;
            this.design = [];
            this.sample = [];
            this.material = [];
        },
        //修改
        doEdits() {
            this.emptyBtnTo();
            this.noDisabledSecondForm();
            this.doAdd = false;
            this.doCancel = false;
            this.addEdit = false;
            this.getStyle();
            this.getDesigner();
        },
        //删除
        doDeletes() {
            this.$http
                .post("/TPA/cSpqh/delete?id=" + this.firstForm.id)
                .then(res => {
                    if (res.data.code === 0) {
                        succ(res.data.msg);
                        this.doCancels();
                        this.getnavMenu();
                    } else {
                        error(res.data.msg);
                    }
                })
                .catch(err => {
                    NetworkAnomaly();
                });
        },
        //secondSave保存
        secondSave() {
            this.firstForm.designerSn = this.getSn(
                this.designer,
                this.firstForm.designer
            );
            this.firstForm.psnXz = this.elCheckboxs(this.firstForm.psnXz);
            this.firstForm.qr = this.elCheckboxs(this.firstForm.qr);
            let terms =
                this.firstForm.plksSn.length === 0 

            if (terms) {
                error("表单项不能为空");
            } else {
                console.log(this.firstForm);
                if (this.addEdit) {
                    this.$http
                        .post("/TPA/cSpda/insert", qs.stringify(this.firstForm))
                        .then(res => {
                            if (res.data.code === 0) {
                                succ(res.data.msg);
                                this.disabledFirstForm();
                                this.getnavMenu();
                                this.firstForm.pSn = "";
                                this.firstForm.psnXz = false;
                                this.firstForm.plksSn = "";
                                this.firstForm.plksName = "";
                                this.firstForm.colorSn = "";
                                this.firstForm.colorName = "";
                                this.firstForm.colorPidName = "";
                                this.firstForm.sizeSn = "";
                                this.firstForm.sizeName = "";
                                this.firstForm.sizePidName = "";
                                this.firstForm.designer = "";
                                this.firstForm.designerSn = "";
                                this.firstForm.qr = false;
                            } else {
                                error(res.data.msg);
                            }
                        })
                        .catch(err => {
                            NetworkAnomaly();
                        });
                } else {
                    this.$http
                        .post("/TPA/cSpda/update", qs.stringify(this.firstForm))
                        .then(res => {
                            if (res.data.code === 0) {
                                succ(res.data.msg);
                                this.firstForm.psnXz = this.elCheckbox(
                                    this.firstForm.psnXz
                                );
                                this.firstForm.qr = this.elCheckbox(
                                    this.firstForm.qr
                                );
                                this.disabledFirstForm();
                                this.disabledSecondForm();
                                this.getnavMenu();
                                this.doEdit = false;
                            } else {
                                error(res.data.msg);
                            }
                        })
                        .catch(err => {
                            NetworkAnomaly();
                        });
                }
            }
        },
        //有效按钮
        doEffectives() {
            let params = {
                id: this.firstForm.id,
                status: "1"
            };
            this.$http
                .post("/TPA/cSpda/status", qs.stringify(params))
                .then(res => {
                    if (res.data.code === 0) {
                        this.firstForm.status = "1";
                        succ(res.data.msg);
                    } else {
                        error(res.data.msg);
                    }
                })
                .catch(err => {
                    NetworkAnomaly();
                });
        },
        //无效按钮
        doInvalids() {
            let params = {
                id: this.firstForm.id,
                status: "0"
            };
            this.$http
                .post("/TPA/cSpda/status", qs.stringify(params))
                .then(res => {
                    if (res.data.code === 0) {
                        this.firstForm.status = "0";
                        succ(res.data.msg);
                    } else {
                        error(res.data.msg);
                    }
                })
                .catch(err => {
                    NetworkAnomaly();
                });
        },
        //查询
        doSearchs() {
            if (this.search.length === 0) {
                error("请输入需要查询的设计款号");
            } else {
                this.getPageDate(this.search);
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
        pushArr(name){
            if(name){
              this.imgArr.push(name)  
            }
        },
        //打印
        doPrints() {
            this.pushArr(this.design)
            this.pushArr(this.sample)
            this.pushArr(this.material)
            localStorage.setItem("pageTit", JSON.stringify(this.firstForm));
            localStorage.setItem("imgArr", JSON.stringify(this.imgArr));
            window.open("/erp/#/chanpinshejiPrint");
        },
        //审核
        doExamines() {
            let params = {
                id: this.firstForm.id,
                status: "1"
            };
            this.$http
                .post("/TPA/cSpda/auditing", qs.stringify(params))
                .then(res => {
                    if (res.data.code === 0) {
                        this.firstForm.sh = "1";
                        succ(res.data.msg);
                    } else {
                        error(res.data.msg);
                    }
                })
                .catch(err => {
                    NetworkAnomaly();
                });
        },
        //反审
        doExamineAgains() {
            let params = {
                id: this.firstForm.id,
                status: "0"
            };
            this.$http
                .post("/TPA/cSpda/auditing", qs.stringify(params))
                .then(res => {
                    if (res.data.code === 0) {
                        this.firstForm.sh = "0";
                        succ(res.data.msg);
                    } else {
                        error(res.data.msg);
                    }
                })
                .catch(err => {
                    NetworkAnomaly();
                });
        },
        //审批
        doApprovals() {
            let params = {
                id: this.firstForm.id,
                status: "1"
            };
            this.$http
                .post("/TPA/cSpda/approve", qs.stringify(params))
                .then(res => {
                    if (res.data.code === 0) {
                        this.firstForm.sp = "1";
                        succ(res.data.msg);
                    } else {
                        error(res.data.msg);
                    }
                })
                .catch(err => {
                    NetworkAnomaly();
                });
        },
        //反审批
        doApprovalAgains() {
            let params = {
                id: this.firstForm.id,
                status: "0"
            };
            this.$http
                .post("/TPA/cSpda/approve", qs.stringify(params))
                .then(res => {
                    if (res.data.code === 0) {
                        this.firstForm.sp = "0";
                        succ(res.data.msg);
                    } else {
                        error(res.data.msg);
                    }
                })
                .catch(err => {
                    NetworkAnomaly();
                });
        },

        //上传设计图
        dodesigns() {
            this.designbox = true;
        },
        //上传设计图取消
        designCancel() {
            this.emptyBtn();
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
        //删除设计图
        deleteDesign(item) {
            let url = item.split("/");
            url.splice(0, 3);
            url = "/" + url.join("/");
            console.log(url);
            let params = {
                id: this.firstForm.id,
                url: url
            };

            this.$http
                .post("/TPA/cSpda/delDesign", qs.stringify(params))
                .then(res => {
                    if (res.data.code === 0) {
                        succ(res.data.msg);
                        for (let i in this.design) {
                            if (this.design[i] == item) {
                                this.design.splice(i, 1);
                            }
                        }
                    } else {
                        error(res.data.msg);
                    }
                })
                .catch(err => {
                    NetworkAnomaly();
                });
        },
        //打开设计大图
        detailDesign(item) {
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

        //上传样衣图
        dosamples() {
            this.samplebox = true;
        },
        //上传样衣图取消
        sampleCancel() {
            this.emptyBtn();
            this.samplebox = false;
            this.$refs.sampleq.clearFiles();
        },
        //文件上传到服务器按钮
        sampleUpload() {
            this.$refs.sampleq.submit();
        },
        //自定义上传
        sampleUploadFile(params) {
            const _file = params.file;
            let formData = new FormData();
            formData.append("file", _file);
            this.$ajax
                .post("/TPA/cSpda/loadSample?id=" + this.firstForm.id, formData)
                .then(res => {
                    if (res.status === 200) {
                        console.log(res);
                        if (res.data.code === 0) {
                            succ(res.data.msg);
                            this.sampleCancel();
                            this.$refs.sampleq.clearFiles();
                            this.samplebox = false;
                            this.sample.push(imgUrl + res.data.data);
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
        //删除样衣图
        deleteSample(item) {
            let url = item.split("/");
            url.splice(0, 3);
            url = "/" + url.join("/");
            console.log(url);
            let params = {
                id: this.firstForm.id,
                url: url
            };

            this.$http
                .post("/TPA/cSpda/delSample", qs.stringify(params))
                .then(res => {
                    if (res.data.code === 0) {
                        succ(res.data.msg);
                        for (let i in this.sample) {
                            if (this.sample[i] == item) {
                                this.sample.splice(i, 1);
                            }
                        }
                    } else {
                        error(res.data.msg);
                    }
                })
                .catch(err => {
                    NetworkAnomaly();
                });
        },
        //打开样衣大图
        detailSample(item) {
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

        //上传面料图
        domaterials() {
            this.materialbox = true;
        },
        //上传面料图取消
        materialCancel() {
            this.emptyBtn();
            this.materialbox = false;
            this.$refs.materialq.clearFiles();
        },
        //文件上传到服务器按钮
        materialUpload() {
            this.$refs.materialq.submit();
        },
        //自定义上传
        materialUploadFile(params) {
            const _file = params.file;
            let formData = new FormData();
            formData.append("file", _file);
            this.$ajax
                .post(
                    "/TPA/cSpda/loadMaterial?id=" + this.firstForm.id,
                    formData
                )
                .then(res => {
                    if (res.status === 200) {
                        console.log(res);
                        if (res.data.code === 0) {
                            succ(res.data.msg);
                            this.materialCancel();
                            this.$refs.materialq.clearFiles();
                            this.materialbox = false;
                            this.material.push(imgUrl + res.data.data);
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
        //删除设计图
        deleteDesign(item) {
            let url = item.split("/");
            url.splice(0, 3);
            url = "/" + url.join("/");
            console.log(url);
            let params = {
                id: this.firstForm.id,
                url: url
            };

            this.$http
                .post("/TPA/cSpda/delDesign", qs.stringify(params))
                .then(res => {
                    if (res.data.code === 0) {
                        succ(res.data.msg);
                        for (let i in this.design) {
                            if (this.design[i] == item) {
                                this.design.splice(i, 1);
                            }
                        }
                    } else {
                        error(res.data.msg);
                    }
                })
                .catch(err => {
                    NetworkAnomaly();
                });
        },
        //删除面料图
        deleteMaterial(item) {
            let url = item.split("/");
            url.splice(0, 3);
            url = "/" + url.join("/");
            console.log(url);
            let params = {
                id: this.firstForm.id,
                url: url
            };

            this.$http
                .post("/TPA/cSpda/delMaterial", qs.stringify(params))
                .then(res => {
                    if (res.data.code === 0) {
                        succ(res.data.msg);
                        for (let i in this.material) {
                            if (this.material[i] == item) {
                                this.material.splice(i, 1);
                            }
                        }
                    } else {
                        error(res.data.msg);
                    }
                })
                .catch(err => {
                    NetworkAnomaly();
                });
        },
        //打开面料大图
        detailMaterial(item) {
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
        //导出
        doExports() {
            window.location.href = "/TPA/cStandardOper/exportExcel";
        },

        //nav
        getnavMenu() {
            this.$http
                .post("/TPA/psn/tree?delStatus=0&year="+this.searchYear)
                .then(res => {
                    if (res.data.code === 0) {
                        console.log(res);
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
                        this.searchYearList = res.data.data
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


        //点击导航
        menuSelected(index) {
            this.doCancels();
            this.disabledFirstForm();
            this.disabledSecondForm();
            let data = index.split(",");
            this.getPageDate(data[0]);
        },
        getPageDate(name) {
            if (parseInt(name)) {
                this.$http
                    .post("/TPA/cSpda/getBy?psn=" + name)
                    .then(res => {
                        if (res.data.code === 0) {
                            this.doEdit = false;
                            this.doCancel = false;
                            let data = {};
                            if (res.data.attachment) {
                                data = Object.assign(
                                    res.data.data,
                                    res.data.attachment
                                );
                                if (data.design) {
                                    for (
                                        let i = 0;
                                        i < data.design.length;
                                        i++
                                    ) {
                                        data.design[i] =
                                            imgUrl + data.design[i];
                                    }
                                }
                                if (data.sample) {
                                    for (
                                        let i = 0;
                                        i < data.sample.length;
                                        i++
                                    ) {
                                        data.sample[i] =
                                            imgUrl + data.sample[i];
                                    }
                                }
                                if (data.material) {
                                    for (
                                        let i = 0;
                                        i < data.material.length;
                                        i++
                                    ) {
                                        data.material[i] =
                                            imgUrl + data.material[i];
                                    }
                                }

                                this.design = data.design;
                                this.sample = data.sample;
                                this.material = data.material;
                            } else {
                                data = res.data.data;
                                console.log("1");
                            }
                            // let
                            data.psnXz = this.elCheckbox(data.psnXz);

                            data.qr = this.elCheckbox(data.qr);
                            this.firstForm = data;
                            this.pic = false;

                            console.log(this.firstForm);
                        } else {
                            error(res.data.msg);
                        }
                    })
                    .catch(err => {
                        NetworkAnomaly();
                    });
            }
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
        //获取设计师
        getDesigner() {
            this.$http
                .post("/TPA/cYffg/getBySn?&rdProcedureSn=020-1")
                .then(res => {
                    if (res.data.code === 0) {
                        this.designer = res.data.data;
                    } else {
                        error(res.data.msg);
                    }
                })
                .catch(err => {
                    NetworkAnomaly();
                });
        },
        //获取款式
        getStyle() {
            this.$http
                .post("/TPA/cPlks/tree")
                .then(res => {
                    if (res.data.code === 0) {
                        this.style = res.data.data.childs;
                    } else {
                        error(res.data.msg);
                    }
                })
                .catch(err => {
                    NetworkAnomaly();
                });
        },
        //模糊查询颜色
        getColor() {
            let search = {
                pidSn: "9|1",
                name: 17 + "|" + this.searchColor
            };
            let searchStr = JSON.stringify(search);
            this.$http
                .post(
                    "/TPA/aYscm/searchColor?status=1&&delStatus=0&&search=" + searchStr
                )
                .then(res => {
                    if (res.data.code === 0) {
                        this.color = res.data.data.list;
                    } else {
                        error(res.data.msg);
                    }
                })
                .catch(err => {
                    NetworkAnomaly();
                });
        },
        //模糊查询尺码
        getSize() {
            let search = {
                pidSn: "9|1",
                name: 17 + "|" + this.searchSize
            };
            let searchStr = JSON.stringify(search);
            this.$http
                .post(
                    "/TPA/aYscm/searchSize?status=1&&delStatus=0&&search=" +
                        searchStr
                )
                .then(res => {
                    if (res.data.code === 0) {
                        this.size = res.data.data.list;
                    } else {
                        error(res.data.msg);
                    }
                })
                .catch(err => {
                    NetworkAnomaly();
                });
        },
        //点击选择企划
        getQihua() {
            this.oldMenu = true;
            this.searchSecondTable = "";
            this.list = [];
        },
        //选择需求
        getQihuaItem(item) {
            this.emptyFirstForm();

            this.$http
                .post("/TPA/cSpqhA/getById?id=" + item.id)
                .then(res => {
                    if (res.data.code === 0) {
                        this.firstForm = res.data.data;
                        this.firstForm.layoutId = item.id;
                        this.firstForm.status = "3";
                        this.firstForm.sh = "-1";
                        this.firstForm.sp = "-1";

                        this.oldMenu = false;
                        this.noDisabledSecondForm();
                        this.getStyle();
                        this.getDesigner();
                    } else {
                        error(res.data.msg);
                    }
                })
                .catch(err => {
                    NetworkAnomaly();
                });
        },

        //获取企划子表
        getSearchTable() {
            this.$http
                .post("/TPA/cSpqhA/getBySn?sn=" + this.searchSecondTable)
                .then(res => {
                    if (res.data.code === 0) {
                        this.list = res.data.data;
                    } else {
                        error(res.data.msg);
                    }
                })
                .catch(err => {
                    NetworkAnomaly();
                });
        },
        //点击款式按钮
        getStyleBtn() {
            this.oldStyle = true;
        },
        //点击颜色按钮
        getColorBtn() {
            this.oldColor = true;
            this.searchColor = "";
            this.color = [];
        },
        //点击尺码按钮
        getSizeBtn() {
            this.oldSize = this.searchSize = "";
            this.size = [];
        },
        //选择款式
        getStyleItem(item) {
            this.firstForm.plksSn = item.entity.sn;
            this.firstForm.plksName = item.entity.name;
            this.oldStyle = false;
        },

        //选择颜色
        getColorItem(item) {
            this.firstForm.colorSn = item.sn;
            this.firstForm.colorName = item.name;
            this.firstForm.colorPidName = item.pidName;
            this.oldColor = false;
        },
        //选择尺码
        getSizeItem(item) {
            this.firstForm.sizeSn = item.sn;
            this.firstForm.sizeName = item.name;
            this.firstForm.sizePidName = item.pidName;
            this.oldSize = false;
        },
        //0/1转化成false/true
        elCheckbox(name) {
            if (name == 1) {
                name = true;
            } else if (name == 0) {
                name = false;
            }
            return name;
        },
        //false/true转化成0/1
        elCheckboxs(name) {
            if (name) {
                name = 1;
            } else {
                name = 0;
            }
            return name;
        }
    },
    mounted() {
        this.getYear();
        this.getDateYear()        
        this.getnavMenu();
    },
    watch: {
        //模糊搜索框
        searchSecondTable() {
            if (this.searchSecondTable.length !== 0) {
                this.getSearchTable();
            } else {
                this.searchSecondTableList = [];
            }
        },
        searchColor() {
            if (this.searchColor.length !== 0) {
                this.getColor();
            } else {
                this.color = [];
            }
        },
        searchSize() {
            if (this.searchSize.length !== 0) {
                this.getSize();
            } else {
                this.size = [];
            }
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
.container>>>.el-submenu__title, .container>>>.el-menu-item
    height 3vh
    line-height 3vh
    font-size 1.6vh !important
.container>>>.el-select>.el-input
    display inline-block
.container>>>.el-dialog
    width 500px
    height 500px
    overflow-x hidden
.container>>>.el-dialog__body
    cursor pointer !important
    line-height 3.5vh
    font-weight bold
    padding 1vh 2vh
.container>>>.el-tabs__content
    background url('../../../../static/imgNone.jpg')
    background-repeat no-repeat
    background-size 12vh
    background-position 1vh 1vh
    min-width 50%
    height 30vh
    // background:url("../../../../../static/imgNone.png")
.checkbox
    height 3.5vh
    margin 0.5vh
    line-height 3.5vh
    float left
.qihua_menu li
    span
        width 33%
        float left
        text-align center
        font-size 1.6vh
        white-space nowrap
        overflow hidden
        text-overflow ellipsis
    &:hover
        background #d2d2d2
.mohu
    li
        span
            width 50%
            float left
            padding-left 10%
            font-size 1.6vh
            white-space nowrap
            overflow hidden
            text-overflow ellipsis
        &:hover
            background #d2d2d2
</style>