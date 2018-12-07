<template>
    <div class="container" :class="{container_collapse:collapse}">
        <!-- 页面标题 -->
        <p class="page_title">物料需求调整</p>

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
    name: "wuliaoxuqiutiaozheng",
    data() {
        return {};
    },
    computed: {
        ...mapState(["collapse"])
    }
};
</script>

<style lang="stylus" scoped>
@import 'css/style.styl'
</style>
