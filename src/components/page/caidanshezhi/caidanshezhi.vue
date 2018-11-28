<template>
    <div class="container" :class="{container_collapse:collapse}">
        <p class="page_title">菜单设置</p>
        <div class="btn-box">
            <button :disabled='doAdd' :class="{button_btn:!doAdd}" @click="doAdds">新增</button>
            <button :disabled='doSave' :class="{button_btn:!doSave}" @click="dodoSaves">保存</button>
            <button :disabled='doEdit' :class="{button_btn:!doEdit}" @click="doEdits">修改</button>
            <button :disabled="(this.form.status==1||this.form.status==3)" :class="{button_btn:(this.form.status==0)}" @click="doEffectives">有效</button>
            <button :disabled="(this.form.status==0||this.form.status==3)" :class="{button_btn:(this.form.status==1)}" @click="doInvalids">无效</button>
            <button :disabled='doOther' :class="{button_btn:!doOther}" @click="doImports">导入</button>
            <button :disabled='doOther' :class="{button_btn:!doOther}" @click="doExports">导出</button>
            <button :disabled='doCancel' :class="{button_btn:!doCancel}" @click="doCancels">取消</button>
            <button :disabled='doOther' :class="{button_btn:!doOther}" @click="loginout">退出</button>
            <button class="button_btn" @click="refresh">刷新</button>
        </div>
        <div class="set_box">
            <div class="menu_box">
                <el-menu @select="menuSelected" @open="menuSelected" unique-opened background-color="#f2f2f2" text-color="#303133" active-text-color="#303133">
                    <nav-menu :navMenus="this.navMenus"></nav-menu>
                </el-menu>
            </div>
            <div class="set_info">
                <ul>
                    <li class="menuLi">
                        <label>上级菜单</label>
                        <div class="menu">
                            <input type="text" readonly class="num" v-model="form.pidSn" :disabled='menuBtn' placeholder="顶级">
                            <input type="text" readonly class="old_menu" v-model="form.pidName" :disabled='menuBtn' placeholder="顶级">
                            <button class="menu_btn" @click="open_box" :disabled='menuBtn'>。。。</button>
                        </div>
                    </li>
                    <li>
                        <label>菜单名称</label>
                        <input type="text" v-model="form.name" :disabled='menuNanme'>
                    </li>
                    <li>
                        <label>编号</label>
                        <input type="text" v-model="form.sn" :disabled='menuNum' placeholder="自动生成">
                    </li>
                    <li>
                        <label>路径</label>
                        <input type="text" v-model="form.lj" :disabled='menuLj'>
                    </li>
                    <li>
                        <label>接品参数</label>
                        <input type="text" v-model="form.jkcs" :disabled='menuParameter'>
                    </li>
                    <li class="last">
                        <label>排序</label>
                        <input type="text" v-model="form.sort" :disabled='menuParameter'>
                    </li>
                    <li class="radioLi">
                        <label>状态</label>
                        <el-radio-group v-model="form.status" disabled>
                            <el-radio :label="1">有效</el-radio>
                            <el-radio :label="0">无效</el-radio>
                        </el-radio-group>
                    </li>
                </ul>
            </div>
        </div>
        <div class="pageBox" :class="{collapse:collapse}">
            <ul>
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
            </ul>
        </div>

        <el-dialog title="上级菜单" :visible.sync="oldMenu">
            <ul class="srcond_menu">
                <li v-if="navMenus.length===0">暂无数据</li>
                <li v-for="(item,i) in navMenus" :key="i">
                    <span @click="getOldMenu(item)">{{item.entity.name}}</span>
                    <div class="second" v-if="item.childs.length!=0">
                        <p @click="getOldMenu(items)" v-for="(items,i) in item.childs" :key="i" :index="String(items.entity.sn)">{{items.entity.name}}</p>
                    </div>
                </li>
            </ul>
        </el-dialog>

        <!-- 导入弹窗 -->
        <el-dialog class="importExport" title="导入" :visible.sync="importbox" width="30%" :showClose="false" :show-file-list="false">
            <a class="down" href="/TPA/bCdLr/downExcel">下载导入模板</a>
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

import NavMenu from "./NavMenu";
import qs from "qs";
import {
    NetworkAnomaly,
    succ,
    error,
    getOut
} from "../../../assets/js/message.js";
export default {
    name: "caidanshezhi",
    data() {
        return {
           //导入弹出开关
            importbox: false,
            importZhe: false, //导入遮罩
            isCover:false,      //默认导入不覆盖
            project:"",         //错误文件名
            //上传的文件
            fileList: [],
            Tips:"",               //错误提示
            tipOffON: false,        //错误文件下载开关

            //选取的当前菜单的index
            selectMenu: "",

            //表单禁用开关
            menuNum: true,
            menuNanme: true,
            menuBtn: true,
            menuParameter: true,
            menuLj: true,
            menuZt: true,

            //弹出窗开关
            oldMenu: false,

            //查询的时候保存状态，防止修改的时候
            formZt: "",

            //操作按钮开关
            doAdd: false,
            doEdit: true,
            doOther: false,
            doState: true,
            doSave: true,
            doCancel: true,

            //判断当前保存操作  true新增false修改
            AddEdit: true,

            form: {
                id: "",
                sn: "",
                name: "",
                pidSn: "",
                pidName: "",
                jkcs: "",
                addDate: "",
                addUser: "",
                updateUser: "",
                updateDate: "",
                lj: "",
                status: "3",
                sort: ""
            },
            navMenus: []
        };
    },
    computed: {
        ...mapState(["collapse"])
    },
    mounted() {
        this.getnavMenu();
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
            this.importZhe = true;
        },
        //自定义上传
        uploadFile(params) {
            const _file = params.file;
            let formData = new FormData();
            formData.append("file", _file);
                this.$ajax
                    .post("/TPA/bCdLr/importExcel", formData)
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
            window.location.href = "/TPA/bCdLr/exportExcel";
        },
        

        //刷新
        refresh() {
            this.getnavMenu();

            this.emptyBtn();
            this.emptyform();
            this.disablesForm();

            succ("刷新成功");
        },
        //新增
        doAdds() {
            this.emptyBtnTo();
            this.emptyform();
            this.doSave = false;

            this.menuBtn = false;
            this.menuNanme = false;
            this.menuParameter = false;
            this.menuZt = false;
            this.menuLj = false;
            this.AddEdit = true;
            this.menuZt = true;
        },
        //修改
        doEdits() {
            this.emptyBtnTo();
            this.doSave = false;
            this.doCancel = false;
            this.doState = false;

            this.AddEdit = false;

            this.menuParameter = false;
            this.menuZt = false;
            this.menuLj = false;
        },
        //保存
        dodoSaves() {
            this.oldMenu = false;
            if (this.AddEdit) {
                if (this.form.name.length === 0) {
                    error("菜单不能为空！");
                } else if (this.form.lj.length === 0) {
                    error("路径不能为空！");
                } else {
                    this.$http
                        .post("/TPA/bCdLr/insert", qs.stringify(this.form))
                        .then(res => {
                            if (res.data.code === 0) {
                                succ("新增成功!");
                                this.getnavMenu();
                                this.menuBtn = true;
                                this.menuNum = true;
                                this.form = {};
                                this.form.pidSn = res.data.data.pidSn;
                                this.form.pidName = res.data.data.pidName;
                                this.form.status = "3";
                                this.doCancel = false;
                                this.doAdd = false;
                            } else {
                                error(res.data.msg);
                            }
                        })
                        .catch(err => {
                            NetworkAnomaly();
                        });
                }
            } else {
                if (this.form.name.length === 0) {
                    error("菜单不能为空！");
                } else if (this.form.lj.length === 0) {
                    error("路径不能为空！");
                } else {
                    let params = qs.stringify(this.form);
                    this.$http
                        .post("/TPA/bCdLr/update/", params)
                        .then(res => {
                            if (res.data.code === 0) {
                                succ("修改成功！");
                                this.getnavMenu();
                                this.emptyBtn();
                                this.disablesForm();
                                this.doEdit = false;
                                this.doCancel = false;
                                let addUser = this.form.addUser;
                                let addDate = this.form.addDate;
                                let sn = this.form.sn;
                                let name = this.form.name;
                                let pidSn = this.form.pidSn;
                                this.form = res.data.data;
                                this.form.status = this.formZt;
                                this.form.addUser = addUser;
                                this.form.addDate = addDate;
                                this.form.sn = sn;
                                this.form.name = name;
                                this.form.pidSn = pidSn;
                            } else {
                                error(res.data.msg);
                            }
                        })
                        .catch(err => {
                            NetworkAnomaly();
                        });
                    this.menuNum = true;
                    this.menuBtn = true;
                    this.menuParameter = true;
                    this.doSave = true;
                    this.menuLj = true;
                }
            }
        },
        //有效按钮
        doEffectives() {
            let params = {
                id: this.form.id,
                status: 1
            };
            this.$http
                .post("/TPA/bCdLr/status/", qs.stringify(params))
                .then(res => {
                    if (res.status === 200 && res.data.code === 0) {
                        succ(res.data.msg);
                        this.form.status = params.status;
                        console.log(this.form.status);
                        this.getnavMenu();
                        this.getnavMenu();
                        this.emptyBtn();
                        this.disablesForm();
                        this.doEdit = false;
                        this.doCancel = false;
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
                status: 0
            };
            this.$http
                .post("/TPA/bCdLr/status/", qs.stringify(params))
                .then(res => {
                    if (res.status === 200 && res.data.code === 0) {
                        succ(res.data.msg);
                        this.form.status = params.status;
                        console.log(this.form.status);
                        this.getnavMenu();
                        this.getnavMenu();
                        this.emptyBtn();
                        this.disablesForm();
                        this.doEdit = false;
                        this.doCancel = false;
                    } else {
                        error(res.data.msg);
                    }
                })
                .catch(err => {
                    NetworkAnomaly();
                });
        },
        //取消
        doCancels() {
            this.emptyBtn();
            this.selectMenu = "";
            this.emptyform();
        },
        //关闭弹出框
        close_box() {
            this.oldMenu = false;
        },
        //打开弹出框
        open_box() {
            this.oldMenu = true;
        },
        //获取全部菜单
        getnavMenu() {
            this.$http
                .post("/TPA/bCdLr/tree/")
                .then(res => {
                    if (res.status == 200 && res.data.code === 0) {
                        this.navMenus = res.data.data.childs;
                    } else {
                        error(res.data.msg);
                    }
                })
                .catch(err => {
                    NetworkAnomaly();
                    //   this.emptyform();
                    //   this.emptyBtn();
                });
        },
        //选择上级菜单
        getOldMenu(item) {
            this.form.pidSn = item.entity.sn;
            this.form.pidName = item.entity.name;
            this.oldMenu = false;
        },

        //表单恢复初始空值状态
        emptyform() {
            this.disablesForm();
            this.form = {
                sn: "",
                name: "",
                pidSn: "",
                pidName: "",
                jkcs: "",
                addDate: "",
                addUser: "",
                updateUser: "",
                updateDate: "",
                lj: "",
                status: "3"
            };
        },
        //禁用表单
        disablesForm() {
            this.menuNanme = true;
            this.menuBtn = true;
            this.menuParameter = true;
            this.menuZt = true;
            this.menuLj = true;
            this.AddEdit = true;
        },
        //退出
        loginout() {
            this.$emit("getOut", this.$route.name);
        },
        //按钮初始状态
        emptyBtn() {
            this.doAdd = false;
            this.doEdit = true;
            this.doOther = false;
            this.doState = true;
            this.doSave = true;
            this.doCancel = true;

            this.oldMenu = false;
        },
        //btn按钮按下之后按钮的状态
        emptyBtnTo() {
            this.doAdd = true;
            this.doEdit = true;
            this.doOther = true;
            this.doState = true;
            this.doSave = true;
            this.doCancel = false;

            this.oldMenu = false;
        },
        //接收子组件的index
        getSelected(data) {
            this.selectMenu = data;
        },
        //选择当前导航
        menuSelected(index) {
            this.oldMenu = false;
            this.$http
                .post("/TPA/bCdLr/get/?id=" + index)
                .then(res => {
                    if (res.status === 200 && res.data.code === 0) {
                        this.form = {};
                        this.form = res.data.data;
                        this.form.status = parseInt(res.data.data.status);
                        this.formZt = this.form.status;
                        this.emptyBtnTo();
                        this.disablesForm();
                        this.doEdit = false;
                        this.doAdd = false;
                        console.log(this.form);
                    } else {
                        error(res.data.msg);
                    }
                })
                .catch(err => {
                    NetworkAnomaly();
                });
        }
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
    components: {
        NavMenu
    }
};
</script>

<style lang="stylus" scoped>
.container>>>.el-dialog
    width 400px
    height 400px
    overflow-x hidden
.container>>>.el-dialog__body
    cursor pointer !important
    line-height 2.5vh
    font-weight bold
    padding 10px 20px
.container>>>.el-submenu__title, .silder>>>.el-menu-item
    height 3vh
    line-height 3vh
    font-size 1.6vh !important
.container>>>.el-radio__label
    font-size 1.6vh
.menu_box
    width 12%
.set_info
    width 88%
li
    width 49%
    margin 1vh 0
    float left
    &.last
        width 20%
        label
            width 20%
        .el-date-editor
            width 190px
            margin-left 10px
    &.radioLi
        width 22%
        margin-left 1%
        label
            width auto
            padding 0 0.5vh 0 0
        .el-radio
            margin 0 0.8vh 0 0
            font-size 1.6vh !important
    &.menuLi
        width 49%
        label
            width 25%
    .num
        width 20%
        float left
    .old_menu
        width 55%
        float left
        margin-left 0.5vh
    .menu_btn
        width 15%
        float right
        height 3.5vh
        border 0.1vh solid #d2d2d2
        background none
        margin-left 10px
        line-height 3.5vh
        text-align center
        border-radius 0.5vh
        cursor pointer
    label
        line-height 3.5vh
        font-size 1.6vh
        width 25%
        padding-left 5%
        display block
        float left
        text-align center
    input
        width 75%
        height 3.5vh
        line-height 3.5vh
        border 0.1vh solid #d2d2d2
        outline none
        float right
        padding-left 10px
    .menu
        width 75%
        height 3.5vh
        float right
.pageBox
    width 100vw
    height 4vh
    border-radius 0.2vh
    background #f2f2f2
    li
        float left
        height 4vh !important
        margin 0
        width auto !important
        span
            line-height 4vh !important
            padding 0 0.5vh
            float left
            display block
            font-size 1.4vh
            color #444444
    .el-pagination
        padding 0.6vh
.srcond_menu
    li
        width 100%
        margin 0 0
        height auot !important
        span
            cursor pointer
            font-size 1.6vh
            font-weight bold
            line-height 2.5vh
            width 100%
            display block
            // background #d2d2d2
</style>
