<template>
    <div class="container" :class="{container_collapse:collapse}">
        <p class="page_title">采购订单</p>
        <vSearch :OrderSearchNum='OrderSearchNum' @orderdata='getOrderData' />
        <div class="order_container clearfix">
            <OrderList @ordersearch='OrderSearchText' />
            <div class="order_content">
                <div class="order_from">
                    <ul>
                        <li>
                            <label>单号</label>
                            <input type="text" v-model="this.thisOrder.produce_number">
                        </li>
                        <li>
                            <label>日期</label>
                            <input type="text" v-model="this.thisOrder.delivery_data">
                        </li>
                        <li>
                            <label>供应商</label>
                            <input type="text" v-model="this.thisOrder.supplier">
                        </li>
                        <li>
                            <label>id</label>
                            <input type="text" v-model="this.thisOrder.id">
                        </li>
                        <li>
                            <label>仓库</label>
                            <input type="text" v-model="this.thisOrder.delivery_repertory">
                        </li>
                        <li>
                            <label>交货日期</label>
                            <input type="text" v-model="this.thisOrder.delivery_data">
                        </li>
                        <li>
                            <label>合同编号</label>
                            <input type="text" v-model="this.thisOrder.contract_sn">
                        </li>
                        <li>
                            <label>类型</label>
                            <input type="text" v-model="this.thisOrder.option_id">
                        </li>
                        <li class="lase-text">
                            <label>说明</label>
                            <input type="text" class="lase-text" v-model="this.thisOrder.readme">
                        </li>
                    </ul>
                </div>
                <div class="order_table">
                    <el-table :data="materialList" border style="width: 100%">
                        <el-table-column fixed prop="material_number" label="物料编号" width="170">
                        </el-table-column>
                        <el-table-column prop="material_name" label="名称" width="220">
                        </el-table-column>
                        <el-table-column prop="spec" label="规格" width="220">
                        </el-table-column>
                        <el-table-column prop="count" label="数量" width="170">
                        </el-table-column>
                        <el-table-column prop="price" label="单价" width="170">
                        </el-table-column>
                        <el-table-column prop="money" label="金额" width="220">
                        </el-table-column>
                        <el-table-column prop="weight" label="克重" width="160">
                        </el-table-column>
                        <el-table-column fixed="right" label="操作" width="210">
                            <template slot-scope="scope">
                                <el-button @click="handleEdit(scope.$index, scope.row)" type="text">编辑</el-button>
                                <el-button @click="handleDelete(scope.$index, scope.row)" type="text">删除</el-button>
                            </template>
                        </el-table-column>
                    </el-table>
                </div>
            </div>
        </div>

        <vPages :thisOrder='thisOrder' @material='getMaterial' />

        <!-- 编辑弹出框 -->
        <el-dialog title="编辑" :visible.sync="editVisible" width="30%">
            <el-form ref="form" :model="form" label-width="100px">
                <el-form-item label="物料编号">
                    <el-input v-model="form.material_number"></el-input>
                </el-form-item>
                <el-form-item label="名称">
                    <el-input v-model="form.material_name"></el-input>
                </el-form-item>
                <el-form-item label="规格">
                    <el-input v-model="form.spec"></el-input>
                </el-form-item>
                <el-form-item label="数量">
                    <el-input v-model="form.count"></el-input>
                </el-form-item>
                <el-form-item label="单价">
                    <el-input v-model="form.price"></el-input>
                </el-form-item>
                <el-form-item label="金额">
                    <el-input v-model="form.money"></el-input>
                </el-form-item>
                <el-form-item label="克重">
                    <el-input v-model="form.weight"></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="editVisible = false">取 消</el-button>
                <el-button type="primary" @click="saveEdit">确 定</el-button>
            </span>
        </el-dialog>
        <!-- 删除提示框 -->
        <el-dialog title="提示" :visible.sync="delVisible" width="300px" center>
            <div class="del-dialog-cnt">删除不可恢复，是否确定删除？</div>
            <span slot="footer" class="dialog-footer">
                <el-button @click="delVisible = false">取 消</el-button>
                <el-button type="primary" @click="deleteRow">确 定</el-button>
            </span>
        </el-dialog>

    </div>
</template>

<script>
import { mapState } from "vuex";

import vSearch from "./Search";
import vPages from "./Pages";
import OrderList from "./OrderList";
export default {
  name: "ProductionOrder",
  data() {
    return {
      editVisible: false, //编辑弹窗开关
      delVisible: false, //删除弹出开关
      OrderSearchNum: "", //单号查询组件参数
      materialList: [], //当前单号物料数据
      //编辑弹出框数据
      form: {
        material_number: "",
        material_name: "",
        spec: "",
        count: "",
        price: "",
        money: "",
        weight: ""
      },
      //当前单号表格数据的索引
      idx: 0,

      //当前单号的所有数据
      thisOrder: {},
    };
  },
  mounted() {
    this.getOrderList();
  },
  computed: {
    ...mapState(["collapse"])
  },
  methods: {
    //接收当前单号的所有数据
    getOrderData(order) {
      this.thisOrder = order;
    },
    //接收点击的单号
    OrderSearchText(num) {
      if (num) {
        this.OrderSearchNum = num;
      }
    },
    //接收当前单号的表格数据
    getMaterial(list) {
      this.materialList = list;
    },
    //获取所有单号数据
    getOrderList() {},

    //修改按钮
    handleEdit(index, row) {
        
        
        this.idx = index;
      const item = this.materialList[index];
      this.form = {
        material_number: item.material_number,
        material_name: item.material_name,
        spec: item.spec,
        count: item.count,
        price: item.price,
        money: item.money,
        weight: item.weight
      };
      this.editVisible = true;

    
    },
    //删除按钮
    handleDelete(index, row) {
      this.idx = index;
      this.delVisible = true;
    },
    // 保存编辑
    saveEdit() {
      this.$set(this.materialList, this.idx, this.form);
      this.editVisible = false;
      this.$message.success(`修改第 ${this.idx + 1} 行成功`);
      console.log(this.thisOrder);
    },
    // 确定删除
    deleteRow() {
      this.materialList.splice(this.idx, 1);
      this.$message.success("删除成功");
      this.delVisible = false;
    }
  },
  components: {
    vSearch,
    OrderList,
    vPages
  }
};
</script>

<style lang="stylus" scoped>

.order_table>>>th, .order_table>>>.el-table td, .el-table th
    padding 0
.order_table>>>.el-table .cell
    height 2.6vh
    text-align center
.order_table>>>.el-button
    padding-top 6px

.order_container
    width 100%
    height 75vh
    position relative
    .order_content
        width 84%
        height 100%
        float right
        position absolute
        top 10px
        left 16%
        .order_from
            width 100%
            height 10vh
            li
                width 24%
                float left
                margin 2px
                line-height 3vh
                &.lase-text
                    width 100%
                    label
                        width 11%
                label
                    width 25%
                    text-align center
                    display block
                    float left
                    font-size 14px
                input
                    height 2.4vh
                    line-height 2.4vh
                    width 70%
                    padding-left 5px
                    &.lase-text
                        width 85%
        .order_table
            width 100%
            margin-top 5px
            max-height 570px
            border 1px solid #d9d9d9
            overflow scroll
            overflow-x hidden
</style>
