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
                 node-key="id"
                 highlight-current
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
                        let firstNode = this.data[0];
                        this.handleNodeClick(this.data[0],this.bindId);
                        this.$nextTick(()=>{
                            this.$refs.tree2.setCurrentKey(firstNode);
                        })
                    }

                })
            },
            filterNode(value, data) {
                if (!value) return true;
                return data.label.indexOf(value) !== -1;
            },
            handleNodeClick(data) {
                // 获取map文字
                let ids = data.id.split('-');
                let map = '';
                if(ids && ids.length){
                    let index = 0;
                    let maxIndex = ids.length;
                    let getMap=(list)=>{
                        if(index < maxIndex){
                            let id = ids[index];
                            let keyIndex = parseInt(id) - 1;
                            let selectNode = list[keyIndex];
                            index = index+1;
                            if(selectNode){
                                if(!map){
                                    map = selectNode.label;
                                }else{
                                    map = map + " > " + selectNode.label;
                                }
                                if(selectNode.children && selectNode.children.length){
                                    getMap(selectNode.children);
                                }
                            }
                        }
                    }
                    getMap(this.data);
                }
                data.mapStr = map;
                this.$emit('handleNodeClick',data,this.bindId,map);
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