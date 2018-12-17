<template>
    <div class="searchYearMonth">
        <el-date-picker v-model="yearMonth" type="month" placeholder="选择日期" format="yyyy 年 MM 月" value-format="yyyy-MM" :picker-options="pickerBeginDateBefore">
        </el-date-picker>
    </div>
</template>

<script>
import { mapState } from "vuex";
export default {
    name: "searchYearMonth",
    data() {
        return {
            pickerBeginDateBefore: {
                //禁止选择超过当前时间的年月
                disabledDate(time) {
                    return time.getTime() > Date.now();
                }
            },
            yearMonth:"",
        };
    },
    methods: {
        transYM(){
            this.$store.dispatch("searchym", this.yearMonth);
        },
        //获取当前的年月
        getYearMonth(){
            var myDate = new Date()
            let year = myDate.getFullYear()
            let month = myDate.getMonth()
            this.yearMonth = year + "-" + (month+1)
        },        
    },
    created () {
        this.getYearMonth()
    },
    watch: {
        yearMonth() {
            this.navMenus = []
            if(this.yearMonth){
                this.transYM()
            }else{
                this.yearMonth = ""
                setTimeout(()=>this.getYearMonth(),500)
            }
        },
    },
    computed:{
        ...mapState(["refresh"])
    }
};
</script>

<style lang="stylus" scoped>
.container>>>.searchYearMonth .el-date-editor.el-input,.container>>>.searchYearMonth .el-input__inner
    width 100%   
    height 3.5vh
    line-height 3.5vh 
    font-size 1.2vh
    margin .4vh 0
.container>>>.searchYearMonth .el-input__inner
    width 90%
    padding .5vh 0 3vh
    
</style>