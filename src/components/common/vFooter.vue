<template>
    <div class="footer">
        <ul>
            <li>
                <span class="title">用户:</span>
                <span></span>
            </li>
            <!-- <li>
                <span class="title">部门:</span>
                <span>{{this.$store.getters.user.department}}</span>
            </li> -->
            <li>
                <span class="title">登录时间:</span>
                <span>{{this.date}}</span>
            </li>
        </ul>
        <p class="getOut" @click="getOut">退出</p>
    </div>
</template>

<script>
import { succ, error } from "../../assets/js/message.js";
export default {
    name: "vFooter",
    data() {
        return {
            user: {},
            date: ""
        };
    },
    mounted() {
        // this.user = JSON.parse(sessionStorage.getItem("user"));
        this.getDate();
    },
    methods: {
        getDate() {
            let d = new Date();
            let day = d.getDate();
            let month = d.getMonth() + 1;
            let year = d.getFullYear();
            let hour = d.getHours();
            let minutes = d.getMinutes();
            let seconds = d.getSeconds();
            let date =
                String(year) +
                "-" +
                String(month) +
                "-" +
                String(day) +
                " " +
                String(hour) +
                ":" +
                String(minutes) +
                ":" +
                String(seconds);
            this.date = date;
        },
        getOut() {
            succ("退出成功！");
            setTimeout(() => {
                this.$router.push("/login");
                sessionStorage.removeItem("token");
            }, 1000);
        }
    }
};
</script>

<style lang="stylus" scoped>
.footer
    width 100%
    height 3.5vh
    padding 0 0.5vw
    background #f2f2f2
    position fixed
    z-index 9999
    left 0
    bottom 0
    border-top 1px solid #cccccc
    li
        margin-right 2vw
        float left
        span
            line-height 3.5vh
            color #444444
            padding 0 1vh
            font-size 1.4vh
    .getOut
        float right
        font-size 14px
        line-height 3.5vh
        margin-right 2vh
        color #409EFF
        cursor pointer
</style>
