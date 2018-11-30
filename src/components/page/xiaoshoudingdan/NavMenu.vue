<template>
    <div class="navMenu">

        <label v-for="(navMenu,i) in navMenus" :key="i">
            <!--只有一级菜单-->
            <el-menu-item :key="navMenu" :index="String(navMenu)">
                <!--标题-->
                <span slot="title">|--{{navMenu}}</span>
            </el-menu-item>
        </label>

    </div>
</template>
 
<script>
export default {
  name: "NavMenu", //使用递归组件必须要有
  props: ["navMenus"], // 传入子组件的数据

};
</script>
 
<style lang="stylus" scoped>
.el-menu-item
    height 3vh !important 
    line-height 3vh !important 
	font-size 1.6vh
    font-weight blod
.navMenu
    wbh_cdth 200px
    background #f2f2f2
    font-weight bold
    .weight
        font-weight normal
    .stateNone
        color #cccccc
</style>

