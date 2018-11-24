<template>
    <div class="navMenu">

        <label v-for="(navMenu,i) in navMenus" :key="i">
            <!--只有一级菜单-->
            <el-menu-item v-if="navMenu.childs.length==0" :key="navMenu.entity.id" :data="navMenu.entity.lj" :index="String([navMenu.entity.name,navMenu.entity.lj])" :route="navMenu.entity.lj">
                <!--标题-->
                <span slot="title">|--{{navMenu.entity.name}}</span>
            </el-menu-item>
            <!--有多级菜单-->
            <el-submenu v-if="navMenu.childs.length!=0" :key="navMenu.entity.id" :data="navMenu.entity" :index="String(navMenu.entity.name)">
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
  data() {
    return {};
  },
  methods: {}
};
</script>
 
<style lang="stylus" scoped>
.el-menu-item
    height 3vh !important 
    line-height 3vh !important 
   
</style>

