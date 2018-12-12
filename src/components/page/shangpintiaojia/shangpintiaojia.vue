<template>
    <div class="container">
         <!-- 页面标题 -->
        <p class="page_title">商品调价</p>

         <!-- 顶部操作按钮 -->
        <div class="btn-box">
            <button class="button_btn" disabled="disabled">新增</button>
            <button class="button_btn" disabled="disabled">取消</button>
            <button :disabled='doExport' :class="{button_btn:!doExport}" @click="doExports">导出</button>
            <button :disabled='doImport' :class="{button_btn:!doImport}" @click="doImports">导入</button>
            <button @click="doSearchs" class="button_btn">查询</button>
            <input type="text" class="queryInfo" v-model="queryInfo"/>
            <button class="button_btn" @click="doOuts">退出</button>
            <div class="btn_right">
                <button class="button_btn" @click="doExamines">审核</button>
                <button class="button_btn" @click="doExamineAgains">反审</button>
            </div>
        </div>

        <div class="set_info">
            <!-- 表单内容 -->
            <div class="info_form">
                <ul class="clearfix">
                    <li>
                        <label>生效日期</label>
                        <el-date-picker format="yyyy 年 MM 月 dd 日" value-format="yyyy-MM-dd" v-model="form.activeDate" type="date" placeholder="选择日期" :disabled="formOff">
                        </el-date-picker>
                    </li>
                    <li>
                        <label>调价单号</label>
                        <input type="text" :value="form.sn" placeholder="自动生成" disabled>
                    </li>
                    <li class="menuLi">
                        <label>客户</label>
                        <input type="text" class="first" placeholder="必填" v-model="form.clientSn" :disabled="formOff" @click="customerFun">
                        <input type="text" v-model="form.clientName" :disabled="formOff" @click="customerFun">
                        <button :disabled="formOff" @click="customerFun">。。。</button>
                    </li>
                    <button class="save" @click="doSaves" :class="{button_btn:!formOff}" :disabled="formOff">保存</button>
                </ul>
                <ul class="clearfix">
                    <li>
                        <label>款号</label>
                        <input type="text" v-model="form.psn" @click="searchSn" :disabled="formOff">
                    </li>
                    <li>
                        <label>价格类型</label>
                        <el-select v-model="form.type" placeholder="请选择" :disabled="formOff">
                            <el-option v-for="item in this.Type" :key="item.name" :label="item.name" :value="item.name">
                            </el-option>
                        </el-select>
                    </li>
                    <li>
                        <label>价格</label>
                        <input type="text" v-model="form.price" :disabled="formOff">
                    </li>
                    <button class="save" @click="doSaves" :class="{button_btn:!formOff}" :disabled="formOff">保存</button>
                </ul>
            </div>
        </div>

        <!-- 导入弹窗 -->
        <el-dialog class="importExport" title="导入" :visible.sync="importbox" width="30%" :showClose="false" :show-file-list="false">
            <a class="down" href="/TPA/dAdjustPrice/downExcel">下载导入模板</a>
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
// import NavMenu from "./NavMenu";
export default {
  name: "shangpintiaojia",
  data() {
    return {
      doExport: false,
      doImport: false,
      //导入弹出开关
      importbox: false,
      importZhe: false, //导入遮罩
      isCover: false, //默认导入不覆盖
      project: "", //错误文件名
      //上传的文件
      fileList: [],
      Tips: "", //错误提示
      tipOffON: false, //错误文件下载开关
      queryInfo: "",
      form: {
          activeDate: "",
          sn: "",
          clientSn: "",
          clientName: "",
          psn: "",
          type: "",
          price: ""
      }
    };
  },

  methods : {
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
        .post("/TPA/dAdjustPrice/importExcel", formData)
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
      window.location.href = "/TPA/dAdjustPrice/exportExcel";
    },

    // 查询
    doSearchs() {

    },

    // 退出
    doOuts() {
        this.$emit("getOut", this.$route.name);
    },

    // 审核
    doExamines() {},

    // 反审
    doExamineAgains() {},

    // 获取客户信息
    customerFun() {},

    // 保存
    doSaves() {},
  },

  computed: {
    ...mapState(["collapse"])
  }
};
</script>

<style lang="stylus" scoped>
@import 'css/style.styl'
</style>
