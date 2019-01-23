<template>
    <div class="fu jx-l" style="padding: 10px">
        <div class="jx-breadcrumb">
            <div style="padding-top: 3px">
                <el-breadcrumb v-if="$route.name && $route.name.length" separator="/">
                    <el-breadcrumb-item  v-for="item,i in $route.name" :key="i" :to="{ path: item.path }">{{item.name}}</el-breadcrumb-item>
                </el-breadcrumb>
            </div>
        </div>
        <CmpTree :bindId="bindId" width="100%">

        </CmpTree>
    </div>
</template>

<script>
    import * as TREE_API from '_api/api_tree';
    import CmpTree from '_cmp/CmpTree';

    export default {
        name: "DCTreeEdit",
        mixins: [],
        components: {
            CmpTree
        },
        data() {

            return {
                bindId:3,
                treeList:[]
            }
        },
        mounted(){
            this.getList();
        },
        methods: {
            getList(){
                this.$http.post(TREE_API.selectAll,null,this).then((res)=>{
                    this.treeList = res.data;
                })
            },
            show(row){
                console.log(row);
            }
        }
    }
</script>

<style >


    .custom-tree-node-text {
        margin-right: 30px;
    }

</style>