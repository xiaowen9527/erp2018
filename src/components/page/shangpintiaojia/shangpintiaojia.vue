<template>
    <div class="container">
         <!-- 页面标题 -->
        <p class="page_title">产品定价</p>

         <!-- 顶部操作按钮 -->
        <div class="btn-box">
            <button class="button_btn" disabled="disabled">新增</button>
            <button class="button_btn" disabled="disabled">取消</button>
            <button class="button_btn" disabled="disabled">修改</button>
            <button :disabled='doExport' :class="{button_btn:!doExport}" @click="doExports">导出</button>
            <button :disabled='doImport' :class="{button_btn:!doImport}" @click="doImports">导入</button>
            <button @click="doSearchs" class="button_btn">查询</button>
            <input type="text" v-model="queryInfo"/>
            <button class="button_btn" @click="doOuts">退出</button>
            <div class="btn_right">
                <button class="button_btn" @click="doExamines">审核</button>
                <button class="button_btn" @click="doExamineAgains">反审</button>
            </div>
        </div>
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
        name:"shangpintiaojia",
        data() {
            return {
                doExport: false,
                doImport: false,
                queryInfo: "",
            }
        }
    }
</script>

<style scoped>

</style>