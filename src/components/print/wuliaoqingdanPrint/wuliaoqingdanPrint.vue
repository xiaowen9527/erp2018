<template>
    <div>
        <div class="page" v-for="(item,i) in pageTableArr" :key="i">
            <!-- 页面标题 -->
            <!-- <h3 class="pageTitle">{{mianliaoFristForm.pageTitle}}</h3> -->
            <h3 class="pageTitle">物料清单</h3>

            <!-- 页面顶部 -->
            <div class="pageTit clearfix">
                <div class="pageNum">页码：{{i+1}}/{{pageTableArr.length}}</div>
            </div>

            <!-- 页面表格 -->
            <div class="table">
                <div class="order_table">
                    <el-table :data="item" border style="width: 100%">
                        <el-table-column prop="psn" label="款号" min-width="6.8%">
                        </el-table-column>
                        <el-table-column prop="materialSn" label="物料编码" min-width="6.8%">
                        </el-table-column>
                        <el-table-column prop="materialName" label="名称" min-width="6.8%">
                        </el-table-column>
                        <el-table-column prop="kz" label="克重" min-width="6.8%">
                        </el-table-column>
                        <el-table-column prop="size" label="布宽" min-width="6.8%">
                        </el-table-column>
                        <el-table-column prop="dosageUnit" label="用量单位" min-width="6.8%">
                        </el-table-column>
                        <el-table-column prop="dosage" label="用量" min-width="6.8%">
                        </el-table-column>
                        <el-table-column prop="purchaseUnit" label="采购单位" min-width="6.8%">
                        </el-table-column>
                        <el-table-column prop="func" label="领用部门" min-width="6.8%">
                        </el-table-column>
                        <el-table-column prop="part" label="应用部位" min-width="6.8%">
                        </el-table-column>
                        <el-table-column prop="explain" label="规格说明" min-width="6.8%">
                        </el-table-column>
                        <el-table-column prop="nature" label="性质" min-width="6.8%">
                        </el-table-column>
                        <el-table-column prop="lsj" label="物料颜色" min-width="9.2%">
                            <template slot-scope="scope">
                                <span v-for="materialColor in scope.row.attachment.color ">{{materialColor.colorSn}}-{{materialColor.color}},</span>
                            </template>                            
                        </el-table-column>
                        <el-table-column prop="DesignColor" label="产品颜色" min-width="9.2%">
                            <template slot-scope="scope">
                                <span v-for="desgin in scope.row.DesignColor ">{{desgin.colorSn}}-{{desgin.colorName}},</span>
                            </template>
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
    name: "wuliaoqingdanPrint",
    data() {
        return {
            pageTableArr: [],  //一页的数据
            mianliaoFristForm: {
                pageTitle: "物料清单",
                pageTit: {},
                pageTable: [],
                pageTableArr: []
            }
        };
    },

    methods: {
        // 限定一页显示多少条数据
        sliceArray(array, size) {
            var result = [];
            for (var x = 0; x < Math.ceil(array.length / size); x++) {
                var start = x * size;
                var end = start + size;
                array[x].DesignColor = this.mianliaoFristForm.DesignColor
                result.push(array.slice(start, end));
            }
            return result;
        }
    },

    created() {
        // this.mianliaoFristForm.pageTit = JSON.parse(
        //   localStorage.getItem("pageTit")
        // );
        this.mianliaoFristForm.pageTable = JSON.parse(
            localStorage.getItem("printList")
        );
        this.mianliaoFristForm.DesignColor = JSON.parse(
            localStorage.getItem("DesignColor")
        );
        // if (this.mianliaoFristForm) {
        //   window.print();
        //   localStorage.clear();
        // }

        this.pageTableArr = this.sliceArray(
            this.mianliaoFristForm.pageTable,
            10
        );
        document.getElementsByTagName("html")[0].style.overflow = "auto";
    },
    mounted() {
        console.log(this.pageTableArr)
        let Arr = this.mianliaoFristForm.pageTable;
        for (var i in Arr) {
            for (var j in Arr[i].attachment) {
                if (j == "外采价") {
                    Arr[i].wcj = Arr[i].attachment[j];
                }
                if (j == "生产成本价") {
                    Arr[i].sccbj = Arr[i].attachment[j];
                }
                if (j == "出厂价") {
                    Arr[i].ccj = Arr[i].attachment[j];
                }
                if (j == "体系价") {
                    Arr[i].txj = Arr[i].attachment[j];
                }
                if (j == "代理价") {
                    Arr[i].dlj = Arr[i].attachment[j];
                }
                if (j == "电商零售价") {
                    Arr[i].dsxsj = Arr[i].attachment[j];
                }
                if (j == "吊牌价") {
                    Arr[i].dpj = Arr[i].attachment[j];
                }
                if (j == "销售价") {
                    Arr[i].xsj = Arr[i].attachment[j];
                }
            }
        }
        this.mianliaoFristForm.pageTable = Arr;
        console.log(this.mianliaoFristForm.pageTable);
    }
};
</script>

<style lang="stylus" scoped>
@page
    size A4 landscape
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
    height 84px
</style>