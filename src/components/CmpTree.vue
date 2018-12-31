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
                 :props="defaultProps"
                 default-expand-all
                 :filter-node-method="filterNode"
                 ref="tree2"
                 @node-click="handleNodeClick"></el-tree>
    </div>
</template>

<script>

    export default {
        name: "CmpTree",
        data() {
            return {
                filterText: '',
                defaultProps: {
                    children: 'children',
                    label: 'label'
                },
                data: [{
                    label: '一级 1',
                    children: [{
                        label: '二级 1-1',
                        children: [{
                            label: '三级 1-1-1'
                        }]
                    }]
                }, {
                    label: '一级 2',
                    children: [{
                        label: '二级 2-1',
                        children: [{
                            label: '三级 2-1-1'
                        }]
                    }, {
                        label: '二级 2-2',
                        children: [{
                            label: '三级 2-2-1'
                        }]
                    }]
                }, {
                    label: '一级 3',
                    children: [{
                        label: '二级 3-1',
                        children: [{
                            label: '三级 3-1-1'
                        }]
                    }, {
                        label: '二级 3-2',
                        children: [{
                            label: '三级 3-2-1'
                        }]
                    }]
                }],
                defaultProps: {
                    children: 'children',
                    label: 'label'
                }
            };

        },
        watch: {
            filterText(val) {
                this.$refs.tree2.filter(val);
            }
        },
        methods: {
            filterNode(value, data) {
                if (!value) return true;
                return data.label.indexOf(value) !== -1;
            },
            handleNodeClick(data) {
                console.log(data);
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