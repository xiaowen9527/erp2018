<template>
    <div class="navMenu">

        <label v-for="(navMenu,i) in navMenus" :key="i">
          
            <el-menu-item :key="navMenu.sn"  :index="String([navMenu.sn,navMenu.id])">
                <span slot="title">|--{{navMenu.sn}}</span>
            </el-menu-item>
         

        </label>
        <label v-if="navMenus.length===0" style="width:100%;line-height:3.5vh;text-align:center;display:block">此月份暂无数据</label>

    </div>
</template>
 
<script>
export default {
  name: "NavMenu", //使用递归组件必须要有
  props: ["navMenus"], // 传入子组件的数据
  watch: {
      navmenus(){
          console.log(this.navMenus);
          
      }
  }
};
</script>
 
<style lang="stylus" scoped>
.el-menu-item
    height 3vh !important 
    line-height 3vh !important 
	font-size 1.6vh
    font-weight bold
.navMenu
    wbh_cdth 200px
    background #f2f2f2
    font-weight bold
    .weight
        font-weight normal
    .stateNone
        color #cccccc
</style>

