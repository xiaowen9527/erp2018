<template>
    <div>
        <el-tree  v-for="(item,index) in props1" :key="index" :props="item" :load="loadNode1" lazy>
        </el-tree>
    </div>
</template>


 
<script>
export default {
    name: "NavMenu",
    props: ["navmenus"], // 传入子组件的数据
    data() {
        return {
            props1: [{ label: "name" }],
            navs: [
                { name: "111" },
                { name: "222" },
                { name: "333" },
                { name: "444" },
                { name: "555" },
                { name: "666" },
                { name: "777" },
                { name: "888" },
                { name: "999" },
                { name: "000" }
            ]
        };
    },
    methods: {
        loadNode1(node, resolve) {
            console.log(node, resolve);
            if (node.level === 0) {
                return resolve(this.navmenus);
            }
            if (node.level > 1) return resolve([]);

            setTimeout(() => {
                resolve(this.navs);
            }, 500);
        }
    },
};
</script>
