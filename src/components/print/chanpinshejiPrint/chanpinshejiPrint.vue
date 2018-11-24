<template>
    <div class="page">
        <!-- 页面标题 -->
        <h3 class="page_title">
            产品设计档案
            <svg id="barcode"></svg>
        </h3>
        <h3></h3>
        
        <!-- 页面顶部 -->
       <div class="page_tit clearfix">
            <div>设计款号：{{chanpinsheji.plksSn}}</div>
            <div>颜色：{{chanpinsheji.colorName}}</div>
            <div>尺码：{{chanpinsheji.sizeName}}</div>
            <div>日期：{{chanpinsheji.date}}</div>
        </div>

        <!-- 页面数据 -->
        <div class="div_table">
            <table>
                <tr>
                    <td>企划编号：{{chanpinsheji.plksSn}}</td>
                    <td>日期：{{chanpinsheji.date}}</td>
                    <td>产品类别：{{chanpinsheji.lbch2Name}}</td>
                    <td>预计上货波段：{{chanpinsheji.loadTime}}</td>
                </tr>
                <tr>
                    <td>设计师：{{chanpinsheji.designer}}</td>
                    <td>价格区间：{{chanpinsheji.price}}</td>
                    <td>年龄段：{{chanpinsheji.age}}</td>
                    <td>品牌：{{chanpinsheji.brand}}</td>
                </tr>
                <tr>
                    <td>年度：{{chanpinsheji.year}}</td>
                    <td>季度：{{chanpinsheji.quarter}}</td>
                    <td>渠道：{{chanpinsheji.channel}}</td>
                    <td>面料类别：{{chanpinsheji.lbch3Name}}</td>
                </tr>
                <tr>
                    <td>款式：{{chanpinsheji.plksName}}</td>
                    <td>年度：{{chanpinsheji.year}}</td>
                    <td>季度：{{chanpinsheji.quarter}}</td>
                    <td>性别：{{chanpinsheji.sex}}</td>
                </tr>
            </table>

            <table>
                <tr class="table_pic">
                    <td class="pic_first_td">设计图</td>
                    <td class="pic_second_td">
                        <img v-for="item in imgArr[0]" :src="item" />
                    </td>
                </tr>
                <tr class="table_pic">
                    <td class="pic_first_td">样衣图</td>
                    <td class="pic_second_td">
                        <img v-for="item in imgArr[1]" :src="item" />
                    </td>
                </tr>
                <tr class="table_pic">
                    <td class="pic_first_td">面料图</td>
                    <td class="pic_second_td">
                        <img v-for="item in imgArr[2]" :src="item" />
                    </td>
                </tr>
            </table>
        </div>

        <!-- 页面底部 -->
        <div class="page_tit clearfix">
            <div>审核：{{chanpinsheji.sh}}</div>
            <div>审核人：{{chanpinsheji.shUser}}</div>
            <div>审核日期：{{chanpinsheji.shDate}}</div>
        </div>
        <div class="page_tit clearfix">
            <div>审批：{{chanpinsheji.sp}}</div>
            <div>审批人：{{chanpinsheji.spUser}}</div>
            <div>审批日期：{{chanpinsheji.spDate}}</div>
        </div>
    </div>
</template>

<script>
import JsBarcode from "jsbarcode";
export default {
  name: "chanpinshejiPrint",
  data() {
    return {
      chanpinsheji: {},
      imgArr:[],
      barcodes:""
    };
  },

  methods: {
    barcode() {
      JsBarcode("#barcode", this.chanpinsheji.pSn+this.chanpinsheji.colorSn+this.chanpinsheji.sizeSn, {
        format: "CODE128", //选择要使用的条形码类型
        displayValue: true, //是否在条形码下方显示文字
        width: 2,
        height: 30
        // lineColor: "#f1f1f1",  // 条形码颜色
        // textPosition: "top" //设置文本的垂直位置
      });
    },
    getLocalStorage(name,data){
        if(data){
            name = data
        }
        return name
    }
  },
  created() {
      this.chanpinsheji = JSON.parse(localStorage.getItem("pageTit"))
      this.imgArr = JSON.parse(localStorage.getItem("imgArr"))

      console.log(this.imgArr);
      
        if(this.chanpinsheji){
            window.print()
            localStorage.clear()
        }      

        document.getElementsByTagName('html')[0].style.overflow = 'auto'        
  },
  mounted() {
    this.barcode();
  }
};
</script>

<style lang="stylus" scoped>
// @page { size: A4 landscape; }
@page { size: A4 portrait; }
.page
    width: 1010px
    height: 1450px
    // border: 1px solid #333
    margin: 0 auto
/* 标题 */
.page_title
    text-align: center
    font-weight: bold
    font-size: 30px
    margin-bottom: 40px
    position: relative
    #barcode
        position: absolute
        top: 0
        left: 50px
/* 页面小标题 */
.page_tit
    max-width: 90%
    margin-left: 50px
    padding-top: 40px
    margin-bottom: 30px
    position: relative
.page_tit div
    font-size: 20px
    margin-right: 30px
    float: left
img
    display block
    max-width 40%
    max-height 250px
    float left
    margin-left 5%
// 页面数据
.div_table
    width: 100%
    box-sizing: border-box
    padding: 0 50px
    table
        width: 100%
        border: 1px solid #333
        tr
            width: 100%
            td
                width: 25%
                font-size: 18px
                height: 28px
                line-height: 28px
                border: 1px solid #333
                box-sizing: border-box
                padding-left: 4px
        .table_pic
            width: 100%
            height: 300px
            .pic_first_td
                width: 28px
                box-sizing: border-box
                padding-left: 4px
            .pic_second_td
                width: auto
</style>