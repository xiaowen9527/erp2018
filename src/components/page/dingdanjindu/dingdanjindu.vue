<template>
    <div class="container" :class="{container_collapse:collapse}">
        <p class="page_title">标准工序设计</p>

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
export default {
    name: "dingdanjindu",
    data() {
        return {};
    },
    computed: {
        ...mapState(["collapse"])
    }
};
</script>

<style scoped>
</style>