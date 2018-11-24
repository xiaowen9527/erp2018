<template>
    <div class="pages" :class="{pages_collapse:collapse}">
        <ul v-show="onOff">
            <li>总金额:{{money}} 元</li>
            <li>总数量:{{count}}</li>
            <li>金额:{{price}} 元</li>
            <li>本页数量:{{material.length}}</li>
            <li>
                <span @click="prev">上一页</span>
                <span>第{{page+1}}页</span>
                <span @click="next">下一页</span>
            </li>
            <li>共{{pages}}页，{{pageCount}}条/页</li>
        </ul>
        <ul v-show="!onOff">
            <li>总金额:0 元</li>
            <li>总数量:0</li>
            <li>金额:0 元</li>
            <li>本页数量:0</li>
            <li>
                <span>上一页</span>
                <span>第 0 页</span>
                <span>下一页</span>
            </li>
            <li>共 0 页，0 条/页</li>
        </ul>

    </div>

</template>

<script>
import { mapState } from "vuex";
export default {
  name: "Pages",
  props: ["thisOrder"],
  data() {
    return {
      material: "",
      pageCount: 20,
      onOff: false,
      pages: 0,
      page: 0,
      money:'',
      price:'',
      count:''
    };
  },
  watch: {
    thisOrder() {
      this.getMaterial();
      this.prices()
      this.onOff = true
    }
  },
  computed: {
    ...mapState(['collapse'])  
  },
  methods: {
      //处理表格的数据分页
    getMaterial() {
      let material = this.thisOrder.material;
      if (material && material.length % this.pageCount === 0) {
        this.pages = parseInt(material.length / this.pageCount);
      } else {
        this.pages = parseInt(material.length / this.pageCount) + 1;
      }
      this.material = material.slice(
        this.page * this.pageCount,
        (this.page + 1) * this.pageCount
      );
      this.onOff = true;
      this.$emit('material',this.material)
    },
    next() {
      this.page < this.pages-1 ? this.page++ : this.$message({message: "最后一页",showClose: true,type:'warning'});
      this.getMaterial();
    },
    prev() {
      this.page > 0 ? this.page-- : this.$message({message: "第一页",showClose: true,type:'warning'});
      this.getMaterial();
    },
    prices(){
        let price = 0
        let money = 0
        for(let i=0;i<this.thisOrder.material.length;i++){
           price+=parseInt(this.thisOrder.material[i].price) 
            money+=parseInt(this.thisOrder.material[i].money)
        }
        this.price = price
        this.money = money
        this.count = this.thisOrder.material.length;
    }
  }
};
</script>

<style lang="stylus" scoped>
.pages
    height 35px
    width 86vw
    background #f2f2f2
    position fixed
    bottom 40px
    left 13vw
    transition: left .3s linear;
    &.pages_collapse
        width 98%
        left 1%
        transition: left .3s linear;
    ul
        width 100%
        height 35px
        display block
        margin 0 auto
        li
            width 170px
            line-height 35px
            height 35px
            text-align center
            float right
            span
                width 50px
                float left
                margin-right 5px
                line-height 35px
                text-align center
                cursor pointer
</style>
