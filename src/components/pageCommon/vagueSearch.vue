<template>
    <div class="vagueSearch">
        <!-- <el-dialog title="生产单号" :visible.sync="true"> -->
        <el-dialog title="生产单号" :visible.sync="onoff">
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
export default {
    name: "vagueSearch",
    props: ["url","onoff",'displaySearch'],
    data() {
        return {
            oldSearch: true,
            search:"",                  //
            searchList: [],             //搜索出来的列表
            item:{}                     //选择之后的obj
        };
    },
    methods: {
        //选择搜索的生产订单
        getItemSearch(item) {
            console.log(item);
        },
        cancel(){
            this.oldSearch = false
            this.$emit('listenOnOff',this.oldSearch)
        },        
    },
    watch: {

        search() {
            let search = {
                sn: 17 + "|" + this.search
            };
            let searchStr = JSON.stringify(search);
            this.$http
                .post(this.url + searchStr)
                .then(res => {
                    if (res.data.code === 0) {
                        if (res.data.data.list.length > 0) {
                            this.searchList = res.data.data.list;
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
