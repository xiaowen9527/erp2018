<template>
    <div class="container" :class="{container_collapse:collapse}">
        <!-- 页面标题 -->
        <p class="page_title">销售款号</p>

        <!-- 顶部操作按钮 -->
        <div class="btn-box">
            <button :disabled='doExport' :class="{button_btn:!doExport}" @click="doExports">新增</button>
            <button :disabled='doExport' :class="{button_btn:!doExport}" @click="doExports">取消</button>
            <button :disabled='doExport' :class="{button_btn:!doExport}" @click="doExports">修改</button>
            <button :disabled='doImport' :class="{button_btn:!doImport}" @click="doImports">导入</button>
            <button :disabled='doExport' :class="{button_btn:!doExport}" @click="doExports">导出</button>
            <button @click="doSearchs" class="button_btn">查询</button>
            <input class="queryInfo" type="text" v-model="queryInfo" />
            <button class="button_btn" @click="doOuts">退出</button>
        </div>
    </div>
</template>

<script>
export default {
    
}
</script>

<style lang="stylus" scoped>
@import 'style.styl'
</style>


