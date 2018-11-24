<template>
    <div class="Search">
        <el-button class="btn" :class="{btn_collapse:collapse}" ref="addOrder" @click="addOrder">新增</el-button>
        <el-button class="btn" :class="{btn_collapse:collapse}" ref="editOrder" @click="editOrder">修改</el-button>
        <el-button class="btn" :class="{btn_collapse:collapse}" ref="deleteOrder" @click="deleteOrder">删除</el-button>
        <el-button class="btn" :class="{btn_collapse:collapse}" ref="printOrder" @click="printOrder">打印</el-button>
        <el-button class="btn" :class="{btn_collapse:collapse}" ref="searchOrder"  @click="searchOrder">查找</el-button>
        <input type="text" class="OrderSearchNum" v-model="this.OrderSearchNum">
        <el-button class="btn" :class="{btn_collapse:collapse}" ref="outOrder" @click="outOrder">退出</el-button>
        <el-button class="btn" :class="{btn_collapse:collapse}" ref="importOrder" @click="importOrder">导入</el-button>
        <el-button class="btn" :class="{btn_collapse:collapse}" ref="exportOrder" @click="exportOrder">导出</el-button>
        <el-button class="btn" :class="{btn_collapse:collapse}" ref="upexaOrder" @click="upexaOrder">弃审</el-button>
        <el-button class="btn" :class="{btn_collapse:collapse}" ref="exaOrder" @click="exaOrder">审核</el-button>
        <el-button class="btn" :class="{btn_collapse:collapse}" ref="upappOrder" @click="upappOrder">弃核</el-button>
        <el-button class="btn" :class="{btn_collapse:collapse}" ref="appOrder" @click="appOrder">核准</el-button>
        <el-button class="btn" :class="{btn_collapse:collapse}" ref="keepOrder" @click="keepOrder">记账</el-button>
        <el-button class="btn" :class="{btn_collapse:collapse}" ref="upkeepOrder" @click="upkeepOrder">弃记账</el-button>
        <el-button class="btn" :class="{btn_collapse:collapse}" ref="sheetOrder" @click="sheetOrder">关单</el-button>
        <el-button class="btn" :class="{btn_collapse:collapse}" ref="upsheetOrder" @click="upsheetOrder">弃关单</el-button>
    </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "Search",
  props: ['OrderSearchNum'],
  data() {
    return {
      orderData: {
        id: "1",
        produce_number: "A20181101001",
        delivery_data: "2018-08-30",
        add_time: "2018-08-30",
        supplier: "广州洪兴",
        delivery_repertory: "广州洪兴",
        contract_sn: "20181101001",
        option_id: "广州洪兴",
        readme: "广州洪兴广州洪兴广州洪兴广州洪兴",
        material: [
          {
            material_number: "1",
            material_name: "XFDFD",
            spec: "FDF2",
            count: "10",
            price: "20",
            money: "200",
            weight: 20
          },
          {
            material_number: "1",
            material_name: "XFDFD",
            spec: "FDF2",
            count: "10",
            price: "20",
            money: "200",
            weight: 20
          },
          {
            material_number: "1",
            material_name: "XFDFD",
            spec: "FDF2",
            count: "10",
            price: "20",
            money: "200",
            weight: 20
          },
          {
            material_number: "1",
            material_name: "XFDFD",
            spec: "FDF2",
            count: "10",
            price: "20",
            money: "200",
            weight: 20
          },
          {
            material_number: "1",
            material_name: "XFDFD",
            spec: "FDF2",
            count: "10",
            price: "20",
            money: "200",
            weight: 20
          },
          {
            material_number: "1",
            material_name: "XFDFD",
            spec: "FDF2",
            count: "10",
            price: "20",
            money: "200",
            weight: 20
          },
          {
            material_number: "1",
            material_name: "XFDFD",
            spec: "FDF2",
            count: "10",
            price: "20",
            money: "200",
            weight: 20
          },
          {
            material_number: "1",
            material_name: "XFDFD",
            spec: "FDF2",
            count: "10",
            price: "20",
            money: "200",
            weight: 20
          },
          {
            material_number: "1",
            material_name: "XFDFD",
            spec: "FDF2",
            count: "10",
            price: "20",
            money: "200",
            weight: 20
          },
          {
            material_number: "1",
            material_name: "XFDFD",
            spec: "FDF2",
            count: "10",
            price: "20",
            money: "200",
            weight: 20
          },
          {
            material_number: "1",
            material_name: "XFDFD",
            spec: "FDF2",
            count: "10",
            price: "20",
            money: "200",
            weight: 20
          },
          {
            material_number: "1",
            material_name: "XFDFD",
            spec: "FDF2",
            count: "10",
            price: "20",
            money: "200",
            weight: 20
          },
          {
            material_number: "1",
            material_name: "XFDFD",
            spec: "FDF2",
            count: "10",
            price: "20",
            money: "200",
            weight: 20
          },
          {
            material_number: "1",
            material_name: "XFDFD",
            spec: "FDF2",
            count: "10",
            price: "20",
            money: "200",
            weight: 20
          },
          {
            material_number: "1",
            material_name: "XFDFD",
            spec: "FDF2",
            count: "10",
            price: "20",
            money: "200",
            weight: 20
          },
          {
            material_number: "1",
            material_name: "XFDFD",
            spec: "FDF2",
            count: "10",
            price: "20",
            money: "200",
            weight: 20
          },
          {
            material_number: "1",
            material_name: "XFDFD",
            spec: "FDF2",
            count: "10",
            price: "20",
            money: "200",
            weight: 20
          },
          {
            material_number: "1",
            material_name: "XFDFD",
            spec: "FDF2",
            count: "10",
            price: "20",
            money: "200",
            weight: 20
          },
          {
            material_number: "1",
            material_name: "XFDFD",
            spec: "FDF2",
            count: "10",
            price: "20",
            money: "200",
            weight: 20
          },
          {
            material_number: "1",
            material_name: "XFDFD",
            spec: "FDF2",
            count: "10",
            price: "20",
            money: "200",
            weight: 20
          },
          {
            material_number: "1",
            material_name: "XFDFD",
            spec: "FDF2",
            count: "10",
            price: "20",
            money: "200",
            weight: 20
          },
          {
            material_number: "1",
            material_name: "XFDFD",
            spec: "FDF2",
            count: "10",
            price: "20",
            money: "200",
            weight: 20
          },
          {
            material_number: "1",
            material_name: "XFDFD",
            spec: "FDF2",
            count: "10",
            price: "20",
            money: "200",
            weight: 20
          },
          {
            material_number: "1",
            material_name: "XFDFD",
            spec: "FDF2",
            count: "10",
            price: "20",
            money: "200",
            weight: 20
          },
          {
            material_number: "1",
            material_name: "XFDFD",
            spec: "FDF2",
            count: "10",
            price: "20",
            money: "200",
            weight: 20
          },
          {
            material_number: "1",
            material_name: "XFDFD",
            spec: "FDF2",
            count: "10",
            price: "20",
            money: "200",
            weight: 20
          },
          {
            material_number: "1",
            material_name: "XFDFD",
            spec: "FDF2",
            count: "10",
            price: "20",
            money: "200",
            weight: 20
          },
          {
            material_number: "1",
            material_name: "XFDFD",
            spec: "FDF2",
            count: "10",
            price: "20",
            money: "200",
            weight: 20
          },
          {
            material_number: "1",
            material_name: "XFDFD",
            spec: "FDF2",
            count: "10",
            price: "20",
            money: "200",
            weight: 20
          },
          {
            material_number: "1",
            material_name: "XFDFD",
            spec: "FDF2",
            count: "10",
            price: "20",
            money: "200",
            weight: 20
          },
          {
            material_number: "1",
            material_name: "XFDFD",
            spec: "FDF2",
            count: "10",
            price: "20",
            money: "200",
            weight: 20
          },
          {
            material_number: "1",
            material_name: "XFDFD",
            spec: "FDF2",
            count: "10",
            price: "20",
            money: "200",
            weight: 20
          },
          {
            material_number: "13",
            material_name: "XFDFD",
            spec: "FDF2",
            count: "10",
            price: "20",
            money: "200",
            weight: 20
          }
        ]
      }
    };
  },

  computed: {
      ...mapState(["collapse"])
  },
  methods: {
    addOrder() {
      console.log("addOrder");
    },
    editOrder() {
      console.log("editOrder");
    },
    deleteOrder() {
      console.log("deleteOrder");
    },
    printOrder() {
      console.log("printOrder");
    },
    searchOrder() {
     
      //axios获取数据成功后传回父组件
        this.$emit('orderdata',this.orderData)
    },
    outOrder() {
      console.log("outOrder");
    },
    importOrder() {
      console.log("importOrder");
    },
    exportOrder() {
      console.log("exportOrder");
    },
    upexaOrder() {
      console.log("upexaOrder");
    },
    exaOrder() {
      console.log("exaOrder");
    },
    upappOrder() {
      console.log("upappOrder");
    },
    appOrder() {
      console.log("appOrder");
    },
    keepOrder() {
      console.log("keepOrder");
    },
    upkeepOrder() {
      console.log("upkeepOrder");
    },
    sheetOrder() {
      console.log("sheetOrder");
    },
    upsheetOrder() {
      console.log("upsheetOrder");
    }
  }
};
</script>

<style lang="stylus" scoped>
.Search>>>.el-button
    padding 0
.Search
    height 3.5vh
    min-height 35px
    width 100%
    min-width 250px
    border 1px solid #d9d9d9
    border-radius 4px
    margin-top 5px
    padding 0 4px
    overflow hidden
    .btn
        height 28px
        line-height 28px
        background #ffffff
        border 1px solid #d9d9d9
        padding 0 18px
        border-radius 4px
        margin 3px
        font-size 12px
        color #444
        outline none
        cursor pointer
        &.button
            background #f2f2f2
            opacity 0.5
    .btn_collapse
        padding 0 32px
    .SearchText
        height 22px
        line-height 22px
        margin-top 4px
        border 1px solid #d9d9d9
        outline none
        font-size 14px
        width 150px
        padding-left 5px
</style>
