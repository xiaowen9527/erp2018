<template>
    <div class="navMenu">

        <label v-for="(navMenu,i) in navMenus" :key="i">
            <!--只有一级菜单-->
            <el-menu-item v-if="navMenu.childs.length==0" :key="navMenu.entity.id" :data="navMenu.entity.path" :index="String(navMenu.entity.sn)" :route="navMenu.entity.path">
                <!--标题-->
                <span slot="title">|--{{navMenu.entity.name}}</span>
            </el-menu-item>
            <!--有多级菜单-->
            <el-submenu v-if="navMenu.childs.length!=0" :key="navMenu.entity.id" :data="navMenu.entity" :index="String(navMenu.entity.sn)">
                <template slot="title">
                    <span>|--{{navMenu.entity.name}}</span>
                </template>
                <!--递归组件，把遍历的值传回子组件，完成递归调用-->
                <nav-menu :navMenus="navMenu.childs"></nav-menu>
            </el-submenu>
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
    height 25px !important 
    line-height 25px !important 
.navMenu
    wbh_cdth 200px
    background #f2f2f2
    font-weight bold
    .weight
        font-weight normal
    .stateNone
        color #cccccc
</style>

