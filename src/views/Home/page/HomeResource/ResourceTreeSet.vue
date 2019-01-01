<template>
    <div class="fu jx-l" style="padding: 10px">
        <p>编辑:{{selectTree.name}}</p>
        <el-row style="padding: 10px">
            <el-button size="mini" type="primary" @click="updateTree" >更新到服务器</el-button>
        </el-row>
        <el-tree
                :data="mapData"
                node-key="id"
                default-expand-all
                :expand-on-click-node="false"
                :render-content="renderContent">
        </el-tree>
        <el-dialog
                title="添加子节点"
                :visible.sync="dialogVisible"
                width="400px">
            <el-form :model="form"  ref="form">
                <el-form-item label="节点名称" prop="name" :rules="rules.required">
                    <el-input v-model="form.name" autocomplete="off"></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="openDiaLogOk">确 定</el-button>
            </span>
        </el-dialog>

    </div>
</template>

<script>
    import * as TREE_API from '_api/api_tree';
    import rulesMixin from '_cmp/mixin/rulesMixin';

    export default {
        name: "ResourceTreeSet",
        mixins: [rulesMixin],
        components: {},
        data() {

            return {

                form:{
                    name:''
                },
                dialogVisible: false,
                selectTree: null,
                selectNode:null,
                mapData: []
            }
        },
        mounted(){
            this.getList();
        },
        methods: {
            getList(){

                this.$http.post(TREE_API.selectByBindId,{bindId:2},this).then((res)=>{
                    if(res.data ){
                        this.selectTree = res.data;
                        this.mapData = JSON.parse(this.selectTree.map);
                    }
                })
            },
            openDiaLog(data){
                this.form.name = '';
                this.selectNode = data;
                this.dialogVisible = true;
            },
            openDiaLogOk(){

                this.$refs.form.validate((valid) => {
                    if (valid) {
                        console.log(this.form);
                        this.append(this.selectNode,this.form.name);
                        this.dialogVisible = false;
                    }

                });

            },
            append(data,name) {
                let newChild = null;
                if (!data.children || !data.children.length) {
                    this.$set(data, 'children', []);
                    newChild = { id: data.id+'-1', label: name, children: [] };
                }else{
                    // 取得最大id
                    let id = data.children[data.children.length-1].id;
//                    let id = data.children.reduce(function(a , b){
//                        let aId = a.id;
//                        let bId = b.id;
//                        return (b.id.length >  a.id.length || b.id) > a.id ? b.id : a.id;
//                    });
                    let baseId = id.substr(0,id.length-2);
                    let lastId = parseInt(id.substr(-1,1))+1;
                    newChild = { id: `${baseId}-${lastId}`, label: name, children: [] };
                }
                data.children.push(newChild);
            },
            remove(node, data) {
                if(data.id == '1'){
                    alert("不能删除根节点！");
                    return;
                }
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
                    <el-button size="mini" type="text" on-click={ () => this.openDiaLog(data) }>添加</el-button>
                    <el-button size="mini" type="text" on-click={ () => this.remove(node, data) }>删除</el-button>
                    <el-button type="text" icon="el-icon-upload2"></el-button>
                    <el-button type="text" icon="el-icon-download"></el-button>
                </span>
                </span>);
            },
            updateTree(){
                let params = this.selectTree;
                params.map = JSON.stringify(this.mapData);
                this.$http.post(TREE_API.updateById,params,this).then((res)=>{
                    console.log(res);
                })
            },


        }
    }
</script>

<style >


    .custom-tree-node-text {
        margin-right: 30px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
    }


</style>