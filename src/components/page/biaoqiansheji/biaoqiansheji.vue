<template>
    <div class="container" :class="{container_collapse:collapse}">
        <!-- 页面标题 -->
        <p class="page_title">标签设计</p>

        <!-- 顶部导航栏 -->
        <div class="btn-box">
            <button :disabled='doAdd' :class="{button_btn:!doAdd}" @click="doAdds">新增</button>
            <button :disabled='doImport' :class="{button_btn:!doImport}" @click="doImports">导入</button>
            <button :disabled='doExport' :class="{button_btn:!doExport}" @click="doExports">导出</button>
            <button :disabled="(this.firstForm.status==1||this.firstForm.status==3)" :class="{button_btn:(this.firstForm.status==0)}" @click="doEffectives">有效</button>
            <button :disabled="(this.firstForm.status==0||this.firstForm.status==3)" :class="{button_btn:(this.firstForm.status==1)}" @click="doInvalids">无效</button>
            <button :disabled='doCancel' :class="{button_btn:!doCancel}" @click="doCancels">取消</button>
            <button class="button_btn" @click="refresh">刷新</button>
            <button class="button_btn" @click="doOuts">退出</button>
        </div>

        <div class="set_box">
            <!-- 左侧导航栏 -->
            <!-- <div class="menu_box">
        <el-menu @select="menuSelected" @open="menuSelected" unique-opened background-color="#f2f2f2" text-color="#303133" active-text-color="#303133">
          <nav-menu :navMenus="this.navMenus"></nav-menu>
        </el-menu>
      </div> -->
            <div class="menu_box">
                <el-tree v-if="hackReset&&navMenus.length>0" accordion v-for="(item,index) in nav" :key="index" :props="item" :load="loadNode" lazy @node-click="handleNodeClick" highlight-current ref="menu">
                </el-tree>
            </div>

            <!-- 右侧主体内容 -->
            <div class="set_info">
                <div class="info_form">
                    <ul>
                        <li class="menuLi">
                            <label>标签类型</label>
                            <input placeholder="顶级" type="text" class="first" v-model="firstForm.pidSn" :disabled="firstFormGui">
                            <input placeholder="顶级" type="text" v-model="firstForm.pidName" :disabled="firstFormGui">
                            <button :disabled="firstFormGui" @click="oldMenu=true">。。。</button>
                        </li>

                        <li>
                            <label>标签名称</label>
                            <input type="text" v-model="firstForm.name" :disabled="firstFormNo">
                        </li>

                        <li>
                            <label>编号</label>
                            <input type="text" placeholder="自动生成" v-model="firstForm.sn" disabled>
                        </li>

                        <li>
                            <label>排序</label>
                            <input type="text" v-model="firstForm.sort" :disabled="firstFormNo">
                        </li>

                        <button class="save" @click="doSaves" :disabled="firstFormOn" :class="{button_btn:!firstFormOn}">保存</button>
                    </ul>
                </div>

                <!-- 表格数据 -->
                <div class="order_table">
                    <el-table :data="list" border style="width: 100%">
                        <el-table-column prop="pidName" label="标签类别" min-width="18%">
                        </el-table-column>
                        <el-table-column prop="sn" label="编号" min-width="18%">
                        </el-table-column>
                        <el-table-column prop="name" label="名称" min-width="18%">
                        </el-table-column>
                        <el-table-column prop="sort" label="顺序" min-width="18%">
                        </el-table-column>
                        <el-table-column label="操作" min-width="28%">
                            <template slot-scope="scope">
                                <el-button @click="handleEdit(scope.$index, scope.row)" type="text">修改</el-button>
                                <el-button :disabled="(scope.row.status == 1)" :class="{btn:(scope.row.status == 1)}" @click="effective(scope.$index, scope.row)" type="text">有效</el-button>
                                <el-button :disabled="(scope.row.status == 0)" :class="{btn:(scope.row.status == 0)}" @click="invalid(scope.$index, scope.row)" type="text">无效</el-button>
                            </template>
                        </el-table-column>
                    </el-table>
                </div>
            </div>
        </div>

        <!-- 标签类型弹窗 -->
        <el-dialog title="标签类型" :visible.sync="oldMenu">
            <ul class="srcond_menu">
                <li v-if="navMenus.length===0">暂无数据</li>
                <li v-for="(item,i) in navMenus" :key="i">
                    <span @click="getOldMenu(item)">|--{{item.name}}</span>
                </li>
            </ul>
        </el-dialog>

        <!-- 修改弹出框 -->
        <el-dialog title="修改" :visible.sync="editVisible" width="30%">
            <el-form :model="dialog" label-width="100px">
                <el-form-item label="标签类别">
                    <el-input v-model="dialog.pidName" disabled></el-input>
                </el-form-item>
                <el-form-item label="编号">
                    <el-input v-model="dialog.pidSn" disabled></el-input>
                </el-form-item>
                <el-form-item label="名称">
                    <el-input v-model="dialog.name" disabled></el-input>
                </el-form-item>
                <el-form-item label="顺序">
                    <el-input type="number" v-model="dialog.sort"></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="editVisible = false">取 消</el-button>
                <el-button type="primary" @click="saveEdit">确 定</el-button>
            </span>
        </el-dialog>

        <!-- 导入弹窗 -->
        <el-dialog class="importExport" title="导入" :visible.sync="importbox" width="30%" :showClose="false" :show-file-list="false">
            <a class="down" href="/TPA/aYscm/downExcelTab">下载导入模板</a>
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
            </ul>
            <el-pagination @current-change="currentPage" :current-page='page' v-if="pageOnOff" background :page-size="pageSize" :pager-count="5" :total="total">
            </el-pagination>
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
export default {
    name: "biaoqiansheji",
    data() {
        return {
            // 按钮开关
            doAdd: false,
            doImport: false,
            doExport: false,
            doSave: true,
            doCancel: true,

            oldMenu: false,

            //保存新增状态开关  新增true/修改false
            addEdit: true,

            list: [], // 表格数据

            editVisible: false,
            idx: "",
            dialog: {},

            firstForm: {
                id: "",
                pidSn: "", // 标签归属编号
                pidName: "", // 标签归属名称
                sn: "", // 标签编号
                name: "", // 标签名称
                sort: "", // 标签排序
                status: "3", // 有效无效判断
                addUser: "",
                addDate: "",
                updateUser: "",
                updateDate: ""
            },

            //form的disabled
            firstFormNo: true,
            firstFormOn: true,
            firstFormGui: true,

            //分页：当前页码/总数量/每页显示条数
            page: 0,
            total: "",
            pageSize: 10,
            pageOnOff: false,
            //分页查询第一第二级时候的参数
            pageParams: "",

            nav: [{ label: "name" }], //  导航显示字段
            navMenus: [], //一级导航初始数据
            hackReset: true,

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
            selectMenu: ""
        };
    },
    mounted() {
        this.getnavMenu();
    },
    methods: {
        // 按钮初始状态
        emptyBtn() {
            this.doAdd = false;
            this.doSave = true;
            this.doImport = false;
            this.doExport = false;
            this.doCancel = true;
        },

        // 按钮按下状态
        emptyBtnTo() {
            this.doAdd = true;
            this.doSave = true;
            this.doImport = true;
            this.doExport = true;
            this.doCancel = false;
        },

        //开放表单first
        noDisabledFirstForm() {
            this.firstFormNo = false;
            this.firstFormOn = false;
            this.firstFormGui = false;
        },

        //禁用表单first
        disabledFirstForm() {
            this.firstFormNo = true;
            this.firstFormOn = true;
            this.firstFormGui = true;
        },

        //表单1恢复初始空值状态
        emptyFirstForm() {
            this.firstForm = {
                pidSn: "", // 标签归属编号
                pidName: "", // 标签归属名称
                sn: "", // 标签编号
                name: "", // 标签名称
                sort: "", // 标签排序
                status: "3", // 有效无效判断
                addDate: "", //编制日期
                zdRen: "", //编制人
                updateDate: "", //修改日期
                updateUser: "" //修改人
            };
        },

        // 新增
        doAdds() {
            this.emptyBtnTo();
            this.doCancel = false;
            this.noDisabledFirstForm();
            this.emptyFirstForm();
            this.addEdit = true;
            this.list = [];
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
                    .post("/TPA/aYscm/importExcelTab", formData)
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
            window.location.href = "/TPA/aYscm/importExcelTab";
        },
        //有效按钮
        doEffectives() {
            let params = {
                id: this.firstForm.id,
                status: "1"
            };
            this.$http
                .post("/TPA/aYscm/statusTab", qs.stringify(params))
                .then(res => {
                    if (res.data.code === 0) {
                        this.firstForm.status = params.status;
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
                id: this.firstForm.id,
                status: "0"
            };
            this.$http
                .post("/TPA/aYscm/statusTab", qs.stringify(params))
                .then(res => {
                    if (res.data.code === 0) {
                        this.firstForm.status = params.status;
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

        //取消
        doCancels() {
            this.emptyBtn();
            this.disabledFirstForm();
            this.emptyFirstForm();
            this.firstForm.status = "3";
            this.list = [];
            this.pageOnOff = false;
        },

        //刷新
        refresh() {
            this.doCancels();
            this.getnavMenu();
        },

        //退出
        doOuts() {
            this.$emit("getOut", this.$route.name);
        },

        //覆盖按钮
        importFuGai() {
            this.fugai = true;
            this.submitUpload();
        },

        //获取导航数据
        // getnavMenu() {
        //   this.$http
        //     .post("/TPA/aYscm/treeTab")
        //     .then(res => {
        //       console.log(res);

        //       if (res.data.code === 0) {
        //         this.navMenus = res.data.data;
        //       } else {
        //         error(res.data.msg);
        //       }
        //     })
        //     .catch(err => {
        //       NetworkAnomaly();
        //     });
        // },

        //获取nav
        getnavMenu() {
            this.$http
                .post("/TPA/aYscm/treeTab")
                .then(res => {
                    // console.log(res);
                    if (res.data.code === 0) {
                        this.navMenus = res.data.data;
                        this.renav();
                    } else {
                        error(res.data.msg);
                    }
                })
                .catch(err => {
                    NetworkAnomaly();
                });
        },
        //强制销毁nav达到更新nav数据目的
        renav() {
            this.hackReset = false;
            setTimeout(() => {
                this.hackReset = true;
            }, 10);
        },
        loadNode(node, resolve) {
            if (node.level === 0) {
                return resolve(this.navMenus);
            }
            // 其余节点处理
            if (node.level >= 1) {
                // 注意！把resolve传到你自己的异步中去
                this.getIndex(node, resolve);
            }
        },
        // 异步加载叶子节点数据函数
        getIndex(node, resolve) {
            this.$http({
                url: "/TPA/aYscm/treeTab",
                params: { sn: node.data.sn }
            }).then(res => {
                if (res.data.code === 0) {
                    let data = res.data.data;
                    resolve(data);
                }
            });
        },

        handleNodeClick(data, node, item) {
            this.page = 1;
            this.pageOnOff = false;
            //查询自身
            this.$http
                .post("/TPA/aYscm/get?id=" + data.id)
                .then(res => {
                    if (res.data.code === 0) {
                        this.doSave = true;
                        this.firstForm = res.data.data;
                        this.emptyBtnTo();
                        this.doEdit = false;
                        // this.doDelete = false;
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
            // console.log(this.pageParams);
            this.$http
                .post("/TPA/aYscm/searchTab", qs.stringify(params))
                .then(res => {
                    // console.log(res);
                    if (res.data.code === 0) {
                        // console.log(this.pageParams);
                        // console.log(res);
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

        //选择归属品类弹出窗内容
        getOldMenu(item) {
            this.firstForm.pidSn = item.sn;
            this.firstForm.pidName = item.name;
            this.oldMenu = false;
        },

        // 点击保存
        doSaves() {
            if (this.firstForm.name.length === 0) {
                error("标签名称不能为空");
            } else {
                if (this.firstForm.sort.length === 0) {
                    this.firstForm.sort = 0;
                }
                if (this.addEdit) {
                    this.$http
                        .post(
                            "/TPA/aYscm/insertTab",
                            qs.stringify(this.firstForm)
                        )
                        .then(res => {
                            if (res.status === 200 && res.data.code === 0) {
                                succ(res.data.msg);
                                let pidSn = this.firstForm.pidSn;
                                let pidName = this.firstForm.pidName;
                                this.firstForm = {};
                                this.firstForm.pidName = pidName;
                                this.firstForm.pidSn = pidSn;
                                this.firstForm.sort = "";
                                this.firstForm.status = "3";
                                this.getnavMenu();
                                this.firstFormGui = true;
                                this.firstFormNo = false;
                                this.doSave = false;
                                this.doAdd = false;

                                let params = {
                                    pidSn: this.firstForm.pidSn,
                                    page: 0,
                                    count: this.pageSize
                                };
                                this.pageParams = params;
                                if (this.pageParams.pidSn.trim() == "") {
                                    this.pageParams.pidSn = -1;
                                }
                                this.$http
                                    .post(
                                        "/TPA/aYscm/searchTab",
                                        qs.stringify(this.pageParams)
                                    )
                                    .then(res => {
                                        // console.log(this.pageParams);
                                        if (res.data.code === 0) {
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
                            } else {
                                error(res.data.msg);
                            }
                        })
                        .catch(error => {
                            NetworkAnomaly();
                        });
                } else {
                    this.$http
                        .post(
                            "/TPA/aYscm/updateTab",
                            qs.stringify(this.firstForm)
                        )
                        .then(res => {
                            if (res.data.code === 0) {
                                succ(res.data.msg);
                                // console.log(res);

                                let status = this.firstForm.status;
                                let addUser = this.firstForm.addUser;
                                let addDate = this.firstForm.addDate;
                                let pidSn = this.firstForm.pidSn;
                                let pidName = this.firstForm.pidName;
                                let sn = this.firstForm.sn;
                                let name = this.firstForm.name;
                                this.firstForm = res.data.data;
                                this.firstForm.status = status;
                                this.firstForm.addUser = addUser;
                                this.firstForm.addDate = addDate;
                                this.firstForm.pidName = pidName;
                                this.firstForm.pidSn = pidSn;
                                this.firstForm.sn = sn;
                                this.firstForm.name = name;
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

        //修改单条数据
        handleEdit(index, row) {
            this.idx = index;
            const item = this.list[index];
            // console.log(item);

            this.dialog = {
                id: item.id,
                pidSn: item.pidSn, //标签归属编号
                pidName: item.pidName, //标签归属名称
                sn: item.sn, //编号
                name: item.name, //名称
                sort: item.sort //排序
            };
            this.editVisible = true;
        },

        //table有效
        effective(index, row) {
            this.idx = index;
            let item = this.list[index];
            item.status = "1";
            this.$http
                .post("/TPA/aYscm/statusTab", qs.stringify(item))
                .then(res => {
                    if (res.data.code === 0) {
                        succ(res.data.msg);
                        this.$set(this.list, this.idx, item);
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
            let item = this.list[index];
            item.status = 0;
            this.$http
                .post("/TPA/aYscm/statusTab", qs.stringify(item))
                .then(res => {
                    if (res.data.code === 0) {
                        succ(res.data.msg);
                        this.$set(this.list, this.idx, item);
                    } else {
                        error(res.data.msg);
                    }
                })
                .catch(err => {
                    NetworkAnomaly();
                });
        },

        //保存单条编辑的数据
        saveEdit() {
            // console.log(this.dialog);
            if (this.dialog.sort.length === 0) {
                this.dialog.sort = 0;
            }
            this.$http
                .post("/TPA/aYscm/updateTab", qs.stringify(this.dialog))
                .then(res => {
                    if (res.data.code === 0) {
                        succ(res.data.msg);
                        this.$set(this.list, this.idx, this.dialog);
                        this.firstForm.updateDate = res.data.data.updateDate;
                        this.getnavMenu();
                        this.editVisible = false;

                        //重新请求table数据（按照编辑之后的顺序）
                        this.$http
                            .post(
                                "/TPA/aYscm/searchTab",
                                qs.stringify(this.pageParams)
                            )
                            .then(res => {
                                if (res.data.code === 0) {
                                    // console.log(res);
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
        },

        //获取当前页码
        currentPage(val) {
            this.page = val;
        }
    },

    // 监听当前页码
    watch: {
        page() {
            this.pageParams.page = this.page - 1;
            // console.log("pageParams:" + this.pageParams.page);
            // console.log("page" + this.page);
            this.$http
                .post("/TPA/aYscm/searchTab", qs.stringify(this.pageParams))
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
        }
    },

    // 接收vuex的值
    computed: {
        ...mapState(["collapse"])
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
.info_form
    width 100%
    li
        height 3.5vh
        margin 1vh 0
        float left
        width 25%
        &.menuLi
            width 50%
            float none
            label
                width 15%
            .first
                width 15%
                margin-right 1vh
            input
                width 40%
                float left
        label
            float left
            line-height 3.5vh
            width 25%
            text-align center
        input
            height 3.5vh
            line-height 3.5vh
            border 0.1vh solid #d2d2d2
            outline none
            padding-left 1vh
            width 75%
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
        margin-left 1.5vh
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
.container>>>.el-pagination
    width 40%
</style>
