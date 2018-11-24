<template>
<div>
    <div class="page" v-for="(item,i) in pageTableArr" :key="i">
        <!-- 页面标题 -->
        <h3 class="pageTitle">{{mianliaoFristForm.pageTitle}}</h3>

        <!-- 页面顶部 -->
        <div class="pageTit clearfix">
            <div>日期：{{mianliaoFristForm.pageTit.date}}</div>
            <div>单号：{{mianliaoFristForm.pageTit.sn}}</div>
            <div>供应商：{{mianliaoFristForm.pageTit.aKsDaName}}</div>
            <div>年度：{{mianliaoFristForm.pageTit.year}}</div>
            <div>审核：{{mianliaoFristForm.pageTit.sh}}</div>
            <div class="pageNum">页码：{{i+1}}/{{pageTableArr.length}}</div>
        </div>

        <!-- 页面表格 -->
        <div class="table">
            <div class="order_table">
                <el-table :data="item" border style="width: 100%">
                    <el-table-column prop="quarter" label="季度" min-width="7%">
                    </el-table-column>
                    <el-table-column prop="brandName" label="品牌" min-width="7%">
                    </el-table-column>
                    <el-table-column prop="materialSn" label="物号" min-width="7%">
                    </el-table-column>
                    <el-table-column prop="yscmName" label="名称" min-width="7%">
                    </el-table-column>
                    <el-table-column prop="yscmSn" label="色号" min-width="7%">
                    </el-table-column>
                    <el-table-column prop="size" label="布宽" min-width="7%">
                    </el-table-column>
                    <el-table-column prop="technics" label="工艺" min-width="17%">
                    </el-table-column>
                    <el-table-column prop="kz" label="克重" min-width="7%">
                    </el-table-column>
                    <el-table-column prop="cgUnit" label="单位" min-width="7%">
                    </el-table-column>
                    <el-table-column prop="amount" label="数量" min-width="7%">
                    </el-table-column>
                    <el-table-column prop="price" label="单价" min-width="7%">
                    </el-table-column>
                    <el-table-column prop="money" label="金额" min-width="6.8%">
                    </el-table-column>
                </el-table>
            </div>
        </div>

        <!-- 页面底部 -->
        <div class="pageTit clearfix">
            <div>编制人：{{mianliaoFristForm.pageTit.addUser}}</div>
            <div>编制日期：{{mianliaoFristForm.pageTit.addDate}}</div>
            <div>审核人：{{mianliaoFristForm.pageTit.shUser}}</div>
            <div>审核日期：{{mianliaoFristForm.pageTit.shDate}}</div>
        </div>
    </div>
</div>
</template>

<script>
export default {
  name: "mianliaoyudingjihuaPrint",
  data() {
    return {
      mianliaoFristForm: {
        pageTitle: "面料预定计划",
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
    this.mianliaoFristForm.pageTit = JSON.parse(localStorage.getItem("pageTit"))
    this.mianliaoFristForm.pageTable = JSON.parse(localStorage.getItem("printList"))
    if(this.mianliaoFristForm){
        window.print()
        localStorage.clear()
    }


    this.pageTableArr = this.sliceArray(this.mianliaoFristForm.pageTable, 17);
    document.getElementsByTagName('html')[0].style.overflow = 'auto'
  },

};
</script>

<style lang="stylus" scoped>
@page { size: A4 landscape; }
// @page { size: A4 portrait; }
.page>>>.el-table .cell
    height 18px
    line-height 18px
    text-align center
    font-size 14px
.page {
    width: 1500px;
    height: 1010px;
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
.pageTit {
    max-width: 90%;
    margin-left: 50px;
    margin-top: 40px;
    margin-bottom 30px;
    position relative
}

.pageTit div {
    font-size: 20px;
    margin-right: 30px;
    float: left;
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
</style>