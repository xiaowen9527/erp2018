<template>
    <div>
        <vHeader />
        <vSilderBar @path='getPath' />
        <div class="tabs" :class="{tabs_collapse:collapse}">
            <i class="el-icon-menu" :class="{tran1:collapse,tran2:!collapse}" @click="editCollapse"></i>
            <el-tabs v-model="active" type="card" closable @tab-remove="removeTab" @tab-click="tabClick">
                <el-tab-pane v-for="(item, index) in options" :key="index" :label="item[0]" :name="String(index)">
                    {{item[0]}}
                </el-tab-pane>
            </el-tabs>
        </div>

        <keep-alive>
            <component :is="currentTab" @getOut='out'></component>
        </keep-alive>

        <vFooter />
    </div>
</template>

<script>
import vHeader from "./vHeader";
import vFooter from "./vFooter";
import vSilderBar from "./SilderBar";
import { mapState } from "vuex";
import { NetworkAnomaly, error, succ } from "../../assets/js/message.js";
export default {
  name: "Home",
  data() {
    return {
      currentTab: "index",
      collapse: false,
      active: "0",
      options: [["首页", "index"]],
      option: 0
    };
  },

  methods: {
    editCollapse() {
      this.collapse = !this.collapse;
      this.$store.dispatch("docollapse", this.collapse);
    },
    //当左侧导航点击的时候
    getPath(data) {
      let indexs = data.split(",");
      for (let i = 0; i < this.options.length; i++) {
        if (this.options[i][1] == indexs[1]) {
          this.option = i;
        }else{
        }
      }

      if (this.options.length > 12) {
        error("打开的页面过多，请关闭多余窗口！");
      } else if (this.option === 0) {
        this.currentTab = indexs[1];
        this.options.push(indexs);
        this.active = String(this.options.length - 1);          
      } else {
        this.currentTab = this.options[this.option][1];
        this.active = String(this.option);
        this.option=0
      }
    },
    //删除tab
    removeTab(targetName) {
      let tabs = this.options;
      let activeName = this.active;
      if (this.options.length === 1) {
        this.options = [["首页", "index"]];
        this.currentTab = "index";
      } else {
        if (activeName === targetName) {
          tabs.forEach((tab, index) => {
            if (tab.name === targetName) {
              let nextTab = tabs[index + 1] || tabs[index - 1];
              if (nextTab) {
                activeName = nextTab.name;
              }
            }
          });
        }
        tabs.splice(parseInt(targetName), 1);
        this.active = String(tabs.length - 1);
        this.currentTab = tabs[parseInt(this.active)][1];
      }
    },
    //点击tab的时候
    tabClick(targetName) {
      this.active = String(targetName.name);
      this.currentTab = this.options[this.active][1];
    },
    //其他页面点击退出
    out(data) {
      if (this.options.length === 1) {
        this.options = [["首页", "index"]];
        this.currentTab = "index";
      } else {
        this.options.splice(parseInt(this.active), 1);
        this.active = String(this.options.length - 1);
        this.currentTab = this.options[parseInt(this.active)][1];
      }
    }
  },
  components: {
    vHeader,
    vFooter,
    vSilderBar,

    //动态组件（按需加载）
    // 第一阶段
    index: resolve => require(["@/components/page/Index/Index"], resolve),
    caidanshezhi: resolve => require(["@/components/page/caidanshezhi/caidanshezhi"], resolve),
    cunhuofenlei: resolve => require(["@/components/page/cunhuofenlei/cunhuofenlei"], resolve),
    zuzhijiagou: resolve => require(["@/components/page/zuzhijiagou/zuzhijiagou"], resolve),
    gongsixinxi: resolve => require(["@/components/page/gongsixinxi/gongsixinxi"], resolve),
    yansedangan: resolve => require(["@/components/page/yansedangan/yansedangan"], resolve),
    chimadangan: resolve => require(["@/components/page/chimadangan/chimadangan"], resolve),
    jibenleibie: resolve => require(["@/components/page/jibenleibie/jibenleibie"], resolve),
    keshangdangan: resolve => require(["@/components/page/keshangdangan/keshangdangan"], resolve),
      
    //第二阶段
    wuliaodangan: resolve =>require(["@/components/page/wuliaodangan/wuliaodangan"], resolve),
    mianliaoyudingjihua: resolve =>require(["@/components/page/mianliaoyudingjihua/mianliaoyudingjihua"], resolve),
    pinleikuanshidingyi: resolve =>require(["@/components/page/pinleikuanshidingyi/pinleikuanshidingyi"], resolve),
    shangpinqihua: resolve =>require(["@/components/page/shangpinqihua/shangpinqihua"], resolve),
    yanfafengong: resolve =>require(["@/components/page/yanfafengong/yanfafengong"], resolve),
    chanpinsheji: resolve =>require(["@/components/page/chanpinsheji/chanpinsheji"], resolve),
    yangpinzhizuo: resolve =>require(["@/components/page/yangpinzhizuo/yangpinzhizuo"], resolve),
    chanpinfusema: resolve =>require(["@/components/page/chanpinfusema/chanpinfusema"], resolve),
    yangyijiediao: resolve =>require(["@/components/page/yangyijiediao/yangyijiediao"], resolve),
    biaoqiansheji: resolve =>require(["@/components/page/biaoqiansheji/biaoqiansheji"], resolve),
    chanpinbiaoqian: resolve =>require(["@/components/page/chanpinbiaoqian/chanpinbiaoqian"], resolve),
    wuliaoguige: resolve =>require(["@/components/page/wuliaoguige/wuliaoguige"], resolve),
    wuliaoqingdan: resolve =>require(["@/components/page/wuliaoqingdan/wuliaoqingdan"], resolve),
    chanpindingjia: resolve =>require(["@/components/page/chanpindingjia/chanpindingjia"], resolve),
    chanpinchaxun: resolve =>require(["@/components/page/chanpinchaxun/chanpinchaxun"], resolve),
    shengchangongxu: resolve =>require(["@/components/page/shengchangongxu/shengchangongxu"], resolve),

    //第三阶段
    xiaoshoukuanhao: resolve =>require(["@/components/page/xiaoshoukuanhao/xiaoshoukuanhao"], resolve),
    dingdanjindu: resolve =>require(["@/components/page/dingdanjindu/dingdanjindu"], resolve),
    shengchandingdan: resolve =>require(["@/components/page/shengchandingdan/shengchandingdan"], resolve),
    cangkushezhi: resolve =>require(["@/components/page/cangkushezhi/cangkushezhi"], resolve),
    xiaoshoudingdan: resolve =>require(["@/components/page/xiaoshoudingdan/xiaoshoudingdan"], resolve),
    shangpinzuhe: resolve =>require(["@/components/page/shangpinzuhe/shangpinzuhe"], resolve),                                                      //
    shangpintiaojia: resolve =>require(["@/components/page/shangpintiaojia/shangpintiaojia"], resolve),                                                      //
    wuliaoxuqiuyunsuan: resolve =>require(["@/components/page/wuliaoxuqiuyunsuan/wuliaoxuqiuyunsuan"], resolve),                                    //物料需求运算
    wuliaoxuqiutiaozheng: resolve =>require(["@/components/page/wuliaoxuqiutiaozheng/wuliaoxuqiutiaozheng"], resolve),                              //物料需求调整
    wuliaocaigouxuqiu: resolve =>require(["@/components/page/wuliaocaigouxuqiu/wuliaocaigouxuqiu"], resolve),                                       //物料采购需求

    cailiaotihuanshenqing: resolve =>require(["@/components/page/cailiaotihuanshenqing/cailiaotihuanshenqing"], resolve),                               //材料替换申请
    cailiaocaigoujinhuodingdan: resolve =>require(["@/components/page/cailiaocaigoujinhuodingdan/cailiaocaigoujinhuodingdan"], resolve),                     //材料采购进货订单
    cailiaocaigoutuihuodingdan: resolve =>require(["@/components/page/cailiaocaigoutuihuodingdan/cailiaocaigoutuihuodingdan"], resolve),                      //材料采购退货订单
    cailiaocaigoutuihuodingdan: resolve =>require(["@/components/page/cailiaocaigoulaihuozhijian/cailiaocaigoulaihuozhijian"], resolve),                       //材料采购来货质检
    cailiaocaigoulaihuozhijian: resolve =>require(["@/components/page/cailiaocaigouzhijianruku/cailiaocaigouzhijianruku"], resolve),                            //材料采购质验入库
    cailiaocaigouzhijieruku: resolve =>require(["@/components/page/cailiaocaigouzhijieruku/cailiaocaigouzhijieruku"], resolve),                              //材料采购直接入库
    cailiaokucuntuihuozhijian: resolve =>require(["@/components/page/cailiaokucuntuihuozhijian/cailiaokucuntuihuozhijian"], resolve),                           //材料库存退货质检
    cailiaozhijiantuihuochuku: resolve =>require(["@/components/page/cailiaozhijiantuihuochuku/cailiaozhijiantuihuochuku"], resolve),                           //材料质验退货出库
    cailiaozhijietuihuochuku: resolve =>require(["@/components/page/cailiaozhijietuihuochuku/cailiaozhijietuihuochuku"], resolve),                             //材料直接退货出库
    cailiaogongyijiagong: resolve =>require(["@/components/page/cailiaogongyijiagong/cailiaogongyijiagong"], resolve),                                       //材料工艺加工

  }
};
</script>

<style lang="stylus" scoped>
.tabs>>>.el-tabs__item
    height 3vh
    line-height 3vh
    font-size 1.4vh
.tabs>>>.el-tabs__item:focus.is-active.is-focus:not(:active)
    box-shadow none
.tabs
    height 3.3vh
    background #f2f2f2
    border .1vh solid #d9d9d9
    border-radius 4px
    overflow hidden
    position absolute
    left 12vw
    width 100vw
    margin .5vh 
    transition left 0.3s linear
    &.tabs_collapse
        width 100vw
        margin 1vh 0.5%
        left 0
        transition left 0.3s linear
    i
        width 30px
        line-height 3vh
        font-size 2.2vh
        margin 0 1vh
        float left
        text-align center
        cursor pointer
        &.tran1
            -webkit-transform rotate(135deg)
            transform rotate(135deg)
            -webkit-transition -webkit-transform 0.1s linear
            transition transform 0.1s linear
        &.tran2
            -webkit-transform rotate(0deg)
            transform rotate(0deg)
            -webkit-transition -webkit-transform 0.1s linear
            transition transform 0.1s linear
    .el-tabs
        margin-left 5vh
        height 3.3vh
</style>
