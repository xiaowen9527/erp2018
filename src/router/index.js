import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/common/Home'

Vue.use(Router)

const router = new Router({
    // mode: 'history',
    routes: [{
        path: '/',
        redirect: '/index'
    }, {
        path: '/login',
        name: "login",
        component: resolve => require(['../components/page/Login/Login'], resolve),
        meta: {
            title: '登录'
        }
    },
    {
        path: '/mianliaoyudingjihuaPrint',
        name: "mianliaoyudingjihuaPrint",
        component: resolve => require(['../components/print/mianliaoyudingjihuaPrint/mianliaoyudingjihuaPrint'], resolve),
        meta: {
            title: 'mianliaoyudingjihuaPrint'
        }
    },
    {
        path: '/chanpinshejiPrint',
        name: "chanpinshejiPrint",
        component: resolve => require(['../components/print/chanpinshejiPrint/chanpinshejiPrint'], resolve),
        meta: {
            title: 'chanpinshejiPrint'
        }
    },
    {
        path: '/shangpinqihuaPrint',
        name: "shangpinqihuaPrint",
        component: resolve => require(['../components/print/shangpinqihuaPrint/shangpinqihuaPrint'], resolve),
        meta: {
            title: 'shangpinqihuaPrint'
        }
    },
    {
        path: '/chanpindingjiaPrint',
        name: "chanpindingjiaPrint",
        component: resolve => require(['../components/print/chanpindingjiaPrint/chanpindingjiaPrint'], resolve),
        meta: {
            title: 'chanpindingjiaPrint'
        }
    },
    {
        path: '/wuliaoqingdanPrint',
        name: "wuliaoqingdanPrint",
        component: resolve => require(['../components/print/wuliaoqingdanPrint/wuliaoqingdanPrint'], resolve),
        meta: {
            title: 'wuliaoqingdanPrint'
        }
    },



    {
        path: '/home',
        name: "home",
        component: Home,
        children: [{
            path: '/index',
            name: "index",
            component: resolve => require(['@/components/page/Index/Index'], resolve),
            meta: {
                title: '首页'
            },
        },
        {
            path: '/caigoudingdan',
            name: "caigoudingdan",
            component: resolve => require(['@/components/page/caigoudingdan/caigoudingdan'], resolve),
            meta: {
                title: '采购订单'
            },
        },
        {
            path: '/caidanshezhi',
            name: "caidanshezhi",
            component: resolve => require(['@/components/page/caidanshezhi/caidanshezhi'], resolve),
            meta: {
                title: '菜单设置'
            },
        },
        {
            path: '/cunhuofenlei',
            name: "cunhuofenlei",
            component: resolve => require(['@/components/page/cunhuofenlei/cunhuofenlei'], resolve),
            meta: {
                title: '存货分类'
            },
        },
        {
            path: '/zuzhijiagou',
            name: "zuzhijiagou",
            component: resolve => require(['@/components/page/zuzhijiagou/zuzhijiagou'], resolve),
            meta: {
                title: '组织架构'
            },
        },
        {
            path: '/gongsixinxi',
            name: "gongsixinxi",
            component: resolve => require(['@/components/page/gongsixinxi/gongsixinxi'], resolve),
            meta: {
                title: '公司信息'
            },
        },
        {
            path: '/yansedangan',
            name: "yansedangan",
            component: resolve => require(['@/components/page/yansedangan/yansedangan'], resolve),
            meta: {
                title: '颜色档案'
            },
        },

        {
            path: '/chimadangan',
            name: "chimadangan",
            component: resolve => require(['@/components/page/chimadangan/chimadangan'], resolve),
            meta: {
                title: '尺码档案'
            },
        },
        {
            path: '/jibenleibie',
            name: "jibenleibie",
            component: resolve => require(['@/components/page/jibenleibie/jibenleibie'], resolve),
            meta: {
                title: '基本类别'
            },
        },
        {
            path: '/keshangdangan',
            name: "keshangdangan",
            component: resolve => require(['@/components/page/keshangdangan/keshangdangan'], resolve),
            meta: {
                title: '客商档案'
            },
        },

        {
            path: '/wuliaodangan',
            name: "wuliaodangan",
            component: resolve => require(['@/components/page/wuliaodangan/wuliaodangan'], resolve),
            meta: {
                title: '物料档案'
            },
        },
        {
            path: '/mianliaoyudingjihua',
            name: "mianliaoyudingjihua",
            component: resolve => require(['@/components/page/mianliaoyudingjihua/mianliaoyudingjihua'], resolve),
            meta: {
                title: '面料预定计划'
            },
        },
        {
            path: '/pinleikuanshidingyi',
            name: "pinleikuanshidingyi",
            component: resolve => require(['@/components/page/pinleikuanshidingyi/pinleikuanshidingyi'], resolve),
            meta: {
                title: '品类款式定义'
            },
        },
        {
            path: '/shangpinqihua',
            name: "shangpinqihua",
            component: resolve => require(['@/components/page/shangpinqihua/shangpinqihua'], resolve),
            meta: {
                title: '商品企划'
            },
        },
        {
            path: '/yanfafengong',
            name: "yanfafengong",
            component: resolve => require(['@/components/page/yanfafengong/yanfafengong'], resolve),
            meta: {
                title: '研发分工'
            },
        },
        {
            path: '/chanpinsheji',
            name: "chanpinsheji",
            component: resolve => require(['@/components/page/chanpinsheji/chanpinsheji'], resolve),
            meta: {
                title: '产品设计'
            },
        },
        {
            path: '/yangpinzhizuo',
            name: "yangpinzhizuo",
            component: resolve => require(['@/components/page/yangpinzhizuo/yangpinzhizuo'], resolve),
            meta: {
                title: '样品制作'
            },
        },
        {
            path: '/chanpinfusema',
            name: "chanpinfusema",
            component: resolve => require(['@/components/page/chanpinfusema/chanpinfusema'], resolve),
            meta: {
                title: '产品复色码'
            },
        },
        {
            path: '/yangyijiediao',
            name: "yangyijiediao",
            component: resolve => require(['@/components/page/yangyijiediao/yangyijiediao'], resolve),
            meta: {
                title: '样衣借调'
            },
        },
        {
            path: '/biaoqiansheji',
            name: "biaoqiansheji",
            component: resolve => require(['@/components/page/biaoqiansheji/biaoqiansheji'], resolve),
            meta: {
                title: '标签设计'
            },
        },
        {
            path: '/chanpinbiaoqian',
            name: "chanpinbiaoqian",
            component: resolve => require(['@/components/page/chanpinbiaoqian/chanpinbiaoqian'], resolve),
            meta: {
                title: '产品标签'
            },
        },
        {
            path: '/wuliaoguige',
            name: "wuliaoguige",
            component: resolve => require(['@/components/page/wuliaoguige/wuliaoguige'], resolve),
            meta: {
                title: '物料规格'
            },
        },
        {
            path: '/wuliaoqingdan',
            name: "wuliaoqingdan",
            component: resolve => require(['@/components/page/wuliaoqingdan/wuliaoqingdan'], resolve),
            meta: {
                title: '物料清单'
            },
        },
        {
            path: '/chanpindingjia',
            name: "chanpindingjia",
            component: resolve => require(['@/components/page/chanpindingjia/chanpindingjia'], resolve),
            meta: {
                title: '产品定价'
            },
        },
        {
            path: '/chanpinchaxun',
            name: "chanpinchaxun",
            component: resolve => require(['@/components/page/chanpinchaxun/chanpinchaxun'], resolve),
            meta: {
                title: '产品查询'
            },
        },
        {
            path: '/shengchangongxu',
            name: "shengchangongxu",
            component: resolve => require(['@/components/page/shengchangongxu/shengchangongxu'], resolve),
            meta: {
                title: '生产工序'
            },
        },


        {
            path: '/xiaoshoukuanhao',
            name: "xiaoshoukuanhao",
            component: resolve => require(['@/components/page/xiaoshoukuanhao/xiaoshoukuanhao'], resolve),
            meta: {
                title: '销售款号'
            },
        },
        {
            path: '/dingdanjindu',
            name: "dingdanjindu",
            component: resolve => require(['@/components/page/dingdanjindu/dingdanjindu'], resolve),
            meta: {
                title: '订单进度'
            },
        },
        {
            path: '/shengchandingdan',
            name: "shengchandingdan",
            component: resolve => require(['@/components/page/shengchandingdan/shengchandingdan'], resolve),
            meta: {
                title: '生产订单'
            },
        },

        {
            path: '/cangkushezhi',
            name: "cangkushezhi",
            component: resolve => require(['@/components/page/cangkushezhi/cangkushezhi'], resolve),
            meta: {
                title: '仓库设置'
            },
        },
        {
            path: '/xiaoshoudingdan',
            name: "xiaoshoudingdan",
            component: resolve => require(['@/components/page/xiaoshoudingdan/xiaoshoudingdan'], resolve),
            meta: {
                title: '销售订单'
            },
        },
        {
            path: '/shangpinzuhe',
            name: "shangpinzuhe",
            component: resolve => require(['@/components/page/shangpinzuhe/shangpinzuhe'], resolve),
            meta: {
                title: '商品组合'
            },
        },
        {
            path: '/shangpintiaojia',
            name: "shangpintiaojia",
            component: resolve => require(['@/components/page/shangpintiaojia/shangpintiaojia'], resolve),
            meta: {
                title: '商品调价'
            },
        },
        {
            path: '/wuliaoxuqiuyunsuan',
            name: "wuliaoxuqiuyunsuan",
            component: resolve => require(['@/components/page/wuliaoxuqiuyunsuan/wuliaoxuqiuyunsuan'], resolve),
            meta: {
                title: '物料需求运算'
            },
        },
        {
            path: '/wuliaoxuqiutiaozheng',
            name: "wuliaoxuqiutiaozheng",
            component: resolve => require(['@/components/page/wuliaoxuqiutiaozheng/wuliaoxuqiutiaozheng'], resolve),
            meta: {
                title: '物料需求调整'
            },
        },
        {
            path: '/wuliaocaigouxuqiu',
            name: "wuliaocaigouxuqiu",
            component: resolve => require(['@/components/page/wuliaocaigouxuqiu/wuliaocaigouxuqiu'], resolve),
            meta: {
                title: '物料采购需求'
            },
        },
        ]
    }
    ]
})



export default router
