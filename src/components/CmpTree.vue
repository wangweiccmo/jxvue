<template>
    <div class=" cmp-tree">

        <el-input
                size="mini"
                placeholder="输入关键字进行过滤"
                suffix-icon="el-icon-search"
                v-model="filterText">
        </el-input>

        <el-tree style="margin-top: 10px"
                 :data="data"
                 default-expand-all
                 :filter-node-method="filterNode"
                 ref="tree2"
                 @node-click="handleNodeClick"></el-tree>
    </div>
</template>

<script>
    import * as TREE_API from '_api/api_tree';

    export default {
        name: "CmpTree",
        props:{
            bindId:{
                type: Number,
                default: 1
            }
        },
        data() {
            return {
                filterText: '',
                data: []
            };

        },
        watch: {
            filterText(val) {
                this.$refs.tree2.filter(val);
            }
        },
        mounted(){
            this.getTreeByBindId();
        },
        methods: {
            getTreeByBindId(){
                let params = {bindId:this.bindId};
                console.log("params:",params);
                this.$http.post(TREE_API.selectByBindId,params,this).then((res)=>{
                    if(res.data){
                        this.selectTree = res.data;
                        this.data = JSON.parse(this.selectTree.map);
                        console.log(this.data);
                    }

                })
            },
            filterNode(value, data) {
                if (!value) return true;
                return data.label.indexOf(value) !== -1;
            },
            handleNodeClick(data) {
                this.$emit('handleNodeClick',data,this.bindId);
            }
        }
    }
</script>

<style scoped>
    .cmp-tree {
        padding-top: 20px;
        width: 200px;
        height: 100%;
        text-align: left;
        overflow-y: auto;
        background-color: white;
    }
</style>