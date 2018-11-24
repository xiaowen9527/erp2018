<template>
    <div class="login">
        <form class="form_login">
            <p>欢迎登录TPA系统</p>
            <ul>
                <li>
                    <label><img src="./images/login_name.jpg" alt=""></label>
                    <input type="text" v-model="username" placeholder="Login name">
                </li>
                <li>
                    <label><img src="./images//logi_pass.jpg" alt=""></label>
                    <input type="password" v-model="passwd" placeholder="passwd" @keyup.enter="goLogin">
                </li>
            </ul>
            <div class="btn">
                <el-button type="primary" plain @click="goLogin">登录</el-button>
            </div>
            <a class="loginout" @click="loginout">退出</a>
        </form>
    </div>
</template>

<script>
import vuex from 'vuex'
import { NetworkAnomaly, abnormal, succ ,getOut, error} from "../../../assets/js/message.js";
export default {
  name: "login",
  data() {
    return {
      username: "",
      passwd: "",
    };
  },
  mounted() {},
  methods: {
    //登录
    goLogin() {
      if (this.username.length === 0) {
        alert("请输入帐号");
        return false;
      } else if (this.passwd.length === 0) {
        alert("请输入密码");
        return false;
      } else {
        this.$http
          .post(
            "/TPA/login?username=" + this.username + "&passwd=" + this.passwd
          )
          .then(res => {
            if (res.status === 200) {
              if (res.data.code === 0) {
                //本地存储不支持数组和对象，使用JSON.stringify转化添加，JSON.parse转化读取
                sessionStorage.setItem(
                  "user",
                  JSON.stringify({
                    username: this.username,
                    passwd: this.passwd,
                  })
                );
                sessionStorage.setItem("token",res.data.attachment.token)
                succ("登录成功");
                setTimeout(() => {
                  this.$router.push({ path: '/index' });
                }, 1000);
              } else if (res.data.code !== 0) {
                error(res.data.msg)
              }
            } else {
              NetworkAnomaly();
            }
          });
      }
    },
    //退出
    loginout() {
        getOut()
    }
  }
};
</script>

<style lang="stylus" scoped>
.login>>>.el-button
    padding 10px 15px
    margin 0 50px
    width 400px
    line-height 30px
.login
    height 100vh
    width 100vw
    background-image url('../../../assets/images/login_bg.jpg') 
    background-size 100% 100%
    .form_login
        width 500px
        height 350px
        position absolute
        top 0
        bottom 0
        left 0
        right 0
        background #ffffff
        border-radius 2px
        opacity 0.8
        margin auto
        box-shadow 1px 1px 2px #cccccc, -1px -1px 2px #cccccc
        p
            width 100%
            line-height 100px
            font-size 30px
            text-align center
        ul
            padding 0
            margin 10px 0 0
            .company
                width 100%
                height 100%
                padding-left 20px
                line-height 40px
                font-size 16px
                border none
            .el-select
                width 80%
                margin 0 10% 20px
                height 40px
            li
                height 40px
                width 80%
                margin 0 auto 20px
                list-style none
                border 1px solid #cccccc
                padding 0 10px
                label
                    width 50px
                    line-height 40px
                    font-size 16px
                    text-align center
                    display block
                    float left
                input
                    height 30px
                    margin 4px 0
                    line-height 30px
                    border none
                    outline none
                    font-size 14px
                    width 250px
        .btn
            height 50px
            width 100%
        .register
            line-height 20px
            color #444
            position absolute
            bottom 20px
            right 100px
            font-size 14px
        .loginout
            position absolute
            bottom 20px
            right 50px
            cursor pointer
</style>
