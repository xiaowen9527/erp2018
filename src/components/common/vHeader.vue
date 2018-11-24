<template>
    <div class="header">
        <router-link tag="span" to="/index">广州洪兴TPA系统</router-link>
        
    </div>
    
</template>

<script>
    export default {
        name:"vHeader",
       
    }
</script>

<style lang="stylus" scoped>

.header
    width 100%
    height 4.5vh
    background #2d8cf0
    position relative
    span    
        padding 0 2vh
        float left
        line-height 4.5vh
        color #ffffff
        display block
        font-size 2.5vh
        font-style italic
        cursor pointer
</style>
