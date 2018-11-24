<template>
    <div>
close
    </div>
</template>

<script>
    export default {
        name:"close",
        created () {
                window.opener = null;//禁止某些浏览器的一些弹窗
                window.open('','_self');
                window.close()  
        }
    }
</script>

<style scoped>

</style>