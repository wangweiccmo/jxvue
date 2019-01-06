<template>
        <el-dialog  :visible="true" title="收货地址" >
            <el-upload
                    class="upload-demo"
                    ref="upload"
                    action="/jx/excel/addStudents"
                    :on-preview="handlePreview"
                    :on-remove="handleRemove"
                    accept=".xlsx"
                    :file-list="fileList"
                    :on-success="upSuccess"
                    :multiple="false"
                    :auto-upload="false">
                <el-button slot="trigger" size="mini" type="primary">选取excel</el-button>
                <el-button style="margin-left: 10px;" size="mini" type="success" @click="submitUpload">上传到服务器</el-button>
            </el-upload>
        </el-dialog>

</template>

<script>



    export default {
        components: {},
        name: "UploadResourceDialog",
        data() {
            return {
                fileList:[]
            }
        },
        methods: {
            upSuccess(){

            },
            handleRemove(){

            },
            handlePreview(){

            },
            click(i) {
                this.$emit('click',i)
            },
            submitUpload(){

            }
        }
    };
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">

</style>
