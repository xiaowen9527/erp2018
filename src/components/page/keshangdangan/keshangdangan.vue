<template>
    <div class="container" :class="{container_collapse:collapse}">
        <p class="page_title">客商档案</p>
        <div class="btn-box">
            <button :disabled='doAdd' :class="{button_btn:!doAdd}" @click="doAdds">新增</button>
            <button :disabled='doSave' :class="{button_btn:!doSave}" @click="doSaves">保存</button>
            <button :disabled='doEdit' :class="{button_btn:!doEdit}" @click="doEdits">修改</button>
            <button :disabled='doDelete' :class="{button_btn:!doDelete}" @click="doDeletes">删除</button>
            <button :disabled='doCancel' :class="{button_btn:!doCancel}" @click="doCancels">取消</button>
            <button class="button_btn" @click="refresh">刷新</button>
            <div class="btn_right">
                <button :disabled="doOut" :class="{button_btn:!doOut}" @click="doOuts">退出</button>
                <button :disabled="doExamine" :class="{button_btn:!doExamine}" @click="doExamines">审核</button>
                <button :disabled="doExamineAgain" :class="{button_btn:!doExamineAgain}" @click="doExamineAgains">反审</button>
                <button :disabled="(this.form.status==1||this.form.status==3)" :class="{button_btn:(this.form.status==0)}" @click="doEffectives">有效</button>
                <button :disabled="(this.form.status==0||this.form.status==3)" :class="{button_btn:(this.form.status==1)}" @click="doInvalids">无效</button>
                <button :disabled="doExport" :class="{button_btn:!doExport}" @click="doExports">导出</button>
                <button :disabled="doImport" :class="{button_btn:!doImport}" @click="doImports">导入</button>
            </div>
        </div>
        <div class="set_box">
            <div class="menu_box">
                <el-menu unique-opened @select="menuSelected" @open="menuSelected" background-color="#f2f2f2" text-color="#303133" active-text-color="#303133">
                    <nav-menu :navMenus="this.navMenus"></nav-menu>
                </el-menu>
            </div>
            <div class="set_info">
                <ul>
                    <li>
                        <label>性质</label>
                        <input type="text" v-model="form.nature" :disabled="doSave" @click="handleType" readonly placeholder="请选择">
                    </li>
                    <li>
                        <label>合作范围</label>
                        <input type="text" v-model="form.hzfw" :disabled="doSave">
                    </li>
                    <li>
                        <label>编号</label>
                        <input type="text" v-model="form.sn" :disabled="formNo">
                    </li>
                    <li>
                        <label>名称</label>
                        <input type="text" v-model="form.name" :disabled="formNo">
                    </li>
                    <li>
                        <label>简称</label>
                        <input type="text" v-model="form.jc" :disabled="doSave">
                    </li>
                    <li>
                        <label>承运物流</label>
                        <input type="text" v-model="form.cywl" :disabled="doSave">
                    </li>
                    <li>
                        <label>收货地址</label>
                        <input type="text" v-model="form.shdz" :disabled="doSave">
                    </li>
                    <li>
                        <label>价格类型</label>
                        <!-- <input type="text" v-model="form.jglx" :disabled="doSave"> -->
                        <el-select v-model="form.jglx" placeholder="请选择" :disabled="doSave">
                            <el-option v-for="item in jglxList" :key="item.name" :label="item.name" :value="item.name"> </el-option>
                        </el-select>
                    </li>
                    <li>
                        <label>授信额度</label>
                        <input type="number" v-model="form.sxed" :disabled="doSave" placeholder="只允许输入数字">
                    </li>
                    <li>
                        <label>地址</label>
                        <input type="text" v-model="form.dz" :disabled="doSave">
                    </li>
                    <li>
                        <label>EMAIL</label>
                        <input type="text" v-model="form.email" :disabled="doSave">
                    </li>
                    <li>
                        <label>电话</label>
                        <input type="text" v-model="form.tel" :disabled="doSave">
                    </li>
                    <li>
                        <label>传真</label>
                        <input type="text" v-model="form.fax" :disabled="doSave">
                    </li>
                    <li>
                        <label>网址</label>
                        <input type="text" v-model="form.wz" :disabled="doSave">
                    </li>
                    <li>
                        <label>联系人</label>
                        <input type="text" v-model="form.lxr" :disabled="doSave">
                    </li>
                    <li>
                        <label>纳税号</label>
                        <input type="text" v-model="form.nsh" :disabled="doSave">
                    </li>
                    <li>
                        <label>客商类别</label>
                        <input type="text" v-model="form.type" :disabled="doSave" @click="handleNature" readonly placeholder="请选择">
                    </li>
                    <li class="company">
                        <label>归属公司</label>
                        <input type="text" readonly class="companyNum" placeholder="顶级" v-model="form.gsSn" :disabled="gui">
                        <input type="text" readonly class="companyName" placeholder="顶级" v-model="form.gsName" :disabled="gui">
                        <button @click="open_box" :disabled="gui">。。。</button>
                    </li>
                    <li class="status">
                        <label>状态</label>
                        <el-radio label="1" v-model="form.status" :disabled="formZt">有效</el-radio>
                        <el-radio label="0" v-model="form.status" :disabled="formZt">无效</el-radio>
                    </li>
                </ul>
            </div>
        </div>
        <div class="pageBox" :class="{collapse:collapse}">
            <ul>
                <li>
                    <span>编制人：</span>
                    <span>{{this.form.zxRen}}</span>
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
            </ul>
        </div>
        <el-dialog title="归属公司" :visible.sync="oldMenu">
            <ul class="srcond_menu">
                <li v-if="guiCompany.length===0">暂无数据</li>
                <li v-for="(item,i) in guiCompany" :key="i">
                    <span @click="getDepartmentName(item)">|--{{item.name}}</span>
                </li>
            </ul>
        </el-dialog>
        <el-dialog title="性质" :visible.sync="typeStatus">
            <ul class="srcond_menu">
                <li v-if="typeList.length===0">暂无数据</li>
                <li v-for="(item,i) in typeList" :key="i">
                    <span @click="getType(item)">{{item.name}}</span>
                </li>
            </ul>
        </el-dialog>
        <el-dialog title="客商类别" :visible.sync="natureStatus">
            <ul class="srcond_menu">
                <li v-if="NatureList.length===0">暂无数据</li>
                <li v-for="(item,i) in NatureList" :key="i">
                    <span @click="getNature(item)">{{item.name}}</span>
                </li>
            </ul>
        </el-dialog>
    
        <!-- 导入弹窗 -->
        <el-dialog class="importExport" title="导入" :visible.sync="importbox" width="30%" :showClose="false" :show-file-list="false">
            <a class="down" href="/TPA/aKsDa/downExcel">下载导入模板</a>
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
    import {
        mapState
    } from "vuex";
    import '@/assets/js/import.js' //导入请求超时拦截
    import NavMenu from "./NavMenu";
    import qs from "qs";
    import {
        NetworkAnomaly,
        succ,
        error,
        getOut
    } from "../../../assets/js/message.js";
    export default {
        name: "keshangdangan",
        data() {
            return {
                //导入弹出开关
                importbox: false,
                importZhe: false, //导入遮罩
                isCover: false, //默认导入不覆盖
                project: "", //错误文件名
                //上传的文件
                fileList: [],
                Tips: "", //错误提示
                tipOffON: false, //错误文件下载开关
    
                //选取的当前菜单的index
                selectMenu: "",
    
                //操作按钮开关
                doAdd: false,
                doEdit: true,
                doDelete: true,
                doSave: true,
                doCancel: true,
    
                doOut: false,
                doExamine: true,
                doExamineAgain: true,
                doImport: false,
                doExport: false,
                doEffective: true,
                doInvalid: true,
                formZt: true,
    
                gui: true,
                formNo: true,
    
                //焦点状态和数组
                typeStatus: false,
                natureStatus: false,
    
                typeList: [],
                NatureList: [],
    
    
                //保存新增状态开关  新增true/修改false
                addEdit: true,
    
                navMenus: [],
                oldMenu: false,
                form: {
                    type: "", //客户性质
                    hzfw: "", //合作范围
                    gsSn: "", //归属公司编号
                    gsName: "", //归属公司名称
                    sn: "", //编号
                    name: "", //名称
                    jc: "", //简称
                    cywl: "", //承运物流
                    shdz: "", //收货地址
                    jglx: "", //价格类型
                    sxed: "", //授信额度
                    dz: "", //地址
                    email: "", //eamil
                    tel: "", //电话
                    fax: "", //传真
                    wz: "", //网址
                    lxr: "", //联系人
                    nsh: "", //纳税号
                    nature: "", //公司性质
                    status: "3",
                    addDate: "",
                    addUser: "",
                    updateDate: "",
                    updateUser: ""
                },
                jglxList:[],
                guiCompany: [],
                //弹出框公司列表
                list: []
            };
        },
        methods: {
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
                    .post("/TPA/aKsDa/importExcel", formData)
                    .then(res => {
                        console.log(res);
                        if (res.status === 200) {
                            if (res.data.code === 0) {
                                succ(res.data.msg);
                                this.getnavMenu();
                                this.importCancel();
                                this.$refs.upload.clearFiles();
                            } else if (res.data.code === 100) {
                                this.tipOffON = true;
                                this.project = res.data.attachment.name
                                this.Tips = res.data.msg
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
                let errUrl = '/TPA/aImportExcel/exportMsg?name=' + this.project
                // console.log(errUrl)
                window.location.href = errUrl;
                setTimeout(() => {
                    this.tipOffON = false;
                    this.importCancel();
                }, 500)
            },
            //导出
            doExports() {
                window.location.href = "/TPA/aKsDa/exportExcel";
            },
    
    
            //刷新
            refresh() {
    
                this.emptyBtn()
                this.emptyform()
                this.getnavMenu()
                this.guiCompany = []
                succ('刷新成功')
            },
            //新增
            doAdds() {
                this.emptyBtnTo();
                this.doSave = false;
                this.addEdit = true;
                this.gui = false
                this.formNo = false
                
                this.jglxList = []
                this.getjglxList()
            },
            //保存
            doSaves() {
                this.oldMenu = false
                if (this.form.gsName.length === 0) {
                    error("请选择归属公司");
                } else if (this.form.type.length === 0) {
                    error("客户性质不能为空");
                } else if (this.form.sn.length === 0) {
                    error("编号不能为空");
                } else if (this.form.name.length === 0) {
                    error("名称不能为空！");
                } else {
                    if (this.addEdit) {
                        //新增
                        this.$http
                            .post("/TPA/aKsDa/insert", qs.stringify(this.form))
                            .then(res => {
                                if (res.data.code === 0) {
                                    succ(res.data.msg);
                                    let gsSn = this.form.gsSn
                                    let gsName = this.form.gsName
                                    this.form = {}
                                    this.form.gsSn = gsSn
                                    this.form.gsName = gsName
                                    this.form.status = "3"
                                    this.gui = true
                                    this.doAdd = false
                                    this.getnavMenu();
                                } else {
                                    error(res.data.msg);
                                }
                            })
                            .catch(err => {
                                NetworkAnomaly();
                            });
                    } else {
                        //修改
                        this.$http
                            .post("/TPA/aKsDa/update", qs.stringify(this.form))
                            .then(res => {
                                if (res.data.code === 0) {
                                    succ(res.data.msg);
                                    let status = this.form.status;
                                    let addUser = this.form.addUser
                                    let addDate = this.form.addDate
                                    let sn = this.form.sn
                                    let name = this.form.name
                                    this.form = res.data.data;
                                    this.form.status = status;
                                    this.form.addUser = addUser
                                    this.form.addDate = addDate
                                    this.form.sn = sn
                                    this.form.name = name
                                    this.emptyBtnTo();
                                    this.doEdit = false;
                                    this.doExamine = false;
                                    this.doExamineAgain = false;
                                    this.doDelete = false;
                                    this.getnavMenu();
    
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
            //修改
            doEdits() {
                this.emptyBtnTo();
                this.doSave = false;
                this.doCancel = false;
                this.addEdit = false;
            },
            //取消
            doCancels() {
                this.emptyBtn();
                this.emptyform();
                this.doSave = true;
    
            },
            //退出
            doOuts() {
                this.$emit("getOut", this.$route.name);
            },
            //审核
            doExamines() {},
            //反审
            doExamineAgains() {},
            //有效按钮
            doEffectives() {
                let params = {
                    id: this.form.id,
                    status: "1"
                };
                this.$http
                    .post("/TPA/aKsDa/status", qs.stringify(params))
                    .then(res => {
                        if (res.data.code === 0) {
                            this.form.status = params.status;
                            succ(res.data.msg);
                            this.doAdd = false
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
                    id: this.form.id,
                    status: "0"
                };
                this.$http
                    .post("/TPA/aKsDa/status", qs.stringify(params))
                    .then(res => {
                        if (res.data.code === 0) {
                            this.form.status = params.status;
                            succ(res.data.msg);
                            this.doAdd = false
                        } else {
                            error(res.data.msg);
                        }
                    })
                    .catch(err => {
                        NetworkAnomaly();
                    });
    
            },
            //删除按钮
            doDeletes() {
                this.$http
                    .post("/TPA/aKsDa/delete?id=" + this.form.id)
                    .then(res => {
                        if (res.data.code === 0) {
                            succ(res.data.msg);
                            this.getnavMenu()
                            this.emptyBtn()
                            this.emptyform()
                            this.doSave = true
                            this.form.status = "3"
                        } else {
                            error(res.data.msg);
                        }
                    })
                    .catch(err => {
                        NetworkAnomaly();
                    });
    
            },
            //获取性质
            handleType() {
                this.$http
                    .post("/TPA/aLbJb/getBySn?sn=015")
                    .then(res => {
                        if (res.data.code === 0) {
                            console.log(res);
                            this.typeList = res.data.data;
                            this.typeStatus = true;
                        } else {
                            error(res.data.msg);
                        }
                    })
                    .catch(err => {
                        error(res.msg);
                    });
            },
            //选择性质
            getType(item) {
                this.form.nature = item.name;
                this.typeStatus = false;
            },
            //获取客商类别
            handleNature() {
                this.$http
                    .post("/TPA/aLbJb/getBySn?sn=024")
                    .then(res => {
                        if (res.data.code === 0) {
                            console.log(res);
                            this.NatureList = res.data.data;
                            this.natureStatus = true;
                        } else {
                            error(res.data.msg);
                        }
                    })
                    .catch(err => {
                        error(res.msg);
                    });
            },
            //选择类别
            getNature(item) {
                this.form.type = item.name;
                this.natureStatus = false;
            },
            //获取价格类型
            getjglxList(){
                this.$http.post('/TPA/aLbJb/getBySn?sn=005')
                    .then(res=>{
                        if(res.data.code===0){
                            this.jglxList = res.data.data
                        }else{
                            error(res.data.msg)
                        }
                    })
                    .catch(err=>{
                        NetworkAnomaly()
                    })
            },
    

            //获取导航
            getnavMenu() {
                this.$http
                    .post("/TPA/aKsDa/tree")
                    .then(res => {
                        if (res.data.code === 0) {
                            console.log(res);
    
                            this.navMenus = res.data.data.childs;
                        } else {
                            error(res.data.msg);
                        }
                    })
                    .catch(err => {
                        console.log(0);
    
                    });
            },
            //导航点击获取当前公司信息
            menuSelected(index) {
                if (index.length < 10) {
                    this.$http("/TPA/aKsDa/get?id=" + index)
                        .then(res => {
                            if (res.data.code === 0) {
                                this.form = res.data.data;
                                this.emptyBtnTo();
                                this.doEdit = false;
                                this.doDelete = false
                                this.doExamine = false;
                                this.doExamineAgain = false;
                                this.doAdd = false
                            } else {
                                error(res.data.msg);
                            }
                        })
                        .catch(err => {
                            NetworkAnomaly();
                        });
                }
            },
            //打开弹出框
            open_box() {
                this.oldMenu = true;
                this.$http.post('/TPA/aGsJbxx/search?status=1&delStatus=0')
                    .then(res => {
                        if (res.status === 200 && res.data.code === 0) {
                            this.guiCompany = res.data.data.list
                        } else {
                            error(res.data.msg)
                        }
                    })
                    .catch(err => {
                        NetworkAnomaly()
                    })
            },
            //关闭弹出框
            close_box() {
                this.oldMenu = false;
            },
            //点击归属部门列表item获取归属部门的编号和名称
            getDepartmentName(item) {
                this.form.gsName = item.name;
                this.form.gsSn = item.sn;
                this.oldMenu = false;
            },
            //按钮初始状态
            emptyBtn() {
                this.doAdd = false;
                this.doEdit = true;
                this.doDelete = true;
                this.doSave = true;
                this.doCancel = true;
    
                this.doExamine = true;
                this.doExamineAgain = true;
                this.doImport = false;
                this.doExport = false;
                this.doEffective = true;
                this.doInvalid = true;
    
                this.gui = true
                this.formNo = true
    
                this.oldMenu = false
            },
            //btn按钮按下之后按钮的状态
            emptyBtnTo() {
                this.doAdd = true;
                this.doEdit = true;
                this.doDelete = true;
                this.doSave = true;
                this.doCancel = false;
                this.formNo = true
    
                this.doExamine = true;
                this.doExamineAgain = true;
                this.doImport = true;
                this.doExport = true;
                this.doEffective = true;
                this.doInvalid = true;
    
                this.gui = true
                this.formNo = true
                this.oldMenu = false
            },
            //表单清空
            emptyform() {
                this.form = {
                    type: "", //客户性质
                    hzfw: "", //合作范围
                    gsSn: "", //归属公司编号
                    gsName: "", //归属公司名称
                    sn: "", //编号
                    name: "", //名称
                    jc: "", //简称
                    cywl: "", //承运物流
                    shdz: "", //收货地址
                    jglx: "", //价格类型
                    sxed: "", //授信额度
                    dz: "", //地址
                    email: "", //eamil
                    tel: "", //电话
                    fax: "", //传真
                    wz: "", //网址
                    lxr: "", //联系人
                    nsh: "", //纳税号
                    nature: "", //公司性质
                    status: "3",
                    addDate: "",
                    addUser: "",
                    updateDate: "",
                    updateUser: ""
                };
            }
        },
        mounted() {
            this.getnavMenu();
        },
        watch: {
            tipOffON() {
                if (this.tipOffON === false) {
                    console.log(0);
                }
            },
            importbox() {
                if (this.importbox === false) {
                    this.$refs.upload.clearFiles();
                }
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
.container>>>.el-submenu__title, .container>>>.el-menu-item
    height 3vh
    line-height 3vh
    font-size 1.6vh !important
.container>>>.el-dialog
    width 400px
    height 400px
    overflow-x hidden
.container>>>.el-dialog__body
    cursor pointer !important
    line-height 2.5vh
    font-weight bold
    padding 1vh 2vh
.container>>>.el-radio__label
    font-size 1.6vh 
.container>>>.el-select,.container>>>.el-input__inner
    height 3.5vh !important
    line-height 3.5vh
.menu_box
    width 20%
.set_info
    width 80%
    li
        float left
        width 32.5%
        margin 1vh 0
        height 3.5vh
        &.company
            width 60%
            label
                padding-left 8% !important
        &.status
            width 33%
            label
                padding 0 !important
                width 20%
        label
            width 30%
            display block
            float left
            height 3.5vh
            line-height 3.5vh
            text-align left
            padding-left 10%
        input
            width 70%
            line-height 3.5vh
            float left
            height 3.5vh
            padding-left 1vh
            border .1vh solid #d2d2d2
            &.companyNum
                width 15%
                margin-right .5vh
            &.companyName
                width 40%
                margin-right .5vh
        button
            width 50px
            height 3.5vh
            border .1vh solid #d2d2d2
            background none
            margin-right .5vh
            line-height 3.5vh
            text-align center
            border-radius .5vh
            cursor pointer
            margin-top 2px
.searchBox
    height 3vh
    margin-left 3.5vh
    width 30vh
    float left
    position relative
    input
        width 20vh
        height 3vh
        line-height 3vh
        float left
        margin-top 3px
        padding-left 1vh
        border .1vh solid #d2d2d2
        border-radius .4vh
    button
        padding 0 2.5vh
        height 3vh
        line-height 3vh
        background #ffffff
        font-size 1.2vh
        display block
        text-align center
        margin-left 1vh
        text-decoration underline
        cursor pointer
        border-radius .4vh
    .searchList
        width 20vh
        height 30vh
        border .1vh solid #d2d2d2
        position absolute
        top 3.5vh
        left 0
        z-index 999
        background #ffffff
        overflow-x hidden
        .second
            margin-left 2em
            p
                cursor pointer
        .searchFirst
            font-weight 1000
            color #444
            font-size 1.5vh
            cursor pointer
            display block
            width 100%
            line-height 2.5vh
            padding 0 1vh
    .searchSecond
        padding-left 2em
        cursor pointer
        line-height 2.5vh
        height 2.5vh
        display block
        font-weight 600
        font-size 1.4vh
    .searchThird
        padding-left 4em
        cursor pointer
        line-height 2.5vh
        height 2.5vh
        font-size 13px
        display block
        font-weight 400
.oldMenu_box
    width 30vh
    height 400px
    position fixed
    top 0
    bottom 0
    left 0
    right 0
    margin auto
    border .1vh solid #ccc
    background #fff
    z-index 9999
    .oldMenu_box_close
        font-size 20px
        position absolute
        top -1vh
        right -1vh
        z-index 999999
        background #ffffff
        cursor pointer
    .srcond_menu
        width 30vh
        height auto
        height 400px
        overflow-x hidden
        padding 1vh 20px
        span
            cursor pointer
            font-size 1.4vh
            font-weight bold
            line-height 2.5vh
        .second
            margin-left 2em
            p
                font-size 1.4vh
                color #444
                line-height 20px
                cursor pointer
</style>