<template>
    <div class="container" :class="{container_collapse:collapse}" ref="container">
    </div>
</template>

<script>
import { mapState } from "vuex";
    export default {
        name:"Index",
        data() {
            return {
                img:"/static/images/bg.jpg"
            }
        },
        computed: {
            ...mapState(['collapse','token'])
        },
        mounted() {
            // this.getHeight()
            // console.log(sessionStorage.getItem("token"))
        },
        watch:{
            collapse(){
                if(this.collapse){
                    console.log(0);
                    this.$refs.container.style.width = 100 + 'vw'
                    this.$refs.container.style.top = 8 + 'vh'
                    this.$refs.container.style.height = document.documentElement.clientHeight - 120 + 'px'
                }else{
                    this.$refs.container.style.width = 88 + 'vw'
                    this.$refs.container.style.top = 7.5 + 'vh'
                    this.$refs.container.style.height = document.documentElement.clientHeight - 115 + 'px'
                }
            }
        },
        methods: {
            // getUser(){
            //     this.user = JSON.parse(sessionStorage.getItem("user"));
            // },
            getHeight(){
                let hh = document.documentElement.clientHeight 
                let hhh = hh-115
                this.$refs.container.style.height = hhh + 'px'
            }            
        }
    }
</script>

<style scoped>
.container{
    width: 88vw;
    height: 88vh;
    background-image: url('../../../assets/images/bg.jpg') ;
    background-size: 100% 100%;
     background-repeat: no-repeat;
     margin: 1vh 0 0 .1vh;
     top: 7.5vh;
}
</style>



