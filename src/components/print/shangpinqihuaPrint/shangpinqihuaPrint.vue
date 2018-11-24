<template>
<div>
    <div class="page" v-for="(item,i) in pageTableArr" :key="i">
        <!-- 页面标题 -->
        <h3 class="pageTitle">{{shangpinqihuaFirstForm.pageTitle}}</h3>

        <!-- 页面顶部 -->
        <div class="pageTit clearfix">
            <div>日期：{{shangpinqihuaFirstForm.pageTit.date}}</div>
            <div>单号：{{shangpinqihuaFirstForm.pageTit.sn}}</div>
            <div>品牌{{shangpinqihuaFirstForm.pageTit.brand}}</div>
            <div>年度：{{shangpinqihuaFirstForm.pageTit.year}}</div>
            <div>季度：{{shangpinqihuaFirstForm.pageTit.quarter}}</div>
            <div>渠道：{{shangpinqihuaFirstForm.pageTit.channel}}</div>
            <div class="pageNum">页码：{{i+1}}/{{pageTableArr.length}}</div>
        </div>

        <!-- 页面表格 -->
        <div class="table">
            <div class="order_table">
                <el-table :data="item" border style="width: 100%">
                    <el-table-column prop="lbch2Name" label="品类" min-width="15%">
                    </el-table-column>
                    <el-table-column prop="sex" label="性别" min-width="10%">
                    </el-table-column>
                    <el-table-column prop="lbch3Name" label="面料类别" min-width="15%">
                    </el-table-column>
                    <el-table-column prop="crowd" label="人群" min-width="10%">
                    </el-table-column>
                    <el-table-column prop="price" label="价格区间" min-width="15%">
                    </el-table-column>
                    <el-table-column prop="age" label="年龄段" min-width="10%">
                    </el-table-column>
                    <el-table-column prop="amount" label="款数" min-width="10%">
                    </el-table-column>
                    <el-table-column prop="loadTime" label="预计上货时间" min-width="15%">
                    </el-table-column>

                </el-table>
            </div>
        </div>

        <!-- 页面底部 -->
        <div class="pageTit bottom clearfix">
            <div>编制人：{{shangpinqihuaFirstForm.pageTit.addUser}}</div>
            <div>编制日期：{{shangpinqihuaFirstForm.pageTit.addDate}}</div>
            <div>审核人：{{shangpinqihuaFirstForm.pageTit.shUser}}</div>
            <div>审核日期：{{shangpinqihuaFirstForm.pageTit.shDate}}</div>
        </div>
    </div>
</div>
</template>

<script>
export default {
  name: "mianliaoyudingjihuaPrint",
  data() {
    return {
      shangpinqihuaFirstForm: {
        pageTitle: "商品企划",
        pageTit: {},
        pageTable: [],
        pageTableArr: []
      }
    };
  },

  methods: {
    sliceArray(array, size) {
      var result = [];
      for (var x = 0; x < Math.ceil(array.length / size); x++) {
        var start = x * size;
        var end = start + size;
        result.push(array.slice(start, end));
      }
      return result;
    }
  },

  created() {
    this.shangpinqihuaFirstForm.pageTit = JSON.parse(localStorage.getItem("pageTit"))
    this.shangpinqihuaFirstForm.pageTable = JSON.parse(localStorage.getItem("printList"))
    // this.shangpinqihuaFirstForm.pageTable = JSON.parse(localStorage.getItem("printList")).concat(JSON.parse(localStorage.getItem("printList")).concat(JSON.parse(localStorage.getItem("printList")).concat(JSON.parse(localStorage.getItem("printList")).concat(JSON.parse(localStorage.getItem("printList"))))))
    if(this.shangpinqihuaFirstForm){
        window.print()
        localStorage.clear()
    }

    


    this.pageTableArr = this.sliceArray(this.shangpinqihuaFirstForm.pageTable, 30);
    document.getElementsByTagName('html')[0].style.overflow = 'auto'
  },
};
</script>

<style lang="stylus" scoped>

// @page { size: A4 landscape; }
@page { size: A4 portrait; }
.page>>>.el-table .cell
    height 18px
    line-height 18px
    text-align center
    font-size 14px
.page {
    width: 1060px;
    height: 1520px;
    margin: 0 auto;
}

/* 标题 */
.pageTitle {
    text-align: center;
    font-weight: bold;
    font-size: 30px;
    margin-bottom: 40px;
}

/* 页面小标题 */
.pageTit 
    left 50px
    width 970px
    position relative
    &.button
        bottom 0 !important
        position relative

.pageTit div {
    font-size: 16px;
    margin-right: 20px;
    float: left;
    line-height 47px
}
.pageNum {
    position absolute
    right 0
    top 0
}
/* 页面表格 */
.table {
    box-sizing: border-box;
    padding: 0 50px;
    text-align: center;
    min-height 790px
}

.page>>>.el-table th>.cell {
    text-align: center;
}
.order_table
    min-height 1345px
</style>