<template>
<div>
    <div class="page" v-for="(item,i) in pageTableArr" :key="i">
        <!-- 页面标题 -->
        <h3 class="pageTitle">{{mianliaoFristForm.pageTitle}}</h3>

        <!-- 页面顶部 -->
        <div class="pageTit clearfix">
            <!-- <div>日期：{{mianliaoFristForm.pageTit.date}}</div>
            <div>单号：{{mianliaoFristForm.pageTit.sn}}</div>
            <div>供应商：{{mianliaoFristForm.pageTit.aKsDaName}}</div>
            <div>年度：{{mianliaoFristForm.pageTit.year}}</div>
            <div>审核：{{mianliaoFristForm.pageTit.sh}}</div> -->
            <div class="pageNum">页码：{{i+1}}/{{pageTableArr.length}}</div>
        </div>

        <!-- 页面表格 -->
        <div class="table">
            <div class="order_table">
                <el-table :data="item" border="1px" style="width: 100%">
                    <el-table-column prop="sn" label="单据单号" min-width="7%">
                    </el-table-column>
                    <el-table-column prop="psn" label="款号" min-width="7%">
                    </el-table-column>
                    <el-table-column prop="brand" label="品牌" min-width="7%">
                    </el-table-column>
                    <el-table-column prop="year" label="年度" min-width="7%">
                    </el-table-column>
                    <el-table-column prop="quarter" label="季度" min-width="7%">
                    </el-table-column>
                    <el-table-column prop="channel" label="渠道" min-width="7%">
                    </el-table-column>
                    <el-table-column prop="price" label="价格" min-width="58">
                    </el-table-column>
                </el-table>
            </div>
        </div>

        <!-- 页面底部 -->
        <!-- <div class="pageTit clearfix">
            <div>编制人：{{mianliaoFristForm.pageTit.addUser}}</div>
            <div>编制日期：{{mianliaoFristForm.pageTit.addDate}}</div>
            <div>审核人：{{mianliaoFristForm.pageTit.shUser}}</div>
            <div>审核日期：{{mianliaoFristForm.pageTit.shDate}}</div>
        </div> -->
    </div>
</div>
</template>

<script>
export default {
  name: "changpindingjiaPrint",
  data() {
    return {
      pageTableArr: [],
      mianliaoFristForm: {
        pageTitle: "产品定价表",
        pageTit: {},
        pageTable: [],
        pageTableArr: []
      },
      Type: [] // 价格类型
    };
  },

  methods: {
    // 限定一页显示多少条数据
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
    this.mianliaoFristForm.pageTable = JSON.parse(localStorage.getItem("printList"));
    if (this.mianliaoFristForm) {
      window.print();
      localStorage.clear();
    }

    this.pageTableArr = this.sliceArray(this.mianliaoFristForm.pageTable, 10);
    document.getElementsByTagName("html")[0].style.overflow = "auto";
  }
};
</script>

<style lang="stylus" scoped>
@page
  size: A4 landscape
// @page { size: A4 portrait; }
.page>>>.el-table .cell
    line-height 18px
    text-align center
    font-size 14px
.page
    width 1500px
    height 1010px
    margin 0 auto
/* 标题 */
.pageTitle
    text-align center
    font-weight bold
    font-size 30px
    margin-bottom 40px
/* 页面小标题 */
.pageTit
    max-width 90%
    height 20px
    margin-left 50px
    margin-top 40px
    margin-bottom 30px
    position relative
.pageTit div
    font-size 20px
    margin-right 30px
    float left
.pageNum
    position absolute
    right 0
    top 0
/* 页面表格 */
.table
    box-sizing border-box
    padding 0 50px
    text-align center
    min-height 790px
.page>>>.el-table th>.cell
    text-align center
.page>>>.is-leaf, .page>>>.el-table__row td
    padding 6px 0
.page>>>.is-leaf .cell, .page>>>.el-table__row td .cell
    font-size 8px
    line-height 14px
.page>>>.el-table .cell, .el-table th div
    overflow visible
.page>>>.el-table__row
    height 70px
</style>