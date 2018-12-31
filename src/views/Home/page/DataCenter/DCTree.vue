<template>
    <div class="fu jx-l" style="padding: 10px">
        <p>编辑学籍</p>
        <el-tree
                :data="data4"
                node-key="id"
                default-expand-all
                :expand-on-click-node="false"
                :render-content="renderContent">
        </el-tree>
    </div>
</template>

<script>

    export default {
        name: "HomeBaseStudentReg",
        components: {},
        data() {
            const data = [{
                id: '1',
                label: '学生',
                children: [{
                    id: '1-1',
                    label: '学年级',
                    children: [{
                        id: '1-1-1',
                        label: '一年级'
                    }, {
                        id: '1-1-2',
                        label: '二年级'
                    }, {
                        id: '1-1-3',
                        label: '三年级'
                    }]
                },{
                    id: '1-2',
                    label: '财经管理',
                    children: [{
                        id: '1-2-1',
                        label: '一年级'
                    }, {
                        id: '1-2-2',
                        label: '二年级'
                    }, {
                        id: '1-2-3',
                        label: '三年级'
                    }]
                }]
            }];
            return {
                data4: JSON.parse(JSON.stringify(data)),
                data5: JSON.parse(JSON.stringify(data))
            }
        },

        methods: {
            append(data) {
                let newChild = null;
                if (!data.children || !data.children.length) {
                    this.$set(data, 'children', []);
                     newChild = { id: data.id+'-1', label: 'testtest', children: [] };
                }else{
                    let id = data.children[data.children.length-1].id;
                    let baseId = id.substr(0,id.length-2);
                    let lastId = parseInt(id.substr(-1,1))+1;
                     newChild = { id: `${baseId}-${lastId}`, label: 'testtest', children: [] };
                }
                data.children.push(newChild);
            },

            remove(node, data) {
                const parent = node.parent;
                const children = parent.data.children || parent.data;
                const index = children.findIndex(d => d.id === data.id);
                children.splice(index, 1);
            },
            renderContent(h, { node, data, store }) {
                return (
                    <span class="custom-tree-node">
                    <span class="custom-tree-node-text">{node.label}</span>
                <span>
                <el-button size="mini" type="text" on-click={ () => this.append(data) }>添加</el-button>
                <el-button size="mini" type="text" on-click={ () => this.remove(node, data) }>删除</el-button>
                </span>
                </span>);
            }

        }
    }
</script>

<style >


    .custom-tree-node-text {
        margin-right: 30px;
    }

</style>