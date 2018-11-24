<template>
    <div class="tabs" :class="{tabs_collapse:collapse}">
        <i class="el-icon-menu" :class="{tran1:collapse,tran2:!collapse}" @click="editCollapse"></i>
        <div class="btn-box" v-for="(item,i) in options" :key="i"  :class="{active:i==atives}">
            <div class="tab-btn" @click="goLink(item)">{{item.name}}</div>
            <i class="el-icon-error" @click="close(item)"></i>
        </div>

    </div>

</template>

<script>
import { mapState } from "vuex";
export default {
  name: "Tabs",
  props: ['ative'],
  atives:0,
  data() {
    return {
      collapse: false,
      delete:0,
      atives:0
    };
  },
  computed: {
    ...mapState(["options"])
  },
  watch: {
      ative(){
         this.atives =  this.ative
      }
  },
  methods: {
    editCollapse() {
      this.collapse = !this.collapse;
      this.$store.dispatch("docollapse", this.collapse);
    },
    goLink(item) {
      this.$router.push(item.path);
      this.atives = item.idx+this.delete
    },
    close(item) {
        // 删除数组中的item
      if (item.name == "首页") {
        this.$message.error("首页无法删除");
      } else {
        for (let i = 0; i < this.options.length; i++) {
          if (this.options[i] === item) {
            if(i<this.atives){
                this.atives = this.atives-1
            }
            if(i===this.options.length-1){
                this.atives = this.options.length-2
                this.delete = this.delete+1
            }
            this.options.splice(i, 1);
            this.delete = this.delete-1
            // this.$store.dispatch("options", this.options);
          }
        }
        if (this.options.length === 1) {
          this.$router.push("/index");
        }
      }

      
    },
    getative(){
        this.ative = this.options.length-1
    }
  }
};
</script>

<style lang="stylus" scoped>

.tabs
    height 33px
    background #f2f2f2
    border 1px solid #d9d9d9
    border-radius 4px
    overflow hidden
    position absolute
    left 12vw
    width 86vw
    margin 10px 1vw
    transition left 0.3s linear
    &.tabs_collapse
        width 98%
        margin 10px 1%
        left 0
        transition left 0.3s linear
    i
        width 30px
        line-height 30px
        font-size 22px
        margin 0 10px
        float left
        text-align center
        cursor pointer
        &.tran1
            -webkit-transform rotate(135deg)
            transform rotate(135deg)
            -webkit-transition -webkit-transform 0.1s linear
            transition transform 0.1s linear
        &.tran2
            -webkit-transform rotate(0deg)
            transform rotate(0deg)
            -webkit-transition -webkit-transform 0.1s linear
            transition transform 0.1s linear
    .btn-box
        padding-right 10px
        float left
        position relative
        height 25px
        padding 0px 30px 0 20px
        margin 3px 2px
        line-height 25px
        background #409EFF
        border-radius 4px
        cursor pointer
        &.active
            background #67C23A
        i
            line-height 25px
            height 25px
            position absolute
            top 0
            right -10px
            font-size 14px
            color #ffffff
        .tab-btn
            color #ffffff
            span
                line-height 25px
                height 25px
</style>
