<template>
    <div>

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
import vagueSearch from "@/components/pageCommon/vagueSearch";
    export default {
        name:"cailiaocaigoulaihuozhijian",
        data() {
            return {
            }
        },
    }
</script>

<style lang="stylus" scoped>
@import 'css/style.styl'
</style>
