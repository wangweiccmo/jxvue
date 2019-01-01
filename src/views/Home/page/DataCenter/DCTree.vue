<template>
    <div class="fu jx-l" style="padding: 10px">
        <p>编辑</p>
        <el-row style="padding: 10px">
            <el-button size="mini" type="primary"  @click="addTree">添加树</el-button>
            <el-button size="mini" type="primary">业务绑定</el-button>
            <el-select size="mini" style="margin-left: 20px;margin-right: 20px" v-model="selectTreeId" @change="treeChange" placeholder="请选择">
                <el-option
                        v-for="item in treeList"
                        :key="item.id"
                        :label="item.name"
                        :value="item.id">
                    <span style="float: left">{{ item.name }}</span>
                    <span style="float: right; color: #8492a6; font-size: 13px">{{ item.info }}</span>
                </el-option>
            </el-select>
            <el-button size="mini" type="primary" @click="updateTree" >更新</el-button>
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
        <el-dialog
                title="添加树结构"
                :visible.sync="addTreeDialogVisible"
                width="400px">
            <el-form :model="addTreeForm"  ref="addTreeForm">
                <el-form-item label="根节点名称" prop="name" :rules="rules.required">
                    <el-input v-model="addTreeForm.name" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="说明" prop="info" >
                    <el-input v-model="addTreeForm.info" autocomplete="off"></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="addTreeDialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="addTreeFormOk">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
    import * as TREE_API from '../../../../api/api_tree';
    import rulesMixin from '../../../../components/mixin/rulesMixin';

    export default {
        name: "HomeBaseStudentReg",
        mixins: [rulesMixin],
        components: {},
        data() {

            return {
                addTreeForm:{
                    name:'',
                    info:''
                },
                form:{
                    name:''
                },
                addTreeDialogVisible:false,
                dialogVisible: false,
                treeList: [],
                selectTree: null,
                selectTreeId:"",
                selectNode:null,
                mapData: []
            }
        },
        mounted(){
            this.getList();
        },
        methods: {
            getList(){
                this.$http.post(TREE_API.selectAll,null,this).then((res)=>{
                    this.treeList = res.data;
                    if(res.data && res.data.length){
                        this.selectTree = res.data[0];
                        this.selectTreeId = this.selectTree.id;

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
                    let id = data.children[data.children.length-1].id;
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
                </span>
                </span>);
            },
            treeChange(id){
                this.selectTreeId = id;
                this.selectTree = this.treeList.filter((item)=>item.id == id)[0];
                this.mapData = JSON.parse(this.selectTree.map);
            },
            updateTree(){
                let params = this.selectTree;
                params.map = JSON.stringify(this.mapData);
                this.$http.post(TREE_API.updateById,params,this).then((res)=>{
                    console.log(res);
                })
            },
            addTree(){
                this.addTreeDialogVisible = true;
            },
            addTreeFormOk(){
                this.$refs.addTreeForm.validate((valid) => {
                    let params = this.addTreeForm;
                    params.map = `[{"id": "1","label": "${params.name}","children": []}]`;
                    this.$http.post(TREE_API.add,params,this).then((res)=>{
                        if (valid) {
                            console.log(this.addTreeForm);
                            this.getList();
                        }
                        this.addTreeDialogVisible = false;
                    })

                });
            }
        }
    }
</script>

<style >


    .custom-tree-node-text {
        margin-right: 30px;
    }

</style>