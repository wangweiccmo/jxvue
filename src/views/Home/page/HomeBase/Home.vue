<template>
    <div class="fu jx-l" style="text-align: right;padding: 0 10px">
        <div class="jx-breadcrumb">
            <div class="">
                当前位置：
            </div>
            <div style="padding-top: 3px">
                <el-breadcrumb v-if="$route.name && $route.name.length" separator="/">
                    <el-breadcrumb-item  v-for="item,i in $route.name" :key="i" :to="{ path: item.path }">{{item.name}}</el-breadcrumb-item>
                </el-breadcrumb>
            </div>
        </div>
        <div>
            <CmpHomeEcharts>

            </CmpHomeEcharts>
        </div>
    </div>
</template>

<script>
    import CmpHomeEcharts from '_cmp/CmpHomeEcharts.vue'
    export default {
        name: "HomeBaseHome",
        components: {
            CmpHomeEcharts
        },
        data() {
            return {

            }
        },
        methods: {


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