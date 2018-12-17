<template>
    <div class="vagueSearch">
        <!-- <el-dialog title="生产单号" :visible.sync="true"> -->
        <el-dialog title="生产单号" :visible.sync="oldSearch">
            <el-input v-model="search" placeholder="生产单号"></el-input>
            <ul class="srcond_menu">
                <li v-if="searchList.length===0">暂无数据</li>
                <li class="clearfix" v-for="(item,i) in searchList" :key="i">
                    <span @click="getItemSearch(item)">|--{{item.sn}}</span>
                </li>
            </ul>
            <span slot="footer" class="dialog-footer">
                <el-button @click="cancel">取 消</el-button>
                <el-button type="primary" @click="cancel">确 定</el-button>
            </span>
        </el-dialog>
    </div>

</template>

<script>
import { NetworkAnomaly, succ, error, getOut } from "@/assets/js/message.js";
export default {
    name: "vagueSearch",
    props: ["onoff","url",  "displaySearch"],                   //开关 ，   接口    ，  列表需要显示的字段
    data() {
        return {
            oldSearch: true,
            search: "", //
            searchList: [], //搜索出来的列表
            item: {} //选择之后的obj
        };
    },
    methods: {
        //选择搜索的生产订单
        getItemSearch(item) {
            // console.log(item);
        },

        cancel() {
            this.oldSearch = false;
            this.$emit("listenOnOff", this.oldSearch);
        }
    },
    watch: {
        //
        search() {
            if (this.search) {
                this.$http
                    .post("/TPA/dProductOrder/getSn?name=" + this.search)
                    .then(res => {
                        if (res.data.code === 0) {
                            if (res.data.data.length > 0) {
                                this.searchList = res.data.data;
                            } else {
                                error("暂无数据");
                                this.searchList = [];
                            }
                        } else {
                            error(res.data.msg);
                        }
                    })
                    .catch(err => {
                        NetworkAnomaly();
                    });
            } else {
                this.searchList = [];
            }
        }
    }
};
</script>

<style lang="stylus" scoped>
.vagueSearch>>>.el-dialog
    width 500px
    height 500px
.vagueSearch>>>.el-dialog__body
    cursor pointer !important
    line-height 2.5vh
    font-weight bold
    padding 1vh 2vh
    height 380px
    overflow-y auto
    .el-input
        width 100%
        float left
    li
        :hover
            background #d2d2d2
        span
            padding-left 2vh
</style>
