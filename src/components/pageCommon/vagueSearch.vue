<template>
    <div class="vagueSearch">

        <el-dialog title="查询" :visible.sync="oldSearch">

            <el-input v-model="search" placeholder="查询"></el-input>

            <ul class="srcond_menu">
                <li v-if="searchList.length===0">暂无数据</li>
                <li class="clearfix" v-for="(item,i) in searchList" :key="i">
                    <span @click="getItemSearch(item)">|--{{item}}</span>
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
import { NetworkAnomaly,error} from "@/assets/js/message.js";       //引入“网络错误”和“错误消息提醒”
export default {
    name: "vagueSearch",
    props: ["onoff", "url"], //开关，接口
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
            this.item = item.split("-");
            this.cancel();                  
        },
        //关闭弹窗，给父组件传值
        cancel() {
            this.$emit("listenOnOff", false);           //关闭弹窗，并把设置父组件的开关状态
            this.$emit("listenItem", this.item);        //把选择时候的值传回父组件
        }
    },
    watch: {
        //模糊查询
        search() {
            if (this.search) {
                this.$http
                    .post(this.url + this.search)           //props传过来的url+搜索值组成搜索链接
                    .then(res => {
                        if (res.data.code === 0) {
                            if (res.data.data.length > 0) {
                                //把列表数组的对象合并程字符串
                                let arr = [];
                                for (let i in res.data.data) {
                                    let name = "";
                                    for (let j in res.data.data[i]) {
                                        if (name) {
                                            name = name + "-" + res.data.data[i][j];
                                        } else {
                                            name = res.data.data[i][j];         //如果当前的值是第一个那么不加“-”
                                        }
                                    }
                                    arr.push(name);
                                }
                                this.searchList = arr;
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
        },
        //点击框框外的黑色部分的时候
        oldSearch(){
            if(!this.oldSearch){
                this.cancel()
            }
        }
    }
};
</script>

<style lang="stylus" scoped>
.vagueSearch>>>.el-dialog
    width 500px
    height 500px !important
.vagueSearch>>>.el-dialog__body
    cursor pointer !important
    line-height 2.5vh
    font-weight bold
    padding 1vh 2vh
    height 375px
    overflow-y auto
    .el-input
        width 100%
        float left
    li
        :hover
            background #d2d2d2
        span
            padding-left 2vh
            line-height 3vh
</style>
