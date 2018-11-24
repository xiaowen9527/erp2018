<template>
    <div class="searchYear">
        <el-select v-model="searchYear" placeholder="默认当前年份" class="searchYear">
            <el-option v-for="item in this.searchYearList" :key="item.name" :label="item.name" :value="item.name">
            </el-option>
        </el-select>  
    </div>
</template>

<script>
export default {
    name: "searchYear",
    data() {
        return {
            searchYear:"",          //当前当行的年份
            searchYearList:[],      //导航年份数组
        };
    },
    methods: {
        //获取当前的年
        getDateYear() {
            var myDate = new Date();
            let year = myDate.getFullYear();
            this.searchYear = year;
        },
        //年度
        getYear() {
            this.$http
                .post("/TPA/aLbJb/getBySn?sn=001")
                .then(res => {
                    if (res.data.code === 0) {
                        this.searchYearList = res.data.data;
                    } else {
                        error(res.data.msg);
                    }
                })
                .catch(err => {
                    NetworkAnomaly();
                });
        },        
    },
    created(){
        this.getDateYear()
        this.getYear()
    },
    mounted() {
        this.$emit('getSearchYear', this.searchYear)
    },
    watch: {
        searchYear(){
            if(this.searchYear){
                this.$emit('searchYear', this.searchYear)
            }
        }
    }
    
};
</script>

<style lang="stylus" scoped>
.container>>>.searchYear .el-date-editor.el-input,.container>>>.searchYear .el-input__inner
    width 100%   
    height 3.5vh
    line-height 3.5vh 
    font-size 1.2vh
    margin .4vh 0
.container>>>.searchYear .el-input__inner
    width 90%
    padding .5vh 0 3vh
</style>
