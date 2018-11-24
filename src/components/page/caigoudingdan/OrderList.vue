<template>
    <div class="order_list">
        <p>单号</p>
        <ul>
            <li v-for="(item,i) in this.tableData" :key="i" @click="getOrderNum">{{item.produce_number}}</li>
        </ul>
    </div>
</template>

<script>

export default {
  name: "OrderList",
  data() {
    return {
      //所有单号的数据
      tableData: [
        {
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
            }
          ]
        },
        {
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
            }
          ]
        },
        {
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
            }
          ]
        },
        {
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
            }
          ]
        },
        {
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
            }
          ]
        },
        {
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
            }
          ]
        },
        {
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
            }
          ]
        },
        {
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
            }
          ]
        },
        {
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
            }
          ]
        },
        {
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
            }
          ]
        },
        {
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
            }
          ]
        },
        {
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
            }
          ]
        },
        {
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
            }
          ]
        },
        {
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
            }
          ]
        },
        {
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
            }
          ]
        },
        {
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
            }
          ]
        },
        {
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
            }
          ]
        },
        {
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
            }
          ]
        },
        {
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
            }
          ]
        },
        {
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
            }
          ]
        },
        {
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
            }
          ]
        },
        {
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
            }
          ]
        },
        {
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
            }
          ]
        },
        {
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
            }
          ]
        },
        {
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
            }
          ]
        },
        {
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
            }
          ]
        },
        {
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
            }
          ]
        },
        {
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
            }
          ]
        },
        {
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
            }
          ]
        },
        {
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
            }
          ]
        },
        {
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
            }
          ]
        },
        {
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
            }
          ]
        },
        {
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
            }
          ]
        },
        {
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
            }
          ]
        },
        {
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
            }
          ]
        }
      ]
    };
  },
  methods: {
      //向父组件传输当前选择的单号
    getOrderNum(e) {
      this.$emit('ordersearch',e.target.innerText); 
    }
  }
};
</script>

<style lang="stylus" scoped>

.order_list>>>th, .order_list>>>td
    padding 0
.order_list>>>.el-table th>.cell
    line-height 25px !important
    height 25px
    font-size 14px
    text-align center
    font-weight bold
    color #444
.order_list>>>.el-table .cell
    line-height 20px
    cursor pointer
.order_list
    width 15%
    height 94%
    position absolute
    border 1px solid #d9d9d9
    overflow hidden
    top 10px
    left 0

    p
        height 2.5vh
        line-height 2.5vh
        width 100%
        background #fff
        z-index 99
        font-size 14px
        text-align center
        color #444
        position absolute
        top 0
        font-weight bold
        border-bottom 1px solid #d9d9d9
    ul
        width 100%
        height 100%
        overflow auto
        position absolute
        top 2.5vh
        padding-bottom 2.5vh
        li
            width 100%
            height 2.5vh
            line-height 2.5vh
            font-size 14px
            color #444
            padding-left 10px
            cursor pointer
        li:hover
            background #f2f2f2
</style>
