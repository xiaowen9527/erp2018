<template>
    <div class="container" :class="{container_collapse:collapse}">
        <p class="page_title">尺码档案</p>
        <div class="btn-box">
            <button :disabled='doAdd' :class="{button_btn:!doAdd}" @click="doAdds">新增</button>
            <button :disabled='doEdit' :class="{button_btn:!doEdit}" @click="doEdits">修改</button>
            <button :disabled='doImport' :class="{button_btn:!doImport}" @click="doImports">导入</button>
            <button :disabled='doExport' :class="{button_btn:!doExport}" @click="doExports">导出</button>
            <button :disabled="(this.form.status==1||this.form.status==3)" :class="{button_btn:(this.form.status==0)}" @click="doEffectives">有效</button>
            <button :disabled="(this.form.status==0||this.form.status==3)" :class="{button_btn:(this.form.status==1)}" @click="doInvalids">无效</button>
            <button :disabled='doOut' :class="{button_btn:!doOut}" @click="doOuts">退出</button>
            <button :disabled='doDelete' :class="{button_btn:!doDelete}" @click="doDeletes">删除</button>
            <button :disabled='doCancel' :class="{button_btn:!doCancel}" @click="doCancels">取消</button>
            <button class="button_btn" @click="refresh">刷新</button>
        </div>
        <div class="set_box">
            <div class="menu_box">
                <el-tree  v-if="hackReset&&navMenus.length>0" accordion v-for="(item,index) in nav" node-key="id" :key="index" :props="item" :load="loadNode" lazy @node-click="handleNodeClick" highlight-current ref="menu" :expand-on-click-node="true" :check-on-click-node="true">
                </el-tree>
            </div>
            <div class="set_info">
                <div class="info_form">
                    <ul>
                        <li>
                            <label>尺码名称</label>
                            <input type="text" v-model="form.name" :disabled="formNO">
                        </li>
                        <li>
                            <label>尺码编号</label>
                            <input type="text" v-model="form.sn" :disabled="formNO">
                        </li>
                        <li>
                            <label>排序</label>
                            <input type="number" placeholder="只允许输入数字" v-model="form.sort" :disabled="doSave">
                        </li>
                        <li class="menuLi">
                            <label>尺码类别</label>
                            <input placeholder="顶级" v-model="form.pidSn" :disabled="gui" readonly class="first">
                            <input placeholder="顶级" v-model="form.pidName" :disabled="gui" readonly>
                            <button :disabled="gui" @click="open_box">。。。</button>
                        </li>
                        <button class="save" :disabled="doSave" :class="{button_btn:!doSave}" @click="addSave">保存</button>
                    </ul>
                </div>
                <div class="order_table">
                    <el-table :data="list" border style="width: 100%">
                        <el-table-column prop="pidName" label="尺码类别" min-width="18%">
                        </el-table-column>
                        <el-table-column prop="name" label="尺码名称" min-width="18%">
                        </el-table-column>
                        <el-table-column prop="sn" label="尺码编号" min-width="18%">
                        </el-table-column>
                        <el-table-column prop="sort" label="顺序" min-width="18%">
                        </el-table-column>
                        <el-table-column fixed="right" label="操作" min-width="28%">
                            <template slot-scope="scope">
                                <el-button @click="handleEdit(scope.$index, scope.row)" type="text">编辑</el-button>
                                <el-button :disabled="(scope.row.status == 1)" :class="{btn:(scope.row.status == 1)}" @click="effective(scope.$index, scope.row)" type="text">有效</el-button>
                                <el-button :disabled="(scope.row.status == 0)" :class="{btn:(scope.row.status == 0)}" @click="invalid(scope.$index, scope.row)" type="text">无效</el-button>
                            </template>
                        </el-table-column>
                    </el-table>
                </div>
            </div>
        </div>
        <div class="pageBox" :class="{collapse:collapse}">
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
            </ul>
            <el-pagination v-if="pageOnOff" background :page-size="pageSize" :pager-count="5" :total="total" @current-change="currentPage">
            </el-pagination>
        </div>
        <el-dialog title="尺码类别" :visible.sync="oldMenu">
            <ul class="srcond_menu">
                <li v-if="navMenus.length===0">暂无数据</li>
                <li v-for="(item,i) in navMenus" :key="i">
                    <span @click="getOldMenu(item)">|--{{item.name}}</span>
                </li>
            </ul>
        </el-dialog>

        <!-- 编辑弹出框 -->
        <el-dialog title="编辑" :visible.sync="editVisible" width="30%">
            <el-form ref="forms" :model="dialog" label-width="100px">
                <el-form-item label="尺码名称">
                    <el-input v-model="dialog.name" disabled></el-input>
                </el-form-item>
                <el-form-item label="尺码编号">
                    <el-input v-model="dialog.sn" disabled></el-input>
                </el-form-item>
                <el-form-item label="顺序">
                    <el-input type="number" v-model="dialog.sort" placeholder="只允许输入数字"></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="editVisible = false">取 消</el-button>
                <el-button type="primary" @click="saveEdit">确 定</el-button>
            </span>
        </el-dialog>

        <!-- 导入弹窗 -->
        <el-dialog class="importExport" title="导入" :visible.sync="importbox" width="30%" :showClose="false" :show-file-list="false">
            <a class="down" href="/TPA/aYscm/downExcelSize">下载导入模板</a>
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
import qs from "qs";
import {
    NetworkAnomaly,
    succ,
    error,
    getOut
} from "../../../assets/js/message.js";
import NavMenu from "./NavMenu";
export default {
    name: "yansedangan",
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

            //按钮开关
            doAdd: false,
            doSave: true,
            doEdit: true,
            doDelete: true,
            doImport: false,
            doExport: false,
            doEffective: false,
            doInvalid: false,
            doOut: false,
            doCancel: true,

            gui: true,
            formNO: true,

            oldMenu: false,

            //保存新增状态开关  新增true/修改false
            addEdit: true,

            //分页：当前页码/总数量/每页显示条数
            page: 0,
            total: "",
            pageSize: 10,
            pageOnOff: false,
            //分页查询第一第二级时候的参数
            pageParams: "",
            //编辑弹窗开关
            editVisible: false,

            nav: [{ label: "name",id:1,isLeaf: 'leaf' }], //  导航显示字段
            navMenus: [],
            hackReset:true,

            list: [],
            //新增表单
            form: {
                id: "",
                pidSn: "", //尺码类别标号
                pidName: "", //尺码类别名称
                name: "", //尺码名称
                sn: "", //尺码编号
                sort: "", //排序
                status: "3"
            },

            //编辑弹窗开关
            editVisible: false,
            idx: 0,
            //编辑弹出框数据
            forms: {},
            dialog: {},
        };
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
                    .post("/TPA/aYscm/importExcelSize", formData)
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
            window.location.href = "/TPA/aYscm/exportExcelSize";
        },

        //刷新
        refresh() {
            this.emptyBtn();
            this.emptyform();
            this.getnavMenu();
            succ("刷新成功");
        },
        //新增
        doAdds() {
            this.doCancels();
            this.emptyBtnTo();
            this.doSave = false;
            this.addEdit = true;
            this.emptyform();
            this.gui = false;
            this.formNO = false;
        },
        //修改
        doEdits() {
            this.emptyBtnTo();
            this.doSave = false;
            this.doCancel = false;
            this.addEdit = false;
        },
        //保存
        addSave() {
            this.oldMenu = false;
            if (this.form.sn.length === 0) {
                error("请输入尺码名称");
            } else if (this.form.sn.length === 0) {
                error("请输入编号");
            } else {
                if (this.form.sort.length === 0) {
                    this.form.sort = 0;
                }
                if (this.addEdit) {
                    this.$http
                        .post("/TPA/aYscm/insertSize", qs.stringify(this.form))
                        .then(res => {
                            if (res.status === 200 && res.data.code === 0) {
                                succ(res.data.msg);
                                let pidSn = this.form.pidSn;
                                let pidName = this.form.pidName;
                                this.form = {};
                                this.form.pidName = pidName;
                                this.form.pidSn = pidSn;
                                this.form.sort = "";
                                this.form.status = "3";
                                this.getnavMenu();
                                this.gui = true;
                                this.doAdd = false;

                                let params = {
                                    pidSn: this.form.pidSn,
                                    page: 0,
                                    count: this.pageSize
                                };
                                this.pageParams = params;
                                if (this.pageParams.pidSn.length === 0) {
                                    this.pageParams.pidSn = -1;
                                }
                                this.$http
                                    .post(
                                        "/TPA/aYscm/searchSize",
                                        qs.stringify(this.pageParams)
                                    )
                                    .then(res => {
                                        if (res.data.code === 0) {
                                            this.list = res.data.data.list;
                                            this.total = res.data.data.total;
                                            if (this.total > this.pageSize) {
                                                this.pageOnOff = true;
                                            }
                                        } else {
                                            error(res.data.msg);
                                        }
                                    })
                                    .catch(err => {
                                        NetworkAnomaly();
                                    });
                            } else {
                                error(res.data.msg);
                            }
                        })
                        .catch(error => {
                            NetworkAnomaly();
                        });
                } else {
                    this.$http
                        .post("/TPA/aYscm/updateSize", qs.stringify(this.form))
                        .then(res => {
                            if (res.status === 200 && res.data.code === 0) {
                                succ(res.data.msg);
                                let status = this.form.status;
                                let addUser = this.form.addUser;
                                let addDate = this.form.addDate;
                                let sn = this.form.sn;
                                let name = this.form.name;
                                let pidSn = this.form.pidSn;
                                let pidName = this.form.pidName;
                                this.form = res.data.data;
                                this.form.status = status;
                                this.form.addUser = addUser;
                                this.form.addDate = addDate;
                                this.form.pidName = pidName;
                                this.form.pidSn = pidSn;
                                this.form.name = name;
                                this.form.sn = sn;
                                this.getnavMenu();
                                this.emptyBtnTo();
                                this.doSave = true;
                                this.doAdd = false;
                                this.doEdit = false;
                            } else {
                                error(res.data.msg);
                            }
                        })
                        .catch(error => {
                            NetworkAnomaly();
                        });
                }
            }
        },
        //有效按钮
        doEffectives() {
            let params = {
                id: this.form.id,
                status: "1"
            };
            this.$http
                .post("/TPA/aYscm/statusSize", qs.stringify(params))
                .then(res => {
                    if (res.data.code === 0) {
                        this.form.status = params.status;
                        succ(res.data.msg);
                        this.doAdd = false;
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
                .post("/TPA/aYscm/statusSize", qs.stringify(params))
                .then(res => {
                    if (res.data.code === 0) {
                        this.form.status = params.status;
                        succ(res.data.msg);
                        this.doAdd = false;
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
                .post("/TPA/aYscm/delete?id=" + this.form.id)
                .then(res => {
                    if (res.data.code === 0) {
                        succ(res.data.msg);
                        this.getnavMenu();
                        this.emptyBtn();
                        this.emptyform();
                        this.doSave = true;
                        this.form.status = "3";
                    } else {
                        error(res.data.msg);
                    }
                })
                .catch(err => {
                    NetworkAnomaly();
                });
        },
        //退出
        doOuts() {
            this.$emit("getOut", this.$route.name);
        },
        //取消
        doCancels() {
            this.emptyBtn();
            this.emptyform();
            this.emptyforms();
            this.pageOnOff = false;
            this.form.status = "3";
        },

        //获取nav
        getnavMenu() {
            this.$http
                .post("/TPA/aYscm/treeSize")
                .then(res => {
                    if (res.data.code === 0) {
                        this.navMenus = res.data.data;
                        this.renav()
                    } else {
                        error(res.data.msg);
                    }
                })
                .catch(err => {
                    NetworkAnomaly();
                });
                
        },
        //强制销毁nav达到更新nav数据目的
        renav(){
            this.hackReset = false
            setTimeout(()=>{
                 this.hackReset = true
            },10)
        },        
        loadNode(node, resolve) {
            if (node.level === 0) {
                return resolve(this.navMenus);
            }
            // 其余节点处理
            if (node.level >= 1) {
                // 注意！把resolve传到你自己的异步中去
                this.getIndex(node, resolve)             
            }
        },
        // 异步加载叶子节点数据函数
        getIndex (node, resolve) {
            this.$http({
                url: "/TPA/aYscm/treeSize",
                params: {sn: node.data.sn}
            }).then(res => {
                if (res.data.code === 0) {
                    let data = res.data.data
                    for(let i in data){
                        data[i].leaf = false
                    }
                    resolve(data)
                }
            })
        },        
        handleNodeClick(data) {
            this.pageOnOff = false;
            //查询自身
            this.$http
                .post("/TPA/aYscm/get?id=" + data.id)
                .then(res => {
                    if (res.data.code === 0) {
                        this.doSave = true;
                        this.form = res.data.data;
                        this.emptyBtnTo();
                        this.doEdit = false;
                        this.doDelete = false;
                        this.doAdd = false;
                    } else {
                        error(res.data.msg);
                    }
                })
                .catch(err => {
                    NetworkAnomaly();
                });


            //查询分页
            let params = {
                pidSn: data.sn,
                page: 0,
                count: this.pageSize
            };
            this.pageParams = params;
            this.$http
                .post("/TPA/aYscm/searchSize", qs.stringify(params))
                .then(res => {
                    if (res.data.code === 0) {
                        this.list = res.data.data.list;
                        this.total = res.data.data.total;
                        if (this.total > this.pageSize) {
                            this.pageOnOff = true;
                        }
                    } else {
                        error(res.data.msg);
                    }
                })
                .catch(err => {
                    NetworkAnomaly();
                });   
        },
        

        //按钮初始状态
        emptyBtn() {
            this.doAdd = false;
            this.doSave = false;
            this.doEdit = true;
            this.doDelete = true;
            this.doImport = false;
            this.doExport = false;
            this.doEffective = false;
            this.doInvalid = false;
            this.doOut = false;
            this.doCancel = true;
            this.doSave = true;

            this.gui = true;
            this.formNO = true;
            this.oldMenu = false;
        },
        //btn按钮按下之后按钮的状态
        emptyBtnTo() {
            this.doAdd = true;
            this.doEdit = true;
            this.doDelete = true;
            this.doImport = true;
            this.doExport = true;
            this.doEffective = true;
            this.doInvalid = true;
            this.doOut = true;
            this.doCancel = false;

            this.gui = true;
            this.formNO = true;
            this.oldMenu = false;
        },
        //表单恢复初始空值状态
        emptyform() {
            this.onOffform = true;
            this.form = {
                id: "",
                pidSn: "", //尺码类别标号
                pidName: "", //尺码类别名称
                name: "", //尺码名称
                sn: "", //尺码编号
                sort: "", //排序
                status: "", //状态
                addDate: "", //编制日期
                addUser: "", //编制人
                updateDate: "", //修改日期
                updateUser: "" //修改人
            };
            this.list = [];
        },
        //清空编辑弹出框数据
        emptyforms() {
            this.forms = {};
        },
        //关闭弹出框
        close_box() {
            this.oldMenu = false;
        },
        //打开弹出框
        open_box() {
            this.oldMenu = true;
            console.log(this.oldMenu);
        },
        //选择弹出框上级菜单
        getOldMenu(item) {
            this.form.pidSn = item.sn;
            this.form.pidName = item.name;
            this.oldMenu = false;
        },
        //编辑单条数据
        handleEdit(index, row) {
            this.idx = index;
            const item = this.list[index];
            this.forms = item;
            let name = item.name;
            let sort = item.sort;
            let sn = item.sn;
            this.dialog = {
                name: name,
                sn: sn,
                sort: sort
            };
            this.editVisible = true;
        },
        // 保存编辑
        saveEdit() {
            if (this.forms.name.length === 0) {
                error("尺码名称不能为空！");
            } else if (this.forms.sn.length === 0) {
                error("尺码编号不能为空");
            } else {
                this.forms.name = this.dialog.name;
                this.forms.sort = this.dialog.sort;
                this.forms.sn = this.dialog.sn;
                if (this.forms.sort.length === 0) {
                    this.forms.sort = 0;
                }
                this.$http
                    .post("/TPA/aYscm/updateSize", qs.stringify(this.forms))
                    .then(res => {
                        if (res.data.code === 0) {
                            succ(res.data.msg);
                            this.getnavMenu();
                            this.editVisible = false;
                            this.$set(this.list, this.idx, this.forms);
                            this.$http
                                .post(
                                    "/TPA/aYscm/searchSize",
                                    qs.stringify(this.pageParams)
                                )
                                .then(res => {
                                    if (res.data.code === 0) {
                                        this.list = res.data.data.list;
                                        this.total = res.data.data.total;
                                        if (this.total > this.pageSize) {
                                            this.pageOnOff = true;
                                        }
                                    } else {
                                        error(res.data.msg);
                                    }
                                })
                                .catch(err => {
                                    NetworkAnomaly();
                                });
                        } else {
                            error(res.data.msg);
                        }
                    })
                    .catch(err => {
                        NetworkAnomaly();
                    });
            }
        },
        //table有效
        effective(index, row) {
            this.idx = index;
            const item = this.list[index];
            this.forms = item;
            this.forms.status = 1;
            this.$http
                .post("/TPA/aYscm/statusSize", qs.stringify(this.forms))
                .then(res => {
                    if (res.data.code === 0) {
                        succ(res.data.msg);
                        this.$set(this.list, this.idx, this.forms);
                    } else {
                        error(res.data.msg);
                    }
                })
                .catch(err => {
                    NetworkAnomaly();
                });
        },
        //table无效
        invalid(index, row) {
            this.idx = index;
            const item = this.list[index];
            this.forms = item;
            this.forms.status = 0;
            this.$http
                .post("/TPA/aYscm/statusSize", qs.stringify(this.forms))
                .then(res => {
                    if (res.status == 200 && res.data.code === 0) {
                        succ(res.data.msg);
                        this.$set(this.list, this.idx, this.forms);
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
    watch: {
        page() {
            this.pageParams.page = this.page - 1;
            this.$http
                .post("/TPA/aYscm/searchSize", qs.stringify(this.pageParams))
                .then(res => {
                    if (res.data.code === 0) {
                        this.list = res.data.data.list;
                        this.total = res.data.data.total;
                    } else {
                        errorres.data.msg;
                    }
                })
                .catch(err => {
                    NetworkAnomaly();
                });
        },
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
    width 400px
    height 400px
    overflow-x hidden
.container>>>.el-dialog__body
    cursor pointer !important
    line-height 2.5vh
    font-weight bold
    padding 1vh 2vh
.menu_box
    width 12%
.set_info
    width 88%
.searchBox
    height 3vh
    margin-left 50px
    width 300px
    float left
    position relative
    input
        width 200px
        height 3vh
        line-height 3vh
        float left
        margin-top 3px
        padding-left 1vh
        border 0.1vh solid #d2d2d2
        border-radius 4px
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
        border-radius 4px
    .searchList
        width 200px
        height 300px
        border 0.1vh solid #d2d2d2
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
            font-size 15px
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
        font-size 14px
    .searchThird
        padding-left 4em
        cursor pointer
        line-height 2.5vh
        height 2.5vh
        font-size 13px
        display block
        font-weight 400
.info_form
    width 100%
    li
        height 3.5vh
        margin 1vh 0
        float left
        width 33%
        &.menuLi
            width 40%
            .first
                width 15%
                margin-right 1vh
            input
                width 35%
                float left
        label
            float left
            line-height 3.5vh
            width 30%
            padding-left 10%
        input
            height 3.5vh
            line-height 3.5vh
            border 0.1vh solid #d2d2d2
            outline none
            padding-left 1vh
            width 70%
            float left
            overflow hidden
        button
            width 50px
            height 3.5vh
            border 0.1vh solid #d2d2d2
            background none
            margin-left 5px
            line-height 3.5vh
            text-align center
            border-radius 5px
            cursor pointer
    .save
        padding 0 2vh
        height 4vh
        line-height 4vh
        border 0.1vh solid #d9d9d9
        background #ffffff
        margin-top 0.8vh
        font-size 1.2vh
        display block
        float left
        text-align center
        text-decoration underline
        cursor pointer
        border-radius 4px
        &.button_btn
            border 0.1vh solid #409EFF
            font-weight bold
            color #409EFF
.order_table
    width 99%
    margin 5px auto 0
    max-height 550px
    border 0.1vh solid #d9d9d9
    overflow hidden
    .el-button
        padding 0.6vh 2vh
        margin-top 0.4vh
        border 0.1vh solid #409eff
        color #409eff
        font-size 1.6vh
        &.btn
            border 0.1vh solid #d2d2d2
            color #d2d2d2
.oldMenu_box
    width 300px
    height 400px
    position fixed
    top 0
    bottom 0
    left 0
    right 0
    margin auto
    border 0.1vh solid #ccc
    background #fff
    z-index 9999
    .oldMenu_box_close
        font-size 2vh
        position absolute
        top -1vh
        right -1vh
        z-index 999999
        background #ffffff
        cursor pointer
    .srcond_menu
        width 300px
        height auto
        height 400px
        overflow-x hidden
        padding 1vh 2vh
        span
            cursor pointer
            font-size 14px
            font-weight bold
            line-height 2.5vh
        .second
            margin-left 2em
            p
                font-size 14px
                color #444
                line-height 2vh
                cursor pointer
</style>
