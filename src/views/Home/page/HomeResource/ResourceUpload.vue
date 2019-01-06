<template>
    <div class="fu jx-l jx-box-column">
        <div class="jx-breadcrumb">
            <div class="">
                当前位置：
            </div>
            <div style="padding-top: 3px">
                <el-breadcrumb v-if="$route.name && $route.name.length" separator="/">
                    <el-breadcrumb-item v-for="item,i in $route.name" :key="i" :to="{ path: item.path }">{{item.name}}
                    </el-breadcrumb-item>
                </el-breadcrumb>
            </div>
        </div>
        <div class="jx-flex1 jx-box">
            <CmpTree :bindId="bindId" @handleNodeClick="handleNodeClick">

            </CmpTree>
            <div class="jx-flex1 jx-box-column">
                <div>
                    <el-form :inline="true" size="mini" :model="searchObj" class="demo-form-inline"
                             style="margin-top: 30px">
                        <el-form-item label-width="80px" label="资源标题">
                            <el-input style="width: 193px" v-model="searchObj.user" placeholder="资源标题"></el-input>
                        </el-form-item>
                        <el-form-item label-width="80px" label="资源类型">
                            <el-select v-model="searchObj.region" placeholder="资源类型">
                                <el-option label="区域一" value="shanghai"></el-option>
                                <el-option label="区域二" value="beijing"></el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label-width="80px" label="资源标准">
                            <el-select v-model="searchObj.region" placeholder="资源标准">
                                <el-option label="区域一" value="shanghai"></el-option>
                                <el-option label="区域二" value="beijing"></el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label-width="80px" label="学科">
                            <el-select v-model="searchObj.region" placeholder="学科">
                                <el-option label="区域一" value="shanghai"></el-option>
                                <el-option label="区域二" value="beijing"></el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label-width="80px" label="审核状态">
                            <el-select v-model="searchObj.region" placeholder="审核状态">
                                <el-option label="区域一" value="shanghai"></el-option>
                                <el-option label="区域二" value="beijing"></el-option>
                            </el-select>
                            <el-button type="primary" style="margin: 0 50px" @click="search">查询</el-button>
                        </el-form-item>

                    </el-form>
                </div>
                <el-row style="padding: 10px">
                    <el-button size="mini" type="primary">上传文件</el-button>
                    <el-button size="mini" type="primary">excel批量添加</el-button>
                    <el-button size="mini" type="primary">模板下载</el-button>
                    <el-button size="mini" type="danger">批量删除</el-button>
                </el-row>
                <div class="jx-flex1">

                    <el-table
                            border
                            size="mini"
                            :data="tableData"
                            @selection-change="handleSelectionChange"
                            style="width: 100%">
                        <el-table-column
                                fixed="left"
                                type="selection"
                                width="38">
                        </el-table-column>
                        <el-table-column
                                prop="stuId"
                                label="学号"
                                width="100">
                        </el-table-column>
                        <el-table-column
                                prop="stuName"
                                label="姓名"
                                width="100">
                        </el-table-column>
                        <el-table-column
                                prop="stuIdentityId"
                                label="身份证"
                                width="160">
                        </el-table-column>
                        <el-table-column
                                prop="stuSex"
                                label="性别"
                                width="50">
                        </el-table-column>
                        <el-table-column
                                prop="stuEnrollmentDate"
                                label="入学日期"
                                width="100">
                        </el-table-column>
                        <el-table-column
                                prop="stuMajor"
                                label="专业"
                                width="180">
                        </el-table-column>
                        <el-table-column
                                prop="stuClass"
                                label="班级"
                                width="150">
                        </el-table-column>
                        <el-table-column
                                prop="stuSchoolingLength"
                                label="学制"
                                width="50">
                        </el-table-column>
                        <el-table-column
                                prop="stuAddress"
                                label="地址"
                                width="200">
                        </el-table-column>
                        <el-table-column
                                prop="stuNationality"
                                label="民族"
                                width="50">
                        </el-table-column>
                        <el-table-column
                                prop="stuStatus"
                                label="状态"
                        >
                        </el-table-column>
                        <el-table-column
                                fixed="right"
                                label="操作"
                                width="160">
                            <template slot-scope="scope">
                                <el-button @click="handleClick(scope.row)" type="text" size="small">查看</el-button>
                                <el-button type="text" size="small">编辑</el-button>
                                <el-button type="text" size="small" style="color: red">删除</el-button>
                            </template>
                        </el-table-column>
                    </el-table>
                </div>
                <el-row class="jx-tr">
                    <el-pagination

                            @size-change="handleSizeChange"
                            @current-change="handleCurrentChange"
                            :current-page="currentPage"
                            :page-sizes="[50, 100, 200, 500]"
                            :page-size="50"
                            layout="total, sizes, prev, pager, next, jumper"
                            :total="total">
                    </el-pagination>
                </el-row>
            </div>
        </div>
        <UploadResourceDialog>

        </UploadResourceDialog>

    </div>
</template>

<script>
    import CmpTree from '_cmp/CmpTree';
    import UploadResourceDialog from '_cmp/dialog/UploadResourceDialog';

    export default {
        name: "HomeBaseHome",
        components: {CmpTree,UploadResourceDialog},
        data() {
            return {
                searchObj: {},
                bindId: 2,
                currentPage: 1,
                total:10,
                tableData:[]
            }
        },
        methods: {
            handleSizeChange(val) {
                console.log(`每页 ${val} 条`);
            },
            handleCurrentChange(val) {
                console.log(`当前页: ${val}`);
            },
            handleSelectionChange(){

            },
            handleNodeClick(data, bindId) {
                console.log(data, bindId);
            },
            search(){

            }
        }
    }
</script>

<style scoped>

    .hbase-left {
        width: 200px;
        text-align: left;
    }

    .hbase-left2 {
        width: 200px;
        height: 100%;
        text-align: left;
        overflow-y: auto;
        background-color: yellow;
    }
</style>