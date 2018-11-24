<template>
    <nav class="silder">
        <!--左侧菜单组件-->
        <el-menu @select="menuSelected" unique-opened :collapse='collapse'  class="el-menu-vertical-demo"  background-color="#f2f2f2" text-color="#303133" active-text-color="#303133">
            <nav-menu :navMenus="this.navMenus"></nav-menu>
        </el-menu>
    </nav>
</template>

<script>
import NavMenu from "./NavMenu.vue";
import { NetworkAnomaly } from "../../assets/js/message.js";
import { mapState } from "vuex";
export default {
  data() {
    return {
      navMenus: []
    };
  },
  computed: {
    ...mapState(["collapse"])
  },
  mounted () {
      this.getnavMenu()
  },
  methods: {
    getnavMenu() {
      this.$http
        .post("/TPA/menu/")
        .then(res => {
          if (res.status == 200 && res.data.code === 0){
             this.navMenus = res.data.data.childs; 
          }
        })
        .catch(err => {
          NetworkAnomaly()
        })
    },
    //选择当前导航
    menuSelected(index){
        this.$emit('path',index)         
    }   
  },
  components: {
    NavMenu
  }
};
</script>
<style lang="stylus" scoped>
.silder>>>.el-submenu__title, .silder>>>.el-menu-item
    height 3.5vh
    line-height 3.5vh
    font-size 1.6vh
.silder>>>.el-submenu__title, .silder>>>.el-menu-item
    height 3.5vh
    line-height 3.5vh
    font-size 1.6vh
.silder
    height 100%
    border-right 1px solid #cccccc
    background #f2f2f2
    overflow hidden
    position absolute
    top 4.5vh
    left 0
    float left
    .el-menu-vertical-demo:not(.el-menu--collapse)
        width 12vw
    .el-menu--collapse
        width 0
</style>
