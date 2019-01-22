<template>
    <CmpTreeSet>

    </CmpTreeSet>
</template>

<script>
    import CmpTreeSet from '_cmp/CmpTreeSet';

    export default {
        name: "ResourceTreeSet",
        mixins: [],
        components: {CmpTreeSet},
        data() {
            return {

            }
        },
        mounted(){
        },
        methods: {
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